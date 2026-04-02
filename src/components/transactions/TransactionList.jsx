import React, { useState, useMemo } from 'react';
import { useFinance } from '../../context/FinanceContext';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Search, Plus, Filter, ArrowUpDown, Lock } from 'lucide-react';
import { TransactionModal } from './TransactionModal';

export function TransactionList() {
  const { transactions, role, formatCurrency } = useFinance();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [sortOrder, setSortOrder] = useState('date-desc');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTx, setEditingTx] = useState(null);

  const filteredAndSorted = useMemo(() => {
    let result = [...transactions];

    if (filterType !== 'all') {
      result = result.filter(t => t.type === filterType);
    }

    if (searchTerm) {
      const lower = searchTerm.toLowerCase();
      result = result.filter(t => 
        t.description.toLowerCase().includes(lower) || 
        t.category.toLowerCase().includes(lower)
      );
    }

    result.sort((a, b) => {
      if (sortOrder === 'date-desc') return new Date(b.date) - new Date(a.date);
      if (sortOrder === 'date-asc') return new Date(a.date) - new Date(b.date);
      if (sortOrder === 'amount-desc') return b.amount - a.amount;
      if (sortOrder === 'amount-asc') return a.amount - b.amount;
      return 0;
    });

    return result;
  }, [transactions, searchTerm, filterType, sortOrder]);

  const handleEdit = (t) => {
    if (role === 'Viewer') return;
    setEditingTx(t);
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setEditingTx(null);
    setIsModalOpen(true);
  };

  return (
    <>
      <Card className="h-full flex flex-col">
        <CardHeader className="flex flex-row items-center justify-between border-b border-slate-100 dark:border-slate-800/60 pb-4">
          <CardTitle>Recent Transactions</CardTitle>
          <div title={role === 'Viewer' ? "Admin access required to add records" : ""}>
            <Button onClick={handleAddNew} size="sm" disabled={role === 'Viewer'} className="gap-1">
              {role === 'Viewer' ? <Lock className="h-3.5 w-3.5 text-white/70" /> : <Plus className="h-4 w-4" />}
              New Record
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-5 flex-1">
          <div className="flex flex-col md:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input 
                placeholder="Search records..." 
                className="pl-9 h-9 bg-slate-50 border-transparent dark:bg-slate-800/50 dark:border-transparent dark:focus-visible:ring-slate-700"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <div className="flex items-center gap-2 px-3 h-9 rounded-lg bg-slate-50 dark:bg-slate-800/50 text-sm border border-transparent">
                <Filter className="h-3.5 w-3.5 text-slate-400" />
                <select 
                  className="bg-transparent border-none focus:ring-0 outline-none text-slate-600 dark:text-slate-300 cursor-pointer min-w-[70px]"
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                >
                  <option value="all">All</option>
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                </select>
              </div>
              <div className="flex items-center gap-2 px-3 h-9 rounded-lg bg-slate-50 dark:bg-slate-800/50 text-sm border border-transparent">
                <ArrowUpDown className="h-3.5 w-3.5 text-slate-400" />
                <select 
                  className="bg-transparent border-none focus:ring-0 outline-none text-slate-600 dark:text-slate-300 cursor-pointer min-w-[90px]"
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                >
                  <option value="date-desc">Newest</option>
                  <option value="date-asc">Oldest</option>
                  <option value="amount-desc">Highest</option>
                  <option value="amount-asc">Lowest</option>
                </select>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800/60">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-500 bg-slate-50 dark:bg-slate-800/30 uppercase tracking-wider font-semibold">
                <tr>
                  <th className="px-5 py-3.5 border-b border-slate-200 dark:border-slate-800/60">Date</th>
                  <th className="px-5 py-3.5 border-b border-slate-200 dark:border-slate-800/60">Description</th>
                  <th className="px-5 py-3.5 border-b border-slate-200 dark:border-slate-800/60">Category</th>
                  <th className="px-5 py-3.5 text-right border-b border-slate-200 dark:border-slate-800/60">Amount</th>
                </tr>
              </thead>
              <tbody>
                {filteredAndSorted.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-10 text-center text-slate-500">
                      No matching records.
                    </td>
                  </tr>
                ) : (
                  filteredAndSorted.map((t) => (
                    <tr 
                      key={t.id} 
                      className={`border-b border-slate-100 dark:border-slate-800/40 last:border-0 transition-colors ${role === 'Admin' ? 'cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/30' : 'opacity-90'}`}
                      onClick={() => handleEdit(t)}
                    >
                      <td className="px-5 py-3.5 whitespace-nowrap text-slate-500 dark:text-[var(--color-fin-muted)]">{t.date}</td>
                      <td className="px-5 py-3.5 font-medium text-slate-900 dark:text-slate-100">{t.description}</td>
                      <td className="px-5 py-3.5">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wide bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                          {t.category}
                        </span>
                      </td>
                      <td className={`px-5 py-3.5 text-right font-medium whitespace-nowrap ${t.type === 'income' ? 'text-emerald-500 dark:text-emerald-400' : 'text-slate-900 dark:text-slate-100'}`}>
                        {t.type === 'income' ? '+' : '-'}{formatCurrency(Math.abs(t.amount))}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <TransactionModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        transactionToEdit={editingTx}
      />
    </>
  );
}
