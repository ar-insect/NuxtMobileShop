export interface User {
  id: number;
  username: string;
  name: string;
  role: string;
  avatar: string;
  email?: string;
  phone?: string;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  date: string;
  shippingAddress: {
    name: string;
    phone: string;
    address: string;
  };
}

export interface AuthResponse {
  token: string;
  user: User;
}
