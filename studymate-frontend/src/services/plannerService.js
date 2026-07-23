import api from "./api";

export const getTasks = async () => {
  const response = await api.get("/planner");
  return response.data;
};

export const createTask = async (data) => {
  const response = await api.post("/planner/create", data);
  return response.data;
};

export const completeTask = async (taskId) => {
  const response = await api.patch(`/planner/${taskId}/complete`);
  return response.data;
};

export const deleteTask = async (taskId) => {
  const response = await api.delete(`/planner/${taskId}`);
  return response.data;
};