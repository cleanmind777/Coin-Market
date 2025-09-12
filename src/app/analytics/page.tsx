'use client';

import { useEffect, useState } from 'react';
import { MainLayout } from '@/components/layout/main-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatCurrency, formatPercentage, getChangeColor } from '@/lib/utils';
import { CoinGeckoService, GlobalData, CryptoCurrency } from '@/lib/coingecko';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { TrendingUp, TrendingDown, BarChart3, PieChart as PieChartIcon, Activity } from 'lucide-react';

export default function AnalyticsPage() {
  const [globalData, setGlobalData] = useState<GlobalData | null>(null);
  const [topCryptos, setTopCryptos] = useState<CryptoCurrency[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [global, cryptos] = await Promise.all([
        CoinGeckoService.getGlobalData(),
        CoinGeckoService.getTopCryptos(1, 10),
      ]);

      setGlobalData(global);
      setTopCryptos(cryptos);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Prepare data for charts
  const marketCapData = topCryptos.slice(0, 10).map(crypto => ({
    name: crypto.symbol.toUpperCase(),
    marketCap: crypto.market_cap / 1e9, // Convert to billions
    price: crypto.current_price,
    change: crypto.price_change_percentage_24h,
  }));

  const dominanceData = globalData ? [
    { name: 'Bitcoin', value: globalData.data.market_cap_percentage.btc, color: '#f7931a' },
    { name: 'Ethereum', value: globalData.data.market_cap_percentage.eth, color: '#627eea' },
    { name: 'Others', value: 100 - globalData.data.market_cap_percentage.btc - globalData.data.market_cap_percentage.eth, color: '#8884d8' },
  ] : [];

  const priceChangeData = topCryptos.slice(0, 8).map(crypto => ({
    name: crypto.symbol.toUpperCase(),
    change: crypto.price_change_percentage_24h,
  }));

  if (loading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <Activity className="h-8 w-8 animate-pulse mx-auto mb-4" />
            <p className="text-slate-300">Loading analytics...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-slate-100">Analytics</h1>
          <p className="text-slate-300">Comprehensive cryptocurrency market analysis</p>
        </div>

        {/* Market Overview Cards */}
        {globalData && (
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Market Cap</CardTitle>
                <BarChart3 className="h-4 w-4 text-slate-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatCurrency(globalData.data.total_market_cap.usd)}
                </div>
                <div className={`text-xs ${getChangeColor(globalData.data.market_cap_change_percentage_24h_usd)}`}>
                  {formatPercentage(globalData.data.market_cap_change_percentage_24h_usd)} from 24h ago
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">24h Volume</CardTitle>
                <Activity className="h-4 w-4 text-slate-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatCurrency(globalData.data.total_volume.usd)}
                </div>
                <div className="text-xs text-slate-400">Trading volume</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Bitcoin Dominance</CardTitle>
                <PieChartIcon className="h-4 w-4 text-slate-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {globalData.data.market_cap_percentage.btc.toFixed(1)}%
                </div>
                <div className="text-xs text-slate-400">Market share</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Cryptocurrencies</CardTitle>
                <TrendingUp className="h-4 w-4 text-slate-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {globalData.data.active_cryptocurrencies.toLocaleString()}
                </div>
                <div className="text-xs text-slate-400">Total coins</div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Charts Grid */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Market Cap Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Top 10 by Market Cap</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={marketCapData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${value}B`, 'Market Cap']} />
                  <Bar dataKey="marketCap" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Market Dominance Pie Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Market Dominance</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={dominanceData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value.toFixed(1)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {dominanceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* 24h Price Changes */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>24h Price Changes</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={priceChangeData} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={60} />
                  <Tooltip formatter={(value) => [`${value}%`, '24h Change']} />
                  <Bar dataKey="change" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Top Performers */}
        <Card>
          <CardHeader>
            <CardTitle>Top Performers (24h)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topCryptos
                .sort((a, b) => (b.price_change_percentage_24h || 0) - (a.price_change_percentage_24h || 0))
                .slice(0, 10)
                .map((crypto, index) => (
                  <div
                    key={crypto.id}
                    className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-sm font-medium text-slate-400">
                        #{index + 1}
                      </span>
                      <img
                        src={crypto.image || '/globe.svg'}
                        alt={crypto.name}
                        className="w-6 h-6 rounded-full object-cover"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src = '/globe.svg';
                        }}
                      />
                      <div>
                        <div className="font-medium">{crypto.name}</div>
                        <div className="text-sm text-slate-400">
                          {crypto.symbol.toUpperCase()}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-6">
                      <div className="text-right">
                        <div className="font-medium">
                          {formatCurrency(crypto.current_price)}
                        </div>
                        <div className="text-sm text-slate-400">Price</div>
                      </div>

                      <div className="text-right">
                        <div className="font-medium">
                          {formatCurrency(crypto.market_cap)}
                        </div>
                        <div className="text-sm text-slate-400">Market Cap</div>
                      </div>

                      <div className="text-right">
                        <div className={`font-medium ${getChangeColor(crypto.price_change_percentage_24h)}`}>
                          {formatPercentage(crypto.price_change_percentage_24h)}
                        </div>
                        <div className="text-sm text-slate-400">24h Change</div>
                      </div>

                      <Badge 
                        variant={(crypto.price_change_percentage_24h || 0) > 0 ? "success" : "destructive"}
                      >
                        {(crypto.price_change_percentage_24h || 0) > 0 ? (
                          <TrendingUp className="h-3 w-3 mr-1" />
                        ) : (
                          <TrendingDown className="h-3 w-3 mr-1" />
                        )}
                        {(crypto.price_change_percentage_24h || 0) > 0 ? 'Gain' : 'Loss'}
                      </Badge>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}