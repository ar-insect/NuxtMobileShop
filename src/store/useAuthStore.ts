import { create } from 'zustand';
import { User, AuthResponse } from '../types';
import api from '../utils/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  loadUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isLoading: false,
  error: null,

  login: async (username, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.post<AuthResponse>('/auth/login', { username, password });
      const { token, user } = response.data;
      
      await AsyncStorage.setItem('auth-token', token);
      await AsyncStorage.setItem('auth-user', JSON.stringify(user));
      
      set({ user, token, isLoading: false });
    } catch (e: any) {
      set({ 
        isLoading: false, 
        error: e.response?.data?.message || 'Login failed' 
      });
      throw e;
    }
  },

  logout: async () => {
    await AsyncStorage.removeItem('auth-token');
    await AsyncStorage.removeItem('auth-user');
    set({ user: null, token: null });
  },

  loadUser: async () => {
    try {
      const token = await AsyncStorage.getItem('auth-token');
      const userStr = await AsyncStorage.getItem('auth-user');
      
      if (token && userStr) {
        set({ token, user: JSON.parse(userStr) });
      }
    } catch (e) {
      console.error('Failed to load user', e);
    }
  }
}));
