"use client";

import { useState } from "react";
import Image from "next/image"; // <-- Added for Order Summary optimization
import { useCart } from "../../context/CartContext";
import { useCurrency } from "../../context/CurrencyContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle, Loader2 } from "lucide-react";
import { createOrder } from "../actions/checkout";

export default function CheckoutPage() {
  const { cartItems, subtotalBDT, subtotalUSD, clearCart } = useCart();
  const { currency } = useCurrency();
  const router = useRouter();

  const [isProcessing, setIsProcessing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [successOrderId, setSuccessOrderId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  // Form State
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    zip: "",
  });

  // Shipping Logic: Flat rate based on currency/region
  const shippingBDT = 120; // ৳120 domestic shipping
  const shippingUSD = 25;  // $25 international shipping

  const displaySubtotal = currency === "USD" ? subtotalUSD : subtotalBDT;
  const displayShipping = currency === "USD" ? shippingUSD : shippingBDT;
  const displayTotal = displaySubtotal + displayShipping;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle the live checkout process
  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!paymentMethod) {
      alert("Please select a payment method.");
      return;
    }

    setIsProcessing(true);
    setError("");

    try {
      const fullName = `${formData.firstName} ${formData.lastName}`.trim();
      const fullAddress = `${formData.street}, ${formData.city}, ${formData.zip}`.trim();

      // 1. Package the order data for Sanity
      const orderData = {
        name: fullName,
        email: formData.email,
        phone: formData.phone,
        address: fullAddress,
        total: displayTotal,
        currency: currency,
        items: cartItems.map((item: any) => ({
          _id: item._id,
          quantity: item.quantity,
          priceUSD: item.priceUSD,
          priceBDT: item.priceBDT
        }))
      };

      // 2. Save Order to Sanity First (Creates a record we can reference)
      const result = (await createOrder(orderData)) as { 
        success: boolean; 
        orderId?: string; 
        error?: string 
      };

      if (result.success && result.orderId) {
        
        // ==========================================
        // 3. STRIPE PAYMENT INTERCEPTION
        // ==========================================
        if (paymentMethod === "stripe") {
          try {
            const stripeResponse = await fetch("/api/checkout/stripe", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                items: cartItems,
                orderId: result.orderId,
              }),
            });

            const stripeData = await stripeResponse.json();

            if (stripeData.url) {
              if (clearCart) clearCart(); 
              window.location.href = stripeData.url;
              return; 
            } else {
              setError(stripeData.error || "Failed to initialize Stripe checkout.");
              setIsProcessing(false);
              return;
            }
          } catch (stripeErr) {
            setError("Failed to connect to the payment gateway.");
            setIsProcessing(false);
            return;
          }
        }

        // ==========================================
        // 4. SSLCOMMERZ / bKash PAYMENT INTERCEPTION
        // ==========================================
        if (paymentMethod === "sslcommerz" || paymentMethod === "bkash") {
          try {
            const sslResponse = await fetch("/api/checkout/sslcommerz", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                orderId: result.orderId,
                totalBDT: displayTotal,
                customerData: {
                  name: fullName,
                  email: formData.email,
                  phone: formData.phone,
                  address: fullAddress
                }
              }),
            });

            const sslData = await sslResponse.json();

            if (sslData.url) {
              if (clearCart) clearCart(); 
              window.location.href = sslData.url;
              return; 
            } else {
              setError(sslData.error || "Failed to initialize SSLCommerz checkout.");
              setIsProcessing(false);
              return;
            }
          } catch (sslErr) {
            setError("Failed to connect to the local payment gateway.");
            setIsProcessing(false);
            return;
          }
        }
        
        // ==========================================
        // 5. FALLBACK FOR COD
        // ==========================================
        setSuccessOrderId(result.orderId);
        setOrderPlaced(true);
        if (clearCart) clearCart(); // Empty the cart on success

      } else {
        setError(result.error || "Failed to place order.");
      }
    } catch (err) {
      setError("A network error occurred. Please try again.");
    } finally {
      // Only turn off processing if we didn't redirect to a payment gateway
      if (paymentMethod !== "stripe" && paymentMethod !== "sslcommerz" && paymentMethod !== "bkash") {
        setIsProcessing(false);
      }
    }
  };

  // Success Screen (Used for COD - Stripe and SSLCommerz have their own redirects)
  if (orderPlaced) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center">
        <CheckCircle size={64} className="text-green-600 mb-6" />
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-forest-slate mb-4">Order Confirmed</h1>
        <p className="font-sans text-lg text-gray-600 mb-2 max-w-lg">
          Thank you for supporting Hope's Craft. Your order is being processed and you will receive an email confirmation shortly.
        </p>
        <p className="font-sans text-sm font-bold text-forest-slate mb-8 bg-gray-50 py-3 px-6 rounded-sm border border-gray-200 shadow-sm inline-block">
          Order ID: <span className="text-terracotta">{successOrderId}</span>
        </p>
        <div>
          <Link 
            href="/shop" 
            className="bg-forest-slate text-white px-8 py-4 rounded-sm font-sans font-bold uppercase tracking-widest text-xs hover:bg-terracotta transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
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
            
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 text-sm font-sans rounded-sm">
                {error}
              </div>
            )}

            <form id="checkout-form" onSubmit={handlePlaceOrder} className="space-y-12">
              
              {/* 1. Shipping Details */}
              <section>
                <h2 className="font-sans text-lg font-bold text-forest-slate uppercase tracking-widest mb-6 border-b border-gray-200 pb-2">Shipping Information</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" required className="w-full border border-gray-300 p-3 rounded-sm focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta" />
                  <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" required className="w-full border border-gray-300 p-3 rounded-sm focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta" />
                  <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email Address" required className="w-full sm:col-span-2 border border-gray-300 p-3 rounded-sm focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta" />
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone Number" required className="w-full sm:col-span-2 border border-gray-300 p-3 rounded-sm focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta" />
                  <input type="text" name="street" value={formData.street} onChange={handleChange} placeholder="Street Address" required className="w-full sm:col-span-2 border border-gray-300 p-3 rounded-sm focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta" />
                  <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="City" required className="w-full border border-gray-300 p-3 rounded-sm focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta" />
                  <input type="text" name="zip" value={formData.zip} onChange={handleChange} placeholder="Postal / Zip Code" required className="w-full border border-gray-300 p-3 rounded-sm focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta" />
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
              
              {/* Item List */}
              <div className="max-h-64 overflow-y-auto pr-2 mb-6 space-y-4">
                {cartItems.map((item: any) => (
                  <div key={item._id} className="flex items-center space-x-4">
                    {/* UPDATED: Next.js Image Component for Cart Thumbnails */}
                    <div className="relative w-16 h-16 bg-white border border-gray-200 rounded-sm overflow-hidden flex-shrink-0">
                      {item.imageUrl && (
                        <Image 
                          src={item.imageUrl} 
                          alt={item.title} 
                          fill 
                          sizes="64px"
                          className="object-cover" 
                        />
                      )}
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
                  <><Loader2 size={16} className="animate-spin" /><span>Processing...</span></>
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