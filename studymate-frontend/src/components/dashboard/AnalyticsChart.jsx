import React from 'react';
import { motion } from 'framer-motion';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

// Zero-state fallback chart data (jab backend se koi dynamic study hours data na aaye)
const defaultChartData = [
  { name: 'Mon', hours: 0 },
  { name: 'Tue', hours: 0 },
  { name: 'Wed', hours: 0 },
  { name: 'Thu', hours: 0 },
  { name: 'Fri', hours: 0 },
  { name: 'Sat', hours: 0 },
  { name: 'Sun', hours: 0 },
];

export default function AnalyticsChart({ data = defaultChartData, periodLabel = "Weekly Overview" }) {
  const activeData = data && data.length > 0 ? data : defaultChartData;

  return (
    <motion.div 
      variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
      className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 p-6 lg:p-8 rounded-[32px] shadow-sm relative overflow-hidden flex flex-col h-[420px]"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-[26px] font-bold tracking-tight text-slate-900 dark:text-slate-100">Study Analytics</h2>
          {/* Dynamic Period Subheading (Hardcoded 7 Days removed) */}
          <p className="text-[12px] font-semibold tracking-wider text-slate-400 uppercase mt-0.5">
            {periodLabel}
          </p>
        </div>
        <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 px-3 py-1.5 rounded-full text-xs font-bold text-slate-600 dark:text-slate-300">
          <span className="w-2 h-2 rounded-full bg-indigo-600"></span> Hours Expended
        </div>
      </div>

      <div className="flex-1 w-full text-[12px] font-medium text-slate-400 min-h-[260px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={activeData} margin={{ top: 15, right: 15, left: -15, bottom: 25 }}>
            <defs>
              <linearGradient id="premiumGlow" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.25}/>
                <stop offset="95%" stopColor="#4F46E5" stopOpacity={0.0}/>
              </linearGradient>
            </defs>
            
            <CartesianGrid vertical={false} stroke="#F1F5F9" />
            
            <XAxis 
              dataKey="name" 
              stroke="#94A3B8" 
              axisLine={false} 
              tickLine={false} 
              dy={10} 
            />
            
            <YAxis 
              domain={[0, 'dataMax + 1']} 
              stroke="#94A3B8" 
              axisLine={false} 
              tickLine={false} 
              dx={-5}
            />

            <Tooltip 
              contentStyle={{ backgroundColor: '#ffffff', borderRadius: '16px', border: '1px solid #E2E8F0', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)' }} 
              labelStyle={{ fontWeight: 'bold', color: '#0F172A' }}
            />
            
            <Area 
              type="monotone" 
              dataKey="hours" 
              stroke="#4F46E5" 
              strokeWidth={3} 
              fillOpacity={1} 
              fill="url(#premiumGlow)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}