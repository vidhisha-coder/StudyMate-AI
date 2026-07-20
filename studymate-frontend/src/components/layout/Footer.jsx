function Footer() {
  return (
    <footer className="bg-slate-50 text-slate-500 py-8 text-center text-xs tracking-wider border-t border-slate-200">
      <div className="w-full max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm">
        <p className="text-slate-600">
          &copy; 2026 <span className="text-purple-600 font-semibold">StudyMate AI</span>. All Rights Reserved.
        </p>
        <div className="flex space-x-6 text-slate-400 text-xs font-medium">
          <a href="#privacy" className="hover:text-purple-600 transition">Privacy Policy</a>
          <a href="#terms" className="hover:text-purple-600 transition">Terms of Service</a>
          <a href="#support" className="hover:text-purple-600 transition">Support</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;