import { useMemo } from 'react';
import Plot from 'react-plotly.js';

interface PieChartProps {
  data: any[];
  title: string;
  category: string;
  value: string;
}

export function PieChart({ data, title, category, value }: PieChartProps) {
  const chartData = useMemo(() => {
    // Aggregate data by category
    const aggregated = data.reduce((acc, item) => {
      const key = item[category];
      acc[key] = (acc[key] || 0) + Number(item[value]);
      return acc;
    }, {} as Record<string, number>);

    return {
      values: Object.values(aggregated),
      labels: Object.keys(aggregated),
      type: 'pie',
      hole: 0.4, // Creates a donut chart
      textinfo: 'label+percent',
      hoverinfo: 'label+value',
    };
  }, [data, category, value]);

  const layout = {
    title,
    showlegend: true,
    legend: {
      orientation: 'h',
      y: -0.2
    },
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
