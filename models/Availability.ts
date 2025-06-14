import mongoose from "mongoose"

const AvailabilitySchema = new mongoose.Schema({
  teacherEmail: String,
  date: String,
  startTime: String,
  endTime: String,
})

export default mongoose.models.Availability || mongoose.model("Availability", AvailabilitySchema)
