'use client';

// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge';
import { formatCurrency, formatNumber, formatPercentage, getChangeColor } from '@/lib/utils';
import { TrendingUp } from 'lucide-react';
import Image from 'next/image';

interface CryptoCurrency {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  price_change_percentage_1h_in_currency?: number | null;
  price_change_percentage_24h: number | null;
  price_change_percentage_7d: number | null;
  price_change_percentage_30d: number | null;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  ath: number;
  ath_change_percentage: number | null;
  atl: number;
  atl_change_percentage: number | null;
  last_updated: string;
}

interface TopCryptosProps {
  cryptos: CryptoCurrency[];
}

export function TopCryptos({ cryptos }: TopCryptosProps) {
  const topCryptos = cryptos.slice(0, 20);

  return (
    <div className="modern-card p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
          <TrendingUp className="h-6 w-6 text-blue-600 dark:text-blue-400" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-100">Top Cryptocurrencies</h2>
          <p className="text-sm text-slate-300">By market capitalization</p>
        </div>
      </div>
      
      <div className="space-y-2 modern-scrollbar max-h-96 overflow-y-auto">
        {topCryptos.map((crypto) => (
          <div
            key={crypto.id}
            className="flex items-center justify-between p-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600 hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-all duration-300 group"
          >
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-500 to-slate-700 flex items-center justify-center text-white font-bold text-sm">
                  {crypto.market_cap_rank}
                </div>
                <Image
                  src={crypto.image}
                  alt={crypto.name}
                  width={40}
                  height={40}
                  className="rounded-full group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div>
                <div className="font-semibold text-slate-100">{crypto.name}</div>
                <div className="text-sm text-slate-300">
                  {crypto.symbol.toUpperCase()}
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="text-right">
                <div className="font-semibold text-slate-100">
                  {formatCurrency(crypto.current_price)}
                </div>
                <div className="text-xs text-slate-300">Price</div>
              </div>
              
              <div className="text-right">
                <div className="font-semibold text-slate-100">
                  {formatNumber(crypto.market_cap)}
                </div>
                <div className="text-xs text-slate-300">Market Cap</div>
              </div>
              
              <div className="text-right">
                <div className="font-semibold text-slate-100">
                  {formatNumber(crypto.total_volume)}
                </div>
                <div className="text-xs text-slate-300">Volume (24h)</div>
              </div>
              
              <div className="text-right">
                <div className={`font-semibold ${getChangeColor(crypto.price_change_percentage_1h_in_currency || 0)}`}>
                  {formatPercentage((crypto.price_change_percentage_1h_in_currency || 0))}
                </div>
                <div className="text-xs text-slate-300">1h</div>
              </div>

              <div className="text-right">
                <div className={`font-semibold ${getChangeColor(crypto.price_change_percentage_24h || 0)}`}>
                  {formatPercentage(crypto.price_change_percentage_24h || 0)}
                </div>
                <div className="text-xs text-slate-300">24h</div>
              </div>
              
              <div className="text-right">
                <div className={`font-semibold ${getChangeColor(crypto.price_change_percentage_7d || 0)}`}>
                  {formatPercentage(crypto.price_change_percentage_7d || 0)}
                </div>
                <div className="text-xs text-slate-300">7d</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}