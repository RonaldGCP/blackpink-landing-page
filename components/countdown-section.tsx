"use client"

import { useState, useEffect } from "react"
import { Calendar, Clock, MapPin } from "lucide-react"

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

// October 7, 2026 at 9:00 PM Colombia time (UTC-5)
const TARGET_DATE = new Date("2026-10-07T21:00:00-05:00").getTime()

function calculateTimeLeft(): TimeLeft {
  const now = Date.now()
  const difference = TARGET_DATE - now

  if (difference > 0) {
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((difference % (1000 * 60)) / 1000),
    }
  }
  return { days: 0, hours: 0, minutes: 0, seconds: 0 }
}

function isEventTime(): boolean {
  return Date.now() >= TARGET_DATE
}

export function CountdownSection() {
  const [mounted, setMounted] = useState(false)
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [eventArrived, setEventArrived] = useState(false)

  useEffect(() => {
    setMounted(true)
    setTimeLeft(calculateTimeLeft())
    setEventArrived(isEventTime())
    
    const interval = setInterval(() => {
      const newTimeLeft = calculateTimeLeft()
      setTimeLeft(newTimeLeft)
      setEventArrived(isEventTime())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const timeUnits = [
    { label: "Días", value: timeLeft.days },
    { label: "Horas", value: timeLeft.hours },
    { label: "Minutos", value: timeLeft.minutes },
    { label: "Segundos", value: timeLeft.seconds },
  ]

  return (
    <section id="countdown" className="py-20 px-4 relative overflow-hidden animated-gradient">
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-32 h-32 border border-[#e0457b]/10 rounded-full rotate-slow" />
      <div className="absolute bottom-10 right-10 w-24 h-24 border border-[#f082ac]/10 rounded-full rotate-slow" style={{ animationDirection: "reverse" }} />
      
      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Section title */}
        <h2 className="font-[var(--font-bebas)] text-4xl md:text-5xl text-center mb-4 text-gradient-animated">
          CUENTA REGRESIVA
        </h2>
        
        <div className="glass rounded-3xl p-8 md:p-12 neon-border relative overflow-hidden">
          {/* Background shimmer effect */}
          <div className="absolute inset-0 shimmer pointer-events-none" />
          
          {mounted && eventArrived ? (
            <div className="text-center py-8 relative z-10">
              <div className="animate-pulse mb-6">
                <span className="text-6xl">🖤</span>
                <span className="text-6xl mx-4">🩷</span>
              </div>
              <h2 className="font-[var(--font-bebas)] text-4xl md:text-6xl text-[#e0457b] neon-text mb-4 tracking-wider">
                ¡El momento ha llegado, Blinks!
              </h2>
              <p className="text-white/80 text-xl">
                ¡BLACKPINK está en el escenario!
              </p>
            </div>
          ) : (
            <div className="relative z-10">
              <p className="text-center text-[#f082ac] text-lg md:text-xl mb-8 tracking-wide">
                ¡La espera está por terminar, Blinks!
              </p>

              {/* Countdown grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-10">
                {timeUnits.map((unit, index) => {
                  const displayValue = mounted ? String(unit.value).padStart(2, "0") : "--"
                  const isThreeDigits = unit.value >= 100
                  const fontSizeClass = index === 0 && isThreeDigits
                    ? "text-4xl md:text-5xl lg:text-6xl"
                    : "text-5xl md:text-6xl lg:text-7xl"
                  
                  return (
                    <div key={unit.label} className="text-center group">
                      <div className="relative bg-[#0a0a0a]/80 rounded-2xl p-4 md:p-6 border border-[#e0457b]/30 overflow-hidden transition-all duration-300 hover:border-[#e0457b]/60">
                        {/* Glow effect on hover */}
                        <div className="absolute inset-0 bg-[#e0457b]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        
                        <span className={`font-[var(--font-bebas)] ${fontSizeClass} neon-text text-[#e0457b] inline-block tabular-nums relative z-10`}>
                          {displayValue}
                        </span>
                      </div>
                      <p className="mt-3 text-white/70 uppercase tracking-widest text-sm font-medium">
                        {unit.label}
                      </p>
                    </div>
                  )
                })}
              </div>

              {/* Event details */}
              <div className="flex flex-wrap justify-center gap-6 text-white/60 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#e0457b]" />
                  <span>7 de Octubre, 2026</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#e0457b]" />
                  <span>6:00 PM - 11:00 PM (Hora Colombia)</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#e0457b]" />
                  <span>Estadio El Campín, Bogotá</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* CTA below countdown */}
        <div className="text-center mt-8">
          <a
            href="#tickets"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#e0457b] text-white font-semibold uppercase tracking-wider rounded-full glow-pulse hover:bg-[#e0457b]/90 transition-all"
          >
            Asegura tu lugar ahora
          </a>
        </div>
      </div>
    </section>
  )
}
