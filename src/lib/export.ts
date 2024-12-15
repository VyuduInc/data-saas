import { ChartConfig, DataPoint } from './types';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { Document, Packer, Paragraph, TextRun } from 'docx';
import crypto from 'crypto';

interface ExportOptions {
  format: 'csv' | 'xlsx' | 'pdf' | 'docx' | 'html';
  encrypt?: boolean;
  password?: string;
}

function encryptData(data: string, password: string): string {
  const salt = crypto.randomBytes(16);
  const key = crypto.pbkdf2Sync(password, salt, 100000, 32, 'sha256');
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
  
  let encrypted = cipher.update(data, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  
  return JSON.stringify({
    salt: salt.toString('hex'),
    iv: iv.toString('hex'),
    data: encrypted
  });
}

export async function exportData(data: DataPoint[], options: ExportOptions) {
  let content: string | Blob;
  let filename: string;
  let mimeType: string;

  switch (options.format) {
    case 'docx':
      const doc = new Document({
        sections: [{
          properties: {},
          children: [
            new Paragraph({
              children: [
                new TextRun("Data Export"),
                new TextRun({
                  text: new Date().toLocaleString(),
                  break: 1
                }),
              ],
            }),
            ...data.map(point => new Paragraph({
              children: [new TextRun(JSON.stringify(point))]
            }))
          ],
        }],
      });
      
      content = await Packer.toBlob(doc);
      filename = `export_${Date.now()}.docx`;
      mimeType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
      break;

    case 'html':
      content = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Data Export</title>
          <style>
            table { border-collapse: collapse; width: 100%; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
          </style>
        </head>
        <body>
          <h1>Data Export</h1>
          <p>Generated: ${new Date().toLocaleString()}</p>
          <table>
            <thead>
              <tr>${Object.keys(data[0] || {}).map(key => `<th>${key}</th>`).join('')}</tr>
            </thead>
            <tbody>
              ${data.map(point => `
                <tr>${Object.values(point).map(val => `<td>${val}</td>`).join('')}</tr>
              `).join('')}
            </tbody>
          </table>
        </body>
        </html>
      `;
      filename = `export_${Date.now()}.html`;
      mimeType = 'text/html';
      break;

    default:
      return exportLegacyFormat(data, options.format);
  }

  if (options.encrypt && options.password) {
    if (content instanceof Blob) {
      content = await content.text();
    }
    content = encryptData(content, options.password);
    filename += '.encrypted';
  }

  const blob = content instanceof Blob ? content : new Blob([content], { type: mimeType });
  saveAs(blob, filename);
}

function exportLegacyFormat(data: DataPoint[], format: 'csv' | 'xlsx') {
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
