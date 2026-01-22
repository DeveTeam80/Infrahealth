import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    // 1. Switch to formData() to receive the files and text fields
    const data = await req.formData();

    // 2. Extract fields exactly as named in your frontend state
    const name = data.get("name") as string;
    const mobile = data.get("mobile") as string;
    const email = data.get("email") as string;
    const city = data.get("city") as string;
    const area = data.get("area") as string;
    const state = data.get("state") as string;
    const message = data.get("message") as string;
    const propertyType = data.get("propertyType") as string;
    const adType = data.get("adType") as string;

    // 3. Process Files (convert to Buffers for Nodemailer)
    const fileEntries = data.getAll("files") as File[];
    const attachments = await Promise.all(
      fileEntries.map(async (file) => {
        const buffer = Buffer.from(await file.arrayBuffer());
        return {
          filename: file.name,
          content: buffer,
        };
      }),
    );

    // 4. Transport Configuration (kept your logic)
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // 5. Email Options
    const mailOptions = {
      from: process.env.SMTP_FROM,
      to: process.env.TALKTOUS_SMTP_TO,
      replyTo: email,
      subject: `New Property Listing from ${name}`,
      attachments: attachments, // Adds the uploaded files as email attachments
      html: `
        <div style="font-family: sans-serif; line-height: 1.5;">
          <h2 style="color: #b6520f;">New Property Listing Received</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Name:</strong></td><td>${name}</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Mobile:</strong></td><td>${mobile}</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Email:</strong></td><td>${email}</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Property Type:</strong></td><td>${propertyType}</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Ad Type:</strong></td><td>${adType}</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Location:</strong></td><td>${area}, ${city}, ${state}</td></tr>
          </table>
          
          <div style="margin-top: 20px; padding: 15px; background: #f9f9f9; border-radius: 5px;">
            <strong>Message:</strong><br/>
            ${message || "No additional message provided."}
          </div>
          
          <p style="margin-top: 20px; font-size: 0.8rem; color: #666;">
            This enquiry includes ${fileEntries.length} attached document(s)/photo(s).
          </p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({
      success: true,
      msg: " email sent successfully",
    });
  } catch (error) {
    console.error("Error processing property listing:", error);
    return NextResponse.json(
      { success: false, msg: "Failed to send property details" },
      { status: 500 },
    );
  }
}
