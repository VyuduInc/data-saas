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

export type ChartType =
  | 'scatter'
  | 'bar'
  | 'line'
  | 'area'
  | 'box'
  | 'violin'
  | 'histogram'
  | '2d-histogram'
  | 'heatmap'
  | 'contour'
  | '2d-contour'
  | '3d-scatter'
  | '3d-surface'
  | '3d-line'
  | '3d-mesh'
  | 'candlestick'
  | 'ohlc'
  | 'waterfall'
  | 'funnel'
  | 'polar'
  | 'polar-bar'
  | 'treemap'
  | 'sankey'
  | 'bubble'
  | 'radar'
  | 'parallel'
  | 'sunburst';

export interface ChartConfig {
  type: ChartType;
  title: string;
  xAxis?: string;
  yAxis?: string;
  zAxis?: string;
  data: DataPoint[];
  options?: {
    orientation?: 'vertical' | 'horizontal';
    showLegend?: boolean;
    colorScale?: string;
    markerSize?: number;
    lineWidth?: number;
    fillOpacity?: number;
    theme?: string;
    aggregationType?: AggregationType;
    sortDirection?: SortDirection;
    limit?: number;
  };
}

export interface ChartAnnotation {
  type: 'text' | 'line' | 'rect' | 'circle';
  x?: number;
  y?: number;
  text?: string;
  color?: string;
  borderColor?: string;
  backgroundColor?: string;
  fontSize?: number;
  opacity?: number;
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

// Note: AggregationType and SortDirection types are not defined in the provided code edit.
// Please define these types as per your requirements.
// For example:
export type AggregationType = 'sum' | 'average' | 'max' | 'min';
export type SortDirection = 'asc' | 'desc';