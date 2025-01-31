import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

// Request interceptor to add auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const productsApi = {
  getAll: () => api.get("/api/products"),
  getOne: (id: string) => api.get(`/api/products/${id}`),
  create: (data: FormData) => api.post("/api/products", data),
  update: (id: string, data: FormData) => api.put(`/api/products/${id}`, data),
  delete: (id: string) => api.delete(`/api/products/${id}`),
};

export const ordersApi = {
  getAll: () => api.get("/api/orders"),
  getOne: (id: string) => api.get(`/api/orders/${id}`),
  create: (data: any) => api.post("/api/orders", data),
  update: (id: string, data: any) => api.put(`/api/orders/${id}`, data),
};

export const usersApi = {
  getAll: () => api.get("/api/users"),
  getOne: (id: string) => api.get(`/api/users/${id}`),
  update: (id: string, data: any) => api.put(`/api/users/${id}`, data),
  delete: (id: string) => api.delete(`/api/users/${id}`),
};

export default api; 