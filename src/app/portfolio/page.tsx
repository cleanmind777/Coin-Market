'use client';

import { useState, useEffect } from 'react';
import { MainLayout } from '@/components/layout/main-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { formatCurrency, formatPercentage, getChangeColor } from '@/lib/utils';
import { Plus, Trash2, Edit, TrendingUp, TrendingDown, Wallet } from 'lucide-react';

interface PortfolioItem {
  id: string;
  symbol: string;
  name: string;
  amount: number;
  buyPrice: number;
  currentPrice: number;
  value: number;
  profitLoss: number;
  profitLossPercentage: number;
}

export default function PortfolioPage() {
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const [totalValue, setTotalValue] = useState(0);
  const [totalProfitLoss, setTotalProfitLoss] = useState(0);
  const [totalProfitLossPercentage, setTotalProfitLossPercentage] = useState(0);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newItem, setNewItem] = useState({
    symbol: '',
    amount: 0,
    buyPrice: 0,
  });

  // Mock data for demonstration
  useEffect(() => {
    const mockPortfolio: PortfolioItem[] = [
      {
        id: '1',
        symbol: 'BTC',
        name: 'Bitcoin',
        amount: 0.5,
        buyPrice: 45000,
        currentPrice: 65000,
        value: 32500,
        profitLoss: 10000,
        profitLossPercentage: 44.44,
      },
      {
        id: '2',
        symbol: 'ETH',
        name: 'Ethereum',
        amount: 2,
        buyPrice: 3000,
        currentPrice: 3500,
        value: 7000,
        profitLoss: 1000,
        profitLossPercentage: 16.67,
      },
      {
        id: '3',
        symbol: 'SOL',
        name: 'Solana',
        amount: 10,
        buyPrice: 100,
        currentPrice: 80,
        value: 800,
        profitLoss: -200,
        profitLossPercentage: -20,
      },
    ];

    setPortfolio(mockPortfolio);
  }, []);

  useEffect(() => {
    const total = portfolio.reduce((sum, item) => sum + item.value, 0);
    const totalPL = portfolio.reduce((sum, item) => sum + item.profitLoss, 0);
    const totalPLPercentage = total > 0 ? (totalPL / (total - totalPL)) * 100 : 0;

    setTotalValue(total);
    setTotalProfitLoss(totalPL);
    setTotalProfitLossPercentage(totalPLPercentage);
  }, [portfolio]);

  const handleAddItem = () => {
    if (newItem.symbol && newItem.amount > 0 && newItem.buyPrice > 0) {
      // In a real app, you would fetch current price from API
      const currentPrice = newItem.buyPrice; // Mock current price
      const value = newItem.amount * currentPrice;
      const profitLoss = value - (newItem.amount * newItem.buyPrice);
      const profitLossPercentage = ((currentPrice - newItem.buyPrice) / newItem.buyPrice) * 100;

      const newPortfolioItem: PortfolioItem = {
        id: Date.now().toString(),
        symbol: newItem.symbol.toUpperCase(),
        name: newItem.symbol.toUpperCase(), // In real app, fetch name from API
        amount: newItem.amount,
        buyPrice: newItem.buyPrice,
        currentPrice: currentPrice,
        value: value,
        profitLoss: profitLoss,
        profitLossPercentage: profitLossPercentage,
      };

      setPortfolio([...portfolio, newPortfolioItem]);
      setNewItem({ symbol: '', amount: 0, buyPrice: 0 });
      setShowAddForm(false);
    }
  };

  const handleRemoveItem = (id: string) => {
    setPortfolio(portfolio.filter(item => item.id !== id));
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Portfolio</h1>
            <p className="text-muted-foreground">Track your cryptocurrency investments</p>
          </div>
          <Button onClick={() => setShowAddForm(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Asset
          </Button>
        </div>

        {/* Portfolio Summary */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Value</CardTitle>
              <Wallet className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(totalValue)}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total P&L</CardTitle>
              {totalProfitLoss >= 0 ? (
                <TrendingUp className="h-4 w-4 text-green-500" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-500" />
              )}
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${getChangeColor(totalProfitLoss)}`}>
                {formatCurrency(totalProfitLoss)}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">P&L Percentage</CardTitle>
              {totalProfitLossPercentage >= 0 ? (
                <TrendingUp className="h-4 w-4 text-green-500" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-500" />
              )}
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${getChangeColor(totalProfitLossPercentage)}`}>
                {formatPercentage(totalProfitLossPercentage)}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Add Asset Form */}
        {showAddForm && (
          <Card>
            <CardHeader>
              <CardTitle>Add New Asset</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <Input
                  placeholder="Symbol (e.g., BTC)"
                  value={newItem.symbol}
                  onChange={(e) => setNewItem({ ...newItem, symbol: e.target.value })}
                />
                <Input
                  type="number"
                  placeholder="Amount"
                  value={newItem.amount || ''}
                  onChange={(e) => setNewItem({ ...newItem, amount: parseFloat(e.target.value) || 0 })}
                />
                <Input
                  type="number"
                  placeholder="Buy Price"
                  value={newItem.buyPrice || ''}
                  onChange={(e) => setNewItem({ ...newItem, buyPrice: parseFloat(e.target.value) || 0 })}
                />
              </div>
              <div className="flex gap-2 mt-4">
                <Button onClick={handleAddItem}>Add Asset</Button>
                <Button variant="outline" onClick={() => setShowAddForm(false)}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Portfolio Items */}
        <Card>
          <CardHeader>
            <CardTitle>Your Assets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {portfolio.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Wallet className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No assets in your portfolio yet.</p>
                  <p className="text-sm">Add your first cryptocurrency to get started.</p>
                </div>
              ) : (
                portfolio.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div>
                        <div className="font-medium">{item.name}</div>
                        <div className="text-sm text-muted-foreground">{item.symbol}</div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-6">
                      <div className="text-right">
                        <div className="font-medium">{formatCurrency(item.value)}</div>
                        <div className="text-sm text-muted-foreground">
                          {item.amount} × {formatCurrency(item.currentPrice)}
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="font-medium">
                          {formatCurrency(item.buyPrice * item.amount)}
                        </div>
                        <div className="text-sm text-muted-foreground">Cost Basis</div>
                      </div>

                      <div className="text-right">
                        <div className={`font-medium ${getChangeColor(item.profitLoss)}`}>
                          {formatCurrency(item.profitLoss)}
                        </div>
                        <div className={`text-sm ${getChangeColor(item.profitLossPercentage)}`}>
                          {formatPercentage(item.profitLossPercentage)}
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemoveItem(item.id)}
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