import React from 'react';
import { motion } from 'framer-motion';
import { Search, Sparkles, Command } from 'lucide-react';

export default function DashboardHeader({ user }) {
  return (
    <motion.div 
      variants={{ hidden: { opacity: 0, y: -20 }, show: { opacity: 1, y: 0 } }}
      className="relative bg-white/40 backdrop-blur-xl border border-slate-200/60 p-8 rounded-[32px] shadow-sm shadow-slate-100/50 flex flex-col md:flex-row md:items-center md:justify-between gap-6 overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

      <div className="space-y-1.5 relative z-10">
        <h1 className="text-4xl lg:text-[48px] font-black text-slate-900 tracking-tight leading-none">
          Good Afternoon, {user}
        </h1>
        <p className="text-[15px] font-medium text-slate-500 tracking-tight">
          Ready to build your smartest semester?
        </p>
      </div>

      {/* Luxury Search Mechanism Component */}
      <div className="relative w-full md:w-96 relative z-10">
        <div className="relative flex items-center">
          <Search size={18} className="absolute left-4 text-slate-400 pointer-events-none" />
          <input 
            type="text" 
            placeholder="Ask AI or search modules..." 
            className="w-full bg-white/70 border border-slate-200 hover:border-slate-300 focus:border-indigo-600 focus:bg-white text-[15px] font-medium pl-11 pr-20 py-3.5 rounded-full transition-all shadow-inner focus:outline-none placeholder-slate-400 text-slate-900"
          />
          <div className="absolute right-3 flex items-center gap-1.5 bg-slate-100/80 px-2.5 py-1 rounded-full border border-slate-200 text-slate-400 text-[11px] font-bold">
            <Command size={10} /> K
          </div>
        </div>
      </div>
    </motion.div>
  );
}