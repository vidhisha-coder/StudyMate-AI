import React, { useState } from "react";
import { motion } from "framer-motion";
import { HelpCircle, Sparkles, ChevronDown, CheckSquare, Square, FileText, ArrowRight, Eye, CheckCircle2, Award, RotateCcw, Send } from "lucide-react";
import { generateQuiz } from "../services/quizService";

export default function Quiz() {
  // Form Configuration States
  const [selectedNotes, setSelectedNotes] = useState("Data Structures Notes.pdf");
  const [numQuestions, setNumQuestions] = useState("5 Questions");
  const [difficulty, setDifficulty] = useState("Medium");
  
  // Question Type Checkbox States
  const [questionTypes, setQuestionTypes] = useState({
    mcq: true,
    trueFalse: true,
    shortAnswer: true,
  });

  const [loading, setLoading] = useState(false);
  const [quiz, setQuiz] = useState([]);
  
  // States for Submitting Quiz & Tracking Answers
  const [userAnswers, setUserAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  // Mock text mapping per document (Replace this with dynamic context from Upload/Notes state or localStorage)
  const notesTextMap = {
    "Data Structures Notes.pdf": "Arrays, Linked Lists, Trees, and Graphs are fundamental data structures. Time complexity of QuickSort is O(n log n). Stacks follow LIFO and Queues follow FIFO.",
    "Operating Systems Intro.pdf": "An Operating System manages hardware resources. Processes undergo context switching. Deadlocks occur under four Coffman conditions: Mutual Exclusion, Hold and Wait, No Preemption, Circular Wait.",
    "Database Systems Architecture.pdf": "Relational databases use SQL for queries. Normalization reduces redundancy. ACID properties stand for Atomicity, Consistency, Isolation, and Durability."
  };

  const toggleType = (key) => {
    setQuestionTypes(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleGenerateQuiz = async () => {
    try {
      setLoading(true);
      setSubmitted(false);
      setUserAnswers({});
      setScore(0);

      const contextText = notesTextMap[selectedNotes] || "General computer science fundamentals and core programming concepts.";
      
      // Pure integer parse e.g. "5 Questions" -> 5
      const parsedCount = parseInt(numQuestions, 10) || 5;

      // Backend API Call with alias keys
      const data = await generateQuiz({
        text: contextText,
        numQuestions: parsedCount,
        questionsCount: parsedCount,
        count: parsedCount,
        difficulty: difficulty,
        questionTypes: questionTypes
      });

      let extractedQuestions = [];

      if (Array.isArray(data)) {
        extractedQuestions = data;
      } else if (data && data.questions) {
        extractedQuestions = data.questions;
      }

      // STRICT LIMIT: Selected count tak hi render honge
      setQuiz(extractedQuestions.slice(0, parsedCount));

    } catch (err) {
      console.error("Quiz generation error:", err);
      alert("Failed to generate quiz. Check backend connectivity.");
    } finally {
      setLoading(false);
    }
  };

  // Track answer selection
  const handleOptionSelect = (questionIndex, selectedOption) => {
    if (submitted) return; // Prevent changing answer after submit
    setUserAnswers(prev => ({
      ...prev,
      [questionIndex]: selectedOption
    }));
  };

  // Calculate and Submit Quiz
  const handleSubmitQuiz = () => {
    if (Object.keys(userAnswers).length < quiz.length) {
      const confirmSubmit = window.confirm("Aapne saare questions answer nahi kiye hain. Kya aap fir bhi submit karna chahte ho?");
      if (!confirmSubmit) return;
    }

    let calculatedScore = 0;
    quiz.forEach((q, idx) => {
      const correctAnswer = q.correctAnswer || q.answer;
      if (userAnswers[idx] && correctAnswer && userAnswers[idx] === correctAnswer) {
        calculatedScore += 1;
      }
    });

    setScore(calculatedScore);
    setSubmitted(true);
  };

  // Mock Recent Quizzes History
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
          
          {/* Main Form Block */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start pb-8 border-b border-slate-200/60">
            
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
                    <option value="Data Structures Notes.pdf">Data Structures Notes.pdf</option>
                    <option value="Operating Systems Intro.pdf">Operating Systems Intro.pdf</option>
                    <option value="Database Systems Architecture.pdf">Database Systems Architecture.pdf</option>
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
                      <option value="5 Questions">5 Questions</option>
                      <option value="10 Questions">10 Questions</option>
                      <option value="15 Questions">15 Questions</option>
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
                      <option value="Easy">Easy</option>
                      <option value="Medium">Medium</option>
                      <option value="Hard">Hard</option>
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

              {/* Action Button */}
              <button
                onClick={handleGenerateQuiz}
                disabled={loading}
                className="w-full mt-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-bold text-[14px] py-3.5 rounded-2xl transition-all shadow-md shadow-indigo-600/10 active:scale-[0.99] flex items-center justify-center gap-2"
              >
                {loading && <Sparkles size={16} className="animate-spin" />}
                {loading ? "Constructing Diagnostic System..." : "Generate Quiz"}
              </button>
            </div>

            {/* Right Vector Block */}
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
              
              <div className="flex items-center justify-between flex-wrap gap-3">
                <h3 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                  <CheckCircle2 className="text-emerald-500 w-5 h-5" />
                  Generated Assessment ({quiz.length} Questions)
                </h3>

                {submitted && (
                  <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-1.5 rounded-full font-bold text-sm">
                    <Award size={18} />
                    Score: {score} / {quiz.length} ({Math.round((score / quiz.length) * 100)}%)
                  </div>
                )}
              </div>

              {/* Questions List */}
              <div className="grid grid-cols-1 gap-5">
                {quiz.map((q, index) => {
                  const isCorrect = submitted && userAnswers[index] === (q.correctAnswer || q.answer);
                  
                  return (
                    <div 
                      key={index} 
                      className={`border rounded-2xl p-5 space-y-3 transition-all ${
                        submitted 
                          ? isCorrect 
                            ? "bg-emerald-50/40 border-emerald-200" 
                            : "bg-rose-50/40 border-rose-200"
                          : "bg-slate-50/70 border-slate-200"
                      }`}
                    >
                      <h4 className="font-bold text-[14.5px] text-slate-800">
                        Q{index + 1}. {q.question || q.questionText || "Question text missing"}
                      </h4>

                      {/* Options */}
                      {q.options && Array.isArray(q.options) && q.options.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                          {q.options.map((option, i) => {
                            const isSelected = userAnswers[index] === option;
                            const isAnswerKey = (q.correctAnswer || q.answer) === option;

                            let optionStyles = "bg-white border-slate-200/80 hover:border-indigo-300";
                            if (isSelected) optionStyles = "bg-indigo-50/80 border-indigo-500 font-bold text-indigo-900";
                            if (submitted) {
                              if (isAnswerKey) optionStyles = "bg-emerald-100 border-emerald-500 text-emerald-900 font-bold";
                              else if (isSelected && !isAnswerKey) optionStyles = "bg-rose-100 border-rose-400 text-rose-900 font-bold line-through";
                            }

                            return (
                              <label 
                                key={i} 
                                onClick={() => handleOptionSelect(index, option)}
                                className={`flex items-center gap-3 p-3 border rounded-xl cursor-pointer transition-all ${optionStyles}`}
                              >
                                <input 
                                  type="radio" 
                                  name={`q${index}`} 
                                  checked={isSelected}
                                  onChange={() => {}}
                                  disabled={submitted}
                                  className="accent-indigo-600" 
                                />
                                <span className="text-[13px] text-slate-700">{option}</span>
                              </label>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Submit & Retake Actions */}
              <div className="pt-4 flex justify-end gap-3">
                {!submitted ? (
                  <button
                    onClick={handleSubmitQuiz}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm px-8 py-3.5 rounded-2xl shadow-lg shadow-emerald-600/20 active:scale-[0.98] transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <Send size={16} />
                    Submit Assessment
                  </button>
                ) : (
                  <button
                    onClick={handleGenerateQuiz}
                    className="bg-slate-800 hover:bg-slate-900 text-white font-bold text-sm px-6 py-3 rounded-2xl transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <RotateCcw size={16} />
                    Retake / Regenerate
                  </button>
                )}
              </div>

            </div>
          )}

          {/* Bottom Workspace Row: History Logger Stack */}
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