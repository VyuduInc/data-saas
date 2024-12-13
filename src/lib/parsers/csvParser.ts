import Papa from 'papaparse';
import { DataPoint } from '../types';
import { sanitizeData } from '../utils';

export async function parseCSV(file: File): Promise<DataPoint[]> {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      complete: (results) => {
        const data = results.data.map((row: any, index) => ({
          id: index.toString(),
          label: row.label || `Data ${index + 1}`,
          value: parseFloat(row.value) || 0,
          timestamp: row.timestamp ? new Date(row.timestamp) : undefined,
        }));
        resolve(sanitizeData(data));
      },
      error: (error) => reject(error),
    });
  });
}