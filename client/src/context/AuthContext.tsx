import { createContext, useState, useContext, useEffect } from 'react';
import type { ReactNode } from 'react';
import { jwtDecode } from 'jwt-decode';
import { logoutUser } from '../services/authService';

interface User {
  userId: string; // Changed from 'id' to 'userId' to match the JWT payload
  username: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const isTokenExpired = (token: string): boolean => {
  try {
    const decoded = jwtDecode(token);
    if(!decoded || !decoded.exp) return true;
    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp < currentTime;
  } catch {
    return true;
  }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      try {
        if (isTokenExpired(storedToken)) {
          console.log('Token has expired, clearing authentication');
          localStorage.removeItem('token');
          setUser(null);
          setToken(null);
          return;
        }

        const decodedUser: User = jwtDecode(storedToken);
        setUser(decodedUser);
        setToken(storedToken);
      } catch (error) {
        console.error('Failed to decode token:', error);
        localStorage.removeItem('token');
        setUser(null);
        setToken(null);
      }
    }
  }, []);

  const login = (newToken: string) => {
    try {
      const decodedUser: User = jwtDecode(newToken);
      localStorage.setItem('token', newToken);
      setUser(decodedUser);
      setToken(newToken);
    } catch (error) {
      console.error('Failed to decode token on login:', error);
    }
  };

  const logout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error('Failed to logout:', error);
    } finally {
      localStorage.removeItem('token');
      setUser(null);
      setToken(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 