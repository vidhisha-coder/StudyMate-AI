import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-slate-100 fixed top-0 left-0 w-full z-50 transition-all">
      <div className="w-full px-6 md:px-12 py-4 flex justify-between items-center">

        {/* Logo / Brand Name */}
        <Link to="/" className="flex items-center space-x-2 group">
          <span className="text-xl">🧠</span>
          <h1 className="text-xl font-bold text-slate-900 tracking-wide group-hover:text-purple-600 transition">
            StudyMate AI
          </h1>
        </Link>

        {/* Navigation Links */}
        <div className="space-x-8 hidden md:flex text-sm font-medium text-slate-600">
          <Link to="/dashboard" className="hover:text-purple-600 transition">Dashboard</Link>
          <a href="#resources" className="hover:text-purple-600 transition">Resources</a>
          <a href="#pricing" className="hover:text-purple-600 transition">Pricing</a>
          <a href="#activity" className="hover:text-purple-600 transition">Activity</a>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-4">
          <Link
            to="/login"
            className="text-sm font-medium text-slate-600 hover:text-slate-900 transition"
          >
            Log In
          </Link>
          <Link
            to="/signup"
            className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-sm font-medium px-5 py-2 rounded-lg shadow-lg shadow-purple-600/10 hover:from-purple-500 hover:to-indigo-500 transition-all transform hover:-translate-y-0.5"
          >
            Get Started
          </Link>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;