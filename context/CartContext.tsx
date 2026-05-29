"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export interface CartItem {
  _id: string;
  title: string;
  priceBDT: number;
  priceUSD: number;
  imageUrl: string;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: any) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, delta: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotalBDT: number;
  subtotalUSD: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (product: any) => {
    setCartItems((prev) => {
      const existingItem = prev.find(item => item._id === product._id);
      if (existingItem) {
        return prev.map(item =>
          item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, {
        _id: product._id,
        title: product.title || product.name || "Unnamed Product",
        priceBDT: product.priceBDT,
        priceUSD: product.priceUSD,
        imageUrl: product.imageUrl,
        quantity: 1
      }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCartItems((prev) => prev.filter(item => item._id !== productId));
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCartItems((prev) => prev.map(item => {
      if (item._id === productId) {
        const newQuantity = Math.max(1, item.quantity + delta); // Prevent going below 1
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  const subtotalBDT = cartItems.reduce((total, item) => total + (item.priceBDT * item.quantity), 0);
  const subtotalUSD = cartItems.reduce((total, item) => total + (item.priceUSD * item.quantity), 0);

  return (
    <CartContext.Provider value={{ 
      cartItems, addToCart, removeFromCart, updateQuantity, clearCart, 
      totalItems, subtotalBDT, subtotalUSD 
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}