import { useDropzone } from 'react-dropzone';
import { ArrowUpTrayIcon } from '@heroicons/react/24/outline';

interface FileUploadProps {
  onAnalyzing: (analyzing: boolean) => void;
}

export function FileUpload({ onAnalyzing }: FileUploadProps) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: async (files) => {
      if (files.length > 0) {
        onAnalyzing(true);
        // Handle file upload and analysis
        onAnalyzing(false);
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
    </div>
  );
}