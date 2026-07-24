import api from "./api";

/**
 * Generate Quiz
 * @param {Object} data - { text, numQuestions, difficulty, questionTypes }
 */
export const generateQuiz = async (data) => {
  try {
    const response = await api.post("/quiz/generate", data);
    return response.data;
  } catch (error) {
    console.error("Error generating quiz:", error?.response?.data || error.message);
    throw error;
  }
};

/**
 * Save Quiz Result & Detailed Answers
 * @param {Object} data - { topic, score, total_questions, questionsList }
 */
export const submitQuiz = async (data) => {
  try {
    const response = await api.post("/quiz/submit", data);
    return response.data;
  } catch (error) {
    console.error("Error submitting quiz:", error?.response?.data || error.message);
    throw error;
  }
};

/**
 * Fetch Quiz History
 */
export const getQuizHistory = async () => {
  try {
    const response = await api.get("/quiz/history");
    return response.data;
  } catch (error) {
    console.error("Error fetching quiz history:", error?.response?.data || error.message);
    throw error;
  }
};

/**
 * Delete Quiz History Record Permanently
 * @param {string} id - Quiz record ID
 */
export const deleteQuizHistory = async (id) => {
  try {
    // Backend endpoint URL match karein (e.g. DELETE /api/quiz/:id ya /quiz/delete/:id)
    const response = await api.delete(`/quiz/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting quiz history:", error?.response?.data || error.message);
    throw error;
  }
};