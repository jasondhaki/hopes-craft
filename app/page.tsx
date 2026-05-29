import Link from "next/link";
import { ArrowRight, Leaf, Users, Globe2, Mail } from "lucide-react";
import { client } from "../lib/sanity";
import HeroSlider from "../components/HeroSlider";
import TrustBar from "../components/TrustBar";
import ProductCard from "../components/ProductCard";
import LatestArrivalsSlider from "../components/LatestArrivalsSlider";

// Force dynamic to ensure fresh product data
export const dynamic = "force-dynamic";

// Fetch data from Sanity
async function getHomePageData() {
  const latest = await client.fetch(`*[_type == "product"] | order(_createdAt desc)[0...10] {
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
      
      {/* 1. Hero Section */}
      <HeroSlider />

      {/* 2. Trust Bar */}
      <TrustBar />

      {/* 3. Latest Arrivals Auto-Slider */}
      <section className="py-12 px-6 max-w-7xl mx-auto w-full">
        <div className="flex justify-between items-end mb-10 border-b border-gray-100 pb-4">
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-forest-slate">Latest Arrivals</h2>
          <Link href="/shop" className="font-sans text-xs font-bold uppercase tracking-widest text-terracotta hover:text-forest-slate transition-colors">View All</Link>
        </div>
        <LatestArrivalsSlider products={latest} />
      </section>

      {/* 4. UPDATED: Artisan Story Collage (Local Images) */}
      <section className="py-26 bg-white w-full border-t border-gray-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Flank (Images) */}
            <div className="hidden lg:flex lg:col-span-3 flex-col gap-8 relative z-10">
              <div className="aspect-[3/4] w-full overflow-hidden rounded-sm shadow-sm transform -translate-y-12">
                <img src="/images/legacy-1.jpg" alt="Artisan weaving" className="object-cover w-full h-full hover:scale-105 transition-transform duration-1000" />
              </div>
              <div className="aspect-square w-4/5 self-end overflow-hidden rounded-sm shadow-sm transform translate-x-4">
                <img src="/images/legacy-2.jpg" alt="Jute texture" className="object-cover w-full h-full hover:scale-105 transition-transform duration-1000" />
              </div>
            </div>

            {/* Center Core (Text) */}
            <div className="lg:col-span-6 flex flex-col items-center text-center px-4 relative z-20">
              <h2 className="font-serif text-4xl md:text-6xl font-bold text-forest-slate mb-6 leading-tight tracking-tight">
                Preserving a <br className="hidden md:block" /> <span className="text-terracotta italic font-light">Legacy</span>
              </h2>
              <p className="font-sans text-lg text-gray-600 mb-10 leading-relaxed max-w-lg mx-auto">
                Every thread of our jute tells a story of resilience, tradition, and sustainable craftsmanship. We partner directly with highly skilled artisans in Bangladesh, ensuring fair trade practices and empowering rural communities while bringing authentic heritage into your home.
              </p>
              <Link href="/story" className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-forest-slate hover:text-terracotta transition-colors group border-b-2 border-transparent hover:border-terracotta pb-1">
                <span>Discover Our Journey</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Right Flank (Images) */}
            <div className="hidden lg:flex lg:col-span-3 flex-col gap-8 relative z-10">
              <div className="aspect-square w-4/5 overflow-hidden rounded-sm shadow-sm transform -translate-x-4 translate-y-8">
                <img src="/images/legacy-3.jpg" alt="Nature" className="object-cover w-full h-full hover:scale-105 transition-transform duration-1000" />
              </div>
              <div className="aspect-[3/4] w-full overflow-hidden rounded-sm shadow-sm transform translate-y-16">
                <img src="/images/legacy-4.jpg" alt="Finished craft" className="object-cover w-full h-full hover:scale-105 transition-transform duration-1000" />
              </div>
            </div>

            {/* Mobile Image Fallback (Horizontal Snap Slider) */}
            <div className="flex lg:hidden col-span-1 overflow-x-auto snap-x gap-4 mt-8 hide-scrollbar pb-4 w-full">
              {[
                "/images/legacy-1.jpg",
                "/images/legacy-2.jpg",
                "/images/legacy-3.jpg"
              ].map((src, idx) => (
                <div key={idx} className="snap-center shrink-0 w-3/4 aspect-[3/4] overflow-hidden rounded-sm shadow-sm">
                  <img src={src} className="w-full h-full object-cover" alt="Artisan gallery" />
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* 5. UPDATED: Shop by Category (Local Images) */}
      <section className="py-16 bg-jute-base w-full">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-forest-slate mb-4">Curated Collections</h2>
            <p className="font-sans text-gray-600 max-w-2xl mx-auto">Explore our sustainable goods, handcrafted for every aspect of your life.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Category 1 */}
            <Link href="/shop" className="group relative aspect-[4/5] overflow-hidden rounded-sm shadow-sm">
              <img src="/images/category-bags.jpg" alt="Bags & Totes" className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                <h3 className="font-serif text-3xl text-white font-bold tracking-wide drop-shadow-md mb-2">Bags & Totes</h3>
                <span className="text-white text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0 transform">Shop Now</span>
              </div>
            </Link>

            {/* Category 2 */}
            <Link href="/shop" className="group relative aspect-[4/5] overflow-hidden rounded-sm shadow-sm">
              <img src="/images/category-decor.jpg" alt="Home Decor" className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                <h3 className="font-serif text-3xl text-white font-bold tracking-wide drop-shadow-md mb-2">Home Decor</h3>
                <span className="text-white text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0 transform">Shop Now</span>
              </div>
            </Link>

            {/* Category 3 */}
            <Link href="/shop" className="group relative aspect-[4/5] overflow-hidden rounded-sm shadow-sm">
              <img src="/images/category-accessories.jpg" alt="Accessories" className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                <h3 className="font-serif text-3xl text-white font-bold tracking-wide drop-shadow-md mb-2">Accessories</h3>
                <span className="text-white text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0 transform">Shop Now</span>
              </div>
            </Link>

          </div>
        </div>
      </section>

      {/* 6. Best Sellers Slider (Manual Scroll) */}
      {bestSellers?.length > 0 && (
        <section className="py-24 px-6 w-full bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-end mb-10 border-b border-gray-200 pb-4">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-forest-slate">Best Sellers</h2>
              <Link href="/shop" className="font-sans text-xs font-bold uppercase tracking-widest text-terracotta hover:text-forest-slate transition-colors">Shop Bestsellers</Link>
            </div>
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

      {/* 7. Quick Impact Statistics */}
      <section className="py-7 bg-forest-slate text-white w-full">
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

      {/* 8. Newsletter & B2B Call to Action */}
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