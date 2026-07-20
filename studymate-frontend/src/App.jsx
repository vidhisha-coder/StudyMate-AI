import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Upload from "./pages/Upload";
import Quiz from "./pages/Quiz";
import Chat from "./pages/Chat";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

// 1. Import your new layout wrapper component
import MainLayout from "./layouts/MainLayout"; 

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes (These stay full-screen, clean, no sidebar) */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* 2. Dashboard Parent Route Wrapper */}
        {/* Everything wrapped inside here automatically inherits the sticky layout */}
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/quiz" element={<Quiz />} />
          
          {/* NOTE: Make sure your Sidebar.jsx path matches this precisely. 
              If your Sidebar links to "/ai-chat", change the path below to "/ai-chat" */}
          <Route path="/chat" element={<Chat />} /> 
          
          <Route path="/profile" element={<Profile />} />
        </Route>

        {/* 404 Page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;