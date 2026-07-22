import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  UploadCloud, 
  HelpCircle, 
  MessageSquare, 
  User, 
  LogOut, 
  Layers, 
  BarChart3,
  Calendar,
  Trophy // 👈 1. Trophy Icon Import Kiya
} from 'lucide-react';

export default function Sidebar() {
  const navigate = useNavigate();

  const menuItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={18} />, path: '/dashboard' },
    { name: 'Study Planner', icon: <Calendar size={18} />, path: '/planner' },
    { name: 'Upload Notes', icon: <UploadCloud size={18} />, path: '/upload' },
    { name: 'Quiz', icon: <HelpCircle size={18} />, path: '/quiz' },
    { name: 'Flashcards', icon: <Layers size={18} />, path: '/flashcard' },
    { name: 'Achievements', icon: <Trophy size={18} />, path: '/achievements' }, // 👈 2. Achievements Route Add Kiya
    { name: 'Analytics', icon: <BarChart3 size={18} />, path: '/analytics' },
    { name: 'AI Tutor', icon: <MessageSquare size={18} />, path: '/chat' },
    { name: 'Profile', icon: <User size={18} />, path: '/profile' },
  ];

  // Logout Handler Function
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    alert("Logged out successfully!");
    navigate("/login");
  };

  return (
    <aside className="w-64 h-full flex-shrink-0 bg-white/60 backdrop-blur-2xl border-r border-indigo-100/40 flex flex-col justify-between p-6 relative z-30 shadow-[4px_0_24px_-10px_rgba(79,70,229,0.05)]">
      <div className="space-y-10 relative z-10">
        
        {/* Logo Branding */}
        <div className="flex items-center gap-3 px-3">
          <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-black text-sm">S</div>
          <span className="text-[17px] font-black text-slate-900 tracking-tight">
            StudyMate <span className="text-indigo-600">AI</span>
          </span>
        </div>

        {/* Navigation Section */}
        <nav className="space-y-1.5">
          {menuItems.map((item, i) => (
            <NavLink
              key={i}
              to={item.path}
              className={({ isActive }) => 
                `w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl text-[14px] font-bold tracking-tight transition-all duration-200 group relative ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'
                    : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100/60'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span className={`transition-transform duration-200 group-hover:scale-105 ${
                    isActive ? 'text-white' : 'text-slate-400 group-hover:text-indigo-600'
                  }`}>
                    {item.icon}
                  </span>
                  
                  <span>{item.name}</span>
                  
                  {isActive && (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-white rounded-full"></span>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Action Footer Button Tray Area */}
      <div className="relative z-10">
        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-3.5 px-4 py-3.5 bg-rose-50 hover:bg-rose-100/80 border border-rose-100 text-rose-600 rounded-2xl text-[14px] font-bold tracking-tight transition-all duration-200 shadow-sm group active:scale-[0.98]"
        >
          <LogOut size={18} className="transition-transform group-hover:translate-x-0.5" />
          Logout User
        </button>
      </div>
    </aside>
  );
}