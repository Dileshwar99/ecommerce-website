export interface Product {
  id: string;
  name: string;
  price: number;
  category: 'Running' | 'Lifestyle' | 'High-Top' | 'Limited';
  description: string;
  image: string;
  sizes: number[];
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize: number;
}

export interface UserInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zip: string;
  country: string;
}