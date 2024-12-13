import { useEffect, useRef, useState } from 'react';
import Plot from 'react-plotly.js';
import { Card } from '@tremor/react';
import { ChartConfig } from '@/lib/types';
import { ChartEditor } from './ChartEditor';
import { PencilIcon } from '@heroicons/react/24/outline';

interface AdvancedLineChartProps {
  data: any[];
  config: ChartConfig;
  onConfigChange?: (config: ChartConfig) => void;
  onRangeChange?: (range: [number, number]) => void;
}

export function AdvancedLineChart({ 
  data, 
  config, 
  onConfigChange,
  onRangeChange 
}: AdvancedLineChartProps) {
  const [range, setRange] = useState<[number, number]>([0, data.length - 1]);
  const [isEditing, setIsEditing] = useState(false);
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

  const getChartData = () => {
    switch (config.type) {
      case 'bar':
        return [{
          x: data.map((d, i) => d.timestamp || i),
          y: data.map((d) => d.value),
          type: 'bar',
          marker: { color: '#7C3AED' },
          name: config.yAxis,
        }];
      case 'scatter':
        return [{
          x: data.map((d, i) => d.timestamp || i),
          y: data.map((d) => d.value),
          type: 'scatter',
          mode: 'markers',
          marker: { color: '#7C3AED' },
          name: config.yAxis,
        }];
      case 'area':
        return [{
          x: data.map((d, i) => d.timestamp || i),
          y: data.map((d) => d.value),
          type: 'scatter',
          fill: 'tozeroy',
          fillcolor: 'rgba(124, 58, 237, 0.1)',
          line: { color: '#7C3AED' },
          name: config.yAxis,
        }];
      case 'line':
      default:
        return [{
          x: data.map((d, i) => d.timestamp || i),
          y: data.map((d) => d.value),
          type: 'scatter',
          mode: 'lines+markers',
          marker: { color: '#7C3AED' },
          line: { color: '#7C3AED', width: 2 },
          name: config.yAxis,
        }];
    }
  };

  return (
    <>
      <Card className="p-0 overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900">{config.title}</h3>
          <button
            onClick={() => setIsEditing(true)}
            className="p-2 text-gray-400 hover:text-gray-500 rounded-full hover:bg-gray-100"
          >
            <PencilIcon className="h-5 w-5" />
          </button>
        </div>
        <div className="p-4">
          <Plot
            ref={chartRef}
            data={getChartData()}
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
              displayModeBar: true,
              displaylogo: false,
              modeBarButtonsToRemove: [
                'lasso2d',
                'select2d',
                'toggleSpikelines',
              ],
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

      <ChartEditor
        isOpen={isEditing}
        onClose={() => setIsEditing(false)}
        config={config}
        onConfigChange={(newConfig) => {
          onConfigChange?.(newConfig);
          setIsEditing(false);
        }}
      />
    </>
  );
}
