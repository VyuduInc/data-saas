import { useMemo } from 'react';
import Plot from 'react-plotly.js';
import { ChartProps } from '@/lib/types';

export function BarChart({ data, title, xAxis, yAxis }: ChartProps) {
  const chartData = useMemo(() => ({
    x: data.map(d => d.label),
    y: data.map(d => d.value),
    type: 'bar',
    name: 'Value',
  }), [data]);

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