"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulating a network request for the general contact form
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1200);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center bg-white">
        <CheckCircle size={64} className="text-terracotta mb-6" />
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-forest-slate mb-4">Message Sent</h1>
        <p className="font-sans text-lg text-gray-600 mb-8 max-w-lg mx-auto">
          Thank you for reaching out to Hope's Craft. Our support team will get back to you within 24 hours.
        </p>
        <button 
          onClick={() => {
            setSubmitted(false);
            setFormData({ name: "", email: "", subject: "", message: "" });
          }}
          className="bg-forest-slate text-white px-8 py-4 rounded-sm font-sans font-bold uppercase tracking-widest text-xs hover:bg-terracotta transition-colors"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full bg-white text-black min-h-screen">
      
      {/* Hero Section */}
      <section className="bg-jute-base pt-24 pb-16 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-serif text-5xl md:text-6xl font-bold mb-6 tracking-tighter text-forest-slate">
            Get in <span className="text-terracotta italic font-light">Touch</span>
          </h1>
          <p className="font-sans text-lg text-forest-slate/80 max-w-2xl mx-auto">
            Whether you have a question about our sustainable jute products, shipping, or our artisan stories, we are here to help.
          </p>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="py-20 px-6 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        {/* Left: Contact Information */}
        <div className="lg:col-span-5 flex flex-col space-y-12">
          <div>
            <h2 className="font-serif text-3xl font-bold text-forest-slate mb-6">Contact Information</h2>
            <p className="font-sans text-gray-600 leading-relaxed mb-8">
              Prefer to reach out directly? Use the details below to contact our Dhaka studio. For bulk inquiries, please use our dedicated B2B portal.
            </p>
          </div>

          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gray-50 border border-gray-100 rounded-full flex items-center justify-center flex-shrink-0 text-terracotta">
                <MapPin size={20} />
              </div>
              <div className="pt-1">
                <h4 className="font-sans font-bold text-forest-slate mb-1 uppercase tracking-widest text-xs">Our Studio</h4>
                <p className="font-sans text-sm text-gray-500 leading-relaxed">
                  Gulshan Avenue, Block C<br />
                  Dhaka 1212, Bangladesh
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gray-50 border border-gray-100 rounded-full flex items-center justify-center flex-shrink-0 text-terracotta">
                <Mail size={20} />
              </div>
              <div className="pt-1">
                <h4 className="font-sans font-bold text-forest-slate mb-1 uppercase tracking-widest text-xs">Email Us</h4>
                <p className="font-sans text-sm text-gray-500">support@hopescraft.com</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gray-50 border border-gray-100 rounded-full flex items-center justify-center flex-shrink-0 text-terracotta">
                <Phone size={20} />
              </div>
              <div className="pt-1">
                <h4 className="font-sans font-bold text-forest-slate mb-1 uppercase tracking-widest text-xs">Call Us</h4>
                <p className="font-sans text-sm text-gray-500">+880 1711-000000</p>
                <p className="font-sans text-xs text-gray-400 mt-1">Sun-Thu, 9am - 5pm BDT</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: The Contact Form */}
        <div className="lg:col-span-7">
          <div className="bg-white p-8 md:p-12 rounded-sm border border-gray-100 shadow-xl shadow-gray-100/50">
            <h3 className="font-serif text-2xl font-bold text-forest-slate mb-8 border-b border-gray-100 pb-4">Send a Message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div>
                <label className="block font-sans text-xs font-bold text-forest-slate uppercase tracking-widest mb-2">Full Name *</label>
                <input 
                  type="text" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  required 
                  className="w-full border border-gray-200 p-4 rounded-sm focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta bg-gray-50/50 transition-colors" 
                  placeholder="Jane Doe"
                />
              </div>

              <div>
                <label className="block font-sans text-xs font-bold text-forest-slate uppercase tracking-widest mb-2">Email Address *</label>
                <input 
                  type="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  required 
                  className="w-full border border-gray-200 p-4 rounded-sm focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta bg-gray-50/50 transition-colors" 
                  placeholder="jane@example.com"
                />
              </div>

              <div>
                <label className="block font-sans text-xs font-bold text-forest-slate uppercase tracking-widest mb-2">Subject *</label>
                <input 
                  type="text" 
                  name="subject" 
                  value={formData.subject} 
                  onChange={handleChange} 
                  required 
                  className="w-full border border-gray-200 p-4 rounded-sm focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta bg-gray-50/50 transition-colors" 
                  placeholder="How can we help?"
                />
              </div>

              <div>
                <label className="block font-sans text-xs font-bold text-forest-slate uppercase tracking-widest mb-2">Message *</label>
                <textarea 
                  name="message" 
                  value={formData.message} 
                  onChange={handleChange} 
                  required 
                  rows={5} 
                  className="w-full border border-gray-200 p-4 rounded-sm focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta bg-gray-50/50 transition-colors resize-none"
                  placeholder="Write your message here..."
                ></textarea>
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-forest-slate text-white py-4 text-xs font-bold uppercase tracking-widest shadow-lg hover:bg-terracotta transition-colors flex items-center justify-center space-x-2 rounded-sm disabled:bg-gray-400 mt-4"
              >
                {isSubmitting ? (
                  <span>Sending...</span>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send size={16} />
                  </>
                )}
              </button>

            </form>
          </div>
        </div>

      </section>
    </div>
  );
}