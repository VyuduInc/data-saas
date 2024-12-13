import { useMemo } from 'react';
import Plot from 'react-plotly.js';
import { ChartProps } from '@/lib/types';

interface BarChartProps extends ChartProps {
  orientation?: 'vertical' | 'horizontal';
  showValues?: boolean;
  colorScheme?: string[];
}

export function BarChart({ 
  data, 
  title, 
  xAxis, 
  yAxis, 
  orientation = 'vertical',
  showValues = false,
  colorScheme = ['#6366f1']
}: BarChartProps) {
  const chartData = useMemo(() => ({
    x: orientation === 'vertical' ? data.map(d => d.label) : data.map(d => d.value),
    y: orientation === 'vertical' ? data.map(d => d.value) : data.map(d => d.label),
    type: 'bar',
    name: 'Value',
    orientation: orientation === 'vertical' ? undefined : 'h',
    text: showValues ? data.map(d => d.value) : undefined,
    textposition: 'auto',
    marker: {
      color: data.map((_, i) => colorScheme[i % colorScheme.length]),
    },
    hovertemplate: '%{x}<br>%{y}<extra></extra>'
  }), [data, orientation, showValues, colorScheme]);

  const layout = {
    title: {
      text: title,
      font: { size: 16 }
    },
    xaxis: { 
      title: xAxis,
      showgrid: false,
      zeroline: false
    },
    yaxis: { 
      title: yAxis,
      showgrid: true,
      zeroline: true
    },
    autosize: true,
    margin: { t: 50, r: 20, b: 50, l: 50 },
    paper_bgcolor: 'rgba(0,0,0,0)',
    plot_bgcolor: 'rgba(0,0,0,0)',
    showlegend: false,
  };

  const config = {
    responsive: true,
    displayModeBar: false,
  };

  return (
    <div className="w-full h-[400px] bg-white rounded-lg shadow-sm p-4">
      <Plot
        data={[chartData]}
        layout={layout}
        config={config}
        useResizeHandler
        className="w-full h-full"
      />
    </div>
  );
}