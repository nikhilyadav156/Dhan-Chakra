import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { mockTransactions } from '../data/mockData';

const FinanceContext = createContext();

export const useFinance = () => {
  const context = useContext(FinanceContext);
  if (!context) {
    throw new Error("useFinance must be used within a FinanceProvider");
  }
  return context;
};

export const FinanceProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('fin_transactions');
    return saved ? JSON.parse(saved) : mockTransactions;
  });

  const [role, setRole] = useState('Viewer'); // 'Viewer' or 'Admin'
  
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('theme');
      if (stored) return stored;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });

  // Keep track of user's Currency ('USD' or 'INR')
  const [currency, setCurrency] = useState(() => {
    return localStorage.getItem('fin_currency') || 'USD';
  });

  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem('fin_profile');
    return saved ? JSON.parse(saved) : {
      name: 'Nikhil Yadav',
      email: 'nikhil@example.com',
      phone: '+91 98765 43210'
    };
  });

  useEffect(() => {
    localStorage.setItem('fin_transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('fin_currency', currency);
  }, [currency]);

  useEffect(() => {
    localStorage.setItem('fin_profile', JSON.stringify(profile));
  }, [profile]);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');
  const toggleRole = () => setRole(prev => prev === 'Viewer' ? 'Admin' : 'Viewer');
  const toggleCurrency = () => setCurrency(prev => prev === 'USD' ? 'INR' : 'USD');
  const updateProfile = (newProfile) => setProfile(newProfile);

  const addTransaction = (t) => {
    if (role !== 'Admin') return;
    setTransactions(prev => [{ ...t, id: Date.now().toString() }, ...prev]);
  };

  const updateTransaction = (id, updatedData) => {
    if (role !== 'Admin') return;
    setTransactions(prev => prev.map(t => t.id === id ? { ...t, ...updatedData } : t));
  };

  const deleteTransaction = (id) => {
    if (role !== 'Admin') return;
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  const formatCurrency = useCallback((amount) => {
    // 1 USD = 93 INR exchange rate assumption
    if (currency === 'INR') {
      const converted = amount * 93;
      return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(converted);
    }
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(amount);
  }, [currency]);

  return (
    <FinanceContext.Provider value={{
      transactions,
      role,
      theme,
      currency,
      profile,
      toggleTheme,
      toggleRole,
      toggleCurrency,
      updateProfile,
      formatCurrency,
      addTransaction,
      updateTransaction,
      deleteTransaction
    }}>
      {children}
    </FinanceContext.Provider>
  );
};
