import { useEffect, useRef, useState } from 'react';
import Plot from 'react-plotly.js';
import { Card } from '@tremor/react';
import { ChartConfig } from '@/lib/types';

interface AdvancedLineChartProps {
  data: any[];
  config: ChartConfig;
  onRangeChange?: (range: [number, number]) => void;
}

export function AdvancedLineChart({ data, config, onRangeChange }: AdvancedLineChartProps) {
  const [range, setRange] = useState<[number, number]>([0, data.length - 1]);
  const chartRef = useRef<any>(null);

  const handleRangeChange = (evt: any) => {
    if (evt['xaxis.range[0]'] && evt['xaxis.range[1]']) {
      const newRange: [number, number] = [
        Math.floor(evt['xaxis.range[0]']),
        Math.ceil(evt['xaxis.range[1]']),
      ];
      setRange(newRange);
      onRangeChange?.(newRange);
    }
  };

  return (
    <Card className="p-0 overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">{config.title}</h3>
      </div>
      <div className="p-4">
        <Plot
          ref={chartRef}
          data={[
            {
              x: data.map((d, i) => d.timestamp || i),
              y: data.map((d) => d.value),
              type: 'scatter',
              mode: 'lines+markers',
              marker: { color: '#7C3AED' },
              line: { color: '#7C3AED', width: 2 },
              name: config.yAxis,
            },
            {
              x: data.map((d, i) => d.timestamp || i),
              y: data.map((d) => d.value),
              type: 'scatter',
              mode: 'none',
              fill: 'tonexty',
              fillcolor: 'rgba(124, 58, 237, 0.1)',
              showlegend: false,
            },
          ]}
          layout={{
            autosize: true,
            height: 400,
            margin: { t: 10, r: 10, b: 40, l: 40 },
            xaxis: {
              title: config.xAxis,
              gridcolor: '#E5E7EB',
              zeroline: false,
            },
            yaxis: {
              title: config.yAxis,
              gridcolor: '#E5E7EB',
              zeroline: false,
            },
            plot_bgcolor: 'white',
            paper_bgcolor: 'white',
            showlegend: false,
            hovermode: 'x unified',
          }}
          config={{
            responsive: true,
            displayModeBar: false,
          }}
          onRelayout={handleRangeChange}
          style={{ width: '100%' }}
        />
      </div>
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>Showing data points {range[0]} to {range[1]}</span>
          <button
            onClick={() => {
              chartRef.current?.plotly.relayout({
                'xaxis.autorange': true,
                'yaxis.autorange': true,
              });
            }}
            className="text-purple-600 hover:text-purple-700"
          >
            Reset zoom
          </button>
        </div>
      </div>
    </Card>
  );
}
