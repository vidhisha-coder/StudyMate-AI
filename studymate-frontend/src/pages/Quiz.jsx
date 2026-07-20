import React, { useState } from "react";
import { motion } from "framer-motion";
import { HelpCircle, Sparkles, ChevronDown, CheckSquare, Square, FileText, ArrowRight, Eye } from "lucide-react";

export default function Quiz() {
  // Form Configuration States
  const [selectedNotes, setSelectedNotes] = useState("Data Structures Notes.pdf");
  const [numQuestions, setNumQuestions] = useState("10 Questions");
  const [difficulty, setDifficulty] = useState("Medium");
  
  // Question Type Checkbox States
  const [questionTypes, setQuestionTypes] = useState({
    mcq: true,
    trueFalse: true,
    shortAnswer: true,
  });

  const [loading, setLoading] = useState(false);

  // Toggle handlers for custom styled checkboxes
  const toggleType = (key) => {
    setQuestionTypes(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleGenerateQuiz = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert("Quiz compiled successfully with your custom constraints!");
    }, 1200);
  };

  // Mock Recent Quizzes History from the image reference
  const recentQuizzes = [
    { name: "Data Structures Quiz", questions: "10 Questions", level: "Medium", time: "2h ago" },
    { name: "DBMS Quiz", questions: "15 Questions", level: "Easy", time: "5d ago" }
  ];

  return (
    <div className="w-full h-full grid grid-rows-[auto_1fr] overflow-hidden px-6 pt-5 pb-6 gap-5 box-border">
      
      {/* Page Header (Keeps consistency across tabs) */}
      <div className="w-full flex items-start justify-between gap-4 self-start flex-shrink-0">
        <div>
          <h1 className="text-2xl md:text-[28px] font-black tracking-tight text-slate-900 flex items-center gap-3 leading-none">
            <HelpCircle className="text-indigo-600 w-7 h-7 flex-shrink-0" />
            Evaluation Engine
          </h1>
          <p className="text-slate-400 font-medium text-[13px] mt-1.5 leading-tight">
            Generate synthetic diagnostic testing assessments filtered directly by your dynamic context notes.
          </p>
        </div>
      </div>

      {/* Independent Scrolling Content Body Frame Area */}
      <div className="w-full h-full overflow-y-auto custom-scrollbar min-h-0 space-y-6 pr-1">
        
        {/* Structural Card Container matching the reference format in Light-Theme Layout */}
        <div className="bg-white border border-slate-200 rounded-[32px] p-8 shadow-sm relative overflow-hidden">
          
          {/* Main Columns: Form on Left, Graphic Illustration on Right */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start pb-8 border-b border-slate-200/60">
            
            {/* Left / Middle: Core Form Configuration Stack */}
            <div className="md:col-span-2 space-y-5">
              <div>
                <h2 className="text-[22px] font-black text-slate-900 tracking-tight">Generate Quiz</h2>
                <p className="text-slate-400 font-medium text-[13px] mt-0.5">Create quizzes directly from your notes context.</p>
              </div>

              {/* 1. Select Notes Dropdown */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold uppercase tracking-widest text-slate-400">Select Notes</label>
                <div className="relative">
                  <select 
                    value={selectedNotes}
                    onChange={(e) => setSelectedNotes(e.target.value)}
                    className="w-full bg-slate-50/70 border border-slate-200 rounded-2xl px-4 py-3 text-[13.5px] font-bold text-slate-700 appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/80 transition-all cursor-pointer"
                  >
                    <option>Data Structures Notes.pdf</option>
                    <option>Operating Systems Intro.pdf</option>
                    <option>Database Systems Architecture.pdf</option>
                  </select>
                  <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>
              </div>

              {/* 2. Number of Questions & Difficulty Dual Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-widest text-slate-400">Number of Questions</label>
                  <div className="relative">
                    <select 
                      value={numQuestions}
                      onChange={(e) => setNumQuestions(e.target.value)}
                      className="w-full bg-slate-50/70 border border-slate-200 rounded-2xl px-4 py-3 text-[13.5px] font-bold text-slate-700 appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/80 transition-all cursor-pointer"
                    >
                      <option>5 Questions</option>
                      <option>10 Questions</option>
                      <option>15 Questions</option>
                    </select>
                  <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-widest text-slate-400">Difficulty Level</label>
                  <div className="relative">
                    <select 
                      value={difficulty}
                      onChange={(e) => setDifficulty(e.target.value)}
                      className="w-full bg-slate-50/70 border border-slate-200 rounded-2xl px-4 py-3 text-[13.5px] font-bold text-slate-700 appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/80 transition-all cursor-pointer"
                    >
                      <option>Easy</option>
                      <option>Medium</option>
                      <option>Hard</option>
                    </select>
                    <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* 3. Question Type Checkbox Row Inline Filter */}
              <div className="space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-widest text-slate-400">Question Type</label>
                <div className="flex flex-wrap gap-5 pt-1">
                  
                  <button onClick={() => toggleType("mcq")} className="flex items-center gap-2 group text-slate-700 text-[13.5px] font-bold">
                    {questionTypes.mcq ? <CheckSquare size={18} className="text-indigo-600" /> : <Square size={18} className="text-slate-300 group-hover:border-slate-400" />}
                    MCQ
                  </button>

                  <button onClick={() => toggleType("trueFalse")} className="flex items-center gap-2 group text-slate-700 text-[13.5px] font-bold">
                    {questionTypes.trueFalse ? <CheckSquare size={18} className="text-indigo-600" /> : <Square size={18} className="text-slate-300 group-hover:border-slate-400" />}
                    True / False
                  </button>

                  <button onClick={() => toggleType("shortAnswer")} className="flex items-center gap-2 group text-slate-700 text-[13.5px] font-bold">
                    {questionTypes.shortAnswer ? <CheckSquare size={18} className="text-indigo-600" /> : <Square size={18} className="text-slate-300 group-hover:border-slate-400" />}
                    Short Answer
                  </button>
                  
                </div>
              </div>

              {/* Action Trigger Button */}
              <button
                onClick={handleGenerateQuiz}
                disabled={loading}
                className="w-full mt-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-[14px] py-3.5 rounded-2xl transition-all shadow-md shadow-indigo-600/10 active:scale-[0.99] flex items-center justify-center gap-2"
              >
                {loading && <Sparkles size={16} className="animate-spin" />}
                {loading ? "Constructing Diagnostic System..." : "Generate Quiz"}
              </button>
            </div>

            {/* Right Vector Block: Matching the 3D Clipboard Graphic Element */}
            <div className="hidden md:flex justify-center items-center h-full pt-10 select-none">
              <div className="relative group">
                {/* Soft underlying accent ambient shadow */}
                <div className="absolute inset-0 bg-indigo-500/10 rounded-full blur-2xl opacity-60 scale-75 group-hover:scale-90 transition-transform duration-300"></div>
                
                <div className="bg-gradient-to-tr from-indigo-50 to-indigo-100/40 p-6 rounded-3xl border border-indigo-200/40 shadow-sm relative z-10">
                  {/* Simulated Minimalist Dashboard Card Graphic */}
                  <div className="w-32 h-40 bg-white border border-slate-200 rounded-2xl p-3 flex flex-col gap-2.5 relative shadow-sm">
                    <div className="w-8 h-2.5 bg-indigo-600/20 rounded self-center mb-1"></div>
                    {[1, 2, 3].map(i => (
                      <div key={i} className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded bg-indigo-500 flex items-center justify-center text-[8px] text-white font-black">✓</div>
                        <div className={`h-1.5 bg-slate-200 rounded flex-1 ${i === 1 ? 'w-12' : i === 2 ? 'w-16' : 'w-8'}`}></div>
                      </div>
                    ))}
                    {/* Floating simulated diagonal pen indicator element */}
                    <div className="absolute right-[-10px] bottom-6 w-4 h-16 bg-gradient-to-b from-amber-400 to-orange-500 rounded-full transform rotate-45 border-2 border-white shadow-md"></div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Workspace Row: History Logger Stack ("Recent Quizzes") */}
          <div className="pt-6 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-[15px] font-black text-slate-800 tracking-tight">Recent Quizzes</h3>
              <button className="text-[12px] font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 transition-colors">
                View All <ArrowRight size={14} />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-2.5">
              {recentQuizzes.map((quiz, idx) => (
                <div 
                  key={idx}
                  className="flex items-center justify-between p-4 bg-slate-50/60 hover:bg-slate-50 border border-slate-200/60 rounded-2xl transition-all group"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-9 h-9 rounded-xl bg-indigo-50 border border-indigo-100/60 flex items-center justify-center text-indigo-600">
                      <FileText size={16} />
                    </div>
                    <div>
                      <h4 className="text-[13.5px] font-bold text-slate-880 text-slate-800">{quiz.name}</h4>
                      <div className="flex items-center gap-2 text-[11px] font-medium text-slate-400 mt-0.5">
                        <span>{quiz.questions}</span>
                        <span>•</span>
                        <span className="bg-slate-200/60 px-1.5 py-0.2 rounded text-[10px] text-slate-600 font-bold uppercase">{quiz.level}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="text-[11px] font-bold text-slate-400">{quiz.time}</span>
                    <button className="p-2 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-indigo-600 hover:border-indigo-100 shadow-sm transition-all opacity-80 group-hover:opacity-100">
                      <Eye size={15} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}