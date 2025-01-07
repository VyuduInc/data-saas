import { useState } from 'react';
import { Button, Select, SelectItem } from '@tremor/react';
import { exportData } from '@/lib/export';

const EXPORT_FORMATS = [
  { value: 'csv', label: 'CSV' },
  { value: 'xlsx', label: 'Excel' },
  { value: 'pdf', label: 'PDF' },
  { value: 'docx', label: 'Word' },
  { value: 'latex', label: 'LaTeX' },
  { value: 'python', label: 'Python Script' },
] as const;

interface ExportButtonProps {
  data: any[];
  filename?: string;
}

export function ExportButton({ data, filename = 'export' }: ExportButtonProps) {
  const [format, setFormat] = useState<string>('csv');
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    try {
      setIsExporting(true);
      await exportData(data, {
        format: format as any,
        styling: {
          theme: 'light',
          pageSize: 'A4',
          orientation: 'portrait',
        },
        security: {
          encrypt: false,
          metadata: {
            createdAt: new Date(),
          },
        },
      });
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="flex space-x-2">
      <Select 
        value={format} 
        onValueChange={setFormat}
        className="w-32"
      >
        {EXPORT_FORMATS.map((f) => (
          <SelectItem key={f.value} value={f.value}>
            {f.label}
          </SelectItem>
        ))}
      </Select>
      <Button
        onClick={handleExport}
        loading={isExporting}
        variant="secondary"
        size="sm"
      >
        Export
      </Button>
    </div>
  );
}
