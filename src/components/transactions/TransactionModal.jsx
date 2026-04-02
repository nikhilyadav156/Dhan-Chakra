import React, { useState, useEffect } from 'react';
import { useFinance } from '../../context/FinanceContext';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { X } from 'lucide-react';
import { expenseCategories, incomeCategories } from '../../data/mockData';

export function TransactionModal({ isOpen, onClose, transactionToEdit }) {
  const { addTransaction, updateTransaction } = useFinance();
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    type: 'expense',
    category: expenseCategories[0],
    date: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    if (transactionToEdit) {
      setFormData({
        ...transactionToEdit,
        amount: String(transactionToEdit.amount)
      });
    } else {
      setFormData({
        description: '',
        amount: '',
        type: 'expense',
        category: expenseCategories[0],
        date: new Date().toISOString().split('T')[0]
      });
    }
  }, [transactionToEdit, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      amount: parseFloat(formData.amount) || 0
    };

    if (transactionToEdit) {
      updateTransaction(transactionToEdit.id, payload);
    } else {
      addTransaction(payload);
    }
    onClose();
  };

  if (!isOpen) return null;

  const categories = formData.type === 'expense' ? expenseCategories : incomeCategories;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg dark:bg-slate-950 border dark:border-slate-800">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">{transactionToEdit ? 'Edit Transaction' : 'Add Transaction'}</h2>
          <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
            <X className="h-5 w-5" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-1.5 block text-slate-700 dark:text-slate-300">Type</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input type="radio" checked={formData.type === 'expense'} onChange={() => setFormData(p => ({ ...p, type: 'expense', category: expenseCategories[0] }))} className="accent-slate-900 dark:accent-slate-50" /> Expense
              </label>
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input type="radio" checked={formData.type === 'income'} onChange={() => setFormData(p => ({ ...p, type: 'income', category: incomeCategories[0] }))} className="accent-slate-900 dark:accent-slate-50" /> Income
              </label>
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium mb-1.5 block text-slate-700 dark:text-slate-300">Description</label>
            <Input required value={formData.description} onChange={e => setFormData(p => ({...p, description: e.target.value}))} placeholder="e.g. Groceries" />
          </div>

          <div>
            <label className="text-sm font-medium mb-1.5 block text-slate-700 dark:text-slate-300">Amount</label>
            <Input required type="number" step="0.01" min="0" value={formData.amount} onChange={e => setFormData(p => ({...p, amount: e.target.value}))} placeholder="0.00" />
          </div>

          <div>
            <label className="text-sm font-medium mb-1.5 block text-slate-700 dark:text-slate-300">Category</label>
            <select 
              value={formData.category} 
              onChange={e => setFormData(p => ({...p, category: e.target.value}))}
              className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 dark:border-slate-800 dark:bg-slate-950"
            >
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium mb-1.5 block text-slate-700 dark:text-slate-300">Date</label>
            <Input required type="date" value={formData.date} onChange={e => setFormData(p => ({...p, date: e.target.value}))} />
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit">Save</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
