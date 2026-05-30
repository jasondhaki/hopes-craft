"use client";

import { useState } from "react";
import { ArrowRight, Globe, Anchor, Package } from "lucide-react";
import { sendWholesaleEmail } from "../actions/wholesale";

export default function WholesalePage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  
  // State to hold our form inputs
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    port: "",
    volume: "",
    details: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      // 1. Package your React state into a FormData object
      const data = new FormData();
      data.append("firstName", formData.firstName);
      data.append("lastName", formData.lastName);
      data.append("email", formData.email);
      data.append("company", formData.company);
      data.append("port", formData.port);
      data.append("volume", formData.volume);
      data.append("details", formData.details);

      // 2. Send it to our secure Server Action
      const result = await sendWholesaleEmail(data);

      if (result.success) {
        setSubmitted(true);
      } else {
        setErrorMessage(result.error || "Something went wrong.");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center bg-white">
        <div className="w-20 h-20 bg-jute-base rounded-full flex items-center justify-center mb-6">
          <Globe size={32} className="text-terracotta" />
        </div>
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-forest-slate mb-4">Inquiry Received</h1>
        <p className="font-sans text-lg text-gray-600 mb-8 max-w-lg mx-auto">
          Thank you for your interest in partnering with Hope's Craft. Our B2B team will review your requirements and contact you within 24-48 hours with a custom quote.
        </p>
        <button 
          onClick={() => {
            setSubmitted(false);
            setFormData({ firstName: "", lastName: "", email: "", company: "", port: "", volume: "", details: "" });
          }}
          className="bg-forest-slate text-white px-8 py-4 rounded-sm font-sans font-bold uppercase tracking-widest text-xs hover:bg-terracotta transition-colors"
        >
          Submit Another Inquiry
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full bg-white text-black min-h-screen">
      
      <section className="bg-forest-slate pt-24 pb-20 px-6 text-center text-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-serif text-5xl md:text-6xl font-bold mb-6 tracking-tight">
            Global <span className="text-terracotta italic font-light">Partnerships</span>
          </h1>
          <p className="font-sans text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto">
            Bring the heritage of authentic Bengali jute to your retail stores. We supply sustainable, handcrafted goods to boutiques and distributors worldwide.
          </p>
        </div>
      </section>

      <section className="py-20 px-6 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        <div className="lg:col-span-5 flex flex-col space-y-12">
          <div>
            <h2 className="font-serif text-3xl font-bold text-forest-slate mb-4">Why Partner With Us?</h2>
            <p className="font-sans text-gray-600 leading-relaxed">
              We manage the entire supply chain—from raw sun-cured jute in the deltas of Bangladesh to final export. By cutting out middlemen, we guarantee fair wages for our artisans and competitive margins for our B2B partners.
            </p>
          </div>

          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-jute-base rounded-full flex items-center justify-center flex-shrink-0 text-terracotta">
                <Package size={20} />
              </div>
              <div>
                <h4 className="font-sans font-bold text-forest-slate mb-1">Scalable Production</h4>
                <p className="font-sans text-sm text-gray-500">Capable of fulfilling orders from 100 to 10,000+ units with strict quality assurance.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-jute-base rounded-full flex items-center justify-center flex-shrink-0 text-terracotta">
                <Globe size={20} />
              </div>
              <div>
                <h4 className="font-sans font-bold text-forest-slate mb-1">White-Label Ready</h4>
                <p className="font-sans text-sm text-gray-500">Custom tagging and unbranded eco-packaging available for established retail brands.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-jute-base rounded-full flex items-center justify-center flex-shrink-0 text-terracotta">
                <Anchor size={20} />
              </div>
              <div>
                <h4 className="font-sans font-bold text-forest-slate mb-1">Global Freight Logistics</h4>
                <p className="font-sans text-sm text-gray-500">FOB Chittagong port. We handle customs clearance documentation for smooth sea or air freight.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="bg-gray-50 p-8 md:p-12 rounded-sm border border-gray-100 shadow-sm">
            <h3 className="font-serif text-2xl font-bold text-forest-slate mb-8 border-b border-gray-200 pb-4">Request a Wholesale Quote</h3>
            
            {errorMessage && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 text-sm font-sans rounded-sm">
                {errorMessage}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block font-sans text-xs font-bold text-forest-slate uppercase tracking-widest mb-2">First Name *</label>
                  <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required className="w-full border border-gray-300 p-3 rounded-sm focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta bg-white" />
                </div>
                <div>
                  <label className="block font-sans text-xs font-bold text-forest-slate uppercase tracking-widest mb-2">Last Name *</label>
                  <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required className="w-full border border-gray-300 p-3 rounded-sm focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta bg-white" />
                </div>
              </div>

              <div>
                <label className="block font-sans text-xs font-bold text-forest-slate uppercase tracking-widest mb-2">Business Email *</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full border border-gray-300 p-3 rounded-sm focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta bg-white" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block font-sans text-xs font-bold text-forest-slate uppercase tracking-widest mb-2">Company Name *</label>
                  <input type="text" name="company" value={formData.company} onChange={handleChange} required className="w-full border border-gray-300 p-3 rounded-sm focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta bg-white" />
                </div>
                <div>
                  <label className="block font-sans text-xs font-bold text-forest-slate uppercase tracking-widest mb-2">Target Shipping Port</label>
                  <input type="text" name="port" value={formData.port} onChange={handleChange} placeholder="e.g., Los Angeles, CA" className="w-full border border-gray-300 p-3 rounded-sm focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta bg-white" />
                </div>
              </div>

              <div>
                <label className="block font-sans text-xs font-bold text-forest-slate uppercase tracking-widest mb-2">Estimated Volume / Quantity *</label>
                <select name="volume" value={formData.volume} onChange={handleChange} required className="w-full border border-gray-300 p-3 rounded-sm focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta bg-white text-forest-slate">
                  <option value="" disabled>Select an option</option>
                  <option value="100-500">100 - 500 units</option>
                  <option value="500-1000">500 - 1,000 units</option>
                  <option value="1000-5000">1,000 - 5,000 units</option>
                  <option value="5000+">5,000+ units</option>
                </select>
              </div>

              <div>
                <label className="block font-sans text-xs font-bold text-forest-slate uppercase tracking-widest mb-2">Project Details *</label>
                <textarea name="details" value={formData.details} onChange={handleChange} required rows={4} placeholder="Tell us about your target timeline and specific product interests..." className="w-full border border-gray-300 p-3 rounded-sm focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta bg-white"></textarea>
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-forest-slate text-white py-4 text-xs font-bold uppercase tracking-widest shadow-lg hover:bg-terracotta transition-colors flex items-center justify-center space-x-2 rounded-sm disabled:bg-gray-400"
              >
                {isSubmitting ? <span>Submitting...</span> : <span>Submit Inquiry</span>}
              </button>

            </form>
          </div>
        </div>

      </section>
    </div>
  );
}