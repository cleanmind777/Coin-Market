'use client';

import { useState, useEffect } from 'react';
import { MainLayout } from '@/components/layout/main-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { formatCurrency, formatPercentage, getChangeColor } from '@/lib/utils';
import { Star, Search, Plus, Trash2, TrendingUp, TrendingDown } from 'lucide-react';
import Image from 'next/image';

interface WatchlistItem {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
  market_cap_rank: number;
}

export default function WatchlistPage() {
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newSymbol, setNewSymbol] = useState('');

  // Mock data for demonstration
  useEffect(() => {
    const mockWatchlist: WatchlistItem[] = [
      {
        id: '1',
        symbol: 'BTC',
        name: 'Bitcoin',
        image: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png',
        current_price: 65000,
        price_change_percentage_24h: 2.5,
        market_cap: 1200000000000,
        market_cap_rank: 1,
      },
      {
        id: '2',
        symbol: 'ETH',
        name: 'Ethereum',
        image: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png',
        current_price: 3500,
        price_change_percentage_24h: -1.2,
        market_cap: 420000000000,
        market_cap_rank: 2,
      },
      {
        id: '3',
        symbol: 'SOL',
        name: 'Solana',
        image: 'https://assets.coingecko.com/coins/images/4128/large/solana.png',
        current_price: 80,
        price_change_percentage_24h: 5.8,
        market_cap: 35000000000,
        market_cap_rank: 5,
      },
    ];

    setWatchlist(mockWatchlist);
  }, []);

  const filteredWatchlist = watchlist.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddToWatchlist = () => {
    if (newSymbol.trim()) {
      // In a real app, you would fetch coin data from API
      const newItem: WatchlistItem = {
        id: Date.now().toString(),
        symbol: newSymbol.toUpperCase(),
        name: newSymbol.toUpperCase(),
        image: 'https://via.placeholder.com/32x32',
        current_price: 0,
        price_change_percentage_24h: 0,
        market_cap: 0,
        market_cap_rank: 0,
      };

      setWatchlist([...watchlist, newItem]);
      setNewSymbol('');
      setShowAddForm(false);
    }
  };

  const handleRemoveFromWatchlist = (id: string) => {
    setWatchlist(watchlist.filter(item => item.id !== id));
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-100">Watchlist</h1>
            <p className="text-slate-300">Track your favorite cryptocurrencies</p>
          </div>
          <Button onClick={() => setShowAddForm(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Coin
          </Button>
        </div>

        {/* Search */}
        <Card>
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search your watchlist..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Add Coin Form */}
        {showAddForm && (
          <Card>
            <CardHeader>
              <CardTitle>Add to Watchlist</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <Input
                  placeholder="Enter coin symbol (e.g., BTC)"
                  value={newSymbol}
                  onChange={(e) => setNewSymbol(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={handleAddToWatchlist}>Add</Button>
                <Button variant="outline" onClick={() => setShowAddForm(false)}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Watchlist Items */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Star className="h-5 w-5 text-yellow-500" />
              <span>Your Watchlist ({filteredWatchlist.length})</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredWatchlist.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Star className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>
                    {searchQuery ? 'No coins match your search.' : 'Your watchlist is empty.'}
                  </p>
                  <p className="text-sm">
                    {searchQuery ? 'Try a different search term.' : 'Add some coins to get started.'}
                  </p>
                </div>
              ) : (
                filteredWatchlist.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-muted-foreground">
                          #{item.market_cap_rank || 'N/A'}
                        </span>
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={32}
                          height={32}
                          className="rounded-full"
                        />
                      </div>
                      <div>
                        <div className="font-medium">{item.name}</div>
                        <div className="text-sm text-muted-foreground">{item.symbol}</div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-6">
                      <div className="text-right">
                        <div className="font-medium">
                          {formatCurrency(item.current_price)}
                        </div>
                        <div className="text-sm text-muted-foreground">Price</div>
                      </div>

                      <div className="text-right">
                        <div className="font-medium">
                          {formatCurrency(item.market_cap)}
                        </div>
                        <div className="text-sm text-muted-foreground">Market Cap</div>
                      </div>

                      <div className="text-right">
                        <div className={`font-medium ${getChangeColor(item.price_change_percentage_24h)}`}>
                          {formatPercentage(item.price_change_percentage_24h)}
                        </div>
                        <div className="text-sm text-muted-foreground">24h Change</div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="flex items-center space-x-1">
                          <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                          <span>Watching</span>
                        </Badge>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemoveFromWatchlist(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}