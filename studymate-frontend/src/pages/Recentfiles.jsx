import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Download, ExternalLink } from 'lucide-react';

export default function RecentFiles({ files = [] }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-md border border-slate-200/60 dark:border-slate-800 p-6 rounded-[24px] md:rounded-[32px] shadow-sm w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-black text-slate-900 dark:text-slate-100">Recent Workspace Assets</h2>
        <button 
          onClick={() => navigate('/explorer')} // Yahan aapka view all route aayega
          className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
        >
          View All Explorer
        </button>
      </div>

      <div className="divide-y divide-slate-100 dark:divide-slate-800">
        {files.length > 0 ? (
          files.slice(0, 3).map((file, index) => (
            <div key={index} className="py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">{file.title || file.name || "Untitled PDF"}</h4>
                  <p className="text-xs text-slate-400">{file.date || "Recently uploaded"}</p>
                </div>
              </div>
              {file.url && (
                <a 
                  href={file.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          ))
        ) : (
          <p className="text-sm text-slate-400 py-6 text-center">No PDF assets uploaded yet.</p>
        )}
      </div>
    </div>
  );
}