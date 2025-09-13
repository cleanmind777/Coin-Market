'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Menu, Bell, User } from 'lucide-react';
import Image from 'next/image';
import { ThemeToggle } from '@/components/ui/theme-toggle';

export function Header() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-slate-900/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo and Brand */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-xl flex items-center justify-center">
              <Image
                src="/logo.svg"
                alt="Clean Mind Logo"
                width={40}
                height={40}
                className="rounded-xl"
              />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Clean Mind
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Crypto Monitor</p>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-md mx-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
            <Input
              placeholder="Search cryptocurrencies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-modern pl-12 pr-4 w-full bg-white/90 dark:bg-slate-800/90 text-slate-900 dark:text-slate-100 placeholder:text-slate-500 dark:placeholder:text-slate-400 border-slate-200 dark:border-slate-700 focus:border-blue-500 dark:focus:border-blue-400"
            />
          </div>
        </div>

        {/* Navigation and Actions */}
        <div className="flex items-center space-x-2">
          <ThemeToggle />
          <Button variant="ghost" size="icon" className="hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300">
            <Bell className="h-5 w-5 text-slate-600 dark:text-slate-100" />
          </Button>
          <Button variant="ghost" size="icon" className="hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300">
            <User className="h-5 w-5 text-slate-600 dark:text-slate-100" />
          </Button>
          <Button variant="ghost" size="icon" className="hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300">
            <Menu className="h-5 w-5 text-slate-600 dark:text-slate-100" />
          </Button>
        </div>
      </div>
    </header>
  );
}