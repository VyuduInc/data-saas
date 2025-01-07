import { useState, useEffect } from 'react';
import { Select, SelectItem } from '@tremor/react';
import { LineChart } from './LineChart';
import { BarChart } from './BarChart';
import { ScatterPlot } from './ScatterPlot';
import { PieChart } from './PieChart';
import { HeatMap } from './HeatMap';

const CHART_TYPES = [
  { value: 'line', label: 'Line Chart' },
  { value: 'bar', label: 'Bar Chart' },
  { value: 'scatter', label: 'Scatter Plot' },
  { value: 'pie', label: 'Pie Chart' },
  { value: 'heatmap', label: 'Heat Map' },
] as const;

interface ChartSelectorProps {
  data: any[];
  columns: string[];
}

export function ChartSelector({ data, columns }: ChartSelectorProps) {
  const [chartType, setChartType] = useState<string>('line');
  const [xAxis, setXAxis] = useState<string>('');
  const [yAxis, setYAxis] = useState<string>('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (columns.length >= 2) {
      setXAxis(columns[0]);
      setYAxis(columns[1]);
    } else {
      setError('Not enough columns for visualization');
    }
  }, [columns]);

  useEffect(() => {
    if (!data || data.length === 0) {
      setError('No data available for visualization');
      return;
    }
    setError('');
  }, [data]);

  const renderChart = () => {
    if (error) {
      return (
        <div className="w-full h-[400px] flex items-center justify-center text-gray-500">
          {error}
        </div>
      );
    }

    try {
      switch (chartType) {
        case 'line':
          return <LineChart data={data} title="Time Series" xAxis={xAxis} yAxis={yAxis} />;
        case 'bar':
          return <BarChart data={data} title="Bar Chart" xAxis={xAxis} yAxis={yAxis} />;
        case 'scatter':
          return <ScatterPlot data={data} title="Scatter Plot" xAxis={xAxis} yAxis={yAxis} />;
        case 'pie':
          return <PieChart data={data} title="Distribution" category={xAxis} value={yAxis} />;
        case 'heatmap':
          return <HeatMap data={data} title="Heat Map" xAxis={xAxis} yAxis={yAxis} />;
        default:
          return null;
      }
    } catch (err) {
      console.error('Error rendering chart:', err);
      return (
        <div className="w-full h-[400px] flex items-center justify-center text-gray-500">
          Error rendering chart. Please check the data format.
        </div>
      );
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Chart Type</label>
          <Select value={chartType} onValueChange={setChartType}>
            {CHART_TYPES.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">X Axis</label>
          <Select value={xAxis} onValueChange={setXAxis}>
            {columns.map((column) => (
              <SelectItem key={column} value={column}>
                {column}
              </SelectItem>
            ))}
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Y Axis</label>
          <Select value={yAxis} onValueChange={setYAxis}>
            {columns.map((column) => (
              <SelectItem key={column} value={column}>
                {column}
              </SelectItem>
            ))}
          </Select>
        </div>
      </div>

      <div className="mt-4 border rounded-lg p-4 bg-white">
        {renderChart()}
      </div>
    </div>
  );
}
