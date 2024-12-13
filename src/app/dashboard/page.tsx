import { Suspense } from 'react';
import { Card } from '@tremor/react';
import { DataTable } from '@/components/analysis/DataTable';
import { DataSummary } from '@/components/analysis/DataSummary';
import { LineChart } from '@/components/charts/LineChart';
import { BarChart } from '@/components/charts/BarChart';
import { DashboardContent } from './DashboardContent';

export default function DashboardPage() {
  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>
      
      <Suspense fallback={<DashboardSkeleton />}>
        <DashboardContent />
      </Suspense>
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      <Card>
        <div className="h-32 bg-gray-200 rounded"></div>
      </Card>
      <Card>
        <div className="h-64 bg-gray-200 rounded"></div>
      </Card>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <div className="h-96 bg-gray-200 rounded"></div>
        </Card>
        <Card>
          <div className="h-96 bg-gray-200 rounded"></div>
        </Card>
      </div>
    </div>
  );
}