import { BookOpen, Brain, MessageSquare, Flame } from "lucide-react";

const stats = [
  { title: "Notes", value: 12, icon: BookOpen, color: "bg-blue-500" },
  { title: "Quizzes", value: 8, icon: Brain, color: "bg-green-500" },
  { title: "AI Chats", value: 24, icon: MessageSquare, color: "bg-purple-500" },
  { title: "Study Streak", value: "5 Days", icon: Flame, color: "bg-orange-500" },
];

export default function StatsCard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {stats.map((item, index) => {
        const Icon = item.icon;

        return (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md p-5 flex justify-between items-center"
          >
            <div>
              <p className="text-gray-500">{item.title}</p>
              <h2 className="text-2xl font-bold">{item.value}</h2>
            </div>

            <div className={`${item.color} p-3 rounded-full text-white`}>
              <Icon size={26} />
            </div>
          </div>
        );
      })}
    </div>
  );
}