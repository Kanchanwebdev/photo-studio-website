import axios from "axios";

// ✅ Automatically detect correct backend URL (local or Render)
const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_BASE || "https://photo-studio-api-8w4k.onrender.com/api",
});

// ✅ Automatically attach token (for admin protected routes)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
