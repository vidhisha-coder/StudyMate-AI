import api from "./api";

/**
 * Generate Quiz
 */
export const generateQuiz = async (data) => {
  const response = await api.post("/quiz/generate", data);
  return response.data;
};

/**
 * Save Quiz Result
 */
export const submitQuiz = async (data) => {
  const response = await api.post("/quiz/submit", data);
  return response.data;
};

/**
 * Quiz History
 */
export const getQuizHistory = async () => {
  const response = await api.get("/quiz/history");
  return response.data;
};