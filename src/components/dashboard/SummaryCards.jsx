import React, { useMemo } from 'react';
import { useFinance } from '../../context/FinanceContext';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Wallet, TrendingUp, TrendingDown } from 'lucide-react';

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
          <CardTitle className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Balance</CardTitle>
          <Wallet className="h-4 w-4 text-slate-500" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">{formatCurrency(balance)}</div>
          <p className="text-xs text-slate-500 mt-1">Available in all accounts</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Income</CardTitle>
          <TrendingUp className="h-4 w-4 text-emerald-500" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">{formatCurrency(income)}</div>
          <p className="text-xs text-slate-500 mt-1">Across all transactions</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Expenses</CardTitle>
          <TrendingDown className="h-4 w-4 text-red-500" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">{formatCurrency(expenses)}</div>
          <p className="text-xs text-slate-500 mt-1">Across all transactions</p>
        </CardContent>
      </Card>
    </>
  );
}
