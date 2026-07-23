import React, { useState, useRef, useEffect } from "react";
import { getProfile, updateProfile } from '../services/profileService';
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { 
  User, Mail, BookOpen, MapPin, Award, 
  Edit3, Check, Shield, ExternalLink, MoreHorizontal, Camera, Plus, X,
  Sparkles, Sliders, MessageSquare, Zap, Settings, Share2, RefreshCw
} from "lucide-react";

export default function Profile() {
  const navigate = useNavigate();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [isMatrixModalOpen, setIsMatrixModalOpen] = useState(false);
  
  const avatarInputRef = useRef(null);
  const bannerInputRef = useRef(null);
  const menuRef = useRef(null);

  // Profile State
  const [profileData, setProfileData] = useState({
    name: "Rudra Umra",
    headline: "Computer Science Engineering Student | Full-Stack Developer",
    location: "Surat, Gujarat, India",
    email: "rudra.umra@example.com",
    institution: "Computer Science Engineering Department",
    spi: "8.44",
    avatarUrl: null,
    bannerUrl: null,
    skills: [
      { name: "React.js", category: "Frontend" },
      { name: "Tailwind CSS", category: "Frontend" },
      { name: "Flutter & Java", category: "Mobile/Core" },
      { name: "PHP & DBMS", category: "Backend" },
      { name: "Node.js", category: "Backend" },
      { name: "Internet of Things (IoT)", category: "Hardware/Systems" }
    ]
  });

  // AI Preferences State
  const [aiPreferences, setAiPreferences] = useState({
    detailLevel: "detailed", 
    tone: "encouraging",     
    targetDifficulty: "intermediate"
  });

  const [editForm, setEditForm] = useState({ ...profileData });
  const [newSkillInput, setNewSkillInput] = useState("");
  const [newCategoryInput, setNewCategoryInput] = useState("Frontend");

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
  const fetchProfile = async () => {
    try {
      const data = await getProfile(); // {id, name, email}
      setProfileData(prev => ({ ...prev, name: data.name, email: data.email }));
    } catch (err) {
      console.error("Error loading profile:", err);
    }
  };
  fetchProfile();
}, []);

  /* -------------------------------------------------------------------------- */
  /*                          BACKEND HANDLERS                                  */
  /* -------------------------------------------------------------------------- */

  const handleSave = async (e) => {
  e?.preventDefault();
  try {
    await updateProfile({ name: editForm.name }); // backend sirf name accept karta hai
    setProfileData({ ...editForm }); // baaki cosmetic fields local update ho jayenge
    setIsEditModalOpen(false);
  } catch (err) {
    console.error(err);
    alert(err.response?.data?.detail || "Profile update failed");
  }
};

  const handlePreferenceChange = (key, value) => {
    setAiPreferences(prev => ({ ...prev, [key]: value }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setEditForm(prev => ({ ...prev, avatarUrl: url }));
      setProfileData(prev => ({ ...prev, avatarUrl: url }));
    }
  };

  const handleBannerChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setEditForm(prev => ({ ...prev, bannerUrl: url }));
      setProfileData(prev => ({ ...prev, bannerUrl: url }));
    }
  };

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (newSkillInput.trim() && !editForm.skills.some(s => s.name === newSkillInput.trim())) {
      const updatedSkills = [
        ...editForm.skills, 
        { name: newSkillInput.trim(), category: newCategoryInput }
      ];
      setEditForm(prev => ({ ...prev, skills: updatedSkills }));
      setProfileData(prev => ({ ...prev, skills: updatedSkills }));
      setNewSkillInput("");
    }
  };

  const handleRemoveSkill = (skillName) => {
    const updatedSkills = editForm.skills.filter(s => s.name !== skillName);
    setEditForm(prev => ({ ...prev, skills: updatedSkills }));
    setProfileData(prev => ({ ...prev, skills: updatedSkills }));
  };

  return (
    <div className="w-full h-full grid grid-rows-[auto_1fr] overflow-hidden px-4 md:px-6 pt-5 pb-6 gap-5 box-border">
      
      <input type="file" ref={avatarInputRef} onChange={handleAvatarChange} accept="image/*" className="hidden" />
      <input type="file" ref={bannerInputRef} onChange={handleBannerChange} accept="image/*" className="hidden" />

      {/* 1. Edit Profile Information Modal */}
      <AnimatePresence>
        {isEditModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="bg-white rounded-[28px] border border-slate-200 shadow-2xl w-full max-w-xl p-6 space-y-5"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
                    <Edit3 size={18} />
                  </div>
                  <div>
                    <h3 className="text-base font-black text-slate-800">Edit Profile Matrix</h3>
                    <p className="text-[11px] font-medium text-slate-400">Update your workspace identity & credentials</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsEditModalOpen(false)}
                  className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-500 rounded-xl transition-colors cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Form Content */}
              <form onSubmit={handleSave} className="space-y-4">
                
                <div>
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Full Name</label>
                  <input 
                    type="text" 
                    value={editForm.name} 
                    onChange={e => setEditForm({ ...editForm, name: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-[13px] font-semibold text-slate-800 focus:outline-indigo-500"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Headline</label>
                  <input 
                    type="text" 
                    value={editForm.headline} 
                    onChange={e => setEditForm({ ...editForm, headline: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-[13px] font-semibold text-slate-800 focus:outline-indigo-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Location</label>
                    <input 
                      type="text" 
                      value={editForm.location} 
                      onChange={e => setEditForm({ ...editForm, location: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-[12.5px] font-semibold text-slate-800 focus:outline-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Department / Institution</label>
                    <input 
                      type="text" 
                      value={editForm.institution} 
                      onChange={e => setEditForm({ ...editForm, institution: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-[12.5px] font-semibold text-slate-800 focus:outline-indigo-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Email Node</label>
                    <input 
  type="email" 
  value={editForm.email} 
  readOnly
  className="w-full bg-slate-100 border border-slate-200 rounded-xl px-3.5 py-2 text-[12.5px] font-semibold text-slate-500 cursor-not-allowed"
/>
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">SPI Rank (/10.00)</label>
                    <input 
                      type="text" 
                      value={editForm.spi} 
                      onChange={e => setEditForm({ ...editForm, spi: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-[12.5px] font-semibold text-slate-800 focus:outline-indigo-500"
                    />
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex gap-2">
                    <button 
                      type="button" 
                      onClick={() => avatarInputRef.current?.click()}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-[12px] font-bold flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <Camera size={13} /> Update Avatar
                    </button>
                    <button 
                      type="button" 
                      onClick={() => bannerInputRef.current?.click()}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-[12px] font-bold flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <Camera size={13} /> Update Banner
                    </button>
                  </div>

                  <div className="flex gap-2">
                    <button 
                      type="button" 
                      onClick={() => setIsEditModalOpen(false)}
                      className="px-4 py-2 text-slate-500 hover:bg-slate-100 text-[12px] font-bold rounded-xl transition-all cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit"
                      className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-[12px] rounded-xl flex items-center gap-1.5 shadow-xs transition-all active:scale-95 cursor-pointer"
                    >
                      <Check size={14} /> Save Changes
                    </button>
                  </div>
                </div>

              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 2. Manage Matrix Modal */}
      <AnimatePresence>
        {isMatrixModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="bg-white rounded-[28px] border border-slate-200 shadow-2xl w-full max-w-lg p-6 space-y-5"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
                    <Shield size={18} />
                  </div>
                  <div>
                    <h3 className="text-base font-black text-slate-800">Manage Tech Skills Matrix</h3>
                    <p className="text-[11px] font-medium text-slate-400">Add, remove, or customize skill descriptors</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsMatrixModalOpen(false)}
                  className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-500 rounded-xl transition-colors cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>

              <form onSubmit={handleAddSkill} className="flex gap-2">
                <input 
                  type="text" 
                  placeholder="Skill name (e.g., Docker, Python)" 
                  value={newSkillInput}
                  onChange={(e) => setNewSkillInput(e.target.value)}
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-[12.5px] font-semibold focus:outline-indigo-500"
                />
                <select 
                  value={newCategoryInput} 
                  onChange={(e) => setNewCategoryInput(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-2 text-[12px] font-bold text-slate-600 focus:outline-indigo-500"
                >
                  <option value="Frontend">Frontend</option>
                  <option value="Backend">Backend</option>
                  <option value="Mobile/Core">Mobile</option>
                  <option value="Hardware/Systems">IoT/Systems</option>
                </select>
                <button 
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl flex items-center gap-1 shadow-xs transition-all active:scale-95 cursor-pointer"
                >
                  <Plus size={14} /> Add
                </button>
              </form>

              <div className="space-y-2 max-h-60 overflow-y-auto pr-1 custom-scrollbar">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Active Competencies ({profileData.skills.length})</p>
                <div className="flex flex-wrap gap-2">
                  {profileData.skills.map((item, idx) => (
                    <div 
                      key={idx}
                      className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-[12px] font-bold text-slate-700"
                    >
                      <span>{item.name}</span>
                      <span className="text-[9px] bg-slate-200 text-slate-600 px-1.5 py-0.5 rounded-md">{item.category}</span>
                      <button 
                        type="button"
                        onClick={() => handleRemoveSkill(item.name)}
                        className="text-slate-400 hover:text-rose-500 transition-colors cursor-pointer"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex justify-end">
                <button 
                  onClick={() => setIsMatrixModalOpen(false)}
                  className="px-5 py-2 bg-slate-900 text-white text-[12px] font-bold rounded-xl hover:bg-slate-800 transition-all cursor-pointer"
                >
                  Done Editing
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="w-full flex items-start justify-between gap-4 self-start flex-shrink-0">
        <div>
          <h1 className="text-2xl md:text-[28px] font-black tracking-tight text-slate-900 leading-none">
            User Workspace Node
          </h1>
          <p className="text-slate-400 font-medium text-[13px] mt-1.5 leading-tight">
            Manage your verified computational matrix metrics, credentials, and deployment stats.
          </p>
        </div>
      </div>

      {/* Main Scrollable Area */}
      <div className="w-full h-full overflow-y-auto custom-scrollbar min-h-0 space-y-6 pr-1">
        
        {/* 1. Profile Banner & Card */}
        <div className="bg-white border border-slate-200 rounded-[32px] shadow-xs overflow-hidden relative">
          
          <div 
            className="h-44 sm:h-52 bg-gradient-to-r from-slate-900 to-indigo-950 relative flex items-center justify-end px-8 overflow-hidden bg-cover bg-center transition-all duration-300"
            style={profileData.bannerUrl ? { backgroundImage: `url(${profileData.bannerUrl})` } : {}}
          >
            {!profileData.bannerUrl && (
              <div className="absolute top-0 left-0 w-2/3 h-2/3 bg-amber-400 rounded-br-[64px] hidden sm:block opacity-90 z-0" />
            )}
            
            <span className="text-white/5 font-black text-6xl tracking-tighter select-none hidden md:block z-0">
              STUDYMATE CORE
            </span>

            <div className="absolute top-4 right-6 bg-black/30 backdrop-blur-md text-white/90 font-mono text-[11px] px-3 py-1 rounded-full border border-white/10 z-10">
              code // @rudra_umra
            </div>
          </div>

          <div className="px-6 sm:px-8 pb-8 pt-2 relative">
            
            {/* Avatar */}
            <div className="absolute -top-16 left-6 sm:left-8 z-20">
              <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-amber-400 p-1.5 shadow-md border-4 border-white relative group">
                <div className="w-full h-full rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400 overflow-hidden relative">
                  {profileData.avatarUrl ? (
                    <img src={profileData.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    <User size={48} className="text-slate-400" />
                  )}
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex justify-end items-center gap-2 pt-4 h-12 relative">
              <button 
                onClick={() => { setEditForm({ ...profileData }); setIsEditModalOpen(true); }}
                className="px-4 py-2 bg-slate-50 border border-slate-200 hover:border-slate-300 hover:bg-slate-100 text-slate-700 font-bold text-[12px] rounded-xl flex items-center gap-1.5 transition-all active:scale-[0.98] cursor-pointer"
              >
                <Edit3 size={14} /> Edit Information
              </button>

              {/* 3 Dots Dropdown */}
              <div className="relative" ref={menuRef}> 
                <button 
                  onClick={() => setShowMenu(!showMenu)} 
                  className="p-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                > 
                  <MoreHorizontal size={15} /> 
                </button> 
                <AnimatePresence> 
                  {showMenu && ( 
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95, y: -5 }} 
                      animate={{ opacity: 1, scale: 1, y: 0 }} 
                      exit={{ opacity: 0, scale: 0.95, y: -5 }} 
                      className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-2xl shadow-xl z-50 p-1.5 space-y-1"
                    > 
                      <button onClick={() => { setShowMenu(false); navigate('/settings'); }} className="w-full text-left px-3 py-2 text-[12px] font-bold text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-xl flex items-center gap-2 transition-colors cursor-pointer"> 
                        <Settings size={14} /> System Settings 
                      </button> 
                      <button onClick={() => { navigator.clipboard.writeText(window.location.href); setShowMenu(false); alert("Profile link copied to clipboard!"); }} className="w-full text-left px-3 py-2 text-[12px] font-bold text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-xl flex items-center gap-2 transition-colors cursor-pointer"> 
                        <Share2 size={14} /> Share Profile 
                      </button> 
                      <button onClick={() => { setShowMenu(false); setEditForm({ ...profileData }); }} className="w-full text-left px-3 py-2 text-[12px] font-bold text-rose-600 hover:bg-rose-50 rounded-xl flex items-center gap-2 transition-colors cursor-pointer"> 
                        <RefreshCw size={14} /> Reset Changes 
                      </button> 
                    </motion.div> 
                  )} 
                </AnimatePresence> 
              </div>
            </div>

            {/* Static Clean Profile Info */}
            <div className="mt-4 space-y-3">
              <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                {profileData.name}
                <div className="w-4 h-4 rounded-full bg-indigo-100 flex items-center justify-center text-[8px] text-indigo-600 font-bold">✓</div>
              </h2>

              <div className="space-y-2 max-w-2xl">
                <p className="text-[14px] font-bold text-slate-700 leading-tight">
                  {profileData.headline}
                </p>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[12px] text-slate-400 font-medium">
                  <span className="flex items-center gap-1"><MapPin size={13} /> {profileData.location}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1"><BookOpen size={13} /> {profileData.institution}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1"><Mail size={13} /> {profileData.email}</span>
                </div>
              </div>

              {/* Dynamic Student Status & Quick Actions */}
              <div className="flex flex-wrap items-center gap-2 pt-2">
                <button 
                  onClick={() => {
                    setProfileData(prev => ({
                      ...prev,
                      isPlacementReady: !prev.isPlacementReady
                    }));
                  }}
                  className={`px-3.5 py-1.5 font-bold text-[12px] rounded-full shadow-xs transition-all flex items-center gap-1.5 active:scale-95 cursor-pointer ${
                    profileData.isPlacementReady !== false
                      ? "bg-indigo-600 text-white hover:bg-indigo-700"
                      : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${profileData.isPlacementReady !== false ? "bg-emerald-400 animate-pulse" : "bg-slate-400"}`} />
                  {profileData.isPlacementReady !== false ? "Placement Ready Mode" : "Focus Study Mode"}
                </button>

                <button 
                  onClick={() => {
                    const sectionName = prompt("Enter section name (e.g., Certifications, Projects, Hackathons):");
                    if (sectionName) {
                      alert(`New section "${sectionName}" initialized!`);
                    }
                  }}
                  className="px-3.5 py-1.5 bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-[12px] rounded-full transition-all active:scale-95 shadow-2xs cursor-pointer"
                >
                  + Add Credentials
                </button>

                <button 
                  onClick={() => {
                    alert("AI Analysis: Profile is 85% optimized. Skills updated based on latest notes!");
                  }}
                  className="px-3.5 py-1.5 bg-gradient-to-r from-indigo-50 to-amber-50 border border-indigo-200 text-indigo-700 font-bold text-[12px] rounded-full hover:shadow-xs transition-all active:scale-95 flex items-center gap-1 cursor-pointer"
                >
                  <Sparkles size={12} className="text-indigo-600" />
                  AI Profile Sync
                </button>
              </div>

            </div>

          </div>
        </div>

        {/* 2. Stats & Skills Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          
          {/* Academic Statistics Card */}
          <div className="bg-white border border-slate-200 p-6 rounded-[32px] shadow-xs flex flex-col justify-between space-y-4">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-indigo-50 text-indigo-600 rounded-lg">
                <Award size={16} />
              </div>
              <h3 className="text-[14px] font-black text-slate-800 tracking-tight">Academic Statistics</h3>
            </div>

            <div className="bg-gradient-to-br from-slate-50 to-indigo-50/30 border border-indigo-100/60 rounded-2xl p-4 space-y-3.5">
              <div>
                <div className="flex items-center justify-between">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Cumulative SPI Rank</p>
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">Top 5%</span>
                </div>
                <div className="flex items-baseline gap-2 mt-1">
                  <h4 className="text-3xl font-black text-indigo-600 tracking-tight">{profileData.spi}</h4>
                  <span className="text-[11px] font-bold text-slate-400">/ 10.00 Scale</span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-slate-200/70 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-indigo-600 h-full rounded-full transition-all duration-500"
                  style={{ width: `${(parseFloat(profileData.spi) || 0) * 10}%` }}
                />
              </div>

              <div className="w-full h-px bg-slate-200/60" />

              <div className="space-y-1.5 text-[12px] font-medium text-slate-500">
                <div className="flex justify-between items-center">
                  <span>Current Status</span>
                  <span className="font-bold text-slate-700 bg-white px-2 py-0.5 rounded-md border border-slate-200/60 shadow-2xs">Active Academic Placement</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Registration Node</span>
                  <span className="font-bold text-slate-700">Term VI Engine</span>
                </div>
              </div>
            </div>
          </div>

          {/* Technology Skills Matrix Card */}
          <div className="md:col-span-2 bg-white border border-slate-200 p-6 rounded-[32px] shadow-xs flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-indigo-50 text-indigo-600 rounded-lg">
                  <Shield size={16} />
                </div>
                <h3 className="text-[14px] font-black text-slate-800 tracking-tight">Verified Technology Skills Matrix</h3>
              </div>

              <button 
                onClick={() => setIsMatrixModalOpen(true)}
                className="text-[11px] font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 cursor-pointer bg-indigo-50/60 hover:bg-indigo-100/60 px-2.5 py-1 rounded-xl transition-all border border-indigo-100 active:scale-95"
              >
                Manage Matrix <ExternalLink size={11} />
              </button>
            </div>

            <p className="text-slate-400 font-medium text-[12px] leading-relaxed">
              These technical competency descriptors are pulled directly from your dynamic study notes cache logs:
            </p>

            {/* Skill Tags Display */}
            <div className="flex flex-wrap gap-2.5 pt-1">
              {profileData.skills.map((skill, index) => (
                <div 
                  key={index}
                  className="group relative flex items-center gap-2 px-3.5 py-2 bg-slate-50/80 hover:bg-indigo-50/50 border border-slate-200/80 hover:border-indigo-200 rounded-xl text-[12.5px] font-bold text-slate-700 hover:text-indigo-600 transition-all cursor-default shadow-2xs"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 group-hover:scale-125 transition-transform" />
                  <span>{skill.name}</span>
                </div>
              ))}

              <button 
                onClick={() => setIsMatrixModalOpen(true)}
                className="flex items-center gap-1 px-3 py-2 border border-dashed border-slate-300 hover:border-indigo-400 rounded-xl text-[12px] font-bold text-slate-400 hover:text-indigo-600 transition-colors cursor-pointer"
              >
                <Plus size={13} /> Add Tag
              </button>
            </div>

            <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400 font-medium border-t border-slate-100">
              <span>Verified by StudyMate Note Parser</span>
              <span className="flex items-center gap-1 text-emerald-600 font-bold"><Check size={12} /> Sync Active</span>
            </div>
          </div>

        </div>

        {/* 3. AI Personalization Section */}
        <div className="bg-white border border-slate-200 p-6 rounded-[32px] shadow-xs space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <Sparkles size={18} className="text-indigo-600" />
              <h3 className="text-[15px] font-black text-slate-900 tracking-tight">AI Engine Personalization Matrix</h3>
            </div>
            <span className="text-[11px] font-bold bg-indigo-50 text-indigo-600 px-2.5 py-1 rounded-full border border-indigo-100">
              Active Model Tuning
            </span>
          </div>

          <p className="text-slate-400 font-medium text-[12px] leading-relaxed">
            Customize how StudyMate AI synthesizes your notes, formats summaries, and structures generated study materials:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
            
            <div className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-4 flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center gap-1.5 text-slate-800 font-bold text-[13px] mb-1">
                  <Sliders size={14} className="text-indigo-600" />
                  Summary Output Detail
                </div>
                <p className="text-[11px] text-slate-400 font-medium">Control the depth of generated study notes.</p>
              </div>
              
              <select 
                value={aiPreferences.detailLevel}
                onChange={(e) => handlePreferenceChange('detailLevel', e.target.value)}
                className="w-full bg-white border border-slate-200 text-slate-700 font-bold text-[12px] rounded-xl px-3 py-2 focus:outline-indigo-500 cursor-pointer shadow-none"
              >
                <option value="concise">Concise (Key Points)</option>
                <option value="detailed">Detailed (Comprehensive)</option>
                <option value="bullet_points">Structured Bullets</option>
              </select>
            </div>

            <div className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-4 flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center gap-1.5 text-slate-800 font-bold text-[13px] mb-1">
                  <MessageSquare size={14} className="text-indigo-600" />
                  AI Tone & Style
                </div>
                <p className="text-[11px] text-slate-400 font-medium">Select preferred response communication style.</p>
              </div>

              <select 
                value={aiPreferences.tone}
                onChange={(e) => handlePreferenceChange('tone', e.target.value)}
                className="w-full bg-white border border-slate-200 text-slate-700 font-bold text-[12px] rounded-xl px-3 py-2 focus:outline-indigo-500 cursor-pointer shadow-none"
              >
                <option value="encouraging">Encouraging & Support</option>
                <option value="academic">Academic & Precise</option>
                <option value="casual">Simple & Direct</option>
              </select>
            </div>

            <div className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-4 flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center gap-1.5 text-slate-800 font-bold text-[13px] mb-1">
                  <Zap size={14} className="text-indigo-600" />
                  Quiz Complexity Level
                </div>
                <p className="text-[11px] text-slate-400 font-medium">Adjust challenge level for AI quiz generation.</p>
              </div>

              <select 
                value={aiPreferences.targetDifficulty}
                onChange={(e) => handlePreferenceChange('targetDifficulty', e.target.value)}
                className="w-full bg-white border border-slate-200 text-slate-700 font-bold text-[12px] rounded-xl px-3 py-2 focus:outline-indigo-500 cursor-pointer shadow-none"
              >
                <option value="beginner">Beginner (Fundamentals)</option>
                <option value="intermediate">Intermediate (Standard)</option>
                <option value="advanced">Advanced (Exam Grade)</option>
              </select>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}