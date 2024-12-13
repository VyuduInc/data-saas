import { Suspense } from 'react';
import { FileUpload } from '@/components/analyze/FileUpload';
import { ModelSelector } from '@/components/analyze/ModelSelector';
import { AnalysisOptions } from '@/components/analyze/AnalysisOptions';
import { ChartGrid } from '@/components/charts/ChartGrid';
import { Card, Title, Text } from '@tremor/react';

export default function AnalyzePage() {
  return (
    <div className="flex h-full">
      {/* Main content area */}
      <div className="flex-1 overflow-y-auto">
        <div className="px-8 py-6">
          <div className="mb-8">
            <Title>Data Analysis</Title>
            <Text>Upload your data and select analysis options to get started</Text>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* File Upload */}
            <Card className="col-span-1">
              <FileUpload />
            </Card>

            {/* Model Selection */}
            <Card className="col-span-1">
              <ModelSelector />
            </Card>

            {/* Analysis Options */}
            <Card className="col-span-1">
              <AnalysisOptions />
            </Card>
          </div>

          {/* Charts Section */}
          <Suspense fallback={<div>Loading charts...</div>}>
            <ChartGrid
              charts={[
                {
                  data: [],
                  config: {
                    type: 'line',
                    title: 'Time Series Analysis',
                    xAxis: 'Time',
                    yAxis: 'Value',
                    data: [],
                  },
                },
                // Add more chart configurations as needed
              ]}
            />
          </Suspense>
        </div>
      </div>

      {/* Chat Panel */}
      <div className="w-96 border-l border-gray-200 bg-white p-6 overflow-y-auto">
        <div className="sticky top-0 bg-white pb-4 mb-4 border-b border-gray-200">
          <Title className="text-lg">Analysis Chat</Title>
          <Text>Ask questions about your data</Text>
        </div>

        <div className="space-y-4">
          {/* Chat messages will go here */}
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-700">
              Upload your data to start analyzing and asking questions.
            </p>
          </div>
        </div>

        {/* Chat input */}
        <div className="sticky bottom-0 bg-white pt-4 mt-4 border-t border-gray-200">
          <div className="relative">
            <input
              type="text"
              placeholder="Ask a question about your data..."
              className="w-full rounded-lg border border-gray-300 py-2 pl-4 pr-10 focus:border-purple-500 focus:ring-purple-500"
            />
            <button className="absolute right-2 top-2 text-purple-600 hover:text-purple-700">
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
