import React, { useState } from "react";
import { summarizePDF } from "../services/uploadService";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Sparkles, UploadCloud, Copy, RefreshCw } from "lucide-react";
import { summarizeNotes } from "../services/notesService";

export default function Upload() {
  const [activeTab, setActiveTab] = useState("paste"); // "paste" or "file"
  const [notes, setNotes] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleSummarize = async () => {

  // PDF Upload
  if (activeTab === "file") {

    if (!selectedFile) {
      alert("Please select a PDF.");
      return;
    }

    try {
      setLoading(true);

      const res = await summarizePDF(selectedFile);

      setSummary(res.summary);

    } catch (error) {

      console.error(error);

      alert("Failed to summarize PDF.");

    } finally {

      setLoading(false);

    }

    return;
  }

  // Paste Notes
  if (!notes.trim()) {
    alert("Please enter your notes.");
    return;
  }

  try {

    setLoading(true);

    const resSummary = await summarizeNotes(notes);

    setSummary(resSummary);

  } catch (error) {

    console.error(error);

    alert("Failed to generate summary.");

  } finally {

    setLoading(false);

  }
};

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {

  e.preventDefault();
  e.stopPropagation();

  setDragActive(false);

  if (e.dataTransfer.files && e.dataTransfer.files[0]) {

    setSelectedFile(e.dataTransfer.files[0]);

  }

};

  return (
    <div className="w-full h-full grid grid-rows-[auto_1fr] overflow-hidden px-6 pt-5 pb-6 gap-5 box-border">
      {/* Page Header Layout Box */}
      <div className="w-full flex items-start justify-between gap-4 self-start">
        <div>
          <h1 className="text-2xl md:text-[28px] font-black tracking-tight text-slate-900 flex items-center gap-3 leading-none">
            <Sparkles className="text-indigo-600 w-7 h-7 flex-shrink-0" />
            AI Workspace 
            <span className="text-indigo-600 text-xs font-bold bg-indigo-50 border border-indigo-100/50 px-2 py-0.5 rounded-md">
              v1.2
            </span>
          </h1>
          <p className="text-slate-400 font-medium text-[13px] mt-1.5 leading-tight">
            Transform dense lecture files, records, or text inputs into precise executive study logs instantly.
          </p>
        </div>
      </div>

      {/* Main Workspace Frame Section */}
      <div className="w-full h-full grid grid-cols-1 lg:grid-cols-3 gap-6 overflow-hidden min-h-0">
        
        {/* Left Action Box Column (Input Area) */}
        <div className="lg:col-span-2 flex flex-col h-full min-h-0 space-y-4">
          {/* Tab Selector Buttons */}
          <div className="flex gap-2 p-1.5 bg-slate-200/50 backdrop-blur-sm rounded-2xl border border-slate-200/40 w-fit flex-shrink-0">
            <button
              onClick={() => setActiveTab("paste")}
              className={`flex items-center gap-2 px-4 py-2 text-[13px] font-bold rounded-xl transition-all ${
                activeTab === "paste"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              <FileText size={16} />
              Paste Raw Content
            </button>
            <button
              onClick={() => setActiveTab("file")}
              className={`flex items-center gap-2 px-4 py-2 text-[13px] font-bold rounded-xl transition-all ${
                activeTab === "file"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              <UploadCloud size={16} />
              Upload PDF / Docx
            </button>
          </div>

          {/* Interactive Input Layer Card Container */}
          <div className="bg-white border border-slate-200 rounded-[32px] p-6 shadow-sm flex flex-col flex-1 min-h-0 overflow-hidden">
            <div className="flex-1 min-h-0 w-full relative">
              <AnimatePresence mode="wait">
                {activeTab === "paste" ? (
                  <motion.div
                    key="paste"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 w-full h-full"
                  >
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Paste textbook contexts, scattered lecture transcripts, or notes summaries here..."
                      className="w-full h-full bg-slate-50/50 border border-slate-200 rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/80 text-[14px] text-slate-800 font-medium transition-all resize-none overflow-y-auto custom-scrollbar"
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key="file"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onDragEnter={handleDrag}
                    onDragOver={handleDrag}
                    onDragLeave={handleDrag}
                    onDrop={handleDrop}
                    className={`absolute inset-0 w-full h-full border-2 border-dashed rounded-2xl p-6 text-center flex flex-col items-center justify-center cursor-pointer transition-all ${
                      dragActive
                        ? "border-indigo-500 bg-indigo-50/30"
                        : "border-slate-200 hover:border-indigo-400 bg-slate-50/30"
                    }`}
                  >
                    <div className="w-12 h-12 bg-indigo-50 border border-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600 mb-4 shadow-sm shadow-indigo-600/5">
                      <UploadCloud size={24} />
                    </div>
                    <p className="text-[14px] font-bold text-slate-800">Drag and drop document files</p>
                    <p className="text-[12px] font-medium text-slate-400 mt-1">Accepts PDF, DOCX, or TXT up to 16MB</p>
                    <label className="mt-4 px-4 py-2 bg-white hover:bg-slate-50 border border-slate-200 shadow-sm text-[13px] font-bold text-slate-700 rounded-xl cursor-pointer transition-all">
                      Browse Files
                      <input
  type="file"
  className="hidden"
  accept=".pdf"
  onChange={(e) => {
    if (e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  }}
/>
                    </label>
                    {
selectedFile && (
<p className="mt-3 text-indigo-600 text-sm font-semibold">
    📄 {selectedFile.name}
</p>
)
}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Execution Trigger Container */}
            <div className="mt-4 flex justify-end flex-shrink-0">
              <button
                onClick={handleSummarize}
                disabled={loading || (activeTab === "paste" && !notes.trim())}
                className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:hover:bg-indigo-600 text-white font-bold text-[13.5px] px-5 py-3 rounded-2xl transition-all shadow-md shadow-indigo-600/10 flex items-center gap-2 group active:scale-[0.98]"
              >
                {loading ? (
                  <RefreshCw size={16} className="animate-spin" />
                ) : (
                  <Sparkles size={16} className="group-hover:rotate-12 transition-transform" />
                )}
                {loading ? "Analyzing Matrix..." : "Generate AI Summary"}
              </button>
            </div>
          </div>
        </div>

        {/* Right Output Block Box (AI Output Panel) */}
        <div className="flex flex-col h-full min-h-0 space-y-4">
          <h2 className="text-[17px] font-black text-slate-900 tracking-tight px-1 flex-shrink-0">
            AI Output Engine
          </h2>
          <div className="bg-white border border-slate-200 p-6 rounded-[32px] shadow-sm flex flex-col flex-1 min-h-0 relative overflow-hidden">
            <div className="w-full h-full overflow-y-auto custom-scrollbar min-h-0 flex flex-col">
              <AnimatePresence mode="wait">
                {summary ? (
                  <motion.div
                    key="summary-rendered"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex justify-between items-center border-b border-slate-200/60 pb-3 mb-3">
                        <span className="text-[11px] font-bold uppercase tracking-widest text-indigo-600">Response Generated</span>
                        <button 
                          onClick={() => {
                            navigator.clipboard.writeText(summary);
                            alert("Summary copied to clipboard!");
                          }}
                          className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 transition-colors"
                          title="Copy text"
                        >
                          <Copy size={15} />
                        </button>
                      </div>
                      <p className="text-[13.5px] leading-relaxed font-medium text-slate-700 whitespace-pre-wrap select-text selection:bg-indigo-500/20">
                        {summary}
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center text-center p-4 my-auto">
                    <div className="w-10 h-10 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center text-slate-400 mb-3">
                      <FileText size={18} />
                    </div>
                    <p className="text-[13px] font-bold text-slate-400">Waiting for content execution...</p>
                    <p className="text-[11px] font-medium text-slate-400/70 mt-0.5 max-w-[200px]">
                      Input notes on the left side to compile structural results.
                    </p>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}