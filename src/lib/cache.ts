import { Redis } from '@upstash/redis';

class Cache {
  private redis: Redis;
  private prefix = 'dataviz:';

  constructor() {
    this.redis = Redis.fromEnv();
  }

  private getKey(key: string): string {
    return `${this.prefix}${key}`;
  }

  async get<T>(key: string): Promise<T | null> {
    try {
      const value = await this.redis.get(this.getKey(key));
      return value as T;
    } catch (error) {
      console.error('Cache get error:', error);
      return null;
    }
  }

  async set(key: string, value: any, expirationSeconds?: number): Promise<void> {
    try {
      if (expirationSeconds) {
        await this.redis.setex(this.getKey(key), expirationSeconds, value);
      } else {
        await this.redis.set(this.getKey(key), value);
      }
    } catch (error) {
      console.error('Cache set error:', error);
    }
  }

  async delete(key: string): Promise<void> {
    try {
      await this.redis.del(this.getKey(key));
    } catch (error) {
      console.error('Cache delete error:', error);
    }
  }

  async exists(key: string): Promise<boolean> {
    try {
      return await this.redis.exists(this.getKey(key)) === 1;
    } catch (error) {
      console.error('Cache exists error:', error);
      return false;
    }
  }
}

export const cache = new Cache();
