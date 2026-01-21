import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    // Extract form fields
    const companyName = formData.get("companyName") as string;
    const address = formData.get("address") as string;
    const city = formData.get("city") as string;
    const state = formData.get("state") as string;
    const country = formData.get("country") as string;
    const website = formData.get("website") as string;
    const established = formData.get("established") as string;
    const entityType = formData.get("entityType") as string;
    const cin = formData.get("cin") as string;

    const contactName = formData.get("contactName") as string;
    const contactDesignation = formData.get("contactDesignation") as string;
    const contactEmail = formData.get("contactEmail") as string;
    const contactMobile = formData.get("contactMobile") as string;
    const alternateContact = formData.get("alternateContact") as string;

    const categories = formData.getAll("categories") as string[];
    const offerings = formData.get("offerings") as string;
    const certifications = formData.get("certifications") as string;
    const locations = formData.get("locations") as string;
    const capacity = formData.get("capacity") as string;

    const yearsHealthcare = formData.get("yearsHealthcare") as string;
    const clients = formData.get("clients") as string;
    const projects = formData.get("projects") as string;
    const geography = formData.get("geography") as string;

    const leadtime = formData.get("leadtime") as string;
    const gst = formData.get("gst") as string;
    const bank = formData.get("bank") as string;

    // Handle file attachments
    const files = {
      profile: formData.get("profile") as File,
      catalogue: formData.get("catalogue") as File,
      certs: formData.get("certs") as File,
      refs: formData.get("refs") as File,
    };

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false, // true if port = 465
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Prepare attachments
    const attachments = [];
    for (const [key, file] of Object.entries(files)) {
      if (file && file.size > 0) {
        const buffer = Buffer.from(await file.arrayBuffer());
        attachments.push({
          filename: file.name,
          content: buffer,
        });
      }
    }

    function generateApplicationId() {
      const year = new Date().getFullYear();
      const random = Math.floor(100000 + Math.random() * 900000);
      return `IH-VENDOR-${year}-${random}`;
    }

    const applicationId = generateApplicationId();

    const mailOptions = {
      from: process.env.SMTP_FROM,
      to: process.env.SMTP_TO,
      replyTo: contactEmail,
      subject: `New Vendor Partnership Application from ${companyName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
            New Vendor Partnership Application
          </h2>
          
<h3 style="color:#28a745; margin-top:10px;">
  Application ID: ${applicationId}
</h3>

          <h3 style="color: #007bff; margin-top: 30px;">Company Information</h3>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Company Name:</td><td style="padding: 8px; border: 1px solid #ddd;">${companyName}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Address:</td><td style="padding: 8px; border: 1px solid #ddd;">${address}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">City, State, Country:</td><td style="padding: 8px; border: 1px solid #ddd;">${city}, ${state}, ${country}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Website:</td><td style="padding: 8px; border: 1px solid #ddd;">${website || "N/A"}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Established:</td><td style="padding: 8px; border: 1px solid #ddd;">${established}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Entity Type:</td><td style="padding: 8px; border: 1px solid #ddd;">${entityType}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">CIN/Registration:</td><td style="padding: 8px; border: 1px solid #ddd;">${cin}</td></tr>
          </table>

          <h3 style="color: #007bff; margin-top: 30px;">Primary Contact Details</h3>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Name:</td><td style="padding: 8px; border: 1px solid #ddd;">${contactName}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Designation:</td><td style="padding: 8px; border: 1px solid #ddd;">${contactDesignation}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Email:</td><td style="padding: 8px; border: 1px solid #ddd;">${contactEmail}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Mobile:</td><td style="padding: 8px; border: 1px solid #ddd;">${contactMobile}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Alternate Contact:</td><td style="padding: 8px; border: 1px solid #ddd;">${alternateContact || "N/A"}</td></tr>
          </table>

          <h3 style="color: #007bff; margin-top: 30px;">Product/Service Details</h3>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Categories:</td><td style="padding: 8px; border: 1px solid #ddd;">${categories.join(", ") || "N/A"}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Offerings:</td><td style="padding: 8px; border: 1px solid #ddd;">${offerings}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Certifications:</td><td style="padding: 8px; border: 1px solid #ddd;">${certifications || "N/A"}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Manufacturing Locations:</td><td style="padding: 8px; border: 1px solid #ddd;">${locations || "N/A"}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Monthly Capacity:</td><td style="padding: 8px; border: 1px solid #ddd;">${capacity || "N/A"}</td></tr>
          </table>

          <h3 style="color: #007bff; margin-top: 30px;">Experience & Clients</h3>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Years in Healthcare:</td><td style="padding: 8px; border: 1px solid #ddd;">${yearsHealthcare || "N/A"}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Major Clients:</td><td style="padding: 8px; border: 1px solid #ddd;">${clients || "N/A"}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Recent Projects:</td><td style="padding: 8px; border: 1px solid #ddd;">${projects || "N/A"}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Geographic Areas:</td><td style="padding: 8px; border: 1px solid #ddd;">${geography || "N/A"}</td></tr>
          </table>

          <h3 style="color: #007bff; margin-top: 30px;">Commercial & Operational Details</h3>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Average Lead Time:</td><td style="padding: 8px; border: 1px solid #ddd;">${leadtime || "N/A"}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">GST Number:</td><td style="padding: 8px; border: 1px solid #ddd;">${gst || "N/A"}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Bank Details:</td><td style="padding: 8px; border: 1px solid #ddd;">${bank || "N/A"}</td></tr>
          </table>


          <p style="margin-top: 30px; padding: 15px; background-color: #f8f9fa; border-left: 4px solid #007bff;">
            <strong>Note:</strong> This vendor has agreed to all terms & policies and confirmed the accuracy of provided information.
          </p>
        </div>
      `,
      attachments: attachments,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({
      success: true,
      applicationId,
      message: `✅ Application submitted successfully! Your Application ID is ${applicationId}`,
    });
  } catch (error) {
    console.error("Error processing vendor application:", error);
    return NextResponse.json(
      {
        success: false,
        message: "❌ Error processing application. Please try again.",
      },
      { status: 500 },
    );
  }
}
