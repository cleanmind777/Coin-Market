'use client';

import { useEffect, useState } from 'react';
import { MainLayout } from '@/components/layout/main-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { formatCurrency, formatPercentage, getChangeColor } from '@/lib/utils';
import { CoinGeckoService, MarketChartData } from '@/lib/coingecko';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from 'recharts';
import { Search, TrendingUp, BarChart3 } from 'lucide-react';

export default function ChartsPage() {
  const [selectedCoin, setSelectedCoin] = useState('bitcoin');
  const [chartData, setChartData] = useState<MarketChartData | null>(null);
  const [loading, setLoading] = useState(false);
  const [timeRange, setTimeRange] = useState<'1' | '7' | '30' | '90' | '365' | 'max'>('7');

  const popularCoins = [
    { id: 'bitcoin', symbol: 'BTC', name: 'Bitcoin' },
    { id: 'ethereum', symbol: 'ETH', name: 'Ethereum' },
    { id: 'solana', symbol: 'SOL', name: 'Solana' },
    { id: 'cardano', symbol: 'ADA', name: 'Cardano' },
    { id: 'polkadot', symbol: 'DOT', name: 'Polkadot' },
    { id: 'chainlink', symbol: 'LINK', name: 'Chainlink' },
  ];

  const fetchChartData = async (coinId: string, days: string) => {
    try {
      setLoading(true);
      const data = await CoinGeckoService.getMarketChart(coinId, parseInt(days));
      setChartData(data);
    } catch (error) {
      console.error('Error fetching chart data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChartData(selectedCoin, timeRange);
  }, [selectedCoin, timeRange]);

  const formatChartData = (data: MarketChartData) => {
    return data.prices.map(([timestamp, price]) => ({
      time: new Date(timestamp).toLocaleDateString(),
      price: price,
      volume: data.total_volumes.find(([t]) => t === timestamp)?.[1] || 0,
    }));
  };

  const timeRanges = [
    { value: '1', label: '1 Day' },
    { value: '7', label: '7 Days' },
    { value: '30', label: '30 Days' },
    { value: '90', label: '90 Days' },
    { value: '365', label: '1 Year' },
    { value: 'max', label: 'All Time' },
  ];

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-slate-100">Price Charts</h1>
          <p className="text-slate-300">Interactive cryptocurrency price charts and analysis</p>
        </div>

        {/* Coin Selection */}
        <Card>
          <CardHeader>
            <CardTitle>Select Cryptocurrency</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {popularCoins.map((coin) => (
                <Button
                  key={coin.id}
                  variant={selectedCoin === coin.id ? 'default' : 'outline'}
                  onClick={() => setSelectedCoin(coin.id)}
                  className="flex items-center space-x-2"
                >
                  <span>{coin.symbol}</span>
                  <span className="text-xs opacity-70">{coin.name}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Time Range Selection */}
        <Card>
          <CardHeader>
            <CardTitle>Time Range</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {timeRanges.map((range) => (
                <Button
                  key={range.value}
                  variant={timeRange === range.value ? 'default' : 'outline'}
                  onClick={() => setTimeRange(range.value as any)}
                >
                  {range.label}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Price Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5" />
              <span>Price Chart - {popularCoins.find(c => c.id === selectedCoin)?.name}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center h-96">
                <div className="text-center">
                  <BarChart3 className="h-8 w-8 animate-pulse mx-auto mb-4" />
                  <p className="text-muted-foreground">Loading chart data...</p>
                </div>
              </div>
            ) : chartData ? (
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={formatChartData(chartData)}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value) => [formatCurrency(value as number), 'Price']}
                      labelFormatter={(label) => `Date: ${label}`}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="price" 
                      stroke="#8884d8" 
                      fill="#8884d8" 
                      fillOpacity={0.3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="flex items-center justify-center h-96">
                <div className="text-center">
                  <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p className="text-muted-foreground">No chart data available</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Volume Chart */}
        {chartData && (
          <Card>
            <CardHeader>
              <CardTitle>Trading Volume</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={formatChartData(chartData)}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value) => [formatCurrency(value as number), 'Volume']}
                      labelFormatter={(label) => `Date: ${label}`}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="volume" 
                      stroke="#82ca9d" 
                      fill="#82ca9d" 
                      fillOpacity={0.3}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Chart Information */}
        {chartData && (
          <Card>
            <CardHeader>
              <CardTitle>Chart Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="text-center">
                  <div className="text-2xl font-bold">
                    {chartData.prices.length}
                  </div>
                  <div className="text-sm text-muted-foreground">Data Points</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">
                    {formatCurrency(Math.min(...chartData.prices.map(([, price]) => price)))}
                  </div>
                  <div className="text-sm text-muted-foreground">Lowest Price</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">
                    {formatCurrency(Math.max(...chartData.prices.map(([, price]) => price)))}
                  </div>
                  <div className="text-sm text-muted-foreground">Highest Price</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </MainLayout>
  );
}