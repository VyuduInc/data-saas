const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_FILE_TYPES = {
  // Images
  'image/jpeg': ['.jpg', '.jpeg'],
  'image/png': ['.png'],
  'image/gif': ['.gif'],
  'image/webp': ['.webp'],
  
  // Documents
  'application/pdf': ['.pdf'],
  'text/plain': ['.txt'],
  'text/markdown': ['.md'],
  'text/csv': ['.csv'],
  
  // Code
  'text/javascript': ['.js', '.jsx', '.ts', '.tsx'],
  'text/python': ['.py'],
  'text/x-python': ['.py'],
  'application/json': ['.json'],
  
  // Archives (for datasets)
  'application/zip': ['.zip'],
  'application/x-zip-compressed': ['.zip'],
  'application/x-7z-compressed': ['.7z'],
  'application/x-tar': ['.tar'],
  'application/x-gzip': ['.gz'],
};

export interface FileValidationError {
  code: 'FILE_TOO_LARGE' | 'INVALID_FILE_TYPE' | 'FILE_CORRUPTED';
  message: string;
  details?: any;
}

export interface FileValidationResult {
  isValid: boolean;
  error?: FileValidationError;
  sanitizedName?: string;
}

export async function validateFile(file: File): Promise<FileValidationResult> {
  // Check file size
  if (file.size > MAX_FILE_SIZE) {
    return {
      isValid: false,
      error: {
        code: 'FILE_TOO_LARGE',
        message: \`File size exceeds maximum limit of \${MAX_FILE_SIZE / 1024 / 1024}MB\`,
        details: { size: file.size, maxSize: MAX_FILE_SIZE },
      },
    };
  }

  // Check file type
  const fileType = file.type.toLowerCase();
  if (!ALLOWED_FILE_TYPES[fileType]) {
    return {
      isValid: false,
      error: {
        code: 'INVALID_FILE_TYPE',
        message: 'File type not allowed',
        details: { type: fileType, allowedTypes: Object.keys(ALLOWED_FILE_TYPES) },
      },
    };
  }

  // Validate file contents (basic check)
  try {
    const buffer = await file.arrayBuffer();
    if (buffer.byteLength === 0) {
      return {
        isValid: false,
        error: {
          code: 'FILE_CORRUPTED',
          message: 'File appears to be corrupted or empty',
        },
      };
    }
  } catch (error) {
    return {
      isValid: false,
      error: {
        code: 'FILE_CORRUPTED',
        message: 'Failed to read file contents',
        details: error,
      },
    };
  }

  // Sanitize filename
  const extension = ALLOWED_FILE_TYPES[fileType][0];
  const sanitizedName = file.name
    .replace(/[^a-zA-Z0-9-_\.]/g, '_') // Replace invalid chars with underscore
    .replace(/_{2,}/g, '_') // Replace multiple underscores with single
    .toLowerCase();

  return {
    isValid: true,
    sanitizedName: \`\${sanitizedName}\${extension}\`,
  };
}

export function isImageFile(file: File): boolean {
  return file.type.startsWith('image/');
}

export function getFileIcon(file: File): string {
  if (file.type.startsWith('image/')) return '🖼️';
  if (file.type.includes('pdf')) return '📄';
  if (file.type.includes('text')) return '📝';
  if (file.type.includes('javascript') || file.type.includes('python')) return '👨‍💻';
  if (file.type.includes('zip') || file.type.includes('compressed')) return '📦';
  return '📎';
}
