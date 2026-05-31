import Link from "next/link";
import Image from "next/image"; // <-- NEW IMPORT
import { ArrowRight, Mail } from "lucide-react";
import { client } from "../lib/sanity";
import HeroSlider from "../components/HeroSlider";
import TrustBar from "../components/TrustBar";
import ProductCard from "../components/ProductCard";
import LatestArrivalsSlider from "../components/LatestArrivalsSlider";
import HomeNewsletterForm from "../components/HomeNewsletterForm";

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

  // Fetch all categories dynamically
  const categories = await client.fetch(`*[_type == "category"] {
    _id, 
    title, 
    "slug": slug.current, 
    "imageUrl": *[_type == "product" && references(^._id)][0].image.asset->url
  }`);
  
  return { latest, bestSellers, categories };
}

export default async function Home() {
  const { latest, bestSellers, categories } = await getHomePageData();

  return (
    <div className="flex flex-col w-full">
      
      {/* 1. Hero Section */}
      <HeroSlider />

      {/* 2. Trust Bar */}
      <TrustBar />

      {/* 3. UPDATED: Latest Arrivals Auto-Slider (Fixed Contrast & Overlay) */}
      <section className="py-16 w-full relative overflow-hidden">
        {/* Background Texture & Light Glass Overlay */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/latest-bg.jpg" 
            alt="Warm sunlit background" 
            fill
            className="object-cover opacity-80" 
          />    
          {/* Bumped opacity to 60% for a better frosted glass effect so cards pop */}
          <div className="absolute inset-0 bg-[#f5e8ce]/60 backdrop-blur-[2px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex justify-between items-end mb-10 border-b border-forest-slate/20 pb-4">
            {/* Changed text-white back to text-forest-slate for perfect readability */}
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-forest-slate drop-shadow-sm">Latest Arrivals</h2>
            <Link href="/shop" className="font-sans text-xs font-bold uppercase tracking-widest text-forest-slate hover:text-terracotta transition-colors">View All</Link>
          </div>
          <LatestArrivalsSlider products={latest} />
        </div>
      </section>

      {/* 4. Artisan Story Collage */}
      <section className="py-26 bg-white w-full border-t border-gray-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Flank (Images) */}
            <div className="hidden lg:flex lg:col-span-3 flex-col gap-8 relative z-10">
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-sm shadow-sm transform -translate-y-12">
                <Image src="/images/legacy-1.jpg" alt="Artisan weaving" fill sizes="(max-width: 1024px) 100vw, 25vw" className="object-cover hover:scale-105 transition-transform duration-1000" />
              </div>
              <div className="relative aspect-square w-4/5 self-end overflow-hidden rounded-sm shadow-sm transform translate-x-4">
                <Image src="/images/legacy-2.jpg" alt="Jute texture" fill sizes="(max-width: 1024px) 100vw, 25vw" className="object-cover hover:scale-105 transition-transform duration-1000" />
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
              <div className="relative aspect-square w-4/5 overflow-hidden rounded-sm shadow-sm transform -translate-x-4 translate-y-8">
                <Image src="/images/legacy-3.jpg" alt="Nature" fill sizes="(max-width: 1024px) 100vw, 25vw" className="object-cover hover:scale-105 transition-transform duration-1000" />
              </div>
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-sm shadow-sm transform translate-y-16">
                <Image src="/images/legacy-4.jpg" alt="Finished craft" fill sizes="(max-width: 1024px) 100vw, 25vw" className="object-cover hover:scale-105 transition-transform duration-1000" />
              </div>
            </div>

            {/* Mobile Image Fallback (Horizontal Snap Slider) */}
            <div className="flex lg:hidden col-span-1 overflow-x-auto snap-x gap-4 mt-8 hide-scrollbar pb-4 w-full">
              {[
                "/images/legacy-1.jpg",
                "/images/legacy-2.jpg",
                "/images/legacy-3.jpg"
              ].map((src, idx) => (
                <div key={idx} className="relative snap-center shrink-0 w-3/4 aspect-[3/4] overflow-hidden rounded-sm shadow-sm">
                  <Image src={src} fill sizes="(max-width: 768px) 75vw, 100vw" className="object-cover" alt="Artisan gallery" />
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* 5. Dynamic Shop by Category */}
      <section className="py-20 w-full relative overflow-hidden">
        {/* Background Texture & Premium Glass Overlay */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/jute-texture-bg.jpg" 
            alt="Jute texture background" 
            fill
            className="object-cover opacity-90" 
          />    
          <div className="absolute inset-0 bg-forest-slate/60 backdrop-blur-[2px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">Curated Collections</h2>
            <p className="font-sans text-gray-200 max-w-2xl mx-auto font-medium tracking-wide drop-shadow-md">Explore our sustainable goods, handcrafted for every aspect of your life.</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
            {categories.map((cat: any) => (
              <Link href={`/shop`} key={cat._id} className="group relative aspect-[4/5] overflow-hidden rounded-sm shadow-xl border border-white/10 hover:border-white/30 transition-colors">
                
                {cat.imageUrl ? (
                  <Image src={cat.imageUrl} alt={cat.title} fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out" />
                ) : (
                  <div className="w-full h-full bg-jute-base flex items-center justify-center text-forest-slate font-sans text-sm">No Image</div>
                )}
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="absolute inset-0 flex flex-col items-center justify-end p-6 text-center translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="font-serif text-2xl md:text-3xl text-white font-bold tracking-wide drop-shadow-lg mb-2">{cat.title}</h3>
                  <div className="flex items-center space-x-2 text-terracotta opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-75">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white">Shop Now</span>
                    <ArrowRight size={14} className="text-terracotta" />
                  </div>
                </div>

              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Best Sellers Slider */}
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

      {/* 7. Elegant Quick Impact Statistics */}
      <section className="py-6 bg-[#f5e8ce] text-forest-slate w-full border-t border-gray-100">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 text-center divide-y md:divide-y-0 md:divide-x divide-forest-slate/10">
            <div className="flex flex-col items-center pt-6 md:pt-0 px-4">
              <h3 className="font-serif text-3xl md:text-4xl font-semibold mb-3 text-terracotta">500+</h3>
              <p className="font-sans text-[14px] uppercase tracking-[0.2em] font-bold text-forest-slate/60">Artisans Empowered</p>
            </div>
            <div className="flex flex-col items-center pt-6 md:pt-0 px-4">
              <h3 className="font-serif text-3xl md:text-4xl font-semibold mb-3 text-terracotta">100%</h3>
              <p className="font-sans text-[14px] uppercase tracking-[0.2em] font-bold text-forest-slate/60">Biodegradable Jute</p>
            </div>
            <div className="flex flex-col items-center pt-6 md:pt-0 px-4">
              <h3 className="font-serif text-3xl md:text-4xl font-semibold mb-3 text-terracotta">Global</h3>
              <p className="font-sans text-[14px] uppercase tracking-[0.2em] font-bold text-forest-slate/60">Sustainable Exports</p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Newsletter & B2B Call to Action */}
      <section className="py-24 bg-white w-full">
        <div className="max-w-6xl mx-auto px-6">
          <div className="relative rounded-sm overflow-hidden shadow-2xl">
            
            {/* Background Image & Overlay */}
            <div className="absolute inset-0">
              <Image 
                src="/images/jute-field-cta.jpg" 
                alt="Lively jute field" 
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-forest-slate/70"></div>
            </div>

            {/* Content Core */}
            <div className="relative z-10 py-24 px-6 md:px-12 text-center flex flex-col items-center">
              <Mail size={40} strokeWidth={1} className="text-terracotta mb-6" />
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                Join the Jute Journey
              </h2>
              <p className="font-sans text-gray-300 mb-12 max-w-xl mx-auto text-lg">
                Subscribe to receive updates on new artisan collections, or register your business for wholesale access and bulk pricing.
              </p>
              
              {/* INTERACTIVE NEWSLETTER FORM LOADED HERE */}
              <HomeNewsletterForm />
              
              <div className="pt-8 border-t border-white/20 w-full max-w-sm mx-auto">
                <Link href="/wholesale" className="text-sm font-sans font-bold text-white uppercase tracking-widest hover:text-terracotta transition-colors underline underline-offset-4">
                  Looking for Wholesale? Click Here
                </Link>
              </div>
            </div>
            
          </div>
        </div>
      </section>

    </div>
  );
}