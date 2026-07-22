import api from "./api";

export const askAI = async (prompt) => {
  const token = localStorage.getItem("token");

  const response = await api.post(
    "/ai/ask",
    { prompt },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};