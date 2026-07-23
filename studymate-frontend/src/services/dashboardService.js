import api from "./api";

// Fetch overall analytics metrics & weekly progress
export const getAnalytics = async () => {
  const response = await api.get("/dashboard/analytics");
  return response.data;
};

// Optional: Fetch achievements via same API instance
export const getAchievements = async () => {
  const response = await api.get("/dashboard/achievements");
  return response.data;
};

// Optional: Fetch recent quiz attempts
export const getRecentQuizzes = async () => {
  const response = await api.get("/dashboard/recent-quizzes");
  return response.data;
};