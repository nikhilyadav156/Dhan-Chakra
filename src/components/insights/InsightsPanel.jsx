import React, { useMemo } from 'react';
import { useFinance } from '../../context/FinanceContext';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Lightbulb, TrendingDown, TrendingUp } from 'lucide-react';
import { subMonths, isAfter, startOfMonth } from 'date-fns';

export function InsightsPanel() {
  const { transactions, formatCurrency } = useFinance();

  const insights = useMemo(() => {
    if (!transactions.length) return [];
    
    const now = new Date();
    const currentMonthStart = startOfMonth(now);
    const lastMonthStart = subMonths(currentMonthStart, 1);
    
    let currentMonthSpend = 0;
    let lastMonthSpend = 0;
    const categorySpend = {};

    transactions.forEach(t => {
      if (t.type === 'expense') {
        categorySpend[t.category] = (categorySpend[t.category] || 0) + t.amount;
        const txDate = new Date(t.date);
        if (isAfter(txDate, currentMonthStart)) {
          currentMonthSpend += t.amount;
        } else if (isAfter(txDate, lastMonthStart)) {
          lastMonthSpend += t.amount;
        }
      }
    });

    const highestCategory = Object.entries(categorySpend).sort((a,b) => b[1] - a[1])[0];
    
    const result = [];
    if (highestCategory) {
      result.push({
        icon: <Lightbulb className="h-5 w-5 text-amber-500" />,
        title: "Highest Spending",
        desc: `You spent the most on ${highestCategory[0]} (${formatCurrency(highestCategory[1])}).`
      });
    }

    if (currentMonthSpend > 0 && lastMonthSpend > 0) {
      const diff = ((currentMonthSpend - lastMonthSpend) / lastMonthSpend) * 100;
      if (diff > 0) {
        result.push({
          icon: <TrendingUp className="h-5 w-5 text-red-500" />,
          title: "Spending Increase",
          desc: `Spending increased by ${diff.toFixed(1)}% compared to last month.`
        });
      } else {
        result.push({
          icon: <TrendingDown className="h-5 w-5 text-emerald-500" />,
          title: "Spending Decrease",
          desc: `Great! Your spending dropped by ${Math.abs(diff).toFixed(1)}% vs last month.`
        });
      }
    } else if (currentMonthSpend > 0 && lastMonthSpend === 0) {
        result.push({
          icon: <Lightbulb className="h-5 w-5 text-blue-500" />,
          title: "New Month",
          desc: `You've spent ${formatCurrency(currentMonthSpend)} this month so far.`
        });
    }

    return result;
  }, [transactions, formatCurrency]);

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Key Insights</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {insights.length === 0 ? (
          <p className="text-sm text-slate-500">Not enough data for insights.</p>
        ) : (
          insights.map((ins, i) => (
            <div key={i} className="flex items-start gap-4 rounded-xl bg-white/50 p-4 dark:bg-white/5 border border-slate-100 dark:border-white/10 shadow-sm backdrop-blur transition-all">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white shadow-sm border border-slate-100 dark:bg-black/20 dark:border-white/5">
                {ins.icon}
              </div>
              <div>
                <h4 className="text-sm font-medium text-slate-900 dark:text-slate-50">{ins.title}</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{ins.desc}</p>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
