import React, { useMemo } from 'react';
import { useFinance } from '../../context/FinanceContext';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function BalanceChart() {
  const { transactions, formatCurrency, theme } = useFinance();

  const data = useMemo(() => {
    // Group transactions by date
    const grouped = transactions.reduce((acc, t) => {
      const date = t.date.split('-').slice(1).join('/'); // MM/DD format
      if (!acc[date]) acc[date] = { date, income: 0, expense: 0 };
      acc[date][t.type] += t.amount;
      return acc;
    }, {});
    
    // Sort chronologically and take latest
    return Object.values(grouped).sort((a,b) => a.date.localeCompare(b.date)).slice(-10);
  }, [transactions]);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/90 dark:bg-slate-950/90 border border-slate-200 dark:border-slate-800 p-3 rounded-xl shadow-lg backdrop-blur-sm">
          <p className="text-slate-500 dark:text-slate-400 text-xs mb-1 font-medium">{label}</p>
          {payload.map((entry, index) => (
            <div key={index} className="flex gap-2 items-center text-sm">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
              <span className="font-medium text-slate-900 dark:text-slate-50 capitalize">{entry.name}:</span>
              <span className="font-bold ml-auto">{formatCurrency(entry.value)}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="min-h-[350px]">
      <CardHeader>
        <CardTitle>Cash Flow (Last 10 entries)</CardTitle>
      </CardHeader>
      <CardContent className="pl-0 h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={theme === 'dark' ? '#334155' : '#e2e8f0'} opacity={0.5} />
            <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} tickFormatter={(val) => formatCurrency(val)} width={80} />
            <Tooltip content={<CustomTooltip />} cursor={{fill: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)'}} />
            <Bar dataKey="income" fill="#10b981" radius={[4, 4, 0, 0]} maxBarSize={40} />
            <Bar dataKey="expense" fill="#ef4444" radius={[4, 4, 0, 0]} maxBarSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
