import api from "./api";

// Signup
export const signup = async (name, email, password) => {
  const res = await api.post("/api/auth/signup", {
    name,
    email,
    password,
  });

  return res.data;
};

// Login
export const login = async (email, password) => {
  const formData = new URLSearchParams();

  formData.append("username", email); // Backend expects username
  formData.append("password", password);

  const res = await api.post(
    "/api/auth/login",
    formData,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  return res.data;
};