import React from 'react';
import { cn } from '../../lib/utils';

export const Button = React.forwardRef(({ className, variant = 'default', size = 'default', ...props }, ref) => {
  const variants = {
    default: "bg-gradient-to-r from-emerald-400 to-cyan-500 text-white shadow-md shadow-emerald-500/20 hover:opacity-90 dark:shadow-emerald-500/10",
    destructive: "bg-red-500 text-slate-50 hover:bg-red-600 shadow-md shadow-red-500/20 dark:bg-red-600 dark:hover:bg-red-700",
    outline: "border border-slate-200/60 bg-white/50 backdrop-blur hover:bg-emerald-50 hover:text-emerald-900 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10 dark:hover:text-slate-50 shadow-sm",
    secondary: "bg-cyan-50 text-cyan-700 hover:bg-cyan-100 dark:bg-cyan-500/10 dark:text-cyan-300 dark:hover:bg-cyan-500/20",
    ghost: "hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-white/5 dark:hover:text-slate-50",
  };
  const sizes = {
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-xl px-3",
    lg: "h-11 rounded-xl px-8",
    icon: "h-10 w-10",
  };

  return (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-medium transition-all active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950 disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  );
});
Button.displayName = "Button";
