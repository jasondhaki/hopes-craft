"use client";

import Link from "next/link";
import Image from "next/image"; // <-- NEW IMPORT
import { ArrowLeft, Scale } from "lucide-react";

export default function TermsPage() {
  // Navigation array for our new sticky sidebar
  const sections = [
    { id: "intro", title: "1. Introduction" },
    { id: "ip", title: "2. Intellectual Property" },
    { id: "products", title: "3. Handcrafted Products" },
    { id: "pricing", title: "4. Pricing & Wholesale" },
    { id: "third-party", title: "5. Third-Party Services" },
    { id: "liability", title: "6. Limitation of Liability" },
    { id: "changes", title: "7. Changes to Terms" },
    { id: "governing-law", title: "8. Governing Law" },
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
          <Image 
            src="/image_b51cfa.jpg" 
            alt="Legal terms background" 
            fill
            priority
            className="object-cover opacity-80" 
          />    
          <div className="absolute inset-0 bg-[#f5e8ce]/30 backdrop-blur-[2px]"></div>
        </div>

        <div className="max-w-4xl mx-auto flex flex-col items-center relative z-10">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-terracotta shadow-sm mb-6">
            <Scale size={28} strokeWidth={1.5} />
          </div>
          <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6 tracking-tight text-forest-slate drop-shadow-sm">
            Terms & <span className="text-[#E2725B] italic font-light">Conditions</span>
          </h1>
          <p className="font-sans text-lg md:text-xl text-forest-slate/90 max-w-2xl mx-auto font-medium drop-shadow-sm">
            Please read these terms carefully before using our platform. These rules ensure a safe, transparent, and fair experience for our community.
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

        {/* Right: Expanded Legal Content */}
        <div className="lg:w-3/4 font-sans text-gray-600 leading-relaxed space-y-16">
          
          {/* Mobile Back Button */}
          <Link href="/" className="lg:hidden inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-terracotta transition-colors mb-4">
            <ArrowLeft size={16} />
            <span>Back to Home</span>
          </Link>

          <div id="intro" className="space-y-4 scroll-mt-24">
            <h2 className="font-serif text-2xl font-bold text-forest-slate border-b border-gray-100 pb-2">1. Introduction</h2>
            <p>
              Welcome to Hope's Craft. By accessing our website, creating an account, or purchasing our sustainable jute products, you agree to be bound by these Terms and Conditions. These terms apply to all visitors, users, and B2B partners who access or use the Service. If you disagree with any part of the terms, you may not access the Service.
            </p>
          </div>

          <div id="ip" className="space-y-4 scroll-mt-24">
            <h2 className="font-serif text-2xl font-bold text-forest-slate border-b border-gray-100 pb-2">2. Intellectual Property</h2>
            <p>
              The platform and its original content, features, photography, branding, and functionality are and will remain the exclusive property of Hope's Craft and its licensors. Our brand narrative, site design, and artisan stories are protected by copyright, trademark, and international intellectual property laws. You may not reproduce, distribute, or create derivative works without our explicit written consent.
            </p>
          </div>

          <div id="products" className="space-y-4 scroll-mt-24">
            <h2 className="font-serif text-2xl font-bold text-forest-slate border-b border-gray-100 pb-2">3. Handcrafted Products</h2>
            <p>
              All of our jute products are sustainably handcrafted by artisans in Bangladesh. Therefore, slight variations in weave, color, texture, and dimensions are natural characteristics of the material and the human element of craftsmanship—they are not defects. While we make every effort to display the colors and images of our products accurately, we cannot guarantee that your device's display of any color will be perfectly accurate.
            </p>
          </div>

          <div id="pricing" className="space-y-4 scroll-mt-24">
            <h2 className="font-serif text-2xl font-bold text-forest-slate border-b border-gray-100 pb-2">4. Pricing and B2B Wholesale</h2>
            <p>
              Prices for our products are subject to change without notice. We reserve the right to modify or discontinue a product at any time. For our international B2B partners, specific volume-based quotes provided via our Wholesale portal are valid for 30 days from the date of issuance unless otherwise stated on the official invoice. Shipping costs (including FOB Chittagong port fees for bulk orders) will be calculated dynamically at checkout or drafted into the final B2B invoice.
            </p>
          </div>

          <div id="third-party" className="space-y-4 scroll-mt-24">
            <h2 className="font-serif text-2xl font-bold text-forest-slate border-b border-gray-100 pb-2">5. Third-Party Services & Payments</h2>
            <p>
              Our store utilizes trusted third-party payment gateways (including Stripe, SSLCommerz, and mobile banking providers like bKash) to process transactions securely. By making a purchase, you agree to their respective terms of service. Hope's Craft does not store your direct credit card information on our servers. We are not liable for any service interruptions, errors, or security breaches originating from these third-party payment processors.
            </p>
          </div>

          <div id="liability" className="space-y-4 scroll-mt-24">
            <h2 className="font-serif text-2xl font-bold text-forest-slate border-b border-gray-100 pb-2">6. Limitation of Liability</h2>
            <p>
              In no event shall Hope's Craft, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the Service; (ii) any conduct or content of any third party on the Service; or (iii) unauthorized access, use or alteration of your transmissions or content.
            </p>
          </div>

          <div id="changes" className="space-y-4 scroll-mt-24">
            <h2 className="font-serif text-2xl font-bold text-forest-slate border-b border-gray-100 pb-2">7. Changes to Terms</h2>
            <p>
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion. By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms.
            </p>
          </div>

          <div id="governing-law" className="space-y-4 scroll-mt-24">
            <h2 className="font-serif text-2xl font-bold text-forest-slate border-b border-gray-100 pb-2">8. Governing Law</h2>
            <p>
              These Terms shall be governed and construed in accordance with the laws of Bangladesh, without regard to its conflict of law provisions. Any disputes, claims, or legal proceedings relating to these terms or your use of the platform will be subject to the exclusive jurisdiction of the competent courts located in Dhaka, Bangladesh.
            </p>
          </div>

          {/* Footer of the Terms */}
          <div className="pt-12 mt-12 border-t border-gray-200 bg-gray-50 p-8 rounded-sm">
            <p className="text-sm font-bold text-forest-slate mb-2 uppercase tracking-widest">
              Last updated: {new Date().toLocaleDateString()}
            </p>
            <p className="text-sm text-gray-500">
              If you have any questions, concerns, or require clarification regarding these Terms & Conditions, please contact our legal team at <a href="mailto:support@hopescraft.com" className="text-terracotta hover:underline">support@hopescraft.com</a>.
            </p>
          </div>

        </div>
      </section>
    </div>
  );
}