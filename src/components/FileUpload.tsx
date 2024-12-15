import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button, Progress } from '@nextui-org/react';
import { CloudArrowUpIcon } from '@heroicons/react/24/outline';
import { useSettings } from '@/hooks/useSettings';
import { useToast } from '@/hooks/useToast';

interface FileUploadProps {
  analysisId: string;
  onUploadComplete: (fileId: string) => void;
}

export function FileUpload({ analysisId, onUploadComplete }: FileUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const { settings } = useSettings();
  const { showToast } = useToast();

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    // Check file type
    const fileType = file.type.split('/')[1]?.toLowerCase();
    const fileTypes = settings.fileTypes || {};
    const isAllowed = 
      (fileType === 'pdf' && fileTypes.allowPdf) ||
      (fileType === 'csv' && fileTypes.allowCsv) ||
      (fileType === 'json' && fileTypes.allowJson) ||
      (fileType === 'xlsx' && fileTypes.allowExcel) ||
      (['jpg', 'jpeg', 'png', 'gif'].includes(fileType) && fileTypes.allowImage);

    if (!isAllowed) {
      showToast({
        title: 'Error',
        description: `File type .${fileType} is not allowed`,
        type: 'error',
      });
      return;
    }

    setUploading(true);
    setProgress(0);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('analysisId', analysisId);
      formData.append('encrypt', settings.security?.encryptData ? 'true' : 'false');

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      onUploadComplete(data.fileId);
      
      showToast({
        title: 'Success',
        description: 'File uploaded successfully',
        type: 'success',
      });
    } catch (error) {
      console.error('Upload error:', error);
      showToast({
        title: 'Error',
        description: 'Failed to upload file',
        type: 'error',
      });
    } finally {
      setUploading(false);
      setProgress(0);
    }
  }, [analysisId, settings, onUploadComplete, showToast]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    maxSize: (settings.security?.maxFileSize || 10) * 1024 * 1024,
  });

  return (
    <div
      {...getRootProps()}
      className={`p-6 border-2 border-dashed rounded-lg text-center cursor-pointer
        ${isDragActive ? 'border-primary bg-primary/10' : 'border-gray-300'}
        ${uploading ? 'pointer-events-none' : ''}`}
    >
      <input {...getInputProps()} />
      <CloudArrowUpIcon className="w-12 h-12 mx-auto mb-4 text-gray-400" />
      {uploading ? (
        <div className="space-y-4">
          <p className="text-sm text-gray-500">Uploading...</p>
          <Progress
            size="sm"
            value={progress}
            color="primary"
            className="max-w-md mx-auto"
          />
        </div>
      ) : (
        <>
          <p className="text-sm text-gray-500">
            {isDragActive
              ? 'Drop the file here'
              : 'Drag and drop a file here, or click to select'}
          </p>
          <p className="mt-2 text-xs text-gray-400">
            Max size: {settings.security?.maxFileSize || 10}MB
          </p>
        </>
      )}
    </div>
  );
}
