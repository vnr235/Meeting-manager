"use client"
import { useEffect, useState } from "react"

interface Slot {
  _id: string
  name: string
  email: string
  subject: string
  date: string
  startTime: string
  endTime: string
}


export default function StudentPage() {
  const [slots, setSlots] = useState<Slot[]>([])
  const [bookingInfo, setBookingInfo] = useState<{ name: string; email: string; selected: string | null }>({ name: "", email: "", selected: null })
  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetch("/api/availability")
      .then(res => res.json())
      .then(data => {
        setSlots(data.slots)
        setIsLoading(false)
      })
      .catch(() => setIsLoading(false))
  }, [])

  const handleBook = async (slot: Slot) => {
    if (!bookingInfo.name || !bookingInfo.email) {
      alert("Please enter your name and email first")
      return
    }
    
    setIsLoading(true)
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentName: bookingInfo.name,
          studentEmail: bookingInfo.email,
          teacherName: slot.name,
          teacherEmail: slot.email,
          date: slot.date,
          startTime: slot.startTime,
          endTime: slot.endTime,
          subject: slot.subject,
        }),
      })
      
      const data = await res.json()
      if (data.success) {
        setMessage(`Meeting Booked! Join using this link: ${data.meetLink}`)

        // ✅ Remove the booked slot from the UI
        setSlots(prevSlots => prevSlots.filter(s => s._id !== slot._id))

        // Clear selection
        setBookingInfo(prev => ({ ...prev, selected: null }))
      }else {
        setMessage("Failed to book meeting: " + (data.error || "Unknown error"))
      }
    } catch (e) {
      setMessage("Network error. Please try again.")
      console.log(e)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-indigo-900 mb-2">Book Your Tutoring Session</h1>
          <p className="text-gray-600">Find available time slots and schedule your meeting</p>
        </div>

        {/* Student Info Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 transition-all duration-300 hover:shadow-xl">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                className="w-full px-4 py-3 rounded-lg text-gray-700 border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                placeholder="John Doe"
                value={bookingInfo.name}
                onChange={e => setBookingInfo({ ...bookingInfo, name: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                className="w-full px-4 py-3 rounded-lg text-gray-700 border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                placeholder="john@example.com"
                type="email"
                value={bookingInfo.email}
                onChange={e => setBookingInfo({ ...bookingInfo, email: e.target.value })}
              />
            </div>
          </div>
        </div>

        {/* Available Slots Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200">Available Time Slots</h2>
          
          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
            </div>
          ) : slots.length === 0 ? (
            <div className="text-center py-8 bg-white rounded-xl shadow">
              <p className="text-gray-900 text-lg">No available slots at the moment. Please check back later.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {slots.map((slot) => (
                <div 
                  key={slot._id} 
                  className={`bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg border-l-4 ${bookingInfo.selected === slot._id ? 'border-indigo-600' : 'border-gray-200'}`}
                >
                  <div className="p-5">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-lg text-gray-800">{slot.name}</h3>
                        <span className="inline-block px-2 py-1 text-xs font-semibold text-indigo-800 bg-indigo-100 rounded-full mt-1">
                          {slot.subject}
                        </span>
                      </div>
                      <span className="bg-blue-50 text-blue-700 text-sm font-medium px-2.5 py-0.5 rounded">
                        {slot.startTime} - {slot.endTime}
                      </span>
                    </div>
                    
                    <div className="mt-4 flex items-center">
                      <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                      </svg>
                      <span className="text-gray-600">{slot.date}</span>
                    </div>
                    
                    <div className="mt-4 flex items-center">
                      <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                      </svg>
                      <span className="text-gray-600 text-sm">{slot.email}</span>
                    </div>
                    
                    <button 
                      className={`mt-6 w-full py-2.5 rounded-lg font-medium transition-all ${bookingInfo.name && bookingInfo.email 
                        ? 'bg-indigo-600 text-white hover:bg-indigo-700' 
                        : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}
                      onClick={() => {
                        setBookingInfo(prev => ({ ...prev, selected: slot._id }))
                        handleBook(slot)
                      }}
                      disabled={isLoading || !bookingInfo.name || !bookingInfo.email}
                    >
                      {isLoading && bookingInfo.selected === slot._id ? (
                        <span className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-700" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Booking...
                        </span>
                      ) : "Book Session"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Status Message */}
        {message && (
          <div className={`p-4 rounded-lg ${message.includes("Booked") ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {message}
          </div>
        )}
      </div>
    </div>
  )
}