import { NextResponse } from 'next/server';
import { CoinGeckoClient } from 'coingecko-api-v3';

const client = new CoinGeckoClient({
  timeout: 20000,
  autoRetry: true,
});

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const vs_currency = searchParams.get('vs_currency') || 'usd';
    const daysParam = searchParams.get('days') || '7';
    const days = daysParam === 'max' ? 'max' : Number(daysParam);

    if (!id) {
      return NextResponse.json({ error: 'Missing id' }, { status: 400 });
    }

    console.log(`API Route: Fetching market chart for ${id}, ${days} days, vs ${vs_currency}...`);
    const data = await client.coinIdMarketChart({ id, vs_currency, days });
    return NextResponse.json(data);
  } catch (error) {
    console.error('API Route: Error fetching market chart:', error);
    return NextResponse.json(
      { error: 'Failed to fetch market chart' },
      { status: 500 }
    );
  }
}

