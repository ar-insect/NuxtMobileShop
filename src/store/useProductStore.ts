import { create } from 'zustand';
import { Product } from '../types';
import api from '../utils/api';

interface ProductState {
  products: Product[];
  isLoading: boolean;
  error: string | null;
  fetchProducts: () => Promise<void>;
  getProductById: (id: number) => Product | undefined;
}

export const useProductStore = create<ProductState>((set, get) => ({
  products: [],
  isLoading: false,
  error: null,

  fetchProducts: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.get<Product[]>('/products');
      set({ 
        products: Array.isArray(response.data) ? response.data : [], 
        isLoading: false 
      });
    } catch (e: any) {
      set({ 
        isLoading: false, 
        error: e.response?.data?.message || 'Failed to fetch products' 
      });
    }
  },

  getProductById: (id) => {
    return get().products.find(p => p.id === id);
  }
}));
