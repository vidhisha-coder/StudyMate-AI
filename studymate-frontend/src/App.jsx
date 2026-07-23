import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext"; // 👈 Theme Provider Import

import Analytics from './pages/Analytics';
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import StudyPlanner from "./pages/StudyPlanner";
import Upload from "./pages/Upload";
import Quiz from "./pages/Quiz";
import Flashcard from "./pages/Flashcard"; 
import Achievements from "./pages/Achievements"; 
import Settings from "./pages/Settings"; 
import Chat from "./pages/Chat";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

// Layout & Route Wrappers
import MainLayout from "./layouts/MainLayout"; 
import ProtectedRoutes from "./routes/ProtectedRoutes";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes (No Auth / No Sidebar) */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* 🔒 Protected Routes (Only logged in users can access) */}
          <Route element={<ProtectedRoutes />}>
            <Route element={<MainLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/planner" element={<StudyPlanner />} />
              <Route path="/upload" element={<Upload />} />
              <Route path="/quiz" element={<Quiz />} />
              <Route path="/flashcard" element={<Flashcard />} /> 
              <Route path="/achievements" element={<Achievements />} /> 
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/chat" element={<Chat />} /> 
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<Settings />} /> 
            </Route>
          </Route>

          {/* 404 Page */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;