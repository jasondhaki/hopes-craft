import Link from "next/link";
import { Leaf, Users, Globe2, Mail } from "lucide-react";
import { client } from "../lib/sanity";
import HeroSlider from "../components/HeroSlider";
import TrustBar from "../components/TrustBar";
import ProductCard from "../components/ProductCard"; // IMPORTING YOUR EXISTING CARD

// Force dynamic to ensure fresh product data
export const dynamic = "force-dynamic";

// Fetch data from Sanity
async function getHomePageData() {
  const latest = await client.fetch(`*[_type == "product"] | order(_createdAt desc)[0...5] {
    _id, title, name, "slug": slug.current, "imageUrl": image.asset->url, priceBDT, priceUSD, "category": category->title
  }`);
  
  const bestSellers = await client.fetch(`*[_type == "product" && isBestSeller == true][0...5] {
    _id, title, name, "slug": slug.current, "imageUrl": image.asset->url, priceBDT, priceUSD, "category": category->title
  }`);
  
  return { latest, bestSellers };
}

export default async function Home() {
  const { latest, bestSellers } = await getHomePageData();

  return (
    <div className="flex flex-col w-full">
      
      {/* 1. Hero Section (Now a client component) */}
      <HeroSlider />

      {/* 2. Trust Bar */}
      <TrustBar />

      {/* 3. Latest Arrivals Slider */}
      <section className="py-24 px-6 max-w-7xl mx-auto w-full">
        <div className="flex justify-between items-end mb-10 border-b border-gray-100 pb-4">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-forest-slate">Latest Arrivals</h2>
          <Link href="/shop" className="font-sans text-xs font-bold uppercase tracking-widest text-terracotta hover:text-forest-slate transition-colors">View All</Link>
        </div>
        
        {/* Horizontal CSS-only Slider */}
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 hide-scrollbar">
          {latest.map((p: any) => (
            // Wrapping the ProductCard in a div to enforce slider dimensions
            <div key={p._id} className="snap-start shrink-0 w-[75vw] md:w-[calc(25%-18px)]">
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </section>

      {/* 4. Best Sellers Slider */}
      {bestSellers?.length > 0 && (
        <section className="py-24 px-6 w-full bg-jute-base/30">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-end mb-10 border-b border-gray-200 pb-4">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-forest-slate">Best Sellers</h2>
              <Link href="/shop" className="font-sans text-xs font-bold uppercase tracking-widest text-terracotta hover:text-forest-slate transition-colors">Shop Bestsellers</Link>
            </div>
            
            {/* Horizontal CSS-only Slider */}
            <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 hide-scrollbar">
              {bestSellers.map((p: any) => (
                <div key={p._id} className="snap-start shrink-0 w-[75vw] md:w-[calc(25%-18px)]">
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 5. Quick Impact Statistics */}
      <section className="py-20 bg-forest-slate text-white w-full">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center divide-y md:divide-y-0 md:divide-x divide-white/20">
            <div className="flex flex-col items-center pt-8 md:pt-0 px-4">
              <Users size={40} strokeWidth={1} className="text-terracotta mb-4" />
              <h3 className="font-serif text-4xl font-bold mb-2">500+</h3>
              <p className="font-sans text-sm uppercase tracking-widest font-bold text-white/70">Artisans Empowered</p>
            </div>
            <div className="flex flex-col items-center pt-8 md:pt-0 px-4">
              <Leaf size={40} strokeWidth={1} className="text-terracotta mb-4" />
              <h3 className="font-serif text-4xl font-bold mb-2">100%</h3>
              <p className="font-sans text-sm uppercase tracking-widest font-bold text-white/70">Biodegradable Jute</p>
            </div>
            <div className="flex flex-col items-center pt-8 md:pt-0 px-4">
              <Globe2 size={40} strokeWidth={1} className="text-terracotta mb-4" />
              <h3 className="font-serif text-4xl font-bold mb-2">Global</h3>
              <p className="font-sans text-sm uppercase tracking-widest font-bold text-white/70">Ethical Export</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Newsletter & B2B Call to Action */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="container mx-auto px-6 max-w-3xl text-center">
          <Mail size={32} strokeWidth={1} className="text-black mx-auto mb-6" />
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-black mb-4">Join the Jute Journey</h2>
          <p className="font-sans text-gray-500 mb-8 max-w-xl mx-auto">
            Subscribe to receive updates on new artisan collections, or register your business for wholesale access and bulk pricing.
          </p>
          <form className="flex flex-col sm:flex-row items-center justify-center max-w-lg mx-auto gap-3">
            <input type="email" placeholder="Enter your email address..." className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-sm font-sans text-sm focus:outline-none focus:ring-1 focus:ring-terracotta" required />
            <button type="button" className="w-full sm:w-auto bg-black text-white px-8 py-4 rounded-sm font-sans font-bold uppercase tracking-widest text-xs hover:bg-terracotta transition-colors whitespace-nowrap">Subscribe</button>
          </form>
          <div className="mt-8 pt-8 border-t border-gray-100">
            <Link href="/wholesale" className="text-sm font-sans font-bold text-black uppercase tracking-widest hover:text-terracotta transition-colors underline underline-offset-4">Looking for Wholesale? Click Here</Link>
          </div>
        </div>
      </section>

    </div>
  );
}