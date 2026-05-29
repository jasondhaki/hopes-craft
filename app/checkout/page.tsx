"use client";

import { useState } from "react";
import { useCart } from "../../context/CartContext";
import { useCurrency } from "../../context/CurrencyContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle } from "lucide-react";

export default function CheckoutPage() {
  const { cartItems, subtotalBDT, subtotalUSD, clearCart } = useCart();
  const { currency } = useCurrency();
  const router = useRouter();

  const [isProcessing, setIsProcessing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");

  // Shipping Logic: Flat rate based on currency/region for the dummy implementation
  const shippingBDT = 120; // ৳120 domestic shipping
  const shippingUSD = 25;  // $25 international shipping

  const displaySubtotal = currency === "USD" ? subtotalUSD : subtotalBDT;
  const displayShipping = currency === "USD" ? shippingUSD : shippingBDT;
  const displayTotal = displaySubtotal + displayShipping;

  // Handle the dummy checkout process
  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!paymentMethod) {
      alert("Please select a payment method.");
      return;
    }

    setIsProcessing(true);

    // Simulate API call to payment gateway
    setTimeout(() => {
      setIsProcessing(false);
      setOrderPlaced(true);
      clearCart(); // Empty the cart on success
    }, 2000);
  };

  // Success Screen
  if (orderPlaced) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center">
        <CheckCircle size={64} className="text-green-600 mb-6" />
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-forest-slate mb-4">Order Confirmed</h1>
        <p className="font-sans text-lg text-gray-600 mb-8 max-w-lg">
          Thank you for supporting Hope's Craft. Your order is being processed and you will receive an email confirmation shortly.
        </p>
        <Link 
          href="/shop" 
          className="bg-forest-slate text-white px-8 py-4 rounded-sm font-sans font-bold uppercase tracking-widest text-xs hover:bg-terracotta transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  // Empty Cart Check
  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center">
        <h1 className="font-serif text-3xl font-bold text-forest-slate mb-4">Checkout Unavailable</h1>
        <p className="font-sans text-gray-500 mb-8">Your cart is empty.</p>
        <button onClick={() => router.push('/shop')} className="bg-forest-slate text-white px-8 py-4 rounded-sm text-xs font-bold uppercase tracking-widest hover:bg-terracotta">
          Return to Shop
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full bg-white text-black min-h-screen pt-12 pb-24">
      <div className="max-w-7xl mx-auto px-6 w-full">
        
        <Link href="/cart" className="inline-flex items-center space-x-2 text-sm font-sans font-bold uppercase tracking-widest text-gray-400 hover:text-terracotta transition-colors mb-8">
          <ArrowLeft size={16} />
          <span>Back to Cart</span>
        </Link>

        <h1 className="font-serif text-4xl font-bold text-forest-slate mb-12">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          
          {/* Left: Checkout Form */}
          <div className="lg:col-span-7">
            <form id="checkout-form" onSubmit={handlePlaceOrder} className="space-y-12">
              
              {/* 1. Shipping Details */}
              <section>
                <h2 className="font-sans text-lg font-bold text-forest-slate uppercase tracking-widest mb-6 border-b border-gray-200 pb-2">Shipping Information</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <input type="text" placeholder="First Name" required className="w-full border border-gray-300 p-3 rounded-sm focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta" />
                  <input type="text" placeholder="Last Name" required className="w-full border border-gray-300 p-3 rounded-sm focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta" />
                  <input type="email" placeholder="Email Address" required className="w-full sm:col-span-2 border border-gray-300 p-3 rounded-sm focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta" />
                  <input type="text" placeholder="Street Address" required className="w-full sm:col-span-2 border border-gray-300 p-3 rounded-sm focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta" />
                  <input type="text" placeholder="City" required className="w-full border border-gray-300 p-3 rounded-sm focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta" />
                  <input type="text" placeholder="Postal / Zip Code" required className="w-full border border-gray-300 p-3 rounded-sm focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta" />
                </div>
              </section>

              {/* 2. Payment Method */}
              <section>
                <h2 className="font-sans text-lg font-bold text-forest-slate uppercase tracking-widest mb-6 border-b border-gray-200 pb-2">Payment Method</h2>
                <div className="space-y-4">
                  {currency === "BDT" ? (
                    // Domestic Options
                    <>
                      <label className={`flex items-center p-4 border rounded-sm cursor-pointer transition-colors ${paymentMethod === 'bkash' ? 'border-terracotta bg-terracotta/5' : 'border-gray-200 hover:border-gray-300'}`}>
                        <input type="radio" name="payment" value="bkash" onChange={(e) => setPaymentMethod(e.target.value)} className="mr-4 accent-terracotta" />
                        <span className="font-sans font-medium text-forest-slate">bKash Mobile Banking</span>
                      </label>
                      <label className={`flex items-center p-4 border rounded-sm cursor-pointer transition-colors ${paymentMethod === 'sslcommerz' ? 'border-terracotta bg-terracotta/5' : 'border-gray-200 hover:border-gray-300'}`}>
                        <input type="radio" name="payment" value="sslcommerz" onChange={(e) => setPaymentMethod(e.target.value)} className="mr-4 accent-terracotta" />
                        <span className="font-sans font-medium text-forest-slate">SSLCommerz (Cards/Net Banking)</span>
                      </label>
                      <label className={`flex items-center p-4 border rounded-sm cursor-pointer transition-colors ${paymentMethod === 'cod' ? 'border-terracotta bg-terracotta/5' : 'border-gray-200 hover:border-gray-300'}`}>
                        <input type="radio" name="payment" value="cod" onChange={(e) => setPaymentMethod(e.target.value)} className="mr-4 accent-terracotta" />
                        <span className="font-sans font-medium text-forest-slate">Cash on Delivery (COD)</span>
                      </label>
                    </>
                  ) : (
                    // International Options
                    <>
                      <label className={`flex items-center p-4 border rounded-sm cursor-pointer transition-colors ${paymentMethod === 'stripe' ? 'border-terracotta bg-terracotta/5' : 'border-gray-200 hover:border-gray-300'}`}>
                        <input type="radio" name="payment" value="stripe" onChange={(e) => setPaymentMethod(e.target.value)} className="mr-4 accent-terracotta" />
                        <span className="font-sans font-medium text-forest-slate">Credit / Debit Card (Stripe)</span>
                      </label>
                      <label className={`flex items-center p-4 border rounded-sm cursor-pointer transition-colors ${paymentMethod === 'paypal' ? 'border-terracotta bg-terracotta/5' : 'border-gray-200 hover:border-gray-300'}`}>
                        <input type="radio" name="payment" value="paypal" onChange={(e) => setPaymentMethod(e.target.value)} className="mr-4 accent-terracotta" />
                        <span className="font-sans font-medium text-forest-slate">PayPal</span>
                      </label>
                    </>
                  )}
                </div>
              </section>

            </form>
          </div>

          {/* Right: Order Summary */}
          <div className="lg:col-span-5">
            <div className="bg-gray-50 p-8 rounded-sm sticky top-32 border border-gray-100">
              <h2 className="font-serif text-2xl font-bold text-forest-slate mb-6">Order Summary</h2>
              
              {/* Item List (Scrollable if many items) */}
              <div className="max-h-64 overflow-y-auto pr-2 mb-6 space-y-4">
                {cartItems.map((item) => (
                  <div key={item._id} className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-white border border-gray-200 rounded-sm overflow-hidden flex-shrink-0">
                      {item.imageUrl && <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />}
                    </div>
                    <div className="flex flex-col flex-grow text-sm">
                      <span className="font-bold text-forest-slate line-clamp-1">{item.title}</span>
                      <span className="text-gray-500">Qty: {item.quantity}</span>
                    </div>
                    <div className="font-bold text-forest-slate text-sm">
                      {currency === "USD" ? `$${(item.priceUSD * item.quantity).toFixed(2)}` : `৳${item.priceBDT * item.quantity}`}
                    </div>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="border-t border-gray-200 pt-6 space-y-4">
                <div className="flex justify-between font-sans text-forest-slate/80">
                  <span>Subtotal</span>
                  <span>{currency === "USD" ? `$${displaySubtotal.toFixed(2)}` : `৳${displaySubtotal}`}</span>
                </div>
                <div className="flex justify-between font-sans text-forest-slate/80">
                  <span>Shipping</span>
                  <span>{currency === "USD" ? `$${displayShipping.toFixed(2)}` : `৳${displayShipping}`}</span>
                </div>
                
                <div className="flex justify-between font-serif font-bold text-2xl text-forest-slate border-t border-gray-200 pt-6">
                  <span>Total</span>
                  <span>{currency === "USD" ? `$${displayTotal.toFixed(2)}` : `৳${displayTotal}`}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button 
                type="submit"
                form="checkout-form"
                disabled={isProcessing}
                className="w-full mt-8 bg-forest-slate text-white py-4 text-xs font-bold uppercase tracking-widest shadow-lg hover:bg-terracotta transition-colors flex items-center justify-center space-x-2 rounded-sm disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  <span>Processing...</span>
                ) : (
                  <span>Place Order</span>
                )}
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}