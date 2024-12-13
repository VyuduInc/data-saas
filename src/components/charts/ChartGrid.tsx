import { Grid } from '@tremor/react';
import { AdvancedLineChart } from './AdvancedLineChart';
import { ChartConfig } from '@/lib/types';

interface ChartGridProps {
  charts: {
    data: any[];
    config: ChartConfig;
  }[];
}

export function ChartGrid({ charts }: ChartGridProps) {
  return (
    <Grid numItems={1} numItemsSm={2} numItemsLg={3} className="gap-6">
      {charts.map((chart, index) => (
        <AdvancedLineChart
          key={index}
          data={chart.data}
          config={chart.config}
        />
      ))}
    </Grid>
  );
}
