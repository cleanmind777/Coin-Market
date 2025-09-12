'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Home, 
  TrendingUp, 
  Star, 
  BarChart3, 
  Wallet, 
  Settings, 
  Search,
  Globe,
  PieChart,
  Activity,
  Store
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navigation = [
  { name: 'Landing', href: '/landing', icon: Home },
  { name: 'Dashboard', href: '/', icon: BarChart3 },
  { name: 'Markets', href: '/markets', icon: TrendingUp },
  { name: 'Exchanges', href: '/exchanges', icon: Store },
  { name: 'Portfolio', href: '/portfolio', icon: Wallet },
  { name: 'Watchlist', href: '/watchlist', icon: Star },
  { name: 'Analytics', href: '/analytics', icon: Activity },
  { name: 'Search', href: '/search', icon: Search },
  { name: 'Global Stats', href: '/global', icon: Globe },
  { name: 'Charts', href: '/charts', icon: PieChart },
];

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <div className={`${isCollapsed ? 'w-16' : 'w-64'} transition-all duration-300 border-r border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl text-slate-800 dark:text-slate-200 fixed top-0 left-0 h-full overflow-y-auto`}>
      <div className="flex flex-col h-full">
        {/* Collapse Toggle */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="w-full hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-300"
          >
            <div className="h-4 w-4">
              <div className={`h-0.5 w-4 bg-current transition-transform duration-300 ${isCollapsed ? 'rotate-45 translate-y-1.5' : ''}`} />
              <div className={`h-0.5 w-4 bg-current transition-opacity duration-300 ${isCollapsed ? 'opacity-0' : 'mt-1'}`} />
              <div className={`h-0.5 w-4 bg-current transition-transform duration-300 ${isCollapsed ? '-rotate-45 -translate-y-1.5' : 'mt-1'}`} />
            </div>
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.name} href={item.href}>
                <Button
                  variant={isActive ? "default" : "ghost"}
                  className={`w-full justify-start transition-all duration-300 ${
                    isActive 
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-xl' 
                      : 'hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-700 dark:hover:text-blue-300'
                  } ${isCollapsed ? 'px-2' : 'px-4 py-3'}`}
                >
                  <item.icon className={`h-5 w-5 ${isCollapsed ? '' : 'mr-3'}`} />
                  {!isCollapsed && <span className="font-medium">{item.name}</span>}
                </Button>
              </Link>
            );
          })}
        </nav>

        {/* Settings */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800">
          <Link href="/settings">
            <Button
              variant="ghost"
              className={`w-full justify-start hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-300 ${isCollapsed ? 'px-2' : 'px-4 py-3'}`}
            >
              <Settings className={`h-5 w-5 ${isCollapsed ? '' : 'mr-3'}`} />
              {!isCollapsed && <span className="font-medium">Settings</span>}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}