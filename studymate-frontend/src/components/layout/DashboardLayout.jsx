import Sidebar from './Sidebar';

export default function DashboardLayout({ children }) {
  return (
    // Locked down to exact screen height and viewport layout bounds
    <div className="h-screen w-screen flex overflow-hidden bg-slate-50">
      <Sidebar />

      {/* Structured content container forcing child elements to render correctly */}
      <main className="flex-1 min-w-0 h-full flex flex-col justify-start overflow-hidden">
        {children}
      </main>
    </div>
  );
}