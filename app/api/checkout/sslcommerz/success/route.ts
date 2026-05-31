import { NextResponse } from "next/server";
import { client } from "../../../../../lib/sanity"; // Verify this path matches your Sanity client location!

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    
    // SSLCommerz sends back all these details securely
    const tran_id = formData.get("tran_id") as string; // This is your Sanity Order ID!
    const val_id = formData.get("val_id") as string; // The official Bank Transaction ID
    const status = formData.get("status") as string;

    // Get the base URL for the redirect (Fallback to localhost for dev)
    const origin = req.headers.get("origin") || process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    if (status === "VALID" || status === "VALIDATED") {
      
      // 1. Update the order in Sanity to show it was PAID
      if (tran_id) {
        await client
          .patch(tran_id)
          .set({ 
            paymentStatus: "Paid", 
            transactionId: val_id 
          })
          .commit();
      }

      // 2. Safely redirect the user to the visual success screen (Converting POST to GET)
      return NextResponse.redirect(`${origin}/checkout/success?order_id=${tran_id}`, 303);
      
    } else {
      // If payment failed or they backed out, send them back to checkout
      return NextResponse.redirect(`${origin}/checkout?canceled=true`, 303);
    }

  } catch (error) {
    console.error("SSLCommerz Success Webhook Error:", error);
    // Hard fallback in case of catastrophic failure
    return NextResponse.redirect(`http://localhost:3000/checkout?error=true`, 303);
  }
}