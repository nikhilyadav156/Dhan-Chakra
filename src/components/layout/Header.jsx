import React from 'react';
import { Sun, Moon, UserCircle2, Aperture, Banknote } from 'lucide-react';
import { useFinance } from '../../context/FinanceContext';
import { Button } from '../ui/Button';

export function Header() {
  const { theme, toggleTheme, role, toggleRole, currency, toggleCurrency } = useFinance();

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-emerald-100/50 bg-white/40 px-6 backdrop-blur-xl dark:border-white/5 dark:bg-white/5">
      <div className="flex items-center">
        <div className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-tr from-emerald-400 to-cyan-500 text-white shadow-sm md:hidden mr-2">
          <Aperture className="h-3.5 w-3.5 animate-[spin_6s_linear_infinite]" />
        </div>
        <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-cyan-600 dark:from-emerald-400 dark:to-cyan-400 md:hidden mr-4">Dhan-Chakra</h2>
        <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-200 hidden md:block">Good {new Date().getHours() < 12 ? 'Morning' : 'Evening'}, Nikhil!</h2>
      </div>
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Role Switcher Group */}
        <div className="flex items-center gap-1 bg-slate-100/50 dark:bg-black/20 rounded-full p-1 border border-slate-200/50 dark:border-white/5 hidden sm:flex backdrop-blur-md">
          <Button 
            variant={role === 'Viewer' ? 'default' : 'ghost'} 
            size="sm" 
            onClick={() => role !== 'Viewer' && toggleRole()} 
            className="rounded-full h-7 text-xs px-4"
          >
            Viewer
          </Button>
          <Button 
            variant={role === 'Admin' ? 'default' : 'ghost'} 
            size="sm" 
            onClick={() => role !== 'Admin' && toggleRole()} 
            className="rounded-full h-7 text-xs px-4"
          >
            Admin
          </Button>
        </div>
        
        {/* Currency Toggle */}
        <Button variant="ghost" size="sm" onClick={toggleCurrency} className="rounded-full hover:bg-emerald-50 dark:hover:bg-white/10 text-emerald-600 dark:text-emerald-400 font-semibold w-12 hidden sm:flex h-9 shadow-sm shadow-emerald-500/5 border border-transparent hover:border-emerald-100 dark:hover:border-white/10">
          {currency === 'USD' ? 'USD' : 'INR'}
        </Button>
        <Button variant="ghost" size="icon" onClick={toggleCurrency} className="rounded-full hover:bg-emerald-50 dark:hover:bg-white/10 text-emerald-600 dark:text-emerald-400 sm:hidden">
          <Banknote className="h-5 w-5" />
        </Button>

        {/* Theme Toggle */}
        <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full hover:bg-emerald-50 dark:hover:bg-white/10 text-emerald-600 dark:text-emerald-400">
          {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
        
        {/* User Avatar */}
        <Button variant="ghost" size="icon" className="rounded-full bg-gradient-to-tr from-emerald-400 to-cyan-500 text-white hover:opacity-90 shadow-md shadow-emerald-500/20">
          <UserCircle2 className="h-6 w-6" />
        </Button>
      </div>
    </header>
  );
}
