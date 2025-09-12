'use client';

import { useEffect, useState } from 'react';
import { MainLayout } from '@/components/layout/main-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { formatCurrency, formatPercentage, getChangeColor } from '@/lib/utils';
import { CoinGeckoService, GlobalData } from '@/lib/coingecko';
import { RefreshCw, Globe, TrendingUp, TrendingDown, DollarSign, BarChart3, Activity } from 'lucide-react';

export default function GlobalPage() {
  const [globalData, setGlobalData] = useState<GlobalData | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchGlobalData = async () => {
    try {
      setLoading(true);
      const data = await CoinGeckoService.getGlobalData();
      setGlobalData(data);
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Error fetching global data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGlobalData();
  }, []);

  if (loading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p className="text-slate-300">Loading global market data...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (!globalData) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <p className="text-slate-300 mb-4">Failed to load global data</p>
            <Button onClick={fetchGlobalData}>Try Again</Button>
          </div>
        </div>
      </MainLayout>
    );
  }

  const data = globalData.data;
  const marketCapChange = data.market_cap_change_percentage_24h_usd;

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-100">Global Market Statistics</h1>
            <p className="text-slate-300">
              Comprehensive overview of the cryptocurrency market
            </p>
          </div>
          <div className="flex items-center space-x-2">
            {lastUpdated && (
              <p className="text-sm text-slate-300">
                Last updated: {lastUpdated.toLocaleTimeString()}
              </p>
            )}
            <Button onClick={fetchGlobalData} variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>

        {/* Main Statistics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Market Cap</CardTitle>
              <DollarSign className="h-4 w-4 text-slate-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatCurrency(data.total_market_cap.usd)}
              </div>
              <div className={`flex items-center text-xs ${getChangeColor(marketCapChange)}`}>
                {marketCapChange > 0 ? (
                  <TrendingUp className="h-3 w-3 mr-1" />
                ) : (
                  <TrendingDown className="h-3 w-3 mr-1" />
                )}
                {formatPercentage(marketCapChange)} from 24h ago
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">24h Trading Volume</CardTitle>
              <BarChart3 className="h-4 w-4 text-slate-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatCurrency(data.total_volume.usd)}
              </div>
              <div className="text-xs text-slate-400">
                Volume/Market Cap: {((data.total_volume.usd / data.total_market_cap.usd) * 100).toFixed(2)}%
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Cryptocurrencies</CardTitle>
              <Globe className="h-4 w-4 text-slate-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {data.active_cryptocurrencies.toLocaleString()}
              </div>
              <div className="text-xs text-slate-400">
                {data.markets} markets
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Market Status</CardTitle>
              <Activity className="h-4 w-4 text-slate-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {marketCapChange > 0 ? 'Bullish' : 'Bearish'}
              </div>
              <div className="text-xs text-slate-400">
                24h market sentiment
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Market Dominance */}
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Market Dominance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                    <span>Bitcoin</span>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{data.market_cap_percentage.btc.toFixed(1)}%</div>
                    <div className="text-sm text-slate-400">
                      {formatCurrency(data.total_market_cap.usd * (data.market_cap_percentage.btc / 100))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    <span>Ethereum</span>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{data.market_cap_percentage.eth.toFixed(1)}%</div>
                    <div className="text-sm text-slate-400">
                      {formatCurrency(data.total_market_cap.usd * (data.market_cap_percentage.eth / 100))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-gray-500"></div>
                    <span>Others</span>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">
                      {(100 - data.market_cap_percentage.btc - data.market_cap_percentage.eth).toFixed(1)}%
                    </div>
                    <div className="text-sm text-slate-400">
                      {formatCurrency(data.total_market_cap.usd * ((100 - data.market_cap_percentage.btc - data.market_cap_percentage.eth) / 100))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Market Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-slate-400">Ongoing ICOs</span>
                  <span className="font-medium">{data.ongoing_icos}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Upcoming ICOs</span>
                  <span className="font-medium">{data.upcoming_icos}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Ended ICOs</span>
                  <span className="font-medium">{data.ended_icos}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Total Markets</span>
                  <span className="font-medium">{data.markets}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Last Updated</span>
                  <span className="font-medium">
                    {new Date(data.updated_at).toLocaleString()}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Market Cap by Currency */}
        <Card>
          <CardHeader>
            <CardTitle>Market Cap by Currency</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {Object.entries(data.total_market_cap)
                .filter(([currency]) => currency !== 'usd')
                .slice(0, 8)
                .map(([currency, value]) => (
                  <div key={currency} className="flex justify-between items-center p-3 rounded-lg border">
                    <span className="font-medium">{currency.toUpperCase()}</span>
                    <span className="text-sm text-muted-foreground">
                      {formatCurrency(value)}
                    </span>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}