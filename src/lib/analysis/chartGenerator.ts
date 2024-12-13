import { DataPoint, ChartConfig } from '../types';

export function generateCharts(data: DataPoint[]): ChartConfig[] {
  return [
    {
      type: 'line',
      title: 'Time Series Analysis',
      xAxis: 'Time',
      yAxis: 'Value',
      data,
    },
    {
      type: 'bar',
      title: 'Distribution Analysis',
      xAxis: 'Label',
      yAxis: 'Value',
      data,
    },
  ];
}