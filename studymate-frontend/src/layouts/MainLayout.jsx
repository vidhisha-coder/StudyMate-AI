import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/dashboard/Sidebar.jsx';

export default function MainLayout() {
  return (
    <div className="flex bg-[#F8FAFC] h-screen w-screen font-sans antialiased text-slate-900 overflow-hidden relative selection:bg-indigo-500/10">
      
      {/* Dynamic Master Background Gradients */}
      <div className="absolute top-[-10%] right-[-5%] w-[60vw] h-[60vw] bg-gradient-to-tr from-indigo-400/20 via-purple-400/10 to-transparent rounded-full blur-[140px] pointer-events-none z-0"></div>
      <div className="absolute bottom-[-15%] left-[15%] w-[45vw] h-[45vw] bg-gradient-to-br from-cyan-400/10 via-indigo-400/10 to-transparent rounded-full blur-[160px] pointer-events-none z-0"></div>

      {/* 1. STICKY SIDEBAR WRAPPER */}
      <div className="h-full flex-shrink-0 flex flex-col items-stretch z-20">
        <Sidebar />
      </div>

      {/* 2. DYNAMIC CONTENT AREA */}
      <main className="flex-1 overflow-y-auto custom-scrollbar h-full min-w-0 relative z-10 flex flex-col justify-start">
        {/* React Router injects active page views (Dashboard, Planner, Analytics etc.) */}
        <Outlet />
      </main>
    </div>
  );
}