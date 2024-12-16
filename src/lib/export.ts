import { ChartConfig, DataPoint } from './types';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, BorderStyle } from 'docx';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { SecurityService } from './security';

interface ExportOptions {
  format: 'csv' | 'xlsx' | 'pdf' | 'docx' | 'html' | 'markdown' | 'latex' | 'xml' | 'sql' | 'python';
  template?: string;
  styling?: {
    theme?: 'light' | 'dark' | 'custom';
    colors?: string[];
    fonts?: string[];
    pageSize?: 'A4' | 'Letter' | 'Legal';
    orientation?: 'portrait' | 'landscape';
  };
  security?: {
    encrypt?: boolean;
    password?: string;
    watermark?: string;
    metadata?: {
      author?: string;
      company?: string;
      createdAt?: Date;
    };
  };
  compression?: {
    enabled?: boolean;
    level?: number;
  };
}

async function exportToLatex(data: DataPoint[]): Promise<string> {
  let latex = `\\documentclass{article}
\\usepackage{booktabs}
\\usepackage{longtable}
\\usepackage{graphicx}
\\begin{document}

\\section{Data Export}
\\begin{longtable}{${Array(Object.keys(data[0] || {}).length).fill('l').join('')}}
\\toprule
${Object.keys(data[0] || {}).join(' & ')} \\\\
\\midrule
`;

  data.forEach(point => {
    latex += `${Object.values(point).join(' & ')} \\\\\n`;
  });

  latex += `\\bottomrule
\\end{longtable}
\\end{document}`;

  return latex;
}

async function exportToXML(data: DataPoint[]): Promise<string> {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<data>
  ${data.map(point => `
  <record>
    ${Object.entries(point).map(([key, value]) => `
    <${key}>${value}</${key}>`).join('')}
  </record>`).join('')}
</data>`;

  return xml;
}

async function exportToSQL(data: DataPoint[]): Promise<string> {
  const tableName = 'exported_data';
  const columns = Object.keys(data[0] || {});
  
  let sql = `CREATE TABLE ${tableName} (\n`;
  sql += columns.map(col => `  ${col} TEXT`).join(',\n');
  sql += '\n);\n\n';

  data.forEach(point => {
    const values = Object.values(point).map(val => 
      typeof val === 'string' ? `'${val.replace(/'/g, "''")}'` : val
    );
    sql += `INSERT INTO ${tableName} (${columns.join(', ')}) VALUES (${values.join(', ')});\n`;
  });

  return sql;
}

async function exportToPython(data: DataPoint[]): Promise<string> {
  const variableName = 'exported_data';
  return `import pandas as pd

${variableName} = pd.DataFrame(${JSON.stringify(data)})

# Basic statistics
print("Basic Statistics:")
print(${variableName}.describe())

# Data types
print("\\nData Types:")
print(${variableName}.dtypes)

# Sample code for visualization
import matplotlib.pyplot as plt
import seaborn as sns

# Create some example visualizations
plt.figure(figsize=(12, 6))
sns.boxplot(data=${variableName})
plt.title("Box Plot of Numerical Columns")
plt.xticks(rotation=45)
plt.tight_layout()
plt.show()
`;
}

export async function exportData(data: DataPoint[], options: ExportOptions) {
  let content: string | Blob;
  let filename: string;
  let mimeType: string;

  const timestamp = new Date().toISOString().replace(/[:]/g, '-');

  switch (options.format) {
    case 'latex':
      content = await exportToLatex(data);
      filename = `export_${timestamp}.tex`;
      mimeType = 'application/x-tex';
      break;

    case 'xml':
      content = await exportToXML(data);
      filename = `export_${timestamp}.xml`;
      mimeType = 'application/xml';
      break;

    case 'sql':
      content = await exportToSQL(data);
      filename = `export_${timestamp}.sql`;
      mimeType = 'application/sql';
      break;

    case 'python':
      content = await exportToPython(data);
      filename = `export_${timestamp}.py`;
      mimeType = 'text/x-python';
      break;

    case 'markdown':
      content = `# Data Export
Generated: ${new Date().toLocaleString()}

## Data Table
${Object.keys(data[0] || {}).join(' | ')}
${Object.keys(data[0] || {}).map(() => '---').join(' | ')}
${data.map(point => Object.values(point).join(' | ')).join('\n')}
`;
      filename = `export_${timestamp}.md`;
      mimeType = 'text/markdown';
      break;

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
            new Table({
              rows: [
                new TableRow({
                  children: Object.keys(data[0] || {}).map(key => new TableCell({
                    children: [new Paragraph(new TextRun(key))],
                    borders: {
                      top: { style: BorderStyle.SINGLE, size: 1 },
                      bottom: { style: BorderStyle.SINGLE, size: 1 },
                      left: { style: BorderStyle.SINGLE, size: 1 },
                      right: { style: BorderStyle.SINGLE, size: 1 },
                    },
                  })),
                }),
                ...data.map(point => new TableRow({
                  children: Object.values(point).map(val => new TableCell({
                    children: [new Paragraph(new TextRun(String(val)))],
                    borders: {
                      top: { style: BorderStyle.SINGLE, size: 1 },
                      bottom: { style: BorderStyle.SINGLE, size: 1 },
                      left: { style: BorderStyle.SINGLE, size: 1 },
                      right: { style: BorderStyle.SINGLE, size: 1 },
                    },
                  })),
                })),
              ],
            }),
          ],
        }],
      });
      
      content = await Packer.toBlob(doc);
      filename = `export_${timestamp}.docx`;
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
      filename = `export_${timestamp}.html`;
      mimeType = 'text/html';
      break;

    default:
      return exportLegacyFormat(data, options.format);
  }

  if (options.security?.encrypt && options.security.password) {
    const securityService = new SecurityService({
      encryption: {
        enabled: true,
        algorithm: 'aes-256-gcm',
        keyDerivation: 'scrypt',
      },
      authentication: {
        mfa: false,
        sessionTimeout: 3600,
        passwordPolicy: {
          minLength: 8,
          requireSpecialChar: true,
          requireNumber: true,
          requireUppercase: true,
          maxAge: 90,
        },
      },
      audit: {
        enabled: true,
        retention: 90,
        sensitiveFields: ['password', 'token'],
      },
    });

    if (content instanceof Blob) {
      content = await content.text();
    }

    const encrypted = await securityService.encryptData(
      content,
      options.security.password
    );
    content = JSON.stringify(encrypted);
    filename += '.encrypted';
  }

  if (options.compression?.enabled) {
    // Implement compression logic here
  }

  const blob = content instanceof Blob ? content : new Blob([content], { type: mimeType });
  
  if (options.security?.watermark) {
    // Add watermark to supported formats
  }

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
