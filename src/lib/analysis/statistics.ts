import { DataPoint, AnalysisSummary } from '../types';

export function calculateStatistics(data: DataPoint[]): AnalysisSummary {
  const values = data.map(d => d.value);
  const mean = values.reduce((a, b) => a + b, 0) / values.length;
  
  const sortedValues = [...values].sort((a, b) => a - b);
  const median = sortedValues[Math.floor(values.length / 2)];
  
  const standardDeviation = Math.sqrt(
    values.reduce((sq, n) => sq + Math.pow(n - mean, 2), 0) / values.length
  );

  return {
    mean,
    median,
    standardDeviation,
  };
}