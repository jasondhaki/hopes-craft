"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "./ProductCard";

interface ShopFilterProps {
  products: any[];
  categories: string[];
}

const ITEMS_PER_PAGE = 24;

export default function ShopFilter({ products, categories }: ShopFilterProps) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  
  // Create a reference to the top of our component
  const topRef = useRef<HTMLDivElement>(null);

  // Instantly reset to Page 1 whenever the user changes the category
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory]);

  // Function to handle page changes and gracefully scroll back to the top
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    
    if (topRef.current) {
      // Calculates the exact position and scrolls smoothly, leaving a 100px gap for your navbar
      const y = topRef.current.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  // 1. Filter products based on the active category tab
  const filteredProducts = activeCategory === "All" 
    ? products 
    : products.filter((p) => p.category === activeCategory);

  // 2. Calculate Pagination Math
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE, 
    currentPage * ITEMS_PER_PAGE
  );

  return (
    // Attach the ref here so we know exactly where to scroll back to!
    <div ref={topRef} className="flex flex-col lg:flex-row gap-12 w-full items-start relative">
      
      {/* Left Sidebar Filter (Sticky on Desktop, Scrollable if it gets too tall) */}
      <aside className="w-full lg:w-1/4 lg:sticky lg:top-32 z-10 lg:max-h-[calc(100vh-8rem)] overflow-y-auto hide-scrollbar">
        <h3 className="hidden lg:block font-serif text-2xl font-bold text-forest-slate mb-6 border-b border-gray-100 pb-4">
          Categories
        </h3>

        {/* Buttons Container: Row on Mobile, Column on Desktop */}
        <div className="flex flex-row lg:flex-col overflow-x-auto hide-scrollbar gap-3 pb-2 lg:pb-0">
          <button
            onClick={() => setActiveCategory("All")}
            className={`shrink-0 text-left px-6 py-4 lg:w-full rounded-sm font-sans text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
              activeCategory === "All"
                ? "bg-forest-slate text-white shadow-md"
                : "bg-gray-100 lg:bg-transparent text-forest-slate lg:text-gray-500 hover:bg-gray-200 lg:hover:bg-gray-50 hover:text-terracotta"
            }`}
          >
            All Collections
          </button>
          
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`shrink-0 text-left px-6 py-4 lg:w-full rounded-sm font-sans text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
                activeCategory === category
                  ? "bg-forest-slate text-white shadow-md"
                  : "bg-gray-100 lg:bg-transparent text-forest-slate lg:text-gray-500 hover:bg-gray-200 lg:hover:bg-gray-50 hover:text-terracotta"
            }`}
          >
            {category}
          </button>
        ))}
        </div>
      </aside>

      {/* Right Product Grid Area */}
      <div className="w-full lg:w-3/4 flex flex-col space-y-12">
        {currentProducts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 animate-in fade-in zoom-in-95 duration-500">
              {currentProducts.map((product: any) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>

            {/* Premium Pagination Controls (Only renders if there is more than 1 page) */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center space-x-2 pt-8 border-t border-gray-100">
                <button
                  onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
                  disabled={currentPage === 1}
                  className="w-10 h-10 flex items-center justify-center rounded-sm border border-gray-200 text-forest-slate hover:bg-forest-slate hover:text-white disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-forest-slate transition-colors"
                  aria-label="Previous Page"
                >
                  <ChevronLeft size={18} />
                </button>

                <div className="flex items-center space-x-2">
                  {Array.from({ length: totalPages }).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => handlePageChange(index + 1)}
                      className={`w-10 h-10 flex items-center justify-center rounded-sm font-sans text-sm font-bold transition-colors ${
                        currentPage === index + 1
                          ? "bg-forest-slate text-white border border-forest-slate"
                          : "border border-gray-200 text-forest-slate hover:border-terracotta hover:text-terracotta"
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="w-10 h-10 flex items-center justify-center rounded-sm border border-gray-200 text-forest-slate hover:bg-forest-slate hover:text-white disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-forest-slate transition-colors"
                  aria-label="Next Page"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20 animate-in fade-in duration-500 bg-gray-50 rounded-sm border border-gray-100">
            <h2 className="font-serif text-2xl text-gray-400 mb-4">No products found in this category.</h2>
            <button 
              onClick={() => setActiveCategory("All")}
              className="font-sans text-xs font-bold uppercase tracking-widest text-terracotta hover:text-forest-slate transition-colors border-b-2 border-transparent hover:border-forest-slate pb-1"
            >
              View All Products
            </button>
          </div>
        )}
      </div>

    </div>
  );
}