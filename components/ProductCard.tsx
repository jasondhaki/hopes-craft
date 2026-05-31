"use client";

import Link from "next/link";
import Image from "next/image"; // <-- 1. Imported Next.js Image component
import { ArrowRight, ShoppingBag } from "lucide-react";
import { useCurrency } from "../context/CurrencyContext";
import { useCart } from "../context/CartContext";

interface Product {
  _id: string;
  title?: string;
  name?: string; 
  slug: string;
  imageUrl: string;
  priceBDT: number;
  priceUSD: number;
  category: string;
}

export default function ProductCard({ product }: { product: Product }) {
  const { currency } = useCurrency();
  const { addToCart } = useCart();

  const displayPrice = currency === "USD" 
    ? `$${product.priceUSD || 0}` 
    : `৳${product.priceBDT || 0}`;

  const displayTitle = product.title || product.name || "Unnamed Product";

  return (
    <div className="group flex flex-col bg-white rounded-sm overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
      
      <div className="relative h-80 w-full overflow-hidden bg-gray-50 block">
        {/* Added "relative" to the Link wrapper so the fill Image property works perfectly */}
        <Link href={`/shop/${product.slug}`} className="relative block w-full h-full">
          {product.imageUrl ? (
            <Image
              src={product.imageUrl}
              alt={displayTitle}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 font-sans text-sm">
              No Image
            </div>
          )}
        </Link>

        {product.category && (
          <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-forest-slate shadow-sm pointer-events-none">
            {product.category}
          </span>
        )}

        <div className="absolute bottom-0 left-0 w-full p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out">
          <button 
            className="w-full bg-forest-slate text-white py-3 text-xs font-bold uppercase tracking-widest shadow-lg hover:bg-terracotta transition-colors flex items-center justify-center space-x-2"
            onClick={(e) => {
              e.preventDefault(); 
              addToCart(product);
              alert(`${displayTitle} added to cart!`);
            }}
          >
            <ShoppingBag size={16} />
            <span>Quick Add</span>
          </button>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow text-center">
        <Link href={`/shop/${product.slug}`}>
          <h3 className="font-serif text-xl font-bold text-forest-slate mb-4 group-hover:text-terracotta transition-colors line-clamp-2">
            {displayTitle}
          </h3>
        </Link>

        <p className="font-sans text-lg text-forest-slate mb-6 font-medium mt-auto">
          {displayPrice}
        </p>
        
        <div className="mt-auto">
          <Link 
            href={`/shop/${product.slug}`}
            className="inline-flex items-center space-x-2 text-xs font-sans font-bold uppercase tracking-widest text-forest-slate hover:text-terracotta transition-colors border-b-2 border-transparent hover:border-terracotta pb-1"
          >
            <span>View Details</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}