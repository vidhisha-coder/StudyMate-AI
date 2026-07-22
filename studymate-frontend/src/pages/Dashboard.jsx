import React from 'react';
import { motion } from 'framer-motion';
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
  const statsData = [
    { label: "Recent Score", value: "88%", trend: "+5% last quiz", trendType: "up", type: "score" },
    { label: "Accuracy", value: "92%", trend: "High accuracy", trendType: "up", type: "accuracy" },
    { label: "Today's Progress", value: "75%", trend: "3 of 4 goals done", trendType: "up", type: "progress" },
    { label: "Study Streak", value: "5 Days", trend: "Top 4% of students", trendType: "up", type: "streak" }
  ];

  const coursesData = [
    { id: 1, name: "Intro to Computer Science", progress: 75, timeLeft: "2h 15m remaining" },
    { id: 2, name: "Database Systems", progress: 45, timeLeft: "5h 40m remaining" },
    { id: 3, name: "Operating Systems", progress: 90, timeLeft: "45m remaining" },
    { id: 4, name: "Data Structures & Algorithms", progress: 20, timeLeft: "8h 10m remaining" },
    { id: 5, name: "Computer Networks", progress: 10, timeLeft: "6h 30m remaining" },
    { id: 6, name: "Web Development", progress: 60, timeLeft: "3h 00m remaining" }
  ];

  const notesData = [
    { name: "Operating System.pdf", edited: "2 hours ago", size: "4.2 MB" },
    { name: "Python Notes.pdf", edited: "Yesterday", size: "1.8 MB" },
    { name: "Java Unit 3.pdf", edited: "3 days ago", size: "5.6 MB" },
    { name: "AI Chapter 2.pdf", edited: "1 week ago", size: "3.1 MB" }
  ];

  const activitiesData = [
    { title: "Uploaded DBMS Notes", time: "10 mins ago" },
    { title: "Generated AI Quiz", time: "2 hours ago" },
    { title: "Completed Operating Systems", time: "Yesterday" },
    { title: "AI Summary Created", time: "3 days ago" }
  ];

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="w-full space-y-6 px-4 md:px-6 py-6 pb-12"
    >
      {/* Header Section */}
      <DashboardHeader user="Rudra" />

      {/* Stats Cards Grid */}
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

            {/* Scrollable Container with Inline Tailwind Scrollbar Styling */}
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