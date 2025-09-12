'use client';

// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatCurrency, formatNumber, formatPercentage, getChangeColor } from '@/lib/utils';
import { TrendingUp, TrendingDown, DollarSign, BarChart3, Globe } from 'lucide-react';

interface MarketOverviewProps {
  globalData: {
    active_cryptocurrencies: number;
    total_market_cap: Record<string, number>;
    total_volume: Record<string, number>;
    market_cap_percentage: Record<string, number>;
    market_cap_change_percentage_24h_usd: number;
    updated_at: number;
  };
}

export function MarketOverview({ globalData }: MarketOverviewProps) {
  const marketCap = globalData.total_market_cap.usd;
  const volume24h = globalData.total_volume.usd;
  const marketCapChange = globalData.market_cap_change_percentage_24h_usd;
  const btcDominance = globalData.market_cap_percentage.btc;
  // const ethDominance = globalData.market_cap_percentage.eth;

  const stats = [
    {
      title: 'Total Market Cap',
      value: formatCurrency(marketCap),
      change: marketCapChange,
      icon: DollarSign,
      description: 'Global crypto market cap',
    },
    {
      title: '24h Volume',
      value: formatCurrency(volume24h),
      change: 0, // Volume change not provided in global data
      icon: BarChart3,
      description: 'Trading volume (24h)',
    },
    {
      title: 'Active Cryptocurrencies',
      value: formatNumber(globalData.active_cryptocurrencies),
      change: 0,
      icon: Globe,
      description: 'Total cryptocurrencies',
    },
    {
      title: 'Bitcoin Dominance',
      value: `${btcDominance.toFixed(1)}%`,
      change: 0,
      icon: TrendingUp,
      description: 'BTC market share',
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <div key={index} className="modern-card p-6 group">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 group-hover:scale-110 transition-transform duration-300">
              <stat.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="text-right">
              <h3 className="text-sm font-semibold text-slate-600 dark:text-slate-400 mb-1">
                {stat.title}
              </h3>
              {stat.change !== 0 && (
                <Badge 
                  variant={stat.change > 0 ? "success" : "destructive"}
                  className="text-xs px-2 py-1"
                >
                  {formatPercentage(stat.change)}
                </Badge>
              )}
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="text-2xl font-bold text-slate-900 dark:text-slate-100 break-words">
              {stat.value}
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {stat.description}
            </p>
            {stat.change !== 0 && (
              <div className={`flex items-center text-sm font-medium ${getChangeColor(stat.change)}`}>
                {stat.change > 0 ? (
                  <TrendingUp className="h-4 w-4 mr-1" />
                ) : (
                  <TrendingDown className="h-4 w-4 mr-1" />
                )}
                {formatPercentage(stat.change)} from 24h ago
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}