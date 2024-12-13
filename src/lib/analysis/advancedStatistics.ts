import { DataPoint } from '../types';

export function calculateCorrelation(x: number[], y: number[]): number {
  const n = x.length;
  const sum_x = x.reduce((a, b) => a + b, 0);
  const sum_y = y.reduce((a, b) => a + b, 0);
  const sum_xy = x.reduce((acc, curr, i) => acc + curr * y[i], 0);
  const sum_x2 = x.reduce((a, b) => a + b * b, 0);
  const sum_y2 = y.reduce((a, b) => a + b * b, 0);

  return (n * sum_xy - sum_x * sum_y) / 
    Math.sqrt((n * sum_x2 - sum_x * sum_x) * (n * sum_y2 - sum_y * sum_y));
}

export function performRegression(x: number[], y: number[]) {
  const n = x.length;
  const correlation = calculateCorrelation(x, y);
  const x_mean = x.reduce((a, b) => a + b, 0) / n;
  const y_mean = y.reduce((a, b) => a + b, 0) / n;
  
  const slope = correlation * (Math.sqrt(y.reduce((a, b) => a + Math.pow(b - y_mean, 2), 0) / n) / 
                Math.sqrt(x.reduce((a, b) => a + Math.pow(b - x_mean, 2), 0) / n));
  
  const intercept = y_mean - slope * x_mean;

  return {
    slope,
    intercept,
    correlation,
    r_squared: Math.pow(correlation, 2)
  };
}

export function forecast(data: DataPoint[], periods: number) {
  const values = data.map(d => d.value);
  const timestamps = data.map(d => d.timestamp?.getTime() || 0);
  
  const regression = performRegression(timestamps, values);
  
  const lastTimestamp = Math.max(...timestamps);
  const timeInterval = (lastTimestamp - Math.min(...timestamps)) / (timestamps.length - 1);
  
  return Array.from({ length: periods }, (_, i) => {
    const forecastTimestamp = new Date(lastTimestamp + (i + 1) * timeInterval);
    const forecastValue = regression.slope * forecastTimestamp.getTime() + regression.intercept;
    
    return {
      timestamp: forecastTimestamp,
      value: forecastValue,
      confidence_lower: forecastValue - regression.r_squared * Math.sqrt(i + 1),
      confidence_upper: forecastValue + regression.r_squared * Math.sqrt(i + 1)
    };
  });
}