import { ChartConfig, DataPoint } from './types';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

export async function exportChart(format: 'png' | 'svg' | 'pdf', plotElement: any) {
  if (!plotElement) return;

  const width = 1200;
  const height = 800;
  const scale = 2; // For higher resolution exports

  try {
    switch (format) {
      case 'png':
        const imgData = await plotElement.toImage({
          format: 'png',
          width: width * scale,
          height: height * scale,
          scale: scale
        });
        saveAs(imgData, `chart_${Date.now()}.png`);
        break;
      
      case 'svg':
        const svgData = await plotElement.toImage({
          format: 'svg',
          width,
          height
        });
        const svgBlob = new Blob([svgData], { type: 'image/svg+xml' });
        saveAs(svgBlob, `chart_${Date.now()}.svg`);
        break;
      
      case 'pdf':
        const pngForPdf = await plotElement.toImage({
          format: 'png',
          width: width * scale,
          height: height * scale,
          scale: scale
        });
        const pdf = new window.jsPDF({
          orientation: height > width ? 'portrait' : 'landscape',
          unit: 'px',
          format: [width, height]
        });
        pdf.addImage(pngForPdf, 'PNG', 0, 0, width, height);
        pdf.save(`chart_${Date.now()}.pdf`);
        break;
    }
  } catch (error) {
    console.error('Error exporting chart:', error);
    throw new Error(`Failed to export chart as ${format}`);
  }
}

export function exportData(data: DataPoint[], format: 'csv' | 'xlsx') {
  try {
    const timestamp = Date.now();
    
    switch (format) {
      case 'csv':
        const csv = convertToCSV(data);
        const csvBlob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        saveAs(csvBlob, `data_${timestamp}.csv`);
        break;
      
      case 'xlsx':
        const ws = XLSX.utils.json_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Data');
        
        // Add some basic styling
        ws['!cols'] = Object.keys(data[0] || {}).map(() => ({ wch: 15 }));
        
        XLSX.writeFile(wb, `data_${timestamp}.xlsx`);
        break;
    }
  } catch (error) {
    console.error('Error exporting data:', error);
    throw new Error(`Failed to export data as ${format}`);
  }
}

export function shareChart(config: ChartConfig) {
  try {
    // Create a shareable URL with encoded chart configuration
    const shareableConfig = btoa(JSON.stringify(config));
    const url = `${window.location.origin}/share?chart=${shareableConfig}`;
    
    // Copy to clipboard
    navigator.clipboard.writeText(url);
    
    return url;
  } catch (error) {
    console.error('Error sharing chart:', error);
    throw new Error('Failed to create share link');
  }
}

function convertToCSV(data: DataPoint[]): string {
  if (!data || data.length === 0) return '';

  // Get headers
  const headers = Object.keys(data[0]);
  
  // Create CSV rows
  const rows = [
    headers.join(','), // Header row
    ...data.map(item => 
      headers.map(header => {
        const value = (item as any)[header];
        return typeof value === 'string' && value.includes(',')
          ? `"${value}"`
          : value;
      }).join(',')
    )
  ];

  return rows.join('\n');
}
