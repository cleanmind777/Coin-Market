import { NextResponse } from 'next/server';
import { CoinGeckoClient } from 'coingecko-api-v3';

const client = new CoinGeckoClient({
  timeout: 20000,
  autoRetry: true,
});

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query') || '';

    if (!query) {
      return NextResponse.json({ error: 'Missing query' }, { status: 400 });
    }

    console.log(`API Route: Searching cryptos with query: ${query}...`);
    const data = await client.search({ query });
    return NextResponse.json(data);
  } catch (error) {
    console.error('API Route: Error searching cryptos:', error);
    return NextResponse.json(
      { error: 'Failed to search cryptos' },
      { status: 500 }
    );
  }
}

