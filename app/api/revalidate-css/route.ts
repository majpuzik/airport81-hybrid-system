import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

/**
 * API endpoint pro WordPress webhook
 * Revaliduje CSS když se změní v WordPress/Elementor
 */
export async function POST(request: NextRequest) {
  try {
    // Ověřit webhook secret
    const authHeader = request.headers.get('authorization');
    const webhookSecret = process.env.WEBHOOK_SECRET;
    
    if (!webhookSecret || authHeader !== `Bearer ${webhookSecret}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // Parsovat body
    const body = await request.json();
    
    // Logovat událost
    console.log('CSS revalidation triggered:', {
      timestamp: body.timestamp,
      source: body.source,
      type: body.type
    });
    
    // Revalidovat všechny stránky
    revalidatePath('/', 'layout'); // Revaliduje layout a všechny stránky
    
    return NextResponse.json({
      success: true,
      message: 'CSS revalidated successfully',
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('CSS revalidation error:', error);
    
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

/**
 * GET endpoint pro testování
 */
export async function GET() {
  return NextResponse.json({
    status: 'ready',
    endpoint: '/api/revalidate-css',
    method: 'POST',
    authentication: 'Bearer token required',
    description: 'Webhook endpoint for WordPress CSS updates'
  });
}