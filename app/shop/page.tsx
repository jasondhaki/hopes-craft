import { client } from "../../lib/sanity";
import ShopFilter from "../../components/ShopFilter"; // IMPORT THE NEW COMPONENT

// Fetch all products
const productsQuery = `*[_type == "product"] | order(_createdAt desc) {
  _id,
  title,
  name,
  "slug": slug.current,
  priceBDT,
  priceUSD,
  "imageUrl": image.asset->url,
  "category": category->title
}`;

// Fetch all categories to dynamically generate the filter tabs
const categoriesQuery = `*[_type == "category"] | order(title asc) {
  title
}`;

export const revalidate = 30;

export default async function ShopPage() {
  const products = await client.fetch(productsQuery);
  const rawCategories = await client.fetch(categoriesQuery);
  
  // Clean up the Sanity category objects into a simple array of strings
  const categories = rawCategories.map((cat: any) => cat.title).filter(Boolean);

  return (
    <div className="flex flex-col w-full bg-white text-black min-h-screen">
      
      {/* Header with Background Image & Glassmorphism */}
      <section className="relative pt-32 pb-24 px-6 text-center overflow-hidden">
        {/* Background Image & Light Glass Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/bg.jpg" 
            alt="Hope's Craft Collection" 
            className="w-full h-full object-cover opacity-80" 
          />    
          <div className="absolute inset-0 bg-[#f5e8ce]/30 backdrop-blur-[2px]"></div>
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6 tracking-tighter text-forest-slate drop-shadow-sm">
            The <span className="text-[#E2725B] italic font-light">Collection</span>
          </h1>
          <p className="font-sans text-lg md:text-xl text-forest-slate/90 max-w-2xl mx-auto font-medium drop-shadow-sm">
            Browse our sustainably crafted, 100% biodegradable jute goods. Every piece supports rural artisans in Bangladesh.
          </p>
        </div>
      </section>

      {/* Product Grid & Filter System */}
      <section className="py-16 px-6 max-w-7xl mx-auto w-full">
        {products.length > 0 ? (
          // PASS DATA TO OUR NEW INTERACTIVE CLIENT COMPONENT
          <ShopFilter products={products} categories={categories} />
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