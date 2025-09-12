import { NextResponse } from 'next/server';
import { CoinGeckoClient } from 'coingecko-api-v3';

const client = new CoinGeckoClient({
  timeout: 20000,
  autoRetry: true,
});

export async function GET() {
  try {
    console.log('API Route: Testing CoinGecko API connection...');
    const data = await client.ping();
    console.log('API Route: CoinGecko API connection successful');
    return NextResponse.json(data);
  } catch (error) {
    console.error('API Route: Error testing API connection:', error);
    return NextResponse.json(
      { error: 'Failed to connect to CoinGecko API' },
      { status: 500 }
    );
  }
}