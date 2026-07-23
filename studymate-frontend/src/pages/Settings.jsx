import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { 
  User, Mail, Lock, Sun, Moon, Bell, Calendar, HelpCircle, 
  BookOpen, Zap, Shield, LogOut, Trash2, Info, MessageSquare, 
  Check, X, Sparkles, AlertTriangle, Download, Sliders, FileText, Target,
  ArrowLeft
} from "lucide-react";

export default function Settings({ onBack }) {
  const navigate = useNavigate();

  // --- Global Theme Context ---
  const { 
    themeMode, 
    setThemeMode, 
    themeColor, 
    setThemeColor, 
    fontSize, 
    setFontSize 
  } = useTheme();

  const isDark = themeMode === "dark";

  // --- Color Mapping Configuration ---
  const themeAccentMap = {
    indigo: { bg: "bg-indigo-600", hover: "hover:bg-indigo-700", text: "text-indigo-600", lightBg: "bg-indigo-50 dark:bg-indigo-950/40", border: "border-indigo-200" },
    emerald: { bg: "bg-emerald-600", hover: "hover:bg-emerald-700", text: "text-emerald-600", lightBg: "bg-emerald-50 dark:bg-emerald-950/40", border: "border-emerald-200" },
    blue: { bg: "bg-blue-600", hover: "hover:bg-blue-700", text: "text-blue-600", lightBg: "bg-blue-50 dark:bg-blue-950/40", border: "border-blue-200" },
    amber: { bg: "bg-amber-500", hover: "hover:bg-amber-600", text: "text-amber-500", lightBg: "bg-amber-50 dark:bg-amber-950/40", border: "border-amber-200" },
    rose: { bg: "bg-rose-600", hover: "hover:bg-rose-700", text: "text-rose-600", lightBg: "bg-rose-50 dark:bg-rose-950/40", border: "border-rose-200" },
  };

  const activeAccent = themeAccentMap[themeColor] || themeAccentMap.indigo;

  // --- Local Component States ---
  const [notifications, setNotifications] = useState({
    enabled: true,
    emailNotifications: true,
    quizReminder: true,
    studyReminder: true,
    dailyGoalReminder: false,
  });

  const [aiConfig, setAiConfig] = useState({
    model: "gemini-1.5-pro",
    responseLength: "detailed",
    creativity: 0.7,
  });

  const [activeModal, setActiveModal] = useState(null); // 'password' | 'delete' | null
  const [formInput, setFormInput] = useState("");
  const [toastMessage, setToastMessage] = useState(null);

  // --- Handlers ---
  const handleBackNavigation = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleLogout = () => {
    triggerToast("Logged out successfully!");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  const handleAccountUpdate = (e) => {
    e.preventDefault();
    if (!formInput.trim()) return;

    if (activeModal === "password") {
      triggerToast("Password updated successfully!");
    }

    setFormInput("");
    setActiveModal(null);
  };

  return (
    <div className={`w-full h-full grid grid-rows-[auto_1fr] overflow-hidden px-4 md:px-6 pt-5 pb-6 gap-5 box-border transition-colors duration-200 ${
      isDark ? "bg-slate-950 text-slate-100" : "bg-slate-50 text-slate-900"
    }`}>
      
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-5 right-5 z-50 bg-slate-900 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 border border-slate-700"
          >
            <Check size={14} className="text-emerald-400" />
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dynamic Modal Manager */}
      <AnimatePresence>
        {activeModal && (
          <div 
            onClick={() => { setActiveModal(null); setFormInput(""); }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className={`${isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"} rounded-[28px] border shadow-2xl w-full max-w-md p-6 space-y-4 relative`}
            >
              <button 
                onClick={() => { setActiveModal(null); setFormInput(""); }}
                className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>

              <div className="flex items-center gap-3">
                <div className={`p-2.5 ${activeAccent.lightBg} ${activeAccent.text} rounded-2xl`}>
                  {activeModal === "password" && <Lock size={20} />}
                  {activeModal === "delete" && <AlertTriangle size={20} className="text-rose-600" />}
                </div>
                <div>
                  <h3 className="text-base font-black capitalize">
                    {activeModal === "delete" ? "Delete Account" : "Change Password"}
                  </h3>
                  <p className="text-[11px] font-medium text-slate-400">
                    {activeModal === "delete" 
                      ? "This action is permanent and cannot be undone." 
                      : "Enter your new password below."}
                  </p>
                </div>
              </div>

              {activeModal !== "delete" ? (
                <form onSubmit={handleAccountUpdate} className="space-y-3 pt-2">
                  <input 
                    type="password"
                    placeholder="Enter new password..."
                    value={formInput}
                    onChange={(e) => setFormInput(e.target.value)}
                    className={`w-full ${isDark ? "bg-slate-800 border-slate-700 text-white" : "bg-slate-50 border-slate-200 text-slate-900"} border rounded-xl px-3.5 py-2.5 text-[13px] font-semibold focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-500`}
                    autoFocus
                  />
                  <div className="flex justify-end gap-2 pt-2">
                    <button 
                      type="button"
                      onClick={() => setActiveModal(null)}
                      className={`px-4 py-2 ${isDark ? "bg-slate-800 text-slate-300 hover:bg-slate-700" : "bg-slate-100 text-slate-600 hover:bg-slate-200"} font-bold text-xs rounded-xl transition-colors cursor-pointer`}
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit"
                      className={`px-4 py-2 ${activeAccent.bg} ${activeAccent.hover} text-white font-bold text-xs rounded-xl transition-colors shadow-xs cursor-pointer`}
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              ) : (
                <div className="pt-2 space-y-3">
                  <p className="text-[12px] font-medium text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 border border-rose-100 dark:border-rose-900/50 p-3 rounded-xl">
                    Are you sure? All study notes, flashcards, AI cached history, and personal credentials will be wiped permanently.
                  </p>
                  <div className="flex justify-end gap-2 pt-2">
                    <button 
                      onClick={() => setActiveModal(null)}
                      className={`px-4 py-2 ${isDark ? "bg-slate-800 text-slate-300 hover:bg-slate-700" : "bg-slate-100 text-slate-600 hover:bg-slate-200"} font-bold text-xs rounded-xl transition-colors cursor-pointer`}
                    >
                      Cancel
                    </button>
                    <button 
                      onClick={() => {
                        setActiveModal(null);
                        triggerToast("Account deletion process initiated.");
                      }}
                      className="px-4 py-2 bg-rose-600 text-white font-bold text-xs rounded-xl hover:bg-rose-700 transition-colors cursor-pointer"
                    >
                      Yes, Delete Account
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Header Section */}
      <div className="w-full flex items-center gap-3 self-start flex-shrink-0">
        <button 
          onClick={handleBackNavigation}
          className={`p-2.5 ${isDark ? "bg-slate-900 border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800" : "bg-white border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50"} border rounded-2xl transition-all shadow-xs cursor-pointer active:scale-95`}
          title="Go Back"
        >
          <ArrowLeft size={18} />
        </button>

        <div>
          <h1 className="text-2xl md:text-[28px] font-black tracking-tight leading-none">
            Settings & Preferences
          </h1>
          <p className="text-slate-400 font-medium text-[13px] mt-1.5 leading-tight">
            Manage your account credentials, theme preferences, notifications, and AI model parameters.
          </p>
        </div>
      </div>

      {/* Main Settings Scroll Container */}
      <div className="w-full h-full overflow-y-auto custom-scrollbar min-h-0 space-y-6 pr-1">
        
        {/* 1. ACCOUNT SECURITY */}
        <div className={`${isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"} border rounded-[28px] p-6 shadow-xs space-y-4`}>
          <div className={`flex items-center justify-between border-b ${isDark ? "border-slate-800" : "border-slate-100"} pb-3`}>
            <div className="flex items-center gap-2">
              <User size={18} className={activeAccent.text} />
              <h3 className="text-sm font-black uppercase tracking-wider">1. Account Security</h3>
            </div>
            <button 
              onClick={handleLogout}
              className="px-3 py-1.5 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 hover:bg-rose-100 dark:hover:bg-rose-900/70 text-rose-600 dark:text-rose-400 font-bold text-[11px] rounded-xl transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
            >
              <LogOut size={13} /> Logout
            </button>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className={`flex-1 flex items-center justify-between p-3.5 ${isDark ? "bg-slate-800/50 border-slate-800" : "bg-slate-50/70 border-slate-200/80"} border rounded-2xl hover:bg-slate-100/50 dark:hover:bg-slate-800 transition-colors`}>
              <div className="space-y-0.5">
                <p className="text-[11px] font-bold text-slate-400">Security Password</p>
                <p className="text-[13px] font-black">••••••••••••</p>
              </div>
              <button 
                onClick={() => setActiveModal("password")}
                className={`px-3.5 py-1.5 ${isDark ? "bg-slate-800 border-slate-700 text-slate-200" : "bg-white border-slate-200 text-slate-700"} border hover:border-indigo-400 font-bold text-[11px] rounded-xl transition-all shadow-xs active:scale-95 cursor-pointer`}
              >
                Change Password
              </button>
            </div>

            <button 
              onClick={() => setActiveModal("delete")}
              className="px-4 py-3.5 bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 dark:hover:bg-rose-900/60 border border-rose-200/60 dark:border-rose-900/40 text-rose-600 dark:text-rose-400 font-bold text-xs rounded-2xl transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
            >
              <Trash2 size={14} /> Delete Account
            </button>
          </div>
        </div>

        {/* 2. APPEARANCE (Context Connected) */}
        <div className={`${isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"} border rounded-[28px] p-6 shadow-xs space-y-4`}>
          <div className={`flex items-center gap-2 border-b ${isDark ? "border-slate-800" : "border-slate-100"} pb-3`}>
            <Sun size={18} className="text-amber-500" />
            <h3 className="text-sm font-black uppercase tracking-wider">2. Appearance</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Dark / Light Mode */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Theme Mode</label>
              <div className={`grid grid-cols-2 gap-2 ${isDark ? "bg-slate-800 border-slate-700" : "bg-slate-50 border-slate-200"} p-1.5 border rounded-2xl`}>
                <button 
                  onClick={() => setThemeMode("light")}
                  className={`flex items-center justify-center gap-2 py-2 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                    themeMode === "light" 
                      ? "bg-white text-slate-900 shadow-xs border border-slate-200" 
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <Sun size={14} className="text-amber-500" /> Light
                </button>
                <button 
                  onClick={() => setThemeMode("dark")}
                  className={`flex items-center justify-center gap-2 py-2 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                    themeMode === "dark" 
                      ? "bg-slate-950 text-white shadow-xs border border-slate-800" 
                      : "text-slate-400 hover:text-slate-600"
                  }`}
                >
                  <Moon size={14} className="text-indigo-400" /> Dark
                </button>
              </div>
            </div>

            {/* Accent Color Selection */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Theme Color</label>
              <div className={`flex items-center gap-3 ${isDark ? "bg-slate-800 border-slate-700" : "bg-slate-50 border-slate-200"} p-2 border rounded-2xl h-[42px]`}>
                {[
                  { id: "indigo", bg: "bg-indigo-600" },
                  { id: "emerald", bg: "bg-emerald-600" },
                  { id: "blue", bg: "bg-blue-600" },
                  { id: "amber", bg: "bg-amber-500" },
                  { id: "rose", bg: "bg-rose-600" }
                ].map((color) => (
                  <button 
                    key={color.id}
                    onClick={() => setThemeColor(color.id)}
                    className={`w-7 h-7 rounded-xl ${color.bg} flex items-center justify-center transition-all cursor-pointer ${
                      themeColor === color.id ? "ring-2 ring-offset-2 ring-slate-800 scale-105" : "opacity-70 hover:opacity-100"
                    }`}
                  >
                    {themeColor === color.id && <Check size={13} className="text-white" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Font Size Selector */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Font Size</label>
              <select 
                value={fontSize}
                onChange={(e) => setFontSize(e.target.value)}
                className={`w-full ${isDark ? "bg-slate-800 border-slate-700 text-slate-200" : "bg-slate-50 border-slate-200 text-slate-700"} border rounded-2xl px-3 py-2.5 text-[12px] font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer h-[42px]`}
              >
                <option value="small">Small (13px)</option>
                <option value="medium">Medium (Standard)</option>
                <option value="large">Large (16px)</option>
              </select>
            </div>
          </div>
        </div>

        {/* 3. NOTIFICATIONS */}
        <div className={`${isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"} border rounded-[28px] p-6 shadow-xs space-y-4`}>
          <div className={`flex items-center gap-2 border-b ${isDark ? "border-slate-800" : "border-slate-100"} pb-3`}>
            <Bell size={18} className={activeAccent.text} />
            <h3 className="text-sm font-black uppercase tracking-wider">3. Notifications</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              { id: "emailNotifications", label: "Email Notifications", desc: "Weekly performance reports and alerts", icon: Mail },
              { id: "quizReminder", label: "Quiz Reminder", desc: "Scheduled quiz cycle alerts", icon: HelpCircle },
              { id: "studyReminder", label: "Study Reminder", desc: "Daily study session prompts", icon: Calendar },
              { id: "dailyGoalReminder", label: "Daily Goal Reminder", desc: "Target streak tracking alerts", icon: Target }
            ].map((item) => {
              const IconComponent = item.icon;
              return (
                <div key={item.id} className={`flex items-center justify-between p-3.5 ${isDark ? "bg-slate-800/50 border-slate-800" : "bg-slate-50/70 border-slate-200/80"} border rounded-2xl`}>
                  <div className="flex items-center gap-3">
                    <IconComponent size={16} className="text-slate-400" />
                    <div>
                      <p className="text-[13px] font-bold">{item.label}</p>
                      <p className="text-[11px] text-slate-400 font-medium">{item.desc}</p>
                    </div>
                  </div>
                  <input 
                    type="checkbox"
                    checked={notifications[item.id]}
                    onChange={() => setNotifications(prev => ({ ...prev, [item.id]: !prev[item.id] }))}
                    className="w-5 h-5 accent-indigo-600 rounded-md cursor-pointer"
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* 4. AI PREFERENCES */}
        <div className={`${isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"} border rounded-[28px] p-6 shadow-xs space-y-4`}>
          <div className={`flex items-center justify-between border-b ${isDark ? "border-slate-800" : "border-slate-100"} pb-3`}>
            <div className="flex items-center gap-2">
              <Sparkles size={18} className={activeAccent.text} />
              <h3 className="text-sm font-black uppercase tracking-wider">4. AI Preferences</h3>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className={`p-3.5 ${isDark ? "bg-slate-800/50 border-slate-800" : "bg-slate-50/70 border-slate-200/80"} border rounded-2xl space-y-2`}>
              <div className="flex items-center gap-2">
                <Zap size={14} className={activeAccent.text} />
                <label className="text-[12px] font-bold">AI Engine / Model</label>
              </div>
              <select 
                value={aiConfig.model}
                onChange={(e) => setAiConfig(prev => ({ ...prev, model: e.target.value }))}
                className={`w-full ${isDark ? "bg-slate-800 border-slate-700 text-white" : "bg-white border-slate-200 text-slate-700"} border rounded-xl px-3 py-2 text-[12px] font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer`}
              >
                <option value="gemini-1.5-pro">Gemini 1.5 Pro (Recommended)</option>
                <option value="gpt-4o">OpenAI GPT-4o</option>
                <option value="claude-3.5-sonnet">Claude 3.5 Sonnet</option>
              </select>
            </div>

            <div className={`p-3.5 ${isDark ? "bg-slate-800/50 border-slate-800" : "bg-slate-50/70 border-slate-200/80"} border rounded-2xl space-y-2`}>
              <div className="flex items-center gap-2">
                <BookOpen size={14} className={activeAccent.text} />
                <label className="text-[12px] font-bold">Response Length</label>
              </div>
              <select 
                value={aiConfig.responseLength}
                onChange={(e) => setAiConfig(prev => ({ ...prev, responseLength: e.target.value }))}
                className={`w-full ${isDark ? "bg-slate-800 border-slate-700 text-white" : "bg-white border-slate-200 text-slate-700"} border rounded-xl px-3 py-2 text-[12px] font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer`}
              >
                <option value="concise">Concise & Direct</option>
                <option value="detailed">Detailed Technical Explanations</option>
                <option value="comprehensive">Comprehensive Syntheses</option>
              </select>
            </div>

            <div className={`p-3.5 ${isDark ? "bg-slate-800/50 border-slate-800" : "bg-slate-50/70 border-slate-200/80"} border rounded-2xl space-y-2`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sliders size={14} className={activeAccent.text} />
                  <label className="text-[12px] font-bold">Creativity / Temp</label>
                </div>
                <span className={`text-[11px] font-black ${activeAccent.text}`}>{aiConfig.creativity}</span>
              </div>
              <input 
                type="range"
                min="0.1"
                max="1.0"
                step="0.1"
                value={aiConfig.creativity}
                onChange={(e) => setAiConfig(prev => ({ ...prev, creativity: parseFloat(e.target.value) }))}
                className="w-full accent-indigo-600 cursor-pointer pt-1"
              />
            </div>
          </div>
        </div>

        {/* 5. PRIVACY & DATA CONTROLS */}
        <div className={`${isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"} border rounded-[28px] p-6 shadow-xs space-y-4`}>
          <div className={`flex items-center gap-2 border-b ${isDark ? "border-slate-800" : "border-slate-100"} pb-3`}>
            <Shield size={18} className={activeAccent.text} />
            <h3 className="text-sm font-black uppercase tracking-wider">5. Privacy & Data Controls</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            <button 
              onClick={() => triggerToast("Downloading personal study JSON archive...")}
              className={`p-3 ${isDark ? "bg-slate-800/50 border-slate-800 hover:bg-slate-800" : "bg-slate-50/70 border-slate-200/80 hover:bg-slate-100"} border rounded-2xl text-left transition-all cursor-pointer flex items-center justify-between group`}
            >
              <div>
                <p className="text-[12px] font-black">Download Data</p>
                <p className="text-[10px] font-medium text-slate-400">Export notes & logs</p>
              </div>
              <Download size={16} className="text-slate-400 group-hover:text-slate-200" />
            </button>

            <button 
              onClick={() => triggerToast("Chat history cleared!")}
              className={`p-3 ${isDark ? "bg-slate-800/50 border-slate-800" : "bg-slate-50/70 border-slate-200/80"} hover:bg-rose-50/50 dark:hover:bg-rose-950/40 border hover:border-rose-200 dark:hover:border-rose-900 rounded-2xl text-left transition-all cursor-pointer flex items-center justify-between group`}
            >
              <div>
                <p className="text-[12px] font-black group-hover:text-rose-600 dark:group-hover:text-rose-400">Clear Chat History</p>
                <p className="text-[10px] font-medium text-slate-400">Wipe AI logs</p>
              </div>
              <Trash2 size={16} className="text-slate-400 group-hover:text-rose-500" />
            </button>

            <button 
              onClick={() => triggerToast("Study notes cleared!")}
              className={`p-3 ${isDark ? "bg-slate-800/50 border-slate-800" : "bg-slate-50/70 border-slate-200/80"} hover:bg-rose-50/50 dark:hover:bg-rose-950/40 border hover:border-rose-200 dark:hover:border-rose-900 rounded-2xl text-left transition-all cursor-pointer flex items-center justify-between group`}
            >
              <div>
                <p className="text-[12px] font-black group-hover:text-rose-600 dark:group-hover:text-rose-400">Clear Notes</p>
                <p className="text-[10px] font-medium text-slate-400">Delete cached documents</p>
              </div>
              <Trash2 size={16} className="text-slate-400 group-hover:text-rose-500" />
            </button>

            <button 
              onClick={() => triggerToast("Flashcards reset!")}
              className={`p-3 ${isDark ? "bg-slate-800/50 border-slate-800" : "bg-slate-50/70 border-slate-200/80"} hover:bg-rose-50/50 dark:hover:bg-rose-950/40 border hover:border-rose-200 dark:hover:border-rose-900 rounded-2xl text-left transition-all cursor-pointer flex items-center justify-between group`}
            >
              <div>
                <p className="text-[12px] font-black group-hover:text-rose-600 dark:group-hover:text-rose-400">Clear Flashcards</p>
                <p className="text-[10px] font-medium text-slate-400">Reset spaced repetition</p>
              </div>
              <Trash2 size={16} className="text-slate-400 group-hover:text-rose-500" />
            </button>
          </div>
        </div>

        {/* 6. ABOUT */}
        <div className={`${isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"} border rounded-[28px] p-6 shadow-xs space-y-4`}>
          <div className={`flex items-center gap-2 border-b ${isDark ? "border-slate-800" : "border-slate-100"} pb-3`}>
            <Info size={18} className={activeAccent.text} />
            <h3 className="text-sm font-black uppercase tracking-wider">6. About</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            <div className={`p-3.5 ${isDark ? "bg-slate-800/50 border-slate-800" : "bg-slate-50/70 border-slate-200/80"} border rounded-2xl space-y-0.5`}>
              <div className="flex items-center gap-1.5 text-slate-400 text-[11px] font-bold">
                <Info size={13} /> App Version
              </div>
              <p className="text-[13px] font-black">v3.8.2-stable</p>
            </div>

            <button 
              onClick={() => alert("Privacy Policy: All study materials are stored securely.")}
              className={`p-3.5 ${isDark ? "bg-slate-800/50 border-slate-800 hover:bg-slate-800" : "bg-slate-50/70 border-slate-200/80 hover:bg-slate-100"} border rounded-2xl text-left transition-colors cursor-pointer`}
            >
              <div className="flex items-center gap-1.5 text-slate-400 text-[11px] font-bold">
                <Shield size={13} /> Legal
              </div>
              <p className="text-[13px] font-black">Privacy Policy</p>
            </button>

            <button 
              onClick={() => alert("Terms of Service: Authorized personal usage only.")}
              className={`p-3.5 ${isDark ? "bg-slate-800/50 border-slate-800 hover:bg-slate-800" : "bg-slate-50/70 border-slate-200/80 hover:bg-slate-100"} border rounded-2xl text-left transition-colors cursor-pointer`}
            >
              <div className="flex items-center gap-1.5 text-slate-400 text-[11px] font-bold">
                <FileText size={13} /> Terms
              </div>
              <p className="text-[13px] font-black">Terms of Service</p>
            </button>

            <button 
              onClick={() => alert("Direct support link: support@studymate.ai")}
              className={`p-3.5 ${isDark ? "bg-slate-800/50 border-slate-800" : "bg-slate-50/70 border-slate-200/80 hover:bg-slate-100"} hover:border-indigo-300 border rounded-2xl text-left transition-colors cursor-pointer group`}
            >
              <div className="flex items-center gap-1.5 text-slate-400 group-hover:text-indigo-500 text-[11px] font-bold transition-colors">
                <MessageSquare size={13} /> Technical Help
              </div>
              <p className="text-[13px] font-black group-hover:text-indigo-500 transition-colors">Contact Support</p>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}