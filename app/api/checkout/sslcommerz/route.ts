import { NextResponse } from "next/server";
// We use require() here because sslcommerz-lts lacks TypeScript definitions
const SSLCommerzPayment = require("sslcommerz-lts");

const store_id = process.env.SSLCOMMERZ_STORE_ID as string;
const store_passwd = process.env.SSLCOMMERZ_STORE_PASSWORD as string;
// SSLCommerz uses is_live = false for the Sandbox
const is_live = process.env.SSLCOMMERZ_IS_SANDBOX !== "true"; 

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { orderId, customerData, totalBDT } = body;

    // Detect if we are on localhost or live on Vercel
    const origin = req.headers.get("origin") || "http://localhost:3000";

    const data = {
      total_amount: totalBDT,
      currency: 'BDT',
      tran_id: orderId, // Using your Sanity Order ID as the unique transaction ID!
      
      // CRITICAL: Pointing the bank back to our Middleman API instead of the frontend
      success_url: `${origin}/api/checkout/sslcommerz/success`, 
      fail_url: `${origin}/api/checkout/sslcommerz/success`, 
      cancel_url: `${origin}/api/checkout/sslcommerz/success`,
      
      ipn_url: `${origin}/api/checkout/sslcommerz/ipn`, // Optional server-to-server ping
      shipping_method: 'Courier',
      product_name: "Hope's Craft Goods",
      product_category: 'Handicraft',
      product_profile: 'general',
      cus_name: customerData.name || 'Customer Name',
      cus_email: customerData.email || 'customer@example.com',
      cus_add1: customerData.address || 'Dhaka',
      cus_add2: 'Dhaka',
      cus_city: 'Dhaka',
      cus_state: 'Dhaka',
      cus_postcode: '1000',
      cus_country: 'Bangladesh',
      cus_phone: customerData.phone || '01711111111',
      cus_fax: '01711111111',
      ship_name: customerData.name || 'Customer Name',
      ship_add1: customerData.address || 'Dhaka',
      ship_add2: 'Dhaka',
      ship_city: 'Dhaka',
      ship_state: 'Dhaka',
      ship_postcode: 1000,
      ship_country: 'Bangladesh',
    };

    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
    
    // FIX: Explicitly type the Promise as returning a NextResponse
    return new Promise<NextResponse>((resolve) => {
        sslcz.init(data).then((apiResponse: any) => {
            let GatewayPageURL = apiResponse.GatewayPageURL;
            if (GatewayPageURL) {
                 resolve(NextResponse.json({ url: GatewayPageURL }));
            } else {
                 resolve(NextResponse.json({ error: "Failed to generate SSL gateway url" }, { status: 400 }));
            }
        }).catch((err: any) => {
             resolve(NextResponse.json({ error: err.message }, { status: 500 }));
        });
    });

  } catch (error: any) {
    console.error("SSLCommerz Error:", error);
    return NextResponse.json(
      { error: "Failed to initialize SSLCommerz.", details: error.message },
      { status: 500 }
    );
  }
}