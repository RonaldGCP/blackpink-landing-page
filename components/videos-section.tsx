"use client"

import { Play } from "lucide-react"
import { useState } from "react"

const videos = [
  {
    id: "gQlMMD8auMs",
    title: "Pink Venom",
    views: "1.2B views",
  },
  {
    id: "2S24-y0Ij3Y",
    title: "Kill This Love",
    views: "1.8B views",
  },
  {
    id: "vRXZj0DzXIA",
    title: "Ice Cream (ft. Selena Gomez)",
    views: "900M views",
  },
  {
    id: "ioNng23DkIM",
    title: "How You Like That",
    views: "1.5B views",
  },
]

export function VideosSection() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null)

  return (
    <section id="videos" className="py-20 px-4 bg-[#0a0a0a] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#e0457b]/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <h2 className="font-[var(--font-bebas)] text-4xl md:text-6xl text-center mb-4 text-gradient-animated">
          SIENTE LA ENERGIA
        </h2>
        <p className="text-center text-white/60 mb-12 max-w-2xl mx-auto">
          Los videos mas iconicos que veras en vivo
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {videos.map((video) => (
            <div
              key={video.id}
              className="group relative rounded-2xl overflow-hidden neon-border"
            >
              {activeVideo === video.id ? (
                <div className="aspect-video">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${video.id}?autoplay=1`}
                    title={video.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
              ) : (
                <div 
                  className="aspect-video relative cursor-pointer"
                  onClick={() => setActiveVideo(video.id)}
                >
                  <img
                    src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
                    alt={video.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 bg-[#1a1a1a]"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
                  
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#e0457b]/90 flex items-center justify-center transform transition-all duration-300 group-hover:scale-110 group-hover:bg-[#e0457b] glow-pulse">
                      <Play className="w-8 h-8 md:w-10 md:h-10 text-white ml-1" fill="white" />
                    </div>
                  </div>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white font-semibold text-lg mb-1">
                      {video.title}
                    </h3>
                    <p className="text-white/60 text-sm">
                      {video.views}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="https://www.youtube.com/@BLACKPINK"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 glass rounded-full hover:neon-border transition-all duration-300 group"
          >
            <svg className="w-6 h-6 text-[#FF0000]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
            <span className="text-white group-hover:text-[#e0457b] transition-colors">
              Ver mas en YouTube
            </span>
          </a>
        </div>
      </div>
    </section>
  )
}
