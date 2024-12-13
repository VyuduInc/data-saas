import { useMemo } from 'react';
import Plot from 'react-plotly.js';
import { DataPoint } from '@/lib/types';

interface ScatterPlotProps {
  xData: DataPoint[];
  yData: DataPoint[];
  title: string;
  xAxis: string;
  yAxis: string;
}

export function ScatterPlot({ xData, yData, title, xAxis, yAxis }: ScatterPlotProps) {
  const chartData = useMemo(() => ({
    x: xData.map(d => d.value),
    y: yData.map(d => d.value),
    mode: 'markers',
    type: 'scatter',
    name: 'Data Points',
  }), [xData, yData]);

  const layout = {
    title,
    xaxis: { title: xAxis },
    yaxis: { title: yAxis },
    autosize: true,
  };

  return (
    <div className="w-full h-[400px]">
      <Plot
        data={[chartData]}
        layout={layout}
        useResizeHandler
        className="w-full h-full"
      />
    </div>
  );
}