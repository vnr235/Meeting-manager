"use client"; // Add this at the top

import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    // Move CSS animations to global CSS after component mounts
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes pulse-slow {
        0%, 100% { transform: scale(1); opacity: 0.2; }
        50% { transform: scale(1.05); opacity: 0.3; }
      }
      @keyframes pulse-medium {
        0%, 100% { transform: scale(1); opacity: 0.15; }
        50% { transform: scale(1.1); opacity: 0.25; }
      }
      @keyframes float {
        0%, 100% { transform: translateY(0) rotate(0deg); }
        50% { transform: translateY(-20px) rotate(3deg); }
      }
    `;
    document.head.appendChild(style);
  }, []);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-900 text-white relative overflow-hidden">
      {/* Floating bubbles */}
      <div className="absolute top-20 left-10 w-24 h-24 rounded-full bg-purple-700/20 animate-[pulse-slow_6s_ease-in-out_infinite]"></div>
      <div className="absolute bottom-40 right-20 w-16 h-16 rounded-full bg-indigo-600/20 animate-[pulse-medium_4s_ease-in-out_infinite]"></div>
      <div className="absolute top-1/3 right-1/4 w-20 h-20 rounded-full bg-blue-500/15 animate-[pulse-slow_6s_ease-in-out_infinite]"></div>
      
      {/* Background patterns */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:20px_20px]"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30"></div>
      
      {/* Content container */}
      <div className="relative z-10 bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 p-8 md:p-12 max-w-2xl mx-auto shadow-2xl">
        <div className="mb-8 flex justify-center">
          <div className="bg-indigo-600/20 p-4 rounded-2xl border border-indigo-500/30">
            <CalendarIcon className="h-16 w-16 text-white" />
          </div>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
          EduConnect Scheduler
        </h1>
        
        <p className="text-lg md:text-xl mb-8 max-w-2xl text-white/90 leading-relaxed">
          Seamlessly connect educators and learners with our intelligent scheduling platform. 
          Schedule meetings, manage availability, and focus on what really matters - education.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
          <a 
            href="/teachers" 
            className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl font-bold text-lg shadow-lg
                      hover:from-indigo-700 hover:to-purple-700 hover:shadow-xl transition-all duration-300
                      transform hover:-translate-y-1 flex items-center justify-center gap-2"
          >
            <ChalkboardTeacherIcon className="h-5 w-5" />
            <span>I&#39;m an Educator</span>
          </a>
          
          <a 
            href="/students" 
            className="px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl font-bold text-lg shadow-lg
                      hover:from-cyan-700 hover:to-blue-700 hover:shadow-xl transition-all duration-300
                      transform hover:-translate-y-1 flex items-center justify-center gap-2"
          >
            <AcademicCapIcon className="h-5 w-5" />
            <span>I&#39;m a Student</span>
          </a>
        </div>
        
        <div className="mt-12 pt-6 border-t border-white/10 text-white/70 text-sm">
          <p>Trusted by educators and students at top institutions worldwide</p>
        </div>
      </div>
      
      {/* Floating cards */}
      <div className="absolute bottom-10 left-5 w-20 h-20 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-lg rotate-12 animate-[float_8s_ease-in-out_infinite]"></div>
      <div className="absolute top-10 right-5 w-24 h-24 bg-gradient-to-br from-purple-500/10 to-indigo-500/10 rounded-lg -rotate-6 animate-[float_10s_ease-in-out_infinite_1s]"></div>
    </main>
  )
}

// Icons
function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  )
}

function ChalkboardTeacherIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  )
}

function AcademicCapIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14v6l9-5M12 8v6m0 0l-9-5" opacity="0.7" />
    </svg>
  )
}