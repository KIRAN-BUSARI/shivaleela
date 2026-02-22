// app/api/admin/media/upload/route.ts

import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { v2 as cloudinary } from "cloudinary";
import { getDb, SITE_COLLECTION, SITE_DOC_ID } from "@/lib/mongodb";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function verifyAdmin(req: NextRequest): Promise<boolean> {
  const token = req.cookies.get("admin_token")?.value;
  if (!token) return false;
  try {
    await jwtVerify(token, JWT_SECRET);
    return true;
  } catch {
    return false;
  }
}

export async function POST(req: NextRequest) {
  if (!(await verifyAdmin(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await req.formData();
  const file = formData.get("image") as File | null;

  if (!file) {
    return NextResponse.json({ error: "No image provided" }, { status: 400 });
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const uploadResult = await new Promise<{ secure_url: string }>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "shivaleela/media", resource_type: "image" },
      (error, result) => {
        if (error || !result) reject(error);
        else resolve(result as { secure_url: string });
      }
    );
    stream.end(buffer);
  });

  const imageUrl = uploadResult.secure_url;

  const db = await getDb();
  await db.collection(SITE_COLLECTION).updateOne(
    { _id: SITE_DOC_ID as any },
    { $push: { mediaImages: imageUrl } as any }
  );

  return NextResponse.json({ success: true, url: imageUrl });
}

export async function DELETE(req: NextRequest) {
  if (!(await verifyAdmin(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { url } = await req.json();
  if (!url) return NextResponse.json({ error: "No url provided" }, { status: 400 });

  const db = await getDb();
  await db.collection(SITE_COLLECTION).updateOne(
    { _id: SITE_DOC_ID as any },
    { $pull: { mediaImages: url } as any }
  );

  return NextResponse.json({ success: true });
}

export async function GET() {
  const db = await getDb();
  const doc = await db
    .collection(SITE_COLLECTION)
    .findOne({ _id: SITE_DOC_ID as any }, { projection: { mediaImages: 1 } });

  return NextResponse.json({ images: doc?.mediaImages ?? [] });
}