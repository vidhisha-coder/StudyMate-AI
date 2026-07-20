import React from 'react';
import { motion } from 'framer-motion';

export default function ActivityTimeline({ activities }) {
  return (
    <motion.div 
      variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
      className="bg-white border border-slate-200/60 p-6 rounded-[32px] shadow-sm h-full flex flex-col"
    >
      <div className="mb-6">
        <h2 className="text-[26px] font-bold tracking-tight text-slate-900">Activity Engine Log</h2>
        <p className="text-[12px] font-semibold text-slate-400 tracking-wider uppercase mt-0.5">Real-time sync telemetry</p>
      </div>

      <div className="flex-1 relative pl-6 space-y-6 before:absolute before:left-[7px] before:top-2 before:bottom-2 before:w-[1.5px] before:bg-slate-100">
        {activities.map((act, i) => (
          <div key={i} className="relative flex items-start justify-between gap-4 group">
            {/* Minimalist Timeline Bullet Node Indicator */}
            <div className="absolute left-[-23px] top-1.5 w-[13px] h-[13px] rounded-full bg-white border-2 border-slate-300 group-hover:border-indigo-600 transition-colors z-10 flex items-center justify-center">
              <div className="w-1 h-1 bg-white group-hover:bg-indigo-600 rounded-full transition-colors" />
            </div>

            <div className="space-y-0.5">
              <h4 className="text-[15px] font-bold text-slate-800 tracking-tight group-hover:text-indigo-600 transition-colors">
                {act.title}
              </h4>
              <p className="text-[12px] font-medium text-slate-400">{act.time}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}