import React from 'react';
import { motion } from 'framer-motion';
import { FileText, MoreHorizontal } from 'lucide-react';

export default function RecentFiles({ files }) {
  return (
    <motion.div 
      variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
      className="bg-white border border-slate-200/60 p-6 rounded-[32px] shadow-sm overflow-hidden h-full flex flex-col justify-between"
    >
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[26px] font-bold tracking-tight text-slate-900">Recent Workspace Assets</h2>
          <span className="text-[12px] font-bold text-indigo-600 hover:underline cursor-pointer tracking-tight">View All Explorer</span>
        </div>

        <div className="border border-slate-100 rounded-[20px] bg-slate-50/40 divide-y divide-slate-200/50 overflow-hidden">
          {files.map((file, i) => (
            <div key={i} className="flex items-center justify-between p-4 bg-white/60 hover:bg-white transition duration-150 group cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="w-9 h-9 bg-slate-50 border border-slate-100 rounded-lg flex items-center justify-center text-slate-400 group-hover:text-indigo-600 group-hover:bg-indigo-50 group-hover:border-indigo-100 transition-all">
                  <FileText size={16} />
                </div>
                <div>
                  <h4 className="text-[15px] font-bold text-slate-800 tracking-tight group-hover:text-indigo-600 transition-colors">{file.name}</h4>
                  <div className="flex items-center gap-2 text-[12px] font-medium text-slate-400 mt-0.5">
                    <span>Edited {file.edited}</span>
                    <span>•</span>
                    <span>{file.size}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-white border border-slate-200 px-2 py-0.5 rounded-md shadow-sm group-hover:text-indigo-600 group-hover:border-indigo-100 transition-all">
                  PDF Resource
                </span>
                <button className="p-1.5 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 rounded-lg text-slate-400 hover:text-slate-600 transition shadow-sm">
                  <MoreHorizontal size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}