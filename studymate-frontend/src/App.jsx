import { BrowserRouter, Routes, Route } from "react-router-dom";
import Analytics from './pages/Analytics';
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import StudyPlanner from "./pages/StudyPlanner";
import Upload from "./pages/Upload";
import Quiz from "./pages/Quiz";
import Flashcard from "./pages/Flashcard"; 
import Achievements from "./pages/Achievements"; // 👈 1. Achievements Page Import Kiya
import Chat from "./pages/Chat";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

// Layout Wrapper Component
import MainLayout from "./layouts/MainLayout"; 

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes (No sidebar) */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Dashboard Parent Route Wrapper (With Sidebar) */}
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/planner" element={<StudyPlanner />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/flashcard" element={<Flashcard />} /> 
          <Route path="/achievements" element={<Achievements />} /> {/* 👈 2. Achievements Route Add Ho Gaya */}
          <Route path="/analytics" element={<Analytics />} />
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