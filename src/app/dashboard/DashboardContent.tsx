import { Card } from '@tremor/react';
import { DataTable } from '@/components/analysis/DataTable';
import { DataSummary } from '@/components/analysis/DataSummary';
import { LineChart } from '@/components/charts/LineChart';
import { BarChart } from '@/components/charts/BarChart';
import { FileUpload } from '@/components/analysis/FileUpload';
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
      <div className="space-y-8">
        <Card>
          <h2 className="text-xl font-semibold mb-4">Upload Your Data</h2>
          <p className="text-gray-500 mb-8">
            Upload your data file to start analyzing. We support CSV, JSON, and Excel formats.
          </p>
          <FileUpload />
        </Card>
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