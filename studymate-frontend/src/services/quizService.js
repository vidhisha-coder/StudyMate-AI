import api from "./api";

export const generateQuiz = (notes) => {
  return api.post("/quiz", {
    notes,
  });
};