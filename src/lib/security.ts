import crypto from 'crypto';
import { promisify } from 'util';
import jwt from 'jsonwebtoken';
import { createCipheriv, createDecipheriv, randomBytes, scrypt } from 'crypto';

const scryptAsync = promisify(scrypt);

export interface EncryptionOptions {
  algorithm?: 'aes-256-gcm' | 'aes-256-cbc';
  keyDerivation?: 'scrypt' | 'pbkdf2';
  encoding?: 'hex' | 'base64';
}

export interface SecurityConfig {
  encryption: {
    enabled: boolean;
    algorithm: 'aes-256-gcm' | 'aes-256-cbc';
    keyDerivation: 'scrypt' | 'pbkdf2';
  };
  authentication: {
    mfa: boolean;
    sessionTimeout: number;
    passwordPolicy: {
      minLength: number;
      requireSpecialChar: boolean;
      requireNumber: boolean;
      requireUppercase: boolean;
      maxAge: number;
    };
  };
  audit: {
    enabled: boolean;
    retention: number;
    sensitiveFields: string[];
  };
}

export class SecurityService {
  private config: SecurityConfig;

  constructor(config: SecurityConfig) {
    this.config = config;
  }

  async encryptData(
    data: string | Buffer,
    password: string,
    options: EncryptionOptions = {}
  ): Promise<{ encrypted: string; iv: string; salt: string; tag?: string }> {
    const salt = randomBytes(32);
    const iv = randomBytes(16);
    let key: Buffer;

    // Key derivation
    if (options.keyDerivation === 'pbkdf2') {
      key = await promisify(crypto.pbkdf2)(
        password,
        salt,
        100000,
        32,
        'sha256'
      );
    } else {
      // Default to scrypt
      key = (await scryptAsync(password, salt, 32)) as Buffer;
    }

    // Encryption
    const algorithm = options.algorithm || 'aes-256-gcm';
    const cipher = createCipheriv(algorithm, key, iv);

    let encrypted: Buffer;
    let tag: Buffer | undefined;

    if (algorithm === 'aes-256-gcm') {
      encrypted = Buffer.concat([
        cipher.update(data),
        cipher.final(),
      ]);
      tag = cipher.getAuthTag();
    } else {
      encrypted = Buffer.concat([
        cipher.update(data),
        cipher.final(),
      ]);
    }

    const encoding = options.encoding || 'hex';
    return {
      encrypted: encrypted.toString(encoding),
      iv: iv.toString(encoding),
      salt: salt.toString(encoding),
      ...(tag && { tag: tag.toString(encoding) }),
    };
  }

  async decryptData(
    encryptedData: {
      encrypted: string;
      iv: string;
      salt: string;
      tag?: string;
    },
    password: string,
    options: EncryptionOptions = {}
  ): Promise<string> {
    const encoding = options.encoding || 'hex';
    const salt = Buffer.from(encryptedData.salt, encoding);
    const iv = Buffer.from(encryptedData.iv, encoding);
    const encrypted = Buffer.from(encryptedData.encrypted, encoding);
    const tag = encryptedData.tag
      ? Buffer.from(encryptedData.tag, encoding)
      : undefined;

    let key: Buffer;
    if (options.keyDerivation === 'pbkdf2') {
      key = await promisify(crypto.pbkdf2)(
        password,
        salt,
        100000,
        32,
        'sha256'
      );
    } else {
      key = (await scryptAsync(password, salt, 32)) as Buffer;
    }

    const algorithm = options.algorithm || 'aes-256-gcm';
    const decipher = createDecipheriv(algorithm, key, iv);

    if (algorithm === 'aes-256-gcm' && tag) {
      decipher.setAuthTag(tag);
    }

    const decrypted = Buffer.concat([
      decipher.update(encrypted),
      decipher.final(),
    ]);

    return decrypted.toString('utf8');
  }

  generateToken(
    payload: any,
    expiresIn: string | number = '1h'
  ): string {
    return jwt.sign(payload, process.env.JWT_SECRET!, {
      expiresIn,
      algorithm: 'HS256',
    });
  }

  verifyToken(token: string): any {
    return jwt.verify(token, process.env.JWT_SECRET!);
  }

  validatePassword(password: string): {
    valid: boolean;
    errors: string[];
  } {
    const errors: string[] = [];
    const policy = this.config.authentication.passwordPolicy;

    if (password.length < policy.minLength) {
      errors.push(`Password must be at least ${policy.minLength} characters long`);
    }

    if (policy.requireSpecialChar && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push('Password must contain at least one special character');
    }

    if (policy.requireNumber && !/\d/.test(password)) {
      errors.push('Password must contain at least one number');
    }

    if (policy.requireUppercase && !/[A-Z]/.test(password)) {
      errors.push('Password must contain at least one uppercase letter');
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  async hashPassword(password: string): Promise<string> {
    const salt = randomBytes(16);
    const key = await scryptAsync(password, salt, 64);
    return `${salt.toString('hex')}:${(key as Buffer).toString('hex')}`;
  }

  async verifyPassword(
    storedHash: string,
    password: string
  ): Promise<boolean> {
    const [salt, hash] = storedHash.split(':');
    const key = await scryptAsync(
      password,
      Buffer.from(salt, 'hex'),
      64
    );
    return hash === (key as Buffer).toString('hex');
  }

  generateMfaSecret(): string {
    return randomBytes(20).toString('hex');
  }

  generateMfaToken(secret: string): string {
    const period = 30; // 30 seconds
    const counter = Math.floor(Date.now() / 1000 / period);
    return this.generateHOTP(secret, counter);
  }

  private generateHOTP(secret: string, counter: number): string {
    const decodedSecret = Buffer.from(secret, 'hex');
    const buffer = Buffer.alloc(8);
    for (let i = 0; i < 8; i++) {
      buffer[7 - i] = counter & 0xff;
      counter = counter >> 8;
    }

    const hmac = crypto.createHmac('sha1', decodedSecret);
    hmac.update(buffer);
    const hmacResult = hmac.digest();

    const offset = hmacResult[hmacResult.length - 1] & 0xf;
    const code =
      ((hmacResult[offset] & 0x7f) << 24) |
      ((hmacResult[offset + 1] & 0xff) << 16) |
      ((hmacResult[offset + 2] & 0xff) << 8) |
      (hmacResult[offset + 3] & 0xff);

    return (code % 1000000).toString().padStart(6, '0');
  }

  async auditLog(
    action: string,
    userId: string,
    details: any
  ): Promise<void> {
    if (!this.config.audit.enabled) return;

    const sensitiveFields = this.config.audit.sensitiveFields;
    const sanitizedDetails = this.sanitizeObject(details, sensitiveFields);

    // Log to your audit storage system
    console.log({
      timestamp: new Date(),
      action,
      userId,
      details: sanitizedDetails,
    });
  }

  private sanitizeObject(obj: any, sensitiveFields: string[]): any {
    if (typeof obj !== 'object' || obj === null) return obj;

    const sanitized: any = Array.isArray(obj) ? [] : {};

    for (const [key, value] of Object.entries(obj)) {
      if (sensitiveFields.includes(key)) {
        sanitized[key] = '[REDACTED]';
      } else if (typeof value === 'object' && value !== null) {
        sanitized[key] = this.sanitizeObject(value, sensitiveFields);
      } else {
        sanitized[key] = value;
      }
    }

    return sanitized;
  }
}
