'use client';

// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
// import { formatCurrency, formatPercentage, getChangeColor } from '@/lib/utils';
import { TrendingUp, Star } from 'lucide-react';
import Image from 'next/image';

interface TrendingCoin {
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

interface TrendingCoinsProps {
  trendingData: {
    coins: Array<{
      item: TrendingCoin;
    }>;
  };
}

export function TrendingCoins({ trendingData }: TrendingCoinsProps) {
  const topTrending = trendingData.coins.slice(0, 10);

  return (
    <div className="modern-card p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 rounded-xl bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20">
          <TrendingUp className="h-6 w-6 text-orange-500" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">Trending Coins</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">Most searched cryptocurrencies</p>
        </div>
      </div>
      
      <div className="space-y-3 modern-scrollbar max-h-96 overflow-y-auto">
        {topTrending.map((coin, index) => (
          <div
            key={coin.item.id}
            className="flex items-center justify-between p-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600 hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-all duration-300 group"
          >
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                  {index + 1}
                </div>
                <Image
                  src={coin.item.thumb}
                  alt={coin.item.name}
                  width={40}
                  height={40}
                  className="rounded-full group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div>
                <div className="font-semibold text-slate-900 dark:text-slate-100">{coin.item.name}</div>
                <div className="text-sm text-slate-500 dark:text-slate-400">
                  {coin.item.symbol.toUpperCase()}
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  #{coin.item.market_cap_rank || 'N/A'}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">Rank</div>
              </div>
              
              <div className="text-right">
                <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  {coin.item.price_btc.toFixed(8)} BTC
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">Price</div>
              </div>
              
              <Badge className="gradient-warning text-white px-3 py-1 flex items-center space-x-1">
                <Star className="h-3 w-3" />
                <span className="font-semibold">{coin.item.score}</span>
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}