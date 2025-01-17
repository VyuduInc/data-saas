import { DataPoint } from './types';
import { createHash } from 'crypto';

export function sanitizeData(data: DataPoint[]): DataPoint[] {
  return data.map(point => ({
    ...point,
    value: isNaN(point.value) ? 0 : point.value,
    label: point.label || 'Unnamed',
    id: point.id || Math.random().toString(36).substr(2, 9),
  }));
}

export function validateDataPoint(point: DataPoint): boolean {
  return (
    typeof point.id === 'string' &&
    typeof point.label === 'string' &&
    typeof point.value === 'number' &&
    !isNaN(point.value)
  );
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat().format(value);
}

export async function computeFileHash(file: File): Promise<string> {
  const buffer = await file.arrayBuffer();
  const hash = createHash('sha256');
  hash.update(Buffer.from(buffer));
  return hash.digest('hex');
}