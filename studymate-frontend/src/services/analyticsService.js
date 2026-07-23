import api from "./api";

// Fetch Analytics Page Specific Metrics
export const getAnalyticsData = async () => {
  try {
    const response = await api.get("/dashboard/analytics");
    const data = response.data;

    return {
      // Direct keys mapping with strict zero fallback
      avgScore: data.average_quiz_score_percent ?? data.avgScore ?? 0,
      accuracy: data.accuracy_rate ?? data.accuracy ?? 0,
      quizzesAttempted: data.total_quizzes ?? data.quizzes_taken ?? data.quizzesAttempted ?? 0,
      
      // Explicitly pick backend streak or default to 0
      streak: data.streak_days ?? data.current_streak ?? data.streak ?? 0,

      subjectPerformance: data.subject_performance || data.subject_mastery || [],
      weeklyProgress: data.weekly_analytics || data.weekly_progress || [],
      recentQuizzes: data.recent_quizzes || []
    };
  } catch (error) {
    console.error("Error fetching analytics data:", error);
    return {
      avgScore: 0,
      accuracy: 0,
      quizzesAttempted: 0,
      streak: 0,
      subjectPerformance: [],
      weeklyProgress: [],
      recentQuizzes: []
    };
  }
};

export const getAchievementsData = async () => {
  try {
    const response = await api.get("/dashboard/achievements");
    return response.data || [];
  } catch (error) {
    console.error("Error fetching achievements:", error);
    return [];
  }
};