"use client";

import { useCurrency } from "../context/CurrencyContext";
// 1. Import the Cart context
import { useCart } from "../context/CartContext";
import { ShoppingBag, Mail } from "lucide-react";
import Link from "next/link";

export default function ProductActions({ product }: { product: any }) {
  const { currency } = useCurrency();
  // 2. Extract the addToCart function
  const { addToCart } = useCart();

  const displayPrice = currency === "USD" 
    ? `$${product.priceUSD || 0}` 
    : `৳${product.priceBDT || 0}`;

  return (
    <div className="flex flex-col space-y-6">
      <div className="text-3xl font-sans font-medium text-forest-slate">
        {displayPrice}
      </div>

      <div className="flex flex-col space-y-3">
        {/* 3. Wire up the button */}
        <button 
          onClick={() => {
            addToCart(product);
            alert(`${product.title || product.name || "Item"} added to cart!`);
          }}
          className="w-full bg-forest-slate text-white py-4 text-xs font-bold uppercase tracking-widest shadow-lg hover:bg-terracotta transition-colors flex items-center justify-center space-x-2 rounded-sm"
        >
          <ShoppingBag size={18} />
          <span>Add to Cart</span>
        </button>

        <Link 
          href="/wholesale"
          className="w-full bg-transparent border-2 border-forest-slate text-forest-slate py-4 text-xs font-bold uppercase tracking-widest hover:bg-forest-slate hover:text-white transition-colors flex items-center justify-center space-x-2 rounded-sm"
        >
          <Mail size={18} />
          <span>Request Bulk Quote</span>
        </Link>
      </div>

      <div className="pt-6 border-t border-gray-100 flex flex-col space-y-2 font-sans text-sm text-gray-500">
        <p>✓ 100% Biodegradable & Sustainable</p>
        <p>✓ Handcrafted by Artisans in Bangladesh</p>
        <p>✓ Global Shipping Available</p>
      </div>
    </div>
  );
}