import { CoinGeckoClient } from 'coingecko-api-v3';

// Initialize CoinGecko client with better error handling
const client = new CoinGeckoClient({
  timeout: 20000,
  autoRetry: true,
});

// Types for our application
export interface CryptoCurrency {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_percentage_1h_in_currency?: number | null;
  price_change_24h: number | null;
  price_change_percentage_24h: number | null;
  price_change_percentage_7d: number | null;
  price_change_percentage_30d: number | null;
  market_cap_change_24h: number | null;
  market_cap_change_percentage_24h: number | null;
  circulating_supply: number;
  total_supply: number;
  max_supply: number | null;
  ath: number;
  ath_change_percentage: number | null;
  ath_date: string;
  atl: number;
  atl_change_percentage: number | null;
  atl_date: string;
  roi: {
    times: number;
    currency: string;
    percentage: number;
  } | null;
  last_updated: string;
}

export interface TrendingCoin {
  id: string;
  coin_id: number;
  name: string;
  symbol: string;
  market_cap_rank: number;
  thumb: string;
  small: string;
  large: string;
  slug: string;
  price_btc: number;
  score: number;
}

export interface TrendingData {
  coins: Array<{
    item: TrendingCoin;
  }>;
  exchanges: Array<{
    id: string;
    name: string;
    thumb: string;
    large: string;
  }>;
}

export interface GlobalData {
  data: {
    active_cryptocurrencies: number;
    upcoming_icos: number;
    ongoing_icos: number;
    ended_icos: number;
    markets: number;
    total_market_cap: Record<string, number>;
    total_volume: Record<string, number>;
    market_cap_percentage: Record<string, number>;
    market_cap_change_percentage_24h_usd: number;
    updated_at: number;
  };
}

export interface MarketChartData {
  prices: Array<[number, number]>;
  market_caps: Array<[number, number]>;
  total_volumes: Array<[number, number]>;
}

// Mock data for fallback when API fails
const mockGlobalData: GlobalData = {
  data: {
    active_cryptocurrencies: 10000,
    upcoming_icos: 0,
    ongoing_icos: 0,
    ended_icos: 0,
    markets: 800,
    total_market_cap: { usd: 2500000000000 },
    total_volume: { usd: 100000000000 },
    market_cap_percentage: { btc: 45.2, eth: 18.5 },
    market_cap_change_percentage_24h_usd: 2.5,
    updated_at: 1700000000, // Fixed timestamp for consistency
  }
};

const mockTrendingData: TrendingData = {
  coins: [
    {
      item: {
        id: 'bitcoin',
        coin_id: 1,
        name: 'Bitcoin',
        symbol: 'btc',
        market_cap_rank: 1,
        thumb: 'https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png',
        small: 'https://assets.coingecko.com/coins/images/1/small/bitcoin.png',
        large: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png',
        slug: 'bitcoin',
        price_btc: 1,
        score: 0
      }
    },
    {
      item: {
        id: 'ethereum',
        coin_id: 2,
        name: 'Ethereum',
        symbol: 'eth',
        market_cap_rank: 2,
        thumb: 'https://assets.coingecko.com/coins/images/279/thumb/ethereum.png',
        small: 'https://assets.coingecko.com/coins/images/279/small/ethereum.png',
        large: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png',
        slug: 'ethereum',
        price_btc: 0.067,
        score: 0
      }
    }
  ],
  exchanges: []
};

const mockCryptoData: CryptoCurrency[] = [
  {
    id: 'bitcoin',
    symbol: 'btc',
    name: 'Bitcoin',
    image: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png',
    current_price: 45000,
    market_cap: 900000000000,
    market_cap_rank: 1,
    fully_diluted_valuation: 945000000000,
    total_volume: 25000000000,
    high_24h: 46000,
    low_24h: 44000,
    price_change_24h: 1000,
    price_change_percentage_24h: 2.27,
    price_change_percentage_7d: 5.2,
    price_change_percentage_30d: 12.5,
    market_cap_change_24h: 20000000000,
    market_cap_change_percentage_24h: 2.27,
    circulating_supply: 20000000,
    total_supply: 21000000,
    max_supply: 21000000,
    ath: 69000,
    ath_change_percentage: -34.78,
    ath_date: '2021-11-10T14:24:11.849Z',
    atl: 67.81,
    atl_change_percentage: 66263.12,
    atl_date: '2013-07-06T00:00:00.000Z',
    roi: null,
    last_updated: '2024-11-15T10:00:00.000Z' // Fixed timestamp for consistency
  },
  {
    id: 'ethereum',
    symbol: 'eth',
    name: 'Ethereum',
    image: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png',
    current_price: 3000,
    market_cap: 360000000000,
    market_cap_rank: 2,
    fully_diluted_valuation: 360000000000,
    total_volume: 15000000000,
    high_24h: 3100,
    low_24h: 2900,
    price_change_24h: 50,
    price_change_percentage_24h: 1.69,
    price_change_percentage_7d: 3.2,
    price_change_percentage_30d: 8.5,
    market_cap_change_24h: 6000000000,
    market_cap_change_percentage_24h: 1.69,
    circulating_supply: 120000000,
    total_supply: 120000000,
    max_supply: null,
    ath: 4800,
    ath_change_percentage: -37.5,
    ath_date: '2021-11-10T14:24:11.849Z',
    atl: 0.432979,
    atl_change_percentage: 692461.12,
    atl_date: '2015-10-20T00:00:00.000Z',
    roi: {
      times: 50.0,
      currency: 'btc',
      percentage: 5000.0
    },
    last_updated: '2024-11-15T10:00:00.000Z' // Fixed timestamp for consistency
  }
];

// Mock market chart data with fixed timestamps to avoid hydration issues
const getMockChartData = (): MarketChartData => {
  const now = 1700000000000; // Fixed timestamp for consistency
  return {
    prices: [
      [now - 7 * 24 * 60 * 60 * 1000, 42000],
      [now - 6 * 24 * 60 * 60 * 1000, 43500],
      [now - 5 * 24 * 60 * 60 * 1000, 42800],
      [now - 4 * 24 * 60 * 60 * 1000, 44200],
      [now - 3 * 24 * 60 * 60 * 1000, 43800],
      [now - 2 * 24 * 60 * 60 * 1000, 44500],
      [now - 1 * 24 * 60 * 60 * 1000, 44000],
      [now, 45000]
    ],
    market_caps: [
      [now - 7 * 24 * 60 * 60 * 1000, 800000000000],
      [now - 6 * 24 * 60 * 60 * 1000, 830000000000],
      [now - 5 * 24 * 60 * 60 * 1000, 820000000000],
      [now - 4 * 24 * 60 * 60 * 1000, 850000000000],
      [now - 3 * 24 * 60 * 60 * 1000, 840000000000],
      [now - 2 * 24 * 60 * 60 * 1000, 860000000000],
      [now - 1 * 24 * 60 * 60 * 1000, 850000000000],
      [now, 900000000000]
    ],
    total_volumes: [
      [now - 7 * 24 * 60 * 60 * 1000, 20000000000],
      [now - 6 * 24 * 60 * 60 * 1000, 22000000000],
      [now - 5 * 24 * 60 * 60 * 1000, 18000000000],
      [now - 4 * 24 * 60 * 60 * 1000, 25000000000],
      [now - 3 * 24 * 60 * 60 * 1000, 21000000000],
      [now - 2 * 24 * 60 * 60 * 1000, 23000000000],
      [now - 1 * 24 * 60 * 60 * 1000, 20000000000],
      [now, 25000000000]
    ]
  };
};

// Utility function to check if we're in development
const isDevelopment = process.env.NODE_ENV === 'development';

// API Service Class
export class CoinGeckoService {
  // Test API connection
  static async testConnection(): Promise<boolean> {
    try {
      console.log('Testing CoinGecko API connection...');
      const response = await fetch('/api/coingecko/ping');
      if (!response.ok) {
        throw new Error(`API test failed: ${response.status}`);
      }
      const data = await response.json();
      console.log('✅ CoinGecko API connection successful:', data);
      return true;
    } catch (error) {
      console.error('❌ CoinGecko API connection failed:', error);
      return false;
    }
  }
  // Get global market data
  static async getGlobalData(): Promise<GlobalData> {
    try {
      console.log('Fetching global market data from CoinGecko API...');
      const response = await fetch('/api/coingecko/global');
      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }
      const data = await response.json();
      console.log('Successfully fetched global market data:', data);
      return data as GlobalData;
    } catch (error) {
      console.error('CoinGecko API failed for global market data:', error);
      console.warn('Falling back to mock data for global market data');
      return mockGlobalData;
    }
  }

  // Exchanges list
  static async getExchanges(page: number = 1, per_page: number = 20): Promise<any[]> {
    try {
      const resp = await fetch(`/api/coingecko/exchanges?page=${page}&per_page=${per_page}`);
      if (!resp.ok) throw new Error(`Status ${resp.status}`);
      const data = await resp.json();
      return data;
    } catch (error) {
      console.warn('Failed to fetch exchanges:', error);
      return [];
    }
  }

  // Get trending cryptocurrencies
  static async getTrending(): Promise<TrendingData> {
    try {
      console.log('Fetching trending cryptocurrencies from CoinGecko API...');
      const response = await fetch('/api/coingecko/trending');
      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }
      const data = await response.json();
      console.log('Successfully fetched trending data:', data);
      return data as unknown as TrendingData;
    } catch (error) {
      console.error('CoinGecko API failed for trending cryptocurrencies:', error);
      console.warn('Falling back to mock data for trending cryptocurrencies');
      return mockTrendingData;
    }
  }

  // Get top cryptocurrencies by market cap
  static async getTopCryptos(page: number = 1, perPage: number = 100): Promise<CryptoCurrency[]> {
    try {
      console.log(`Fetching top ${perPage} cryptocurrencies from CoinGecko API (page ${page})...`);
      const response = await fetch(`/api/coingecko/top-cryptos?page=${page}&perPage=${perPage}`);
      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }
      const data = await response.json();
      const normalized = (data as any[]).map((c) => ({
        ...c,
        price_change_percentage_1h_in_currency: c.price_change_percentage_1h_in_currency ?? c.price_change_percentage_1h_in_currency ?? null,
        price_change_percentage_24h: c.price_change_percentage_24h ?? c.price_change_percentage_24h_in_currency ?? null,
        price_change_percentage_7d: c.price_change_percentage_7d ?? c.price_change_percentage_7d_in_currency ?? null,
        price_change_percentage_30d: c.price_change_percentage_30d ?? c.price_change_percentage_30d_in_currency ?? null,
      }));
      console.log(`Successfully fetched ${normalized.length} cryptocurrencies:`, normalized.slice(0, 3));
      return normalized as unknown as CryptoCurrency[];
    } catch (error) {
      console.error('CoinGecko API failed for top cryptocurrencies:', error);
      console.warn('Falling back to mock data for top cryptocurrencies');
      return mockCryptoData;
    }
  }

  // Get specific cryptocurrency details
  static async getCryptoDetails(id: string): Promise<any> {
    try {
      console.log(`Fetching detailed data for ${id} from API route...`);
      const response = await fetch(`/api/coingecko/coin/${id}`);
      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }
      const data = await response.json();
      console.log(`Successfully fetched details for ${id}:`, data.name);
      return data;
    } catch (error) {
      console.error(`CoinGecko API failed for crypto details (${id}):`, error);
      console.warn('Falling back to mock data for crypto details');
      // Return mock data for the requested crypto or default to Bitcoin
      return mockCryptoData.find(crypto => crypto.id === id) || mockCryptoData[0];
    }
  }

  // Get market chart data for a specific cryptocurrency
  static async getMarketChart(
    id: string,
    days: number = 7,
    vs_currency: string = 'usd'
  ): Promise<MarketChartData> {
    try {
      console.log(`Fetching market chart data for ${id} (${days} days) from API route...`);
      const params = new URLSearchParams({ id, vs_currency, days: String(days) });
      const response = await fetch(`/api/coingecko/market-chart?${params.toString()}`);
      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }
      const data = await response.json();
      console.log(`Successfully fetched chart data for ${id}:`, data.prices?.length, 'data points');
      return data as MarketChartData;
    } catch (error) {
      console.error(`CoinGecko API failed for market chart data (${id}):`, error);
      console.warn('Falling back to mock data for market chart');
      return getMockChartData();
    }
  }

  // Search for cryptocurrencies
  static async searchCryptos(query: string): Promise<any> {
    try {
      const response = await fetch(`/api/coingecko/search?query=${encodeURIComponent(query)}`);
      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.warn('CoinGecko API failed, using mock search results. Error:', error);
      if (isDevelopment) {
        console.log('This is expected in development if the API is not accessible.');
      }
      // Return filtered mock data based on search query
      const filteredResults = mockCryptoData.filter(crypto => 
        crypto.name.toLowerCase().includes(query.toLowerCase()) ||
        crypto.symbol.toLowerCase().includes(query.toLowerCase())
      );
      return {
        coins: filteredResults.map(crypto => ({
          id: crypto.id,
          name: crypto.name,
          symbol: crypto.symbol,
          market_cap_rank: crypto.market_cap_rank,
          thumb: crypto.image,
          large: crypto.image
        }))
      };
    }
  }

  // Get simple price data for multiple cryptocurrencies
  static async getSimplePrice(
    ids: string[],
    vs_currencies: string[] = ['usd'],
    include_market_cap: boolean = true,
    include_24hr_vol: boolean = true,
    include_24hr_change: boolean = true,
    include_last_updated_at: boolean = true
  ): Promise<any> {
    try {
      const params = new URLSearchParams({
        ids: ids.join(','),
        vs_currencies: vs_currencies.join(','),
        include_market_cap: String(include_market_cap),
        include_24hr_vol: String(include_24hr_vol),
        include_24hr_change: String(include_24hr_change),
        include_last_updated_at: String(include_last_updated_at),
      });
      const response = await fetch(`/api/coingecko/simple-price?${params.toString()}`);
      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.warn('CoinGecko API failed, using mock price data. Error:', error);
      if (isDevelopment) {
        console.log('This is expected in development if the API is not accessible.');
      }
      // Return mock price data for requested IDs
      const mockPriceData: any = {};
      ids.forEach(id => {
        const crypto = mockCryptoData.find(c => c.id === id);
        if (crypto) {
          mockPriceData[id] = {
            usd: crypto.current_price,
            usd_market_cap: include_market_cap ? crypto.market_cap : undefined,
            usd_24h_vol: include_24hr_vol ? crypto.total_volume : undefined,
            usd_24h_change: include_24hr_change ? crypto.price_change_percentage_24h : undefined,
            last_updated_at: include_last_updated_at ? 1700000000 : undefined
          };
        }
      });
      return mockPriceData;
    }
  }

  // Get supported currencies
  static async getSupportedCurrencies(): Promise<string[]> {
    try {
      const response = await fetch('/api/coingecko/supported-currencies');
      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.warn('CoinGecko API failed, using mock supported currencies. Error:', error);
      if (isDevelopment) {
        console.log('This is expected in development if the API is not accessible.');
      }
      return ['usd', 'eur', 'gbp', 'jpy', 'btc', 'eth'];
    }
  }

  // Get coin list
  static async getCoinList(): Promise<any[]> {
    try {
      const response = await fetch('/api/coingecko/coin-list');
      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.warn('CoinGecko API failed, using mock coin list. Error:', error);
      if (isDevelopment) {
        console.log('This is expected in development if the API is not accessible.');
      }
      return mockCryptoData.map(crypto => ({
        id: crypto.id,
        symbol: crypto.symbol,
        name: crypto.name
      }));
    }
  }
}

// Utility functions
export const formatCurrency = (value: number, currency: string = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 8,
  }).format(value);
};

export const formatNumber = (value: number): string => {
  if (value >= 1e12) {
    return (value / 1e12).toFixed(2) + 'T';
  } else if (value >= 1e9) {
    return (value / 1e9).toFixed(2) + 'B';
  } else if (value >= 1e6) {
    return (value / 1e6).toFixed(2) + 'M';
  } else if (value >= 1e3) {
    return (value / 1e3).toFixed(2) + 'K';
  }
  return value.toFixed(2);
};

export const formatPercentage = (value: number): string => {
  return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
};

export const getChangeColor = (value: number): string => {
  if (value > 0) return 'text-green-500';
  if (value < 0) return 'text-red-500';
  return 'text-gray-500';
};