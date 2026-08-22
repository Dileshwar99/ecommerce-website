import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem } from '../types';

export interface ToastNotification {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

interface CartContextType {
  cart: CartItem[];
  wishlist: Product[];
  addToCart: (product: Product, selectedSize: number, quantity?: number) => void;
  removeFromCart: (productId: string, selectedSize: number) => void;
  updateQuantity: (productId: string, selectedSize: number, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  getCartTotal: () => number;
  getCartCount: () => number;
  discount: number;
  appliedCoupon: string | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  toasts: ToastNotification[];
  showToast: (message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  removeToast: (id: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('neous_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('neous_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(() => {
    try {
      return localStorage.getItem('neous_coupon') || null;
    } catch {
      return null;
    }
  });

  const [discountPercent, setDiscountPercent] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('neous_coupon');
      if (saved?.toUpperCase() === 'NEOUS10') return 10;
      if (saved?.toUpperCase() === 'FIRSTDROP') return 15;
      if (saved?.toUpperCase() === 'VIP20') return 20;
      return 0;
    } catch {
      return 0;
    }
  });

  const [toasts, setToasts] = useState<ToastNotification[]>([]);

  useEffect(() => {
    try {
      localStorage.setItem('neous_cart', JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('neous_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error('Failed to save wishlist to localStorage', e);
    }
  }, [wishlist]);

  useEffect(() => {
    if (appliedCoupon) {
      localStorage.setItem('neous_coupon', appliedCoupon);
    } else {
      localStorage.removeItem('neous_coupon');
    }
  }, [appliedCoupon]);

  const showToast = (message: string, type: 'success' | 'info' | 'warning' | 'error' = 'success') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      removeToast(id);
    }, 3500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const addToCart = (product: Product, selectedSize: number, quantity = 1) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) => item.id === product.id && item.selectedSize === selectedSize
      );

      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity
        };
        return updated;
      } else {
        return [...prevCart, { ...product, selectedSize, quantity }];
      }
    });
    showToast(`Added ${product.name} (UK ${selectedSize}) to bag!`, 'success');
  };

  const removeFromCart = (productId: string, selectedSize: number) => {
    const item = cart.find(i => i.id === productId && i.selectedSize === selectedSize);
    setCart((prevCart) =>
      prevCart.filter((item) => !(item.id === productId && item.selectedSize === selectedSize))
    );
    if (item) {
      showToast(`Removed ${item.name} from bag`, 'info');
    }
  };

  const updateQuantity = (productId: string, selectedSize: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, selectedSize);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId && item.selectedSize === selectedSize
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
    setDiscountPercent(0);
  };

  const toggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.some((item) => item.id === product.id);
      if (exists) {
        showToast(`Removed ${product.name} from wishlist`, 'info');
        return prev.filter((item) => item.id !== product.id);
      } else {
        showToast(`Added ${product.name} to wishlist`, 'success');
        return [...prev, product];
      }
    });
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some((item) => item.id === productId);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  const applyCoupon = (code: string) => {
    const upper = code.trim().toUpperCase();
    if (upper === 'NEOUS10') {
      setAppliedCoupon(upper);
      setDiscountPercent(10);
      showToast('Promo code NEOUS10 applied! 10% discount added.', 'success');
      return { success: true, message: '10% discount applied!' };
    } else if (upper === 'FIRSTDROP') {
      setAppliedCoupon(upper);
      setDiscountPercent(15);
      showToast('Promo code FIRSTDROP applied! 15% discount added.', 'success');
      return { success: true, message: '15% discount applied!' };
    } else if (upper === 'VIP20') {
      setAppliedCoupon(upper);
      setDiscountPercent(20);
      showToast('VIP Promo code VIP20 applied! 20% discount added.', 'success');
      return { success: true, message: '20% discount applied!' };
    } else {
      showToast('Invalid promo code. Try NEOUS10 or FIRSTDROP', 'error');
      return { success: false, message: 'Invalid promo code. Try NEOUS10 or FIRSTDROP' };
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setDiscountPercent(0);
    showToast('Promo code removed', 'info');
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        wishlist,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleWishlist,
        isInWishlist,
        getCartTotal,
        getCartCount,
        discount: discountPercent,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        toasts,
        showToast,
        removeToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
