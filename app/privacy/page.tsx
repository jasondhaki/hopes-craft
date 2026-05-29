"use client";

import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";

export default function PrivacyPage() {
  // Navigation array for the sticky sidebar
  const sections = [
    { id: "collection", title: "1. Information We Collect" },
    { id: "usage", title: "2. How We Use Your Data" },
    { id: "cookies", title: "3. Cookies & Tracking" },
    { id: "sharing", title: "4. Data Sharing & Third Parties" },
    { id: "security", title: "5. Retention & Security" },
    { id: "international", title: "6. International Transfers" },
    { id: "rights", title: "7. Your Privacy Rights" },
    { id: "changes", title: "8. Changes to Policy" },
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
      
      {/* Premium Header Section */}
      <section className="bg-jute-base pt-24 pb-20 px-6 text-center border-b border-gray-200">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-terracotta shadow-sm mb-6">
            <ShieldCheck size={28} strokeWidth={1.5} />
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6 tracking-tight text-forest-slate">
            Privacy <span className="text-terracotta italic font-light">Policy</span>
          </h1>
          <p className="font-sans text-lg text-forest-slate/80 max-w-2xl mx-auto">
            We value your trust. This policy outlines how we transparently collect, use, and protect your personal and business information.
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

        {/* Right: Expanded Privacy Content */}
        <div className="lg:w-3/4 font-sans text-gray-600 leading-relaxed space-y-16">
          
          {/* Mobile Back Button */}
          <Link href="/" className="lg:hidden inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-terracotta transition-colors mb-4">
            <ArrowLeft size={16} />
            <span>Back to Home</span>
          </Link>

          <div id="collection" className="space-y-4 scroll-mt-24">
            <h2 className="font-serif text-2xl font-bold text-forest-slate border-b border-gray-100 pb-2">1. Information We Collect</h2>
            <p>
              When you interact with Hope's Craft, we collect specific information to fulfill your requests. This includes <strong>Personal Data</strong> (such as your name, billing/shipping addresses, email, and phone number) provided during checkout or account creation. For our wholesale partners, we also collect <strong>Business Data</strong> (company name, tax IDs, target shipping ports) via our B2B portal. Additionally, we automatically collect <strong>Device & Usage Data</strong> (IP address, browser type, pages visited) to optimize our platform's performance.
            </p>
          </div>

          <div id="usage" className="space-y-4 scroll-mt-24">
            <h2 className="font-serif text-2xl font-bold text-forest-slate border-b border-gray-100 pb-2">2. How We Use Your Data</h2>
            <p>
              We leverage the collected data primarily to process and fulfill your orders, generate accurate B2B wholesale quotes, and provide seamless customer support. Furthermore, we use usage data to improve our website architecture and troubleshoot technical issues. If you have explicitly opted in, we may use your email address to send you updates regarding our artisan communities, sustainability impact reports, and new product collections.
            </p>
          </div>

          <div id="cookies" className="space-y-4 scroll-mt-24">
            <h2 className="font-serif text-2xl font-bold text-forest-slate border-b border-gray-100 pb-2">3. Cookies & Tracking Technologies</h2>
            <p>
              Hope's Craft utilizes cookies and similar tracking technologies to enhance your browsing experience. Essential cookies are used to maintain your global shopping cart state (e.g., retaining items in your cart) and currency preferences (BDT vs. USD). Analytical cookies help us understand user traffic patterns. You can instruct your browser to refuse all non-essential cookies, though some features of our site may not function properly as a result.
            </p>
          </div>

          <div id="sharing" className="space-y-4 scroll-mt-24">
            <h2 className="font-serif text-2xl font-bold text-forest-slate border-b border-gray-100 pb-2">4. Data Sharing & Third Parties</h2>
            <p>
              We do not sell your personal data. We exclusively share necessary information with trusted third-party service providers required to operate our business. This includes our payment processors (Stripe, SSLCommerz, bKash) for secure financial transactions, our cloud hosting providers (Vercel, Sanity CMS) for data management, and our logistics partners (e.g., DHL, local freight forwarders) to physically deliver your orders.
            </p>
          </div>

          <div id="security" className="space-y-4 scroll-mt-24">
            <h2 className="font-serif text-2xl font-bold text-forest-slate border-b border-gray-100 pb-2">5. Data Retention & Security</h2>
            <p>
              We retain your personal information only for as long as is necessary for the purposes set out in this policy, or as required to comply with legal obligations, resolve disputes, and enforce our legal agreements. We implement strict, industry-standard security measures—including TLS/SSL encryption and sanitized server-side API endpoints—to protect your data against unauthorized access, alteration, disclosure, or destruction.
            </p>
          </div>

          <div id="international" className="space-y-4 scroll-mt-24">
            <h2 className="font-serif text-2xl font-bold text-forest-slate border-b border-gray-100 pb-2">6. International Data Transfers</h2>
            <p>
              Because Hope's Craft operates globally and utilizes international cloud infrastructure, your information, including Personal Data, may be transferred to—and maintained on—computers located outside of your state, province, country, or other governmental jurisdiction where the data protection laws may differ from those of your jurisdiction. By consenting to this Privacy Policy and submitting your data, you agree to these transfers.
            </p>
          </div>

          <div id="rights" className="space-y-4 scroll-mt-24">
            <h2 className="font-serif text-2xl font-bold text-forest-slate border-b border-gray-100 pb-2">7. Your Privacy Rights</h2>
            <p>
              Depending on your jurisdiction (such as under the GDPR or CCPA), you may have specific rights regarding your personal data. These include the right to access the data we hold about you, the right to request corrections to inaccurate data, the right to object to our processing of your data, and the right to request the deletion of your personal information. To exercise any of these rights, please contact our privacy team.
            </p>
          </div>

          <div id="changes" className="space-y-4 scroll-mt-24">
            <h2 className="font-serif text-2xl font-bold text-forest-slate border-b border-gray-100 pb-2">8. Changes to This Policy</h2>
            <p>
              We may update our Privacy Policy periodically to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the "Last updated" date below. You are advised to review this Privacy Policy periodically for any changes.
            </p>
          </div>

          {/* Footer of the Privacy Policy */}
          <div className="pt-12 mt-12 border-t border-gray-200 bg-gray-50 p-8 rounded-sm">
            <p className="text-sm font-bold text-forest-slate mb-2 uppercase tracking-widest">
              Last updated: {new Date().toLocaleDateString()}
            </p>
            <p className="text-sm text-gray-500">
              If you have any questions, concerns, or data requests regarding this Privacy Policy, please contact our compliance team at <a href="mailto:privacy@hopescraft.com" className="text-terracotta hover:underline">privacy@hopescraft.com</a>.
            </p>
          </div>

        </div>
      </section>
    </div>
  );
}