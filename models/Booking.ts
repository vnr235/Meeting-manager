import mongoose from "mongoose"

const BookingSchema = new mongoose.Schema({
  studentName: String,
  studentEmail: String,
  teacherEmail: String,
  date: String,
  startTime: String,
  endTime: String,
  meetLink: String,
})

export default mongoose.models.Booking || mongoose.model("Booking", BookingSchema)
