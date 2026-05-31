"use client";

import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

// We extract the part that uses useSearchParams into its own component
function SuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order_id");

  return (
    <>
      <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-8 shadow-sm">
        <CheckCircle size={48} strokeWidth={1.5} />
      </div>
      <h1 className="font-serif text-4xl md:text-5xl font-bold text-forest-slate mb-4">Payment Successful!</h1>
      <p className="font-sans text-lg text-gray-600 mb-2 max-w-lg mx-auto">
        Your payment has been securely processed via Stripe. Thank you for supporting sustainable craftsmanship. 
      </p>
      {orderId && (
        <p className="font-sans text-sm font-bold text-forest-slate mb-8 bg-white py-3 px-6 rounded-sm border border-gray-200 shadow-sm">
          Order ID: <span className="text-terracotta">{orderId}</span>
        </p>
      )}
      <Link 
        href="/shop" 
        className="bg-forest-slate text-white px-8 py-4 rounded-sm font-sans font-bold uppercase tracking-widest text-xs hover:bg-terracotta transition-colors"
      >
        Continue Shopping
      </Link>
    </>
  );
}

// Then we wrap it in a Suspense boundary in the main default export
export default function CheckoutSuccessPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[75vh] px-6 text-center bg-gray-50">
      <Suspense fallback={<div className="font-sans text-forest-slate animate-pulse">Loading order details...</div>}>
        <SuccessContent />
      </Suspense>
    </div>
  );
}