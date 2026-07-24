import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, ExternalLink, Loader2, ArrowLeft } from 'lucide-react';

export default function Explorer() {
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // API call to fetch all uploaded user PDFs/assets
    const fetchAllFiles = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://127.0.0.1:8000/user/files", {
          headers: { "Authorization": `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setFiles(data.files || []);
        }
      } catch (err) {
        console.error("Error fetching files:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAllFiles();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-96 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-full space-y-6 px-4 md:px-6 py-6 pb-12">
      {/* Back Button & Header */}
      <div className="flex items-center gap-4">
        <button 
          onClick={() => navigate(-1)} // Yahan user pichle page (dashboard) par chala jayega
          className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all shadow-sm flex items-center justify-center"
          title="Go back"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100">All Workspace Explorer Assets</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {files.length > 0 ? (
          files.map((file, index) => (
            <div key={index} className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 flex items-center justify-center text-indigo-600">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">{file.title || file.name}</h4>
                  <p className="text-xs text-slate-400">{file.date || file.edited}</p>
                </div>
              </div>
              <a href={file.url} target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800 text-indigo-600">
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          ))
        ) : (
          <p className="text-slate-400 col-span-full text-center py-10">No files found in workspace.</p>
        )}
      </div>
    </div>
  );
}