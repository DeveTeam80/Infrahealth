import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    // 1. Extract fields sent from the new Frontend
    const companyName = formData.get("companyName") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const city = formData.get("city") as string;
    const state = formData.get("state") as string;
    const turnover = formData.get("turnover") as string;
    const describeYou = formData.get("describeYou") as string;

    // 2. Map the actual file names used in your Frontend
    const fileKeys = [
      "companyProfile",
      "turnoverCertificate",
      "isoCertificate",
    ];
    const attachments = [];

    for (const key of fileKeys) {
      const file = formData.get(key) as File | null;

      // Only process if the file exists and has content
      if (file && file.size > 0) {
        const buffer = Buffer.from(await file.arrayBuffer());
        attachments.push({
          filename: file.name,
          content: buffer,
        });
      }
    }

    // 3. Configure Nodemailer
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: Number(process.env.SMTP_PORT) === 465, // true for 465, false for 587
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const applicationId = `IH-VEN-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    // 4. Prepare Email Content
    const mailOptions = {
      from: process.env.SMTP_FROM,
      to: process.env.SMTP_TO,
      replyTo: email,
      subject: `New Vendor Application: ${companyName}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; border: 1px solid #eee; padding: 20px;">
          <h2 style="color: #007bff;">New Vendor Partnership Application</h2>
          <p style="font-size: 1.1em;"><strong>Application ID:</strong> ${applicationId}</p>
          <hr />
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Company:</strong></td><td>${companyName}</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Email:</strong></td><td>${email}</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Phone:</strong></td><td>${phone}</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Location:</strong></td><td>${city}, ${state}</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Turnover:</strong></td><td>${turnover} Cr</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Category:</strong></td><td>${describeYou}</td></tr>
          </table>
          <p style="margin-top: 20px; font-size: 0.9em; color: #666;">
            Note: The requested documents (Profile, Turnover Cert, ISO Cert) are attached to this email.
          </p>
        </div>
      `,
      attachments: attachments,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({
      success: true,
      applicationId,
      message: `✅ Application submitted! ID: ${applicationId}`,
    });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "❌ Failed to process application. Check server logs.",
      },
      { status: 500 },
    );
  }
}
