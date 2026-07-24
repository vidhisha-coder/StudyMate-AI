import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  UploadCloud, 
  HelpCircle, 
  MessageSquare, 
  User, 
  Layers, 
  BarChart3,
  Calendar,
  Trophy,
  LogOut,
  Menu,
  X
} from 'lucide-react';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={18} />, path: '/dashboard' },
    { name: 'Study Planner', icon: <Calendar size={18} />, path: '/planner' },
    { name: 'Upload Notes', icon: <UploadCloud size={18} />, path: '/upload' },
    { name: 'Quiz', icon: <HelpCircle size={18} />, path: '/quiz' },
    { name: 'Flashcards', icon: <Layers size={18} />, path: '/flashcard' },
    { name: 'Achievements', icon: <Trophy size={18} />, path: '/achievements' },
    { name: 'Analytics', icon: <BarChart3 size={18} />, path: '/analytics' },
    { name: 'AI Tutor', icon: <MessageSquare size={18} />, path: '/chat' },
    { name: 'Profile', icon: <User size={18} />, path: '/profile' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* 1. Mobile Toggle Button (Renders only on mobile) */}
      <button
        onClick={toggleSidebar}
        aria-label="Toggle Navigation"
        className="md:hidden fixed top-4 left-4 z-50 p-2.5 rounded-xl bg-white shadow-md text-slate-700 border border-indigo-100 hover:bg-slate-50 transition-colors"
      >
        {isOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      {/* 2. Mobile Backdrop / Overlay (Closes sidebar when clicking outside) */}
      {isOpen && (
        <div 
          onClick={() => setIsOpen(false)}
          className="md:hidden fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 transition-opacity"
        />
      )}

      {/* 3. Main Sidebar Container */}
      <aside
        className={`
          fixed md:static top-0 left-0 h-full w-64 bg-white/90 md:bg-white/60 backdrop-blur-2xl 
          border-r border-indigo-100/40 flex flex-col justify-between p-6 z-50 
          shadow-[4px_0_24px_-10px_rgba(79,70,229,0.05)] transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        <div className="space-y-8 relative z-10">
          
          {/* Logo Branding */}
          <div className="flex items-center justify-between px-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-black text-sm">
                S
              </div>
              <span className="text-[17px] font-black text-slate-900 tracking-tight">
                StudyMate <span className="text-indigo-600">AI</span>
              </span>
            </div>

            {/* Mobile Close Icon Inside Sidebar */}
            <button 
              onClick={() => setIsOpen(false)} 
              className="md:hidden text-slate-400 hover:text-slate-700"
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation Section */}
          <nav className="space-y-1.5 overflow-y-auto max-h-[calc(100vh-200px)] md:max-h-none">
            {menuItems.map((item, i) => {
              const isItemActive = item.path === '/profile' 
                ? (location.pathname.startsWith('/profile') || location.pathname.startsWith('/settings'))
                : location.pathname === item.path;

              return (
                <Link
                  key={i}
                  to={item.path}
                  onClick={() => setIsOpen(false)} // Mobile me click karte hi menu auto close ho jayega
                  className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl text-[14px] font-bold tracking-tight transition-all duration-200 group relative ${
                    isItemActive
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'
                      : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100/60'
                  }`}
                >
                  <span className={`transition-transform duration-200 group-hover:scale-105 ${
                    isItemActive ? 'text-white' : 'text-slate-400 group-hover:text-indigo-600'
                  }`}>
                    {item.icon}
                  </span>
                  
                  <span>{item.name}</span>
                  
                  {isItemActive && (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-white rounded-full"></span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Logout Button */}
        <div className="pt-4 border-t border-indigo-100/60 relative z-10">
          <button
            onClick={() => {
              setIsOpen(false);
              handleLogout();
            }}
            className="w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl text-[14px] font-bold tracking-tight text-rose-500 hover:text-rose-600 hover:bg-rose-50 transition-all duration-200 group cursor-pointer"
          >
            <span className="transition-transform duration-200 group-hover:scale-105 group-hover:-translate-x-0.5">
              <LogOut size={18} />
            </span>
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}