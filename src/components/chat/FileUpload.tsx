import { useDropzone } from 'react-dropzone';
import { ArrowUpTrayIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

interface FileUploadProps {
  onAnalyzing: (analyzing: boolean) => void;
}

export function FileUpload({ onAnalyzing }: FileUploadProps) {
  const [error, setError] = useState<string | null>(null);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'text/csv': ['.csv'],
      'application/json': ['.json'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
    },
    maxSize: 10 * 1024 * 1024, // 10MB
    onDrop: async (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        try {
          setError(null);
          onAnalyzing(true);
          
          const file = acceptedFiles[0];
          const formData = new FormData();
          formData.append('file', file);
          formData.append('fileType', file.name.split('.').pop() as string);

          const response = await fetch('/api/analyze', {
            method: 'POST',
            body: formData,
          });

          if (!response.ok) {
            const data = await response.json();
            throw new Error(data.error || 'Failed to analyze file');
          }

          const data = await response.json();
          // Handle successful analysis
          console.log('Analysis complete:', data);
        } catch (err) {
          console.error('File upload error:', err);
          setError(err instanceof Error ? err.message : 'Failed to analyze file');
        } finally {
          onAnalyzing(false);
        }
      }
    },
  });

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div
        {...getRootProps()}
        className={`max-w-xl w-full p-12 rounded-lg border-2 border-dashed ${
          isDragActive ? 'border-purple-600 bg-purple-50' : 'border-gray-300'
        }`}
      >
        <div className="text-center">
          <ArrowUpTrayIcon className="mx-auto h-12 w-12 text-gray-400" />
          <div className="mt-4">
            <input {...getInputProps()} />
            <p className="text-sm text-gray-600">
              {isDragActive
                ? 'Drop the file here'
                : 'Select a file or drag and drop'}
            </p>
          </div>
          <p className="mt-2 text-xs text-gray-500">
            CSV, JSON, or Excel files up to 10MB
          </p>
        </div>
      </div>
      {error && (
        <div className="mt-4 text-sm text-red-600">
          {error}
        </div>
      )}
    </div>
  );
}