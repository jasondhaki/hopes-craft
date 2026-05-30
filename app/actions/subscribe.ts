"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function subscribeToNewsletter(formData: FormData) {
  const email = formData.get("email");

  if (!email) return { success: false, error: "Email is required" };

  try {
    await resend.emails.send({
      from: "Hope's Craft <onboarding@resend.dev>",
      to: "jasondhaki05@gmail.com", // REPLACE WITH YOUR RESEND EMAIL!
      subject: `New Newsletter Subscriber: ${email}`,
      text: `You have a new subscriber to the Hope's Craft newsletter!\n\nEmail: ${email}`,
    });

    return { success: true };
  } catch (error) {
    console.error("Subscription failed:", error);
    return { success: false, error: "Failed to subscribe." };
  }
}