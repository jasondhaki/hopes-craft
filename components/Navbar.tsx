"use client";

import Link from "next/link";
import { useState } from "react";
import { ShoppingBag, Menu, X, Search, User } from "lucide-react";
import { useCurrency } from "../context/CurrencyContext";
// 1. Import the Cart context
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { currency, toggleCurrency } = useCurrency();
  // 2. Pull the live totalItems count from the global brain
  const { totalItems } = useCart();
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full flex flex-col shadow-sm">
      {/* Top Announcement Bar - Pure Black */}
      <div className="bg-black text-white text-xs py-2 px-4 text-center font-sans tracking-wide font-medium">
        Global Shipping Available | 100% Biodegradable Jute
      </div>

      {/* Main Navigation - Pure White */}
      <nav className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 lg:px-6 py-4 flex justify-between items-center">
          
          {/* Mobile Menu Button (Left on mobile) */}
          <button 
            className="lg:hidden p-2 -ml-2 text-black hover:text-terracotta transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Brand Logo & Placeholder */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-full border-2 border-black flex items-center justify-center text-black font-serif text-lg leading-none transition-transform group-hover:scale-105">
              HC
            </div>
            <span className="font-serif text-2xl font-bold text-black tracking-tight hidden sm:block">
              Hope's<span className="text-terracotta italic font-light ml-1">Craft</span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-8 font-sans">
            <Link href="/" className="text-sm font-semibold text-black hover:text-terracotta transition-colors">Home</Link>
            <Link href="/shop" className="text-sm font-semibold text-black hover:text-terracotta transition-colors">Shop</Link>
            <Link href="/story" className="text-sm font-semibold text-black hover:text-terracotta transition-colors">Our Story</Link>
            <Link href="/wholesale" className="text-sm font-semibold text-black hover:text-terracotta transition-colors">Wholesale</Link>
            <Link href="/contact" className="text-sm font-semibold text-black hover:text-terracotta transition-colors">Contact Us</Link>
          </div>

          {/* Right Utilities Container */}
          <div className="flex items-center space-x-4 lg:space-x-6">
            
            {/* Search Bar */}
            <div className="relative hidden md:block group">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-terracotta transition-colors" />
              <input 
                type="text" 
                placeholder="Search products..." 
                className="pl-11 pr-4 py-2 bg-gray-100 border-none rounded-full text-sm font-sans focus:outline-none focus:ring-1 focus:ring-terracotta w-48 lg:w-64 transition-all focus:bg-white placeholder:text-gray-500"
              />
            </div>

            {/* Currency Switcher */}
            <button 
              onClick={toggleCurrency}
              className="hidden sm:flex items-center space-x-1 text-sm font-bold text-black hover:text-terracotta transition-colors"
              title="Switch Currency"
            >
              <span className="text-lg leading-none font-serif font-medium">{currency === "USD" ? "$" : "৳"}</span>
              <span>{currency}</span>
            </button>

            {/* User Account Icon */}
            <button className="hidden sm:block p-1 text-black hover:text-terracotta transition-colors">
              <User size={22} strokeWidth={1.5} />
            </button>
            
            {/* Cart Icon & Live Badge */}
            <Link href="/cart" className="relative p-1 text-black hover:text-terracotta transition-colors">
              <ShoppingBag size={22} strokeWidth={1.5} />
              {/* 3. Inject the dynamic totalItems here */}
              <span className="absolute -top-1 -right-1 bg-terracotta text-white text-[10px] font-bold rounded-full h-[18px] w-[18px] flex items-center justify-center border-2 border-white">
                {totalItems}
              </span>
            </Link>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 px-4 py-6 flex flex-col space-y-5 font-sans shadow-lg absolute w-full">
            <div className="relative w-full mb-2">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search products..." 
                className="w-full pl-11 pr-4 py-3 bg-gray-100 border-none rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-terracotta"
              />
            </div>

            <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="text-base font-semibold text-black">Home</Link>
            <Link href="/shop" onClick={() => setIsMobileMenuOpen(false)} className="text-base font-semibold text-black">Shop</Link>
            <Link href="/story" onClick={() => setIsMobileMenuOpen(false)} className="text-base font-semibold text-black">Our Story</Link>
            <Link href="/wholesale" onClick={() => setIsMobileMenuOpen(false)} className="text-base font-semibold text-black">Wholesale</Link>
            <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="text-base font-semibold text-black">Contact Us</Link>
            
            <div className="h-px bg-gray-200 w-full my-2"></div>
            
            <div className="flex items-center justify-between pt-2">
              <button onClick={toggleCurrency} className="flex items-center space-x-2 text-base font-bold text-black">
                <span className="text-xl leading-none font-serif font-medium">{currency === "USD" ? "$" : "৳"}</span>
                <span>{currency}</span>
              </button>
              <button className="flex items-center space-x-2 text-black font-semibold">
                <User size={20} strokeWidth={1.5} />
                <span>Account</span>
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}