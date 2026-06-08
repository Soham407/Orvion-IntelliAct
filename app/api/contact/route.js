import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, company, email, phone, inquiryType, message } = body;

    // Validate required fields
    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required fields." },
        { status: 400 }
      );
    }

    const host = process.env.SMTP_HOST?.trim();
    const portValue = process.env.SMTP_PORT?.trim();
    const user = process.env.SMTP_USER?.trim();
    const pass = process.env.SMTP_PASSWORD?.trim();
    const mailFrom = process.env.MAIL_FROM?.trim();
    const contactTo = process.env.CONTACT_TO_EMAIL?.trim() || "info@intelliactind.com";

    const isSmtpConfigured = host && portValue && user && pass && mailFrom;

    const emailSubject = `Website Inquiry - ${inquiryType || "General inquiry"}`;
    const emailText = [
      `Name: ${name}`,
      `Company: ${company || "Not provided"}`,
      `Email: ${email}`,
      `Phone: ${phone || "Not provided"}`,
      `Inquiry Type: ${inquiryType || "General inquiry"}`,
      "",
      "Message/Project Scope:",
      message || "No project scope provided.",
    ].join("\n");

    if (!isSmtpConfigured) {
      console.warn("SMTP settings are missing. Gracefully falling back. Message received:", {
        name,
        company,
        email,
        phone,
        inquiryType,
        message,
      });
      return NextResponse.json(
        { message: "Message received successfully (graceful fallback)." },
        { status: 201 }
      );
    }

    const port = Number.parseInt(portValue, 10);
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });

    await transporter.sendMail({
      from: mailFrom,
      to: contactTo,
      replyTo: email,
      subject: emailSubject,
      text: emailText,
    });

    return NextResponse.json(
      { message: "Message sent successfully." },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/contact error:", error);
    return NextResponse.json(
      { error: "An error occurred while processing your request. Please email info@intelliactind.com directly." },
      { status: 500 }
    );
  }
}
