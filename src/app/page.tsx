'use client';

import { useEffect, useState } from 'react';
import { MainLayout } from '@/components/layout/main-layout';
import { MarketOverview } from '@/components/dashboard/market-overview';
import { TrendingCoins } from '@/components/dashboard/trending-coins';
import { TopCryptos } from '@/components/dashboard/top-cryptos';
import { ExchangesOverview } from '@/components/dashboard/exchanges-overview';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CoinGeckoService, GlobalData, TrendingData, CryptoCurrency } from '@/lib/coingecko';
import { RefreshCw, AlertCircle, TrendingUp } from 'lucide-react';

export default function Dashboard() {
  const [globalData, setGlobalData] = useState<GlobalData | null>(null);
  const [trendingData, setTrendingData] = useState<TrendingData | null>(null);
  const [topCryptos, setTopCryptos] = useState<CryptoCurrency[]>([]);
  const [exchanges, setExchanges] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [usingMockData, setUsingMockData] = useState(false);
  const [apiConnected, setApiConnected] = useState<boolean | null>(null);

  const testApiConnection = async () => {
    try {
      const connected = await CoinGeckoService.testConnection();
      setApiConnected(connected);
    } catch (error) {
      console.error('Error testing API connection:', error);
      setApiConnected(false);
    }
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      setUsingMockData(false);

      const [global, trending, cryptos, exchangesResp] = await Promise.all([
        CoinGeckoService.getGlobalData(),
        CoinGeckoService.getTrending(),
        CoinGeckoService.getTopCryptos(1, 20),
        CoinGeckoService.getExchanges(1, 20), // Fetch more exchanges for detailed view
      ]);

      setGlobalData(global);
      setTrendingData(trending);
      setTopCryptos(cryptos);
      setExchanges(Array.isArray(exchangesResp) ? exchangesResp : []);
      
      // Check if we're using mock data by looking at the data structure
      // Mock data has specific values that real API data won't have
      if (global.data.active_cryptocurrencies === 10000 && 
          global.data.total_market_cap.usd === 2500000000000) {
        setUsingMockData(true);
      } else {
        setUsingMockData(false);
        console.log('Using real CoinGecko API data!');
      }
    } catch (err) {
      setError('Failed to fetch data. Please try again.');
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    testApiConnection();
    fetchData();
  }, []);

  if (loading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p className="text-slate-300">Loading market data...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <Card className="max-w-md">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-destructive">
                <AlertCircle className="h-5 w-5" />
                <span>Error</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-300 mb-4">{error}</p>
              <Button onClick={fetchData} className="w-full">
                <RefreshCw className="h-4 w-4 mr-2" />
                Try Again
              </Button>
            </CardContent>
          </Card>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="space-y-8">
        {/* API Status Notification */}
        {apiConnected === false && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 mb-6">
            <div className="flex items-center space-x-3">
              <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
              <div>
                <h3 className="text-sm font-semibold text-red-200">
                  API Connection Failed
                </h3>
                <p className="text-sm text-red-300">
                  Unable to connect to CoinGecko API. Showing sample data for demonstration purposes.
                </p>
              </div>
            </div>
          </div>
        )}
        
        {apiConnected === true && !usingMockData && (
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4 mb-6">
            <div className="flex items-center space-x-3">
              <div className="h-5 w-5 bg-green-500 rounded-full flex items-center justify-center">
                <div className="h-2 w-2 bg-white rounded-full"></div>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-green-200">
                  Live Data Connected
                </h3>
                <p className="text-sm text-green-300">
                  Successfully connected to CoinGecko API. Showing real-time cryptocurrency data.
                </p>
              </div>
            </div>
          </div>
        )}
        {/* Market Overview */}
        {globalData && <MarketOverview globalData={globalData.data} />}

        {/* Main Content Grid */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Top Cryptocurrencies */}
          <div className="lg:col-span-2">
            {topCryptos.length > 0 && <TopCryptos cryptos={topCryptos} />}
          </div>

          {/* Trending Coins */}
          <div>
            {trendingData && <TrendingCoins trendingData={trendingData} />}
          </div>
        </div>

        {/* Exchanges */}
        {exchanges.length > 0 && <ExchangesOverview exchanges={exchanges} />}

        {/* Refresh Button */}
        <div className="flex justify-center">
          <Button onClick={async () => {
            await testApiConnection();
            await fetchData();
          }} className="btn-gradient">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh Data
          </Button>
        </div>
      </div>
    </MainLayout>
  );
}