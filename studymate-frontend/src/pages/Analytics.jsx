import React, { useState, useEffect } from 'react';
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
  ArrowUpRight,
  Sparkles,
  Inbox
} from 'lucide-react';

// New Dedicated Analytics Service
import { getAnalyticsData, getAchievementsData } from '../services/analyticsService';

const containerVariants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 }
};

export default function Analytics() {
  const [stats, setStats] = useState({
    avgScore: 0,
    accuracy: 0,
    quizzesAttempted: 0,
    streak: 0
  });

  const [subjectPerformance, setSubjectPerformance] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [quizHistory, setQuizHistory] = useState([]);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const data = await getAnalyticsData();
        
        // Exact Zero-State Assignment
        setStats({
          avgScore: data.avgScore,
          accuracy: data.accuracy,
          quizzesAttempted: data.quizzesAttempted,
          streak: data.streak // Pure 0 state binding
        });

        setSubjectPerformance(Array.isArray(data.subjectPerformance) ? data.subjectPerformance : []);
        setQuizHistory(Array.isArray(data.recentQuizzes) ? data.recentQuizzes : []);

        // Achievements Fetch
        const achievementsData = await getAchievementsData();
        if (Array.isArray(achievementsData)) {
          const mappedAchievements = achievementsData.map((item, index) => ({
            id: item.id || index + 1,
            title: item.title || 'Milestone',
            desc: item.desc || item.description || '',
            icon: item.icon || Trophy,
            color: item.color || 'bg-indigo-50 border-indigo-200 text-indigo-600',
            unlocked: item.unlocked ?? false
          }));
          setAchievements(mappedAchievements);
        }
      } catch (err) {
        console.error("Error loading analytics:", err);
      }
    };

    fetchAnalytics();
  }, []);

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
          <span>Last Updated: Today, {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
      </div>

      {/* 4 TOP METRIC CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: Average Score */}
        <motion.div variants={itemVariants} className="bg-white border border-slate-200/80 p-5 rounded-3xl shadow-sm flex items-center justify-between relative overflow-hidden group hover:border-indigo-300 transition-all">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Average Score</p>
            <h3 className="text-3xl font-black text-slate-900 mt-1">{stats.avgScore}%</h3>
            <p className="text-[11px] text-slate-400 font-bold flex items-center gap-1 mt-1">
              <TrendingUp className="w-3.5 h-3.5" /> Start quizzes to build average
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
            <p className="text-[11px] text-slate-400 font-bold flex items-center gap-1 mt-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> No attempts yet
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
            <p className="text-[11px] text-slate-400 font-bold mt-1">
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
              <Sparkles className="w-3.5 h-3.5" /> Complete a task today!
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center border border-orange-100">
            <Flame className="w-6 h-6" />
          </div>
        </motion.div>

      </div>

      {/* CHARTS SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Progress Chart Placeholder */}
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

          <div className="w-full h-48 relative flex items-end pt-4 pb-2">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 500 120">
              <defs>
                <linearGradient id="gradientArea" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4F46E5" stopOpacity="0.15"/>
                  <stop offset="100%" stopColor="#4F46E5" stopOpacity="0"/>
                </linearGradient>
              </defs>
              <path d="M 0,110 L 125,110 L 250,110 L 375,110 L 500,110 L 500,120 L 0,120 Z" fill="url(#gradientArea)" />
              <path d="M 0,110 L 125,110 L 250,110 L 375,110 L 500,110" fill="none" stroke="#CBD5E1" strokeWidth="3" strokeDasharray="6 6" strokeLinecap="round" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-xs text-slate-400 font-semibold bg-white/80 px-3 py-1 rounded-full border border-slate-200/60">
                No quiz activity recorded yet
              </p>
            </div>
          </div>

          <div className="flex justify-between items-center text-xs text-slate-400 font-bold border-t border-slate-100 pt-3 mt-2">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
              <span key={i}>{day}</span>
            ))}
          </div>
        </motion.div>

        {/* Subject-wise Performance Bars */}
        <motion.div variants={itemVariants} className="bg-white border border-slate-200/80 p-6 rounded-3xl shadow-sm space-y-4">
          <div>
            <h2 className="text-lg font-black text-slate-900 tracking-tight">Subject Mastery</h2>
            <p className="text-xs text-slate-400 mt-0.5">Accuracy breakdowns per domain</p>
          </div>

          <div className="space-y-4 pt-2">
            {subjectPerformance && subjectPerformance.length > 0 ? (
              subjectPerformance.map((item, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-slate-700">{item.subject}</span>
                    <span className="text-slate-900 font-black">{item.score}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${item.color || 'bg-indigo-600'} rounded-full transition-all duration-500`}
                      style={{ width: `${item.score}%` }}
                    ></div>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-slate-400 space-y-2">
                <Inbox className="w-8 h-8 text-slate-300" />
                <p className="text-xs font-medium text-center">No subjects tracked yet.<br/>Attempt a quiz to see mastery scores!</p>
              </div>
            )}
          </div>
        </motion.div>

      </div>

      {/* ACHIEVEMENTS SECTION */}
      <motion.div variants={itemVariants} className="space-y-4">
        <div className="flex items-center gap-2">
          <Award className="w-5 h-5 text-indigo-600" />
          <h2 className="text-lg font-black text-slate-900 tracking-tight">Achievements & Milestones</h2>
        </div>

        {achievements.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {achievements.map((item) => {
              const Icon = typeof item.icon === 'function' ? item.icon : Trophy;
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
        ) : (
          <div className="bg-white border border-slate-200/80 rounded-3xl p-6 text-center text-xs text-slate-400 font-medium">
            Complete study milestones to unlock badges here!
          </div>
        )}
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
          {quizHistory.length > 0 ? (
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
          ) : (
            <div className="py-8 text-center text-xs text-slate-400 font-medium">
              No quiz attempts logged yet.
            </div>
          )}
        </div>
      </motion.div>

    </motion.div>
  );
}