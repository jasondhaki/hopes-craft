import { client } from "../../lib/sanity";
import ProductCard from "../../components/ProductCard";

// The GROQ Query: Updated to pull 'name' as well as 'title'
const query = `*[_type == "product"] | order(_createdAt desc) {
  _id,
  title,
  name,
  "slug": slug.current,
  priceBDT,
  priceUSD,
  "imageUrl": image.asset->url,
  "category": category->title
}`;

export const revalidate = 30;

export default async function ShopPage() {
  const products = await client.fetch(query);

  return (
    <div className="flex flex-col w-full bg-white text-black min-h-screen">
      {/* Header */}
      <section className="bg-jute-base pt-24 pb-16 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-serif text-5xl md:text-6xl font-bold mb-6 tracking-tighter text-forest-slate">
            The <span className="text-terracotta italic font-light">Collection</span>
          </h1>
          <p className="font-sans text-lg text-forest-slate/80 max-w-2xl mx-auto">
            Browse our sustainably crafted, 100% biodegradable jute goods. Every piece supports rural artisans in Bangladesh.
          </p>
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-20 px-6 max-w-7xl mx-auto w-full">
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product: any) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <h2 className="font-serif text-2xl text-gray-400 mb-4">No products found.</h2>
            <p className="font-sans text-gray-500">
              Please add some products in the Sanity Studio (http://localhost:3000/studio) to see them here!
            </p>
          </div>
        )}
      </section>
    </div>
  );
}