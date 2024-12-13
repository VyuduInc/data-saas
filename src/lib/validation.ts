import { z } from 'zod';
import { DataPoint } from './types';

export const dataPointSchema = z.object({
  id: z.string(),
  label: z.string(),
  value: z.number(),
  timestamp: z.date().optional(),
});

export const datasetSchema = z.array(dataPointSchema);

export function validateDataset(data: unknown): DataPoint[] {
  try {
    return datasetSchema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const issues = error.issues.map(issue => `${issue.path.join('.')}: ${issue.message}`);
      throw new Error(`Data validation failed:\n${issues.join('\n')}`);
    }
    throw error;
  }
}

export function sanitizeDataset(data: unknown): DataPoint[] {
  if (!Array.isArray(data)) {
    throw new Error('Data must be an array');
  }

  return data.map((item, index) => ({
    id: String(item?.id || index),
    label: String(item?.label || `Data ${index + 1}`),
    value: Number(item?.value || 0),
    timestamp: item?.timestamp ? new Date(item.timestamp) : undefined,
  }));
}

export function validateFileSize(file: File, maxSize: number = 10 * 1024 * 1024): void {
  if (file.size > maxSize) {
    throw new Error(`File size exceeds maximum allowed size of ${maxSize / 1024 / 1024}MB`);
  }
}

export function validateFileType(file: File, allowedTypes: string[]): void {
  const fileType = file.name.split('.').pop()?.toLowerCase();
  if (!fileType || !allowedTypes.includes(fileType)) {
    throw new Error(`File type .${fileType} is not supported. Allowed types: ${allowedTypes.join(', ')}`);
  }
}
