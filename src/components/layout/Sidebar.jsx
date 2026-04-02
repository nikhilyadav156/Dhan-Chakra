import React from 'react';
import { LayoutDashboard, Receipt, PieChart, Settings, Aperture } from 'lucide-react';
import { cn } from '../../lib/utils';

export function Sidebar({ className, activeTab, setActiveTab }) {
  const navItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'transactions', icon: Receipt, label: 'Transactions' },
    { id: 'insights', icon: PieChart, label: 'Insights' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <aside className={cn("flex flex-col border-r border-emerald-100/50 bg-white/30 px-4 py-8 dark:border-white/5 dark:bg-white/5 backdrop-blur-xl transition-all", className)}>
      <div className="flex items-center gap-3 px-2 mb-10">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-emerald-400 to-cyan-500 text-white shadow-lg shadow-emerald-500/30">
          <Aperture className="h-5 w-5 animate-[spin_6s_linear_infinite]" />
        </div>
        <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-cyan-600 dark:from-emerald-400 dark:to-cyan-400">Dhan-Chakra</span>
      </div>
      <nav className="flex-1 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all duration-200",
                isActive 
                  ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300 shadow-sm shadow-emerald-100 dark:shadow-emerald-900/20" 
                  : "text-slate-500 hover:bg-emerald-50/50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-white/5 dark:hover:text-slate-200"
              )}
            >
              <Icon className={cn("h-5 w-5", isActive ? "text-emerald-600 dark:text-emerald-400" : "")} />
              {item.label}
            </button>
          )
        })}
      </nav>
      
      <div className="mt-auto px-2 opacity-60">
         <p className="text-xs text-slate-400 dark:text-slate-600 font-medium">Dhan-Chakra v2.0</p>
      </div>
    </aside>
  );
}
