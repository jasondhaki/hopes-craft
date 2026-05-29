"use client";

import Link from "next/link";
import { useCart } from "../../context/CartContext";
import { useCurrency } from "../../context/CurrencyContext";
import { Trash2, Plus, Minus, ArrowRight, ArrowLeft } from "lucide-react";

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, subtotalBDT, subtotalUSD } = useCart();
  const { currency } = useCurrency();

  const displaySubtotal = currency === "USD" ? `$${subtotalUSD.toFixed(2)}` : `৳${subtotalBDT}`;

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center">
        <h1 className="font-serif text-4xl font-bold text-forest-slate mb-4">Your Cart is Empty</h1>
        <p className="font-sans text-gray-500 mb-8">It looks like you haven't added any jute goods to your cart yet.</p>
        <Link 
          href="/shop" 
          className="bg-forest-slate text-white px-8 py-4 rounded-sm font-sans font-bold uppercase tracking-widest text-xs hover:bg-terracotta transition-colors"
        >
          Explore the Collection
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full bg-white text-black min-h-screen pt-12 pb-24">
      <div className="max-w-6xl mx-auto px-6 w-full">
        
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-forest-slate mb-10">
          Your <span className="text-terracotta italic font-light">Cart</span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left: Cart Items List */}
          <div className="lg:col-span-8 flex flex-col space-y-6">
            {cartItems.map((item) => (
              <div key={item._id} className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6 border-b border-gray-100 pb-6">
                
                {/* Item Image */}
                <div className="w-32 h-32 bg-gray-50 flex-shrink-0 rounded-sm overflow-hidden">
                  {item.imageUrl ? (
                    <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs font-sans">No Image</div>
                  )}
                </div>

                {/* Item Details */}
                <div className="flex flex-col flex-grow text-center sm:text-left w-full">
                  <h3 className="font-serif text-xl font-bold text-forest-slate mb-2">{item.title}</h3>
                  <p className="font-sans text-lg font-medium text-forest-slate mb-4">
                    {currency === "USD" ? `$${item.priceUSD}` : `৳${item.priceBDT}`}
                  </p>

                  <div className="flex items-center justify-center sm:justify-start space-x-6 mt-auto">
                    {/* Quantity Selector */}
                    <div className="flex items-center border border-gray-200 rounded-sm">
                      <button 
                        onClick={() => updateQuantity(item._id, -1)}
                        className="p-2 hover:bg-gray-50 text-gray-500 transition-colors"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="font-sans font-medium text-sm w-8 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item._id, 1)}
                        className="p-2 hover:bg-gray-50 text-gray-500 transition-colors"
                      >
                        <Plus size={16} />
                      </button>
                    </div>

                    {/* Remove Button */}
                    <button 
                      onClick={() => removeFromCart(item._id)}
                      className="text-xs font-sans font-bold uppercase tracking-widest text-red-400 hover:text-red-600 transition-colors flex items-center space-x-1"
                    >
                      <Trash2 size={14} />
                      <span className="hidden sm:inline">Remove</span>
                    </button>
                  </div>
                </div>
                
                {/* Item Total (Desktop only) */}
                <div className="hidden sm:block text-right font-sans font-bold text-lg text-forest-slate">
                  {currency === "USD" ? `$${(item.priceUSD * item.quantity).toFixed(2)}` : `৳${item.priceBDT * item.quantity}`}
                </div>
              </div>
            ))}
          </div>

          {/* Right: Order Summary */}
          <div className="lg:col-span-4">
            <div className="bg-jute-base p-8 rounded-sm sticky top-32">
              <h2 className="font-serif text-2xl font-bold text-forest-slate mb-6 border-b border-forest-slate/10 pb-4">Order Summary</h2>
              
              <div className="flex justify-between font-sans text-forest-slate/80 mb-4">
                <span>Subtotal</span>
                <span>{displaySubtotal}</span>
              </div>
              <div className="flex justify-between font-sans text-forest-slate/80 mb-6">
                <span>Shipping</span>
                <span className="text-sm italic">Calculated at checkout</span>
              </div>

              <div className="flex justify-between font-serif font-bold text-2xl text-forest-slate border-t border-forest-slate/10 pt-4 mb-8">
                <span>Total</span>
                <span>{displaySubtotal}</span>
              </div>

              <Link 
                href="/checkout"
                className="w-full bg-forest-slate text-white py-4 text-xs font-bold uppercase tracking-widest shadow-lg hover:bg-terracotta transition-colors flex items-center justify-center space-x-2 rounded-sm group"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link 
                href="/shop"
                className="w-full mt-4 bg-transparent text-forest-slate py-4 text-xs font-bold uppercase tracking-widest hover:text-terracotta transition-colors flex items-center justify-center space-x-2 rounded-sm group"
              >
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                <span>Continue Shopping</span>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}