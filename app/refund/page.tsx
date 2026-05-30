"use client";

import Link from "next/link";
import { ArrowLeft, RefreshCcw } from "lucide-react";

export default function RefundPage() {
  // Navigation array for the sticky sidebar
  const sections = [
    { id: "eligibility", title: "1. Return Eligibility" },
    { id: "exceptions", title: "2. Non-Returnable Items" },
    { id: "damages", title: "3. Damages and Issues" },
    { id: "process", title: "4. The Refund Process" },
    { id: "b2b", title: "5. B2B & Wholesale Returns" },
    { id: "shipping", title: "6. Return Shipping Costs" },
  ];

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 100; // Offset for fixed navbar
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col w-full bg-white text-black min-h-screen">
      
      {/* UPDATED: Premium Header Section with Background Image */}
      <section className="relative pt-32 pb-24 px-6 text-center border-b border-gray-200 overflow-hidden">
        {/* Background Image & Light Glass Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/bg.jpg" 
            alt="Refund and Return Policy" 
            className="w-full h-full object-cover opacity-80" 
          />    
          <div className="absolute inset-0 bg-[#f5e8ce]/30 backdrop-blur-[2px]"></div>
        </div>

        <div className="max-w-4xl mx-auto flex flex-col items-center relative z-10">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-terracotta shadow-sm mb-6">
            <RefreshCcw size={28} strokeWidth={1.5} />
          </div>
          <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6 tracking-tight text-forest-slate drop-shadow-sm">
            Refund & <span className="text-[#E2725B] italic font-light">Return Policy</span>
          </h1>
          <p className="font-sans text-lg md:text-xl text-forest-slate/90 max-w-2xl mx-auto font-medium drop-shadow-sm">
            Our commitment to quality, sustainable craftsmanship, and your absolute satisfaction.
          </p>
        </div>
      </section>

      {/* Main Content Layout with Sticky Sidebar */}
      <section className="py-16 px-6 max-w-7xl mx-auto w-full flex flex-col lg:flex-row gap-16 relative">
        
        {/* Left: Sticky Sidebar Navigation (Desktop Only) */}
        <aside className="lg:w-1/4 hidden lg:block">
          <div className="sticky top-32 flex flex-col space-y-6">
            <Link href="/" className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-terracotta transition-colors mb-4">
              <ArrowLeft size={16} />
              <span>Back to Home</span>
            </Link>
            
            <nav className="flex flex-col space-y-3 border-l-2 border-gray-100 pl-6">
              {sections.map((section) => (
                <a 
                  key={section.id}
                  href={`#${section.id}`}
                  onClick={(e) => scrollToSection(e, section.id)}
                  className="font-sans text-sm font-medium text-gray-500 hover:text-terracotta transition-colors"
                >
                  {section.title}
                </a>
              ))}
            </nav>
          </div>
        </aside>

        {/* Right: Expanded Refund Content */}
        <div className="lg:w-3/4 font-sans text-gray-600 leading-relaxed space-y-16">
          
          {/* Mobile Back Button */}
          <Link href="/" className="lg:hidden inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-terracotta transition-colors mb-4">
            <ArrowLeft size={16} />
            <span>Back to Home</span>
          </Link>

          <div id="eligibility" className="space-y-4 scroll-mt-24">
            <h2 className="font-serif text-2xl font-bold text-forest-slate border-b border-gray-100 pb-2">1. Return Eligibility</h2>
            <p>
              We accept returns for domestic and standard international orders within 14 days of delivery. To be eligible for a return, your item must be unused, unwashed, in the exact same condition that you received it, and in its original packaging with all tags attached. Because our jute products are authentically handcrafted, minor variations in weave, dye, and texture are natural and do not qualify as manufacturing defects.
            </p>
          </div>

          <div id="exceptions" className="space-y-4 scroll-mt-24">
            <h2 className="font-serif text-2xl font-bold text-forest-slate border-b border-gray-100 pb-2">2. Non-Returnable Items</h2>
            <p>
              For health, safety, and operational reasons, certain types of items cannot be returned. These include: custom-made or personalized products, white-labeled inventory, items purchased on final sale or clearance, and digital gift cards. These items are strictly non-refundable unless they arrive fundamentally damaged or defective.
            </p>
          </div>

          <div id="damages" className="space-y-4 scroll-mt-24">
            <h2 className="font-serif text-2xl font-bold text-forest-slate border-b border-gray-100 pb-2">3. Damages and Issues</h2>
            <p>
              Please inspect your order immediately upon reception. If the item is defective, heavily damaged during transit, or if you receive the wrong item, contact us within 48 hours at support@hopescraft.com. You must include your order number and clear photographic evidence of the issue, including pictures of the damaged shipping box, so we can evaluate the claim with our logistics partners and make it right.
            </p>
          </div>

          <div id="process" className="space-y-4 scroll-mt-24">
            <h2 className="font-serif text-2xl font-bold text-forest-slate border-b border-gray-100 pb-2">4. The Refund Process</h2>
            <p>
              Once your return is received and inspected at our Dhaka fulfillment center, we will send you an email to notify you of the approval or rejection of your refund. If approved, a credit will automatically be applied to your original method of payment. Please note that it can take 5-10 business days for your bank, Stripe, SSLCommerz, or bKash to officially post the refund to your account.
            </p>
          </div>

          <div id="b2b" className="space-y-4 scroll-mt-24">
            <h2 className="font-serif text-2xl font-bold text-forest-slate border-b border-gray-100 pb-2">5. B2B & Wholesale Returns</h2>
            <p>
              Returns and refunds for international B2B wholesale orders are handled differently than direct-to-consumer purchases. Due to the volume and freight logistics involved, wholesale orders are non-returnable unless the shipment is severely compromised or deviates substantially from the agreed-upon invoice specifications. Any discrepancies must be reported within 5 business days of cargo delivery at the destination port.
            </p>
          </div>

          <div id="shipping" className="space-y-4 scroll-mt-24">
            <h2 className="font-serif text-2xl font-bold text-forest-slate border-b border-gray-100 pb-2">6. Return Shipping Costs</h2>
            <p>
              You will be responsible for paying your own shipping costs for returning your item, unless the return is a direct result of our error (e.g., you received an incorrect or defective item). Original shipping costs are non-refundable. If you are returning an international order over $50, we strongly require using a trackable shipping service and purchasing shipping insurance, as we cannot guarantee we will receive your returned item.
            </p>
          </div>

          {/* Footer of the Refund Policy */}
          <div className="pt-12 mt-12 border-t border-gray-200 bg-gray-50 p-8 rounded-sm">
            <p className="text-sm font-bold text-forest-slate mb-2 uppercase tracking-widest">
              Last updated: {new Date().toLocaleDateString()}
            </p>
            <p className="text-sm text-gray-500">
              To initiate a return or ask a question about this policy, please contact our support team at <a href="mailto:support@hopescraft.com" className="text-terracotta hover:underline">support@hopescraft.com</a> with your order number.
            </p>
          </div>

        </div>
      </section>
    </div>
  );
}