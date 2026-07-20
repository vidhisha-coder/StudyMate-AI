import api from "./api";

export const login = (email, password) => {
  return api.post("/login", {
    email,
    password,
  });
};

export const signup = (name, email, password) => {
  return api.post("/signup", {
    name,
    email,
    password,
  });
};