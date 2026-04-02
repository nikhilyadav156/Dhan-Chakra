import React, { useState } from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { BottomNav } from './components/layout/BottomNav';
import { FinanceProvider } from './context/FinanceContext';
import { SummaryCards } from './components/dashboard/SummaryCards';
import { BalanceChart } from './components/dashboard/BalanceChart';
import { ExpenseChart } from './components/dashboard/ExpenseChart';
import { InsightsPanel } from './components/insights/InsightsPanel';
import { TransactionList } from './components/transactions/TransactionList';
import { SettingsPanel } from './components/settings/SettingsPanel';

function DashboardLayout() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="flex h-screen w-full bg-slate-50 dark:bg-[#0F172A] font-sans selection:bg-blue-500/30 relative">
      
      {/* Premium Light Theme Glass Background Overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-50/70 via-slate-50 to-slate-100/90 dark:hidden" />
      
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} className="w-64 hidden md:flex relative z-10" />
      <div className="flex flex-1 flex-col overflow-hidden relative z-10">
        <Header />
        <main className="flex-1 overflow-y-auto p-4 md:p-8 pb-24 md:pb-8">
          <div className="mx-auto max-w-[1200px] space-y-6">
            
            {activeTab === 'dashboard' && (
              <div className="animate-in fade-in duration-500 space-y-6">
                <div className="grid gap-4 md:grid-cols-3">
                  <SummaryCards />
                </div>
                <div className="grid gap-4 lg:grid-cols-7">
                  <div className="lg:col-span-4">
                     <BalanceChart />
                  </div>
                  <div className="lg:col-span-3">
                     <ExpenseChart />
                  </div>
                </div>
                <div className="grid gap-4 lg:grid-cols-3 lg:items-start pb-8">
                  <div className="lg:col-span-2">
                     <TransactionList />
                  </div>
                  <div className="lg:col-span-1">
                     <InsightsPanel />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'transactions' && (
              <div className="pb-8 animate-in fade-in duration-500">
                <TransactionList />
              </div>
            )}

            {activeTab === 'insights' && (
              <div className="pb-8 max-w-2xl mx-auto animate-in fade-in duration-500">
                <InsightsPanel />
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="animate-in fade-in duration-500">
                <SettingsPanel />
              </div>
            )}
            
          </div>
        </main>
        <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </div>
  );
}

function App() {
  return (
    <FinanceProvider>
      <DashboardLayout />
    </FinanceProvider>
  );
}

export default App;
