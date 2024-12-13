export interface DataPoint {
  id: string;
  label: string;
  value: number;
  timestamp?: Date;
}

export interface ChartProps {
  data: DataPoint[];
  title: string;
  xAxis?: string;
  yAxis?: string;
}

export interface ChartConfig {
  type: 'line' | 'bar' | 'pie' | 'scatter';
  title: string;
  xAxis?: string;
  yAxis?: string;
  data: DataPoint[];
}

export interface AnalysisSummary {
  mean: number;
  median: number;
  standardDeviation: number;
}

export interface AnalysisResult {
  summary: AnalysisSummary;
  charts: ChartConfig[];
}

export type FileType = 'csv' | 'json' | 'xlsx';