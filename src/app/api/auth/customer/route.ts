import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";

const JWT_SECRET = process.env.JWT_SECRET || "incredible_treasures_jwt_secret_production_2026";

// GET /api/auth/customer - Fetch customer profile, orders, and saved designs
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");
    const id = searchParams.get("id");

    if (!email && !id) {
      return NextResponse.json(
        { success: false, error: "Email or User ID required" },
        { status: 400 }
      );
    }

    const cleanEmail = email ? email.toLowerCase().trim() : undefined;

    const user = await prisma.user.findFirst({
      where: cleanEmail ? { email: cleanEmail } : { id: id! },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        companyName: true,
        gstin: true,
        role: true,
        createdAt: true,
        _count: {
          select: {
            savedDesigns: true,
            orders: true,
          },
        },
        savedDesigns: {
          orderBy: { updatedAt: "desc" },
          take: 10,
        },
        orders: {
          orderBy: { createdAt: "desc" },
          take: 20,
          include: {
            items: true,
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, error: "Customer not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("Error fetching customer:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST /api/auth/customer - Register, Login, or Update Profile with bcrypt & Supabase
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      action = "login_or_register", // "signup", "login", "update_profile", "login_or_register"
      email,
      password,
      name,
      phone,
      companyName,
      gstin,
    } = body;

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { success: false, error: "Valid corporate email address is required" },
        { status: 400 }
      );
    }

    const cleanEmail = email.toLowerCase().trim();

    // 1. SUPABASE AUTH INTEGRATION (if configured in .env)
    if (isSupabaseConfigured() && password) {
      try {
        const supabase = await createServerSupabaseClient();
        if (supabase) {
          if (action === "signup") {
            const { data: supaSignUp, error: supaErr } = await supabase.auth.signUp({
              email: cleanEmail,
              password,
              options: {
                data: {
                  full_name: name,
                  company_name: companyName,
                  gstin,
                },
              },
            });
            if (supaErr && !supaErr.message.includes("already registered")) {
              console.warn("Supabase auth signUp warning:", supaErr.message);
            }
          } else if (action === "login") {
            const { error: supaLoginErr } = await supabase.auth.signInWithPassword({
              email: cleanEmail,
              password,
            });
            if (supaLoginErr) {
              console.warn("Supabase signInWithPassword check:", supaLoginErr.message);
            }
          }
        }
      } catch (e) {
        console.warn("Supabase cloud auth call skipped (using local database):", e);
      }
    }

    // 2. PRISMA DATABASE AUTH & PROFILE HANDLING
    let existingUser = await prisma.user.findUnique({
      where: { email: cleanEmail },
    });

    // SIGNUP FLOW
    if (action === "signup") {
      if (existingUser && existingUser.passwordHash) {
        return NextResponse.json(
          { success: false, error: "An account with this email already exists. Please sign in." },
          { status: 409 }
        );
      }

      const passwordHash = password ? await bcrypt.hash(password, 10) : null;

      const user = await prisma.user.upsert({
        where: { email: cleanEmail },
        update: {
          name: name?.trim() || existingUser?.name || "Corporate Client",
          phone: phone?.trim() || existingUser?.phone || "+91 99450 39266",
          companyName: companyName?.trim() || existingUser?.companyName || "Incredible Treasures Luxury Studio",
          gstin: gstin?.trim().toUpperCase() || existingUser?.gstin || null,
          passwordHash: passwordHash || existingUser?.passwordHash,
        },
        create: {
          email: cleanEmail,
          passwordHash,
          name: name?.trim() || "Corporate Client",
          phone: phone?.trim() || "+91 99450 39266",
          companyName: companyName?.trim() || "Incredible Treasures Luxury Studio",
          gstin: gstin?.trim().toUpperCase() || null,
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

      const token = jwt.sign(
        { userId: user.id, email: user.email, role: user.role },
        JWT_SECRET,
        { expiresIn: "30d" }
      );

      const response = NextResponse.json({
        success: true,
        message: "Account created successfully",
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

    // LOGIN FLOW
    if (action === "login") {
      if (!existingUser) {
        return NextResponse.json(
          { success: false, error: "No account found with this email. Please create an account." },
          { status: 404 }
        );
      }

      if (existingUser.passwordHash && password) {
        const passwordValid = await bcrypt.compare(password, existingUser.passwordHash);
        if (!passwordValid) {
          return NextResponse.json(
            { success: false, error: "Incorrect password. Please verify and try again." },
            { status: 401 }
          );
        }
      }

      const token = jwt.sign(
        { userId: existingUser.id, email: existingUser.email, role: existingUser.role },
        JWT_SECRET,
        { expiresIn: "30d" }
      );

      const response = NextResponse.json({
        success: true,
        message: "Signed in successfully",
        user: {
          id: existingUser.id,
          email: existingUser.email,
          name: existingUser.name,
          phone: existingUser.phone,
          companyName: existingUser.companyName,
          gstin: existingUser.gstin,
          role: existingUser.role,
        },
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

    // UPDATE PROFILE OR FAST LOGIN
    let passwordHashToSave = undefined;
    if (password && (!existingUser || !existingUser.passwordHash)) {
      passwordHashToSave = await bcrypt.hash(password, 10);
    }

    const user = await prisma.user.upsert({
      where: { email: cleanEmail },
      update: {
        ...(name ? { name: name.trim() } : {}),
        ...(phone ? { phone: phone.trim() } : {}),
        ...(companyName ? { companyName: companyName.trim() } : {}),
        ...(gstin ? { gstin: gstin.trim().toUpperCase() } : {}),
        ...(passwordHashToSave ? { passwordHash: passwordHashToSave } : {}),
      },
      create: {
        email: cleanEmail,
        passwordHash: passwordHashToSave || null,
        name: name?.trim() || "Mahi Kapoor",
        phone: phone?.trim() || "+91 99450 39266",
        companyName: companyName?.trim() || "Incredible Treasures Luxury Studio",
        gstin: gstin?.trim().toUpperCase() || "29AAKFI2392F1Z5",
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

    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: "30d" }
    );

    const response = NextResponse.json({
      success: true,
      message: "Customer authenticated successfully",
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
  } catch (error: any) {
    console.error("Error authenticating customer:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Authentication failed" },
      { status: 500 }
    );
  }
}
