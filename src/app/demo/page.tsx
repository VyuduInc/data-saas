import { useState } from 'react';
import { ChartGrid } from '@/components/charts/ChartGrid';
import { generateSampleData } from '@/lib/sampleData';
import { Card, Title, Text } from '@tremor/react';

export default function DemoPage() {
  const [charts] = useState([
    {
      data: generateSampleData('timeseries'),
      config: {
        type: 'line',
        title: 'Time Series Analysis',
        xAxis: 'Time',
        yAxis: 'Value',
        data: [],
      },
    },
    {
      data: generateSampleData('comparison'),
      config: {
        type: 'bar',
        title: 'Product Comparison',
        xAxis: 'Product',
        yAxis: 'Sales',
        data: [],
      },
    },
    {
      data: generateSampleData('distribution'),
      config: {
        type: 'histogram',
        title: 'Value Distribution',
        xAxis: 'Value',
        yAxis: 'Count',
        data: [],
      },
    },
    {
      data: generateSampleData('timeseries'),
      config: {
        type: 'area',
        title: 'Trend Analysis',
        xAxis: 'Time',
        yAxis: 'Value',
        data: [],
      },
    },
    {
      data: generateSampleData('distribution'),
      config: {
        type: 'box',
        title: 'Statistical Distribution',
        xAxis: 'Category',
        yAxis: 'Value',
        data: [],
      },
    },
    {
      data: generateSampleData('comparison'),
      config: {
        type: 'polar',
        title: 'Product Distribution',
        xAxis: 'Product',
        yAxis: 'Value',
        data: [],
      },
    },
  ]);

  return (
    <div className="p-8">
      <div className="mb-8">
        <Title>Chart Demo</Title>
        <Text>Explore different chart types and customization options</Text>
      </div>

      <ChartGrid charts={charts} />
    </div>
  );
}
