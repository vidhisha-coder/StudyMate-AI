import React from 'react';
import { Search, Bell } from 'lucide-react';

export default function Topbar({ user }) {
  return (
    <header className="w-full flex items-center justify-between py-4 px-6 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md border-b border-slate-200/60 dark:border-slate-800">
      <div className="flex items-center gap-3 w-72 bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-full">
        <Search className="w-4 h-4 text-slate-400" />
        <input 
          type="text" 
          placeholder="Search workspace..." 
          className="bg-transparent border-none outline-none text-sm w-full text-slate-800 dark:text-slate-200 placeholder-slate-400"
        />
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 transition-colors">
          <Bell className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-3 border-l pl-4 border-slate-200 dark:border-slate-800">
          <div className="w-9 h-9 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-sm">
            {user ? user.charAt(0).toUpperCase() : "R"}
          </div>
          <span className="text-sm font-bold text-slate-800 dark:text-slate-200 hidden sm:inline">{user || "Rudra"}</span>
        </div>
      </div>
    </header>
  );
}