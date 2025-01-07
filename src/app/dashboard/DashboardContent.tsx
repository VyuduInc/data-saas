import { Card } from '@tremor/react';
import { DataTable } from '@/components/analysis/DataTable';
import { DataSummary } from '@/components/analysis/DataSummary';
import { ChartSelector } from '@/components/charts/ChartSelector';
import { FileUpload } from '@/components/analysis/FileUpload';
import { ExportButton } from '@/components/analysis/ExportButton';
import { cookies } from 'next/headers';
import { pusherServer } from '@/lib/pusher';

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

  const columns = Object.keys(data.data[0] || {});

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Analysis Dashboard</h1>
        <ExportButton data={data.data} filename="analysis-export" />
      </div>

      <Card>
        <h2 className="text-xl font-semibold mb-4">Data Summary</h2>
        <DataSummary summary={data.summary} />
      </Card>

      <Card>
        <h2 className="text-xl font-semibold mb-4">Data Preview</h2>
        <DataTable data={data.data} />
      </Card>

      <Card>
        <h2 className="text-xl font-semibold mb-4">Visualization</h2>
        <ChartSelector data={data.data} columns={columns} />
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <h2 className="text-xl font-semibold mb-4">Distribution Analysis</h2>
          <ChartSelector 
            data={data.data} 
            columns={columns}
          />
        </Card>
        <Card>
          <h2 className="text-xl font-semibold mb-4">Correlation Analysis</h2>
          <ChartSelector 
            data={data.data}
            columns={columns}
          />
        </Card>
      </div>
    </div>
  );
}