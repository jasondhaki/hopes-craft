import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-forest-slate text-jute-base py-10 mt-auto">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Brand Section */}
        <div>
          <h2 className="font-serif text-2xl text-terracotta mb-4">Hope's Craft</h2>
          <p className="font-sans text-sm text-soft-leaf">
            Empowering artisans and sharing the heritage of sustainable jute commerce with the world.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col space-y-2 font-sans text-sm">
          <h3 className="font-bold text-lg mb-2 text-jute-base">Explore</h3>
          <Link href="/" className="hover:text-terracotta transition-colors">Home</Link>
          <Link href="/shop" className="hover:text-terracotta transition-colors">The Shop</Link>
          <Link href="/story" className="hover:text-terracotta transition-colors">Our Story</Link>
          <Link href="/wholesale" className="hover:text-terracotta transition-colors">B2B Wholesale</Link>
        </div>

        {/* Legal Pages Placeholders */}
        <div className="flex flex-col space-y-2 font-sans text-sm">
          <h3 className="font-bold text-lg mb-2 text-jute-base">Legal</h3>
          <Link href="/terms" className="hover:text-terracotta transition-colors">Terms & Conditions</Link>
          <Link href="/privacy" className="hover:text-terracotta transition-colors">Privacy Policy</Link>
          <Link href="/returns" className="hover:text-terracotta transition-colors">Refund & Return Policy</Link>
        </div>
        
      </div>
      
      <div className="text-center text-xs text-soft-leaf mt-10 border-t border-soft-leaf/20 pt-4">
        &copy; {new Date().getFullYear()} Hope's Craft. All rights reserved.
      </div>
    </footer>
  );
}