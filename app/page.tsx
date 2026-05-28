"use client";

import Link from "next/link";
import { ArrowRight, Leaf, Users, Globe2, Mail } from "lucide-react";
import { useState, useEffect } from "react";

// Placeholder images - you can replace these with Hope's Craft actual WebP images later
const backgroundImages = [
  "https://images.unsplash.com/photo-1544485501-44754580fb2b?q=80&w=2070&auto=format&fit=crop", // Woven texture
  "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?q=80&w=2071&auto=format&fit=crop", // Artisan craft
  "https://images.unsplash.com/photo-1459501462159-97d5bded1416?q=80&w=2070&auto=format&fit=crop"  // Earthy nature
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-advance the slider every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col w-full">
      
      {/* 1. Hero Section with Background Slider */}
      <section className="relative w-full h-[80vh] flex items-center justify-center text-center px-4 overflow-hidden bg-forest-slate">
        
        {/* Background Image Slider */}
        {backgroundImages.map((src, index) => (
          <div
            key={src}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
            style={{
              backgroundImage: `url(${src})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        ))}

        {/* Dark Overlay to ensure text remains readable over any image */}
        <div className="absolute inset-0 bg-black/60 z-10"></div> 
        
        <div className="relative z-20 max-w-4xl mx-auto flex flex-col items-center">
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 tracking-tighter leading-tight drop-shadow-lg">
            Woven with <span className="text-terracotta italic font-light pr-2">Heritage</span>
          </h1>
          <p className="font-sans text-base md:text-xl text-gray-200 mb-10 max-w-2xl font-light tracking-wide drop-shadow-md">
            Discover sustainable, 100% biodegradable jute products handcrafted by skilled artisans in Bangladesh.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
            <Link 
              href="/shop" 
              className="bg-white text-black px-8 py-4 rounded-full font-sans font-bold uppercase tracking-[0.15em] text-xs hover:bg-terracotta hover:text-white transition-all flex items-center justify-center space-x-2 group shadow-xl"
            >
              <span>Shop Collection</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              href="/story" 
              className="bg-transparent border border-white text-white px-8 py-4 rounded-full font-sans font-bold uppercase tracking-[0.15em] text-xs hover:bg-white hover:text-black transition-colors flex items-center justify-center shadow-xl"
            >
              Our Story
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Quick Impact Statistics */}
      <section className="py-20 bg-jute-base">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center divide-y md:divide-y-0 md:divide-x divide-terracotta/20">
            
            <div className="flex flex-col items-center pt-8 md:pt-0 px-4">
              <Users size={40} strokeWidth={1} className="text-terracotta mb-4" />
              <h3 className="font-serif text-4xl font-bold text-forest-slate mb-2">500+</h3>
              <p className="font-sans text-sm uppercase tracking-widest font-bold text-forest-slate/70">Artisans Empowered</p>
            </div>

            <div className="flex flex-col items-center pt-8 md:pt-0 px-4">
              <Leaf size={40} strokeWidth={1} className="text-terracotta mb-4" />
              <h3 className="font-serif text-4xl font-bold text-forest-slate mb-2">100%</h3>
              <p className="font-sans text-sm uppercase tracking-widest font-bold text-forest-slate/70">Biodegradable Jute</p>
            </div>

            <div className="flex flex-col items-center pt-8 md:pt-0 px-4">
              <Globe2 size={40} strokeWidth={1} className="text-terracotta mb-4" />
              <h3 className="font-serif text-4xl font-bold text-forest-slate mb-2">Global</h3>
              <p className="font-sans text-sm uppercase tracking-widest font-bold text-forest-slate/70">Ethical Export</p>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Newsletter & B2B Call to Action */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="container mx-auto px-6 max-w-3xl text-center">
          <Mail size={32} strokeWidth={1} className="text-black mx-auto mb-6" />
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-black mb-4">
            Join the Jute Journey
          </h2>
          <p className="font-sans text-gray-500 mb-8 max-w-xl mx-auto">
            Subscribe to receive updates on new artisan collections, or register your business for wholesale access and bulk pricing.
          </p>
          
          <form className="flex flex-col sm:flex-row items-center justify-center max-w-lg mx-auto gap-3">
            <input 
              type="email" 
              placeholder="Enter your email address..." 
              className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-full font-sans text-sm focus:outline-none focus:ring-1 focus:ring-terracotta"
              required
            />
            <button 
              type="button" 
              className="w-full sm:w-auto bg-black text-white px-8 py-4 rounded-full font-sans font-bold uppercase tracking-widest text-xs hover:bg-terracotta transition-colors whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
          
          <div className="mt-8 pt-8 border-t border-gray-100">
            <Link href="/wholesale" className="text-sm font-sans font-bold text-black uppercase tracking-widest hover:text-terracotta transition-colors underline underline-offset-4">
              Looking for Wholesale? Click Here
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}