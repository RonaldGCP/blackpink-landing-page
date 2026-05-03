"use client"

const newsItems = [
  "BLACKPINK LLEGA A COLOMBIA - 7 DE OCTUBRE 2026",
  "BORN PINK FOREVER WORLD TOUR",
  "ESTADIO EL CAMPIN - BOGOTA",
  "TICKETS DISPONIBLES AHORA",
  "45,000 BLINKS UNIDOS",
  "LA NOCHE MAS ESPERADA DEL K-POP",
  "JISOO - JENNIE - ROSE - LISA",
]

export function NewsTicker() {
  return (
    <div className="bg-[#e0457b] py-3 overflow-hidden">
      <div className="marquee flex whitespace-nowrap">
        {/* Duplicate the content for seamless loop */}
        {[...newsItems, ...newsItems].map((item, index) => (
          <span
            key={index}
            className="inline-flex items-center mx-8 text-white font-semibold uppercase tracking-wider text-sm"
          >
            <span className="w-2 h-2 bg-white rounded-full mr-4" />
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
