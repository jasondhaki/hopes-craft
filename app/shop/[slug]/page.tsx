import { client } from "../../../lib/sanity";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ProductActions from "../../../components/ProductActions";

export const revalidate = 30; // Refresh data every 30 seconds

// The GROQ Query to fetch a single product matching the slug
const query = `*[_type == "product" && slug.current == $slug][0] {
  _id,
  title,
  name,
  "slug": slug.current,
  priceBDT,
  priceUSD,
  "imageUrl": image.asset->url,
  "category": category->title,
  weight
}`;

// NOTE: In Next.js 15+, params is a Promise that must be unwrapped
export default async function ProductDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  // 1. Await the params to extract the slug safely
  const { slug } = await params;

  // 2. Fetch the specific product using the resolved slug
  const product = await client.fetch(query, { slug });

  // If no product is found (wrong URL), show a 404
  if (!product) {
    return notFound();
  }

  const displayTitle = product.title || product.name || "Unnamed Product";

  return (
    <div className="flex flex-col w-full bg-white text-black min-h-screen pt-10 pb-24">
      <div className="max-w-7xl mx-auto px-6 w-full">
        
        {/* Back to Shop Link */}
        <Link 
          href="/shop" 
          className="inline-flex items-center space-x-2 text-sm font-sans font-bold uppercase tracking-widest text-gray-400 hover:text-terracotta transition-colors mb-12"
        >
          <ArrowLeft size={16} />
          <span>Back to Shop</span>
        </Link>

        {/* Product Layout Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
          
          {/* Left: Product Image */}
          <div className="relative w-full aspect-square bg-gray-50 rounded-sm overflow-hidden">
            {product.imageUrl ? (
              <img
                src={product.imageUrl}
                alt={displayTitle}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400 font-sans text-sm">
                No Image Available
              </div>
            )}
          </div>

          {/* Right: Product Details & Actions */}
          <div className="flex flex-col justify-center">
            {/* Category Tag */}
            {product.category && (
              <span className="text-xs font-bold uppercase tracking-widest text-terracotta mb-4 block">
                {product.category}
              </span>
            )}
            
            {/* Title */}
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-forest-slate mb-6">
              {displayTitle}
            </h1>

            {/* Narrative Description Placeholder */}
            <p className="font-sans text-lg text-gray-600 mb-8 leading-relaxed">
              Woven with heritage, this authentic jute product represents hours of 
              dedicated craftsmanship. Perfectly blending sustainable utility with 
              modern aesthetic appeal for your home.
            </p>

            {/* Weight display (crucial for future shipping integrations as per blueprint) */}
            {product.weight && (
              <p className="font-sans text-sm text-gray-500 mb-8 font-medium">
                Shipping Weight: {product.weight} kg
              </p>
            )}

            {/* Inject the Interactive Actions Component */}
            <ProductActions product={product} />
            
          </div>
        </div>
      </div>
    </div>
  );
}