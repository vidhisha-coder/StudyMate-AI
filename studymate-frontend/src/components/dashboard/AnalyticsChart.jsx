import React from 'react';
import { motion } from 'framer-motion';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const chartData = [
  { name: 'Mon', hours: 2.4 },
  { name: 'Tue', hours: 4.8 },
  { name: 'Wed', hours: 3.2 },
  { name: 'Thu', hours: 5.5 },
  { name: 'Fri', hours: 1.8 },
  { name: 'Sat', hours: 4.0 },
  { name: 'Sun', hours: 2.8 },
];

export default function AnalyticsChart() {
  return (
    <motion.div 
      variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
      className="bg-white border border-slate-200/60 p-6 lg:p-8 rounded-[32px] shadow-sm relative overflow-hidden flex flex-col h-[400px]"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-[26px] font-bold tracking-tight text-slate-900">Study Analytics</h2>
          <p className="text-[12px] font-semibold tracking-wider text-slate-400 uppercase mt-0.5">Metrics over last 7 Days</p>
        </div>
        <div className="flex items-center gap-2 bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-full text-xs font-bold text-slate-600">
          <span className="w-2 h-2 rounded-full bg-indigo-600"></span> Hours Expended
        </div>
      </div>

      <div className="flex-1 w-full text-[12px] font-medium text-slate-400">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
            <defs>
              <linearGradient id="premiumGlow" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.12}/>
                <stop offset="95%" stopColor="#4F46E5" stopOpacity={0.0}/>
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke="#F1F5F9" />
            <XAxis dataKey="name" stroke="#94A3B8" axisLine={false} tickLine={false} />
            <YAxis stroke="#94A3B8" axisLine={false} tickLine={false} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#ffffff', borderRadius: '16px', border: '1px solid #E2E8F0', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.03)' }} 
              labelStyle={{ fontWeight: 'bold', color: '#0F172A' }}
            />
            <Area 
              type="monotone" 
              dataKey="hours" 
              stroke="#4F46E5" 
              strokeWidth={2.5} 
              fillOpacity={1} 
              fill="url(#premiumGlow)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}