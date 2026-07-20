import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

export default function CourseCard({ course }) {
  // Compute circular stroke offset values safely
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const strokeOffset = circumference - (course.progress / 100) * circumference;

  return (
    <motion.div
      variants={{ hidden: { opacity: 0, x: 20 }, show: { opacity: 1, x: 0 } }}
      whileHover={{ y: -4, shadow: "0 15px 30px -10px rgba(15,23,42,0.04)" }}
      className="bg-white border border-slate-200/60 p-5 rounded-[24px] shadow-sm flex items-center justify-between transition-all duration-200 group cursor-pointer"
    >
      <div className="flex items-center gap-4">
        {/* Dynamic Circular Modern Progress Ring representation */}
        <div className="relative w-11 h-11 flex items-center justify-center bg-slate-50 rounded-xl border border-slate-100">
          <svg className="w-10 h-10 transform -rotate-90">
            <circle cx="20" cy="20" r={radius} stroke="#F1F5F9" strokeWidth="2.5" fill="transparent" />
            <circle 
              cx="20" 
              cy="20" 
              r={radius} 
              stroke="#4F46E5" 
              strokeWidth="2.5" 
              fill="transparent" 
              strokeDasharray={circumference}
              strokeDashoffset={strokeOffset}
              strokeLinecap="round"
            />
          </svg>
          <span className="absolute text-[10px] font-black text-slate-800">{course.progress}%</span>
        </div>

        <div>
          <h4 className="text-[15px] font-bold text-slate-900 group-hover:text-indigo-600 transition-colors tracking-tight leading-tight">
            {course.name}
          </h4>
          <span className="text-[12px] font-medium text-slate-400 mt-0.5 block">{course.timeLeft}</span>
        </div>
      </div>

      <button className="w-9 h-9 bg-slate-50 hover:bg-indigo-600 text-slate-400 hover:text-white rounded-full flex items-center justify-center transition-all border border-slate-100 group-hover:scale-105 active:scale-95 shadow-sm">
        <ArrowUpRight size={14} />
      </button>
    </motion.div>
  );
}