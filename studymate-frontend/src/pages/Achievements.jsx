import React, { useEffect, useState } from "react";
import { 
  Trophy, 
  Flame, 
  Award, 
  Lock, 
  CheckCircle2, 
  Zap, 
  Crown,
  Medal,
  Star
} from "lucide-react";

export default function AchievementsPage() {
  const [stats, setStats] = useState({
    xp: 420,
    level: 5,
    study_streak: 12,
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

  // Tier Levels
  const rewardTiers = [
    { name: "Bronze", levelReq: 1, color: "from-amber-100 to-amber-200", border: "border-amber-400", text: "text-amber-800" },
    { name: "Silver", levelReq: 3, color: "from-slate-100 to-slate-200", border: "border-slate-400", text: "text-slate-700" },
    { name: "Gold", levelReq: 5, color: "from-amber-300 to-yellow-400", border: "border-yellow-500", text: "text-amber-900" },
    { name: "Diamond", levelReq: 10, color: "from-cyan-100 to-blue-200", border: "border-cyan-400", text: "text-cyan-800" },
    { name: "Master", levelReq: 15, color: "from-purple-100 to-indigo-200", border: "border-purple-400", text: "text-purple-800" },
    { name: "Legend", levelReq: 25, color: "from-rose-100 to-red-200", border: "border-rose-400", text: "text-rose-800" },
  ];

  useEffect(() => {
    const fetchAchievementsData = async () => {
      try {
        const token = localStorage.getItem("token");

        const statsRes = await fetch("http://127.0.0.1:8000/achievements/stats", {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (statsRes.ok) {
          const statsData = await statsRes.json();
          setStats(statsData);
        }

        const achievementsRes = await fetch("http://127.0.0.1:8000/achievements", {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (achievementsRes.ok) {
          const achievementsData = await achievementsRes.json();
          setEarnedBadges(achievementsData.map(a => a.code));
        }
      } catch (error) {
        console.error("Error fetching achievements:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAchievementsData();
  }, []);

  // XP Calculations
  const currentLevel = stats.level || 1;
  const currentXP = stats.xp || 0;
  const nextLevelXP = currentLevel * 100;
  const baseLevelXP = (currentLevel - 1) * 100;
  
  const xpInCurrentLevel = currentXP - baseLevelXP;
  const xpRequiredForNext = 100;
  const progressPercent = Math.min(Math.max((xpInCurrentLevel / xpRequiredForNext) * 100, 0), 100);

  const unlockedBadges = allBadges.filter(b => earnedBadges.includes(b.code));
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

  return (
    <div className="min-h-screen w-full bg-slate-50 text-slate-800 p-4 md:p-8 font-sans">
      <div className="w-full space-y-6">
        
        {/* Header Title */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900">
              Achievements & Progress
            </h1>
            <p className="text-slate-500 text-sm mt-1">Track your study milestones, level up, and earn rewards!</p>
          </div>
          <div className="flex items-center space-x-2 bg-amber-50 border border-amber-200 px-4 py-2 rounded-full text-amber-700 font-bold shadow-sm">
            <Trophy className="w-5 h-5 text-amber-500" />
            <span>Level {currentLevel}</span>
          </div>
        </div>

        {/* Top Cards Grid: Level & Streak */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Level & XP Card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 relative overflow-hidden shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs uppercase tracking-wider font-semibold text-amber-600">Current Rank</span>
                <h2 className="text-2xl font-bold flex items-center gap-2 mt-1 text-slate-900">
                  🏆 Level {currentLevel}
                </h2>
              </div>
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-600">
                <Zap className="w-6 h-6" />
              </div>
            </div>

            <div className="mt-6 space-y-2">
              <div className="flex justify-between text-sm font-medium">
                <span className="text-slate-500">XP Progress</span>
                <span className="text-amber-600 font-bold">{currentXP} / {nextLevelXP} XP</span>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full bg-slate-100 h-4 rounded-full overflow-hidden p-0.5 border border-slate-200">
                <div 
                  className="bg-gradient-to-r from-amber-400 to-orange-500 h-full rounded-full transition-all duration-500 shadow-sm"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>

          {/* Study Streak Card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 relative overflow-hidden shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs uppercase tracking-wider font-semibold text-orange-600">Consistency</span>
                <h2 className="text-2xl font-bold flex items-center gap-2 mt-1 text-orange-600">
                  🔥 Study Streak
                </h2>
              </div>
              <div className="p-3 bg-orange-50 rounded-xl border border-orange-200 text-orange-500">
                <Flame className="w-6 h-6 animate-pulse" />
              </div>
            </div>

            <div className="mt-6">
              <div className="text-4xl font-extrabold text-slate-900">
                {stats.study_streak || 0} <span className="text-lg font-normal text-slate-500">Days Streak</span>
              </div>
              <p className="text-xs text-slate-500 mt-2">Study daily to keep your flame burning!</p>
            </div>
          </div>

        </div>

        {/* Level Detailed Progress Bar Section */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <Star className="w-5 h-5 text-amber-500" />
            Detailed Level Progress
          </h3>

          <div className="grid grid-cols-3 gap-4 text-center bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div>
              <div className="text-xs text-slate-500">Current XP</div>
              <div className="text-xl font-bold text-amber-600">{currentXP}</div>
            </div>
            <div>
              <div className="text-xs text-slate-500">Next Level</div>
              <div className="text-xl font-bold text-slate-800">{nextLevelXP}</div>
            </div>
            <div>
              <div className="text-xs text-slate-500">Progress</div>
              <div className="text-xl font-bold text-emerald-600">{Math.round(progressPercent)}%</div>
            </div>
          </div>

          <div className="space-y-1">
            <div className="w-full bg-slate-100 h-5 rounded-lg overflow-hidden border border-slate-200 p-0.5">
              <div 
                className="bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500 h-full rounded-md transition-all duration-700"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Rewards UI Section (Tiers) */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-sm">
          <div>
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <Crown className="w-5 h-5 text-amber-500" />
              Rewards Tier
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">Your current tier is highlighted based on your level.</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 pt-2">
            {rewardTiers.map((tier) => {
              const isCurrent = tier.name === activeTierName;
              const isUnlocked = currentLevel >= tier.levelReq;

              return (
                <div 
                  key={tier.name}
                  className={`relative p-4 rounded-xl border transition-all text-center flex flex-col items-center justify-between ${
                    isCurrent 
                      ? `bg-gradient-to-b ${tier.color} ${tier.border} shadow-md ring-2 ring-amber-400` 
                      : isUnlocked 
                      ? "bg-slate-50 border-slate-300 opacity-90" 
                      : "bg-slate-50 border-slate-200 opacity-40 grayscale"
                  }`}
                >
                  {isCurrent && (
                    <span className="absolute -top-3 bg-amber-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
                      Active
                    </span>
                  )}
                  
                  <Medal className={`w-8 h-8 mb-2 ${tier.text}`} />
                  <div>
                    <div className="font-bold text-sm text-slate-800">{tier.name}</div>
                    <div className="text-[11px] text-slate-600 font-medium mt-0.5">Lvl {tier.levelReq}+</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Badges Section */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <Award className="w-6 h-6 text-amber-500" />
            Badges Collection
          </h3>

          {/* Unlocked Badges */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase font-bold text-emerald-600 tracking-wider flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              Unlocked Badges ({unlockedBadges.length})
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {unlockedBadges.map((badge) => (
                <div 
                  key={badge.code}
                  className="bg-white border border-emerald-200 rounded-xl p-4 flex items-center gap-3 bg-emerald-50/40 shadow-sm"
                >
                  <div className="text-3xl p-2 bg-emerald-100 rounded-lg border border-emerald-200">
                    {badge.icon}
                  </div>
                  <div>
                    <div className="font-bold text-sm text-emerald-900 flex items-center gap-1">
                      <span>✔</span> {badge.title}
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">{badge.desc}</div>
                  </div>
                </div>
              ))}

              {unlockedBadges.length === 0 && (
                <div className="col-span-full text-slate-400 text-sm italic py-2">
                  No badges unlocked yet. Start completing study tasks to earn!
                </div>
              )}
            </div>
          </div>

          {/* Locked Badges */}
          <div className="space-y-3 pt-2">
            <h4 className="text-xs uppercase font-bold text-slate-400 tracking-wider flex items-center gap-1.5">
              <Lock className="w-4 h-4" />
              Locked ({lockedBadges.length})
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {lockedBadges.map((badge) => (
                <div 
                  key={badge.code}
                  className="bg-slate-100/70 border border-slate-200 rounded-xl p-4 flex items-center gap-3 opacity-60 hover:opacity-80 transition-opacity"
                >
                  <div className="text-2xl p-2.5 bg-slate-200/60 rounded-lg text-slate-400 border border-slate-300/50">
                    🔒
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-slate-600">{badge.title}</div>
                    <div className="text-xs text-slate-400 mt-0.5">{badge.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}