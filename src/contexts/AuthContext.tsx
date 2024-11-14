import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, rememberMe?: boolean) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  resetPassword: (email: string) => Promise<void>;
  updatePassword: (token: string, newPassword: string) => Promise<void>;
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface RegisterData {
  association: string;
  name: string;
  email: string;
  password: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
        if (!accessToken) {
          setIsLoading(false);
          return;
        }

        // Récupérer l'utilisateur du localStorage
        const storedUser = localStorage.getItem('currentUser');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        handleLogout();
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string, rememberMe = false) => {
    try {
      // Vérifier si l'utilisateur existe déjà
      const members = JSON.parse(localStorage.getItem('association_members') || '[]');
      const existingUser = members.find((m: User) => m.email === email);

      if (!existingUser) {
        throw new Error('Utilisateur non trouvé');
      }

      setUser(existingUser);
      localStorage.setItem('currentUser', JSON.stringify(existingUser));
      localStorage.setItem(ACCESS_TOKEN_KEY, 'mock_token');
      
      if (rememberMe) {
        localStorage.setItem(REFRESH_TOKEN_KEY, 'mock_refresh_token');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw new Error('Échec de la connexion');
    }
  };

  const register = async (data: RegisterData) => {
    try {
      const associationId = Date.now().toString();
      const newUser: User = {
        id: Date.now().toString(),
        name: data.name,
        email: data.email,
        role: 'responsable',
        associationId,
        associationName: data.association
      };

      // Sauvegarder l'association
      const association = {
        id: associationId,
        name: data.association,
        createdAt: new Date(),
        createdBy: newUser.id
      };
      localStorage.setItem('associations', JSON.stringify([association]));

      // Sauvegarder l'utilisateur
      const members = [newUser];
      localStorage.setItem('association_members', JSON.stringify(members));
      localStorage.setItem('currentUser', JSON.stringify(newUser));

      setUser(newUser);
      localStorage.setItem(ACCESS_TOKEN_KEY, 'mock_token');
    } catch (error) {
      console.error('Registration error:', error);
      throw new Error('Échec de l\'inscription');
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem('currentUser');
  };

  const resetPassword = async (email: string) => {
    console.log('Reset password requested for:', email);
  };

  const updatePassword = async (token: string, newPassword: string) => {
    console.log('Password updated with token:', token);
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        login, 
        register, 
        logout: handleLogout, 
        resetPassword,
        updatePassword,
        isAuthenticated: !!user,
        isLoading 
      }}
    >
      {!isLoading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}