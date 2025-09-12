import { NextResponse } from 'next/server';
import { CoinGeckoClient } from 'coingecko-api-v3';

const client = new CoinGeckoClient({
  timeout: 20000,
  autoRetry: true,
});

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    if (!id) {
      return NextResponse.json({ error: 'Missing id' }, { status: 400 });
    }
    console.log(`API Route: Fetching coin details for ${id}...`);
    const data = await client.coinId({ id });
    return NextResponse.json(data);
  } catch (error) {
    console.error('API Route: Error fetching coin details:', error);
    return NextResponse.json(
      { error: 'Failed to fetch coin details' },
      { status: 500 }
    );
  }
}

