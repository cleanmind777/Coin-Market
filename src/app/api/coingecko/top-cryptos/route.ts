import { NextResponse } from 'next/server';
import { CoinGeckoClient } from 'coingecko-api-v3';

const client = new CoinGeckoClient({
  timeout: 20000,
  autoRetry: true,
});

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const perPage = parseInt(searchParams.get('perPage') || '100');

    console.log(`API Route: Fetching top cryptos (page: ${page}, perPage: ${perPage}) from CoinGecko API...`);
    
    const data = await client.coinMarket({
      vs_currency: 'usd',
      order: 'market_cap_desc',
      per_page: perPage,
      page: page,
      sparkline: false,
      price_change_percentage: '1h,24h,7d,30d',
    });
    
    console.log('API Route: Successfully fetched top cryptos data');
    return NextResponse.json(data);
  } catch (error) {
    console.error('API Route: Error fetching top cryptos data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch top cryptos data' },
      { status: 500 }
    );
  }
}