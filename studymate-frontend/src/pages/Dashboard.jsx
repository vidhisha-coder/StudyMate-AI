import React from 'react';
import { motion } from 'framer-motion';
import DashboardHeader from '../components/dashboard/DashboardHeader.jsx';
import StatsGrid from '../components/dashboard/StatsGrid.jsx';
import AnalyticsChart from '../components/dashboard/AnalyticsChart.jsx';
import CourseCard from '../components/dashboard/CourseCard.jsx';
import AIWorkspace from '../components/dashboard/AIWorkspace.jsx';
import RecentFiles from '../components/dashboard/RecentFiles.jsx';
import ActivityTimeline from '../components/dashboard/ActivityTimeline.jsx';

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } }
};

export default function Dashboard() {
  const statsData = [
    { label: "Files Uploaded", value: "12", trend: "+2 this week", trendType: "up", type: "files" },
    { label: "Study Hours", value: "24.5h", trend: "+4.2h vs last week", trendType: "up", type: "hours" },
    { label: "AI Credits Left", value: "840", trend: "Resets in 12d", trendType: "neutral", type: "credits" },
    { label: "Study Streak", value: "5 Days", trend: "Top 4% of students", trendType: "up", type: "streak" }
  ];

  const coursesData = [
    { id: 1, name: "Intro to Computer Science", progress: 75, timeLeft: "2h 15m remaining" },
    { id: 2, name: "Database Systems", progress: 45, timeLeft: "5h 40m remaining" },
    { id: 3, name: "Operating Systems", progress: 90, timeLeft: "45m remaining" }
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
      {/* Frosted Header Section */}
      <DashboardHeader user="Rudra" />

      {/* Core Analytics Cards Grid */}
      <StatsGrid stats={statsData} />

      {/* Split Charts & Course Tracker Column */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch w-full">
        <div className="lg:col-span-2 w-full">
          <AnalyticsChart />
        </div>
        <div className="bg-white/50 backdrop-blur-md border border-slate-200/60 p-6 rounded-[24px] md:rounded-[32px] shadow-sm flex flex-col justify-between w-full">
          <div>
            <h2 className="text-[22px] font-black tracking-tight text-slate-900 mb-4">Continue Learning</h2>
            <div className="space-y-3.5">
              {coursesData.map(course => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* AI Shortcuts Matrix Panel */}
      <AIWorkspace />

      {/* Document Explorer Logging Grid Block */}
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