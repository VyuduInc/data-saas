import { DataPoint } from '../types';

export interface AdvancedAnalysis {
  correlations: Record<string, number>;
  trends: {
    direction: 'up' | 'down' | 'stable';
    strength: number;
    confidence: number;
  };
  outliers: DataPoint[];
  seasonality?: {
    period: number;
    strength: number;
  };
}

export function detectOutliers(data: DataPoint[]): DataPoint[] {
  const values = data.map(d => d.value);
  const mean = values.reduce((a, b) => a + b, 0) / values.length;
  const stdDev = Math.sqrt(
    values.reduce((sq, n) => sq + Math.pow(n - mean, 2), 0) / values.length
  );
  
  const threshold = 2; // Number of standard deviations
  return data.filter(d => Math.abs(d.value - mean) > threshold * stdDev);
}

export function analyzeTrends(data: DataPoint[]): AdvancedAnalysis['trends'] {
  if (data.length < 2) {
    return { direction: 'stable', strength: 0, confidence: 0 };
  }

  const values = data.map(d => d.value);
  const diffs = values.slice(1).map((v, i) => v - values[i]);
  const avgDiff = diffs.reduce((a, b) => a + b, 0) / diffs.length;
  const strength = Math.abs(avgDiff);
  
  return {
    direction: avgDiff > 0 ? 'up' : avgDiff < 0 ? 'down' : 'stable',
    strength: Math.min(strength, 1),
    confidence: 1 - (diffs.some(d => Math.sign(d) !== Math.sign(avgDiff)) ? 0.5 : 0),
  };
}

export function detectSeasonality(data: DataPoint[]): AdvancedAnalysis['seasonality'] | undefined {
  if (data.length < 4) return undefined;

  const values = data.map(d => d.value);
  const potentialPeriods = [7, 12, 24, 30, 365]; // Common periods (weekly, monthly, daily, monthly, yearly)
  
  let bestPeriod = 0;
  let maxCorrelation = 0;

  for (const period of potentialPeriods) {
    if (values.length < period * 2) continue;

    const correlation = calculateAutocorrelation(values, period);
    if (correlation > maxCorrelation) {
      maxCorrelation = correlation;
      bestPeriod = period;
    }
  }

  if (maxCorrelation > 0.3) { // Minimum correlation threshold
    return {
      period: bestPeriod,
      strength: maxCorrelation,
    };
  }

  return undefined;
}

function calculateAutocorrelation(values: number[], lag: number): number {
  const n = values.length;
  const mean = values.reduce((a, b) => a + b, 0) / n;
  
  let numerator = 0;
  let denominator = 0;
  
  for (let i = 0; i < n - lag; i++) {
    numerator += (values[i] - mean) * (values[i + lag] - mean);
    denominator += Math.pow(values[i] - mean, 2);
  }
  
  return numerator / denominator;
}
