import { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { login } from './login';
import { signup } from './signup'; // Import the signup function

interface User {
  id: string;
  email: string;
  name: string;
  token?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (email: string, password: string, name: string) => Promise<{ success: boolean; error?: string }>; // Add signup method
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: async () => ({ success: false }),
  signup: async () => ({ success: false }), // Default signup implementation
  logout: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStoredUser();
  }, []);

  const loadStoredUser = async () => {
    try {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error('Failed to load user from storage', error);
    } finally {
      setLoading(false);
    }
  };

  const loginUser = async (email: string, password: string) => {
    try {
      const response = await login(email, password); // Call the login function from login.ts
      // Make sure response has the required User properties before storing
      if (response.success && response.id && response.email && response.name && response.token) {
        const userData: User = {
          id: response.id,
          email: response.email,
          name: response.name,
          token: response.token
        };
        // Store user data in AsyncStorage
        await AsyncStorage.setItem('user', JSON.stringify(userData));
        setUser(userData); // Update the context with the new user data
        return { success: true };
      } else {
        return { success: false, error: 'Invalid user data received' };
      }
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  };

  const signupUser = async (email: string, password: string, name: string) => {
    try {
      const response = await signup(email, password, name); // Call the signup function
      if (response.success && response.id && response.email && response.name) {
        const userData: User = {
          id: response.id,
          email: response.email,
          name: response.name,
          token: response.name
        };
        // Store user data in AsyncStorage
        await AsyncStorage.setItem('user', JSON.stringify(userData));
        setUser(userData); // Update the context with the new user data
        return { success: true };
      } else {
        return { success: false, error: response.error || 'Invalid user data received' };
      }
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('user');
      setUser(null);
    } catch (error) {
      console.error('Logout error', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login: loginUser, signup: signupUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);