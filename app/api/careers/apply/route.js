import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import { buildCareersEmail, getCareersMailConfig } from "../../../../lib/careers-mail";

export async function POST(request) {
  try {
    const formData = await request.formData();
    const emailPayload = await buildCareersEmail({
      fields: {
        name: formData.get("name")?.toString(),
        email: formData.get("email")?.toString(),
        phone: formData.get("phone")?.toString(),
        position: formData.get("position")?.toString(),
        message: formData.get("message")?.toString(),
      },
      resume: formData.get("resume"),
    });

    if (!emailPayload.ok) {
      return NextResponse.json({ error: emailPayload.error }, { status: 400 });
    }

    const mailConfig = getCareersMailConfig();
    if (!mailConfig.ok) {
      return NextResponse.json({ error: mailConfig.error }, { status: 500 });
    }

    const transporter = nodemailer.createTransport(mailConfig.transport);
    await transporter.sendMail({
      ...emailPayload.mail,
      to: mailConfig.careersTo,
      from: mailConfig.mailFrom,
    });

    return NextResponse.json(
      { message: "Application submitted successfully." },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/careers/apply error:", error);
    return NextResponse.json(
      { error: "Failed to submit application. Please email Careers@intelliactind.com directly." },
      { status: 500 }
    );
  }
}
