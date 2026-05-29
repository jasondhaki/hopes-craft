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
  totalItems: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (product: any) => {
    setCartItems((prev) => {
      const existingItem = prev.find(item => item._id === product._id);
      
      if (existingItem) {
        // If it exists, just increase the quantity
        return prev.map(item =>
          item._id === product._id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      
      // If it's a new item, add it to the array
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

  // Automatically calculate total number of items in the cart for the Navbar badge
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, totalItems }}>
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