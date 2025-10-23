import { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

interface AuthProviderProps {
  children: ReactNode;
}
export const AuthContext = createContext<AuthContextType | null>(null)

interface User {
  nickname: string;
  followers: string[];
  following: string[];
}

interface AuthContextType {
  user: User| null;
  login: (userData: any) => void;
  logout: () => void;
}


export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState(null);

  // 3️⃣ Al iniciar la app, verificamos si hay sesión guardada
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // 4️⃣ Función para iniciar sesión
  const login = (userData: any) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  // 5️⃣ Función para cerrar sesión
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  // 6️⃣ Compartimos el valor a todos los hijos
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
