import { NextResponse } from 'next/server';

const COINGECKO_API_BASE = 'https://api.coingecko.com/api/v3';

// Rate limiting for API routes
let lastRequestTime = 0;
const RATE_LIMIT_DELAY = 1000; // 1 second between requests

async function rateLimit() {
  const now = Date.now();
  const timeSinceLastRequest = now - lastRequestTime;
  
  if (timeSinceLastRequest < RATE_LIMIT_DELAY) {
    const delay = RATE_LIMIT_DELAY - timeSinceLastRequest;
    await new Promise(resolve => setTimeout(resolve, delay));
  }
  
  lastRequestTime = Date.now();
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const perPage = parseInt(searchParams.get('per_page') || '20');
    const order = searchParams.get('order') || 'market_cap_usd_desc';

    // Apply rate limiting
    await rateLimit();

    console.log(`API Route: Fetching NFTs (page: ${page}, perPage: ${perPage}, order: ${order}) from CoinGecko API...`);
    
    const params = new URLSearchParams({
      page: page.toString(),
      per_page: perPage.toString(),
      order: order
    });

    const response = await fetch(`${COINGECKO_API_BASE}/nfts/list?${params.toString()}`, {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'clean-mind-crypto/1.0.0'
      }
    });

    if (!response.ok) {
      if (response.status === 429) {
        console.warn('API Route: Rate limited, waiting before retry...');
        await new Promise(resolve => setTimeout(resolve, 5000));
        // Retry once after waiting
        const retryResponse = await fetch(`${COINGECKO_API_BASE}/nfts/list?${params.toString()}`, {
          headers: {
            'Accept': 'application/json',
            'User-Agent': 'clean-mind-crypto/1.0.0'
          }
        });
        
        if (!retryResponse.ok) {
          throw new Error(`CoinGecko API error: ${retryResponse.status} ${retryResponse.statusText}`);
        }
        
        const retryData = await retryResponse.json();
        console.log('API Route: Successfully fetched NFTs data after retry');
        return NextResponse.json(retryData);
      }
      throw new Error(`CoinGecko API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('API Route: Successfully fetched NFTs data');
    return NextResponse.json(data);
  } catch (error) {
    console.error('API Route: Error fetching NFTs data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch NFTs data' },
      { status: 500 }
    );
  }
}