import React, { useMemo } from 'react';
import { useFinance } from '../../context/FinanceContext';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Wallet, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export function SummaryCards() {
  const { transactions, formatCurrency } = useFinance();

  const { balance, income, expenses } = useMemo(() => {
    let inc = 0, exp = 0;
    transactions.forEach(t => {
      if (t.type === 'income') inc += t.amount;
      else if (t.type === 'expense') exp += t.amount;
    });
    return { balance: inc - exp, income: inc, expenses: exp };
  }, [transactions]);

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-slate-500 dark:text-[var(--color-fin-muted)]">Total Balance</CardTitle>
          <div className="h-8 w-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
            <Wallet className="h-4 w-4 text-slate-600 dark:text-slate-300" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold tracking-tight text-slate-900 dark:text-[var(--color-fin-text)]">{formatCurrency(balance)}</div>
          <div className="flex items-center mt-2 text-xs font-medium text-[var(--color-fin-emerald)] bg-emerald-50 dark:bg-emerald-500/10 w-fit px-2 py-0.5 rounded-full">
            <ArrowUpRight className="mr-1 h-3 w-3" />
            +2.5% from last month
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-slate-500 dark:text-[var(--color-fin-muted)]">Monthly Income</CardTitle>
          <div className="h-8 w-8 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center">
            <TrendingUp className="h-4 w-4 text-[var(--color-fin-emerald)]" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold tracking-tight text-slate-900 dark:text-[var(--color-fin-text)]">{formatCurrency(income)}</div>
          <div className="flex items-center mt-2 text-xs font-medium text-[var(--color-fin-emerald)] bg-emerald-50 dark:bg-emerald-500/10 w-fit px-2 py-0.5 rounded-full">
            <ArrowUpRight className="mr-1 h-3 w-3" />
            +12% from last month
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-slate-500 dark:text-[var(--color-fin-muted)]">Monthly Expenses</CardTitle>
          <div className="h-8 w-8 rounded-lg bg-red-50 dark:bg-red-500/10 flex items-center justify-center">
            <TrendingDown className="h-4 w-4 text-[var(--color-fin-red)]" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold tracking-tight text-slate-900 dark:text-[var(--color-fin-text)]">{formatCurrency(expenses)}</div>
          <div className="flex items-center mt-2 text-xs font-medium text-[var(--color-fin-red)] bg-red-50 dark:bg-red-500/10 w-fit px-2 py-0.5 rounded-full">
            <ArrowDownRight className="mr-1 h-3 w-3" />
            -4.1% from last month
          </div>
        </CardContent>
      </Card>
    </>
  );
}
