"use client"

import { Music2, Play, ExternalLink } from "lucide-react"

export function SpotifySection() {
  const topTracks = [
    { name: "Pink Venom", plays: "1.2B plays", spotifyId: "5zwwW9Oq7ubLATjehP16Rx" },
    { name: "Shut Down", plays: "980M plays", spotifyId: "7gRFDGEzXwDoMfQGOWwLmA" },
    { name: "How You Like That", plays: "1.5B plays", spotifyId: "4wN5FEloHLJjkhcSTMW4F6" },
    { name: "Kill This Love", plays: "1.8B plays", spotifyId: "5jzKL4BDMClWqRguW5qZvh" },
    { name: "DDU-DU DDU-DU", plays: "2.1B plays", spotifyId: "4lRpLviKMJONv1cjmmgUhg" },
  ]

  return (
    <section className="py-16 md:py-20 px-4 bg-gradient-to-b from-[#0a0a0a] via-[#0f0a0c] to-[#0a0a0a] relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 right-10 w-20 h-20 border border-[#1DB954]/20 rounded-full animate-spin" style={{ animationDuration: "20s" }} />
        <div className="absolute bottom-10 left-10 w-32 h-32 border border-[#1DB954]/10 rounded-full animate-spin" style={{ animationDuration: "30s", animationDirection: "reverse" }} />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Music2 className="w-8 h-8 text-[#1DB954]" />
          <h2 className="font-[var(--font-bebas)] text-4xl md:text-5xl text-center text-white">
            ESCUCHA ANTES DEL SHOW
          </h2>
        </div>
        <p className="text-center text-white/60 mb-10 max-w-2xl mx-auto">
          Prepara tu voz con los hits que sonaran en el concierto
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Main playlist embed - Spotify Player */}
          <div className="rounded-2xl overflow-hidden shadow-2xl shadow-black/50 h-[400px]">
            <iframe
              src="https://open.spotify.com/embed/artist/41MozSoPIsD1dJM0CLPjZF?utm_source=generator&theme=0"
              width="100%"
              height="100%"
              frameBorder="0"
              allowFullScreen
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              className="rounded-2xl"
            />
          </div>

          {/* Top tracks list */}
          <div className="bg-[#121212] rounded-2xl p-5 h-[400px] flex flex-col border border-white/5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-lg text-white">
                Top Canciones del Setlist
              </h3>
              <a 
                href="https://open.spotify.com/artist/41MozSoPIsD1dJM0CLPjZF"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#1DB954] hover:text-[#1ed760] transition-colors"
              >
                <ExternalLink className="w-5 h-5" />
              </a>
            </div>
            
            <div className="flex-1 space-y-1 overflow-y-auto">
              {topTracks.map((track, index) => (
                <a
                  key={track.name}
                  href={`https://open.spotify.com/track/${track.spotifyId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-all group cursor-pointer"
                >
                  {/* Track number */}
                  <span className="w-5 text-white/40 text-sm text-center group-hover:hidden">
                    {index + 1}
                  </span>
                  <Play className="w-5 h-5 text-white hidden group-hover:block" />
                  
                  {/* Track info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-white group-hover:text-[#1DB954] transition-colors truncate font-medium">
                      {track.name}
                    </p>
                    <p className="text-white/40 text-xs">BLACKPINK</p>
                  </div>
                  
                  {/* Plays count */}
                  <span className="text-white/40 text-sm">
                    {track.plays}
                  </span>
                </a>
              ))}
            </div>

            {/* Spotify CTA */}
            <a
              href="https://open.spotify.com/artist/41MozSoPIsD1dJM0CLPjZF"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#1DB954] text-white font-semibold rounded-full hover:bg-[#1ed760] hover:scale-[1.02] transition-all cursor-pointer"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
              </svg>
              Abrir en Spotify
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
