import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"

export async function POST(req: Request) {
  const body = await req.json()
  const client = await connectDB()
  const db = client.db()
  await db.collection("available").insertOne({ ...body, createdAt: new Date() })
  return NextResponse.json({ success: true })
}

export async function GET() {
  const client = await connectDB()
  const db = client.db()
  const slots = await db.collection("available").find({}).sort({ date: 1 }).toArray()
  return NextResponse.json({ slots })
}
