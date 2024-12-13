import { NextResponse } from 'next/server';
import { parseCSV } from '@/lib/parsers/csvParser';
import { parseJSON } from '@/lib/parsers/jsonParser';
import { calculateStatistics } from '@/lib/analysis/statistics';
import { generateCharts } from '@/lib/analysis/chartGenerator';
import { FileType } from '@/lib/types';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const fileType = formData.get('fileType') as FileType;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    let data;
    switch (fileType) {
      case 'csv':
        data = await parseCSV(file);
        break;
      case 'json':
        data = await parseJSON(file);
        break;
      default:
        return NextResponse.json(
          { error: 'Unsupported file type' },
          { status: 400 }
        );
    }

    const summary = calculateStatistics(data);
    const charts = generateCharts(data);

    return NextResponse.json({
      summary,
      charts,
      data,
    });
  } catch (error) {
    console.error('Analysis error:', error);
    return NextResponse.json(
      { error: 'Failed to analyze data' },
      { status: 500 }
    );
  }
}