import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { 
      title, 
      name, 
      mobile, 
      email, 
      city, 
      state, 
      requirement, 
      solution, 
      message 
    } = body;

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false, 
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: process.env.SMTP_FROM,
      to: process.env.SMTP_TO,
      replyTo: email,
      subject: `New Inquiry from ${name}`,
      html: `
        <h2>New Inquiry</h2>

        <p><strong>Title:</strong> ${title}</p>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Mobile:</strong> ${mobile}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>City:</strong> ${city}</p>
        <p><strong>State:</strong> ${state}</p>

        <p><strong>Requirement (Service):</strong> ${requirement || "N/A"}</p>
        <p><strong>Solution:</strong> ${solution || "N/A"}</p>

        <p><strong>Message:</strong> ${message || "N/A"}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, msg: "Email sent successfully" });

  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { success: false, msg: "Error sending email" },
      { status: 500 }
    );
  }
}
