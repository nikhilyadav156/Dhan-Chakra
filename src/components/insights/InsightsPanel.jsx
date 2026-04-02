import React, { useMemo } from 'react';
import { useFinance } from '../../context/FinanceContext';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Lightbulb, TrendingDown, TrendingUp, AlertCircle } from 'lucide-react';
import { subMonths, isAfter, startOfMonth } from 'date-fns';

export function InsightsPanel() {
  const { transactions, formatCurrency } = useFinance();

  const { insights, topCategories } = useMemo(() => {
    if (!transactions.length) return { insights: [], topCategories: { list: [], total: 0 } };
    
    const now = new Date();
    const currentMonthStart = startOfMonth(now);
    const lastMonthStart = subMonths(currentMonthStart, 1);
    
    let currentMonthSpend = 0;
    let lastMonthSpend = 0;
    const categorySpend = {};
    const categorySpendLastMonth = {};
    let totalExpenses = 0;

    transactions.forEach(t => {
      if (t.type === 'expense') {
        totalExpenses += t.amount;
        const txDate = new Date(t.date);
        
        categorySpend[t.category] = (categorySpend[t.category] || 0) + t.amount;

        if (isAfter(txDate, currentMonthStart)) {
          currentMonthSpend += t.amount;
        } else if (isAfter(txDate, lastMonthStart)) {
          lastMonthSpend += t.amount;
          categorySpendLastMonth[t.category] = (categorySpendLastMonth[t.category] || 0) + t.amount;
        }
      }
    });

    const sortedCategories = Object.entries(categorySpend)
         .sort((a,b) => b[1] - a[1])
         .map(([name, amount]) => ({ name, amount }));
    
    const highestCategory = sortedCategories[0];
    const top3 = sortedCategories.slice(0, 3);
    
    const result = [];
    
    if (highestCategory && categorySpendLastMonth[highestCategory.name]) {
       const currentCatSpend = highestCategory.amount;
       const lastCatSpend = categorySpendLastMonth[highestCategory.name];
       const diffCat = ((currentCatSpend - lastCatSpend) / lastCatSpend) * 100;
       if (diffCat > 0) {
         result.push({
           icon: <AlertCircle className="h-5 w-5 text-orange-500" />,
           title: "Category Alert",
           desc: `You spent ${diffCat.toFixed(0)}% more on ${highestCategory.name} this month.`,
           highlight: true
         });
       }
    }

    if (highestCategory) {
      result.push({
        icon: <Lightbulb className="h-5 w-5 text-[var(--color-fin-cyan)]" />,
        title: "Highest Spending",
        desc: `Most of your budget recently went to ${highestCategory.name} (${formatCurrency(highestCategory.amount)}).`
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
          icon: <TrendingDown className="h-5 w-5 text-[var(--color-fin-emerald)]" />,
          title: "Spending Decrease",
          desc: `Great! Your spending dropped by ${Math.abs(diff).toFixed(1)}% vs last month.`
        });
      }
    }

    return { insights: result, topCategories: { list: top3, total: totalExpenses } };
  }, [transactions, formatCurrency]);

  const COLORS = ['bg-blue-500', 'bg-cyan-500', 'bg-emerald-500'];

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>Smart Insights</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 flex-1 pb-6">
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

        {topCategories.list && topCategories.list.length > 0 && (
           <div className="rounded-xl p-5 bg-white border border-slate-100 dark:bg-slate-800/20 dark:border-slate-700/40 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.03)] mt-6">
             <div className="flex items-center gap-2 mb-5">
                <Lightbulb className="w-4 h-4 text-amber-500" />
                <h4 className="text-xs font-bold tracking-wider text-slate-500 dark:text-slate-400 uppercase">Top Expense Burn</h4>
             </div>
             <div className="space-y-4">
               {topCategories.list.map((cat, i) => {
                 const percentage = ((cat.amount / topCategories.total) * 100).toFixed(0);
                 return (
                   <div key={i} className="group">
                     <div className="flex justify-between text-xs mb-1.5">
                       <span className="font-medium text-slate-700 dark:text-slate-300">{cat.name}</span>
                       <span className="font-bold text-slate-900 dark:text-slate-100">
                          {formatCurrency(cat.amount)} <span className="text-slate-400 font-medium ml-1">({percentage}%)</span>
                       </span>
                     </div>
                     <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2.5 overflow-hidden shadow-inner">
                       <div className={`${COLORS[i % COLORS.length]} h-2.5 rounded-full transition-all duration-1000 ease-out group-hover:opacity-80`} style={{ width: `${percentage}%` }}></div>
                     </div>
                   </div>
                 );
               })}
             </div>
           </div>
        )}
      </CardContent>
    </Card>
  );
}
