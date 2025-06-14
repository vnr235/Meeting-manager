import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"

export async function POST(req: Request) {
  const { name, email, role } = await req.json()
  if (!email || !role || !name) return NextResponse.json({ error: "Missing data" }, { status: 400 })

  const client = await connectDB()
  const db = client.db()
  const users = db.collection("users")

  await users.updateOne(
    { email },
    {
      $set: {
        name,
        role,
        updatedAt: new Date(),
      },
    },
    { upsert: true }
  )

  return NextResponse.json({ message: "User saved" })
}
