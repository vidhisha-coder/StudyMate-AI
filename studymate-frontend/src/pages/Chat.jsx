import { askAI } from "../services/chatService";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sparkles, 
  Send, 
  Bot, 
  User, 
  Paperclip, 
  ShieldCheck, 
  History, 
  Trash2,
  Clock,
  MessageSquare,
  Plus,
  X
} from "lucide-react";

export default function Chat() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const chatContainerRef = useRef(null);

  // Active Chat Session Messages
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hello Rudra! I am your AI core assistant runtime tutor module. Paste an architectural target matrix, request a conceptual code breakdown for your projects, or test your current comprehension logs here.",
    }
  ]);

  // Saved Chat Sessions History (Mock / Local State)
  const [chatHistory, setChatHistory] = useState([
    {
      id: "session-1",
      title: "React Full-Stack Rendering Breakdown",
      date: "Yesterday, 4:15 PM",
      messages: [
        { role: "user", content: "Deconstruct Full-Stack React Rendering" },
        { role: "assistant", content: "React rendering involves client-side hydration, server components, and virtual DOM diffing..." }
      ]
    },
    {
      id: "session-2",
      title: "B-Tree Node Balancing Steps",
      date: "Jul 20, 2026",
      messages: [
        { role: "user", content: "Explain B-Tree Node Balancing Steps" },
        { role: "assistant", content: "B-Trees balance through node splitting when keys exceed M-1..." }
      ]
    }
  ]);

  const quickPrompts = [
    "Deconstruct Full-Stack React Rendering",
    "Explain B-Tree Node Balancing Steps",
    "Simulate a Technical Placement Mock Question"
  ];

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, loading]);

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!input.trim() || loading) return;

    const userMsg = input;
    setInput("");

    setMessages((prev) => [
      ...prev,
      { role: "user", content: userMsg },
    ]);

    setLoading(true);

    try {
      const aiReply = await askAI(userMsg);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: aiReply.response,
        },
      ]);
    } catch (err) {
      console.error(err);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            err.response?.data?.detail ||
            "Something went wrong while contacting the AI.",
        },
      ]);
    }

    setLoading(false);
  };

  const clearChatLogs = () => {
    setMessages([
      {
        role: "assistant",
        content: "Chat log cache flush completed. Diagnostic context reset. How can I help you learn today?",
      }
    ]);
  };

  // Restore a previous chat session
  const loadPastChat = (session) => {
    setMessages(session.messages);
    setShowHistoryModal(false);
  };

  // Start a brand new session
  const startNewChat = () => {
    clearChatLogs();
    setShowHistoryModal(false);
  };

  return (
    <div className="w-full h-full grid grid-rows-[auto_1fr] overflow-hidden px-6 pt-5 pb-6 gap-5 box-border relative">
      
      {/* 1. Header Section */}
      <div className="w-full flex items-start justify-between gap-4 self-start">
        <div>
          <h1 className="text-2xl md:text-[28px] font-black tracking-tight text-slate-900 flex items-center gap-2.5 leading-none">
            <Bot className="text-indigo-600 w-7 h-7 flex-shrink-0" />
            AI Tutor Core
          </h1>
          <p className="text-slate-400 font-medium text-[13px] mt-1.5 leading-tight">
            Engage with dedicated real-time analytical feedback streams customized to your learning files.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <button 
            onClick={() => setShowHistoryModal(true)}
            className="px-4 py-2 bg-indigo-50 border border-indigo-200/60 hover:bg-indigo-100/70 text-indigo-700 font-bold text-[12px] rounded-xl flex items-center gap-1.5 transition-all active:scale-[0.98] shadow-sm"
          >
            <Clock size={14} /> Chat History
          </button>

          <button 
            onClick={clearChatLogs}
            className="px-4 py-2 bg-white border border-slate-200 hover:border-slate-300 text-slate-500 hover:text-rose-600 font-bold text-[12px] rounded-xl flex items-center gap-1.5 transition-all active:scale-[0.98] shadow-sm"
          >
            <Trash2 size={14} /> Clear System History
          </button>
        </div>
      </div>

      {/* 2. Main Workspace */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-5 overflow-hidden min-h-0 h-full">
        
        {/* Left Action Sidebar Panel */}
        <div className="w-full h-full bg-white border border-slate-200 rounded-[32px] p-6 shadow-sm grid grid-rows-[1fr_auto] overflow-hidden min-h-0">
          <div className="flex flex-col overflow-y-auto pr-1 space-y-5 min-h-0">
            <div className="flex items-center gap-2 flex-shrink-0">
              <History size={16} className="text-indigo-600" />
              <h2 className="text-[15px] font-black text-slate-900 tracking-tight">Suggested Pathways</h2>
            </div>

            <p className="text-slate-400 font-medium text-[12px] leading-relaxed flex-shrink-0">
              Select an intentional processing objective macro vector below to automatically seed the conversational core with targeted structures:
            </p>

            <div className="flex flex-col gap-2.5">
              {quickPrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setInput(prompt)}
                  className="w-full text-left p-3.5 bg-slate-50/70 hover:bg-indigo-50/50 border border-slate-200/60 hover:border-indigo-200/60 text-slate-700 hover:text-indigo-700 text-[13px] font-bold rounded-2xl transition-all active:scale-[0.99]"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-slate-200 flex items-center gap-2 text-slate-500">
            <ShieldCheck size={16} className="text-emerald-500" />
            <span className="text-[11px] font-bold uppercase tracking-wider">Placement Track Active</span>
          </div>
        </div>

        {/* Right Chat Terminal Interface */}
        <div className="h-full grid grid-rows-[1fr_auto] rounded-[32px] border border-slate-200 bg-white shadow-sm overflow-hidden min-h-0">
          
          {/* Scrollable View Containment Area */}
          <div 
            ref={chatContainerRef} 
            className="overflow-y-auto p-6 space-y-4 bg-slate-50/50 min-h-0 w-full relative"
          >
            <AnimatePresence initial={false}>
              {messages.map((msg, idx) => {
                const messageId = `msg-${idx}-${msg.role}`;
                const isUser = msg.role === "user";

                return (
                  <div
                    key={messageId}
                    className={`w-full flex gap-3 min-w-0 ${
                      isUser ? "justify-end" : "justify-start"
                    }`}
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                      className={`flex gap-3 max-w-[85%] md:max-w-[75%] min-w-0 ${
                        isUser ? "flex-row-reverse" : "flex-row"
                      }`}
                    >
                      {/* Avatar Cluster */}
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 border select-none ${
                        isUser 
                          ? "bg-slate-100 border-slate-200 text-slate-700" 
                          : "bg-indigo-50 border-indigo-100 text-indigo-600"
                      }`}>
                        {isUser ? <User size={14} /> : <Bot size={14} />}
                      </div>

                      {/* Bubble Copy */}
                      <div className={`px-5 py-3 rounded-2xl text-[13.5px] font-medium leading-relaxed tracking-tight border break-words overflow-wrap-anywhere min-w-0 ${
                        isUser
                          ? "bg-indigo-600 text-white border-indigo-700 shadow-sm"
                          : "bg-white border-slate-200 text-slate-800"
                      }`}>
                        {msg.content}
                      </div>
                    </motion.div>
                  </div>
                );
              })}

              {/* Thinking State Animation Container */}
              {loading && (
                <div className="w-full flex justify-start min-w-0">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex gap-3 max-w-[85%] min-w-0"
                  >
                    <div className="w-8 h-8 rounded-xl bg-indigo-50 border flex items-center justify-center text-indigo-600 select-none">
                      <Sparkles size={14} className="animate-pulse" />
                    </div>
                    <div className="bg-white border border-slate-200 rounded-2xl px-5 py-3 flex items-center gap-1.5 shadow-sm">
                      <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                      <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                      <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></span>
                    </div>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-slate-200">
            <form onSubmit={handleSendMessage} className="relative flex items-center w-full">
              <button 
                type="button"
                className="absolute left-4 text-slate-400 hover:text-slate-600 p-1 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <Paperclip size={16} />
              </button>
              
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask anything..."
                className="w-full bg-white border border-slate-200 rounded-2xl pl-12 pr-24 py-3.5 text-[13.5px] font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm"
              />

              <div className="absolute right-3 flex items-center gap-2">
                <span className="hidden md:block text-xs text-slate-400 font-medium select-none">
                  Enter
                </span>
                <button
                  type="submit"
                  disabled={!input.trim() || loading}
                  className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white p-2 rounded-xl transition-all flex items-center justify-center shadow-sm disabled:shadow-none"
                >
                  <Send size={16} />
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>

      {/* 3. Slide-Over Drawer for Chat History */}
      <AnimatePresence>
        {showHistoryModal && (
          <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/30 backdrop-blur-sm">
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="w-full max-w-md h-full bg-white border-l border-slate-200 p-6 flex flex-col justify-between shadow-2xl"
            >
              <div>
                {/* Drawer Header */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                  <div className="flex items-center gap-2">
                    <Clock size={18} className="text-indigo-600" />
                    <h3 className="text-lg font-black text-slate-900">Chat History Logs</h3>
                  </div>
                  <button 
                    onClick={() => setShowHistoryModal(false)}
                    className="p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* New Chat Quick Action */}
                <button 
                  onClick={startNewChat}
                  className="w-full mt-4 p-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm"
                >
                  <Plus size={16} /> Start New Chat Session
                </button>

                {/* History Items List */}
                <div className="mt-6 space-y-3 overflow-y-auto max-h-[calc(100vh-180px)] pr-1">
                  {chatHistory.map((session) => (
                    <div 
                      key={session.id}
                      onClick={() => loadPastChat(session)}
                      className="p-4 bg-slate-50 hover:bg-indigo-50/60 border border-slate-200 hover:border-indigo-200/80 rounded-2xl cursor-pointer transition-all space-y-1.5 group"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-indigo-600 flex items-center gap-1">
                          <MessageSquare size={12} /> {session.date}
                        </span>
                      </div>
                      <h4 className="text-[13.5px] font-bold text-slate-800 group-hover:text-indigo-900 line-clamp-1">
                        {session.title}
                      </h4>
                      <p className="text-[12px] font-medium text-slate-400 line-clamp-1">
                        {session.messages[0]?.content}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Drawer Footer */}
              <div className="pt-4 border-t border-slate-200 text-center">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  StudyMate AI Memory Vault
                </span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}