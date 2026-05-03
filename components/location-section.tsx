"use client"

import { MapPin, Users, Shirt, Calendar, Car, Train } from "lucide-react"

const venueInfo = [
  { icon: Users, label: "Capacidad", value: "45.000 fans" },
  { icon: Shirt, label: "Código de vestimenta", value: "Negro y Rosa" },
  { icon: Calendar, label: "Edad", value: "Todas las edades" },
  { icon: Car, label: "Acceso", value: "Av. NQS y Calle 63" },
  { icon: Train, label: "TransMilenio", value: "Estación El Campín" },
]

const stadiumPhotos = [
  { id: 1, src: "https://www.idrd.gov.co/sites/default/files/inline-images/campin-nocturna%20%281%29.jpeg", alt: "El Campín Vista Nocturna" },
  { id: 2, src: "https://files.visitbogota.co/sites/default/files/2024-04/estadio-nemesio-camacho-campin-05.jpg", alt: "Estadio El Campín Vista Aérea" },
  { id: 3, src: "https://files.visitbogota.co/sites/default/files/2024-04/estadio-nemesio-camacho-campin-03.jpg", alt: "El Campín Interior" },
]

export function LocationSection() {
  return (
    <section id="lugar" className="py-20 px-4 bg-gradient-to-b from-[#0f0f0f] to-[#0a0a0a]">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-[var(--font-bebas)] text-4xl md:text-6xl text-center mb-4 neon-text-subtle text-[#e0457b]">
          DÓNDE OCURRE
        </h2>
        
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <MapPin className="w-6 h-6 text-[#e0457b] pin-pulse" />
            <span className="text-xl md:text-2xl text-white font-semibold">
              Estadio El Campín, Bogotá, Colombia
            </span>
          </div>
          <p className="text-white/60 mb-2">
            Carrera 36 #63-91, Bogotá, Colombia
          </p>
          <p className="text-[#f082ac]">
            7 de octubre de 2026 | Puertas abren: 6:00 PM | Show: 9:00 PM
          </p>
        </div>

        {/* About the Venue */}
        <div className="glass rounded-2xl p-8 mb-12 max-w-4xl mx-auto">
          <h3 className="font-[var(--font-bebas)] text-2xl md:text-3xl text-white mb-4 text-center">
            Sobre el Estadio El Campín
          </h3>
          <p className="text-white/70 leading-relaxed text-center">
            El Estadio Nemesio Camacho El Campín es el estadio más emblemático de Colombia,
            ubicado en el corazón de Bogotá. Con capacidad para más de 45.000 personas,
            ha sido escenario de eventos históricos, partidos de fútbol legendarios y los
            conciertos más grandes que ha vivido el país. Artistas como Shakira, Coldplay,
            Guns N' Roses y Maluma han hecho retumbar sus tribunas. Ahora, BLACKPINK llega
            para escribir un nuevo capítulo en la historia de este legendario recinto.
          </p>
        </div>

        {/* Stadium Gallery */}
        <div className="mb-12">
          <h3 className="font-[var(--font-bebas)] text-2xl md:text-3xl text-[#e0457b] mb-6 text-center tracking-wider">
            Conoce El Campín
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {stadiumPhotos.map((photo) => (
              <div
                key={photo.id}
                className="relative aspect-[4/3] rounded-xl overflow-hidden border border-[#e0457b]/20 group"
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 bg-[#1a1a1a]"
                />
                <div className="absolute inset-0 bg-[#e0457b]/0 group-hover:bg-[#e0457b]/30 transition-all duration-300" />
              </div>
            ))}
          </div>
        </div>

        {/* Google Maps Button */}
        <div className="text-center mb-12">
          <a
            href="https://maps.google.com/?q=Estadio+El+Campin+Bogota+Colombia"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#e0457b] text-white font-semibold text-lg uppercase tracking-wider rounded-lg pulse-neon hover:bg-[#e0457b]/90 hover:scale-105 transition-all duration-300 cursor-pointer"
          >
            <MapPin className="w-6 h-6" />
            Ver en Google Maps
          </a>
        </div>

        {/* Venue Info Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {venueInfo.map((info) => (
            <div
              key={info.label}
              className="glass rounded-xl p-4 text-center hover:neon-border transition-all duration-300"
            >
              <info.icon className="w-8 h-8 text-[#e0457b] mx-auto mb-3" />
              <p className="text-white/60 text-xs uppercase tracking-wider mb-1">
                {info.label}
              </p>
              <p className="text-white font-semibold text-sm">
                {info.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
