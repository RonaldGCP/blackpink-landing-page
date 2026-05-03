"use client"

import { useState, useEffect } from "react"
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Maria Fernanda",
    location: "Bogota, Colombia",
    text: "Ver a BLACKPINK en vivo fue un sueno hecho realidad. La energia del concierto es algo que nunca olvidare. Ya tengo mis tickets para el 2026!",
    rating: 5,
    avatar: "https://i.pravatar.cc/100?img=1",
    concert: "BORN PINK Tour 2023",
  },
  {
    id: 2,
    name: "Carolina Sanchez",
    location: "Medellin, Colombia",
    text: "Las chicas son increibles en el escenario. La produccion, las luces, el sonido... todo perfecto. Sin duda el mejor concierto de mi vida.",
    rating: 5,
    avatar: "https://i.pravatar.cc/100?img=5",
    concert: "BORN PINK Tour 2023",
  },
  {
    id: 3,
    name: "Valentina Rodriguez",
    location: "Cali, Colombia",
    text: "BLINK de corazon! He ido a 3 conciertos de BP y cada uno supera al anterior. No puedo esperar para El Campin 2026!",
    rating: 5,
    avatar: "https://i.pravatar.cc/100?img=9",
    concert: "Multiple Tours",
  },
  {
    id: 4,
    name: "Daniela Martinez",
    location: "Barranquilla, Colombia",
    text: "La conexion que tienen con los fans es unica. Cuando Lisa me miro durante Money, casi me desmayo! Experiencia inolvidable.",
    rating: 5,
    avatar: "https://i.pravatar.cc/100?img=16",
    concert: "BORN PINK Tour 2023",
  },
  {
    id: 5,
    name: "Camila Herrera",
    location: "Cartagena, Colombia",
    text: "Mi bias es Jennie y verla cantar Solo en vivo fue magico. Las voces en vivo son aun mejores que en los videos!",
    rating: 5,
    avatar: "https://i.pravatar.cc/100?img=20",
    concert: "BORN PINK Tour 2023",
  },
]

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const goToPrevious = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const goToNext = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const current = testimonials[currentIndex]

  return (
    <section className="py-20 px-4 bg-[#0a0a0a] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-[#e0457b]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-[#f082ac]/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <h2 className="font-[var(--font-bebas)] text-4xl md:text-6xl text-center mb-4 neon-text-subtle text-[#e0457b]">
          LO QUE DICEN LOS BLINKS
        </h2>
        <p className="text-center text-white/60 mb-16 max-w-2xl mx-auto">
          Experiencias reales de fans que vivieron la magia de BLACKPINK en vivo
        </p>

        {/* Main testimonial card */}
        <div className="relative">
          <div className="glass rounded-2xl p-8 md:p-12 testimonial-glow">
            {/* Quote icon */}
            <Quote className="w-12 h-12 text-[#e0457b]/30 mb-6" />

            {/* Text */}
            <p className="text-white/90 text-lg md:text-xl leading-relaxed mb-8 italic">
              {'"'}{current.text}{'"'}
            </p>

            {/* Rating */}
            <div className="flex gap-1 mb-6">
              {[...Array(current.rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-[#d4af37] text-[#d4af37]" />
              ))}
            </div>

            {/* Author */}
            <div className="flex items-center gap-4">
              <img
                src={current.avatar}
                alt={current.name}
                className="w-14 h-14 rounded-full border-2 border-[#e0457b]/30 object-cover"
              />
              <div>
                <p className="text-white font-semibold">{current.name}</p>
                <p className="text-white/60 text-sm">{current.location}</p>
                <p className="text-[#e0457b] text-xs mt-1">{current.concert}</p>
              </div>
            </div>
          </div>

          {/* Navigation buttons */}
          <button
            onClick={goToPrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 p-3 glass rounded-full hover:neon-border transition-all"
            aria-label="Anterior testimonio"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 p-3 glass rounded-full hover:neon-border transition-all"
            aria-label="Siguiente testimonio"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Dots indicator */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setIsAutoPlaying(false)
                setCurrentIndex(index)
              }}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "w-8 bg-[#e0457b]"
                  : "bg-white/30 hover:bg-white/50"
              }`}
              aria-label={`Ir al testimonio ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
