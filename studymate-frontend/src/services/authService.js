import api from "./api";

// =======================
// Signup
// =======================
export const signup = async (name, email, password) => {
  const res = await api.post("/api/auth/signup", {
    name,
    email,
    password,
  });

  return res.data;
};

// =======================
// Login
// =======================
export const login = async (email, password) => {
  const formData = new URLSearchParams();

  formData.append("username", email);
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

// =======================
// Logout
// =======================
export const logout = () => {
  localStorage.removeItem("token");
};

// =======================
// Save Token
// =======================
export const saveToken = (token) => {
  localStorage.setItem("token", token);
};

// =======================
// Get Token
// =======================
export const getToken = () => {
  return localStorage.getItem("token");
};

// =======================
// Check Login
// =======================
export const isLoggedIn = () => {
  return !!localStorage.getItem("token");
};