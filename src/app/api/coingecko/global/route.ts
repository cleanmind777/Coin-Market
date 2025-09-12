import { NextResponse } from 'next/server';
import { CoinGeckoClient } from 'coingecko-api-v3';

const client = new CoinGeckoClient({
  timeout: 20000,
  autoRetry: true,
});

export async function GET() {
  try {
    console.log('API Route: Fetching global market data from CoinGecko API...');
    const data = await client.global();
    console.log('API Route: Successfully fetched global market data');
    return NextResponse.json(data);
  } catch (error) {
    console.error('API Route: Error fetching global data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch global market data' },
      { status: 500 }
    );
  }
}