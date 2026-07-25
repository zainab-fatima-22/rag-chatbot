import { createContext, useContext, useState, ReactNode } from "react";
import { loginUser, registerUser } from "../services/api";

interface AuthUser {
  _id: string;
  name: string;
  email: string;
  role: string;
  token: string;
}

interface AuthContextType {
  user: AuthUser | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => {
    const stored = localStorage.getItem("taxAssistUser");
    return stored ? JSON.parse(stored) : null;
  });

  const persist = (data: AuthUser) => {
    localStorage.setItem("taxAssistUser", JSON.stringify(data));
    setUser(data);
  };

  const login = async (email: string, password: string) => {
    const data = await loginUser(email, password);
    persist(data);
  };

  const register = async (name: string, email: string, password: string) => {
    const data = await registerUser(name, email, password);
    persist(data);
  };

  const logout = () => {
    localStorage.removeItem("taxAssistUser");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
