"use client"

import { useEffect, useRef, useState } from "react"
import { Play, ChevronDown } from "lucide-react"

export function HeroSection() {
  const petalsRef = useRef<HTMLDivElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Trigger animations after mount
    setIsLoaded(true)

    const container = petalsRef.current
    if (!container) return

    const createPetal = () => {
      const petal = document.createElement("div")
      petal.className = "petal"
      petal.style.left = Math.random() * 100 + "vw"
      petal.style.animationDuration = Math.random() * 5 + 8 + "s"
      petal.style.animationDelay = Math.random() * 5 + "s"
      petal.style.opacity = String(Math.random() * 0.6 + 0.4)
      petal.style.transform = `scale(${Math.random() * 0.5 + 0.5})`
      container.appendChild(petal)

      setTimeout(() => {
        petal.remove()
      }, 13000)
    }

    const interval = setInterval(createPetal, 500)
    // Create initial petals
    for (let i = 0; i < 15; i++) {
      setTimeout(createPetal, i * 200)
    }

    return () => clearInterval(interval)
  }, [])

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image with Parallax */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed scale-110"
        style={{
          backgroundImage: `url('https://hips.hearstapps.com/hmg-prod/images/jennie-kim-rose-lisa-and-jisoo-of-blackpink-are-seen-at-the-news-photo-1593602011.jpg')`,
        }}
      />
      
      {/* Animated overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/90 via-[#0a0a0a]/60 to-[#0a0a0a]" />
      
      {/* Pink Gradient Accent - Animated */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#e0457b]/20 via-transparent to-[#f082ac]/10" />
      
      {/* Decorative circles */}
      <div className="absolute top-20 left-10 w-64 h-64 border border-[#e0457b]/10 rounded-full rotate-slow" />
      <div className="absolute bottom-20 right-10 w-48 h-48 border border-[#f082ac]/10 rounded-full rotate-slow" style={{ animationDirection: "reverse", animationDuration: "30s" }} />

      {/* Falling Petals Container */}
      <div ref={petalsRef} className="absolute inset-0 pointer-events-none overflow-hidden" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        {/* Main Title */}
        <h1 
          className={`font-[var(--font-bebas)] text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-wider mb-2 text-gradient-animated transition-all duration-1000 delay-200 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          BLACKPINK
        </h1>

        {/* Subtitle */}
        <h2 
          className={`font-[var(--font-bebas)] text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-[0.2em] mb-4 text-white transition-all duration-1000 delay-300 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          WORLD TOUR 2026
        </h2>

        {/* Tour name with glow */}
        <p 
          className={`text-xl sm:text-2xl md:text-3xl text-[#f082ac] font-light tracking-[0.3em] mb-8 neon-text-subtle transition-all duration-1000 delay-400 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          BORN PINK FOREVER
        </p>

        {/* Event details */}
        <div 
          className={`glass inline-block px-6 py-3 rounded-full mb-10 transition-all duration-1000 delay-500 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-white/90 text-base md:text-lg flex items-center gap-2">
            <span className="w-2 h-2 bg-[#e0457b] rounded-full animate-pulse" />
            7 de octubre de 2026 – Estadio El Campín, Bogotá
          </p>
        </div>

        {/* CTA Buttons */}
        <div 
          className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-1000 delay-600 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <a
            href="#tickets"
            className="group relative px-10 py-4 bg-[#e0457b] text-white font-semibold text-lg uppercase tracking-wider rounded-lg overflow-hidden transition-all duration-300 w-full sm:w-auto glow-pulse cursor-pointer hover:scale-105"
          >
            <span className="relative z-10">Comprar Tickets</span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#e0457b] to-[#f082ac] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </a>
          <a
            href="#videos"
            className="px-10 py-4 border-2 border-[#e0457b] text-white font-semibold text-lg uppercase tracking-wider rounded-lg hover:bg-[#e0457b]/10 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 w-full sm:w-auto neon-border cursor-pointer"
          >
            <Play className="w-5 h-5" />
            Ver Videos
          </a>
        </div>

        {/* Stats */}
        <div 
          className={`flex flex-wrap justify-center gap-8 mt-16 transition-all duration-1000 delay-700 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {[
            { value: "45K", label: "Capacidad" },
            { value: "4", label: "Artistas" },
            { value: "2+", label: "Horas de show" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-[var(--font-bebas)] text-4xl md:text-5xl text-[#e0457b] neon-text-subtle">
                {stat.value}
              </p>
              <p className="text-white/50 text-sm uppercase tracking-wider">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div 
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 transition-all duration-1000 delay-1000 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <a 
          href="#countdown" 
          className="flex flex-col items-center gap-2 text-white/50 hover:text-[#e0457b] transition-colors group"
        >
          <span className="text-xs uppercase tracking-widest">Explorar</span>
          <ChevronDown className="w-6 h-6 animate-bounce" />
        </a>
      </div>
    </section>
  )
}
