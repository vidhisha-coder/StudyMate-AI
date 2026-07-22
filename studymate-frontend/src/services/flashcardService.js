import api from "./api";

export const generateFlashcards = async (text) => {
  const response = await api.post("/flashcards/generate", {
    text,
  });

  return response.data;
};