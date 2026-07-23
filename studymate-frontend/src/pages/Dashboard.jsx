import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
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
  const [userName, setUserName] = useState("User");
  const [loading, setLoading] = useState(true);

  // States for backend mapped data
  const [statsData, setStatsData] = useState([]);
  const [activitiesData, setActivitiesData] = useState([]);
  const [notesData, setNotesData] = useState([]);
  const [coursesData, setCoursesData] = useState([]);

  useEffect(() => {
    const fetchDashboardAnalytics = async () => {
      try {
        const token = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");

        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setUserName(parsedUser.name || parsedUser.username || "Rudra");
        }

        // Backend API Request
        const response = await fetch("http://127.0.0.1:8000/dashboard/analytics", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });

        if (response.ok) {
          const data = await response.json();

          // 1. Map Backend Stats to UI Stats Grid
          const completionPercentage = data.study_tasks?.total > 0
            ? Math.round((data.study_tasks.completed / data.study_tasks.total) * 100)
            : 0;

          setStatsData([
            {
              label: "Recent Score",
              value: `${data.average_quiz_score_percent}%`,
              trend: `${data.quizzes_taken} Quizzes taken`,
              trendType: "up",
              type: "score"
            },
            {
              label: "Task Progress",
              value: `${completionPercentage}%`,
              trend: `${data.study_tasks.completed} of ${data.study_tasks.total} done`,
              trendType: "up",
              type: "progress"
            },
            {
              label: "Notes Created",
              value: `${data.summaries_created}`,
              trend: `${data.flashcards_created} Flashcards`,
              trendType: "up",
              type: "accuracy"
            },
            {
              label: "Achievements",
              value: `${data.achievements_earned}`,
              trend: "Earned badges",
              trendType: "up",
              type: "streak"
            }
          ]);

          // 2. Map Recent Activity Feed
          if (data.recent_activity && data.recent_activity.length > 0) {
            const mappedActivities = data.recent_activity.map(act => ({
              title: act.title || "Study Note Created",
              time: act.created_at ? new Date(act.created_at).toLocaleDateString() : "Recently"
            }));
            setActivitiesData(mappedActivities);
          }

        } else {
          console.error("Failed to fetch analytics from backend");
        }
      } catch (error) {
        console.error("Error connecting dashboard to backend:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardAnalytics();
  }, []);

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
      {/* Header Section */}
      <DashboardHeader user={userName} />

      {/* Stats Cards Grid (Dynamic DB Data) */}
      <StatsGrid stats={statsData} />

      {/* Weekly Graph & Continue Learning Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch w-full">
        <div className="lg:col-span-2 w-full">
          <div className="bg-white/50 backdrop-blur-md border border-slate-200/60 p-5 rounded-[24px] md:rounded-[32px] shadow-sm h-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-black text-slate-900">Weekly Progress Graph</h2>
              <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-lg">This Week</span>
            </div>
            <AnalyticsChart />
          </div>
        </div>
        
        {/* Continue Learning with Scrollbar */}
        <div className="bg-white/50 backdrop-blur-md border border-slate-200/60 p-6 rounded-[24px] md:rounded-[32px] shadow-sm flex flex-col justify-between w-full">
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-[22px] font-black tracking-tight text-slate-900">Continue Learning</h2>
              <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
                {coursesData.length} Courses
              </span>
            </div>

            {/* Scrollable Container */}
            <div className="space-y-3.5 max-h-[320px] overflow-y-auto pr-2 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-200 hover:[&::-webkit-scrollbar-thumb]:bg-indigo-300 [&::-webkit-scrollbar-thumb]:rounded-full">
              {coursesData.map(course => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Workspace Assets & Activity Log Block */}
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