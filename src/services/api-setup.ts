// frontend/src/services/api-setup.ts
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/v1/rh", // Sua URL base
});

// Intercepta a requisição para adicionar o Token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("@rh:token"); // Manter consistência
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Intercepta a resposta para tratar erro 401 (Não autorizado)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("@rh:token");
      localStorage.removeItem("@rh:user");
      window.location.href = "/signin"; // Redireciona se o token expirar
    }
    return Promise.reject(error);
  }
);

export default api;