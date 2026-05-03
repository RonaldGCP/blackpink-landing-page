"use client"

import { useState } from "react"
import { X, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react"

const galleryImages = [
  { id: 1, src: "https://poluxweb.com/Polux3/images/data/cine/resenas/2024/julio/Blackpink_BornPink/Blackpink-world-tour-born-pink-02.jpg", alt: "BLACKPINK BORN PINK World Tour" },
  { id: 2, src: "https://www.billboard.com/wp-content/uploads/2023/08/blackpink-coachella-a-2023-billboard-1548-1.jpg?w=942&h=628&crop=1", alt: "BLACKPINK Coachella Performance" },
  { id: 3, src: "https://data.nextshark.com/wp-content/uploads/2023/09/BLACKPINK.jpg", alt: "BLACKPINK Group Photo" },
  { id: 4, src: "https://pbs.twimg.com/media/GUKaRdyaYAAvLSo.jpg", alt: "BLACKPINK Concert Stage" },
  { id: 5, src: "https://www.elimparcial.com/resizer/dTRSUymp2EUn2gsCrcofJlRRdWI=/arc-photo-elimparcial/arc2-prod/public/5Y4VF6LQ7VCMRMXM2ELKEYK4K4.jpg", alt: "BLACKPINK Live Performance" },
  { id: 6, src: "https://origin.cronosmedia.glr.pe/large/2023/09/17/lg_6506f190269ec1151a6b3820.jpg", alt: "BLACKPINK World Tour Stage" },
  { id: 7, src: "https://imgmedia.larepublica.pe/640x374/larepublica/original/2023/09/16/650629644b7ed615602074c7.webp", alt: "BLACKPINK Concert Moment" },
  { id: 8, src: "https://palomaynacho.com/wp-content/uploads/2024/07/setlist-born-pink-world-tour-1.jpg", alt: "BLACKPINK BORN PINK Setlist" },
  { id: 9, src: "https://cdn.shopify.com/s/files/1/2501/7648/files/alles-rund-um-blackpink-alben-erfolge-und-mehr-801238.jpg?v=1752814377", alt: "BLACKPINK Album Promo" },
]

export function GallerySection() {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  const openLightbox = (index: number) => {
    setCurrentIndex(index)
    setLightboxOpen(true)
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1))
  }

  return (
    <section id="galeria" className="py-20 px-4 bg-gradient-to-b from-[#0a0a0a] to-[#0f0f0f]">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-[var(--font-bebas)] text-4xl md:text-6xl text-center mb-4 neon-text-subtle text-[#e0457b]">
          MOMENTOS
        </h2>
        <p className="text-center text-white/60 mb-12 max-w-2xl mx-auto">
          Revive los mejores momentos del BORN PINK World Tour
        </p>

        {/* Mobile Carousel Hint */}
        <p className="text-center text-[#f082ac] text-sm mb-6 md:hidden">
          ← Desliza para explorar →
        </p>

        {/* Mobile Carousel */}
        <div className="md:hidden overflow-x-auto hide-scrollbar pb-4">
          <div className="flex gap-4 w-max px-4">
            {galleryImages.map((image, index) => (
              <div
                key={image.id}
                className="relative w-72 h-48 flex-shrink-0 rounded-xl overflow-hidden cursor-pointer group"
                onClick={() => openLightbox(index)}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 bg-[#1a1a1a]"
                />
                <div className="absolute inset-0 bg-[#e0457b]/0 group-hover:bg-[#e0457b]/40 transition-all duration-300 flex items-center justify-center">
                  <ZoomIn className="w-10 h-10 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-4">
          {galleryImages.map((image, index) => (
            <div
              key={image.id}
              className="relative aspect-[3/2] rounded-xl overflow-hidden cursor-pointer group"
              onClick={() => openLightbox(index)}
            >
              <img
                src={image.src}
                alt={image.alt}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 bg-[#1a1a1a]"
              />
              <div className="absolute inset-0 bg-[#e0457b]/0 group-hover:bg-[#e0457b]/40 transition-all duration-300 flex items-center justify-center">
                <ZoomIn className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-[#0a0a0a]/95 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white hover:text-[#e0457b] transition-colors p-2"
            aria-label="Cerrar"
          >
            <X className="w-8 h-8" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation()
              goToPrevious()
            }}
            className="absolute left-4 text-white hover:text-[#e0457b] transition-colors p-2"
            aria-label="Anterior"
          >
            <ChevronLeft className="w-10 h-10" />
          </button>

          <img
            src={galleryImages[currentIndex].src}
            alt={galleryImages[currentIndex].alt}
            className="max-w-full max-h-[85vh] object-contain rounded-lg neon-border bg-[#1a1a1a]"
            onClick={(e) => e.stopPropagation()}
          />

          <button
            onClick={(e) => {
              e.stopPropagation()
              goToNext()
            }}
            className="absolute right-4 text-white hover:text-[#e0457b] transition-colors p-2"
            aria-label="Siguiente"
          >
            <ChevronRight className="w-10 h-10" />
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60">
            {currentIndex + 1} / {galleryImages.length}
          </div>
        </div>
      )}
    </section>
  )
}
