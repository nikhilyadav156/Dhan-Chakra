import React from 'react';
import { LayoutDashboard, Receipt, PieChart, Settings } from 'lucide-react';
import { cn } from '../../lib/utils';

export function BottomNav({ activeTab, setActiveTab }) {
  const navItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Home' },
    { id: 'transactions', icon: Receipt, label: 'History' },
    { id: 'insights', icon: PieChart, label: 'Insights' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 flex items-center justify-around border-t border-slate-200 bg-white/95 backdrop-blur-xl pb-safe dark:border-slate-800/80 dark:bg-[#0F172A]/95 h-16 shadow-[0_-4px_24px_rgba(0,0,0,0.02)]">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={cn(
              "flex flex-col items-center justify-center w-full h-full space-y-1 transition-all",
              isActive ? "text-blue-600 dark:text-blue-500" : "text-slate-500 dark:text-[var(--color-fin-muted)]"
            )}
          >
            <Icon className={cn("h-5 w-5", isActive && "animate-in zoom-in duration-200")} />
            <span className="text-[10px] font-medium tracking-wide">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
