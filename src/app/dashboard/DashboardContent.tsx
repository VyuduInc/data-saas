import { Card } from '@tremor/react';
import { DataTable } from '@/components/analysis/DataTable';
import { DataSummary } from '@/components/analysis/DataSummary';
import { LineChart } from '@/components/charts/LineChart';
import { BarChart } from '@/components/charts/BarChart';
import { cookies } from 'next/headers';

async function getAnalysisData() {
  const cookieStore = cookies();
  const sessionId = cookieStore.get('sessionId')?.value;

  if (!sessionId) {
    return null;
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/analysis/${sessionId}`, {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch analysis data');
  }

  return response.json();
}

export async function DashboardContent() {
  const data = await getAnalysisData();

  if (!data) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-gray-900">No data available</h2>
        <p className="mt-2 text-gray-500">Upload a file to see the analysis</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <Card>
        <h2 className="text-xl font-semibold mb-4">Data Summary</h2>
        <DataSummary summary={data.summary} />
      </Card>

      <Card>
        <h2 className="text-xl font-semibold mb-4">Data Preview</h2>
        <DataTable data={data.data} />
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {data.charts.map((chart, index) => (
          <Card key={index}>
            <h2 className="text-xl font-semibold mb-4">{chart.title}</h2>
            {chart.type === 'line' ? (
              <LineChart {...chart} />
            ) : (
              <BarChart {...chart} />
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}