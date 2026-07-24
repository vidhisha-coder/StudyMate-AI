import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  HelpCircle, 
  Sparkles, 
  ChevronDown, 
  CheckSquare, 
  Square, 
  FileText, 
  ArrowRight, 
  Eye, 
  CheckCircle2, 
  Award, 
  Send,
  X,
  Check,
  XCircle,
  MinusCircle,
  Trash2,
} from "lucide-react";
import {
  generateQuiz,
  submitQuiz,
  getQuizHistory,
} from "../services/quizService";

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

  // Dynamic Quiz History, Single View Modal & View All Modal States
  const [recentQuizzes, setRecentQuizzes] = useState([]);
  const [viewingQuiz, setViewingQuiz] = useState(null);
  const [showAllModal, setShowAllModal] = useState(false);

  // Mock text mapping per document
  const notesTextMap = {
    "Data Structures Notes.pdf": "Arrays, Linked Lists, Trees, and Graphs are fundamental data structures. Time complexity of QuickSort is O(n log n). Stacks follow LIFO and Queues follow FIFO.",
    "Operating Systems Intro.pdf": "An Operating System manages hardware resources. Processes undergo context switching. Deadlocks occur under four Coffman conditions: Mutual Exclusion, Hold and Wait, No Preemption, Circular Wait.",
    "Database Systems Architecture.pdf": "Relational databases use SQL for queries. Normalization reduces redundancy. ACID properties stand for Atomicity, Consistency, Isolation, and Durability."
  };

  // Helper function to extract questions from any history item response
  const extractQuestionsFromItem = (item) => {
    const rawQuestions = item.questionsList || item.questions_data || item.questions || item.quiz_questions || item.items || item.details;
    if (Array.isArray(rawQuestions) && rawQuestions.length > 0) {
      return rawQuestions.map(q => ({
        question: q.question || q.questionText || q.title || "Question Text Unavailable",
        options: q.options || q.choices || [],
        userAnswer: q.userAnswer ?? q.user_answer ?? q.selectedOption ?? null,
        correctAnswer: q.correctAnswer || q.answer || q.correct_answer || ""
      }));
    }
    return null;
  };

  // Fetch Quiz History from Backend API & merge with Local Persistence
  const fetchHistory = async () => {
    try {
      // Load locally stored detailed history first if available
      const storedLocalHistory = JSON.parse(localStorage.getItem("local_quiz_history") || "[]");
      
      const historyData = await getQuizHistory();
      if (Array.isArray(historyData)) {
        setRecentQuizzes(() => {
          return historyData.map((item, idx) => {
            // Try extracting questions from backend object
            let extracted = extractQuestionsFromItem(item);

            // If backend didn't return questions list, check if we saved it in localStorage
            if (!extracted) {
              const matchedLocal = storedLocalHistory.find(
                p => (p.id && item.id && p.id === item.id) || (p.topic === item.topic && p.score === item.score)
              );
              if (matchedLocal && matchedLocal.questionsList) {
                extracted = matchedLocal.questionsList;
              }
            }

            return {
              ...item,
              id: item.id || `quiz-${idx}-${Date.now()}`,
              questionsList: extracted || []
            };
          });
        });
      } else if (storedLocalHistory.length > 0) {
        setRecentQuizzes(storedLocalHistory);
      }
    } catch (err) {
      console.error("Failed to fetch quiz history:", err);
      const storedLocalHistory = JSON.parse(localStorage.getItem("local_quiz_history") || "[]");
      if (storedLocalHistory.length > 0) {
        setRecentQuizzes(storedLocalHistory);
      }
    }
  };

  useEffect(() => {
    fetchHistory();

    const handleSubmittedEvent = () => fetchHistory();
    window.addEventListener("quizSubmitted", handleSubmittedEvent);

    return () => {
      window.removeEventListener("quizSubmitted", handleSubmittedEvent);
    };
  }, []);

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
      const parsedCount = parseInt(numQuestions, 10) || 5;

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

      setQuiz(extractedQuestions.slice(0, parsedCount));

    } catch (err) {
      console.error("Quiz generation error:", err);
      alert("Failed to generate quiz. Check backend connectivity.");
    } finally {
      setLoading(false);
    }
  };

  const handleOptionSelect = (questionIndex, selectedOption) => {
    if (submitted) return;
    setUserAnswers(prev => ({
      ...prev,
      [questionIndex]: selectedOption
    }));
  };

  const handleSubmitQuiz = async () => {
    if (Object.keys(userAnswers).length < quiz.length) {
      alert(`Please answer all ${quiz.length} questions! You have answered only ${Object.keys(userAnswers).length} so far.`);
      return;
    }

    let calculatedScore = 0;

    const formattedQuestionsList = quiz.map((q, idx) => ({
      question: q.question || q.questionText || "Question text missing",
      options: q.options || [],
      userAnswer: userAnswers[idx] || null,
      correctAnswer: q.correctAnswer || q.answer
    }));

    quiz.forEach((q, idx) => {
      const correctAnswer = q.correctAnswer || q.answer;
      if (userAnswers[idx] && correctAnswer && userAnswers[idx] === correctAnswer) {
        calculatedScore++;
      }
    });

    const payload = {
      topic: selectedNotes,
      score: calculatedScore,
      total_questions: quiz.length,
      questions: quiz.length,
      level: difficulty,
      questionsList: formattedQuestionsList
    };

    try {
      await submitQuiz(payload);

      const newQuizHistoryEntry = {
        id: Date.now(),
        topic: selectedNotes,
        name: selectedNotes,
        score: calculatedScore,
        total_questions: quiz.length,
        questions: quiz.length,
        level: difficulty,
        time: "Just now",
        questionsList: formattedQuestionsList
      };

      setRecentQuizzes(prev => {
        const updated = [newQuizHistoryEntry, ...prev];
        localStorage.setItem("local_quiz_history", JSON.stringify(updated));
        return updated;
      });

      setScore(calculatedScore);
      setSubmitted(true);

      alert("✅ Quiz submitted successfully!");
    } catch (err) {
      console.error("Quiz Submit API Error Details:", err.response?.data || err);
      const serverMessage = err.response?.data?.message || err.response?.data?.error || err.message;
      alert(`Failed to save quiz result: ${serverMessage}`);
    }
  };

  const handleDeleteQuizHistory = async (e, quizId) => {
    e.stopPropagation();

    if (!window.confirm("Are you sure you want to delete this quiz record?")) {
      return;
    }

    setRecentQuizzes(prev => {
      const filtered = prev.filter((item, idx) => (item.id || idx) !== quizId);
      localStorage.setItem("local_quiz_history", JSON.stringify(filtered));
      return filtered;
    });
  };

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

              {/* Select Notes Dropdown */}
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

              {/* Number of Questions & Difficulty */}
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

              {/* Question Types */}
              <div className="space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-widest text-slate-400">Question Type</label>
                <div className="flex flex-wrap gap-5 pt-1">
                  <button 
                    type="button" 
                    role="checkbox"
                    aria-checked={questionTypes.mcq}
                    onClick={() => toggleType("mcq")} 
                    className="flex items-center gap-2 group text-slate-700 text-[13.5px] font-bold cursor-pointer"
                  >
                    {questionTypes.mcq ? <CheckSquare size={18} className="text-indigo-600" /> : <Square size={18} className="text-slate-300 group-hover:border-slate-400" />}
                    MCQ
                  </button>

                  <button 
                    type="button" 
                    role="checkbox"
                    aria-checked={questionTypes.trueFalse}
                    onClick={() => toggleType("trueFalse")} 
                    className="flex items-center gap-2 group text-slate-700 text-[13.5px] font-bold cursor-pointer"
                  >
                    {questionTypes.trueFalse ? <CheckSquare size={18} className="text-indigo-600" /> : <Square size={18} className="text-slate-300 group-hover:border-slate-400" />}
                    True / False
                  </button>

                  <button 
                    type="button" 
                    role="checkbox"
                    aria-checked={questionTypes.shortAnswer}
                    onClick={() => toggleType("shortAnswer")} 
                    className="flex items-center gap-2 group text-slate-700 text-[13.5px] font-bold cursor-pointer"
                  >
                    {questionTypes.shortAnswer ? <CheckSquare size={18} className="text-indigo-600" /> : <Square size={18} className="text-slate-300 group-hover:border-slate-400" />}
                    Short Answer
                  </button>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={handleGenerateQuiz}
                disabled={loading}
                className="w-full mt-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-bold text-[14px] py-3.5 rounded-2xl transition-all shadow-md shadow-indigo-600/10 active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
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

          {/* Generated Quiz Section */}
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
                              <div 
                                key={i} 
                                onClick={() => handleOptionSelect(index, option)}
                                className={`flex items-center gap-3 p-3 border rounded-xl cursor-pointer transition-all ${optionStyles}`}
                              >
                                <input 
                                  type="radio" 
                                  name={`q${index}`} 
                                  checked={isSelected}
                                  onChange={() => handleOptionSelect(index, option)}
                                  disabled={submitted}
                                  className="accent-indigo-600 cursor-pointer" 
                                />
                                <span className="text-[13px] text-slate-700">{option}</span>
                              </div>
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
                    onClick={() => {
                      setQuiz([]);
                      setSubmitted(false);
                      setUserAnswers({});
                    }}
                    className="bg-slate-800 hover:bg-slate-900 text-white font-bold text-sm px-6 py-3 rounded-2xl transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <X size={16} />
                    Close / Done
                  </button>
                )}
              </div>

            </div>
          )}

          {/* Recent Quizzes History Stack */}
          <div className="pt-6 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-[15px] font-black text-slate-800 tracking-tight">Recent Quizzes</h3>
              <button 
                onClick={() => setShowAllModal(true)}
                className="text-[12px] font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 transition-colors cursor-pointer"
              >
                View All <ArrowRight size={14} />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-2.5">
              {recentQuizzes.length > 0 ? (
                recentQuizzes.slice(0, 3).map((quizItem, idx) => (
                  <div 
                    key={quizItem.id || idx}
                    onClick={() => setViewingQuiz(quizItem)}
                    className="flex items-center justify-between p-4 bg-slate-50/60 hover:bg-slate-100/80 border border-slate-200/60 rounded-2xl transition-all group cursor-pointer"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-9 h-9 rounded-xl bg-indigo-50 border border-indigo-100/60 flex items-center justify-center text-indigo-600">
                        <FileText size={16} />
                      </div>
                      <div>
                        <h4 className="text-[13.5px] font-bold text-slate-800">
                          {quizItem.name || quizItem.topic || "Untitled Quiz"}
                        </h4>
                        <div className="flex items-center gap-2 text-[11px] font-medium text-slate-400 mt-0.5">
                          <span>{quizItem.questions || `${quizItem.total_questions || 0} Questions`}</span>
                          <span>•</span>
                          <span className="bg-slate-200/60 px-1.5 py-0.2 rounded text-[10px] text-slate-600 font-bold uppercase">
                            {quizItem.level || "Medium"}
                          </span>
                          {quizItem.score !== undefined && (
                            <>
                              <span>•</span>
                              <span className="text-emerald-600 font-bold">
                                Score: {quizItem.score}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-[11px] font-bold text-slate-400">
                        {quizItem.time || "Recently"}
                      </span>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setViewingQuiz(quizItem);
                        }}
                        className="p-2 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-indigo-600 hover:border-indigo-200 shadow-sm transition-all group-hover:scale-105 cursor-pointer"
                        title="View Quiz Answers Review"
                      >
                        <Eye size={15} />
                      </button>
                      <button 
                        onClick={(e) => handleDeleteQuizHistory(e, quizItem.id || idx)}
                        className="p-2 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-rose-600 hover:border-rose-200 shadow-sm transition-all group-hover:scale-105 cursor-pointer"
                        title="Delete Quiz History Record"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm font-medium text-slate-400 py-3">No recent quizzes found.</p>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* POPUP 1: Detailed Review Modal */}
      <AnimatePresence>
        {viewingQuiz && (
          <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white border border-slate-200 rounded-3xl p-6 shadow-2xl max-w-2xl w-full space-y-5 relative max-h-[85vh] flex flex-col"
            >
              {/* Header */}
              <div className="flex justify-between items-start pb-3 border-b border-slate-100 flex-shrink-0">
                <div>
                  <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                    <FileText className="text-indigo-600 w-5 h-5" />
                    {viewingQuiz.name || viewingQuiz.topic || "Quiz Details"}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-slate-400 font-bold mt-1">
                    <span>Date: {viewingQuiz.time || "Recently"}</span>
                    <span>•</span>
                    <span className="text-emerald-600 font-extrabold">
                      Score: {viewingQuiz.score !== undefined ? viewingQuiz.score : 0} / {viewingQuiz.questions || viewingQuiz.total_questions || 5}
                    </span>
                  </div>
                </div>
                <button 
                  onClick={() => setViewingQuiz(null)}
                  className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-all cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Scrollable Questions & Options Detailed History */}
              <div className="overflow-y-auto custom-scrollbar space-y-4 pr-1 flex-1">
                {viewingQuiz.questionsList && viewingQuiz.questionsList.length > 0 ? (
                  viewingQuiz.questionsList.map((q, qIdx) => {
                    const userAns = q.userAnswer;
                    const correctAns = q.correctAnswer;
                    const hasAnswered = userAns !== null && userAns !== undefined && userAns !== "";
                    const isCorrect = hasAnswered && userAns === correctAns;

                    return (
                      <div 
                        key={qIdx}
                        className={`border rounded-2xl p-4 space-y-3 ${
                          !hasAnswered
                            ? "bg-slate-50/70 border-slate-200"
                            : isCorrect 
                              ? "bg-emerald-50/30 border-emerald-200" 
                              : "bg-rose-50/30 border-rose-200"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <h4 className="font-bold text-[13.5px] text-slate-800">
                            Q{qIdx + 1}. {q.question}
                          </h4>
                          {!hasAnswered ? (
                            <span className="flex items-center gap-1 text-[11px] font-black bg-slate-200/80 text-slate-600 px-2.5 py-0.5 rounded-full flex-shrink-0">
                              <MinusCircle size={12} /> Unanswered
                            </span>
                          ) : isCorrect ? (
                            <span className="flex items-center gap-1 text-[11px] font-black bg-emerald-100 text-emerald-700 px-2.5 py-0.5 rounded-full flex-shrink-0">
                              <Check size={12} /> Correct
                            </span>
                          ) : (
                            <span className="flex items-center gap-1 text-[11px] font-black bg-rose-100 text-rose-700 px-2.5 py-0.5 rounded-full flex-shrink-0">
                              <XCircle size={12} /> Incorrect
                            </span>
                          )}
                        </div>

                        {/* Options Breakdown */}
                        {q.options && q.options.length > 0 && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {q.options.map((opt, oIdx) => {
                              const isUserSelection = hasAnswered && userAns === opt;
                              const isRightAnswer = correctAns === opt;

                              let style = "bg-white border-slate-200 text-slate-600";
                              if (isRightAnswer) {
                                style = "bg-emerald-100 border-emerald-400 text-emerald-900 font-bold";
                              } else if (isUserSelection && !isRightAnswer) {
                                style = "bg-rose-100 border-rose-400 text-rose-900 font-bold line-through";
                              }

                              return (
                                <div 
                                  key={oIdx} 
                                  className={`p-2.5 border rounded-xl text-xs flex items-center justify-between ${style}`}
                                >
                                  <span>{opt}</span>
                                  {isUserSelection && (
                                    <span className="text-[10px] font-extrabold uppercase tracking-wider px-1.5 py-0.5 rounded bg-white/60">
                                      Your Choice
                                    </span>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })
                ) : (
                  <div className="py-10 text-center space-y-2">
                    <p className="text-sm font-bold text-slate-600">Question details not saved for this older quiz entry.</p>
                    <p className="text-xs text-slate-400">Future quizzes will automatically preserve all questions and option choices locally.</p>
                  </div>
                )}
              </div>

              <div className="pt-2 flex-shrink-0">
                <button 
                  onClick={() => setViewingQuiz(null)}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-3 rounded-xl transition-all cursor-pointer"
                >
                  Close Review
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* POPUP 2: "View All" History Modal */}
      <AnimatePresence>
        {showAllModal && (
          <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white border border-slate-200 rounded-3xl p-6 shadow-2xl max-w-2xl w-full space-y-4 relative max-h-[85vh] flex flex-col"
            >
              <div className="flex justify-between items-center pb-3 border-b border-slate-100 flex-shrink-0">
                <div>
                  <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                    <HelpCircle className="text-indigo-600 w-5 h-5" />
                    Complete Quiz History
                  </h3>
                  <p className="text-xs text-slate-400 font-medium">All generated diagnostic assessment logs.</p>
                </div>
                <button 
                  onClick={() => setShowAllModal(false)}
                  className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-all cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="overflow-y-auto custom-scrollbar space-y-2.5 pr-1 flex-1">
                {recentQuizzes.length > 0 ? (
                  recentQuizzes.map((quizItem, idx) => {
                    const currentId = quizItem.id || idx;
                    return (
                      <div 
                        key={currentId}
                        onClick={() => {
                          setShowAllModal(false);
                          setViewingQuiz(quizItem);
                        }}
                        className="flex items-center justify-between p-4 bg-slate-50/60 hover:bg-slate-100/80 border border-slate-200/60 rounded-2xl transition-all group cursor-pointer"
                      >
                        <div className="flex items-center gap-3.5">
                          <div className="w-9 h-9 rounded-xl bg-indigo-50 border border-indigo-100/60 flex items-center justify-center text-indigo-600">
                            <FileText size={16} />
                          </div>
                          <div>
                            <h4 className="text-[13.5px] font-bold text-slate-800">
                              {quizItem.name || quizItem.topic || "Untitled Quiz"}
                            </h4>
                            <div className="flex items-center gap-2 text-[11px] font-medium text-slate-400 mt-0.5">
                              <span>{quizItem.questions || `${quizItem.total_questions || 0} Questions`}</span>
                              <span>•</span>
                              <span className="bg-slate-200/60 px-1.5 py-0.2 rounded text-[10px] text-slate-600 font-bold uppercase">
                                {quizItem.level || "Medium"}
                              </span>
                              {quizItem.score !== undefined && (
                                <>
                                  <span>•</span>
                                  <span className="text-emerald-600 font-bold">
                                    Score: {quizItem.score}
                                  </span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="text-[11px] font-bold text-slate-400">
                            {quizItem.time || "Recently"}
                          </span>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              setShowAllModal(false);
                              setViewingQuiz(quizItem);
                            }}
                            className="p-2 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-indigo-600 hover:border-indigo-200 shadow-sm transition-all group-hover:scale-105 cursor-pointer"
                            title="View Quiz Answers Review"
                          >
                            <Eye size={15} />
                          </button>
                          <button 
                            onClick={(e) => handleDeleteQuizHistory(e, currentId)}
                            className="p-2 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-rose-600 hover:border-rose-200 shadow-sm transition-all group-hover:scale-105 cursor-pointer"
                            title="Delete Quiz History Record"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-sm font-medium text-slate-400 py-6 text-center">No quiz history records available.</p>
                )}
              </div>

              <div className="pt-2 flex-shrink-0">
                <button 
                  onClick={() => setShowAllModal(false)}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-3 rounded-xl transition-all cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}