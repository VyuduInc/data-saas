import { DataPoint } from '../types';
import { sanitizeData } from '../utils';

export async function parseJSON(file: File): Promise<DataPoint[]> {
  try {
    const text = await file.text();
    const json = JSON.parse(text);
    const data = Array.isArray(json) ? json : [json];
    
    return sanitizeData(data.map((item: any, index) => ({
      id: item.id || index.toString(),
      label: item.label || `Data ${index + 1}`,
      value: parseFloat(item.value) || 0,
      timestamp: item.timestamp ? new Date(item.timestamp) : undefined,
    })));
  } catch (error) {
    throw new Error('Failed to parse JSON file');
  }
}