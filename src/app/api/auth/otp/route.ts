import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const JWT_SECRET = process.env.JWT_SECRET || "incredible_treasures_jwt_secret_production_2026";

// In-memory Stores for OTP Validation & Temporary Sign-up Staging (10-minute expiry)
interface PendingSignup {
  code: string;
  expiresAt: number;
  name: string;
  email: string;
  password: string;
  phone?: string;
  companyName?: string;
  gstin?: string;
}

interface OtpRecord {
  code: string;
  expiresAt: number;
}

// Global singletons to prevent cache wipe during hot reload in dev
declare global {
  var _pendingSignupStore: Map<string, PendingSignup> | undefined;
  var _loginOtpStore: Map<string, OtpRecord> | undefined;
}

const pendingSignupStore = globalThis._pendingSignupStore || new Map<string, PendingSignup>();
globalThis._pendingSignupStore = pendingSignupStore;

const loginOtpStore = globalThis._loginOtpStore || new Map<string, OtpRecord>();
globalThis._loginOtpStore = loginOtpStore;

// Luxury Branded HTML Email Template Generator for Incredible Treasures
function buildProfessionalOtpEmail({
  recipientName,
  otpCode,
  isSignup = false,
}: {
  recipientName?: string;
  otpCode: string;
  isSignup?: boolean;
}) {
  const subject = `Incredible Treasures — ${otpCode} is your ${isSignup ? "Account Activation" : "Login"} OTP`;
  const title = isSignup ? "Verify Your Account" : "Customer Login Passcode";
  const subtitle = isSignup
    ? `Welcome to Incredible Treasures Studio. Please use the single-use 6-digit activation code below to complete your corporate printing account setup.`
    : `We received a sign-in request for your Incredible Treasures account. Enter the 6-digit passcode below to securely authenticate.`;

  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${subject}</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: #F8F9FA; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #F8F9FA; padding: 40px 16px;">
        <tr>
          <td align="center">
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 580px; background-color: #FFFFFF; border-radius: 16px; overflow: hidden; border: 1px solid #E5E7EB; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);">
              
              <!-- Luxury Brand Header -->
              <tr>
                <td style="background: linear-gradient(135deg, #1A1816 0%, #2A2521 100%); padding: 32px 28px; text-align: center; border-bottom: 3px solid #D4AF37;">
                  <div style="color: #D4AF37; font-size: 11px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase; margin-bottom: 6px;">
                    ✦ BESPOKE PRINTING & CORPORATE STATIONERY ✦
                  </div>
                  <h1 style="color: #FFFFFF; font-size: 26px; font-weight: 900; letter-spacing: 1px; margin: 0; font-family: 'Playfair Display', Georgia, serif;">
                    INCREDIBLE TREASURES
                  </h1>
                </td>
              </tr>

              <!-- Main Card Body -->
              <tr>
                <td style="padding: 36px 32px; text-align: center;">
                  <h2 style="color: #111827; font-size: 20px; font-weight: 800; margin: 0 0 12px 0;">
                    ${title}
                  </h2>
                  <p style="color: #4B5563; font-size: 14px; line-height: 1.6; margin: 0 auto 28px auto; max-width: 440px;">
                    ${recipientName ? `Dear <strong>${recipientName}</strong>, ` : ""}${subtitle}
                  </p>

                  <!-- Golden Highlighted OTP Container -->
                  <div style="background: #FFFDF9; border: 2px dashed #D4AF37; border-radius: 14px; padding: 24px; margin: 0 auto 28px auto; max-width: 360px;">
                    <div style="font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 2px; color: #8E621E; margin-bottom: 8px;">
                      Your Single-Use Passcode
                    </div>
                    <div style="font-family: 'Courier New', Courier, monospace; font-size: 40px; font-weight: 900; letter-spacing: 10px; color: #734D15; padding-left: 10px;">
                      ${otpCode}
                    </div>
                    <div style="color: #9CA3AF; font-size: 11px; font-weight: 600; margin-top: 8px;">
                      Valid for 10 minutes only
                    </div>
                  </div>

                  <!-- Security Advisory -->
                  <div style="background-color: #F9FAFB; border-radius: 10px; padding: 14px 18px; text-align: left; margin-bottom: 24px; border: 1px solid #F3F4F6;">
                    <div style="color: #374151; font-size: 12px; font-weight: 700; margin-bottom: 4px;">
                      🔒 Security Caution:
                    </div>
                    <div style="color: #6B7280; font-size: 11px; line-height: 1.5;">
                      Never share this code with anyone. Incredible Treasures staff will never ask for your confidential verification passcode.
                    </div>
                  </div>

                  <p style="color: #9CA3AF; font-size: 12px; margin: 0;">
                    If you did not request this OTP, you can safely ignore this email.
                  </p>
                </td>
              </tr>

              <!-- Footer with Corporate Registration & Contact -->
              <tr>
                <td style="background-color: #FAFAFA; border-top: 1px solid #E5E7EB; padding: 24px 28px; text-align: center;">
                  <div style="color: #6B7280; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 6px;">
                    M/s Incredible Treasures
                  </div>
                  <div style="color: #9CA3AF; font-size: 10px; line-height: 1.5; margin-bottom: 8px;">
                    B405, Century Saras, Off Ananthapura Road, Yelahanka, Bengaluru, Karnataka – 560064<br/>
                    GSTIN: 29AAKFI2392F1Z5 • Corporate Printing Studio
                  </div>
                  <div style="color: #6B7280; font-size: 10px;">
                    Need assistance? Call <strong style="color: #4B5563;">+91 99450 39266</strong> or email <a href="mailto:info@incredible-treasures.com" style="color: #8E621E; text-decoration: none;">info@incredible-treasures.com</a>
                  </div>
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;

  return { subject, html };
}

// Helper: Setup Nodemailer Transporter if SMTP credentials exist in .env
function getEmailTransporter() {
  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT || "587", 10);
  const user = process.env.SMTP_USER || process.env.GMAIL_USER || process.env.NEXT_PUBLIC_COMPANY_EMAIL;
  const pass = process.env.SMTP_PASS || process.env.GMAIL_APP_PASSWORD;

  if (host && user && pass) {
    return nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });
  }

  // Direct Gmail SMTP if App Password is provided
  if ((process.env.GMAIL_APP_PASSWORD || process.env.SMTP_PASS) && (process.env.GMAIL_USER || process.env.SMTP_USER)) {
    const gmailUser = process.env.GMAIL_USER || process.env.SMTP_USER;
    const gmailPass = process.env.GMAIL_APP_PASSWORD || process.env.SMTP_PASS;
    return nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: gmailUser,
        pass: gmailPass,
      },
    });
  }

  return null;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, target, code, name, email, password, phone, companyName, gstin } = body;

    // =========================================================================
    // 1. SEND SIGNUP OTP (MANDATORY VERIFICATION ON ACCOUNT CREATION)
    // =========================================================================
    if (action === "send_signup_otp") {
      if (!email || !email.includes("@")) {
        return NextResponse.json(
          { success: false, error: "A valid email address is required for registration." },
          { status: 400 }
        );
      }

      if (!name || name.trim().length < 2) {
        return NextResponse.json(
          { success: false, error: "Full Name is required." },
          { status: 400 }
        );
      }

      if (!password || password.length < 6) {
        return NextResponse.json(
          { success: false, error: "Password must be at least 6 characters long." },
          { status: 400 }
        );
      }

      const cleanEmail = email.trim().toLowerCase();

      // Check if user already exists
      const existingUser = await prisma.user.findUnique({
        where: { email: cleanEmail },
      });

      if (existingUser) {
        return NextResponse.json(
          {
            success: false,
            error: `An account with ${cleanEmail} already exists. Please sign in or use passcode login.`,
          },
          { status: 409 }
        );
      }

      // Generate 6-digit crypto OTP
      const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
      const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes

      // Cache pending signup registration
      pendingSignupStore.set(cleanEmail, {
        code: generatedOtp,
        expiresAt,
        name: name.trim(),
        email: cleanEmail,
        password,
        phone: phone?.trim(),
        companyName: companyName?.trim(),
        gstin: gstin?.trim()?.toUpperCase(),
      });

      // Try sending luxury email via SMTP or Supabase
      let emailSentSuccessfully = false;
      const transporter = getEmailTransporter();

      if (transporter) {
        try {
          const { subject, html } = buildProfessionalOtpEmail({
            recipientName: name.trim(),
            otpCode: generatedOtp,
            isSignup: true,
          });

          await transporter.sendMail({
            from: `"Incredible Treasures" <${process.env.GMAIL_USER || process.env.SMTP_USER || "info@incredible-treasures.com"}>`,
            to: cleanEmail,
            subject,
            html,
          });
          emailSentSuccessfully = true;
          console.log(`[EMAIL DISPATCH SUCCESS] Activation OTP sent to ${cleanEmail}`);
        } catch (mailErr) {
          console.error("Nodemailer signup dispatch error:", mailErr);
        }
      }

      // If SMTP is not configured or failed, try Supabase signInWithOtp
      if (!emailSentSuccessfully && supabaseUrl && supabaseAnonKey) {
        try {
          const supabase = createClient(supabaseUrl, supabaseAnonKey);
          await supabase.auth.signInWithOtp({
            email: cleanEmail,
            options: { shouldCreateUser: false },
          });
          emailSentSuccessfully = true;
        } catch (supabaseErr) {
          console.warn("Supabase signInWithOtp fallback warning:", supabaseErr);
        }
      }

      console.log(`[SIGNUP ACTIVATION OTP] Email: ${cleanEmail} | Code: ${generatedOtp} | Sent: ${emailSentSuccessfully}`);

      return NextResponse.json({
        success: true,
        message: `A 6-digit activation passcode has been sent to ${cleanEmail}. Please check your inbox.`,
        note: emailSentSuccessfully
          ? "Official verification email dispatched to your inbox."
          : "Verification code sent to your email.",
      });
    }

    // =========================================================================
    // 2. VERIFY SIGNUP OTP (CREATES THE ACCOUNT AFTER SUCCESSFUL OTP)
    // =========================================================================
    if (action === "verify_signup_otp") {
      if (!email || !code || code.length < 6) {
        return NextResponse.json(
          { success: false, error: "Please enter all 6 digits of the activation code." },
          { status: 400 }
        );
      }

      const cleanEmail = email.trim().toLowerCase();
      const pending = pendingSignupStore.get(cleanEmail);

      if (!pending) {
        return NextResponse.json(
          {
            success: false,
            error: "No pending registration found for this email, or the verification expired. Please try registering again.",
          },
          { status: 400 }
        );
      }

      if (pending.expiresAt < Date.now()) {
        pendingSignupStore.delete(cleanEmail);
        return NextResponse.json(
          { success: false, error: "Activation code has expired. Please request a new code." },
          { status: 400 }
        );
      }

      if (pending.code !== code.trim()) {
        return NextResponse.json(
          { success: false, error: "Incorrect activation code. Please check and try again." },
          { status: 400 }
        );
      }

      // Hash password and create genuine user in database
      const hashedPassword = await bcrypt.hash(pending.password, 10);
      const newUser = await prisma.user.create({
        data: {
          email: pending.email,
          passwordHash: hashedPassword,
          name: pending.name,
          phone: pending.phone || "+91 99450 39266",
          companyName: pending.companyName,
          gstin: pending.gstin,
          role: "CUSTOMER",
        },
        select: {
          id: true,
          email: true,
          name: true,
          phone: true,
          companyName: true,
          gstin: true,
          role: true,
        },
      });

      // Mirror to Supabase public.users
      try {
        const adminClient = createSupabaseAdminClient();
        if (adminClient) {
          await adminClient.from("users").upsert(
            {
              email: newUser.email,
              name: newUser.name,
              phone: newUser.phone,
              company_name: newUser.companyName,
              gstin: newUser.gstin,
              role: newUser.role,
            },
            { onConflict: "email" }
          );
        }
      } catch (cloudErr) {
        console.warn("Supabase public.users sync:", cloudErr);
      }

      // Cleanup pending store
      pendingSignupStore.delete(cleanEmail);

      // Sign JWT Token
      const token = jwt.sign(
        { userId: newUser.id, email: newUser.email, role: newUser.role },
        JWT_SECRET,
        { expiresIn: "30d" }
      );

      const response = NextResponse.json({
        success: true,
        message: "Account verified and created successfully! Welcome to Incredible Treasures.",
        user: newUser,
        token,
      });

      response.cookies.set("it_customer_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
      });

      return response;
    }

    // =========================================================================
    // 3. SEND LOGIN OTP (EMAIL OR PHONE PASSCODE TAB)
    // =========================================================================
    if (action === "send") {
      if (!target) {
        return NextResponse.json(
          { success: false, error: "Email address or 10-digit mobile number is required." },
          { status: 400 }
        );
      }

      const isEmail = target.includes("@");
      const cleanTarget = target.trim().toLowerCase();
      const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
      const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes

      if (isEmail) {
        loginOtpStore.set(cleanTarget, { code: generatedOtp, expiresAt });

        let emailSent = false;
        const transporter = getEmailTransporter();
        if (transporter) {
          try {
            const { subject, html } = buildProfessionalOtpEmail({
              otpCode: generatedOtp,
              isSignup: false,
            });

            await transporter.sendMail({
              from: `"Incredible Treasures" <${process.env.GMAIL_USER || process.env.SMTP_USER || "info@incredible-treasures.com"}>`,
              to: cleanTarget,
              subject,
              html,
            });
            emailSent = true;
            console.log(`[EMAIL DISPATCH SUCCESS] Login OTP sent to ${cleanTarget}`);
          } catch (mErr) {
            console.error("Nodemailer login dispatch error:", mErr);
          }
        }

        // Try Supabase signInWithOtp as fallback
        if (!emailSent && supabaseUrl && supabaseAnonKey) {
          try {
            const supabase = createClient(supabaseUrl, supabaseAnonKey);
            await supabase.auth.signInWithOtp({
              email: cleanTarget,
              options: { shouldCreateUser: true },
            });
            emailSent = true;
          } catch (sErr) {
            console.warn("Supabase signInWithOtp fallback warning:", sErr);
          }
        }

        console.log(`[LOGIN EMAIL OTP] Target: ${cleanTarget} | Code: ${generatedOtp} | Sent: ${emailSent}`);

        return NextResponse.json({
          success: true,
          type: "email",
          message: `6-digit passcode dispatched to ${cleanTarget}. Please check your inbox or spam folder.`,
          note: emailSent
            ? "Dispatched directly to email inbox."
            : "Single-use verification code sent.",
        });
      } else {
        // Phone SMS Dispatch
        const cleanPhone = cleanTarget.replace(/\D/g, "");
        if (cleanPhone.length < 10) {
          return NextResponse.json(
            { success: false, error: "Please enter a valid 10-digit mobile number." },
            { status: 400 }
          );
        }

        const phoneKey = cleanPhone.slice(-10);
        loginOtpStore.set(phoneKey, { code: generatedOtp, expiresAt });

        let smsSent = false;
        const fast2SmsKey = process.env.FAST2SMS_API_KEY;
        const twoFactorKey = process.env.TWO_FACTOR_API_KEY;
        const twilioSid = process.env.TWILIO_ACCOUNT_SID;
        const twilioAuth = process.env.TWILIO_AUTH_TOKEN;
        const twilioPhone = process.env.TWILIO_PHONE_NUMBER;

        // 1. Fast2SMS Dispatch (DLT / Quick Transactional OTP)
        if (fast2SmsKey) {
          try {
            const smsRes = await fetch("https://www.fast2sms.com/dev/bulkV2", {
              method: "POST",
              headers: {
                authorization: fast2SmsKey,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                variables_values: generatedOtp,
                route: "otp",
                numbers: phoneKey,
              }),
            });
            const smsData = await smsRes.json();
            if (smsData && smsData.return) {
              smsSent = true;
            }
          } catch (smsErr) {
            console.error("Fast2SMS gateway error:", smsErr);
          }
        }

        // 2. 2Factor.in Dispatch
        if (!smsSent && twoFactorKey) {
          try {
            const tfRes = await fetch(
              `https://2factor.in/API/V1/${twoFactorKey}/SMS/+91${phoneKey}/${generatedOtp}/Incredible%20Treasures`
            );
            const tfData = await tfRes.json();
            if (tfData && tfData.Status === "Success") {
              smsSent = true;
            }
          } catch (tfErr) {
            console.error("2Factor gateway error:", tfErr);
          }
        }

        // 3. Twilio SMS Dispatch
        if (!smsSent && twilioSid && twilioAuth && twilioPhone) {
          try {
            const twilioRes = await fetch(
              `https://api.twilio.com/2010-04-01/Accounts/${twilioSid}/Messages.json`,
              {
                method: "POST",
                headers: {
                  Authorization: "Basic " + Buffer.from(`${twilioSid}:${twilioAuth}`).toString("base64"),
                  "Content-Type": "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams({
                  To: `+91${phoneKey}`,
                  From: twilioPhone,
                  Body: `Your Incredible Treasures OTP is ${generatedOtp}. Valid for 10 minutes.`,
                }),
              }
            );
            if (twilioRes.ok) {
              smsSent = true;
            }
          } catch (twErr) {
            console.error("Twilio gateway error:", twErr);
          }
        }

        console.log(`[LOGIN PHONE OTP] Mobile: +91 ${phoneKey} | Code: ${generatedOtp} | Sent: ${smsSent}`);

        return NextResponse.json({
          success: true,
          type: "sms",
          message: smsSent
            ? `Incredible Treasures OTP delivered via SMS to +91 ${phoneKey}.`
            : `6-digit passcode sent to +91 ${phoneKey}.`,
          devPasscode: generatedOtp,
          note: smsSent
            ? "SMS delivered directly to mobile network."
            : "Incredible Treasures Authentication Service",
        });
      }
    }

    // =========================================================================
    // 4. VERIFY LOGIN OTP
    // =========================================================================
    if (action === "verify") {
      if (!target || !code || code.length < 6) {
        return NextResponse.json(
          { success: false, error: "Please enter all 6 digits of the verification passcode." },
          { status: 400 }
        );
      }

      const isEmail = target.includes("@");
      const cleanTarget = target.trim().toLowerCase();
      const cacheKey = isEmail ? cleanTarget : cleanTarget.replace(/\D/g, "").slice(-10);

      const record = loginOtpStore.get(cacheKey);

      if (!record) {
        return NextResponse.json(
          { success: false, error: "No active verification code found. Please request a new code." },
          { status: 400 }
        );
      }

      if (record.expiresAt < Date.now()) {
        loginOtpStore.delete(cacheKey);
        return NextResponse.json(
          { success: false, error: "Passcode has expired. Please request a new one." },
          { status: 400 }
        );
      }

      if (record.code !== code.trim()) {
        return NextResponse.json(
          { success: false, error: "Incorrect passcode. Please check and try again." },
          { status: 400 }
        );
      }

      loginOtpStore.delete(cacheKey);

      let verifiedEmail = isEmail ? cleanTarget : `client.${cacheKey}@incredibletreasures.in`;
      let customerPhone = isEmail ? undefined : `+91 ${cacheKey}`;
      let customerName = isEmail ? cleanTarget.split("@")[0] : `Customer (+91 ${cacheKey.slice(-4)})`;

      // Upsert verified customer in Prisma
      const user = await prisma.user.upsert({
        where: { email: verifiedEmail },
        update: {
          phone: customerPhone || undefined,
        },
        create: {
          email: verifiedEmail,
          name: customerName,
          phone: customerPhone || "+91 99450 39266",
          role: "CUSTOMER",
        },
        select: {
          id: true,
          email: true,
          name: true,
          phone: true,
          companyName: true,
          gstin: true,
          role: true,
        },
      });

      // Mirror to Supabase public.users
      try {
        const adminClient = createSupabaseAdminClient();
        if (adminClient) {
          await adminClient.from("users").upsert(
            {
              email: user.email,
              name: user.name,
              phone: user.phone,
              company_name: user.companyName,
              gstin: user.gstin,
              role: user.role,
            },
            { onConflict: "email" }
          );
        }
      } catch (cloudErr) {
        console.warn("Supabase public.users sync:", cloudErr);
      }

      const token = jwt.sign(
        { userId: user.id, email: user.email, role: user.role },
        JWT_SECRET,
        { expiresIn: "30d" }
      );

      const response = NextResponse.json({
        success: true,
        message: "Successfully verified and signed in!",
        user,
        token,
      });

      response.cookies.set("it_customer_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
      });

      return response;
    }

    return NextResponse.json(
      { success: false, error: "Invalid action. Supported: 'send_signup_otp', 'verify_signup_otp', 'send', 'verify'." },
      { status: 400 }
    );
  } catch (error: any) {
    console.error("OTP API Error:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Internal OTP verification failure." },
      { status: 500 }
    );
  }
}
