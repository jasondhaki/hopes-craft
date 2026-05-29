"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react"; // Only keeping the non-brand icon

export default function Footer() {
  return (
    <footer className="bg-forest-slate text-jute-base pt-20 pb-10">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Column 1: Brand & Social */}
          <div className="flex flex-col space-y-6">
            <Link href="/" className="font-serif text-3xl font-bold text-white tracking-tight">
              Hope's<span className="text-terracotta italic font-light ml-1">Craft</span>
            </Link>
            <p className="font-sans text-sm text-gray-300 leading-relaxed pr-4">
              Empowering artisans and sharing the heritage of sustainable jute commerce with the world.
            </p>
            <div className="flex space-x-5 pt-2">
              <a href="#" className="text-gray-300 hover:text-terracotta transition-colors" title="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="#" className="text-gray-300 hover:text-terracotta transition-colors" title="Facebook">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a href="#" className="text-gray-300 hover:text-terracotta transition-colors" title="Twitter">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Explore Links */}
          <div className="flex flex-col space-y-4">
            <h4 className="font-sans font-bold text-white uppercase tracking-widest text-xs mb-2">Explore</h4>
            <Link href="/" className="font-sans text-sm text-gray-300 hover:text-terracotta transition-colors">Home</Link>
            <Link href="/shop" className="font-sans text-sm text-gray-300 hover:text-terracotta transition-colors">The Shop</Link>
            <Link href="/story" className="font-sans text-sm text-gray-300 hover:text-terracotta transition-colors">Our Story</Link>
            <Link href="/wholesale" className="font-sans text-sm text-gray-300 hover:text-terracotta transition-colors">B2B Wholesale</Link>
            <Link href="/contact" className="font-sans text-sm text-gray-300 hover:text-terracotta transition-colors">Contact Us</Link>
          </div>

          {/* Column 3: Legal Links */}
          <div className="flex flex-col space-y-4">
            <h4 className="font-sans font-bold text-white uppercase tracking-widest text-xs mb-2">Legal</h4>
            <Link href="/terms" className="font-sans text-sm text-gray-300 hover:text-terracotta transition-colors">Terms & Conditions</Link>
            <Link href="/privacy" className="font-sans text-sm text-gray-300 hover:text-terracotta transition-colors">Privacy Policy</Link>
            <Link href="/refund" className="font-sans text-sm text-gray-300 hover:text-terracotta transition-colors">Refund & Return Policy</Link>
          </div>

          {/* Column 4: Newsletter */}
          <div className="flex flex-col space-y-4">
            <h4 className="font-sans font-bold text-white uppercase tracking-widest text-xs mb-2">Join Our Journey</h4>
            <p className="font-sans text-sm text-gray-300 mb-2">
              Subscribe for updates on new artisan collections and exclusive B2B offers.
            </p>
            <form 
              className="flex flex-col space-y-3" 
              onSubmit={(e) => {
                e.preventDefault();
                alert("Thank you for subscribing!");
              }}
            >
              <input
                type="email"
                required
                placeholder="Email address"
                className="w-full bg-forest-slate border border-gray-500 p-3 rounded-sm text-sm text-white focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta transition-colors placeholder:text-gray-400"
              />
              <button 
                type="submit"
                className="w-full bg-terracotta text-white py-3 px-4 text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-forest-slate transition-colors rounded-sm flex items-center justify-center space-x-2 group"
              >
                <span>Subscribe</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>
          
        </div>

        {/* Bottom Bar: Copyright & Dummy Payments */}
        <div className="border-t border-gray-600/50 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="font-sans text-xs text-gray-400">
            © {new Date().getFullYear()} Hope's Craft. All rights reserved.
          </p>
          <div className="flex items-center space-x-4 text-xs font-sans text-gray-400 uppercase tracking-widest">
            <span className="hover:text-gray-200 transition-colors cursor-default">Stripe</span>
            <span>•</span>
            <span className="hover:text-gray-200 transition-colors cursor-default">SSLCommerz</span>
            <span>•</span>
            <span className="hover:text-gray-200 transition-colors cursor-default">bKash</span>
          </div>
        </div>
      </div>
    </footer>
  );
}