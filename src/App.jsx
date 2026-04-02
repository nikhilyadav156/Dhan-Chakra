import React, { useState } from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { FinanceProvider } from './context/FinanceContext';
import { SummaryCards } from './components/dashboard/SummaryCards';
import { BalanceChart } from './components/dashboard/BalanceChart';
import { ExpenseChart } from './components/dashboard/ExpenseChart';
import { InsightsPanel } from './components/insights/InsightsPanel';
import { TransactionList } from './components/transactions/TransactionList';

function DashboardLayout() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="flex h-screen w-full bg-slate-50 dark:bg-[#09090b] font-sans selection:bg-emerald-500/30">
      {/* Background gradients for aesthetic */}
      <div className="fixed inset-0 pointer-events-none transition-opacity duration-1000">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-emerald-500/15 blur-[120px] dark:bg-emerald-500/10 animate-pulse duration-[8000ms]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-cyan-500/15 blur-[120px] dark:bg-cyan-500/10 animate-pulse duration-[10000ms]" />
      </div>

      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} className="w-64 hidden md:flex relative z-10 hover:shadow-2xl transition-shadow" />
      <div className="flex flex-1 flex-col overflow-hidden relative z-10">
        <Header />
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="mx-auto max-w-[1200px] space-y-6">
            
            {activeTab === 'dashboard' && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
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
              <div className="pb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <TransactionList />
              </div>
            )}

            {activeTab === 'insights' && (
              <div className="pb-8 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
                <InsightsPanel />
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="flex items-center justify-center h-64 border-2 border-dashed border-emerald-200 dark:border-white/10 rounded-3xl animate-in fade-in duration-500 bg-white/30 dark:bg-white/5 backdrop-blur-md">
                <p className="text-slate-500 tracking-wider text-sm font-medium">SETTINGS_MODULE_INACTIVE</p>
              </div>
            )}
            
          </div>
        </main>
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
