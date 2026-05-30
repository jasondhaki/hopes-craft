import { NextResponse } from "next/server";
import Stripe from "stripe";

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2023-10-16" as any, 
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { items, orderId } = body;

    // 1. Transform your cart items into the exact format Stripe requires
    const lineItems = items.map((item: any) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.title || "Hope's Craft Item",
          images: item.imageUrl ? [item.imageUrl] : [],
        },
        // Stripe requires the price in CENTS, not dollars. 
        // So $25.50 becomes 2550 cents.
        unit_amount: Math.round(item.priceUSD * 100), 
      },
      quantity: item.quantity,
    }));

    // 2. We need to tell Stripe where to send the user after payment
    // It defaults to localhost for testing, but uses your live URL in production
    const origin = req.headers.get("origin") || "http://localhost:3000";

    // 3. Create the secure Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      // Redirects based on payment success/failure
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}&order_id=${orderId}`,
      cancel_url: `${origin}/checkout?canceled=true`,
      metadata: {
        orderId: orderId, // We attach your Sanity Order ID secretly in the background!
      },
    });

    // 4. Return the secure session URL to the frontend
    return NextResponse.json({ url: session.url });

  } catch (error: any) {
    console.error("Stripe Checkout Error:", error);
    return NextResponse.json(
      { error: "Failed to create Stripe session.", details: error.message },
      { status: 500 }
    );
  }
}