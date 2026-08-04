const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

async function request(path: string, options: RequestInit = {}) {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json", ...options.headers },
    ...options,
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
}

export const registerUser = (name: string, email: string, password: string) =>
  request("/auth/register", { method: "POST", body: JSON.stringify({ name, email, password }) });

export const loginUser = (email: string, password: string) =>
  request("/auth/login", { method: "POST", body: JSON.stringify({ email, password }) });

export const getCurrentUser = (token: string) =>
  request("/auth/me", { headers: { Authorization: `Bearer ${token}` } });

export const sendChatMessage = (message: string, token: string) =>
  request("/chat", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify({ message }),
  });
