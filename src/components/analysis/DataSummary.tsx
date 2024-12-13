import { Card, Text, Metric, Grid } from '@tremor/react';
import { AnalysisSummary } from '@/lib/types';

interface DataSummaryProps {
  summary: AnalysisSummary;
}

export function DataSummary({ summary }: DataSummaryProps) {
  return (
    <Grid numItems={1} numItemsSm={2} numItemsLg={3} className="gap-4">
      <Card>
        <Text>Mean</Text>
        <Metric>{summary.mean.toFixed(2)}</Metric>
      </Card>
      <Card>
        <Text>Median</Text>
        <Metric>{summary.median.toFixed(2)}</Metric>
      </Card>
      <Card>
        <Text>Standard Deviation</Text>
        <Metric>{summary.standardDeviation.toFixed(2)}</Metric>
      </Card>
    </Grid>
  );
}