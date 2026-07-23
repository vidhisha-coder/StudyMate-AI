import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import jsPDF from 'jspdf';
import { 
  Sparkles, 
  RotateCw, 
  ChevronLeft, 
  ChevronRight, 
  BookOpen, 
  CheckCircle2, 
  XCircle,
  Loader2,
  FileText,
  Download,
  Save,
  History,
  X,
  Layers,
  ArrowRight,
  HelpCircle,
  CheckCircle,
  Check,
  Shuffle,
  Heart,
  Trash2
} from 'lucide-react';
import { getFlashcards, createFlashcard, deleteFlashcard } from '../services/flashcardService';

const containerVariants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3 } }
};

export default function Flashcard() {
  const [downloading, setDownloading] = useState(false);

  const [uploadedNotes] = useState([
    { id: 'note_1', title: 'Operating Systems - Ch 3 Notes' },
    { id: 'note_2', title: 'Database Systems - SQL & Normalization' },
    { id: 'note_3', title: 'Python Data Structures Basics' },
  ]);

  const [selectedNoteId, setSelectedNoteId] = useState('note_1');
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [saving, setSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);

  const [activeCards, setActiveCards] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [favoriteCards, setFavoriteCards] = useState({});

  const [historyDecks, setHistoryDecks] = useState([]);

  // Mount pe fetch karo
  useEffect(() => {
    const fetchCards = async () => {
      try {
        const data = await getFlashcards(); // [{id, topic, question, answer, created_at}]
        setHistoryDecks(data); 
      } catch (err) {
        console.error("Error fetching flashcards:", err);
      }
    };
    fetchCards();
  }, []);

  useEffect(() => {
    loadFlashcardsForNote(selectedNoteId);
  }, [selectedNoteId]);

  const loadFlashcardsForNote = (noteId) => {
    setLoading(true);
    setCurrentCardIndex(0);
    setIsFlipped(false);

    setTimeout(() => {
      const currentNoteTitle = uploadedNotes.find(n => n.id === noteId)?.title;
      const filtered = historyDecks.filter(d => d.noteId === noteId || d.topic === currentNoteTitle);
      if (filtered.length > 0) {
        setActiveCards(filtered);
      } else {
        // Default dummy mock if API returns empty for that note
        setActiveCards([
          { id: 'q1', question: "What is Process Control Block (PCB)?", answer: "A data structure used by OS to store information about a specific process." },
          { id: 'q2', question: "Define Virtual Memory.", answer: "A memory management technique that creates an illusion of larger main memory." }
        ]);
      }
      setLoading(false);
    }, 200);
  };

  const handleGenerateAI = async () => {
    setGenerating(true);
    setIsFlipped(false);

    try {
      const currentNoteTitle = uploadedNotes.find(n => n.id === selectedNoteId)?.title || "Study Deck";
      
      // Simulated AI generation response mapping to schema
      const generatedMock = [
        { id: Date.now(), topic: currentNoteTitle, question: `Generated Concept for ${currentNoteTitle}`, answer: "AI generated flashcard answer description." },
        { id: Date.now() + 1, topic: currentNoteTitle, question: `Core Architecture of ${currentNoteTitle}`, answer: "Detailed component breakdown and operational workflow." }
      ];
      
      setActiveCards(generatedMock);
      setCurrentCardIndex(0);
    } catch (err) {
      console.error("Error generating flashcards via AI:", err);
      alert("Failed to generate flashcards.");
    } finally {
      setGenerating(false);
    }
  };

  const handleSaveToMySQL = async () => {
    if (activeCards.length === 0) return;
    setSaving(true);

    try {
      const currentNoteTitle = uploadedNotes.find(n => n.id === selectedNoteId)?.title || "Study Deck";
      
      // Save current active card to backend database via createFlashcard service
      const currentCard = activeCards[currentCardIndex] || activeCards[0];
      const payload = {
        topic: currentNoteTitle,
        question: currentCard.question,
        answer: currentCard.answer
      };

      const savedCard = await createFlashcard(payload);
      setHistoryDecks(prev => [savedCard, ...prev]);
      
      setSaving(false);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 2500);
    } catch (err) {
      console.error("Error saving flashcard to backend:", err);
      setSaving(false);
      alert("Failed to save flashcard.");
    }
  };

  // Delete Action
  const handleDelete = async (id, e) => {
    if (e) e.stopPropagation();
    try {
      await deleteFlashcard(id);
      setHistoryDecks(historyDecks.filter(card => card.id !== id));
    } catch (err) {
      console.error("Error deleting flashcard:", err);
      setHistoryDecks(historyDecks.filter(card => card.id !== id));
    }
  };

  // NATIVE INSTANT PDF GENERATOR
  const handleDownloadPDF = () => {
    if (activeCards.length === 0) return;
    setDownloading(true);

    try {
      const doc = new jsPDF();
      const currentNoteTitle = uploadedNotes.find(n => n.id === selectedNoteId)?.title || 'Deck';

      doc.setFillColor(79, 70, 229);
      doc.rect(0, 0, 210, 25, 'F');
      
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(16);
      doc.setFont('helvetica', 'bold');
      doc.text("StudyMate AI - Flashcard Deck", 14, 16);

      doc.setTextColor(51, 65, 85);
      doc.setFontSize(11);
      doc.setFont('helvetica', 'normal');
      doc.text(`Source Note: ${currentNoteTitle}`, 14, 34);

      let yPos = 46;

      activeCards.forEach((card, index) => {
        doc.setFillColor(248, 250, 252);
        doc.setDrawColor(226, 232, 240);
        doc.roundedRect(14, yPos, 182, 38, 3, 3, 'FD');

        doc.setTextColor(67, 56, 202);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(11);
        doc.text(`Q${index + 1}: ${card.question}`, 18, yPos + 12);

        doc.setTextColor(30, 41, 59);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        
        const splitAnswer = doc.splitTextToSize(`Ans: ${card.answer}`, 170);
        doc.text(splitAnswer, 18, yPos + 24);

        yPos += 44;

        if (yPos > 260 && index < activeCards.length - 1) {
          doc.addPage();
          yPos = 20;
        }
      });

      const filename = `Flashcards_${currentNoteTitle.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`;
      doc.save(filename);
    } catch (error) {
      console.error("PDF export error:", error);
      alert("Failed to export PDF.");
    } finally {
      setDownloading(false);
    }
  };

  const handleShuffle = () => {
    if (activeCards.length <= 1) return;
    setIsFlipped(false);
    const shuffled = [...activeCards].sort(() => 0.5 - Math.random());
    setActiveCards(shuffled);
    setCurrentCardIndex(0);
  };

  const toggleFavorite = () => {
    const currentCard = activeCards[currentCardIndex];
    if (!currentCard) return;
    setFavoriteCards(prev => ({
      ...prev,
      [currentCard.id]: !prev[currentCard.id]
    }));
  };

  const handleNext = () => {
    if (activeCards.length === 0) return;
    setIsFlipped(false);
    setCurrentCardIndex((prev) => (prev + 1) % activeCards.length);
  };

  const handlePrev = () => {
    if (activeCards.length === 0) return;
    setIsFlipped(false);
    setCurrentCardIndex((prev) => (prev - 1 + activeCards.length) % activeCards.length);
  };

  const currentCard = activeCards[currentCardIndex];
  const isFav = currentCard ? !!favoriteCards[currentCard.id] : false;

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="w-full min-h-[calc(100vh-80px)] flex flex-col space-y-6 px-4 md:px-8 py-6 max-w-7xl mx-auto"
    >
      {/* Top Studio Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white/80 backdrop-blur-xl border border-slate-200/80 p-5 md:p-6 rounded-3xl shadow-sm">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="p-2 bg-indigo-600 text-white rounded-2xl shadow-md shadow-indigo-100">
              <Layers className="w-5 h-5" />
            </span>
            <div>
              <h1 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">Flashcards Studio</h1>
              <p className="text-slate-500 font-medium text-xs mt-0.5">
                Master your concepts with interactive AI flashcards
              </p>
            </div>
          </div>
        </div>

        {/* Action Controls Header */}
        <div className="flex flex-wrap items-center gap-2 md:gap-3">
          <button 
            onClick={handleGenerateAI}
            disabled={generating}
            className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2.5 rounded-2xl font-bold text-xs hover:bg-indigo-700 transition-all shadow-md shadow-indigo-200 disabled:opacity-50"
          >
            {generating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            {generating ? "Generating..." : "Generate AI"}
          </button>

          <button 
            onClick={handleSaveToMySQL}
            disabled={saving || activeCards.length === 0}
            className={`flex items-center gap-2 border px-4 py-2.5 rounded-2xl font-bold text-xs transition-all ${
              isSaved 
                ? "bg-emerald-600 text-white border-emerald-600" 
                : "bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100"
            }`}
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : isSaved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
            {isSaved ? "Saved!" : "Save Deck"}
          </button>

          <button 
            onClick={handleDownloadPDF}
            disabled={downloading || activeCards.length === 0}
            className="flex items-center gap-2 bg-white border border-slate-200 text-slate-700 px-4 py-2.5 rounded-2xl font-bold text-xs hover:bg-slate-50 transition-all shadow-sm disabled:opacity-50"
          >
            {downloading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4 text-slate-500" />}
            {downloading ? "Exporting..." : "Export PDF"}
          </button>

          <button 
            onClick={() => setHistoryOpen(true)}
            className="flex items-center gap-2 bg-slate-100 text-slate-700 px-4 py-2.5 rounded-2xl font-bold text-xs hover:bg-slate-200 transition-all"
          >
            <History className="w-4 h-4 text-slate-500" />
            History ({historyDecks.length})
          </button>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 items-stretch">
        
        {/* Left Container */}
        <div className="lg:col-span-2 bg-white/80 backdrop-blur-xl border border-slate-200/80 p-6 md:p-8 rounded-3xl shadow-sm flex flex-col justify-between min-h-[580px]">
          
          {loading ? (
            <div className="flex-1 flex flex-col items-center justify-center text-slate-400 gap-3 min-h-[400px]">
              <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
              <span className="text-sm font-medium">Loading flashcards...</span>
            </div>
          ) : activeCards.length > 0 ? (
            <>
              <div className="w-full flex justify-between items-center text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">
                <span className="flex items-center gap-2 bg-indigo-50 border border-indigo-100 text-indigo-700 px-3 py-1.5 rounded-xl">
                  <FileText className="w-3.5 h-3.5" />
                  {uploadedNotes.find(n => n.id === selectedNoteId)?.title}
                </span>

                <div className="flex items-center gap-2">
                  <span className="bg-slate-100 text-slate-600 px-3 py-1.5 rounded-xl font-extrabold flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-indigo-600" />
                    Stack: {currentCardIndex + 1} / {activeCards.length}
                  </span>
                </div>
              </div>

              <div className="w-full flex-1 flex items-center justify-center relative my-auto py-6">
                <div className="absolute w-[92%] max-w-md aspect-[1.5/1] bg-slate-100 border border-slate-200 rounded-3xl translate-y-3 scale-95 opacity-70"></div>
                <div className="absolute w-[96%] max-w-lg aspect-[1.5/1] bg-slate-50 border border-slate-200 rounded-3xl translate-y-1.5 scale-98 opacity-90"></div>

                <div 
                  onClick={() => setIsFlipped(!isFlipped)}
                  className={`w-full max-w-xl aspect-[1.5/1] cursor-pointer rounded-3xl p-6 md:p-10 flex flex-col justify-between text-center transition-all duration-300 transform hover:-translate-y-1 shadow-xl hover:shadow-2xl relative overflow-hidden border z-10 ${
                    isFlipped 
                      ? "bg-gradient-to-br from-emerald-500/5 via-white to-emerald-500/10 border-emerald-200" 
                      : "bg-gradient-to-br from-indigo-500/5 via-white to-indigo-500/10 border-indigo-200"
                  }`}
                >
                  <div className="flex justify-between items-center w-full">
                    <span className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[11px] font-black uppercase tracking-wider ${
                      isFlipped ? "bg-emerald-100 text-emerald-800" : "bg-indigo-100 text-indigo-800"
                    }`}>
                      {isFlipped ? <CheckCircle className="w-3.5 h-3.5" /> : <HelpCircle className="w-3.5 h-3.5" />}
                      {isFlipped ? "Answer" : "Question"}
                    </span>

                    <button 
                      onClick={(e) => { e.stopPropagation(); toggleFavorite(); }}
                      className={`p-2 rounded-xl transition-all ${
                        isFav ? "bg-rose-100 text-rose-600" : "bg-slate-100 text-slate-400 hover:text-rose-500"
                      }`}
                      title="Save to Favorite"
                    >
                      <Heart className={`w-4 h-4 ${isFav ? "fill-rose-600" : ""}`} />
                    </button>
                  </div>

                  <div className="my-auto px-4">
                    <AnimatePresence mode="wait">
                      <motion.p
                        key={isFlipped ? "answer" : "question"}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        transition={{ duration: 0.18 }}
                        className="text-lg md:text-2xl font-black text-slate-800 leading-relaxed tracking-tight"
                      >
                        {isFlipped ? currentCard?.answer : currentCard?.question}
                      </motion.p>
                    </AnimatePresence>
                  </div>

                  <p className="text-[11px] text-slate-400 font-bold flex items-center justify-center gap-1.5 uppercase tracking-wider">
                    <RotateCw className="w-3.5 h-3.5 text-indigo-500" /> Click anywhere to flip
                  </p>
                </div>
              </div>

              <div className="w-full mt-4 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <button 
                  onClick={handlePrev} 
                  className="p-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button className="flex-1 sm:flex-initial flex items-center justify-center gap-2 bg-rose-50 border border-rose-200 text-rose-600 px-5 py-2.5 rounded-2xl font-bold text-xs hover:bg-rose-100 transition-colors">
                    <XCircle className="w-4 h-4" /> Need Practice
                  </button>
                  <button className="flex-1 sm:flex-initial flex items-center justify-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-600 px-5 py-2.5 rounded-2xl font-bold text-xs hover:bg-emerald-100 transition-colors">
                    <CheckCircle2 className="w-4 h-4" /> Got It
                  </button>
                </div>

                <button 
                  onClick={handleNext} 
                  className="p-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-slate-400 gap-3 min-h-[350px]">
              <BookOpen className="w-10 h-10 text-slate-300" />
              <p className="font-semibold text-slate-600 text-sm">No flashcards available for this note.</p>
              <button 
                onClick={handleGenerateAI}
                className="bg-indigo-600 text-white text-xs px-4 py-2.5 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-md"
              >
                Generate AI Flashcards
              </button>
            </div>
          )}
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6 flex flex-col justify-between">
          <div className="bg-white/80 backdrop-blur-xl border border-slate-200/80 p-6 rounded-3xl shadow-sm space-y-4">
            <div>
              <h2 className="text-lg font-black text-slate-900 tracking-tight">Source Notes</h2>
              <p className="text-xs text-slate-500 mt-0.5">Select a note to load its study cards</p>
            </div>

            <div className="space-y-2.5">
              {uploadedNotes.map((note) => {
                const isActive = selectedNoteId === note.id;
                return (
                  <div 
                    key={note.id}
                    onClick={() => setSelectedNoteId(note.id)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                      isActive 
                        ? "bg-gradient-to-r from-indigo-600 to-indigo-700 text-white border-indigo-600 shadow-md shadow-indigo-100 scale-[1.01]" 
                        : "bg-white border-slate-200/80 text-slate-800 hover:border-indigo-300 hover:shadow-sm"
                    }`}
                  >
                    <div className="flex items-center gap-3 overflow-hidden">
                      <FileText className={`w-5 h-5 flex-shrink-0 ${isActive ? "text-white" : "text-indigo-600"}`} />
                      <div className="truncate">
                        <p className="font-bold text-xs md:text-sm tracking-tight truncate">{note.title}</p>
                      </div>
                    </div>
                    {isActive && <ArrowRight className="w-4 h-4 text-white/80 flex-shrink-0 ml-2" />}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-xl border border-slate-200/80 p-6 rounded-3xl shadow-sm space-y-4">
            <h3 className="text-sm font-black text-slate-900 tracking-tight flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-600" /> Flashcard Features & Controls
            </h3>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-2 font-bold text-slate-700">
                <Layers className="w-4 h-4 text-indigo-500" />
                <span>📄 Card Stack</span>
              </div>

              <button 
                onClick={() => setIsFlipped(!isFlipped)} 
                className="p-3 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-2xl border border-indigo-100 flex items-center gap-2 font-bold transition-all"
              >
                <RotateCw className="w-4 h-4 text-indigo-600" />
                <span>🔄 Flip Card</span>
              </button>

              <button 
                onClick={handleShuffle} 
                className="p-3 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-2xl border border-slate-100 flex items-center gap-2 font-bold transition-all"
              >
                <Shuffle className="w-4 h-4 text-indigo-600" />
                <span>🔀 Shuffle Deck</span>
              </button>

              <button 
                onClick={toggleFavorite} 
                className={`p-3 rounded-2xl border flex items-center gap-2 font-bold transition-all ${
                  isFav 
                    ? "bg-rose-50 border-rose-200 text-rose-600" 
                    : "bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-100"
                }`}
              >
                <Heart className={`w-4 h-4 ${isFav ? "fill-rose-600 text-rose-600" : "text-rose-500"}`} />
                <span>❤️ {isFav ? "Saved" : "Save Favorite"}</span>
              </button>

              <button 
                onClick={handlePrev} 
                className="p-3 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-2xl border border-slate-100 flex items-center gap-2 font-bold transition-all"
              >
                <ChevronLeft className="w-4 h-4 text-slate-600" />
                <span>⬅️ Previous</span>
              </button>

              <button 
                onClick={handleNext} 
                className="p-3 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-2xl border border-slate-100 flex items-center gap-2 font-bold transition-all"
              >
                <span>➡️ Next</span>
                <ChevronRight className="w-4 h-4 text-slate-600" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* History Modal */}
      {historyOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl relative">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <History className="w-5 h-5 text-indigo-600" /> Saved Decks History
              </h3>
              <button onClick={() => setHistoryOpen(false)} className="p-1 rounded-xl hover:bg-slate-100">
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            <div className="space-y-2.5 max-h-[320px] overflow-y-auto pr-1">
              {historyDecks.length > 0 ? (
                historyDecks.map((deck) => (
                  <div key={deck.id} className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 hover:border-indigo-200 transition-all flex items-center justify-between">
                    <div>
                      <p className="font-bold text-xs md:text-sm text-slate-800">{deck.topic || "Study Deck"}</p>
                      <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-1 font-medium">
                        <span className="truncate max-w-[150px]">{deck.question || "Flashcard item"}</span>
                        <span>•</span>
                        <span>{deck.created_at ? new Date(deck.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : "Recent"}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => {
                          setActiveCards([deck]);
                          setCurrentCardIndex(0);
                          setIsFlipped(false);
                          setHistoryOpen(false);
                        }}
                        className="bg-indigo-600 text-white text-xs px-3 py-1.5 rounded-xl font-bold hover:bg-indigo-700"
                      >
                        Load Deck
                      </button>
                      <button 
                        onClick={(e) => handleDelete(deck.id, e)}
                        className="p-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-xl transition-all"
                        title="Delete Flashcard"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-xs text-center text-slate-400 py-6">No saved history found.</p>
              )}
            </div>
          </div>
        </div>
      )}

    </motion.div>
  );
}