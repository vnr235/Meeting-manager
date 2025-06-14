import { google } from "googleapis";

const calendar = google.calendar("v3");

export async function createGoogleMeetEvent(data: any) {
  const auth = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID!,
    process.env.GOOGLE_CLIENT_SECRET!,
    "http://localhost:3000"
  );

  auth.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN });

  try {
    const event = await calendar.events.insert({
      auth,
      calendarId: "primary",
      conferenceDataVersion: 1,
      requestBody: {
        summary: data.summary,
        description: data.description,
        start: {
          dateTime: data.startTime,
          timeZone: "Asia/Kolkata",
        },
        end: {
          dateTime: data.endTime,
          timeZone: "Asia/Kolkata",
        },
        conferenceData: {
          createRequest: {
            requestId: `${Date.now()}`,
            conferenceSolutionKey: {
              type: "hangoutsMeet",
            },
          },
        },
        attendees: data.attendees,
      },
    });
    return event.data;
  } catch (error: any) {
    console.error("Google API Error:", JSON.stringify(error.response?.data, null, 2));
    throw error;
  }
}
