import React, { useMemo } from 'react';
import { useFinance } from '../../context/FinanceContext';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function BalanceChart() {
  const { transactions, formatCurrency, theme } = useFinance();

  const data = useMemo(() => {
    const grouped = transactions.reduce((acc, t) => {
      const date = t.date.split('-').slice(1).join('/'); // MM/DD
      if (!acc[date]) acc[date] = { date, income: 0, expense: 0 };
      acc[date][t.type] += t.amount;
      return acc;
    }, {});
    
    return Object.values(grouped).sort((a,b) => a.date.localeCompare(b.date)).slice(-10);
  }, [transactions]);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/95 dark:bg-[#111827]/95 border border-slate-200 dark:border-slate-700/50 p-4 rounded-xl shadow-xl backdrop-blur-md">
          <p className="text-slate-500 dark:text-slate-400 text-xs font-bold tracking-wider uppercase mb-2">{label}</p>
          {payload.map((entry, index) => (
            <div key={index} className="flex gap-3 items-center text-sm py-0.5">
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: entry.color || (entry.name === 'income' ? '#10B981' : '#EF4444') }} />
              <span className="font-medium text-slate-700 dark:text-slate-300 capitalize">{entry.name}:</span>
              <span className="font-bold ml-auto text-slate-900 dark:text-slate-100">{formatCurrency(entry.value)}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="min-h-[350px]">
      <CardHeader className="border-b border-transparent pb-2">
        <CardTitle>Net Cash Flow</CardTitle>
      </CardHeader>
      <CardContent className="h-[280px] w-full pt-4">
        {data.length === 0 ? (
           <div className="flex h-full w-full items-center justify-center text-slate-400">Not enough data</div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={theme === 'dark' ? '#1e293b' : '#e2e8f0'} />
              <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={12} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} tickFormatter={(val) => formatCurrency(val)} width={80} />
              <Tooltip content={<CustomTooltip />} cursor={{fill: theme === 'dark' ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)'}} />
              <Bar dataKey="income" fill="#10B981" radius={[4, 4, 0, 0]} maxBarSize={28} />
              <Bar dataKey="expense" fill="#EF4444" radius={[4, 4, 0, 0]} maxBarSize={28} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
