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
import { logger } from '@/lib/logger';
import { cache } from '@/lib/cache';
import { computeFileHash } from '@/lib/utils';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const SUPPORTED_FILE_TYPES = ['csv', 'json', 'xlsx'] as const;

export async function POST(request: Request) {
  const startTime = Date.now();
  const requestId = crypto.randomUUID();

  try {
    // Apply rate limiting
    const rateLimit = await rateLimitMiddleware(request);
    if (rateLimit.status === 429) {
      logger.warn('Rate limit exceeded', { requestId });
      return rateLimit;
    }

    // Authenticate user
    const token = await getToken({ req: request as any });
    if (!token) {
      logger.warn('Unauthorized request', { requestId });
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Parse request
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const fileType = formData.get('fileType') as FileType;
    const options = JSON.parse(formData.get('options')?.toString() || '{}');

    if (!file) {
      logger.warn('No file provided', { requestId });
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Validate file
    try {
      validateFileSize(file, MAX_FILE_SIZE);
      validateFileType(file, SUPPORTED_FILE_TYPES);
    } catch (error: any) {
      logger.warn('File validation failed', { requestId, error: error.message });
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    // Check cache
    const cacheKey = `analysis-${token.sub}-${await computeFileHash(file)}`;
    const cachedResult = await cache.get(cacheKey);
    if (cachedResult && !options.skipCache) {
      logger.info('Returning cached result', { requestId });
      return NextResponse.json(cachedResult);
    }

    // Start analysis and broadcast update
    await broadcastUpdate(`analysis-${token.sub}`, {
      type: 'analysis_started',
      payload: { 
        filename: file.name,
        requestId,
        timestamp: new Date().toISOString()
      },
      userId: token.sub as string,
    });

    // Parse data
    let data;
    try {
      switch (fileType) {
        case 'csv':
          data = await parseCSV(file, options.csvOptions);
          break;
        case 'json':
          data = await parseJSON(file, options.jsonOptions);
          break;
        default:
          logger.warn('Unsupported file type', { requestId, fileType });
          return NextResponse.json({ error: 'Unsupported file type' }, { status: 400 });
      }
    } catch (error: any) {
      logger.error('Data parsing failed', { requestId, error: error.message });
      await broadcastUpdate(`analysis-${token.sub}`, {
        type: 'analysis_error',
        payload: { 
          error: error.message,
          requestId,
          timestamp: new Date().toISOString()
        },
        userId: token.sub as string,
      });
      throw error;
    }

    // Validate parsed data
    data = validateDataset(data);

    // Perform analysis with progress updates
    const analysisSteps = [
      { name: 'statistics', fn: () => calculateStatistics(data) },
      { name: 'charts', fn: () => generateCharts(data, options.chartOptions) },
      { name: 'outliers', fn: () => detectOutliers(data, options.outlierOptions) },
      { name: 'trends', fn: () => analyzeTrends(data, options.trendOptions) },
      { name: 'seasonality', fn: () => detectSeasonality(data, options.seasonalityOptions) }
    ];

    const results: Record<string, any> = {};
    for (const [index, step] of analysisSteps.entries()) {
      await broadcastUpdate(`analysis-${token.sub}`, {
        type: 'analysis_progress',
        payload: { 
          step: step.name,
          progress: ((index + 1) / analysisSteps.length) * 100,
          requestId,
          timestamp: new Date().toISOString()
        },
        userId: token.sub as string,
      });
      results[step.name] = await step.fn();
    }

    const response = {
      summary: results.statistics,
      charts: results.charts,
      advancedAnalysis: {
        outliers: results.outliers,
        trends: results.trends,
        seasonality: results.seasonality,
      },
      data,
      metadata: {
        processingTime: Date.now() - startTime,
        requestId,
        timestamp: new Date().toISOString(),
      }
    };

    // Cache result
    await cache.set(cacheKey, response, 60 * 60); // Cache for 1 hour

    // Broadcast completion
    await broadcastUpdate(`analysis-${token.sub}`, {
      type: 'analysis_complete',
      payload: { 
        filename: file.name,
        requestId,
        timestamp: new Date().toISOString(),
        processingTime: Date.now() - startTime
      },
      userId: token.sub as string,
    });

    logger.info('Analysis completed successfully', { 
      requestId, 
      processingTime: Date.now() - startTime 
    });

    return NextResponse.json(response);
  } catch (error: any) {
    logger.error('Analysis failed', { 
      requestId, 
      error: error.message,
      stack: error.stack
    });

    return NextResponse.json(
      { error: 'Analysis failed', message: error.message },
      { status: 500 }
    );
  }
}