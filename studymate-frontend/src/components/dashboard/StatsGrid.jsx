import React from 'react';
import { motion } from 'framer-motion';
import { FileCode, Clock, ShieldCheck, Flame } from 'lucide-react';

const iconsMap = {
  files: <FileCode size={16} className="text-indigo-600" />,
  hours: <Clock size={16} className="text-indigo-600" />,
  credits: <ShieldCheck size={16} className="text-indigo-600" />,
  streak: <Flame size={16} className="text-indigo-600" />
};

export default function StatsGrid({ stats }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, i) => (
        <motion.div
          key={i}
          variants={{ hidden: { opacity: 0, y: 15 }, show: { opacity: 1, y: 0 } }}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
          className="bg-white/80 backdrop-blur-md border border-slate-200/70 p-6 rounded-[28px] shadow-[0_10px_30px_-15px_rgba(148,163,184,0.12)] relative overflow-hidden transition-all duration-300 group cursor-pointer hover:border-indigo-500/30"
        >
          <div className="flex justify-between items-center">
            <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400/90">{stat.label}</span>
            <div className="w-7 h-7 rounded-lg bg-slate-50 flex items-center justify-center border border-slate-100 group-hover:bg-indigo-50 group-hover:border-indigo-100 transition-colors">
              {iconsMap[stat.type]}
            </div>
          </div>

          <div className="mt-4 flex items-baseline justify-between">
            <h3 className="text-3xl font-black text-slate-900 tracking-tight">{stat.value}</h3>
            <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md ${
              stat.trendType === 'up' 
                ? 'text-indigo-600 bg-indigo-50/70 border border-indigo-100/50' 
                : 'text-slate-500 bg-slate-50 border border-slate-100'
            }`}>
              {stat.trend}
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}