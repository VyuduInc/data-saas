import { useMemo } from 'react';
import Plot from 'react-plotly.js';

interface HeatMapProps {
  data: any[];
  title: string;
  xAxis: string;
  yAxis: string;
}

export function HeatMap({ data, title, xAxis, yAxis }: HeatMapProps) {
  const chartData = useMemo(() => {
    // Get unique values for both axes
    const xValues = [...new Set(data.map(d => d[xAxis]))];
    const yValues = [...new Set(data.map(d => d[yAxis]))];

    // Create a matrix of values
    const zValues = Array(yValues.length).fill(0).map(() => 
      Array(xValues.length).fill(0)
    );

    // Fill in the matrix
    data.forEach(d => {
      const xIndex = xValues.indexOf(d[xAxis]);
      const yIndex = yValues.indexOf(d[yAxis]);
      if (xIndex !== -1 && yIndex !== -1) {
        zValues[yIndex][xIndex]++;
      }
    });

    return {
      x: xValues,
      y: yValues,
      z: zValues,
      type: 'heatmap',
      colorscale: 'Viridis',
      showscale: true,
    };
  }, [data, xAxis, yAxis]);

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
