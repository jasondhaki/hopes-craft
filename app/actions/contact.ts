"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContactEmail(formData: FormData) {
  // Extracting the exact fields from your custom form
  const name = formData.get("name");
  const email = formData.get("email");
  const subject = formData.get("subject");
  const message = formData.get("message");

  try {
    await resend.emails.send({
      from: "Hope's Craft <onboarding@resend.dev>", // Resend's testing email
      to: "jasondhaki05@gmail.com", // REPLACE THIS with your actual admin email!
      subject: `New Contact Request: ${subject}`,
      text: `
        You have a new message from the Hope's Craft contact form:
        
        Name: ${name}
        Email: ${email}
        Subject: ${subject}
        
        Message:
        ${message}
      `,
    });

    return { success: true };
  } catch (error) {
    console.error("Email failed to send:", error);
    return { success: false, error: "Failed to send email." };
  }
}