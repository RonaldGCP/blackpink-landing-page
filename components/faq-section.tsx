"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

const faqs = [
  {
    question: "¿Puedo llevar cámara?",
    answer:
      "Se permiten cámaras de bolsillo y teléfonos celulares para uso personal. Las cámaras profesionales con lentes intercambiables, trípodes y equipos de grabación profesional no están permitidos.",
  },
  {
    question: "¿Cuál es la política de reembolso?",
    answer:
      "Los tickets son no reembolsables. Sin embargo, en caso de cancelación o reprogramación del evento, se ofrecerán opciones de reembolso o cambio de fecha según las políticas vigentes.",
  },
  {
    question: "¿Hay sillas para personas con movilidad reducida?",
    answer:
      "Sí, el Estadio El Campín cuenta con espacios designados y accesibles para personas con movilidad reducida y sus acompañantes. Por favor, contacta a servicio al cliente al momento de la compra para asegurar tu ubicación.",
  },
  {
    question: "¿Puedo llevar mi light stick?",
    answer:
      "¡Por supuesto! Los light sticks oficiales de BLACKPINK son bienvenidos y recomendados. Asegúrate de que esté completamente cargado para disfrutar al máximo del show.",
  },
  {
    question: "¿Qué artículos están prohibidos?",
    answer:
      "Están prohibidos: armas de cualquier tipo, botellas de vidrio, bebidas alcohólicas, drogas, objetos punzocortantes, paraguas, drones, banners grandes, y cualquier artículo que pueda afectar la seguridad o experiencia de otros asistentes.",
  },
]

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="py-20 px-4 bg-[#0a0a0a]">
      <div className="max-w-3xl mx-auto">
        <h2 className="font-[var(--font-bebas)] text-4xl md:text-6xl text-center mb-4 neon-text-subtle text-[#e0457b]">
          PREGUNTAS FRECUENTES
        </h2>
        <p className="text-center text-white/60 mb-12 max-w-2xl mx-auto">
          Todo lo que necesitas saber antes del concierto
        </p>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="glass rounded-xl overflow-hidden transition-all duration-300 hover:border-[#ff0080]/50"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full flex items-center justify-between p-5 text-left"
                aria-expanded={openIndex === index}
              >
                <span className="text-white font-medium pr-4">{faq.question}</span>
                <ChevronDown
                  className={cn(
                    "w-5 h-5 text-[#e0457b] flex-shrink-0 transition-transform duration-300",
                    openIndex === index && "rotate-180"
                  )}
                />
              </button>
              <div
                className={cn(
                  "overflow-hidden transition-all duration-300",
                  openIndex === index ? "max-h-96" : "max-h-0"
                )}
              >
                <p className="px-5 pb-5 text-white/70 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
