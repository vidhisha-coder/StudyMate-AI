  import React, { useEffect, useState } from "react";
  import { getAchievements } from "../services/achievementsService";
  import { 
    Trophy, 
    Flame, 
    Award, 
    Lock, 
    CheckCircle2, 
    Zap, 
    Crown,
    Medal,
    Star,
    Sparkles
  } from "lucide-react";

  export default function AchievementsPage() {
    // Initial state reset to 0 for new users
  const [stats, setStats] = useState({
    xp: 0,
    level: 1,
    next_level_xp: 100,
    study_streak: 0,
  });

    const [earnedBadges, setEarnedBadges] = useState([]);
    const [loading, setLoading] = useState(true);

    // Predefined badges
    const allBadges = [
      { code: "first_summary", title: "First Summary", desc: "Generated your first note summary", icon: "📝" },
      { code: "first_quiz", title: "Quiz Rookie", desc: "Completed your first quiz", icon: "🧠" },
      { code: "first_flashcard_set", title: "Flashcard Starter", desc: "Created your first flashcard set", icon: "🃏" },
      { code: "first_task_done", title: "Planner Pro", desc: "Completed your first study task", icon: "📅" },
      { code: "ten_tasks_done", title: "Consistency King", desc: "Completed 10 study tasks", icon: "👑" },
      { code: "five_quizzes", title: "Quiz Master", desc: "Completed 5 quizzes", icon: "🎯" },
      { code: "ten_flashcards", title: "10 Flashcards", desc: "Created 10+ flashcards", icon: "⚡" },
      { code: "five_summaries", title: "Note Taker", desc: "Generated 5 note summaries", icon: "📚" },
    ];

    // Updated Tier Levels to blend with Indigo/Violet Theme
    const rewardTiers = [
      { name: "Bronze", levelReq: 1, color: "from-indigo-900/40 to-slate-900/40", border: "border-indigo-500/30", text: "text-indigo-300" },
      { name: "Silver", levelReq: 3, color: "from-slate-800/50 to-indigo-950/50", border: "border-slate-400/40", text: "text-slate-200" },
      { name: "Gold", levelReq: 5, color: "from-amber-500/20 to-yellow-500/20", border: "border-amber-400/50", text: "text-amber-300" },
      { name: "Diamond", levelReq: 10, color: "from-cyan-500/20 to-blue-600/20", border: "border-cyan-400/50", text: "text-cyan-300" },
      { name: "Master", levelReq: 15, color: "from-purple-500/20 to-indigo-600/20", border: "border-purple-400/50", text: "text-purple-300" },
      { name: "Legend", levelReq: 25, color: "from-rose-500/20 to-violet-600/20", border: "border-rose-400/50", text: "text-rose-300" },
    ];
const fetchAchievementsData = async () => {
  try {
    setLoading(true);

    const data = await getAchievements();

    console.log("Achievements API Response:", data);
    console.log("Unlocked badges from API:", data.unlocked_badges);

    setStats({
      xp: data.xp || 0,
      level: data.level || 1,
      next_level_xp: data.next_level_xp || 100,
      study_streak: data.streak || 0,
    });

    setEarnedBadges(data.unlocked_badges || []);
  } catch (err) {
    console.error("Achievements error:", err);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchAchievementsData();

    const refresh = () => {
      fetchAchievementsData();
    };

    window.addEventListener("quizSubmitted", refresh);

    return () => {
      window.removeEventListener("quizSubmitted", refresh);
    };
  }, []);
    // XP Calculations
    const currentLevel = stats.level || 1;
    const currentXP = stats.xp || 0;
  const nextLevelXP = stats.next_level_xp || currentLevel * 100;
    const baseLevelXP = (currentLevel - 1) * 100;
    
    const xpInCurrentLevel = currentXP - baseLevelXP;
  const xpRequiredForNext = nextLevelXP - baseLevelXP;
    const progressPercent = Math.min(Math.max((xpInCurrentLevel / xpRequiredForNext) * 100, 0), 100);

    const unlockedBadges = allBadges.filter(b => earnedBadges.includes(b.code));
    console.log("Matched badges:", unlockedBadges);
    const lockedBadges = allBadges.filter(b => !earnedBadges.includes(b.code));

    const getActiveTier = () => {
      for (let i = rewardTiers.length - 1; i >= 0; i--) {
        if (currentLevel >= rewardTiers[i].levelReq) {
          return rewardTiers[i].name;
        }
      }
      return "Bronze";
    };

    const activeTierName = getActiveTier();
    if (loading) {
  return (
    <div className="flex items-center justify-center h-full">
      <p className="text-slate-500 font-semibold">
        Loading achievements...
      </p>
    </div>
  );
}

    return (
      <div className="w-full h-full overflow-y-auto custom-scrollbar p-4 md:p-6 space-y-6 box-border">
        
        {/* Header Section */}
        <div className="flex items-center justify-between border-b border-indigo-100/40 pb-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
              <Trophy className="w-7 h-7 text-indigo-600" />
              Achievements & Progress
            </h1>
            <p className="text-slate-500 font-medium text-xs md:text-sm mt-1">
              Track your study milestones, level up, and unlock special rewards!
            </p>
          </div>
          <div className="flex items-center gap-2 bg-indigo-50 border border-indigo-200/80 px-4 py-2 rounded-2xl text-indigo-700 font-black text-xs md:text-sm shadow-xs">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <span>Level {currentLevel}</span>
          </div>
        </div>

        {/* Top Grid: Level & Streak Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          
          {/* Level & XP Card */}
          <div className="bg-white/80 backdrop-blur-xl border border-indigo-100/60 rounded-[24px] p-6 relative overflow-hidden shadow-xs hover:shadow-md transition-all">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[11px] uppercase tracking-wider font-extrabold text-indigo-500">Current Rank</span>
                <h2 className="text-2xl font-black flex items-center gap-2 mt-1 text-slate-900">
                  Level {currentLevel}
                </h2>
              </div>
              <div className="p-3 bg-indigo-50 rounded-2xl border border-indigo-100 text-indigo-600">
                <Zap className="w-6 h-6" />
              </div>
            </div>

            <div className="mt-6 space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-slate-400">XP Progress</span>
                <span className="text-indigo-600">{currentXP} / {nextLevelXP} XP</span>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full bg-indigo-50 h-3.5 rounded-full overflow-hidden p-0.5 border border-indigo-100/80">
                <div 
                  className="bg-gradient-to-r from-indigo-500 to-purple-600 h-full rounded-full transition-all duration-500 shadow-xs"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>

          {/* Study Streak Card */}
          <div className="bg-white/80 backdrop-blur-xl border border-indigo-100/60 rounded-[24px] p-6 relative overflow-hidden shadow-xs hover:shadow-md transition-all">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[11px] uppercase tracking-wider font-extrabold text-rose-500">Consistency</span>
                <h2 className="text-2xl font-black flex items-center gap-2 mt-1 text-slate-900">
                  Study Streak
                </h2>
              </div>
              <div className="p-3 bg-rose-50 rounded-2xl border border-rose-100 text-rose-500">
                <Flame className="w-6 h-6 animate-pulse" />
              </div>
            </div>

            <div className="mt-4">
              <div className="text-4xl font-black text-slate-900 tracking-tight">
                {stats.study_streak || 0} <span className="text-sm font-bold text-slate-400">Days</span>
              </div>
              <p className="text-[11px] font-medium text-slate-400 mt-1">Keep studying daily to expand your streak!</p>
            </div>
          </div>

        </div>

        {/* Detailed Level Progress Bar */}
        <div className="bg-white/80 backdrop-blur-xl border border-indigo-100/60 rounded-[24px] p-6 space-y-4 shadow-xs">
          <h3 className="text-sm font-black uppercase tracking-wider text-slate-800 flex items-center gap-2">
            <Star className="w-4 h-4 text-indigo-600" />
            Detailed Level Overview
          </h3>

          <div className="grid grid-cols-3 gap-3 text-center bg-indigo-50/50 p-4 rounded-2xl border border-indigo-100/50">
            <div>
              <div className="text-[10px] uppercase font-extrabold text-slate-400">Current XP</div>
              <div className="text-lg font-black text-indigo-600 mt-0.5">{currentXP}</div>
            </div>
            <div>
              <div className="text-[10px] uppercase font-extrabold text-slate-400">Next Level</div>
              <div className="text-lg font-black text-slate-800 mt-0.5">{nextLevelXP}</div>
            </div>
            <div>
              <div className="text-[10px] uppercase font-extrabold text-slate-400">Progress</div>
              <div className="text-lg font-black text-emerald-600 mt-0.5">{Math.round(progressPercent)}%</div>
            </div>
          </div>

          <div className="space-y-1 pt-1">
            <div className="w-full bg-slate-100 h-4 rounded-xl overflow-hidden border border-indigo-100/60 p-0.5">
              <div 
                className="bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600 h-full rounded-lg transition-all duration-700"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Rewards Tier Section */}
        <div className="bg-white/80 backdrop-blur-xl border border-indigo-100/60 rounded-[24px] p-6 space-y-4 shadow-xs">
          <div>
            <h3 className="text-sm font-black uppercase tracking-wider text-slate-800 flex items-center gap-2">
              <Crown className="w-4 h-4 text-indigo-600" />
              Reward Tiers
            </h3>
            <p className="text-xs text-slate-400 font-medium mt-0.5">Your current level determines your tier unlock status.</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-1">
            {rewardTiers.map((tier) => {
              const isCurrent = tier.name === activeTierName;
              const isUnlocked = currentLevel >= tier.levelReq;

              return (
                <div 
                  key={tier.name}
                  className={`relative p-4 rounded-2xl border transition-all text-center flex flex-col items-center justify-between ${
                    isCurrent 
                      ? `bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-600/20 scale-105` 
                      : isUnlocked 
                      ? "bg-indigo-50/60 border-indigo-100 text-indigo-900" 
                      : "bg-slate-50/50 border-slate-200/60 opacity-50 grayscale"
                  }`}
                >
                  {isCurrent && (
                    <span className="absolute -top-2.5 bg-slate-900 text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
                      Active
                    </span>
                  )}
                  
                  <Medal className={`w-7 h-7 mb-2 ${isCurrent ? "text-white" : isUnlocked ? "text-indigo-600" : "text-slate-400"}`} />
                  <div>
                    <div className={`font-black text-xs ${isCurrent ? "text-white" : "text-slate-800"}`}>{tier.name}</div>
                    <div className={`text-[10px] font-bold mt-0.5 ${isCurrent ? "text-indigo-100" : "text-slate-400"}`}>Lvl {tier.levelReq}+</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Badges Collection Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Award className="w-5 h-5 text-indigo-600" />
            Badges Collection
          </h3>

          {/* Unlocked Badges */}
          <div className="space-y-3">
            <h4 className="text-[11px] uppercase font-extrabold text-emerald-600 tracking-wider flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Unlocked Badges ({unlockedBadges.length})
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
              {unlockedBadges.map((badge) => (
                <div 
                  key={badge.code}
                  className="bg-white/80 backdrop-blur-xl border border-emerald-200/80 rounded-2xl p-3.5 flex items-center gap-3 bg-emerald-50/20 shadow-xs hover:border-emerald-300 transition-all"
                >
                  <div className="text-2xl p-2 bg-emerald-100/70 rounded-xl border border-emerald-200/60 flex-shrink-0">
                    {badge.icon}
                  </div>
                  <div>
                    <div className="font-bold text-xs text-emerald-950 flex items-center gap-1">
                      <span className="text-emerald-600">✓</span> {badge.title}
                    </div>
                    <div className="text-[11px] text-slate-400 font-medium mt-0.5 leading-tight">{badge.desc}</div>
                  </div>
                </div>
              ))}

              {unlockedBadges.length === 0 && (
                <div className="col-span-full text-slate-400 text-xs font-semibold italic py-2">
                  No badges unlocked yet. Complete daily tasks to earn badges!
                </div>
              )}
            </div>
          </div>

          {/* Locked Badges */}
          <div className="space-y-3 pt-2">
            <h4 className="text-[11px] uppercase font-extrabold text-slate-400 tracking-wider flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5" />
              Locked Badges ({lockedBadges.length})
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
              {lockedBadges.map((badge) => (
                <div 
                  key={badge.code}
                  className="bg-slate-100/40 border border-slate-200/60 rounded-2xl p-3.5 flex items-center gap-3 opacity-60 hover:opacity-80 transition-opacity"
                >
                  <div className="text-xl p-2.5 bg-slate-200/50 rounded-xl text-slate-400 border border-slate-300/40 flex-shrink-0">
                    🔒
                  </div>
                  <div>
                    <div className="font-bold text-xs text-slate-600">{badge.title}</div>
                    <div className="text-[11px] text-slate-400 font-medium mt-0.5 leading-tight">{badge.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    );
  }