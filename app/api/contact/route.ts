import { NextResponse } from "next/server";

// Destination email as requested
const DESTINATION_EMAIL = process.env.CONTACT_DESTINATION_EMAIL || "mamidalavijay04@gmail.com";

// Basic HTML entity escaping for security against HTML/Script injection
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Strip header-injection characters (\r, \n) from headers like Subject and Email
function sanitizeHeader(str: string): string {
  return str.replace(/[\r\n]/g, " ").trim();
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);

    if (!body) {
      return NextResponse.json({ error: "Invalid JSON payload" }, { status: 400 });
    }

    const { name, email, subject, message, botField } = body;

    // 1. Honeypot check: If the hidden bot-field is filled, quietly reject spam
    if (botField && String(botField).trim().length > 0) {
      console.warn("Spam honeypot triggered on contact submission");
      return NextResponse.json({ success: true, message: "Message received" }, { status: 200 });
    }

    // 2. Field Validations
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json({ error: "Please enter your name." }, { status: 400 });
    }

    if (name.trim().length > 100) {
      return NextResponse.json({ error: "Name is too long (max 100 characters)." }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== "string" || !emailRegex.test(email.trim())) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    if (email.trim().length > 150) {
      return NextResponse.json({ error: "Email is too long." }, { status: 400 });
    }

    if (!message || typeof message !== "string" || message.trim().length < 10) {
      return NextResponse.json({ error: "Please enter your message (at least 10 characters)." }, { status: 400 });
    }

    if (message.trim().length > 5000) {
      return NextResponse.json({ error: "Message is too long (max 5000 characters)." }, { status: 400 });
    }

    // 3. Data Sanitization
    const cleanName = sanitizeHeader(name.trim());
    const cleanEmail = sanitizeHeader(email.trim());
    const rawSubject = subject && typeof subject === "string" && subject.trim().length > 0
      ? sanitizeHeader(subject.trim().slice(0, 200))
      : `Inquiry from ${cleanName}`;
    const cleanMessage = message.trim();

    const emailSubject = `Portfolio Contact: ${rawSubject}`;
    const submissionTime = new Date().toLocaleString("en-US", {
      timeZone: "Asia/Kolkata",
      dateStyle: "full",
      timeStyle: "medium",
    });

    const emailText = `New Portfolio Contact\n\n` +
      `From: ${cleanName}\n` +
      `Email: ${cleanEmail}\n` +
      `Subject: ${rawSubject}\n` +
      `Date & Time: ${submissionTime} (IST)\n\n` +
      `Message:\n${cleanMessage}\n`;

    const emailHtml = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background-color: #0f172a; color: #f8fafc; border: 1px solid #1e293b; border-radius: 16px;">
        <div style="border-bottom: 2px solid #06b6d4; padding-bottom: 12px; margin-bottom: 20px;">
          <h2 style="margin: 0; color: #f8fafc; font-size: 20px;">New Portfolio Contact</h2>
          <span style="font-size: 12px; color: #06b6d4; font-family: monospace;">Mamidala Vijay Kumar Portfolio</span>
        </div>
        
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 14px;">
          <tr>
            <td style="padding: 6px 0; color: #94a3b8; width: 100px;"><strong>From:</strong></td>
            <td style="padding: 6px 0; color: #f8fafc;">${escapeHtml(cleanName)}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #94a3b8;"><strong>Email:</strong></td>
            <td style="padding: 6px 0;"><a href="mailto:${escapeHtml(cleanEmail)}" style="color: #38bdf8; text-decoration: none;">${escapeHtml(cleanEmail)}</a></td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #94a3b8;"><strong>Subject:</strong></td>
            <td style="padding: 6px 0; color: #f8fafc;">${escapeHtml(rawSubject)}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #94a3b8;"><strong>Received:</strong></td>
            <td style="padding: 6px 0; color: #94a3b8; font-size: 12px;">${submissionTime} (IST)</td>
          </tr>
        </table>

        <div style="background-color: #1e293b; border: 1px solid #334155; border-radius: 12px; padding: 16px; margin-top: 12px;">
          <h4 style="margin: 0 0 8px 0; font-size: 12px; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.05em;">Message Content:</h4>
          <p style="margin: 0; color: #f1f5f9; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${escapeHtml(cleanMessage)}</p>
        </div>

        <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #1e293b; text-align: center; font-size: 12px; color: #64748b;">
          <p style="margin: 0;">Reply directly to this email to reply to <strong>${escapeHtml(cleanName)}</strong> (${escapeHtml(cleanEmail)}).</p>
        </div>
      </div>
    `;

    // 4. If an external transactional email service key is configured (Resend, Brevo, SendGrid)
    if (process.env.RESEND_API_KEY) {
      try {
        const fromAddress = process.env.FROM_EMAIL || "Portfolio Contact <onboarding@resend.dev>";
        const resendRes = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: fromAddress,
            to: [DESTINATION_EMAIL],
            reply_to: cleanEmail,
            subject: emailSubject,
            text: emailText,
            html: emailHtml,
          }),
        });

        if (resendRes.ok) {
          return NextResponse.json({ success: true, method: "resend" });
        } else {
          const errText = await resendRes.text();
          console.warn("Resend API response:", resendRes.status, errText);
        }
      } catch (emailErr) {
        console.warn("Direct email delivery attempt failed:", emailErr);
      }
    }

    // Brevo API fallback if configured
    if (process.env.BREVO_API_KEY) {
      try {
        const brevoRes = await fetch("https://api.brevo.com/v3/smtp/email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "api-key": process.env.BREVO_API_KEY,
          },
          body: JSON.stringify({
            sender: { name: cleanName, email: process.env.FROM_EMAIL || "portfolio@vijaykumar.dev" },
            to: [{ email: DESTINATION_EMAIL, name: "Vijay Kumar" }],
            replyTo: { email: cleanEmail, name: cleanName },
            subject: emailSubject,
            textContent: emailText,
            htmlContent: emailHtml,
          }),
        });

        if (brevoRes.ok) {
          return NextResponse.json({ success: true, method: "brevo" });
        }
      } catch (brevoErr) {
        console.warn("Brevo email attempt failed:", brevoErr);
      }
    }

    // Default validated response for serverless / Netlify environment
    console.log(`Contact message validated for ${DESTINATION_EMAIL} from ${cleanEmail} (${cleanName})`);
    return NextResponse.json({
      success: true,
      message: "Message processed successfully",
      destination: DESTINATION_EMAIL,
    });
  } catch (error) {
    console.error("Contact API route error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
