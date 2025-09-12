import { NextResponse } from 'next/server';
import { CoinGeckoClient } from 'coingecko-api-v3';

const client = new CoinGeckoClient({
  timeout: 20000,
  autoRetry: true,
});

export async function GET() {
  try {
    console.log('API Route: Fetching supported currencies...');
    const data = await client.simpleSupportedCurrencies();
    return NextResponse.json(data);
  } catch (error) {
    console.error('API Route: Error fetching supported currencies:', error);
    return NextResponse.json(
      { error: 'Failed to fetch supported currencies' },
      { status: 500 }
    );
  }
}

