import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, Mail, BookOpen, MapPin, Award, 
  Edit3, Check, Shield, ExternalLink, MoreHorizontal, Camera, Plus, X 
} from "lucide-react";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const avatarInputRef = useRef(null);
  const bannerInputRef = useRef(null);
  
  // Profile State Matrix
  const [profileData, setProfileData] = useState({
    name: "Rudra Umra",
    headline: "Computer Science Engineering Student | Full-Stack Developer",
    location: "Surat, Gujarat, India",
    email: "rudra.umra@example.com",
    institution: "Computer Science Engineering Department",
    spi: "8.44",
    avatarUrl: null,
    bannerUrl: null,
    skills: ["React.js", "Tailwind CSS", "Flutter & Java", "PHP & DBMS", "Node.js", "Internet of Things (IoT)"]
  });

  const [editForm, setEditForm] = useState({ ...profileData });
  const [newSkillInput, setNewSkillInput] = useState("");

  const handleSave = () => {
    setProfileData({ ...editForm });
    setIsEditing(false);
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setEditForm(prev => ({ ...prev, avatarUrl: url }));
    }
  };

  const handleBannerChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setEditForm(prev => ({ ...prev, bannerUrl: url }));
    }
  };

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (newSkillInput.trim() && !editForm.skills.includes(newSkillInput.trim())) {
      setEditForm(prev => ({
        ...prev,
        skills: [...prev.skills, newSkillInput.trim()]
      }));
      setNewSkillInput("");
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setEditForm(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skillToRemove)
    }));
  };

  return (
    <div className="w-full h-full grid grid-rows-[auto_1fr] overflow-hidden px-4 md:px-6 pt-5 pb-6 gap-5 box-border">
      
      {/* Hidden inputs for Image Uploads */}
      <input 
        type="file" 
        ref={avatarInputRef} 
        onChange={handleAvatarChange} 
        accept="image/*" 
        className="hidden" 
      />
      <input 
        type="file" 
        ref={bannerInputRef} 
        onChange={handleBannerChange} 
        accept="image/*" 
        className="hidden" 
      />

      {/* Page Header */}
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

      {/* Independent Scrolling Content Body Frame Area */}
      <div className="w-full h-full overflow-y-auto custom-scrollbar min-h-0 space-y-6 pr-1">
        
        {/* 1. Main Profile Card */}
        <div className="bg-white border border-slate-200 rounded-[32px] shadow-sm overflow-hidden relative">
          
          {/* Banner Section */}
          <div 
            className="h-44 sm:h-52 bg-gradient-to-r from-slate-900 to-indigo-950 relative flex items-center justify-end px-8 overflow-hidden bg-cover bg-center"
            style={editForm.bannerUrl ? { backgroundImage: `url(${editForm.bannerUrl})` } : {}}
          >
            {/* Accent background panel */}
            {!editForm.bannerUrl && (
              <div className="absolute top-0 left-0 w-2/3 h-2/3 bg-amber-400 rounded-br-[64px] hidden sm:block opacity-90 z-0" />
            )}
            
            {/* Abstract structural text mask */}
            <span className="text-white/5 font-black text-6xl tracking-tighter select-none hidden md:block z-0">
              STUDYMATE CORE
            </span>

            {/* Banner Edit Trigger Button */}
            {isEditing && (
              <button 
                onClick={() => bannerInputRef.current?.click()}
                className="absolute bottom-4 right-6 bg-black/60 hover:bg-black/80 text-white font-bold text-xs px-3.5 py-2 rounded-xl border border-white/20 backdrop-blur-md flex items-center gap-1.5 transition-all z-20"
              >
                <Camera size={14} /> Change Cover
              </button>
            )}

            {/* Social handle display pill */}
            <div className="absolute top-4 right-6 bg-black/30 backdrop-blur-md text-white/90 font-mono text-[11px] px-3 py-1 rounded-full border border-white/10 z-10">
              code // @rudra_umra
            </div>
          </div>

          {/* Content Container Stack */}
          <div className="px-6 sm:px-8 pb-8 pt-2 relative">
            
            {/* Asymmetric Profile Avatar Ring */}
            <div className="absolute -top-16 left-6 sm:left-8 z-20">
              <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-amber-400 p-1.5 shadow-md border-4 border-white relative group">
                <div className="w-full h-full rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400 overflow-hidden relative">
                  {editForm.avatarUrl ? (
                    <img src={editForm.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    <User size={48} className="text-slate-400" />
                  )}

                  {/* Avatar Upload Hover Overlay in Edit Mode */}
                  {isEditing && (
                    <div 
                      onClick={() => avatarInputRef.current?.click()}
                      className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px] flex flex-col items-center justify-center text-white cursor-pointer opacity-100 transition-opacity"
                    >
                      <Camera size={20} />
                      <span className="text-[10px] font-bold mt-1">Upload</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Top Row Action Button Wrapper Alignment Block */}
            <div className="flex justify-end items-center gap-2 pt-4 h-12">
              {isEditing ? (
                <button 
                  onClick={handleSave}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[12px] rounded-xl flex items-center gap-1.5 shadow-sm transition-all active:scale-[0.98]"
                >
                  <Check size={14} /> Save Profile Matrix
                </button>
              ) : (
                <button 
                  onClick={() => { setEditForm({ ...profileData }); setIsEditing(true); }}
                  className="px-4 py-2 bg-slate-50 border border-slate-200 hover:border-slate-300 text-slate-600 font-bold text-[12px] rounded-xl flex items-center gap-1.5 transition-all active:scale-[0.98]"
                >
                  <Edit3 size={14} /> Edit Information
                </button>
              )}
              <button className="p-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-400 hover:text-slate-600 transition-colors">
                <MoreHorizontal size={15} />
              </button>
            </div>

            {/* User Meta Data Description Details */}
            <div className="mt-6 space-y-4">
              <AnimatePresence mode="wait">
                {!isEditing ? (
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    exit={{ opacity: 0 }}
                    className="space-y-1.5 max-w-2xl"
                  >
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                      {profileData.name}
                      <div className="w-4 h-4 rounded-full bg-indigo-100 flex items-center justify-center text-[8px] text-indigo-600 font-bold">✓</div>
                    </h2>
                    <p className="text-[14px] font-bold text-slate-700 leading-tight">
                      {profileData.headline}
                    </p>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 pt-1.5 text-[12px] text-slate-400 font-medium">
                      <span className="flex items-center gap-1"><MapPin size={13} /> {profileData.location}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1"><BookOpen size={13} /> {profileData.institution}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1"><Mail size={13} /> {profileData.email}</span>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-3xl pt-2"
                  >
                    <div className="flex flex-col gap-1">
                      <label className="text-[11px] font-bold text-slate-400">Full Name</label>
                      <input 
                        type="text" 
                        value={editForm.name} 
                        onChange={e => setEditForm({...editForm, name: e.target.value})}
                        className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-[13px] font-bold focus:outline-indigo-500"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[11px] font-bold text-slate-400">Headline</label>
                      <input 
                        type="text" 
                        value={editForm.headline} 
                        onChange={e => setEditForm({...editForm, headline: e.target.value})}
                        className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-[13px] font-medium focus:outline-indigo-500"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[11px] font-bold text-slate-400">Location</label>
                      <input 
                        type="text" 
                        value={editForm.location} 
                        onChange={e => setEditForm({...editForm, location: e.target.value})}
                        className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-[13px] font-medium focus:outline-indigo-500"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[11px] font-bold text-slate-400">Department / Institution</label>
                      <input 
                        type="text" 
                        value={editForm.institution} 
                        onChange={e => setEditForm({...editForm, institution: e.target.value})}
                        className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-[13px] font-medium focus:outline-indigo-500"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Action Chips Row Elements */}
              <div className="flex flex-wrap items-center gap-2 pt-2">
                <span className="px-3.5 py-1.5 bg-indigo-600 text-white font-bold text-[12px] rounded-full shadow-sm cursor-pointer hover:bg-indigo-700 transition-colors">
                  Open to work
                </span>
                <span className="px-3.5 py-1.5 bg-white border border-slate-200 hover:border-slate-300 text-slate-600 font-bold text-[12px] rounded-full cursor-pointer transition-colors">
                  Add profile section
                </span>
                <span className="px-3.5 py-1.5 bg-white border border-indigo-200 text-indigo-600 font-bold text-[12px] rounded-full cursor-pointer hover:bg-indigo-50/40 transition-colors">
                  Enhance profile
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* 2. Secondary Panels Layout Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          
          {/* Left Column: Academic Statistics */}
          <div className="bg-white border border-slate-200 p-6 rounded-[32px] shadow-sm space-y-4">
            <div className="flex items-center gap-2">
              <Award size={16} className="text-indigo-600" />
              <h3 className="text-[14px] font-black text-slate-800 tracking-tight">Academic Statistics</h3>
            </div>

            <div className="bg-slate-50/70 border border-slate-200/60 rounded-2xl p-4 space-y-3.5">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Cumulative SPI Rank</p>
                {isEditing ? (
                  <input 
                    type="text"
                    value={editForm.spi}
                    onChange={e => setEditForm({...editForm, spi: e.target.value})}
                    className="w-24 mt-1 bg-white border border-slate-200 px-2.5 py-1 text-lg font-black rounded-lg text-indigo-600 focus:outline-indigo-500"
                  />
                ) : (
                  <h4 className="text-2xl font-black text-indigo-600 mt-0.5">{profileData.spi}</h4>
                )}
              </div>

              <div className="w-full h-px bg-slate-200/60" />

              <div className="space-y-1 text-[12px] font-medium text-slate-500">
                <div className="flex justify-between"><span>Current Status</span><span className="font-bold text-slate-700">Active Academic Placement</span></div>
                <div className="flex justify-between"><span>Registration Node</span><span className="font-bold text-slate-700">Term VI Engine</span></div>
              </div>
            </div>
          </div>

          {/* Right Columns: Core Competencies Matrix */}
          <div className="md:col-span-2 bg-white border border-slate-200 p-6 rounded-[32px] shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Shield size={16} className="text-indigo-600" />
                <h3 className="text-[14px] font-black text-slate-800 tracking-tight">Verified Technology Skills Matrix</h3>
              </div>
              <span className="text-[11px] font-bold text-indigo-600 flex items-center gap-0.5 cursor-pointer hover:underline">
                Manage Matrix <ExternalLink size={10} />
              </span>
            </div>

            <p className="text-slate-400 font-medium text-[12px] leading-relaxed">
              These technical competency descriptors are pulled directly from your dynamic study notes cache logs:
            </p>

            {/* Dynamic Skills List */}
            <div className="flex flex-wrap gap-2 pt-1">
              {(isEditing ? editForm.skills : profileData.skills).map((skill, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-1.5 px-3.5 py-2 bg-white border border-slate-200/80 hover:border-slate-300 rounded-xl text-[12.5px] font-bold text-slate-700 transition-colors shadow-none"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                  {skill}
                  {isEditing && (
                    <button 
                      onClick={() => handleRemoveSkill(skill)}
                      className="ml-1 text-slate-300 hover:text-rose-500 transition-colors"
                    >
                      <X size={13} />
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Add Skill Input in Edit Mode */}
            {isEditing && (
              <form onSubmit={handleAddSkill} className="flex gap-2 pt-2">
                <input 
                  type="text"
                  placeholder="Add a technology skill..."
                  value={newSkillInput}
                  onChange={e => setNewSkillInput(e.target.value)}
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-[12.5px] font-semibold focus:outline-indigo-500"
                />
                <button 
                  type="submit"
                  className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold flex items-center gap-1 transition-all"
                >
                  <Plus size={14} /> Add
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}