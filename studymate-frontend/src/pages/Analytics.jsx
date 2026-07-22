import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Trophy, 
  Target, 
  Flame, 
  BarChart3, 
  Award, 
  Clock, 
  CheckCircle2, 
  TrendingUp, 
  BookOpen, 
  Calendar,
  Zap,
  ArrowUpRight,
  Sparkles
} from 'lucide-react';

// Animation Container Variants
const containerVariants = {
  hidden: { opacity: 0, y: 15 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.4, staggerChildren: 0.1 } 
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 }
};

export default function Analytics() {
  // Mock Data States (Can be replaced with Backend API calls later)
  const [stats] = useState({
    avgScore: 84,
    accuracy: 88,
    quizzesAttempted: 24,
    streak: 7
  });

  const [subjectPerformance] = useState([
    { subject: 'Operating Systems', score: 88, total: 100, color: 'bg-indigo-600' },
    { subject: 'Database Systems', score: 76, total: 100, color: 'bg-blue-500' },
    { subject: 'Python Data Structures', score: 92, total: 100, color: 'bg-emerald-500' },
    { subject: 'Computer Networks', score: 68, total: 100, color: 'bg-amber-500' },
  ]);

  const [achievements] = useState([
    { id: 1, title: '7-Day Scholar', desc: 'Maintained a 7-day study streak', icon: Flame, color: 'bg-orange-50 border-orange-200 text-orange-600', unlocked: true },
    { id: 2, title: 'Quiz Master', desc: 'Completed over 20 quizzes', icon: Trophy, color: 'bg-indigo-50 border-indigo-200 text-indigo-600', unlocked: true },
    { id: 3, title: 'Accuracy King', desc: 'Scored above 90% in 5 consecutive tests', icon: Target, color: 'bg-emerald-50 border-emerald-200 text-emerald-600', unlocked: true },
    { id: 4, title: 'Speed Demon', desc: 'Finished a quiz in under 3 minutes', icon: Zap, color: 'bg-slate-100 border-slate-200 text-slate-400', unlocked: false },
  ]);

  const [quizHistory] = useState([
    { id: 'QZ-108', title: 'OS - Ch 3 Process Management', score: '90%', correct: '9/10', date: '22 Jul 2026', time: '14 mins', status: 'Passed' },
    { id: 'QZ-107', title: 'SQL Joins & Normalization', score: '75%', correct: '15/20', date: '21 Jul 2026', time: '18 mins', status: 'Passed' },
    { id: 'QZ-106', title: 'Python Lists & Dictionaries', score: '100%', correct: '10/10', date: '20 Jul 2026', time: '08 mins', status: 'Perfect' },
    { id: 'QZ-105', title: 'Computer Networks - OSI Model', score: '60%', correct: '6/10', date: '18 Jul 2026', time: '12 mins', status: 'Review Needed' },
  ]);

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="w-full min-h-[calc(100vh-80px)] flex flex-col space-y-6 px-4 md:px-8 py-6 max-w-7xl mx-auto"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white/80 backdrop-blur-xl border border-slate-200/80 p-6 rounded-3xl shadow-sm">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
            <BarChart3 className="text-indigo-600 w-8 h-8" />
            Performance Analytics
          </h1>
          <p className="text-slate-500 font-medium text-xs md:text-sm mt-1">
            Track your learning metrics, streaks, and subject mastery in real-time.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-indigo-50 border border-indigo-100/80 text-indigo-700 px-4 py-2 rounded-2xl text-xs font-bold w-fit">
          <Calendar className="w-4 h-4 text-indigo-600" />
          <span>Last Updated: Today, 10:25 PM</span>
        </div>
      </div>

      {/* 4 TOP METRIC CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: Average Score */}
        <motion.div variants={itemVariants} className="bg-white border border-slate-200/80 p-5 rounded-3xl shadow-sm flex items-center justify-between relative overflow-hidden group hover:border-indigo-300 transition-all">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Average Score</p>
            <h3 className="text-3xl font-black text-slate-900 mt-1">{stats.avgScore}%</h3>
            <p className="text-[11px] text-emerald-600 font-bold flex items-center gap-1 mt-1">
              <TrendingUp className="w-3.5 h-3.5" /> +4.2% from last week
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100">
            <Trophy className="w-6 h-6" />
          </div>
        </motion.div>

        {/* Card 2: Accuracy */}
        <motion.div variants={itemVariants} className="bg-white border border-slate-200/80 p-5 rounded-3xl shadow-sm flex items-center justify-between relative overflow-hidden group hover:border-emerald-300 transition-all">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Accuracy Rate</p>
            <h3 className="text-3xl font-black text-slate-900 mt-1">{stats.accuracy}%</h3>
            <p className="text-[11px] text-emerald-600 font-bold flex items-center gap-1 mt-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> High precision
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
            <Target className="w-6 h-6" />
          </div>
        </motion.div>

        {/* Card 3: Quizzes Attempted */}
        <motion.div variants={itemVariants} className="bg-white border border-slate-200/80 p-5 rounded-3xl shadow-sm flex items-center justify-between relative overflow-hidden group hover:border-blue-300 transition-all">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Quizzes Attempted</p>
            <h3 className="text-3xl font-black text-slate-900 mt-1">{stats.quizzesAttempted}</h3>
            <p className="text-[11px] text-slate-500 font-bold mt-1">
              Total completed decks
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
            <BookOpen className="w-6 h-6" />
          </div>
        </motion.div>

        {/* Card 4: Study Streak */}
        <motion.div variants={itemVariants} className="bg-white border border-slate-200/80 p-5 rounded-3xl shadow-sm flex items-center justify-between relative overflow-hidden group hover:border-orange-300 transition-all">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Study Streak</p>
            <h3 className="text-3xl font-black text-slate-900 mt-1">{stats.streak} Days</h3>
            <p className="text-[11px] text-orange-600 font-bold flex items-center gap-1 mt-1">
              <Sparkles className="w-3.5 h-3.5" /> Keep it up!
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center border border-orange-100">
            <Flame className="w-6 h-6" />
          </div>
        </motion.div>

      </div>

      {/* CHARTS SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Progress Line Chart (Custom SVG Line) */}
        <motion.div variants={itemVariants} className="lg:col-span-2 bg-white border border-slate-200/80 p-6 rounded-3xl shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-lg font-black text-slate-900 tracking-tight">Progress Over Time</h2>
              <p className="text-xs text-slate-400 mt-0.5">Quiz performance over recent attempts</p>
            </div>
            <span className="text-xs font-extrabold text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-xl border border-indigo-100">
              Weekly Overview
            </span>
          </div>

          {/* Clean SVG Trend Chart */}
          <div className="w-full h-48 relative flex items-end pt-4 pb-2">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 500 120">
              <defs>
                <linearGradient id="gradientArea" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4F46E5" stopOpacity="0.25"/>
                  <stop offset="100%" stopColor="#4F46E5" stopOpacity="0"/>
                </linearGradient>
              </defs>
              <path 
                d="M 0,90 Q 80,40 160,70 T 320,30 T 500,10 L 500,120 L 0,120 Z" 
                fill="url(#gradientArea)" 
              />
              <path 
                d="M 0,90 Q 80,40 160,70 T 320,30 T 500,10" 
                fill="none" 
                stroke="#4F46E5" 
                strokeWidth="4" 
                strokeLinecap="round"
              />
              {/* Dots */}
              <circle cx="0" cy="90" r="5" fill="#4F46E5" />
              <circle cx="160" cy="70" r="5" fill="#4F46E5" />
              <circle cx="320" cy="30" r="5" fill="#4F46E5" />
              <circle cx="500" cy="10" r="6" fill="#4F46E5" stroke="#FFFFFF" strokeWidth="2" />
            </svg>
          </div>

          <div className="flex justify-between items-center text-xs text-slate-400 font-bold border-t border-slate-100 pt-3 mt-2">
            <span>Quiz 1</span>
            <span>Quiz 5</span>
            <span>Quiz 10</span>
            <span>Quiz 15</span>
            <span>Latest</span>
          </div>
        </motion.div>

        {/* Subject-wise Performance Bars */}
        <motion.div variants={itemVariants} className="bg-white border border-slate-200/80 p-6 rounded-3xl shadow-sm space-y-4">
          <div>
            <h2 className="text-lg font-black text-slate-900 tracking-tight">Subject Mastery</h2>
            <p className="text-xs text-slate-400 mt-0.5">Accuracy breakdowns per domain</p>
          </div>

          <div className="space-y-4 pt-2">
            {subjectPerformance.map((item, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-700">{item.subject}</span>
                  <span className="text-slate-900 font-black">{item.score}%</span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${item.color} rounded-full transition-all duration-500`}
                    style={{ width: `${item.score}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

      </div>

      {/* ACHIEVEMENTS SECTION */}
      <motion.div variants={itemVariants} className="space-y-4">
        <div className="flex items-center gap-2">
          <Award className="w-5 h-5 text-indigo-600" />
          <h2 className="text-lg font-black text-slate-900 tracking-tight">Achievements & Milestones</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {achievements.map((item) => {
            const Icon = item.icon;
            return (
              <div 
                key={item.id} 
                className={`p-5 rounded-3xl border transition-all flex items-start gap-4 ${
                  item.unlocked ? "bg-white border-slate-200/80 shadow-sm" : "bg-slate-50/60 border-slate-200/50 opacity-60"
                }`}
              >
                <div className={`p-3 rounded-2xl border ${item.color} flex-shrink-0`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-800 leading-snug">{item.title}</h3>
                  <p className="text-xs text-slate-400 mt-1 font-medium leading-relaxed">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* RECENT QUIZ HISTORY TABLE */}
      <motion.div variants={itemVariants} className="bg-white border border-slate-200/80 rounded-3xl shadow-sm p-6 space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-lg font-black text-slate-900 tracking-tight">Recent Quiz History</h2>
            <p className="text-xs text-slate-400 mt-0.5">Logs of your recent assessment attempts</p>
          </div>
          <button className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1">
            View All <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-[11px] font-black text-slate-400 uppercase tracking-wider">
                <th className="py-3 px-4">Quiz Title</th>
                <th className="py-3 px-4">Score</th>
                <th className="py-3 px-4">Accuracy</th>
                <th className="py-3 px-4">Time Taken</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-700">
              {quizHistory.map((row) => (
                <tr key={row.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-slate-900">{row.title}</td>
                  <td className="py-3.5 px-4 font-black text-indigo-600">{row.score}</td>
                  <td className="py-3.5 px-4">{row.correct}</td>
                  <td className="py-3.5 px-4 text-slate-500 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" /> {row.time}
                  </td>
                  <td className="py-3.5 px-4 text-slate-400">{row.date}</td>
                  <td className="py-3.5 px-4 text-right">
                    <span className={`inline-flex px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                      row.status === 'Perfect' ? 'bg-emerald-100 text-emerald-700' :
                      row.status === 'Passed' ? 'bg-indigo-100 text-indigo-700' :
                      'bg-amber-100 text-amber-700'
                    }`}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

    </motion.div>
  );
}