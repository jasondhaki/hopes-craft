"use client";

import { useState } from "react";
import { subscribeToNewsletter } from "../app/actions/subscribe";

export default function HomeNewsletterForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData();
    formData.append("email", email);

    const result = await subscribeToNewsletter(formData);
    
    if (result.success) {
      setStatus("success");
      setEmail("");
    } else {
      setStatus("error");
    }
    
    setIsSubmitting(false);
  };

  if (status === "success") {
    return (
      <div className="w-full max-w-lg mx-auto mb-10 p-4 bg-white/10 border border-white/20 rounded-sm text-center">
        <p className="font-sans text-white font-bold tracking-widest uppercase text-sm">Thank you for subscribing!</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center justify-center w-full max-w-lg mx-auto gap-3 mb-10">
      <input 
        type="email" 
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email address..." 
        className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-sm font-sans text-sm focus:outline-none focus:ring-1 focus:ring-terracotta text-white placeholder-gray-400" 
        required 
      />
      <button 
        type="submit" 
        disabled={isSubmitting}
        className="w-full sm:w-auto bg-terracotta text-white px-8 py-4 rounded-sm font-sans font-bold uppercase tracking-widest text-xs hover:bg-white hover:text-forest-slate transition-colors whitespace-nowrap disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Subscribing..." : "Subscribe"}
      </button>
    </form>
  );
}