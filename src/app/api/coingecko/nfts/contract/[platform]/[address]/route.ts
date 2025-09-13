import { NextResponse } from 'next/server';

const COINGECKO_API_BASE = 'https://api.coingecko.com/api/v3';

export async function GET(
  _request: Request,
  context: { params: Promise<{ platform: string; address: string }> }
) {
  try {
    const { platform, address } = await context.params;
    if (!platform || !address) {
      return NextResponse.json({ error: 'Missing platform or contract address' }, { status: 400 });
    }
    console.log(`API Route: Fetching NFT collection by contract ${address} on ${platform}...`);
    
    const response = await fetch(`${COINGECKO_API_BASE}/nfts/${platform}/contract/${address}`, {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'clean-mind-crypto/1.0.0'
      }
    });

    if (!response.ok) {
      throw new Error(`CoinGecko API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('API Route: Error fetching NFT collection by contract:', error);
    return NextResponse.json(
      { error: 'Failed to fetch NFT collection by contract' },
      { status: 500 }
    );
  }
}