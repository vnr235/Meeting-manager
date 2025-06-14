import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import { createGoogleMeetEvent } from "@/lib/google"
import { sendEmail } from "@/lib/email"

export async function POST(req: Request) {
  const { studentName, studentEmail, teacherEmail, teacherName, date, startTime, endTime, subject } = await req.json()

  const start = new Date(`${date}T${startTime}:00+05:30`).toISOString()
  const end = new Date(`${date}T${endTime}:00+05:30`).toISOString()
  if(new Date(start) >= new Date(end)){
    return NextResponse.json({ success: false, error: "start time must be before end time"}, { status: 400 })
  }
  
  console.log({
    date, startTime, endTime,
    start, end,
    now: new Date().toISOString(),
    startTimestamp: new Date(start).getTime(),
    endTimestamp: new Date(end).getTime(),
  });

  const event = await createGoogleMeetEvent({
    summary: `Meeting with ${teacherName}`,
    description: `Subject: ${subject}`,
    startTime: start,
    endTime: end,
    attendees: [
      { email: studentEmail },
      { email: teacherEmail },
    ],
  })


  //Safely extract the Meet Link
  const meetLink = event?.conferenceData?.entryPoints
  ?.find((e): e is { entryPointType: string; uri: string } => 
    e.entryPointType === "video" && typeof e.uri === "string"
  )
  ?.uri || "https://meet.google.com"

  // Email to teacher
  await sendEmail({
    to: teacherEmail,
    subject: `New Meeting Scheduled with ${studentName}`,
    html: `
      <h3>New Meeting Scheduled</h3>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Date & Time:</strong> ${date} ${startTime} - ${endTime}</p>
      <p><strong>Meet Link:</strong> <a href="${meetLink}">${meetLink}</a></p>
    `,
  })

  // Email to student
  await sendEmail({
    to: studentEmail,
    subject: `Your Meeting with ${teacherName} is Confirmed`,
    html: `
      <h3>Meeting Confirmation</h3>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Date & Time:</strong> ${date} ${startTime} - ${endTime}</p>
      <p><strong>Meet Link:</strong> <a href="${meetLink}">${meetLink}</a></p>
    `,
  })

  // Save booking in DB (Optional but recommended)
  const client = await connectDB()
  const db = client.db()
  await db.collection("bookings").insertOne({
    studentName,
    studentEmail,
    teacherName,
    teacherEmail,
    subject,
    date,
    startTime,
    endTime,
    meetLink,
    createdAt: new Date(),
  })

  await db.collection("available").deleteOne({
    email: teacherEmail,
    date,
    startTime,
    endTime,
  })

  return NextResponse.json({ success: true, meetLink })
}
