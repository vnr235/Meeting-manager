"use client"
import { useState } from "react"

export default function TeacherPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    date: "",
    startTime: "",
    endTime: "",
  })
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const res = await fetch("/api/availability", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      
      if (res.ok) {
        setMessage("Availability submitted successfully!")
        setForm({ name: "", email: "", subject: "", date: "", startTime: "", endTime: "" })
      } else {
        const errorData = await res.json()
        setMessage(errorData.error || "Error submitting availability")
      }
    } catch (error) {
      setMessage("Network error. Please try again.")
      console.log(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen  bg-gradient-to-br from-indigo-50 to-purple-50 py-12 px-4 sm:px-6">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-indigo-900 mb-2">Set Your Availability</h1>
          <p className="text-gray-600">Share when you&#39;re available for tutoring sessions</p>
        </div>
        
        <div className="bg-white w-100 rounded-2xl shadow-xl p-6 md:p-8 transition-all duration-300 hover:shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  className="w-full px-4 py-3 rounded-lg text-gray-700 border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Dr. Jane Smith"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input
                  className="w-full px-4 py-3 rounded-lg text-gray-700 border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="jane@university.edu"
                  type="email"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <input
                  className="w-full px-4 py-3 rounded-lg text-gray-700 border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="Calculus, Physics, etc."
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <div className="relative">
                    <input
                      className="w-full px-4 py-3 rounded-lg text-gray-700 border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                      name="date"
                      value={form.date}
                      onChange={handleChange}
                      type="date"
                      required
                    />
                    {/* <svg className="absolute right-3 top-3.5 h-5 w" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg> */}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Time Slot</label>
                  <div className="flex space-x-1">
                    <div className="relative flex-1">
                      <input
                        className="w-full px-4 py-3 rounded-lg text-gray-700 border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                        name="startTime"
                        value={form.startTime}
                        onChange={handleChange}
                        type="time"
                        required
                      />
                    </div>
                    <span className="flex items-center text-gray-700">to</span>
                    <div className="relative flex-1">
                      <input
                        className="w-full px-4 py-3 rounded-lg text-gray-700 border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                        name="endTime"
                        value={form.endTime}
                        onChange={handleChange}
                        type="time"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3.5 px-6 rounded-xl font-semibold transition-all flex items-center justify-center ${
                isSubmitting 
                  ? "bg-indigo-400 cursor-not-allowed" 
                  : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl"
              }`}
            >
              {isSubmitting ? (
                <>
                  {/* <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg> */}
                  Processing...
                </>
              ) : (
                "Submit Availability"
              )}
            </button>
          </form>
          
          {message && (
            <div className={`mt-6 p-4 rounded-lg text-center ${
              message.includes("successfully") 
                ? "bg-green-100 text-green-700" 
                : "bg-red-100 text-red-700"
            }`}>
              {message}
            </div>
          )}
        </div>
        
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Your availability will be visible to students for booking.</p>
          <p className="mt-1">You can submit multiple time slots separately.</p>
        </div>
      </div>
    </div>
  )
}