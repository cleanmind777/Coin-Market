import { NextResponse } from 'next/server';
import { CoinGeckoClient } from 'coingecko-api-v3';

const client = new CoinGeckoClient({
  timeout: 20000,
  autoRetry: true,
});

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const ids = searchParams.get('ids') || '';
    const vs_currencies = searchParams.get('vs_currencies') || 'usd';

    if (!ids) {
      return NextResponse.json({ error: 'Missing ids' }, { status: 400 });
    }

    console.log(`API Route: Fetching simple price for ids=${ids}, vs=${vs_currencies}...`);
    const data = await client.simplePrice({ ids, vs_currencies });
    return NextResponse.json(data);
  } catch (error) {
    console.error('API Route: Error fetching simple price:', error);
    return NextResponse.json(
      { error: 'Failed to fetch simple price' },
      { status: 500 }
    );
  }
}

