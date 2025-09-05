import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    
    // Extract form fields
    const fullname = formData.get("fullname") as string;
    const dob = formData.get("dob") as string;
    const gender = formData.get("gender") as string;
    const contact = formData.get("contact") as string;
    const email = formData.get("email") as string;
    const address = formData.get("address") as string;
    const role = formData.get("role") as string;
    const location = formData.get("location") as string;
    const joining = formData.get("joining") as string;
    const qualification = formData.get("qualification") as string;
    const institution = formData.get("institution") as string;
    const year = formData.get("year") as string;
    const employer = formData.get("employer") as string;
    const designation = formData.get("designation") as string;
    const experience = formData.get("experience") as string;
    const responsibilities = formData.get("responsibilities") as string;
    const techskills = formData.get("techskills") as string;
    const softskills = formData.get("softskills") as string;
    const certifications = formData.get("certifications") as string;
    const motivation = formData.get("motivation") as string;
    const linkedin = formData.get("linkedin") as string;
    const resume = formData.get("resume") as File;

    // Validate required fields
    if (!fullname || !email || !contact || !role) {
      return NextResponse.json(
        { success: false, msg: "❌ Missing required fields" },
        { status: 400 }
      );
    }

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
    if (resume && resume.size > 0) {
      const resumeBuffer = Buffer.from(await resume.arrayBuffer());
      attachments.push({
        filename: resume.name,
        content: resumeBuffer,
        contentType: resume.type,
      });
    }

    const mailOptions = {
      from: process.env.SMTP_FROM,
      to: process.env.SMTP_TO,
      replyTo: email,
      subject: `New Job Application - ${role} - ${fullname}`,
      attachments,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
            New Job Application
          </h2>
          
          <h3 style="color: #007bff; margin-top: 30px;">Personal Information</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px; font-weight: bold; width: 200px;">Full Name:</td><td style="padding: 8px;">${fullname}</td></tr>
            <tr style="background-color: #f8f9fa;"><td style="padding: 8px; font-weight: bold;">Date of Birth:</td><td style="padding: 8px;">${dob}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">Gender:</td><td style="padding: 8px;">${gender}</td></tr>
            <tr style="background-color: #f8f9fa;"><td style="padding: 8px; font-weight: bold;">Contact Number:</td><td style="padding: 8px;">${contact}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">Email:</td><td style="padding: 8px;">${email}</td></tr>
            <tr style="background-color: #f8f9fa;"><td style="padding: 8px; font-weight: bold;">Address:</td><td style="padding: 8px;">${address}</td></tr>
          </table>

          <h3 style="color: #007bff; margin-top: 30px;">Position Applied For</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px; font-weight: bold; width: 200px;">Role:</td><td style="padding: 8px;">${role}</td></tr>
            <tr style="background-color: #f8f9fa;"><td style="padding: 8px; font-weight: bold;">Preferred Location:</td><td style="padding: 8px;">${location || "N/A"}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">Expected Joining:</td><td style="padding: 8px;">${joining}</td></tr>
          </table>

          <h3 style="color: #007bff; margin-top: 30px;">Educational Background</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px; font-weight: bold; width: 200px;">Qualification:</td><td style="padding: 8px;">${qualification}</td></tr>
            <tr style="background-color: #f8f9fa;"><td style="padding: 8px; font-weight: bold;">Institution:</td><td style="padding: 8px;">${institution}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">Year of Completion:</td><td style="padding: 8px;">${year}</td></tr>
          </table>

          <h3 style="color: #007bff; margin-top: 30px;">Professional Experience</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px; font-weight: bold; width: 200px;">Current/Last Employer:</td><td style="padding: 8px;">${employer || "N/A"}</td></tr>
            <tr style="background-color: #f8f9fa;"><td style="padding: 8px; font-weight: bold;">Designation:</td><td style="padding: 8px;">${designation || "N/A"}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">Years of Experience:</td><td style="padding: 8px;">${experience || "N/A"}</td></tr>
            <tr style="background-color: #f8f9fa;"><td style="padding: 8px; font-weight: bold;">Key Responsibilities:</td><td style="padding: 8px;">${responsibilities || "N/A"}</td></tr>
          </table>

          <h3 style="color: #007bff; margin-top: 30px;">Skills & Competencies</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px; font-weight: bold; width: 200px;">Technical Skills:</td><td style="padding: 8px;">${techskills || "N/A"}</td></tr>
            <tr style="background-color: #f8f9fa;"><td style="padding: 8px; font-weight: bold;">Soft Skills:</td><td style="padding: 8px;">${softskills || "N/A"}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">Certifications:</td><td style="padding: 8px;">${certifications || "N/A"}</td></tr>
          </table>

          ${motivation ? `
            <h3 style="color: #007bff; margin-top: 30px;">Motivation</h3>
            <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px;">
              <p style="margin: 0; line-height: 1.6;">${motivation}</p>
            </div>
          ` : ""}

          ${linkedin ? `
            <h3 style="color: #007bff; margin-top: 30px;">LinkedIn Profile</h3>
            <p><a href="${linkedin}" target="_blank">${linkedin}</a></p>
          ` : ""}

          <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;">
          <p style="color: #666; font-size: 14px;">
            <strong>Resume:</strong> ${resume ? `Attached (${resume.name})` : "Not provided"}
          </p>
          <p style="color: #666; font-size: 12px;">
            This application was submitted on ${new Date().toLocaleString()}
          </p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ 
      success: true, 
      msg: "✅ Application submitted successfully! We will get back to you soon." 
    });
    
  } catch (error) {
    console.error("Error sending application email:", error);
    return NextResponse.json({ 
      success: false, 
      msg: "❌ Error submitting application. Please try again." 
    }, { status: 500 });
  }
}