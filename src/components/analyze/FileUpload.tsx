import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { DocumentIcon } from '@heroicons/react/24/outline';

export function FileUpload() {
  const [file, setFile] = useState<File | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
      'application/json': ['.json'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
    },
    maxFiles: 1,
  });

  return (
    <div className="flex-1">
      <div
        {...getRootProps()}
        className={`flex items-center justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-lg appearance-none cursor-pointer hover:border-purple-500 focus:outline-none ${
          isDragActive ? 'border-purple-500 bg-purple-50' : ''
        }`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center space-y-2">
          <DocumentIcon className="w-8 h-8 text-gray-400" />
          <span className="font-medium text-gray-600">
            {file ? file.name : 'Select a file or drag and drop'}
          </span>
          <span className="text-sm text-gray-500">
            CSV, JSON, or Excel files up to 10MB
          </span>
        </div>
      </div>
    </div>
  );
}
