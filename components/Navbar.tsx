"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { ShoppingBag, Menu, X, Search, User, Loader2, Shield } from "lucide-react"; // <-- 1. Imported Shield icon
import { useCurrency } from "../context/CurrencyContext";
import { useCart } from "../context/CartContext";
import { searchProducts } from "../app/actions/search";
import { Show, SignInButton, UserButton, useUser } from "@clerk/nextjs"; // <-- 2. Imported useUser

export default function Navbar() {
  const { currency, toggleCurrency } = useCurrency();
  const { totalItems } = useCart();
  
  // 3. Fetch current logged-in user data from Clerk
  const { user } = useUser();
  // 4. Check if the current user's email matches the Admin email in your .env.local
  const isAdmin = user?.primaryEmailAddress?.emailAddress === process.env.NEXT_PUBLIC_ADMIN_EMAIL;
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Search State
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  
  const searchRef = useRef<HTMLDivElement>(null);

  // Debounced Search Effect
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchTerm.length >= 2) {
        setIsSearching(true);
        const results = await searchProducts(searchTerm);
        setSearchResults(results);
        setIsSearching(false);
        setShowDropdown(true);
      } else {
        setSearchResults([]);
        setShowDropdown(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const closeSearch = () => {
    setShowDropdown(false);
    setSearchTerm("");
    setIsMobileMenuOpen(false);
  };

  const SearchDropdown = () => {
    if (!showDropdown) return null;

    return (
      <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-sm shadow-2xl border border-gray-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
        {isSearching ? (
          <div className="flex items-center justify-center py-8 text-forest-slate">
            <Loader2 size={24} className="animate-spin" />
          </div>
        ) : searchResults.length > 0 ? (
          <div className="flex flex-col max-h-[60vh] overflow-y-auto">
            {searchResults.map((product) => (
              <Link 
                href={`/product/${product.slug}`} 
                key={product._id}
                onClick={closeSearch}
                className="flex items-center space-x-4 p-4 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0"
              >
                <div className="w-12 h-12 bg-gray-100 rounded-sm overflow-hidden flex-shrink-0">
                  {product.imageUrl ? (
                    <img src={product.imageUrl} alt={product.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-jute-base"></div>
                  )}
                </div>
                <div className="flex flex-col flex-grow">
                  <span className="font-sans font-bold text-sm text-forest-slate truncate">{product.title || product.name}</span>
                  <span className="font-sans text-xs text-terracotta mt-0.5">
                    {currency === "USD" ? `$${product.priceUSD.toFixed(2)}` : `৳${product.priceBDT}`}
                  </span>
                </div>
              </Link>
            ))}
            <Link 
              href="/shop" 
              onClick={closeSearch}
              className="block w-full text-center py-3 bg-gray-50 font-sans text-xs font-bold uppercase tracking-widest text-forest-slate hover:text-terracotta transition-colors"
            >
              View All Products
            </Link>
          </div>
        ) : (
          <div className="py-8 text-center px-4">
            <p className="font-sans text-sm text-gray-500">No products found for "{searchTerm}"</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <header className="sticky top-0 z-50 w-full flex flex-col shadow-sm">
      <div className="bg-black text-white text-xs py-2 px-4 text-center font-sans tracking-wide font-medium">
        Global Shipping Available | 100% Biodegradable Jute
      </div>

      <nav className="bg-white border-b border-gray-200 relative">
        <div className="container mx-auto px-4 lg:px-6 py-4 flex justify-between items-center">
          
          <button 
            className="lg:hidden p-2 -ml-2 text-black hover:text-terracotta transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-full border-2 border-black flex items-center justify-center text-black font-serif text-lg leading-none transition-transform group-hover:scale-105">
              HC
            </div>
            <span className="font-serif text-2xl font-bold text-black tracking-tight hidden sm:block">
              Hope's<span className="text-[#E2725B] italic font-light ml-1">Craft</span>
            </span>
          </Link>

          <div className="hidden lg:flex items-center space-x-8 font-sans">
            <Link href="/" className="text-sm font-semibold text-black hover:text-terracotta transition-colors">Home</Link>
            <Link href="/shop" className="text-sm font-semibold text-black hover:text-terracotta transition-colors">Shop</Link>
            <Link href="/story" className="text-sm font-semibold text-black hover:text-terracotta transition-colors">Our Story</Link>
            <Link href="/wholesale" className="text-sm font-semibold text-black hover:text-terracotta transition-colors">Wholesale</Link>
            <Link href="/contact" className="text-sm font-semibold text-black hover:text-terracotta transition-colors">Contact Us</Link>
          </div>

          <div className="flex items-center space-x-4 lg:space-x-6">
            
            <div className="relative hidden md:block group" ref={searchRef}>
              <Search size={18} className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${showDropdown || searchTerm ? 'text-terracotta' : 'text-gray-400 group-focus-within:text-terracotta'}`} />
              <input 
                type="text" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => searchTerm.length >= 2 && setShowDropdown(true)}
                placeholder="Search products..." 
                className="pl-11 pr-4 py-2 bg-gray-100 border border-transparent rounded-full text-sm font-sans focus:outline-none focus:ring-1 focus:ring-terracotta focus:border-terracotta w-48 lg:w-64 transition-all focus:bg-white placeholder:text-gray-500"
              />
              <SearchDropdown />
            </div>

            <button 
              onClick={toggleCurrency}
              className="hidden sm:flex items-center space-x-1 text-sm font-bold text-black hover:text-terracotta transition-colors"
              title="Switch Currency"
            >
              <span className="text-lg leading-none font-serif font-medium">{currency === "USD" ? "$" : "৳"}</span>
              <span>{currency}</span>
            </button>

            {/* Desktop Clerk User Authentication with Admin Panel */}
            <div className="hidden sm:flex items-center justify-center">
              <Show when="signed-out">
                <SignInButton mode="modal">
                  <button className="p-1 text-black hover:text-terracotta transition-colors" title="Sign In">
                    <User size={22} strokeWidth={1.5} />
                  </button>
                </SignInButton>
              </Show>
              <Show when="signed-in">
                <UserButton 
                  appearance={{
                    elements: {
                      avatarBox: "w-8 h-8 border-2 border-transparent hover:border-terracotta transition-colors"
                    }
                  }}
                >
                  <UserButton.MenuItems>
                    {/* 5. Dynamically inject the Admin route if they match */}
                    {isAdmin && (
                      <UserButton.Link
                        label="Admin Dashboard"
                        labelIcon={<Shield size={16} className="text-terracotta" />}
                        href="/studio"
                      />
                    )}
                    <UserButton.Action label="manageAccount" />
                    <UserButton.Action label="signOut" />
                  </UserButton.MenuItems>
                </UserButton>
              </Show>
            </div>
            
            <Link href="/cart" onClick={() => setIsMobileMenuOpen(false)} className="relative p-1 text-black hover:text-terracotta transition-colors">
              <ShoppingBag size={22} strokeWidth={1.5} />
              <span className="absolute -top-1 -right-1 bg-terracotta text-white text-[10px] font-bold rounded-full h-[18px] w-[18px] flex items-center justify-center border-2 border-white">
                {totalItems}
              </span>
            </Link>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 px-4 py-6 flex flex-col space-y-5 font-sans shadow-lg absolute w-full z-50">
            
            <div className="relative w-full mb-2" ref={searchRef}>
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => searchTerm.length >= 2 && setShowDropdown(true)}
                placeholder="Search products..." 
                className="w-full pl-11 pr-4 py-3 bg-gray-100 border border-transparent rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-terracotta focus:border-terracotta focus:bg-white"
              />
              <SearchDropdown />
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

              {/* Mobile Clerk User Authentication with Admin Panel */}
              <div className="flex items-center">
                <Show when="signed-out">
                  <SignInButton mode="modal">
                    <button className="flex items-center space-x-2 text-black font-semibold hover:text-terracotta transition-colors">
                      <User size={20} strokeWidth={1.5} />
                      <span>Sign In</span>
                    </button>
                  </SignInButton>
                </Show>
                <Show when="signed-in">
                  <div className="flex items-center space-x-3 text-black font-semibold">
                    <span>Profile</span>
                    <UserButton>
                      <UserButton.MenuItems>
                        {isAdmin && (
                          <UserButton.Link
                            label="Admin Dashboard"
                            labelIcon={<Shield size={16} className="text-terracotta" />}
                            href="/studio"
                          />
                        )}
                        <UserButton.Action label="manageAccount" />
                        <UserButton.Action label="signOut" />
                      </UserButton.MenuItems>
                    </UserButton>
                  </div>
                </Show>
              </div>
              
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}