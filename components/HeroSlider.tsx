"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";

// Pointing to your local images in the public/images folder
const backgroundImages = [
  "/images/hero-1.jpg",
  "/images/hero-2.jpg",
  "/images/hero-3.jpg"
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full h-[calc(95vh-115px)] min-h-[600px] flex flex-shrink-0 items-center justify-center text-center px-4 overflow-hidden bg-forest-slate">
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
  );
}