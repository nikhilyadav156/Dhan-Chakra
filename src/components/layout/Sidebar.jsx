import React from 'react';
import { LayoutDashboard, Receipt, PieChart, Settings, Aperture } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useFinance } from '../../context/FinanceContext';

export function Sidebar({ className, activeTab, setActiveTab }) {
  const { role } = useFinance();
  const navItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'transactions', icon: Receipt, label: 'Transactions' },
    { id: 'insights', icon: PieChart, label: 'Insights' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <aside className={cn("flex flex-col border-r border-slate-200 bg-white px-4 py-8 dark:border-slate-800/50 dark:bg-[var(--color-fin-card)] transition-all", className)}>
      <div className="flex items-center gap-3 px-2 mb-10">
        <div className={`flex h-8 w-8 items-center justify-center rounded-lg text-white shadow-sm transition-colors ${role === 'Admin' ? 'bg-[var(--color-fin-primary)]' : 'bg-emerald-500'}`}>
          <Aperture className="h-5 w-5 animate-[spin_6s_linear_infinite]" />
        </div>
        <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-50">Dhan-Chakra</span>
      </div>
      <nav className="flex-1 space-y-1.5">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                isActive 
                  ? "bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-[var(--color-fin-primary)]" 
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-900 dark:text-[var(--color-fin-muted)] dark:hover:bg-slate-800/50 dark:hover:text-slate-200"
              )}
            >
              <Icon className={cn("h-5 w-5", isActive ? "text-slate-900 dark:text-[var(--color-fin-primary)]" : "")} />
              {item.label}
            </button>
          )
        })}
      </nav>
      
      <div className="mt-auto px-2">
         <p className="text-xs font-medium text-slate-400 dark:text-[var(--color-fin-muted)] opacity-80">v2.0 Fintech</p>
      </div>
    </aside>
  );
}
