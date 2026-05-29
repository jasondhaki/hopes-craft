"use client";

import { useEffect, useRef } from "react";
import ProductCard from "./ProductCard";

export default function LatestArrivalsSlider({ products }: { products: any[] }) {
  const sliderRef = useRef<HTMLDivElement>(null);

  // THE TRICK: We duplicate the 10 products to create a massive scrolling buffer.
  // This allows us to create a seamless infinite looping illusion.
  const infiniteProducts = [...products, ...products, ...products];

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider || products.length === 0) return;

    const scrollInterval = setInterval(() => {
      const firstChild = slider.children[0] as HTMLElement;
      
      // Calculate the exact width of one card + the CSS gap (24px for gap-6)
      const itemWidth = firstChild ? firstChild.offsetWidth + 24 : 300;
      
      // Calculate the total scrollable width of ONE original set of 10 products
      const originalSetWidth = itemWidth * products.length;

      // If the slider has scrolled deep into the clones, we seamlessly jump it back
      // to the identical position in the first set INVISIBLY (behavior: "auto").
      if (slider.scrollLeft >= originalSetWidth * 2 - itemWidth) {
        slider.scrollTo({ left: originalSetWidth - itemWidth, behavior: "auto" });
        
        // A tiny 50ms delay ensures the browser renders the invisible jump 
        // BEFORE triggering the next smooth scroll shift.
        setTimeout(() => {
          slider.scrollBy({ left: itemWidth, behavior: "smooth" });
        }, 50);
      } else {
        // Otherwise, just keep sliding one product smoothly to the right
        slider.scrollBy({ left: itemWidth, behavior: "smooth" });
      }
    }, 4000); // 4000ms = 4 seconds per shift

    // Cleanup interval on unmount
    return () => clearInterval(scrollInterval);
  }, [products.length]);

  return (
    <div 
      ref={sliderRef}
      // NOTE: Removed 'scroll-smooth' from Tailwind classes so our JS has strict control
      className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 hide-scrollbar"
    >
      {infiniteProducts.map((p, index) => (
        // We use a combination of ID and Index for the key since we duplicated the items
        <div key={`${p._id}-${index}`} className="snap-start shrink-0 w-[75vw] md:w-[calc(25%-18px)]">
          <ProductCard product={p} />
        </div>
      ))}
    </div>
  );
}