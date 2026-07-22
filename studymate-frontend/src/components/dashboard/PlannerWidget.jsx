import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Circle, ArrowRight, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PlannerWidget() {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'DSA', completed: true },
    { id: 2, title: 'DBMS', completed: true },
    { id: 3, title: 'React', completed: false },
    { id: 4, title: 'Operating Systems', completed: false },
  ]);

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  return (
    <motion.div 
      whileHover={{ y: -2 }}
      className="bg-white/60 backdrop-blur-xl border border-white/40 p-6 rounded-[28px] shadow-sm hover:shadow-md transition-all flex flex-col justify-between w-full h-full"
    >
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
              <Calendar size={18} />
            </div>
            <h3 className="text-lg font-black text-slate-900 tracking-tight">Today's Tasks</h3>
          </div>
          <Link 
            to="/planner" 
            className="flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-700 transition-colors group"
          >
            See All <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div className="space-y-2.5">
          {tasks.slice(0, 3).map((task) => (
            <div 
              key={task.id}
              onClick={() => toggleTask(task.id)}
              className={`flex items-center gap-3 p-3 rounded-2xl border cursor-pointer transition-all duration-200 ${
                task.completed 
                  ? 'bg-slate-50/80 border-slate-200/60 opacity-60 line-through text-slate-400' 
                  : 'bg-white/80 border-slate-200/80 hover:border-indigo-300 text-slate-800 shadow-sm'
              }`}
            >
              {task.completed ? (
                <CheckCircle2 size={18} className="text-indigo-600 flex-shrink-0" />
              ) : (
                <Circle size={18} className="text-slate-400 flex-shrink-0" />
              )}
              <span className="font-bold text-xs md:text-sm">{task.title}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-semibold">
        <span>{tasks.filter(t => t.completed).length} of {tasks.length} Completed</span>
        <span className="text-indigo-600 font-bold">
          {Math.round((tasks.filter(t => t.completed).length / tasks.length) * 100)}%
        </span>
      </div>
    </motion.div>
  );
}