import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { parseCSV } from '@/lib/parsers/csvParser';
import { parseJSON } from '@/lib/parsers/jsonParser';
import { calculateStatistics } from '@/lib/analysis/statistics';
import { generateCharts } from '@/lib/analysis/chartGenerator';
import { detectOutliers, analyzeTrends, detectSeasonality } from '@/lib/analysis/advancedAnalysis';
import { validateFileSize, validateFileType, validateDataset } from '@/lib/validation';
import { broadcastUpdate } from '@/lib/realtime/pusher';
import { FileType } from '@/lib/types';
import { rateLimitMiddleware } from '@/lib/middleware/rateLimit';

export async function POST(request: Request) {
  try {
    // Apply rate limiting
    const rateLimit = await rateLimitMiddleware(request);
    if (rateLimit.status === 429) {
      return rateLimit;
    }

    const token = await getToken({ req: request as any });
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const fileType = formData.get('fileType') as FileType;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Validate file
    try {
      validateFileSize(file);
      validateFileType(file, ['csv', 'json', 'xlsx']);
    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    // Start analysis and broadcast update
    await broadcastUpdate(`analysis-${token.sub}`, {
      type: 'analysis_started',
      payload: { filename: file.name },
      timestamp: new Date().toISOString(),
      userId: token.sub as string,
    });

    // Parse data
    let data;
    try {
      switch (fileType) {
        case 'csv':
          data = await parseCSV(file);
          break;
        case 'json':
          data = await parseJSON(file);
          break;
        default:
          return NextResponse.json({ error: 'Unsupported file type' }, { status: 400 });
      }
    } catch (error: any) {
      await broadcastUpdate(`analysis-${token.sub}`, {
        type: 'analysis_error',
        payload: { error: error.message },
        timestamp: new Date().toISOString(),
        userId: token.sub as string,
      });
      throw error;
    }

    // Validate parsed data
    data = validateDataset(data);

    // Perform analysis
    const summary = calculateStatistics(data);
    const charts = generateCharts(data);
    const outliers = detectOutliers(data);
    const trends = analyzeTrends(data);
    const seasonality = detectSeasonality(data);

    // Broadcast completion
    await broadcastUpdate(`analysis-${token.sub}`, {
      type: 'analysis_complete',
      payload: { filename: file.name },
      timestamp: new Date().toISOString(),
      userId: token.sub as string,
    });

    return NextResponse.json({
      summary,
      charts,
      advancedAnalysis: {
        outliers,
        trends,
        seasonality,
      },
      data,
    });
  } catch (error: any) {
    console.error('Analysis error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to analyze data' },
      { status: 500 }
    );
  }
}