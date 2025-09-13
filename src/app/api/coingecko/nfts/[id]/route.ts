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

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    if (!id) {
      return NextResponse.json({ error: 'Missing NFT collection ID' }, { status: 400 });
    }
    
    // Apply rate limiting
    await rateLimit();
    
    console.log(`API Route: Fetching NFT collection details for ${id}...`);
    
    const response = await fetch(`${COINGECKO_API_BASE}/nfts/${id}`, {
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
        const retryResponse = await fetch(`${COINGECKO_API_BASE}/nfts/${id}`, {
          headers: {
            'Accept': 'application/json',
            'User-Agent': 'clean-mind-crypto/1.0.0'
          }
        });
        
        if (!retryResponse.ok) {
          throw new Error(`CoinGecko API error: ${retryResponse.status} ${retryResponse.statusText}`);
        }
        
        const retryData = await retryResponse.json();
        return NextResponse.json(retryData);
      }
      throw new Error(`CoinGecko API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log(`API Route: Successfully fetched NFT collection details for ${id}`);
    return NextResponse.json(data);
  } catch (error) {
    console.error('API Route: Error fetching NFT collection details:', error);
    return NextResponse.json(
      { error: 'Failed to fetch NFT collection details' },
      { status: 500 }
    );
  }
}