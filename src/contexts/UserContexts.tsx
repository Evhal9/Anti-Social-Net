import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';

interface UserContextType {
 user: User | null;
 login: (user: User) => void;
 logout: () => void;
 isLoading: boolean; 
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
 const [user, setUser] = useState<User | null>(null);
 const [isLoading, setIsLoading] = useState(true); // <-- 2. AÑADE EL ESTADO 'isLoading'

 useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user');
    if (storedUser) {
     setUser(JSON.parse(storedUser));
    }
    } catch (error) {
      console.error("Error al cargar usuario de localStorage", error);
    } finally {
      setIsLoading(false);
    }
 }, []);

 const login = (userData: User) => {
  setUser(userData);
  localStorage.setItem('user', JSON.stringify(userData));
 };

 const logout = () => {
  setUser(null);
  localStorage.removeItem('user');
 };

 return (
  <UserContext.Provider value={{ user, login, logout, isLoading }}>
   {children}
  </UserContext.Provider>
 );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useUser = () => {
 const context = useContext(UserContext);
 if (context === undefined) {
  throw new Error('useUser must be used within a UserProvider');
 }
 return context;
};