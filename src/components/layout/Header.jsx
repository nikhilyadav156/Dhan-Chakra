import React from 'react';
import { Sun, Moon, UserCircle2, Aperture, Banknote, ShieldAlert } from 'lucide-react';
import { useFinance } from '../../context/FinanceContext';
import { Button } from '../ui/Button';

export function Header() {
  const { theme, toggleTheme, role, toggleRole, currency, toggleCurrency } = useFinance();

  return (
    <header className="sticky top-0 z-30 flex h-16 shrink-0 w-full items-center justify-between border-b border-slate-200 bg-white/80 px-4 sm:px-6 backdrop-blur-md dark:border-slate-800/50 dark:bg-[var(--color-fin-bg)]/80">
      <div className="flex items-center">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--color-fin-primary)] text-white shadow-sm md:hidden mr-3 shrink-0">
          <Aperture className="h-4 w-4 animate-[spin_6s_linear_infinite]" />
        </div>
        <h2 className="text-lg font-bold tracking-tight text-slate-900 dark:text-slate-100 md:hidden flex-1 truncate max-w-[130px] sm:max-w-none">Dhan-Chakra</h2>
        <div className="hidden md:flex flex-col">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 leading-tight">Good {new Date().getHours() < 12 ? 'Morning' : 'Evening'}, Nikhil</h2>
          <p className="text-xs font-medium text-slate-500 dark:text-[var(--color-fin-muted)]">Here is your financial summary</p>
        </div>
      </div>
      <div className="flex items-center gap-2 sm:gap-4 ml-auto">
        
        {/* Role Badge Indicator */}
        <div className="hidden sm:flex items-center justify-center px-2.5 py-1.5 rounded-md text-[11px] font-bold tracking-wide bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors" onClick={toggleRole} title="Click to swap role">
          {role === 'Admin' ? <><ShieldAlert className="w-3.5 h-3.5 mr-1.5 text-blue-500" /> Admin Access</> : 'Viewer Mode'}
        </div>
        
        {/* Mobile Role Toggle */}
        <Button variant="ghost" size="icon" onClick={toggleRole} className="sm:hidden h-8 w-8 text-slate-500 dark:text-[var(--color-fin-muted)] hover:text-blue-600" title="Toggle Admin">
           {role === 'Admin' ? <ShieldAlert className="w-4 h-4 text-blue-600" /> : <ShieldAlert className="w-4 h-4 opacity-50" />}
        </Button>

        {/* Currency Toggle */}
        <Button variant="outline" size="sm" onClick={toggleCurrency} className="h-8 px-3 hidden sm:flex text-[11px] font-bold tracking-wider hover:border-blue-200 dark:hover:border-blue-800 transition-colors">
          {currency === 'USD' ? 'USD' : 'INR'}
        </Button>
        <Button variant="ghost" size="icon" onClick={toggleCurrency} className="sm:hidden h-8 w-8 text-slate-500 dark:text-[var(--color-fin-muted)]">
          <Banknote className="h-4 w-4" />
        </Button>

        {/* Theme Toggle */}
        <Button variant="ghost" size="icon" onClick={toggleTheme} className="h-8 w-8 text-slate-500 dark:text-[var(--color-fin-muted)] hover:text-slate-900 dark:hover:text-slate-100">
          {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>
        
        {/* User Avatar */}
        <button className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-[var(--color-fin-muted)] hover:ring-2 ring-[var(--color-fin-primary)] ring-offset-2 dark:ring-offset-[var(--color-fin-bg)] transition-all ml-1 shrink-0">
          <UserCircle2 className="h-4 w-4 sm:h-5 sm:w-5 relative" />
        </button>
      </div>
    </header>
  );
}
