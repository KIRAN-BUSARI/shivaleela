import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";
import { getDb, ADMIN_COLLECTION, ADMIN_DOC_ID } from "@/lib/mongodb";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json(
      { error: "Email and password are required" },
      { status: 400 }
    );
  }

  try {
    const db = await getDb();
    const doc = await db.collection(ADMIN_COLLECTION).findOne({ _id: ADMIN_DOC_ID as any });

    if (!doc || !doc.admin) {
      return NextResponse.json({ error: "Admin not configured" }, { status: 500 });
    }

    const emailMatch = doc.admin.email === email;
    const passwordMatch = await bcrypt.compare(password, doc.admin.passwordHash);

    if (!emailMatch || !passwordMatch) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const token = await new SignJWT({ email, role: "admin" })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("1d")
      .sign(JWT_SECRET);

    const response = NextResponse.json({ success: true });

    response.cookies.set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 1 day in seconds
      path: "/",
    });

    return response;
  } catch (err) {
    console.error("[admin/login]", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}