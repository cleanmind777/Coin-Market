'use client';

import { useEffect, useState } from 'react';
import { MainLayout } from '@/components/layout/main-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { RefreshCw, Image as ImageIcon, Globe, ExternalLink, Search, Filter } from 'lucide-react';
import { CoinGeckoService, NFTCollectionBasic, NFTCollection, formatCurrency, formatNumber, formatPercentage, getChangeColor } from '@/lib/coingecko';

export default function NFTsPage() {
  const [nfts, setNfts] = useState<NFTCollectionBasic[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const perPage = 20;
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('market_cap_usd_desc');
  const [selectedNFT, setSelectedNFT] = useState<NFTCollection | null>(null);
  const [loadingDetails, setLoadingDetails] = useState(false);

  const sortOptions = [
    { value: 'market_cap_usd_desc', label: 'Market Cap (High to Low)' },
    { value: 'market_cap_usd_asc', label: 'Market Cap (Low to High)' },
    { value: 'floor_price_usd_desc', label: 'Floor Price (High to Low)' },
    { value: 'floor_price_usd_asc', label: 'Floor Price (Low to High)' },
    { value: 'volume_24h_desc', label: '24h Volume (High to Low)' },
    { value: 'volume_24h_asc', label: '24h Volume (Low to High)' },
    { value: 'number_of_owners_desc', label: 'Owners (High to Low)' },
    { value: 'number_of_owners_asc', label: 'Owners (Low to High)' },
  ];

  const fetchNFTs = async () => {
    try {
      setLoading(true);
      const data = await CoinGeckoService.getNFTCollections(page, perPage, sortBy);
      setNfts(data.data);
      // Estimate total pages (CoinGecko free tier has limited pages for NFTs)
      setTotalPages(Math.min(50, Math.ceil(data.total / perPage)));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNFTs();
  }, [page, sortBy]);

  const handleNFTClick = async (nft: NFTCollectionBasic) => {
    try {
      setLoadingDetails(true);
      const details = await CoinGeckoService.getNFTCollectionDetails(nft.id);
      setSelectedNFT(details);
    } catch (err) {
      console.error('Error fetching NFT details:', err);
    } finally {
      setLoadingDetails(false);
    }
  };

  const closeModal = () => {
    setSelectedNFT(null);
  };

  const stripHtml = (html: string) => {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  const filteredNFTs = nfts.filter(nft =>
    nft.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    nft.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-100">NFT Collections</h1>
            <p className="text-slate-300">Top NFT collections with detailed information</p>
          </div>
          <Button onClick={fetchNFTs} disabled={loading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search NFT collections..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md bg-white dark:bg-gray-800 dark:border-gray-600 text-gray-900 dark:text-gray-100"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Pagination Controls */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-slate-300">
            Page {page} of {totalPages} • Showing {filteredNFTs.length} NFT collections
          </p>
          <div className="flex items-center gap-2">
            <Button 
              onClick={() => setPage(p => Math.max(1, p - 1))} 
              variant="outline" 
              size="sm" 
              disabled={page === 1}
            >
              Previous
            </Button>
            <Button 
              onClick={() => setPage(p => p + 1)} 
              variant="outline" 
              size="sm" 
              disabled={page >= totalPages}
            >
              Next
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <ImageIcon className="h-5 w-5 mr-2 text-blue-600" />
              NFT Collection Directory
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center min-h-[400px]">
                <RefreshCw className="h-8 w-8 animate-spin text-blue-600" />
              </div>
            ) : (
              <div className="space-y-4">
                {filteredNFTs.map((nft, index) => (
                  <div 
                    key={nft.id} 
                    className="p-6 rounded-lg border border-slate-200 dark:border-slate-700 hover:shadow-md transition-all duration-200 cursor-pointer"
                    onClick={() => handleNFTClick(nft)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-4 flex-1">
                        <div className="flex-shrink-0">
                          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                            <ImageIcon className="h-8 w-8 text-white" />
                          </div>
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                              {nft.name}
                            </h3>
                            <Badge variant="outline" className="text-xs">
                              #{index + 1 + (page - 1) * perPage}
                            </Badge>
                          </div>
                          
                          <div className="flex items-center space-x-6 text-sm text-slate-600 dark:text-slate-400 mb-3">
                            <div className="flex items-center space-x-1">
                              <span className="font-medium">Symbol:</span>
                              <span>{nft.symbol}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Globe className="h-4 w-4" />
                              <span className="capitalize">{nft.asset_platform_id}</span>
                            </div>
                          </div>
                          
                          <div className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                            Contract: {nft.contract_address.slice(0, 6)}...{nft.contract_address.slice(-4)}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Badge variant="secondary" className="text-xs">
                          Click to view details
                        </Badge>
                        <ExternalLink className="h-4 w-4 text-slate-400" />
                      </div>
                    </div>
                  </div>
                ))}
                
                {filteredNFTs.length === 0 && !loading && (
                  <div className="text-center py-12">
                    <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">No NFT collections found</h3>
                    <p className="text-gray-600 dark:text-gray-400">Try adjusting your search or filter criteria</p>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* NFT Details Modal */}
        {selectedNFT && (
          <NFTDetailsModal nft={selectedNFT} onClose={closeModal} loading={loadingDetails} stripHtml={stripHtml} />
        )}
      </div>
    </MainLayout>
  );
}

// NFT Details Modal Component
interface NFTDetailsModalProps {
  nft: NFTCollection;
  onClose: () => void;
  loading: boolean;
  stripHtml: (html: string) => string;
}

function NFTDetailsModal({ nft, onClose, loading, stripHtml }: NFTDetailsModalProps) {
  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-8 max-w-md w-full mx-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Loading NFT details...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-lg overflow-hidden flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
              {nft.image?.large ? (
                <img 
                  src={nft.image.large} 
                  alt={nft.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling?.classList.remove('hidden');
                  }}
                />
              ) : null}
              <ImageIcon className={`h-8 w-8 text-white ${nft.image?.large ? 'hidden' : ''}`} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{nft.name}</h2>
              <p className="text-gray-600 dark:text-gray-400">{nft.symbol} • {nft.asset_platform_id.toUpperCase()}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            ×
          </Button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Large Image */}
          {nft.image?.large && (
            <div className="mb-6">
              <div className="w-full h-64 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden flex items-center justify-center">
                <img 
                  src={nft.image.large} 
                  alt={nft.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling?.classList.remove('hidden');
                  }}
                />
                <ImageIcon className="h-16 w-16 text-gray-400 hidden" />
              </div>
            </div>
          )}

          {/* Description */}
          {nft.description && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Description</h3>
              <p className="text-gray-600 dark:text-gray-400 whitespace-pre-wrap">{stripHtml(nft.description)}</p>
            </div>
          )}

          {/* Market Data */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {/* Floor Price */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Floor Price</h4>
              <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {nft.floor_price_usd ? formatCurrency(nft.floor_price_usd) : 'N/A'}
              </div>
              {nft.floor_price_24h_percentage_change !== null && (
                <div className={`text-sm ${getChangeColor(nft.floor_price_24h_percentage_change)}`}>
                  {formatPercentage(nft.floor_price_24h_percentage_change)} (24h)
                </div>
              )}
            </div>

            {/* Market Cap */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Market Cap</h4>
              <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {nft.market_cap_usd ? formatNumber(nft.market_cap_usd) : 'N/A'}
              </div>
              {nft.market_cap_24h_percentage_change !== null && (
                <div className={`text-sm ${getChangeColor(nft.market_cap_24h_percentage_change)}`}>
                  {formatPercentage(nft.market_cap_24h_percentage_change)} (24h)
                </div>
              )}
            </div>

            {/* 24h Volume */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">24h Volume</h4>
              <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {nft.volume_24h ? formatNumber(nft.volume_24h) : 'N/A'}
              </div>
              {nft.volume_24h_percentage_change !== null && (
                <div className={`text-sm ${getChangeColor(nft.volume_24h_percentage_change)}`}>
                  {formatPercentage(nft.volume_24h_percentage_change)} (24h)
                </div>
              )}
            </div>

            {/* Owners */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Owners</h4>
              <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {nft.number_of_owners ? formatNumber(nft.number_of_owners) : 'N/A'}
              </div>
              {nft.number_of_owners_24h_percentage_change !== null && (
                <div className={`text-sm ${getChangeColor(nft.number_of_owners_24h_percentage_change)}`}>
                  {formatPercentage(nft.number_of_owners_24h_percentage_change)} (24h)
                </div>
              )}
            </div>

            {/* Total Supply */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Total Supply</h4>
              <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {nft.total_supply ? formatNumber(nft.total_supply) : 'N/A'}
              </div>
            </div>

            {/* Average Sale Price */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Avg Sale Price (24h)</h4>
              <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {nft.average_sale_price_24h ? formatCurrency(nft.average_sale_price_24h) : 'N/A'}
              </div>
              {nft.average_sale_price_24h_percentage_change !== null && (
                <div className={`text-sm ${getChangeColor(nft.average_sale_price_24h_percentage_change)}`}>
                  {formatPercentage(nft.average_sale_price_24h_percentage_change)} (24h)
                </div>
              )}
            </div>
          </div>

          {/* Contract Information */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Contract Information</h3>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Contract Address</span>
                <div className="font-mono text-sm text-gray-900 dark:text-gray-100 break-all">
                  {nft.contract_address}
                </div>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Links</h3>
            <div className="flex flex-wrap gap-4">
              {nft.homepage && (
                <a
                  href={nft.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  <Globe className="h-4 w-4" />
                  <span>Website</span>
                </a>
              )}
              {nft.twitter && (
                <a
                  href={nft.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  <span>Twitter</span>
                </a>
              )}
              {nft.discord && (
                <a
                  href={nft.discord}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
                >
                  <span>Discord</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}