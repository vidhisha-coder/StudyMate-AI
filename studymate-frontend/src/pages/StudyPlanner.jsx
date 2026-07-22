import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar as CalendarIcon, Plus, CheckCircle2, Circle, Clock, X, 
  Trash2, Target, Play, Pause, RotateCcw, Sparkles, Download, RefreshCw, GripVertical, ChevronLeft, ChevronRight 
} from 'lucide-react';

export default function StudyPlanner() {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'DBMS Chapter 3', subject: 'Database', date: '2026-07-24', start_time: '18:00', end_time: '19:30', priority: 'High', completed: false },
    { id: 2, title: 'DSA Graph Algorithms', subject: 'Algorithms', date: '2026-07-24', start_time: '14:00', end_time: '15:30', priority: 'High', completed: true },
    { id: 3, title: 'Java Multithreading', subject: 'Programming', date: '2026-07-24', start_time: '20:00', end_time: '21:00', priority: 'Medium', completed: false },
  ]);

  // Pomodoro Timer State
  const [pomoTime, setPomoTime] = useState(25 * 60);
  const [isPomoRunning, setIsPomoRunning] = useState(false);

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  
  const [newTask, setNewTask] = useState({ 
    title: '', 
    subject: 'Database', 
    date: '2026-07-24', 
    start_time: '18:00', 
    end_time: '19:30', 
    priority: 'Medium' 
  });

  // Calendar Setup
  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);

  // Pomodoro Logic
  useEffect(() => {
    let interval = null;
    if (isPomoRunning && pomoTime > 0) {
      interval = setInterval(() => setPomoTime(prev => prev - 1), 1000);
    } else if (pomoTime === 0) {
      setIsPomoRunning(false);
    }
    return () => clearInterval(interval);
  }, [isPomoRunning, pomoTime]);

  const formatPomoTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTask.title) return;
    setTasks([...tasks, { id: Date.now(), ...newTask, completed: false }]);
    setNewTask({ title: '', subject: 'Database', date: '2026-07-24', start_time: '18:00', end_time: '19:30', priority: 'Medium' });
    setIsAddModalOpen(false);
  };

  const generateAiPlan = () => {
    const aiTasks = [
      { id: Date.now() + 1, title: 'AI: System Design Revision', subject: 'Architecture', date: '2026-07-24', start_time: '11:00', end_time: '12:30', priority: 'High', completed: false },
      { id: Date.now() + 2, title: 'AI: Practice Quiz Questions', subject: 'Revision', date: '2026-07-24', start_time: '16:00', end_time: '17:00', priority: 'Medium', completed: false },
    ];
    setTasks([...tasks, ...aiTasks]);
    setIsAiModalOpen(false);
  };

  // 📅 Direct Google Calendar Export Handler
  const openGoogleCalendar = (task) => {
    const title = encodeURIComponent(task ? `${task.title} (${task.subject})` : "Study Session");
    const details = encodeURIComponent("Study session created with StudyMate AI Planner");
    // Format date format for Google Calendar (YYYYMMDDTHHMMSSZ)
    const dateStr = task?.date ? task.date.replace(/-/g, '') : '20260724';
    const startTime = task?.start_time ? task.start_time.replace(':', '') + '00' : '100000';
    const endTime = task?.end_time ? task.end_time.replace(':', '') + '00' : '110000';
    
    const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&dates=${dateStr}T${startTime}/${dateStr}T${endTime}`;
    window.open(calendarUrl, '_blank');
  };

  // 🖨️ Clean PDF Export Handler
  const handleExportPDF = () => {
    window.print();
  };

  const completedCount = tasks.filter(t => t.completed).length;
  const progressPercent = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;
  const strokeDashoffset = 251.2 - (251.2 * progressPercent) / 100;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="w-full space-y-6 px-4 md:px-6 py-6 pb-12 print-area">
      
      {/* 🖨️ CSS rule to hide sidebar and non-printable elements during PDF Print */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .print-area, .print-area * {
            visibility: visible;
          }
          .print-area {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>

      {/* Banner */}
      <div className="bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-700 rounded-[32px] p-6 text-white shadow-xl flex flex-col md:flex-row justify-between items-center gap-6 relative overflow-hidden">
        <div className="space-y-2 z-10">
          <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-black tracking-wider uppercase">Productivity Hub</span>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight">Study Planner</h1>
          <p className="text-indigo-100 text-sm font-semibold max-w-md">Manage your targets, trigger Pomodoro focus timer, and generate AI schedules.</p>
          
          <div className="flex flex-wrap items-center gap-2 pt-2 no-print">
            <button onClick={() => setIsAiModalOpen(true)} className="flex items-center gap-1.5 bg-white text-indigo-700 hover:bg-indigo-50 px-4 py-2 rounded-xl text-xs font-black shadow-md transition-all active:scale-95">
              <Sparkles size={14} /> AI Study Plan
            </button>
            <button onClick={() => openGoogleCalendar(tasks[0])} className="flex items-center gap-1.5 bg-indigo-500/40 hover:bg-indigo-500/60 border border-white/20 px-3.5 py-2 rounded-xl text-xs font-bold transition-all">
              <RefreshCw size={14} /> Add to Google Calendar
            </button>
            <button onClick={handleExportPDF} className="flex items-center gap-1.5 bg-indigo-500/40 hover:bg-indigo-500/60 border border-white/20 px-3.5 py-2 rounded-xl text-xs font-bold transition-all">
              <Download size={14} /> Export PDF
            </button>
          </div>
        </div>

        {/* Progress Ring */}
        <div className="flex items-center gap-4 bg-white/10 backdrop-blur-xl border border-white/20 p-4 rounded-3xl z-10">
          <div className="relative w-24 h-24 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" className="text-white/20" fill="transparent" />
              <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" className="text-white transition-all duration-700 ease-out" fill="transparent" strokeDasharray="251.2" strokeDashoffset={strokeDashoffset} strokeLinecap="round" />
            </svg>
            <span className="absolute text-lg font-black">{progressPercent}%</span>
          </div>
          <div>
            <h4 className="font-black text-sm">Today's Target</h4>
            <p className="text-xs text-indigo-200">{completedCount} of {tasks.length} Completed</p>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        
        {/* Today's Tasks */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white/60 backdrop-blur-xl border border-white/60 p-6 rounded-[32px] shadow-sm space-y-4">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-black text-slate-900">Today's Tasks</h2>
              <button onClick={() => setIsAddModalOpen(true)} className="flex items-center gap-1.5 text-xs font-bold bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white px-4 py-2.5 rounded-xl transition-all shadow-md shadow-indigo-200 no-print">
                <Plus size={16} /> Add Task
              </button>
            </div>

            <div className="space-y-3">
              {tasks.map((task) => (
                <motion.div 
                  layout
                  key={task.id} 
                  onClick={() => toggleTask(task.id)}
                  className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
                    task.completed ? 'bg-slate-50/60 border-slate-200 opacity-60 line-through' : 'bg-white border-slate-200/80 hover:border-indigo-300 shadow-sm'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <GripVertical size={16} className="text-slate-300 hover:text-slate-500 cursor-grab no-print" />
                    {task.completed ? <CheckCircle2 size={20} className="text-indigo-600 flex-shrink-0" /> : <Circle size={20} className="text-slate-400 flex-shrink-0" />}
                    <div>
                      <span className="font-bold text-slate-800 text-sm md:text-base block">{task.title}</span>
                      <span className="text-[11px] font-semibold text-slate-400">{task.subject}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                    <span className="flex items-center gap-1 bg-slate-100 px-2.5 py-1 rounded-lg">
                      <Clock size={12} /> {task.start_time} - {task.end_time}
                    </span>
                    <span className={`px-2.5 py-1 rounded-lg font-bold ${
                      task.priority === 'High' ? 'bg-rose-50 text-rose-600' : task.priority === 'Medium' ? 'bg-amber-50 text-amber-600' : 'bg-emerald-50 text-emerald-600'
                    }`}>
                      {task.priority}
                    </span>
                    <button onClick={(e) => { e.stopPropagation(); openGoogleCalendar(task); }} className="p-1 hover:text-indigo-600 text-slate-400 rounded-lg no-print" title="Sync Task to Google Calendar">
                      <CalendarIcon size={16} />
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); setTasks(tasks.filter(t => t.id !== task.id)); }} className="p-1 hover:text-rose-600 text-slate-400 rounded-lg no-print">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* 🎯 Weekly Goal Card */}
          <div className="bg-white/60 backdrop-blur-xl border border-white/60 p-6 rounded-[32px] shadow-sm space-y-3">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Target size={18} className="text-emerald-600" />
                <h3 className="text-sm font-black text-slate-900">Weekly Goal</h3>
              </div>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg">18 / 30 hrs</span>
            </div>
            <p className="text-xs font-semibold text-slate-500">Goal: Study 30 hours this week</p>
            <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
              <div className="bg-emerald-500 h-full rounded-full w-[60%] transition-all duration-500"></div>
            </div>
          </div>
        </div>

        {/* Right Sidebar: Calendar + Pomodoro */}
        <div className="space-y-6 flex flex-col justify-between">
          
          {/* 📅 CALENDAR WIDGET */}
          <div className="bg-white/60 backdrop-blur-xl border border-white/60 p-6 rounded-[32px] shadow-sm flex flex-col justify-between w-full">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <CalendarIcon size={20} className="text-indigo-600" />
                  <h2 className="text-lg font-black text-slate-900">Calendar</h2>
                </div>
                <div className="flex items-center gap-1 text-slate-500 text-xs font-bold no-print">
                  <button className="p-1 hover:bg-slate-100 rounded-lg"><ChevronLeft size={16}/></button>
                  <span>July 2026</span>
                  <button className="p-1 hover:bg-slate-100 rounded-lg"><ChevronRight size={16}/></button>
                </div>
              </div>

              <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold text-slate-400 mb-2">
                <span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span><span>Su</span>
              </div>
              <div className="grid grid-cols-7 gap-1.5 text-center text-xs font-bold">
                {daysInMonth.map((day) => (
                  <div key={day} className={`p-2 rounded-xl cursor-pointer transition-all ${day === 24 ? 'bg-indigo-600 text-white font-black shadow-md shadow-indigo-200' : 'hover:bg-indigo-50 text-slate-700'}`}>
                    {day}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 🍅 POMODORO TIMER */}
          <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white p-6 rounded-[32px] shadow-lg flex flex-col justify-between space-y-4 no-print">
            <div className="flex justify-between items-center">
              <span className="text-xs font-extrabold uppercase tracking-widest text-indigo-400">Focus Timer</span>
              <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded-full font-bold">Pomodoro</span>
            </div>

            <div className="text-center py-2">
              <h2 className="text-5xl font-black tracking-widest font-mono">{formatPomoTime(pomoTime)}</h2>
            </div>

            <div className="flex justify-center items-center gap-3">
              <button onClick={() => setIsPomoRunning(!isPomoRunning)} className="p-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl shadow-md transition-all active:scale-95">
                {isPomoRunning ? <Pause size={18} /> : <Play size={18} />}
              </button>
              <button onClick={() => { setIsPomoRunning(false); setPomoTime(25 * 60); }} className="p-3 bg-white/10 hover:bg-white/20 text-white rounded-2xl transition-all">
                <RotateCcw size={18} />
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* AI Plan Modal */}
      <AnimatePresence>
        {isAiModalOpen && (
          <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 no-print">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-white rounded-[28px] p-6 w-full max-w-md shadow-2xl space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Sparkles size={20} className="text-indigo-600" />
                  <h3 className="text-lg font-black text-slate-900">Generate AI Study Plan</h3>
                </div>
                <button onClick={() => setIsAiModalOpen(false)} className="text-slate-400 hover:text-slate-600"><X size={20} /></button>
              </div>
              <p className="text-xs text-slate-500 font-medium">StudyMate AI will analyze your pending topics and generate optimal study blocks for today.</p>
              <button onClick={generateAiPlan} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl shadow-md transition-all">
                Auto-Generate Tasks
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Add Task Modal */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 no-print">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-white rounded-[28px] p-6 w-full max-w-md shadow-2xl space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-black text-slate-900">Add New Task</h3>
                <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-slate-600"><X size={20} /></button>
              </div>

              <form onSubmit={handleAddTask} className="space-y-3">
                <div>
                  <label className="text-xs font-bold text-slate-600">Title</label>
                  <input type="text" placeholder="e.g. Study DBMS" value={newTask.title} onChange={e => setNewTask({...newTask, title: e.target.value})} className="w-full mt-1 p-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs font-bold text-slate-600">Subject</label>
                    <input type="text" placeholder="Database" value={newTask.subject} onChange={e => setNewTask({...newTask, subject: e.target.value})} className="w-full mt-1 p-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-600">Date</label>
                    <input type="date" value={newTask.date} onChange={e => setNewTask({...newTask, date: e.target.value})} className="w-full mt-1 p-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs font-bold text-slate-600">Start Time</label>
                    <input type="text" placeholder="18:00" value={newTask.start_time} onChange={e => setNewTask({...newTask, start_time: e.target.value})} className="w-full mt-1 p-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-600">End Time</label>
                    <input type="text" placeholder="19:30" value={newTask.end_time} onChange={e => setNewTask({...newTask, end_time: e.target.value})} className="w-full mt-1 p-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-600">Priority</label>
                  <select value={newTask.priority} onChange={e => setNewTask({...newTask, priority: e.target.value})} className="w-full mt-1 p-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>

                <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl transition-all shadow-md shadow-indigo-200 mt-2">
                  Save Task
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </motion.div>
  );
}