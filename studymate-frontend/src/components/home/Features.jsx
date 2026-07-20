import { BookOpen, BrainCircuit, FileText } from "lucide-react";

const features = [
  {
    icon: FileText,
    title: "Smart Notes",
    description: "Upload PDFs and generate AI-powered summaries instantly.",
    hoverGlow: "hover:shadow-purple-600/5",
    iconBg: "bg-purple-50 border-purple-100",
    iconColor: "text-purple-600",
  },
  {
    icon: BrainCircuit,
    title: "AI Chat",
    description: "Ask questions and understand concepts faster.",
    hoverGlow: "hover:shadow-indigo-600/5",
    iconBg: "bg-indigo-50 border-indigo-100",
    iconColor: "text-indigo-600",
  },
  {
    icon: BookOpen,
    title: "Quiz Generator",
    description: "Generate MCQs automatically from your notes.",
    hoverGlow: "hover:shadow-blue-600/5",
    iconBg: "bg-blue-50 border-blue-100",
    iconColor: "text-blue-600",
  },
];

function Features() {
  return (
    <section id="features" className="py-24 bg-white relative overflow-hidden">
      {/* Structural visual divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>

      <div className="w-full px-6 md:px-12 max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight uppercase">
            Powerful <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">AI Toolsets</span>
          </h2>
          <p className="text-slate-500 mt-3 text-sm max-w-md mx-auto font-normal">
            Everything you need to accelerate your learning velocity and study smarter.
          </p>
        </div>

        {/* Features Card Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className={`group bg-slate-50 p-8 rounded-2xl border border-slate-200/60 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:bg-white hover:border-slate-200 hover:shadow-xl ${feature.hoverGlow}`}
              >
                {/* Styled Icon Container */}
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 border ${feature.iconBg} transition-colors`}>
                  <Icon className={`w-6 h-6 ${feature.iconColor}`} />
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-3 tracking-wide">
                  {feature.title}
                </h3>

                <p className="text-slate-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

export default Features;