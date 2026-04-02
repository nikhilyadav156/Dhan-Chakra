import React from 'react';
import { cn } from '../../lib/utils';

export const Button = React.forwardRef(({ className, variant = 'default', size = 'default', ...props }, ref) => {
  const variants = {
    default: "bg-[var(--color-fin-emerald)] text-white hover:bg-emerald-600 shadow-sm dark:bg-[var(--color-fin-emerald)] dark:hover:bg-emerald-600 dark:text-white",
    destructive: "bg-[var(--color-fin-red)] text-white hover:bg-red-600 shadow-sm dark:bg-[var(--color-fin-red)] dark:text-white",
    outline: "border border-slate-200 bg-white hover:bg-slate-50 text-slate-900 dark:border-slate-700 dark:bg-[var(--color-fin-card)] dark:hover:bg-slate-800 dark:text-[var(--color-fin-text)] shadow-sm",
    secondary: "bg-slate-100 text-slate-900 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700",
    ghost: "hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-slate-100",
  };
  const sizes = {
    default: "h-10 px-4 py-2",
    sm: "h-8 rounded-lg px-3 text-xs",
    lg: "h-11 rounded-lg px-8",
    icon: "h-10 w-10",
  };

  return (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-all active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[var(--color-fin-bg)] disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  );
});
Button.displayName = "Button";
