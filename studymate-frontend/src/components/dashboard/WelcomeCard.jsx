import React from 'react';

export default function WelcomeCard({ user = "User" }) {
  return (
    <div className="bg-gradient-to-r from-indigo-600 to-violet-600 rounded-[32px] p-8 text-white shadow-sm flex flex-col justify-between mb-6">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full">
          Dashboard Overview
        </span>
        <h1 className="text-3xl font-black mt-4">Welcome back, {user}! 👋</h1>
        <p className="text-indigo-100 text-sm mt-1">Here is what's happening with your study workspace today.</p>
      </div>
    </div>
  );
}