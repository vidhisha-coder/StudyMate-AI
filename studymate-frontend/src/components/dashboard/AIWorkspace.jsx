import React from 'react';
import { motion } from 'framer-motion';
import { UploadCloud, FileSpreadsheet, FileQuestion, Layers, FileSearch, MessageSquarePlus } from 'lucide-react';

const tools = [
  { label: "Upload Notes", desc: "Ingest PDF libraries", icon: <UploadCloud size={20} /> },
  { label: "Generate Summary", desc: "Distill structural assets", icon: <FileSpreadsheet size={20} /> },
  { label: "Generate Quiz", desc: "Build automated tests", icon: <FileQuestion size={20} /> },
  { label: "Flashcards", desc: "Spaced retrieval system", icon: <Layers size={20} /> },
  { label: "Explain Topic", desc: "Contextual deep breakdown", icon: <FileSearch size={20} /> },
  { label: "Chat with AI", desc: "Dynamic interactive sync", icon: <MessageSquarePlus size={20} /> }
];

export default function AIWorkspace() {
  return (
    <motion.div 
      variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
      className="bg-white border border-slate-200/60 p-6 lg:p-8 rounded-[32px] shadow-sm relative overflow-hidden"
    >
      <div className="mb-6">
        <h2 className="text-[26px] font-bold tracking-tight text-slate-900">AI Workspace</h2>
        <p className="text-[12px] font-semibold text-slate-400 tracking-wider uppercase mt-0.5">Autonomous Operations Engine</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
        {tools.map((tool, i) => (
          <button
            key={i}
            className="flex flex-col items-start p-5 bg-[#FAFAFB] hover:bg-white border border-slate-100 hover:border-indigo-600/30 rounded-2xl transition-all duration-200 group text-left shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 hover:-translate-y-1"
          >
            <div className="w-10 h-10 rounded-xl bg-white border border-slate-200/60 group-hover:bg-indigo-50 group-hover:border-indigo-100 text-slate-500 group-hover:text-indigo-600 flex items-center justify-center transition-colors shadow-sm">
              {tool.icon}
            </div>
            <h4 className="text-[15px] font-bold text-slate-800 mt-4 tracking-tight group-hover:text-indigo-600 transition-colors">{tool.label}</h4>
            <p className="text-[11px] font-medium text-slate-400 mt-1 leading-snug">{tool.desc}</p>
          </button>
        ))}
      </div>
    </motion.div>
  );
}