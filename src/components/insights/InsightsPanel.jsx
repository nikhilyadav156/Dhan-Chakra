import React, { useMemo } from 'react';
import { useFinance } from '../../context/FinanceContext';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Lightbulb, TrendingDown, TrendingUp, AlertCircle } from 'lucide-react';
import { subMonths, isAfter, startOfMonth } from 'date-fns';

export function InsightsPanel() {
  const { transactions, formatCurrency } = useFinance();

  const insights = useMemo(() => {
    if (!transactions.length) return [];
    
    // Simulate realistic finding for the prompt requirement:
    // Automatically highlights the spending delta per category and builds a smart message

    const now = new Date();
    const currentMonthStart = startOfMonth(now);
    const lastMonthStart = subMonths(currentMonthStart, 1);
    
    let currentMonthSpend = 0;
    let lastMonthSpend = 0;
    const categorySpend = {};
    const categorySpendLastMonth = {};

    transactions.forEach(t => {
      if (t.type === 'expense') {
        const txDate = new Date(t.date);
        if (isAfter(txDate, currentMonthStart)) {
          currentMonthSpend += t.amount;
          categorySpend[t.category] = (categorySpend[t.category] || 0) + t.amount;
        } else if (isAfter(txDate, lastMonthStart)) {
          lastMonthSpend += t.amount;
          categorySpendLastMonth[t.category] = (categorySpendLastMonth[t.category] || 0) + t.amount;
        }
      }
    });

    const highestCategory = Object.entries(categorySpend).sort((a,b) => b[1] - a[1])[0];
    
    const result = [];
    
    // Custom smart insight message based on user specifications
    if (highestCategory && categorySpendLastMonth[highestCategory[0]]) {
       const currentCatSpend = highestCategory[1];
       const lastCatSpend = categorySpendLastMonth[highestCategory[0]];
       const diffCat = ((currentCatSpend - lastCatSpend) / lastCatSpend) * 100;
       if (diffCat > 0) {
         result.push({
           icon: <AlertCircle className="h-5 w-5 text-orange-500" />,
           title: "Category Alert",
           desc: `You spent ${diffCat.toFixed(0)}% more on ${highestCategory[0]} this month.`,
           highlight: true
         });
       }
    }

    if (highestCategory) {
      result.push({
        icon: <Lightbulb className="h-5 w-5 text-[var(--color-fin-cyan)]" />,
        title: "Highest Spending",
        desc: `Most of your budget recently went to ${highestCategory[0]} (${formatCurrency(highestCategory[1])}).`
      });
    }

    if (currentMonthSpend > 0 && lastMonthSpend > 0) {
      const diff = ((currentMonthSpend - lastMonthSpend) / lastMonthSpend) * 100;
      if (diff > 0) {
        result.push({
          icon: <TrendingUp className="h-5 w-5 text-[var(--color-fin-red)]" />,
          title: "Spending Increase",
          desc: `Total spending increased by ${diff.toFixed(1)}% compared to last month.`
        });
      } else {
        result.push({
          icon: <TrendingDown className="h-5 w-5 text-emerald-500 dark:text-emerald-400" />,
          title: "Spending Decrease",
          desc: `Great! Your spending dropped by ${Math.abs(diff).toFixed(1)}% vs last month.`
        });
      }
    }

    return result;
  }, [transactions, formatCurrency]);

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>Smart Insights</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 flex-1">
        {insights.length === 0 ? (
          <p className="text-sm text-slate-500">Not enough data for insights.</p>
        ) : (
          insights.map((ins, i) => (
            <div 
              key={i} 
              className={`flex items-start gap-4 rounded-xl p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${ins.highlight ? 'bg-orange-500/10 border border-orange-500/20 dark:bg-orange-500/10' : 'bg-slate-50 border border-slate-100 dark:bg-slate-800/40 dark:border-slate-700/40 shadow-sm'}`}
            >
              <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full shadow-sm border ${ins.highlight ? 'bg-orange-500/20 border-orange-500/30' : 'bg-white border-slate-100 dark:bg-[#0F172A] dark:border-slate-700'}`}>
                {ins.icon}
              </div>
              <div className="flex-1">
                <h4 className={`text-sm font-semibold tracking-wide ${ins.highlight ? 'text-orange-700 dark:text-orange-400' : 'text-slate-900 dark:text-slate-100'}`}>
                  {ins.title}
                </h4>
                <p className={`text-sm mt-1 leading-relaxed ${ins.highlight ? 'text-orange-600/90 dark:text-orange-300/90' : 'text-slate-600 dark:text-[var(--color-fin-muted)]'}`}>
                  {ins.desc}
                </p>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
