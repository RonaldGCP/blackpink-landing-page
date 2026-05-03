"use client"

import { Check, Star, Crown, Sparkles, Ticket, Users } from "lucide-react"
import { useState, useEffect } from "react"

interface TicketsSectionProps {
  onBuyTicket: (ticket: { id: number; name: string; price: number }) => void
}

const tickets = [
  {
    id: 1,
    name: "BLINK General",
    price: 280000,
    icon: Sparkles,
    isPopular: false,
    color: "#f082ac",
    available: 1200,
    benefits: [
      "Entrada al concierto",
      "Acceso a zona general",
      "Bolsa de regalo digital",
      "Pulsera conmemorativa",
    ],
  },
  {
    id: 2,
    name: "PINK VIP",
    price: 650000,
    icon: Star,
    isPopular: true,
    color: "#e0457b",
    available: 800,
    benefits: [
      "Entrada al concierto",
      "Asiento reservado zona media",
      "Kit de bienvenida exclusivo",
      "Póster firmado (digital)",
      "Acceso anticipado al merch",
    ],
  },
  {
    id: 3,
    name: "BLACKPINK PREMIUM",
    price: 1200000,
    icon: Crown,
    isPopular: false,
    color: "#d4af37",
    available: 400,
    benefits: [
      "Entrada al concierto",
      "Asiento VIP primera fila",
      "Meet & Greet virtual",
      "Photo Book exclusivo",
      "Light Stick edición especial",
      "Certificado de autenticidad",
    ],
  },
]

function formatPrice(price: number): string {
  return price.toLocaleString('es-CO')
}

export function TicketsSection({ onBuyTicket }: TicketsSectionProps) {
  const [totalAvailable, setTotalAvailable] = useState(2400)

  useEffect(() => {
    const interval = setInterval(() => {
      setTotalAvailable(prev => Math.max(prev - Math.floor(Math.random() * 3), 2000))
    }, 30000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section id="tickets" className="py-16 md:py-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 animated-gradient" />
      
      <div className="absolute top-20 right-20 opacity-10 hidden md:block">
        <Ticket className="w-32 h-32 text-[#e0457b] rotate-12" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <h2 className="font-[var(--font-bebas)] text-3xl md:text-5xl text-center mb-3 text-gradient-animated">
          CONSIGUE TUS TICKETS
        </h2>
        <p className="text-center text-white/60 mb-4 max-w-xl mx-auto text-sm md:text-base font-[var(--font-poppins)]">
          Elige tu experiencia y prepárate para una noche inolvidable
        </p>
        
        <div className="flex items-center justify-center gap-3 mb-8 md:mb-10">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-[#e0457b]/20 rounded-full border border-[#e0457b]/30">
            <Users className="w-3.5 h-3.5 text-[#e0457b]" />
            <span className="text-[#e0457b] font-semibold text-xs font-[var(--font-poppins)]">
              {totalAvailable.toLocaleString()} tickets disponibles
            </span>
            <span className="w-1.5 h-1.5 bg-[#e0457b] rounded-full animate-pulse" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {tickets.map((ticket) => (
            <div
              key={ticket.id}
              className={`relative glass rounded-2xl p-5 md:p-6 transition-all duration-300 cursor-pointer hover:scale-[1.02] ${
                ticket.isPopular ? "neon-border ring-1 ring-[#e0457b]/50" : "border border-white/10 hover:border-[#e0457b]/40"
              }`}
            >
              {ticket.isPopular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-gradient-to-r from-[#e0457b] to-[#f082ac] text-white text-[10px] font-bold px-4 py-1 rounded-full uppercase tracking-wider shadow-lg font-[var(--font-poppins)]">
                    Más Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-5 pt-1">
                <div 
                  className="w-14 h-14 rounded-xl mx-auto mb-3 flex items-center justify-center"
                  style={{ background: `${ticket.color}15`, border: `1px solid ${ticket.color}30` }}
                >
                  <ticket.icon className="w-7 h-7" style={{ color: ticket.color }} />
                </div>
                <h3 className="font-[var(--font-poppins)] font-semibold text-lg text-white tracking-wide mb-1">
                  {ticket.name}
                </h3>
                <p className="text-white/40 text-[10px] uppercase tracking-wider font-[var(--font-poppins)]">
                  {ticket.available} disponibles
                </p>
              </div>

              <div className="text-center mb-5">
                <div className="flex items-baseline justify-center gap-0.5">
                  <span className="text-white/50 text-sm font-[var(--font-poppins)]">$</span>
                  <span 
                    className="text-2xl md:text-3xl font-bold font-[var(--font-poppins)]"
                    style={{ color: ticket.color }}
                  >
                    {formatPrice(ticket.price)}
                  </span>
                </div>
                <span className="text-white/40 text-xs font-[var(--font-poppins)]">COP</span>
              </div>

              <ul className="space-y-2.5 mb-5">
                {ticket.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <div 
                      className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: `${ticket.color}20` }}
                    >
                      <Check className="w-2.5 h-2.5" style={{ color: ticket.color }} />
                    </div>
                    <span className="text-white/70 text-xs font-[var(--font-poppins)]">{benefit}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => onBuyTicket({ id: ticket.id, name: ticket.name, price: ticket.price })}
                className={`w-full py-3 font-semibold text-xs uppercase tracking-wider rounded-lg transition-all duration-300 cursor-pointer font-[var(--font-poppins)] ${
                  ticket.isPopular
                    ? "bg-gradient-to-r from-[#e0457b] to-[#f082ac] text-white glow-pulse hover:opacity-90 hover:scale-[1.02]"
                    : "border-2 hover:bg-white/5 hover:scale-[1.02]"
                }`}
                style={!ticket.isPopular ? { borderColor: ticket.color, color: ticket.color } : {}}
              >
                Comprar Ahora
              </button>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-4 md:gap-6 mt-8 text-white/40 text-xs font-[var(--font-poppins)]">
          <div className="flex items-center gap-1.5">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span>Compra segura</span>
          </div>
          <div className="flex items-center gap-1.5">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
            <span>Todos los métodos de pago</span>
          </div>
          <div className="flex items-center gap-1.5">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Entrega inmediata</span>
          </div>
        </div>
      </div>
    </section>
  )
}
