'use client';

import { Header } from './header';
import { Sidebar } from './sidebar';

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 modern-scrollbar">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6 modern-scrollbar overflow-y-auto ml-64">
          {children}
        </main>
      </div>
    </div>
  );
}