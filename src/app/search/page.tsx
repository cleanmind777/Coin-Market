'use client';

import { useState, useEffect } from 'react';
import { MainLayout } from '@/components/layout/main-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { formatCurrency, formatPercentage, getChangeColor } from '@/lib/utils';
import { CoinGeckoService } from '@/lib/coingecko';
import { Search, Star, TrendingUp, TrendingDown } from 'lucide-react';
import Image from 'next/image';

interface SearchResult {
  id: string;
  name: string;
  symbol: string;
  market_cap_rank: number;
  thumb: string;
  large: string;
}

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    try {
      setLoading(true);
      setHasSearched(true);
      const results = await CoinGeckoService.searchCryptos(searchQuery);
      setSearchResults(results.coins || []);
    } catch (error) {
      console.error('Error searching:', error);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-slate-100">Search Cryptocurrencies</h1>
          <p className="text-slate-300">Find any cryptocurrency by name or symbol</p>
        </div>

        {/* Search Bar */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search for cryptocurrencies (e.g., Bitcoin, BTC, Ethereum)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="pl-10"
                />
              </div>
              <Button onClick={handleSearch} disabled={loading || !searchQuery.trim()}>
                {loading ? 'Searching...' : 'Search'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Search Results */}
        {hasSearched && (
          <Card>
            <CardHeader>
              <CardTitle>
                Search Results {searchResults.length > 0 && `(${searchResults.length})`}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="text-center">
                    <Search className="h-8 w-8 animate-pulse mx-auto mb-4" />
                    <p className="text-slate-300">Searching...</p>
                  </div>
                </div>
              ) : searchResults.length === 0 ? (
                <div className="text-center py-8 text-slate-400">
                  <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No results found for &quot;{searchQuery}&quot;</p>
                  <p className="text-sm">Try a different search term</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {searchResults.map((coin) => (
                    <div
                      key={coin.id}
                      className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium text-slate-400">
                            #{coin.market_cap_rank || 'N/A'}
                          </span>
                          <Image
                            src={coin.thumb}
                            alt={coin.name}
                            width={32}
                            height={32}
                            className="rounded-full"
                          />
                        </div>
                        <div>
                          <div className="font-medium">{coin.name}</div>
                            <div className="text-sm text-slate-400">
                              {coin.symbol.toUpperCase()}
                            </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4">
                        <Badge variant="outline" className="flex items-center space-x-1">
                          <Star className="h-3 w-3" />
                          <span>View Details</span>
                        </Badge>
                        <Button variant="ghost" size="sm">
                          Add to Watchlist
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Popular Searches */}
        {!hasSearched && (
          <Card>
            <CardHeader>
              <CardTitle>Popular Searches</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
                {[
                  'Bitcoin', 'Ethereum', 'Solana', 'Cardano', 'Polkadot', 'Chainlink',
                  'Litecoin', 'Bitcoin Cash', 'Stellar', 'Monero', 'Dogecoin', 'Shiba Inu'
                ].map((coin) => (
                  <Button
                    key={coin}
                    variant="outline"
                    className="justify-start"
                    onClick={() => {
                      setSearchQuery(coin);
                      handleSearch();
                    }}
                  >
                    {coin}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </MainLayout>
  );
}