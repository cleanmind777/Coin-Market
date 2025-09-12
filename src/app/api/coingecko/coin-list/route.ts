import { NextResponse } from 'next/server';
import { CoinGeckoClient } from 'coingecko-api-v3';

const client = new CoinGeckoClient({
  timeout: 20000,
  autoRetry: true,
});

export async function GET() {
  try {
    console.log('API Route: Fetching coin list...');
    const data = await client.coinList({});
    return NextResponse.json(data);
  } catch (error) {
    console.error('API Route: Error fetching coin list:', error);
    return NextResponse.json(
      { error: 'Failed to fetch coin list' },
      { status: 500 }
    );
  }
}

