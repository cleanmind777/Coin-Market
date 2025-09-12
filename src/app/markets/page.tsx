'use client';

import { useEffect, useState } from 'react';
import { MainLayout } from '@/components/layout/main-layout';
import { TopCryptos } from '@/components/dashboard/top-cryptos';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { CoinGeckoService, CryptoCurrency } from '@/lib/coingecko';
import { Search, Filter, RefreshCw, TrendingUp, TrendingDown } from 'lucide-react';

export default function MarketsPage() {
  const [cryptos, setCryptos] = useState<CryptoCurrency[]>([]);
  const [filteredCryptos, setFilteredCryptos] = useState<CryptoCurrency[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'market_cap' | 'price' | 'volume' | 'change'>('market_cap');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [page, setPage] = useState(1);
  const perPage = 20;
  const [totalPages, setTotalPages] = useState(0);
  const [totalCoins, setTotalCoins] = useState(0);
  const [pageInput, setPageInput] = useState('1');

  const fetchCryptos = async () => {
    try {
      setLoading(true);
      const data = await CoinGeckoService.getTopCryptos(page, perPage);
      setCryptos(data);
      setFilteredCryptos(data);
      // Estimate total pages (CoinGecko free tier has ~250 pages for top 5000 coins)
      setTotalPages(Math.min(250, Math.ceil(5000 / perPage)));
      setTotalCoins(5000); // Approximate total from free API
    } catch (error) {
      console.error('Error fetching cryptos:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCryptos();
  }, [page]);

  useEffect(() => {
    setPageInput(page.toString());
  }, [page]);

  useEffect(() => {
    const filtered = cryptos.filter(crypto =>
      crypto.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      crypto.symbol.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Sort the filtered results
    filtered.sort((a, b) => {
      let aValue: number, bValue: number;
      
      switch (sortBy) {
        case 'market_cap':
          aValue = a.market_cap;
          bValue = b.market_cap;
          break;
        case 'price':
          aValue = a.current_price;
          bValue = b.current_price;
          break;
        case 'volume':
          aValue = a.total_volume;
          bValue = b.total_volume;
          break;
        case 'change':
          aValue = a.price_change_percentage_24h || 0;
          bValue = b.price_change_percentage_24h || 0;
          break;
        default:
          aValue = a.market_cap;
          bValue = b.market_cap;
      }

      return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
    });

    setFilteredCryptos(filtered);
  }, [cryptos, searchQuery, sortBy, sortOrder]);

  const handleSort = (field: typeof sortBy) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">Loading market data...</p>
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
          <h1 className="text-3xl font-bold">Markets</h1>
          <p className="text-muted-foreground">Explore all cryptocurrencies and their market data</p>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Filter className="h-5 w-5" />
              <span>Search & Filter</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                  <Input
                    placeholder="Search cryptocurrencies..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button
                  variant={sortBy === 'market_cap' ? 'default' : 'outline'}
                  onClick={() => handleSort('market_cap')}
                  className="flex items-center space-x-1"
                >
                  <span>Market Cap</span>
                  {sortBy === 'market_cap' && (
                    sortOrder === 'desc' ? <TrendingDown className="h-4 w-4" /> : <TrendingUp className="h-4 w-4" />
                  )}
                </Button>
                
                <Button
                  variant={sortBy === 'price' ? 'default' : 'outline'}
                  onClick={() => handleSort('price')}
                  className="flex items-center space-x-1"
                >
                  <span>Price</span>
                  {sortBy === 'price' && (
                    sortOrder === 'desc' ? <TrendingDown className="h-4 w-4" /> : <TrendingUp className="h-4 w-4" />
                  )}
                </Button>
                
                <Button
                  variant={sortBy === 'volume' ? 'default' : 'outline'}
                  onClick={() => handleSort('volume')}
                  className="flex items-center space-x-1"
                >
                  <span>Volume</span>
                  {sortBy === 'volume' && (
                    sortOrder === 'desc' ? <TrendingDown className="h-4 w-4" /> : <TrendingUp className="h-4 w-4" />
                  )}
                </Button>
                
                <Button
                  variant={sortBy === 'change' ? 'default' : 'outline'}
                  onClick={() => handleSort('change')}
                  className="flex items-center space-x-1"
                >
                  <span>24h Change</span>
                  {sortBy === 'change' && (
                    sortOrder === 'desc' ? <TrendingDown className="h-4 w-4" /> : <TrendingUp className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Count */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Page {page} of {totalPages} • Showing {filteredCryptos.length} of ~{totalCoins} coins
          </p>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Go to:</span>
              <Input
                type="number"
                value={pageInput}
                onChange={(e) => setPageInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    const newPage = parseInt(pageInput);
                    if (newPage >= 1 && newPage <= totalPages) {
                      setPage(newPage);
                    }
                  }
                }}
                className="w-20 h-8"
                min="1"
                max={totalPages}
              />
            </div>
            <Button onClick={() => setPage((p) => Math.max(1, p - 1))} variant="outline" size="sm" disabled={page === 1}>
              Prev
            </Button>
            <Button onClick={() => setPage((p) => p + 1)} variant="outline" size="sm" disabled={page >= totalPages}>
              Next
            </Button>
            <Button onClick={fetchCryptos} variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>

        {/* Cryptocurrencies List */}
        <TopCryptos cryptos={filteredCryptos} />
      </div>
    </MainLayout>
  );
}