"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendWholesaleEmail(formData: FormData) {
  // Extracting the exact fields from your custom wholesale form
  const firstName = formData.get("firstName");
  const lastName = formData.get("lastName");
  const email = formData.get("email");
  const company = formData.get("company");
  const port = formData.get("port");
  const volume = formData.get("volume");
  const details = formData.get("details");

  try {
    await resend.emails.send({
      from: "Hope's Craft <onboarding@resend.dev>", 
      to: "jasondhaki05@gmail.com", // REPLACE THIS with your actual admin email!
      subject: `New Wholesale Inquiry: ${company}`,
      text: `
        You have a new B2B Wholesale inquiry from the Hope's Craft portal:
        
        Name: ${firstName} ${lastName}
        Company: ${company}
        Email: ${email}
        Target Shipping Port: ${port}
        Expected Volume: ${volume}
        
        Project Details:
        ${details}
      `,
    });

    return { success: true };
  } catch (error) {
    console.error("Wholesale email failed to send:", error);
    return { success: false, error: "Failed to send wholesale inquiry." };
  }
}