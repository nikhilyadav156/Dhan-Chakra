import React from 'react';
import { Sun, Moon, UserCircle2, Aperture, Banknote, ShieldAlert } from 'lucide-react';
import { useFinance } from '../../context/FinanceContext';
import { Button } from '../ui/Button';

export function Header() {
  const { theme, toggleTheme, role, toggleRole, currency, toggleCurrency } = useFinance();

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-200 bg-white/80 px-6 backdrop-blur-md dark:border-slate-800/50 dark:bg-[var(--color-fin-bg)]/80">
      <div className="flex items-center">
        <div className="flex h-6 w-6 items-center justify-center rounded-md bg-[var(--color-fin-emerald)] text-white shadow-sm md:hidden mr-3">
          <Aperture className="h-3.5 w-3.5" />
        </div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 md:hidden mr-4">Dhan-Chakra</h2>
        <div className="hidden md:flex flex-col">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 leading-tight">Good {new Date().getHours() < 12 ? 'Morning' : 'Evening'}, Nikhil</h2>
          <p className="text-xs font-medium text-slate-500 dark:text-[var(--color-fin-muted)]">Here is your financial summary</p>
        </div>
      </div>
      <div className="flex items-center gap-3 sm:gap-4">
        
        {/* Role Badge Indicator */}
        <div className="hidden sm:flex items-center justify-center px-2.5 py-1.5 rounded-md text-[11px] font-bold tracking-wide bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors" onClick={toggleRole} title="Click to swap role">
          {role === 'Admin' ? <><ShieldAlert className="w-3.5 h-3.5 mr-1.5 text-emerald-500" /> Admin Access</> : 'Viewer Mode'}
        </div>
        
        {/* Currency Toggle */}
        <Button variant="outline" size="sm" onClick={toggleCurrency} className="h-8 px-3 hidden sm:flex text-xs font-semibold">
          {currency === 'USD' ? 'USD' : 'INR'}
        </Button>
        <Button variant="ghost" size="icon" onClick={toggleCurrency} className="sm:hidden text-slate-500 dark:text-[var(--color-fin-muted)]">
          <Banknote className="h-5 w-5" />
        </Button>

        {/* Theme Toggle */}
        <Button variant="ghost" size="icon" onClick={toggleTheme} className="text-slate-500 dark:text-[var(--color-fin-muted)] hover:text-slate-900 dark:hover:text-slate-100">
          {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
        
        {/* User Avatar */}
        <button className="h-8 w-8 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-[var(--color-fin-muted)] hover:ring-2 ring-[var(--color-fin-emerald)] ring-offset-2 dark:ring-offset-[var(--color-fin-bg)] transition-all">
          <UserCircle2 className="h-5 w-5" />
        </button>
      </div>
    </header>
  );
}
