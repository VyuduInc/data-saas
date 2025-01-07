import { useState } from 'react';
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
  const [xAxis, setXAxis] = useState(columns[0]);
  const [yAxis, setYAxis] = useState(columns[1]);

  const renderChart = () => {
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
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4">
        <Select value={chartType} onValueChange={setChartType}>
          {CHART_TYPES.map((type) => (
            <SelectItem key={type.value} value={type.value}>
              {type.label}
            </SelectItem>
          ))}
        </Select>
        
        <Select value={xAxis} onValueChange={setXAxis}>
          {columns.map((column) => (
            <SelectItem key={column} value={column}>
              {column} (X-Axis)
            </SelectItem>
          ))}
        </Select>

        <Select value={yAxis} onValueChange={setYAxis}>
          {columns.map((column) => (
            <SelectItem key={column} value={column}>
              {column} (Y-Axis)
            </SelectItem>
          ))}
        </Select>
      </div>

      <div className="h-[400px]">
        {renderChart()}
      </div>
    </div>
  );
}
