'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building, Globe, Shield, ExternalLink } from 'lucide-react';

interface Exchange {
  id: string;
  name: string;
  image: string;
  trust_score: number;
  trust_score_rank: number;
  trade_volume_24h_btc: number;
  trade_volume_24h_btc_normalized: number;
  year_established: number;
  country: string;
  description: string;
  url: string;
  has_trading_incentive: boolean;
  centralized: boolean;
  public_interest_score: number;
  market_data: {
    price_change_percentage_24h: number;
    price_change_percentage_7d: number;
    price_change_percentage_30d: number;
  };
}

interface ExchangesOverviewProps {
  exchanges: Exchange[];
}

export function ExchangesOverview({ exchanges }: ExchangesOverviewProps) {
  const formatVolume = (volume: number) => {
    if (volume >= 1000000000) {
      return `$${(volume / 1000000000).toFixed(2)}B`;
    } else if (volume >= 1000000) {
      return `$${(volume / 1000000).toFixed(2)}M`;
    } else if (volume >= 1000) {
      return `$${(volume / 1000).toFixed(2)}K`;
    }
    return `$${volume.toFixed(2)}`;
  };

  const formatTrustScore = (score: number) => {
    if (score >= 9) return { label: 'Excellent', color: 'bg-green-500' };
    if (score >= 7) return { label: 'Good', color: 'bg-blue-500' };
    if (score >= 5) return { label: 'Fair', color: 'bg-yellow-500' };
    if (score >= 3) return { label: 'Poor', color: 'bg-orange-500' };
    return { label: 'Very Poor', color: 'bg-red-500' };
  };

  const getChangeColor = (change: number) => {
    if (change > 0) return 'text-green-600 dark:text-green-400';
    if (change < 0) return 'text-red-600 dark:text-red-400';
    return 'text-slate-600 dark:text-slate-400';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Building className="h-5 w-5 mr-2 text-blue-600" />
          Top Exchanges
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {exchanges.slice(0, 15).map((exchange, index) => {
            const trustInfo = formatTrustScore(exchange.trust_score);
            
            return (
              <div 
                key={exchange.id} 
                className="p-4 rounded-lg border border-slate-200 dark:border-slate-700 hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-4 flex-1">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                        {exchange.image ? (
                          <img
                            src={exchange.image}
                            alt={exchange.name}
                            className="w-10 h-10 rounded-full object-cover"
                            onError={(e) => {
                              (e.currentTarget as HTMLImageElement).src = '/placeholder-exchange.svg';
                            }}
                          />
                        ) : (
                          <Building className="h-6 w-6 text-slate-400" />
                        )}
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-semibold text-slate-900 dark:text-slate-100 truncate">
                          {exchange.name}
                        </h3>
                        <Badge variant="outline" className="text-xs">
                          #{index + 1}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center space-x-4 text-sm text-slate-600 dark:text-slate-400 mb-2">
                        {exchange.country && (
                          <div className="flex items-center space-x-1">
                            <Globe className="h-3 w-3" />
                            <span>{exchange.country}</span>
                          </div>
                        )}
                        {exchange.year_established && (
                          <span>Est. {exchange.year_established}</span>
                        )}
                        <div className="flex items-center space-x-1">
                          <Shield className="h-3 w-3" />
                          <span className={exchange.centralized ? 'text-blue-600' : 'text-orange-600'}>
                            {exchange.centralized ? 'Centralized' : 'Decentralized'}
                          </span>
                        </div>
                      </div>

                      {exchange.description && (
                        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mb-2">
                          {exchange.description}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col items-end space-y-2 ml-4">
                    {/* Trust Score */}
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full ${trustInfo.color}`}></div>
                      <span className="text-sm font-medium">{trustInfo.label}</span>
                      <span className="text-xs text-slate-500">({exchange.trust_score}/10)</span>
                    </div>

                    {/* Volume */}
                    <div className="text-right">
                      <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                        {exchange.trade_volume_24h_btc ? exchange.trade_volume_24h_btc.toFixed(2) : '0.00'} BTC
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">24h Volume</div>
                    </div>

                    {/* Public Interest */}
                    {exchange.public_interest_score > 0 && (
                      <div className="text-right">
                        <div className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                          {exchange.public_interest_score.toFixed(1)}
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">Interest</div>
                      </div>
                    )}

                    {/* External Link */}
                    {exchange.url && (
                      <a
                        href={exchange.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Additional Stats Row */}
                <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-700">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <div className="text-slate-500 dark:text-slate-400 text-xs">Trust Rank</div>
                      <div className="font-medium">#{exchange.trust_score_rank || 'N/A'}</div>
                    </div>
                    <div>
                      <div className="text-slate-500 dark:text-slate-400 text-xs">Normalized Volume</div>
                      <div className="font-medium">{exchange.trade_volume_24h_btc_normalized ? exchange.trade_volume_24h_btc_normalized.toFixed(2) : '0.00'} BTC</div>
                    </div>
                    <div>
                      <div className="text-slate-500 dark:text-slate-400 text-xs">Trading Incentive</div>
                      <div className="font-medium">
                        {exchange.has_trading_incentive ? (
                          <Badge variant="secondary" className="text-xs">Yes</Badge>
                        ) : (
                          <Badge variant="outline" className="text-xs">No</Badge>
                        )}
                      </div>
                    </div>
                    <div>
                      <div className="text-slate-500 dark:text-slate-400 text-xs">Type</div>
                      <div className="font-medium">
                        <Badge 
                          variant={exchange.centralized ? "default" : "secondary"} 
                          className="text-xs"
                        >
                          {exchange.centralized ? 'CEX' : 'DEX'}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          
          {exchanges.length === 0 && (
            <div className="text-center py-8 text-slate-500 dark:text-slate-400">
              <Building className="h-12 w-12 mx-auto mb-4 text-slate-300" />
              <p>No exchange data available right now.</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}