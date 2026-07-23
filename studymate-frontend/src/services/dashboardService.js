import api from "./api";

// Fetch overall analytics metrics & weekly progress
export const getAnalytics = async () => {
  try {
    const response = await api.get("/dashboard/analytics");
    const data = response.data;

    // Direct mapping from FastAPI backend response keys
    return {
      avgScore: data.average_quiz_score_percent ?? 0,
      accuracy: data.accuracy_rate ?? data.accuracy ?? 0,
      quizzesAttempted: data.quizzes_taken ?? data.total_quizzes ?? 0,
      streak: data.streak_days ?? data.current_streak ?? data.streak ?? 0,
      subjectPerformance: data.subject_performance || data.subject_mastery || [],
      weekly_progress: data.weekly_analytics || data.weekly_progress || [],
      recent_quizzes: data.recent_quizzes || []
    };
  } catch (error) {
    console.error("Error fetching analytics in service:", error);
    // Fallback zero state in case of network error
    return {
      avgScore: 0,
      accuracy: 0,
      quizzesAttempted: 0,
      streak: 0,
      subjectPerformance: [],
      weekly_progress: [],
      recent_quizzes: []
    };
  }
};

// Fetch achievements via API
export const getAchievements = async () => {
  try {
    const response = await api.get("/dashboard/achievements");
    return response.data;
  } catch (error) {
    console.error("Error fetching achievements:", error);
    return [];
  }
};

// Fetch recent quiz attempts
export const getRecentQuizzes = async () => {
  try {
    const response = await api.get("/dashboard/recent-quizzes");
    return response.data;
  } catch (error) {
    console.error("Error fetching recent quizzes:", error);
    return [];
  }
};