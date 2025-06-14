# 📅 Meeting Scheduler Web App

A full-stack web application for scheduling online meetings between teachers and students with automatic **Google Meet** integration and **email notifications**.

## ✨ Features

- ✅ Teachers can define their availability (date, time, subject)
- ✅ Students can view available slots and book meetings
- ✅ Automatic **Google Calendar** event creation with Google Meet link
- ✅ Email notifications sent to both teacher and student
- ✅ Booking details stored in **MongoDB**

---

## 🚀 Setup Instructions

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/meeting-scheduler.git
cd meeting-scheduler
```
### 2️⃣ Install Dependencies
```
npm install
```
### 3️⃣ Environment Variables
```
Create a .env.local file in the root directory with the following:

GOOGLE_CLIENT_SECRET= YOUR CLIENT SECRET

GOOGLE_CLIENT_ID= YOUR CLIENT ID

GOOGLE_CALENDAR_ID= primary

GOOGLE_REFRESH_TOKEN=YOUR TOKEN

MONGODB_URI= YOUR ATLAS URL

MONGODB_NAME= YOUR MONGODB NAME
 
EMAIL_USER= YOUR MAIL

EMAIL_PASS= YOUR MAIL APP PASSWORD

Create a project on Google Cloud Console

Enable Google Calendar API

Create a Service Account with Calendar access

Share your calendar with the GOOGLE_CLIENT_EMAIL service account email

Get your GOOGLE_PROJECT_NUMBER from Google Cloud project settings
```

### 4️⃣ Start the Development Server
```
bash
Copy
Edit
npm run dev
App runs on: http://localhost:3000
```

### 📌 Features Implemented
```
Feature	Status
Teacher availability management	✅ Done
Student booking UI	✅ Done
Google Meet link generation	✅ Done
Emails to teacher & student	✅ Done
Booking data saved in MongoDB	✅ Done
````

### ⚠️ Known Issues / Limitations
```
❗ No Authentication — anyone with the URL can book

❗ No Double Booking Prevention — multiple students can book the same slot

❗ Basic UI — styling is functional but minimal

❗ Time Format — ensure times are provided in 24-hour format (HH:mm)

❗ No Cancel/Update Functionality — once booked, slots cannot be changed
````
### 🛠️ Planned Features
```
Authentication (Google Sign-In or password-based)

Conflict detection to prevent overlapping bookings

Slot cancellation & rescheduling

Improved responsive UI & UX

Admin dashboard for managing bookings

Email reminders for upcoming meetings
````
### 📧 Contact
For questions or contributions, contact:
vnr235@gmail.com
