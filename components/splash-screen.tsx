"use client"

import { useState, useEffect } from "react"

interface SplashScreenProps {
  onComplete: () => void
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [progress, setProgress] = useState(0)
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 100)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (progress >= 100) {
      setTimeout(() => {
        setFadeOut(true)
        setTimeout(onComplete, 800)
      }, 500)
    }
  }, [progress, onComplete])

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0a0a0a] transition-opacity duration-800 ${
        fadeOut ? "splash-fade-out" : ""
      }`}
    >
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#e0457b]/10 rounded-full blur-3xl blob" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#f082ac]/10 rounded-full blur-3xl blob" style={{ animationDelay: "-4s" }} />
      </div>

      {/* Logo */}
      <div className="relative z-10 text-center">
        <div className="logo-reveal">
          <h1 className="font-[var(--font-bebas)] text-6xl sm:text-8xl md:text-9xl tracking-wider text-[#e0457b] neon-text heartbeat">
            BLACKPINK
          </h1>
          <p className="font-[var(--font-bebas)] text-xl sm:text-2xl md:text-3xl tracking-[0.5em] text-white/60 mt-2">
            WORLD TOUR 2026
          </p>
        </div>

        {/* Loading bar */}
        <div className="mt-12 w-64 sm:w-80 mx-auto">
          <div className="h-1 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#e0457b] to-[#f082ac] rounded-full transition-all duration-200 ease-out"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
          <p className="text-white/40 text-sm mt-4 tracking-widest uppercase">
            {progress < 100 ? "Cargando experiencia..." : "Bienvenido, Blink"}
          </p>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-2 h-2 rounded-full bg-[#e0457b]"
            style={{
              animation: `pulse-neon 1s ease-in-out ${i * 0.2}s infinite`,
            }}
          />
        ))}
      </div>
    </div>
  )
}
