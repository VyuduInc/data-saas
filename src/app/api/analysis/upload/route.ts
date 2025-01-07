import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { parse } from 'papaparse';

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const fileContent = await file.text();
    const { data, errors } = parse(fileContent, {
      header: true,
      skipEmptyLines: true,
    });

    if (errors.length > 0) {
      return NextResponse.json({ error: 'Invalid CSV format' }, { status: 400 });
    }

    // Create analysis record
    const analysis = await prisma.analysis.create({
      data: {
        title: file.name,
        data: data,
        summary: {
          rowCount: data.length,
          columns: Object.keys(data[0]),
        },
        charts: [],
        userId: (session.user as any).id,
      },
    });

    return NextResponse.json({ 
      success: true, 
      analysisId: analysis.id 
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
