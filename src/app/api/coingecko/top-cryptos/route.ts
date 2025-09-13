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
    console.log('API Route: Sample data with all fields:', data.slice(0, 1).map(item => {
      const coin = item as typeof item & {
        price_change_percentage_7d_in_currency?: number;
        price_change_percentage_1h_in_currency?: number;
        price_change_percentage_30d_in_currency?: number;
      };
      return {
        id: item.id,
        name: item.name,
        price_change_percentage_24h: item.price_change_percentage_24h,
        price_change_percentage_7d_in_currency: coin.price_change_percentage_7d_in_currency,
        price_change_percentage_1h_in_currency: coin.price_change_percentage_1h_in_currency,
        price_change_percentage_30d_in_currency: coin.price_change_percentage_30d_in_currency,
        all_price_change_fields: Object.keys(item).filter(key => key.includes('price_change')),
      };
    }));
    return NextResponse.json(data);
  } catch (error) {
    console.error('API Route: Error fetching top cryptos data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch top cryptos data' },
      { status: 500 }
    );
  }
}