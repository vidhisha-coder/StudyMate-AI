import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Loader2, Target, CheckSquare, FileText, Flame } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DashboardHeader from '../components/dashboard/DashboardHeader.jsx';
import StatsGrid from '../components/dashboard/StatsGrid.jsx';
import AnalyticsChart from '../components/dashboard/AnalyticsChart.jsx';
import CourseCard from '../components/dashboard/CourseCard.jsx';
import RecentFiles from '../components/dashboard/RecentFiles.jsx';
import ActivityTimeline from '../components/dashboard/ActivityTimeline.jsx';

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } }
};

export default function Dashboard() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("User");
  const [loading, setLoading] = useState(true);

  // States for backend mapped data
  const [statsData, setStatsData] = useState([]);
  const [activitiesData, setActivitiesData] = useState([]);
  const [notesData, setNotesData] = useState([]);
  const [coursesData, setCoursesData] = useState([]);
  const [weeklyProgress, setWeeklyProgress] = useState([]);

  useEffect(() => {
    const fetchDashboardAnalytics = async () => {
      try {
        const token = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");

        if (!token || token === "null" || token === "undefined") {
          localStorage.clear();
          navigate('/login');
          return;
        }

        if (storedUser) {
          try {
            const parsedUser = JSON.parse(storedUser);
            setUserName(parsedUser.name || parsedUser.username || "Rudra");
          } catch (e) {
            console.error("Failed to parse user JSON:", e);
          }
        }

        const response = await fetch("http://127.0.0.1:8000/dashboard/analytics", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });

        if (response.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          navigate('/login');
          return;
        }

        if (response.ok) {
          const data = await response.json();

          // Safe extractors to prevent undefined errors
          const totalTasks = data.study_tasks?.total || 0;
          const completedTasks = data.study_tasks?.completed || 0;
          const completionPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

          // Score Key Safe Check (checking common FastApi field names)
          const rawScore = data.average_quiz_score_percent ?? data.average_score ?? data.avg_score ?? 0;
          const quizzesCount = data.quizzes_taken ?? data.total_quizzes ?? 0;

          // Added explicit icon components so StatsGrid can render them properly
          setStatsData([
            {
              label: "Recent Score",
              value: `${rawScore}%`,
              trend: `${quizzesCount} Quizzes taken`,
              trendType: "up",
              type: "score",
              icon: Target
            },
            {
              label: "Task Progress",
              value: `${completionPercentage}%`,
              trend: `${completedTasks} of ${totalTasks} done`,
              trendType: "up",
              type: "progress",
              icon: CheckSquare
            },
            {
              label: "Notes Created",
              value: `${data.summaries_created ?? 0}`,
              trend: `${data.flashcards_created ?? 0} Flashcards`,
              trendType: "up",
              type: "accuracy",
              icon: FileText
            },
            {
              label: "Achievements",
              value: `${data.achievements_earned ?? 0}`,
              trend: "Earned badges",
              trendType: "up",
              type: "streak",
              icon: Flame
            }
          ]);

          // Map Recent Activity Feed
          if (data.recent_activity && Array.isArray(data.recent_activity)) {
            const mappedActivities = data.recent_activity.map(act => ({
              title: act.title || "Study Activity",
              time: act.created_at ? new Date(act.created_at).toLocaleDateString() : "Recently"
            }));
            setActivitiesData(mappedActivities);
          }

          // Map Analytics Graph
          if (data.weekly_analytics && Array.isArray(data.weekly_analytics)) {
            setWeeklyProgress(data.weekly_analytics);
          }

        }
      } catch (error) {
        console.error("Error connecting dashboard to backend:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardAnalytics();
  }, [navigate]);

  if (loading) {
    return (
      <div className="w-full h-96 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
      </div>
    );
  }

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="w-full space-y-6 px-4 md:px-6 py-6 pb-12"
    >
      <DashboardHeader user={userName} />

      <StatsGrid stats={statsData} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch w-full">
        <div className="lg:col-span-2 w-full">
          <div className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-md border border-slate-200/60 dark:border-slate-800 p-5 rounded-[24px] md:rounded-[32px] shadow-sm h-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-black text-slate-900 dark:text-slate-100">Weekly Progress Graph</h2>
              <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 px-2.5 py-1 rounded-lg">This Week</span>
            </div>
            <AnalyticsChart chartData={weeklyProgress.length > 0 ? weeklyProgress : undefined} />
          </div>
        </div>
        
        <div className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-md border border-slate-200/60 dark:border-slate-800 p-6 rounded-[24px] md:rounded-[32px] shadow-sm flex flex-col justify-between w-full">
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-[22px] font-black tracking-tight text-slate-900 dark:text-slate-100">Continue Learning</h2>
              <span className="text-xs font-semibold text-slate-500 bg-slate-100 dark:bg-slate-800 dark:text-slate-400 px-2.5 py-1 rounded-full">
                {coursesData.length} Courses
              </span>
            </div>

            <div className="space-y-3.5 max-h-[320px] overflow-y-auto pr-2 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-200 hover:[&::-webkit-scrollbar-thumb]:bg-indigo-300 [&::-webkit-scrollbar-thumb]:rounded-full">
              {coursesData.length > 0 ? (
                coursesData.map(course => (
                  <CourseCard key={course.id} course={course} />
                ))
              ) : (
                <p className="text-sm text-slate-400 py-4 text-center">No active courses yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
        <div className="lg:col-span-2 w-full">
          <RecentFiles files={notesData} />
        </div>
        <div className="w-full">
          <ActivityTimeline activities={activitiesData} />
        </div>
      </div>
    </motion.div>
  );
}