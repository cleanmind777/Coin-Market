import { NextResponse } from 'next/server';
import { CoinGeckoClient } from 'coingecko-api-v3';

const client = new CoinGeckoClient({
  timeout: 20000,
  autoRetry: true,
});

export async function GET() {
  try {
    console.log('API Route: Fetching trending data from CoinGecko API...');
    const data = await client.trending();
    console.log('API Route: Successfully fetched trending data');
    return NextResponse.json(data);
  } catch (error) {
    console.error('API Route: Error fetching trending data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch trending data' },
      { status: 500 }
    );
  }
}