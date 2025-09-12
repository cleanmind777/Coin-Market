'use client';

import { useState } from 'react';
import { MainLayout } from '@/components/layout/main-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatCurrency, formatPercentage, formatTimeAgo, getChangeColor } from '@/lib/utils';
import { Activity, TrendingUp, TrendingDown, Star, Eye, RefreshCw } from 'lucide-react';

interface ActivityItem {
  id: string;
  type: 'price_alert' | 'trending' | 'watchlist' | 'portfolio' | 'search';
  title: string;
  description: string;
  timestamp: number;
  value?: number;
  change?: number;
  symbol?: string;
}

export default function ActivityPage() {
  const [activities, setActivities] = useState<ActivityItem[]>([
    {
      id: '1',
      type: 'price_alert',
      title: 'Bitcoin Price Alert',
      description: 'BTC reached $65,000',
      timestamp: Date.now() - 1000 * 60 * 30, // 30 minutes ago
      value: 65000,
      symbol: 'BTC',
    },
    {
      id: '2',
      type: 'trending',
      title: 'New Trending Coin',
      description: 'Solana is trending in the market',
      timestamp: Date.now() - 1000 * 60 * 60 * 2, // 2 hours ago
      symbol: 'SOL',
    },
    {
      id: '3',
      type: 'watchlist',
      title: 'Added to Watchlist',
      description: 'Ethereum added to your watchlist',
      timestamp: Date.now() - 1000 * 60 * 60 * 4, // 4 hours ago
      symbol: 'ETH',
    },
    {
      id: '4',
      type: 'portfolio',
      title: 'Portfolio Update',
      description: 'Your portfolio value increased by 5.2%',
      timestamp: Date.now() - 1000 * 60 * 60 * 6, // 6 hours ago
      change: 5.2,
    },
    {
      id: '5',
      type: 'search',
      title: 'Search Activity',
      description: 'Searched for "DeFi tokens"',
      timestamp: Date.now() - 1000 * 60 * 60 * 8, // 8 hours ago
    },
    {
      id: '6',
      type: 'price_alert',
      title: 'Ethereum Price Alert',
      description: 'ETH dropped below $3,500',
      timestamp: Date.now() - 1000 * 60 * 60 * 12, // 12 hours ago
      value: 3500,
      symbol: 'ETH',
    },
  ]);

  const getActivityIcon = (type: ActivityItem['type']) => {
    switch (type) {
      case 'price_alert':
        return <TrendingUp className="h-4 w-4" />;
      case 'trending':
        return <TrendingDown className="h-4 w-4" />;
      case 'watchlist':
        return <Star className="h-4 w-4" />;
      case 'portfolio':
        return <Activity className="h-4 w-4" />;
      case 'search':
        return <Eye className="h-4 w-4" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };

  const getActivityColor = (type: ActivityItem['type']) => {
    switch (type) {
      case 'price_alert':
        return 'text-green-500';
      case 'trending':
        return 'text-orange-500';
      case 'watchlist':
        return 'text-blue-500';
      case 'portfolio':
        return 'text-purple-500';
      case 'search':
        return 'text-gray-500';
      default:
        return 'text-gray-500';
    }
  };

  const getActivityBadgeVariant = (type: ActivityItem['type']) => {
    switch (type) {
      case 'price_alert':
        return 'success';
      case 'trending':
        return 'warning';
      case 'watchlist':
        return 'default';
      case 'portfolio':
        return 'secondary';
      case 'search':
        return 'outline';
      default:
        return 'outline';
    }
  };

  const clearAllActivities = () => {
    setActivities([]);
  };

  const removeActivity = (id: string) => {
    setActivities(activities.filter(activity => activity.id !== id));
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Activity Feed</h1>
            <p className="text-muted-foreground">Track your recent activities and market events</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={clearAllActivities}>
              Clear All
            </Button>
            <Button variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>

        {/* Activity Summary */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Activities</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activities.length}</div>
              <div className="text-xs text-muted-foreground">Recent activities</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Price Alerts</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {activities.filter(a => a.type === 'price_alert').length}
              </div>
              <div className="text-xs text-muted-foreground">Active alerts</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Watchlist Updates</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {activities.filter(a => a.type === 'watchlist').length}
              </div>
              <div className="text-xs text-muted-foreground">Recent changes</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Portfolio Updates</CardTitle>
              <TrendingDown className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {activities.filter(a => a.type === 'portfolio').length}
              </div>
              <div className="text-xs text-muted-foreground">Value changes</div>
            </CardContent>
          </Card>
        </div>

        {/* Activity Feed */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            {activities.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Activity className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No recent activities</p>
                <p className="text-sm">Your activity feed will appear here</p>
              </div>
            ) : (
              <div className="space-y-4">
                {activities.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-start space-x-4 p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                  >
                    <div className={`p-2 rounded-full bg-muted ${getActivityColor(activity.type)}`}>
                      {getActivityIcon(activity.type)}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-medium">{activity.title}</h3>
                          <Badge variant={getActivityBadgeVariant(activity.type)}>
                            {activity.type.replace('_', ' ').toUpperCase()}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-muted-foreground">
                            {formatTimeAgo(activity.timestamp)}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeActivity(activity.id)}
                          >
                            ×
                          </Button>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {activity.description}
                      </p>
                      {activity.value && (
                        <div className="mt-2">
                          <span className="text-sm font-medium">
                            {formatCurrency(activity.value)}
                          </span>
                        </div>
                      )}
                      {activity.change && (
                        <div className="mt-2">
                          <span className={`text-sm font-medium ${getChangeColor(activity.change)}`}>
                            {formatPercentage(activity.change)}
                          </span>
                        </div>
                      )}
                      {activity.symbol && (
                        <div className="mt-2">
                          <Badge variant="outline" className="text-xs">
                            {activity.symbol}
                          </Badge>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}