import React from 'react';

export default function Hero() {
  return (
    <section className="min-h-screen bg-slate-50 text-slate-900 pt-28 pb-12 px-6 sm:px-12 md:px-24 flex flex-col justify-between relative overflow-hidden">
      {/* Soft Ambient Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-200/40 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-blue-200/30 rounded-full blur-[100px] pointer-events-none"></div>

      {/* Main Hero Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center my-auto z-10">
        {/* Left Side: Typography */}
        <div className="space-y-6 max-w-xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight uppercase text-slate-900">
            Unlock Your Learning <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
              Potential With AI.
            </span>
          </h1>
          <p className="text-slate-600 text-lg md:text-xl font-normal leading-relaxed">
            Data analytics and cognitive growth chips to assist your enterprise community and cognitive growth.
          </p>
          <div className="pt-4">
            <button className="px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-medium rounded-lg shadow-lg shadow-purple-600/20 transition-all transform hover:-translate-y-0.5">
              Try it Free
            </button>
          </div>
        </div>

        {/* Right Side: Data Visualization Placeholder */}
        <div className="flex justify-center items-center relative">
          <div className="relative w-full max-w-[450px] aspect-square flex items-center justify-center">
            {/* Outer soft decorative rings */}
            <div className="absolute inset-0 border border-purple-200 rounded-full animate-[spin_60s_linear_infinite]"></div>
            <div className="absolute inset-8 border border-indigo-100 rounded-full animate-[spin_40s_linear_infinite_reverse]"></div>
            
            {/* Glowing Center Core */}
            <div className="w-48 h-48 bg-gradient-to-tr from-purple-200/50 to-blue-200/50 rounded-full blur-xl absolute"></div>
            
            {/* Main Center Graphical Card */}
            <div className="z-10 bg-white p-6 rounded-2xl border border-slate-200 shadow-xl shadow-slate-200/50">
              <div className="w-64 h-64 flex flex-col items-center justify-center text-center p-4">
                <span className="text-6xl mb-2 drop-shadow-sm">🧠</span>
                <span className="text-xs tracking-widest text-purple-600 font-mono font-semibold">AI.COGNITIVE.NODE</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row: Light Data Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 pt-8 border-t border-slate-200 z-10">
        {/* Metric 1 */}
        <div className="bg-white p-5 rounded-xl border border-slate-200/60 shadow-sm flex flex-col justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Summaries Generated</p>
            <h3 className="text-2xl font-bold mt-1 text-purple-600">223,176</h3>
          </div>
          {/* Sparkline Graph */}
          <div className="w-full h-12 mt-4 flex items-end space-x-1">
            <div className="w-full h-3 bg-purple-100 rounded-t"></div>
            <div className="w-full h-6 bg-purple-200 rounded-t"></div>
            <div className="w-full h-4 bg-purple-100 rounded-t"></div>
            <div className="w-full h-8 bg-purple-300 rounded-t"></div>
            <div className="w-full h-5 bg-purple-200 rounded-t"></div>
            <div className="w-full h-10 bg-purple-600 rounded-t"></div>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-white p-5 rounded-xl border border-slate-200/60 shadow-sm flex flex-col justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Quiz Completion Rates</p>
            <h3 className="text-2xl font-bold mt-1 text-indigo-600">79.5%</h3>
          </div>
          {/* Sparkline Graph */}
          <div className="w-full h-12 mt-4 flex items-end space-x-1">
            <div className="w-full h-6 bg-indigo-100 rounded-t"></div>
            <div className="w-full h-4 bg-indigo-200 rounded-t"></div>
            <div className="w-full h-8 bg-indigo-100 rounded-t"></div>
            <div className="w-full h-5 bg-indigo-300 rounded-t"></div>
            <div className="w-full h-9 bg-indigo-400 rounded-t"></div>
            <div className="w-full h-11 bg-indigo-600 rounded-t"></div>
          </div>
        </div>

        {/* Feedback Input Card */}
        <div className="bg-white p-5 rounded-xl border border-slate-200/60 shadow-sm flex flex-col justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">New User Feedback</p>
            <p className="text-xs text-slate-400 mt-1">Gives continuous response metrics to your real-time performance.</p>
          </div>
          <div className="mt-3 relative">
            <input 
              type="text" 
              placeholder="Your user feedback..." 
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-purple-500 focus:bg-white text-slate-800 pr-8"
            />
            <span className="absolute right-2.5 top-2.5 text-xs text-slate-400">✨</span>
          </div>
        </div>
      </div>
    </section>
  );
}