import { useMemo } from 'react';
import Plot from 'react-plotly.js';
import { ChartProps } from '@/lib/types';

export function LineChart({ data, title, xAxis, yAxis }: ChartProps) {
  const chartData = useMemo(() => {
    try {
      if (!data || data.length === 0) {
        console.error('No data provided for LineChart');
        return null;
      }

      // Extract x and y values, handling potential missing or invalid data
      const xValues = data.map(d => {
        const xValue = d[xAxis];
        if (xValue instanceof Date) return xValue;
        if (typeof xValue === 'string' && !isNaN(Date.parse(xValue))) return new Date(xValue);
        return xValue;
      });

      const yValues = data.map(d => {
        const yValue = d[yAxis];
        return typeof yValue === 'number' ? yValue : parseFloat(yValue);
      });

      return {
        x: xValues,
        y: yValues,
        type: 'scatter',
        mode: 'lines+markers',
        name: yAxis,
      };
    } catch (error) {
      console.error('Error processing data for LineChart:', error);
      return null;
    }
  }, [data, xAxis, yAxis]);

  const layout = {
    title: {
      text: title,
      font: { size: 24 }
    },
    xaxis: { 
      title: xAxis,
      automargin: true
    },
    yaxis: { 
      title: yAxis,
      automargin: true
    },
    autosize: true,
    margin: { t: 50, r: 50, b: 50, l: 50 },
    showlegend: true,
  };

  if (!chartData) {
    return (
      <div className="w-full h-[400px] flex items-center justify-center text-gray-500">
        No data available for visualization
      </div>
    );
  }

  return (
    <div className="w-full h-[400px]">
      <Plot
        data={[chartData]}
        layout={layout}
        useResizeHandler
        className="w-full h-full"
        config={{
          responsive: true,
          displayModeBar: true,
          displaylogo: false,
          modeBarButtonsToRemove: ['lasso2d', 'select2d'],
        }}
      />
    </div>
  );
}