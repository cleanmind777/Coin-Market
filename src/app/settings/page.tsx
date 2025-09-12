'use client';

import { useState, useEffect } from 'react';
import { MainLayout } from '@/components/layout/main-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Settings, User, Bell, Palette, Shield, Database, Globe } from 'lucide-react';

export default function SettingsPage() {
  const [currentDate, setCurrentDate] = useState<string>('');
  const [settings, setSettings] = useState({
    theme: 'system',
    currency: 'usd',
    language: 'en',
    notifications: {
      priceAlerts: true,
      portfolioUpdates: true,
      trendingCoins: false,
      marketNews: true,
    },
    display: {
      showMarketCap: true,
      showVolume: true,
      showChange: true,
      compactMode: false,
    },
    privacy: {
      shareData: false,
      analytics: true,
      crashReports: true,
    },
  });

  // Set current date client-side only to avoid hydration mismatch
  useEffect(() => {
    setCurrentDate(new Date().toLocaleDateString());
  }, []);

  const handleSettingChange = (category: string, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...(prev[category as keyof typeof prev] as Record<string, any>),
        [key]: value,
      },
    }));
  };

  const saveSettings = () => {
    // In a real app, you would save to localStorage or API
    console.log('Saving settings:', settings);
    alert('Settings saved successfully!');
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-slate-100">Settings</h1>
          <p className="text-slate-300">Customize your Clean Mind experience</p>
        </div>

        {/* General Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="h-5 w-5" />
              <span>General</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-sm font-medium">Theme</label>
                <select
                  value={settings.theme}
                  onChange={(e) => setSettings(prev => ({ ...prev, theme: e.target.value }))}
                  className="w-full mt-1 p-2 border rounded-md"
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                  <option value="system">System</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Currency</label>
                <select
                  value={settings.currency}
                  onChange={(e) => setSettings(prev => ({ ...prev, currency: e.target.value }))}
                  className="w-full mt-1 p-2 border rounded-md"
                >
                  <option value="usd">USD</option>
                  <option value="eur">EUR</option>
                  <option value="gbp">GBP</option>
                  <option value="jpy">JPY</option>
                  <option value="btc">BTC</option>
                  <option value="eth">ETH</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Language</label>
                <select
                  value={settings.language}
                  onChange={(e) => setSettings(prev => ({ ...prev, language: e.target.value }))}
                  className="w-full mt-1 p-2 border rounded-md"
                >
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                  <option value="zh">Chinese</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bell className="h-5 w-5" />
              <span>Notifications</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {Object.entries(settings.notifications).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">
                      {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                    </div>
                    <div className="text-sm text-slate-400">
                      {key === 'priceAlerts' && 'Get notified when prices reach your targets'}
                      {key === 'portfolioUpdates' && 'Receive updates about your portfolio performance'}
                      {key === 'trendingCoins' && 'Get notified about trending cryptocurrencies'}
                      {key === 'marketNews' && 'Receive important market news and updates'}
                    </div>
                  </div>
                  <Button
                    variant={value ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => handleSettingChange('notifications', key, !value)}
                  >
                    {value ? 'On' : 'Off'}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Display Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Palette className="h-5 w-5" />
              <span>Display</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {Object.entries(settings.display).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">
                      {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                    </div>
                    <div className="text-sm text-slate-400">
                      {key === 'showMarketCap' && 'Display market capitalization data'}
                      {key === 'showVolume' && 'Show trading volume information'}
                      {key === 'showChange' && 'Display price change percentages'}
                      {key === 'compactMode' && 'Use compact layout for better space utilization'}
                    </div>
                  </div>
                  <Button
                    variant={value ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => handleSettingChange('display', key, !value)}
                  >
                    {value ? 'On' : 'Off'}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Privacy Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="h-5 w-5" />
              <span>Privacy & Data</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {Object.entries(settings.privacy).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">
                      {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                    </div>
                    <div className="text-sm text-slate-400">
                      {key === 'shareData' && 'Share anonymous usage data to improve the app'}
                      {key === 'analytics' && 'Allow analytics tracking for better insights'}
                      {key === 'crashReports' && 'Send crash reports to help improve stability'}
                    </div>
                  </div>
                  <Button
                    variant={value ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => handleSettingChange('privacy', key, !value)}
                  >
                    {value ? 'On' : 'Off'}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* About */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Globe className="h-5 w-5" />
              <span>About</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <div className="font-medium">App Version</div>
                <div className="text-sm text-slate-400">1.0.0</div>
              </div>
              <div>
                <div className="font-medium">API Provider</div>
                <div className="text-sm text-slate-400">CoinGecko API v3</div>
              </div>
              <div>
                <div className="font-medium">Last Updated</div>
                <div className="text-sm text-slate-400">
                  {currentDate || 'Loading...'}
                </div>
              </div>
              <div>
                <div className="font-medium">Data Refresh</div>
                <div className="text-sm text-slate-400">Every 5 minutes</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button onClick={saveSettings} className="px-8">
            Save Settings
          </Button>
        </div>
      </div>
    </MainLayout>
  );
}