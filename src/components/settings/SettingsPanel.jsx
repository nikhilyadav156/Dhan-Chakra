import React, { useState } from 'react';
import { useFinance } from '../../context/FinanceContext';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { User, Mail, Phone, Shield, Moon, Banknote, Save } from 'lucide-react';

export function SettingsPanel() {
  const { profile, updateProfile, theme, toggleTheme, currency, toggleCurrency, role, toggleRole } = useFinance();
  const [formData, setFormData] = useState(profile);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    updateProfile(formData);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-6">
      
      {/* Profile Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Profile Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSave} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2"><User className="w-4 h-4 text-blue-500" /> Full Name</label>
                <Input value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2"><Mail className="w-4 h-4 text-blue-500" /> Email Address</label>
                <Input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required />
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2"><Phone className="w-4 h-4 text-blue-500" /> Phone Number</label>
                <Input value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
              </div>
            </div>
            <div className="pt-2 flex justify-end">
              <Button type="submit" className="gap-2 min-w-[140px] shadow-sm">
                {isSaved ? "Saved Successfully" : <><Save className="w-4 h-4" /> Save Profile</>}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Preferences Section */}
      <Card>
        <CardHeader>
          <CardTitle>App Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-0 divide-y divide-slate-100 dark:divide-slate-800/60">
           
           {/* Theme Toggle */}
           <div className="flex items-center justify-between py-5">
             <div>
               <h4 className="font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2"><Moon className="w-4 h-4 text-indigo-500" /> Dark Mode</h4>
               <p className="text-sm text-slate-500 mt-1 max-w-[200px] sm:max-w-none">Toggle between light and dark themes</p>
             </div>
             <button onClick={toggleTheme} className={`w-12 h-6 rounded-full transition-colors relative flex items-center shrink-0 ${theme === 'dark' ? 'bg-blue-600' : 'bg-slate-300'}`}>
                <div className={`w-4 h-4 rounded-full bg-white absolute transition-transform ${theme === 'dark' ? 'translate-x-7' : 'translate-x-1'}`} />
             </button>
           </div>
           
           {/* Currency */}
           <div className="flex items-center justify-between py-5">
             <div>
               <h4 className="font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2"><Banknote className="w-4 h-4 text-emerald-500" /> Display Currency</h4>
               <p className="text-sm text-slate-500 mt-1 max-w-[200px] sm:max-w-none">Convert analytics into local currency</p>
             </div>
             <div className="flex bg-slate-100 dark:bg-slate-800 rounded-lg p-1 shrink-0">
               <button onClick={() => currency !== 'USD' && toggleCurrency()} className={`px-4 py-1.5 rounded-md text-sm font-semibold transition-all ${currency === 'USD' ? 'bg-white text-slate-900 shadow-sm dark:bg-slate-950 dark:text-white' : 'text-slate-500'}`}>USD</button>
               <button onClick={() => currency !== 'INR' && toggleCurrency()} className={`px-4 py-1.5 rounded-md text-sm font-semibold transition-all ${currency === 'INR' ? 'bg-white text-slate-900 shadow-sm dark:bg-slate-950 dark:text-white' : 'text-slate-500'}`}>INR</button>
             </div>
           </div>

           {/* Role */}
           <div className="flex items-center justify-between py-5">
             <div>
               <h4 className="font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2"><Shield className="w-4 h-4 text-red-500" /> Account Role</h4>
               <p className="text-sm text-slate-500 mt-1 max-w-[200px] sm:max-w-none">Toggle admin capabilities for records</p>
             </div>
             <Button variant={role === 'Admin' ? 'default' : 'outline'} size="sm" onClick={toggleRole} className="shrink-0">
                {role === 'Admin' ? 'Admin Active' : 'Viewer Mode'}
             </Button>
           </div>

        </CardContent>
      </Card>
    </div>
  );
}
