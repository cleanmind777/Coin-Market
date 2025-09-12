import { NextResponse } from 'next/server';
import { CoinGeckoClient } from 'coingecko-api-v3';

const client = new CoinGeckoClient({
  timeout: 20000,
  autoRetry: true,
});

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const per_page = parseInt(searchParams.get('per_page') || '20', 10);

    console.log(`API Route: Fetching exchanges page=${page} per_page=${per_page} ...`);
    const data = await client.exchanges({ page, per_page });
    return NextResponse.json(data);
  } catch (error) {
    console.error('API Route: Error fetching exchanges:', error);
    return NextResponse.json(
      { error: 'Failed to fetch exchanges' },
      { status: 500 }
    );
  }
}

