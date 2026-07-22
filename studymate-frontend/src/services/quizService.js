import api from "./api";

export const generateQuiz = async (data) => {
  const response = await api.post("/quiz/generate", data);
  return response.data;
};