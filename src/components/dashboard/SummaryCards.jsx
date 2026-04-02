import React, { useMemo } from 'react';
import { useFinance } from '../../context/FinanceContext';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Wallet, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';

const dummyBalance = [{v:40},{v:30},{v:45},{v:50},{v:42},{v:60},{v:65},{v:58},{v:70}];
const dummyIncome = [{v:10},{v:15},{v:12},{v:25},{v:18},{v:30},{v:28},{v:40},{v:35}];
const dummyExpense = [{v:20},{v:25},{v:22},{v:30},{v:28},{v:15},{v:18},{v:12},{v:10}];

function Sparkline({ data, color, id }) {
  return (
    <div className="h-10 w-24 opacity-80 mt-1">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.4}/>
              <stop offset="95%" stopColor={color} stopOpacity={0}/>
            </linearGradient>
          </defs>
          <Area type="monotone" dataKey="v" stroke={color} fillOpacity={1} fill={`url(#${id})`} strokeWidth={2} isAnimationActive={false} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

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
          <div className="h-8 w-8 rounded-lg bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center">
            <Wallet className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">{formatCurrency(balance)}</div>
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center text-xs font-semibold text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 w-fit px-2.5 py-1 rounded-md border border-emerald-100 dark:border-emerald-500/20 shadow-sm">
              <ArrowUpRight className="mr-1 h-3 w-3" />
              +2.5%
            </div>
            <Sparkline data={dummyBalance} color="#3B82F6" id="balSpark" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-slate-500 dark:text-[var(--color-fin-muted)]">Monthly Income</CardTitle>
          <div className="h-8 w-8 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center">
            <TrendingUp className="h-4 w-4 text-emerald-500" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">{formatCurrency(income)}</div>
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center text-xs font-semibold text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 w-fit px-2.5 py-1 rounded-md border border-emerald-100 dark:border-emerald-500/20 shadow-sm">
              <ArrowUpRight className="mr-1 h-3 w-3" />
              +12%
            </div>
            <Sparkline data={dummyIncome} color="#10B981" id="incSpark" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-slate-500 dark:text-[var(--color-fin-muted)]">Monthly Expenses</CardTitle>
          <div className="h-8 w-8 rounded-lg bg-red-50 dark:bg-red-500/10 flex items-center justify-center">
            <TrendingDown className="h-4 w-4 text-red-500" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">{formatCurrency(expenses)}</div>
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center text-xs font-semibold text-red-600 bg-red-50 dark:bg-red-500/10 w-fit px-2.5 py-1 rounded-md border border-red-100 dark:border-red-500/20 shadow-sm">
              <ArrowDownRight className="mr-1 h-3 w-3" />
              -4.1%
            </div>
            <Sparkline data={dummyExpense} color="#EF4444" id="expSpark" />
          </div>
        </CardContent>
      </Card>
    </>
  );
}
