import React, { useMemo } from 'react';
import { useFinance } from '../../context/FinanceContext';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const COLORS = ['#10B981', '#22D3EE', '#3B82F6', '#8B5CF6', '#F59E0B', '#F43F5E', '#64748B'];

export function ExpenseChart() {
  const { transactions, formatCurrency } = useFinance();

  const data = useMemo(() => {
    const expenses = transactions.filter(t => t.type === 'expense');
    const grouped = expenses.reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});
    
    return Object.entries(grouped)
      .map(([name, value]) => ({ name, value }))
      .sort((a,b) => b.value - a.value);
  }, [transactions]);

  if (data.length === 0) {
    return (
      <Card className="min-h-[350px]">
        <CardHeader><CardTitle>Spending by Category</CardTitle></CardHeader>
        <CardContent className="flex h-[280px] items-center justify-center text-slate-500">
          No expenses found.
        </CardContent>
      </Card>
    );
  }

  const CustomTooltipInner = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/90 dark:bg-[var(--color-fin-card)]/90 border border-slate-200 dark:border-slate-700/50 px-4 py-3 rounded-xl shadow-lg backdrop-blur-md flex items-center gap-3">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: payload[0].payload.fill }} />
          <span className="font-medium text-slate-700 dark:text-slate-300">{payload[0].name}:</span>
          <span className="font-bold ml-1 text-slate-900 dark:text-slate-100">{formatCurrency(payload[0].value)}</span>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="min-h-[350px] flex flex-col">
      <CardHeader>
        <CardTitle>Spending Summary</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 h-[280px] pt-4">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              innerRadius={70}
              outerRadius={105}
              paddingAngle={3}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltipInner />} cursor={false} />
            <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '12px', marginTop: '14px', opacity: 0.8 }} />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
