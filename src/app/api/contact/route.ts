import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message, number, countryCode } =
      await request.json();

    // Validate the input
    if (!name || !email || !subject || !message || !number || !countryCode) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 },
      );
    }

    // Create a transporter using Gmail
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // Your Gmail address
        pass: process.env.EMAIL_PASSWORD, // Your Gmail App Password
      },
    });

    // Email content to send to pixelcrew.in@gmail.com
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "pixelcrew.in@gmail.com",
      subject: `New Contact Form Submission: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px;">
          <h2 style="color: #333; border-bottom: 2px solid #c1ff72; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="margin: 20px 0;">
            <p style="margin: 10px 0;"><strong>Name:</strong> ${name}</p>
            <p style="margin: 10px 0;"><strong>Email:</strong> ${email}</p>
            <p style="margin: 10px 0;"><strong>Phone Number:</strong> ${countryCode} ${number}</p>
            <p style="margin: 10px 0;"><strong>Subject:</strong> ${subject}</p>
          </div>
          
          <div style="margin: 20px 0;">
            <h3 style="color: #333;">Message:</h3>
            <p style="background: #f5f5f5; padding: 15px; border-radius: 5px; line-height: 1.6;">
              ${message}
            </p>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
            <p style="color: #666; font-size: 12px;">
              This email was sent from the PixelCrew contact form.
            </p>
          </div>
        </div>
      `,
      replyTo: email, // Allow easy reply to the sender
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      {
        success: true,
        message:
          "Your message has been sent successfully! We will get back to you soon.",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      {
        error: "Failed to send email. Please try again later.",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
