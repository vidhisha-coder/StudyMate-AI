import { Link } from "react-router-dom";

export default function QuickActions() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mt-8">
      <Link to="/upload" className="bg-blue-600 text-white rounded-xl p-6 hover:scale-105 transition">
        📄 Upload Notes
      </Link>

      <Link to="/quiz" className="bg-green-600 text-white rounded-xl p-6 hover:scale-105 transition">
        📝 Generate Quiz
      </Link>

      <Link to="/chat" className="bg-purple-600 text-white rounded-xl p-6 hover:scale-105 transition">
        🤖 AI Chat
      </Link>

      <Link to="/profile" className="bg-orange-500 text-white rounded-xl p-6 hover:scale-105 transition">
        👤 Profile
      </Link>
    </div>
  );
}