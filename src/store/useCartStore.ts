import { create } from 'zustand';
import { CartItem, Product } from '../types';
import api from '../utils/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface CartState {
  cartItems: CartItem[];
  addToCart: (product: Product) => Promise<void>;
  removeFromCart: (productId: number) => Promise<void>;
  updateQuantity: (productId: number, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  loadCart: () => Promise<void>;
}

export const useCartStore = create<CartState>((set, get) => ({
  cartItems: [],

  addToCart: async (product) => {
    const existingItem = get().cartItems.find(item => item.id === product.id);
    let newItems: CartItem[];

    if (existingItem) {
      newItems = get().cartItems.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      newItems = [...get().cartItems, { ...product, quantity: 1 }];
    }

    set({ cartItems: newItems });
    await AsyncStorage.setItem('cart-data', JSON.stringify(newItems));
    
    // Sync with server if logged in (optional)
    try {
      await api.post('/cart', newItems);
    } catch (e) {
      // Ignore server sync errors for now
    }
  },

  removeFromCart: async (productId) => {
    const newItems = get().cartItems.filter(item => item.id !== productId);
    set({ cartItems: newItems });
    await AsyncStorage.setItem('cart-data', JSON.stringify(newItems));
  },

  updateQuantity: async (productId, quantity) => {
    const newItems = get().cartItems.map(item => 
      item.id === productId 
        ? { ...item, quantity: Math.max(1, quantity) }
        : item
    );
    set({ cartItems: newItems });
    await AsyncStorage.setItem('cart-data', JSON.stringify(newItems));
  },

  clearCart: async () => {
    set({ cartItems: [] });
    await AsyncStorage.removeItem('cart-data');
  },

  loadCart: async () => {
    try {
      const data = await AsyncStorage.getItem('cart-data');
      if (data) {
        set({ cartItems: JSON.parse(data) });
      } else {
        // Try fetch from server
        try {
          const res = await api.get('/cart');
          if (res.data) {
            set({ cartItems: res.data });
          }
        } catch (e) {
          // Ignore
        }
      }
    } catch (e) {
      console.error('Failed to load cart', e);
    }
  }
}));
