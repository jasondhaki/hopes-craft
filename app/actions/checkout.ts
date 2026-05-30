"use server";

import { createClient } from "next-sanity";

// We create a special WRITE client here. 
// It uses a secret token that NEVER gets exposed to the frontend.
const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2023-05-03",
  useCdn: false, // Must be false for writing data
  token: process.env.SANITY_API_TOKEN, // WE WILL GENERATE THIS NEXT
});

export async function createOrder(orderData: any) {
  try {
    const newOrder = await writeClient.create({
      _type: "order",
      orderNumber: `ORD-${Math.floor(Date.now() / 1000)}`, // Simple unique ID
      customerName: orderData.name,
      email: orderData.email,
      phone: orderData.phone,
      address: orderData.address,
      totalPrice: orderData.total,
      currency: orderData.currency,
      status: "pending",
      createdAt: new Date().toISOString(),
      
      // Mapping the frontend cart items to Sanity references
      items: orderData.items.map((item: any) => ({
        _key: Math.random().toString(36).substring(7), // Sanity arrays need unique keys
        product: {
          _type: "reference",
          _ref: item._id, // This links the order to the actual product in your database
        },
        quantity: item.quantity,
        price: orderData.currency === "USD" ? item.priceUSD : item.priceBDT,
      })),
    });

    return { success: true, orderId: newOrder.orderNumber };
  } catch (error) {
    console.error("Failed to create order in Sanity:", error);
    return { success: false, error: "Failed to process order." };
  }
}