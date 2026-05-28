import Link from "next/link";
import { 
  ArrowRight, Globe, Leaf, HeartHandshake, 
  Sun, Scissors, PenTool, Package 
} from "lucide-react";

// Pointing directly to your local, downloaded images
const galleryImages = [
  { src: "/images/story-1.jpg", span: "sm:row-span-2 h-[300px] sm:h-full" }, 
  { src: "/images/story-2.jpg", span: "sm:row-span-3 h-[300px] sm:h-full" }, 
  { src: "/images/story-3.jpg", span: "sm:row-span-1 h-[300px] sm:h-full" }, 
  { src: "/images/story-4.jpg", span: "sm:row-span-3 h-[300px] sm:h-full" }, 
  { src: "/images/story-5.jpg", span: "sm:row-span-2 h-[300px] sm:h-full" }, 
  { src: "/images/story-6.jpg", span: "sm:row-span-1 h-[300px] sm:h-full" }  
];

// Pointing directly to your local artisan portraits
const artisans = [
  {
    name: "Fatima Begum",
    role: "Master Weaver",
    image: "/images/artisan-1.jpg", 
    quote: "Every basket I weave helps keep my daughters in school. This craft is our independence."
  },
  {
    name: "Rahim Uddin",
    role: "Fiber Procurement",
    image: "/images/artisan-2.jpg", 
    quote: "We source only from farms that respect the earth. Quality jute starts in healthy soil."
  },
  {
    name: "Ayesha Siddiqa",
    role: "Quality Assurance",
    image: "/images/artisan-3.jpg", 
    quote: "When a piece leaves my hands, I know it will last a lifetime in yours."
  }
];

export default function StoryPage() {
  return (
    <div className="flex flex-col w-full bg-white text-black">
      
      {/* 1. Hero Header Section */}
      <section className="pt-24 pb-16 px-6 text-center max-w-4xl mx-auto">
        <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6 tracking-tighter text-forest-slate">
          Our <span className="text-terracotta italic font-light">Story</span>
        </h1>
        <p className="font-sans text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
          Rooted in the heart of Bangladesh, Hope's Craft is a tribute to generations of artisans weaving the golden fiber of Bengal into sustainable art.
        </p>
      </section>

      {/* 2. Premium Bento-Box Image Gallery */}
      <section className="px-4 md:px-8 pb-24 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:auto-rows-[160px]">
          {galleryImages.map((image, index) => (
            <div key={index} className={`relative overflow-hidden rounded-sm bg-gray-100 group ${image.span}`}>
              <img
                src={image.src}
                alt={`Hope's Craft process ${index + 1}`}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </section>

      {/* 3. The Core Philosophy */}
      <section className="bg-jute-base py-20 px-6 text-forest-slate">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 border-t border-b border-forest-slate/10 divide-y md:divide-y-0 md:divide-x divide-forest-slate/10">
            <div className="flex flex-col items-start text-left p-10 lg:p-14 hover:bg-white/40 transition-colors">
              <HeartHandshake size={36} strokeWidth={1.5} className="text-terracotta mb-8" />
              <h3 className="font-serif text-2xl font-bold mb-4 tracking-wide">Ethical Empowerment</h3>
              <p className="font-sans text-sm text-forest-slate/80 leading-relaxed">
                We provide fair wages, safe environments, and a global stage for rural artisans, directly uplifting local communities and preserving generational skills.
              </p>
            </div>
            <div className="flex flex-col items-start text-left p-10 lg:p-14 hover:bg-white/40 transition-colors">
              <Leaf size={36} strokeWidth={1.5} className="text-terracotta mb-8" />
              <h3 className="font-serif text-2xl font-bold mb-4 tracking-wide">Uncompromising Ecology</h3>
              <p className="font-sans text-sm text-forest-slate/80 leading-relaxed">
                Every thread of our golden fiber is 100% biodegradable, remarkably durable, and sourced using sustainable, chemical-free agricultural practices.
              </p>
            </div>
            <div className="flex flex-col items-start text-left p-10 lg:p-14 hover:bg-white/40 transition-colors">
              <Globe size={36} strokeWidth={1.5} className="text-terracotta mb-8" />
              <h3 className="font-serif text-2xl font-bold mb-4 tracking-wide">Global Heritage</h3>
              <p className="font-sans text-sm text-forest-slate/80 leading-relaxed">
                We bridge the gap between traditional Bengali craftsmanship and modern, minimal design, creating functional art suitable for homes around the world.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Deep Narrative Text */}
      <section className="bg-white py-24 px-6 text-forest-slate">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-none tracking-tight">
              The <span className="text-terracotta italic font-light block mt-2">Golden Fiber</span>
            </h2>
            <div className="w-20 h-1 bg-terracotta mb-8"></div>
          </div>
          <div className="lg:col-span-7 font-sans text-lg space-y-8 leading-relaxed text-forest-slate/80">
            <p className="font-medium text-2xl text-forest-slate leading-snug">
              Jute is more than just a material; it is woven into the very fabric of our culture and economy. 
            </p>
            <p>
              For centuries, this 100% biodegradable, remarkably durable fiber has been cultivated in our local deltas. However, modern synthetic materials pushed this heritage to the brink. 
            </p>
            <p>
              Hope's Craft was born out of a desire to revive this traditional artistry. We don't just manufacture goods; we preserve history. By maintaining a transparent, ethical supply chain, we ensure that the hands turning raw jute into exquisite pieces are honored and compensated fairly.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Artisan Spotlight - SEPARATED WITH SOFT GRAY AND BORDER */}
      <section className="bg-gray-50 py-24 px-6 text-forest-slate border-t border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">The Hands Behind the Craft</h2>
            <p className="font-sans text-forest-slate/70 max-w-2xl mx-auto">Meet the master artisans who pour their heritage, skill, and passion into every single piece we create.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {artisans.map((artisan, index) => (
              <div key={index} className="flex flex-col items-center text-center group">
                <div className="w-40 h-40 rounded-full overflow-hidden mb-6 border-4 border-terracotta/20 group-hover:border-terracotta transition-colors bg-white shadow-sm">
                  <img src={artisan.image} alt={artisan.name} className="w-full h-full object-cover group-hover:grayscale-0 transition-all duration-500" />
                </div>
                <h4 className="font-serif text-2xl font-bold mb-1">{artisan.name}</h4>
                <p className="font-sans text-xs uppercase tracking-widest text-terracotta mb-6 font-bold">{artisan.role}</p>
                <p className="font-serif italic text-forest-slate/80 text-lg leading-relaxed">"{artisan.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Transparency Process */}
      <section className="bg-jute-base py-24 px-6 text-forest-slate overflow-hidden border-t border-jute-base/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">From Earth to Home</h2>
            <p className="font-sans text-forest-slate/70">Our transparent, 4-step sustainable supply chain.</p>
          </div>

          <div className="relative flex flex-col md:flex-row justify-between items-center md:items-start gap-12 md:gap-4">
            {/* Horizontal connecting line (Desktop only) */}
            <div className="hidden md:block absolute top-8 left-12 right-12 h-px bg-forest-slate/20 z-0"></div>

            {/* Step 1 */}
            <div className="relative z-10 flex flex-col items-center text-center w-full md:w-1/4">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm border border-forest-slate/10 text-terracotta">
                <Sun size={24} />
              </div>
              <h4 className="font-sans font-bold uppercase tracking-widest text-sm mb-3">1. Sun-Cured Harvesting</h4>
              <p className="font-sans text-sm text-forest-slate/70">Raw jute is harvested by local farmers and naturally dried under the Bengal sun without chemicals.</p>
            </div>

            {/* Step 2 */}
            <div className="relative z-10 flex flex-col items-center text-center w-full md:w-1/4">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm border border-forest-slate/10 text-terracotta">
                <Scissors size={24} />
              </div>
              <h4 className="font-sans font-bold uppercase tracking-widest text-sm mb-3">2. Processing & Spinning</h4>
              <p className="font-sans text-sm text-forest-slate/70">The raw fibers are meticulously combed, softened, and spun into strong, durable threads.</p>
            </div>

            {/* Step 3 */}
            <div className="relative z-10 flex flex-col items-center text-center w-full md:w-1/4">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm border border-forest-slate/10 text-terracotta">
                <PenTool size={24} />
              </div>
              <h4 className="font-sans font-bold uppercase tracking-widest text-sm mb-3">3. Artisan Weaving</h4>
              <p className="font-sans text-sm text-forest-slate/70">Master weavers hand-craft the threads into beautiful, functional designs using generational techniques.</p>
            </div>

            {/* Step 4 */}
            <div className="relative z-10 flex flex-col items-center text-center w-full md:w-1/4">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm border border-forest-slate/10 text-terracotta">
                <Package size={24} />
              </div>
              <h4 className="font-sans font-bold uppercase tracking-widest text-sm mb-3">4. Eco-Packaging</h4>
              <p className="font-sans text-sm text-forest-slate/70">Products are inspected for quality and shipped globally using 100% biodegradable packaging.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Heritage Timeline & Final CTA */}
      <section className="bg-white py-24 px-6 text-forest-slate">
        <div className="max-w-4xl mx-auto">
          
          <div className="mb-20">
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4 text-center">Our Legacy</h2>
            
            <div className="space-y-12 border-l-2 border-terracotta/30 ml-4 md:ml-0 pl-8 md:pl-12 relative">
              
              <div className="relative">
                <div className="absolute -left-[41px] md:-left-[57px] top-1 w-4 h-4 bg-terracotta rounded-full shadow-[0_0_0_8px_white]"></div>
                <span className="font-sans font-bold text-terracotta tracking-widest text-sm">THE 1980s</span>
                <h4 className="font-serif text-2xl font-bold mt-2 mb-3">The Decline</h4>
                <p className="font-sans text-forest-slate/70">The rise of cheap, synthetic plastics severely damaged the global demand for traditional jute, threatening the livelihood of thousands of rural artisans in Bangladesh.</p>
              </div>

              <div className="relative">
                <div className="absolute -left-[41px] md:-left-[57px] top-1 w-4 h-4 bg-terracotta rounded-full shadow-[0_0_0_8px_white]"></div>
                <span className="font-sans font-bold text-terracotta tracking-widest text-sm">2023</span>
                <h4 className="font-serif text-2xl font-bold mt-2 mb-3">The Spark</h4>
                <p className="font-sans text-forest-slate/70">Hope's Craft is established with a singular mission: to reintroduce the "Golden Fiber" to the modern world through high-quality, ethically produced home goods.</p>
              </div>

              <div className="relative">
                <div className="absolute -left-[41px] md:-left-[57px] top-1 w-4 h-4 bg-terracotta rounded-full shadow-[0_0_0_8px_white]"></div>
                <span className="font-sans font-bold text-terracotta tracking-widest text-sm">TODAY</span>
                <h4 className="font-serif text-2xl font-bold mt-2 mb-3">Global Export</h4>
                <p className="font-sans text-forest-slate/70">We now partner with over 500 artisans, shipping sustainable, 100% biodegradable products to conscious consumers and boutique wholesalers worldwide.</p>
              </div>

            </div>
          </div>

          {/* Final Call to Action Box */}
          <div className="bg-forest-slate text-white p-12 text-center rounded-sm shadow-2xl">
            <h3 className="font-serif text-3xl font-bold mb-4 italic">Be Part of the Story</h3>
            <p className="font-sans text-gray-300 mb-8 max-w-xl mx-auto">
              Every purchase preserves a craft, protects the planet, and empowers an artisan.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Link 
                href="/shop" 
                className="bg-white text-black px-8 py-4 rounded-sm font-sans font-bold uppercase tracking-widest text-xs hover:bg-terracotta hover:text-white transition-colors flex items-center justify-center space-x-2"
              >
                <span>Shop the Collection</span>
              </Link>
              <Link 
                href="/wholesale" 
                className="bg-transparent border border-white px-8 py-4 rounded-sm font-sans font-bold uppercase tracking-widest text-xs hover:bg-white hover:text-black transition-colors flex items-center justify-center"
              >
                Wholesale Inquiry
              </Link>
            </div>
          </div>

        </div>
      </section>
      
    </div>
  );
}