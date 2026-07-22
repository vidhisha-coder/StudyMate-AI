import api from "./api";


export const login = (email, password) => {
  return api.post("/api/auth/login", {
    email,
    password,
  });
};


export const signup = (name, email, password) => {
  return api.post("/api/auth/signup", {
    name,
    email,
    password,
  });
};