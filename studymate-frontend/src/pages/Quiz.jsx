import React, { useState } from "react";
import { motion } from "framer-motion";
import { HelpCircle, Sparkles, ChevronDown, CheckSquare, Square, FileText, ArrowRight, Eye, CheckCircle2 } from "lucide-react";
import { generateQuiz } from "../services/quizService";

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
  const [quiz, setQuiz] = useState([]);

  // Mock text mapping per document (Replace this with dynamic context from Upload/Notes state or localStorage)
  const notesTextMap = {
    "Data Structures Notes.pdf": "Arrays, Linked Lists, Trees, and Graphs are fundamental data structures. Time complexity of QuickSort is O(n log n). Stacks follow LIFO and Queues follow FIFO.",
    "Operating Systems Intro.pdf": "An Operating System manages hardware resources. Processes undergo context switching. Deadlocks occur under four Coffman conditions: Mutual Exclusion, Hold and Wait, No Preemption, Circular Wait.",
    "Database Systems Architecture.pdf": "Relational databases use SQL for queries. Normalization reduces redundancy. ACID properties stand for Atomicity, Consistency, Isolation, and Durability."
  };

  // Toggle handlers for custom styled checkboxes
  const toggleType = (key) => {
    setQuestionTypes(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleGenerateQuiz = async () => {
    try {
      setLoading(true);

      // Extract raw text for selected document
      const contextText = notesTextMap[selectedNotes] || "General computer science fundamentals and core programming concepts.";

      // Extract numeric count (e.g. "10 Questions" -> 10)
      const parsedCount = parseInt(numQuestions) || 10;

      // Call Backend API
      const data = await generateQuiz({
        text: contextText,
        numQuestions: parsedCount,
        difficulty: difficulty,
        questionTypes: questionTypes
      });

      // Handle both raw array response or object wrapper like { questions: [...] }
      if (Array.isArray(data)) {
        setQuiz(data);
      } else if (data && data.questions) {
        setQuiz(data.questions);
      } else {
        setQuiz([]);
      }

    } catch (err) {
      console.error("Quiz generation error:", err);
      alert("Failed to generate quiz. Check backend connectivity.");
    } finally {
      setLoading(false);
    }
  };

  // Mock Recent Quizzes History from the image reference
  const recentQuizzes = [
    { name: "Data Structures Quiz", questions: "10 Questions", level: "Medium", time: "2h ago" },
    { name: "DBMS Quiz", questions: "15 Questions", level: "Easy", time: "5d ago" }
  ];

  return (
    <div className="w-full h-full grid grid-rows-[auto_1fr] overflow-hidden px-6 pt-5 pb-6 gap-5 box-border">
      
      {/* Page Header */}
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
        
        {/* Structural Card Container */}
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
                  
                  <button type="button" onClick={() => toggleType("mcq")} className="flex items-center gap-2 group text-slate-700 text-[13.5px] font-bold">
                    {questionTypes.mcq ? <CheckSquare size={18} className="text-indigo-600" /> : <Square size={18} className="text-slate-300 group-hover:border-slate-400" />}
                    MCQ
                  </button>

                  <button type="button" onClick={() => toggleType("trueFalse")} className="flex items-center gap-2 group text-slate-700 text-[13.5px] font-bold">
                    {questionTypes.trueFalse ? <CheckSquare size={18} className="text-indigo-600" /> : <Square size={18} className="text-slate-300 group-hover:border-slate-400" />}
                    True / False
                  </button>

                  <button type="button" onClick={() => toggleType("shortAnswer")} className="flex items-center gap-2 group text-slate-700 text-[13.5px] font-bold">
                    {questionTypes.shortAnswer ? <CheckSquare size={18} className="text-indigo-600" /> : <Square size={18} className="text-slate-300 group-hover:border-slate-400" />}
                    Short Answer
                  </button>
                  
                </div>
              </div>

              {/* Action Trigger Button */}
              <button
                onClick={handleGenerateQuiz}
                disabled={loading}
                className="w-full mt-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-bold text-[14px] py-3.5 rounded-2xl transition-all shadow-md shadow-indigo-600/10 active:scale-[0.99] flex items-center justify-center gap-2"
              >
                {loading && <Sparkles size={16} className="animate-spin" />}
                {loading ? "Constructing Diagnostic System..." : "Generate Quiz"}
              </button>
            </div>

            {/* Right Vector Graphic Block */}
            <div className="hidden md:flex justify-center items-center h-full pt-10 select-none">
              <div className="relative group">
                <div className="absolute inset-0 bg-indigo-500/10 rounded-full blur-2xl opacity-60 scale-75 group-hover:scale-90 transition-transform duration-300"></div>
                <div className="bg-gradient-to-tr from-indigo-50 to-indigo-100/40 p-6 rounded-3xl border border-indigo-200/40 shadow-sm relative z-10">
                  <div className="w-32 h-40 bg-white border border-slate-200 rounded-2xl p-3 flex flex-col gap-2.5 relative shadow-sm">
                    <div className="w-8 h-2.5 bg-indigo-600/20 rounded self-center mb-1"></div>
                    {[1, 2, 3].map(i => (
                      <div key={i} className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded bg-indigo-500 flex items-center justify-center text-[8px] text-white font-black">✓</div>
                        <div className={`h-1.5 bg-slate-200 rounded flex-1 ${i === 1 ? 'w-12' : i === 2 ? 'w-16' : 'w-8'}`}></div>
                      </div>
                    ))}
                    <div className="absolute right-[-10px] bottom-6 w-4 h-16 bg-gradient-to-b from-amber-400 to-orange-500 rounded-full transform rotate-45 border-2 border-white shadow-md"></div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Generated Quiz Container Section */}
          {quiz.length > 0 && (
            <div className="py-8 border-b border-slate-200/60 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                  <CheckCircle2 className="text-emerald-500 w-5 h-5" />
                  Generated Quiz ({quiz.length} Questions)
                </h3>
                <span className="text-xs font-bold bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full border border-indigo-100">
                  Source: {selectedNotes}
                </span>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {quiz.map((q, index) => (
                  <div key={index} className="bg-slate-50/70 border border-slate-200 rounded-2xl p-5 space-y-3">
                    <h4 className="font-bold text-[14.5px] text-slate-800">
                      Q{index + 1}. {q.question || q.questionText || "Question text missing"}
                    </h4>

                    {/* Render Options if MCQ */}
                    {q.options && Array.isArray(q.options) && q.options.length > 0 && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                        {q.options.map((option, i) => (
                          <label key={i} className="flex items-center gap-3 p-2.5 bg-white border border-slate-200/80 rounded-xl cursor-pointer hover:border-indigo-300 transition-colors">
                            <input type="radio" name={`q${index}`} className="accent-indigo-600" />
                            <span className="text-[13px] font-medium text-slate-700">{option}</span>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Bottom Workspace Row: History Logger Stack ("Recent Quizzes") */}
          <div className="pt-6 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-[15px] font-black text-slate-800 tracking-tight">Recent Quizzes</h3>
              <button className="text-[12px] font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 transition-colors">
                View All <ArrowRight size={14} />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-2.5">
              {recentQuizzes.map((quizItem, idx) => (
                <div 
                  key={idx}
                  className="flex items-center justify-between p-4 bg-slate-50/60 hover:bg-slate-50 border border-slate-200/60 rounded-2xl transition-all group"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-9 h-9 rounded-xl bg-indigo-50 border border-indigo-100/60 flex items-center justify-center text-indigo-600">
                      <FileText size={16} />
                    </div>
                    <div>
                      <h4 className="text-[13.5px] font-bold text-slate-800">{quizItem.name}</h4>
                      <div className="flex items-center gap-2 text-[11px] font-medium text-slate-400 mt-0.5">
                        <span>{quizItem.questions}</span>
                        <span>•</span>
                        <span className="bg-slate-200/60 px-1.5 py-0.2 rounded text-[10px] text-slate-600 font-bold uppercase">{quizItem.level}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="text-[11px] font-bold text-slate-400">{quizItem.time}</span>
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