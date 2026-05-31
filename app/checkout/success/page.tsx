"use client";

import Link from "next/link";
import { CheckCircle, ShoppingBag } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
 
function SuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order_id");

  return (
    <>
      <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-8 shadow-sm">
        <CheckCircle size={48} strokeWidth={1.5} />
      </div>
      
      <h1 className="font-serif text-4xl md:text-5xl font-bold text-forest-slate mb-4">Payment Successful!</h1>
      
      <p className="font-sans text-lg text-gray-600 mb-8 max-w-lg mx-auto leading-relaxed">
        Your payment has been securely processed. Thank you for supporting Hope's Craft and the sustainable artisans of Bangladesh.
      </p>
      
      {orderId && (
        <div className="font-sans mb-10 bg-white p-6 rounded-sm border border-gray-200 shadow-sm w-full max-w-md mx-auto">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Official Order Reference</p>
          <p className="text-2xl font-bold text-terracotta tracking-wide">{orderId}</p>
        </div>
      )}
      
      <Link 
        href="/shop" 
        className="inline-flex items-center space-x-3 bg-forest-slate text-white px-8 py-4 rounded-sm font-sans font-bold uppercase tracking-widest text-xs hover:bg-terracotta transition-colors shadow-md"
      >
        <ShoppingBag size={18} />
        <span>Continue Shopping</span>
      </Link>
    </>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[75vh] px-6 text-center bg-gray-50 pt-16 pb-24">
      <Suspense fallback={<div className="font-sans text-forest-slate animate-pulse">Loading secure receipt...</div>}>
        <SuccessContent />
      </Suspense>
    </div>
  );
}