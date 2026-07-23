import { api } from "./api.js";

export async function login(email, senha) {
  const { data } = await api.post("/auth/login", { email, senha });
  if (data?.token) localStorage.setItem("token", data.token);
  if (data?.user) localStorage.setItem("user", JSON.stringify(data.user));
  return data;
}

export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}

export function getCurrentUser() {
  try {
    const raw = localStorage.getItem("user");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function isAuthenticated() {
  return !!localStorage.getItem("token") || !!getCurrentUser();
}

export async function register(payload) {
  const { data } = await api.post("/auth/registro", payload);
  return data;
}
