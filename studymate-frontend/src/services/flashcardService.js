// src/services/flashcardService.js
import api from "./api"; // Ensure base api is imported

export const getFlashcards = async () => {
  const res = await api.get("/flashcards/");
  return res.data;
};

export const createFlashcard = async (cardData) => {
  const res = await api.post("/flashcards/", cardData);
  return res.data;
};

export const deleteFlashcard = async (id) => {
  const res = await api.delete(`/flashcards/${id}`);
  return res.data;
};

export const generateFlashcards = async (text) => {
  const response = await api.post("/flashcards/generate", {
    text,
  });

  return response.data;
};