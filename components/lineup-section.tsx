"use client"

import { Music, Instagram, Heart } from "lucide-react"
import { useState } from "react"

const members = [
  {
    name: "JISOO",
    role: "Vocalista Principal",
    fact: "La mayor del grupo, conocida por su elegancia y carisma",
    image: "https://cdn.shopify.com/s/files/1/0469/3927/5428/files/Bildschirmfoto_2024-09-03_um_12.22.45.png?v=1725359995",
    birthday: "3 de enero, 1995",
    zodiac: "Capricornio",
    soloHit: "Flower",
    funFact: "Es conocida por su amor a los videojuegos y su sentido del humor",
    color: "#e0457b",
  },
  {
    name: "JENNIE",
    role: "Rapera y Centro",
    fact: "Icono de moda y la primera en debutar como solista",
    image: "https://nolae.es/cdn/shop/articles/jennie-blackpink-profil-646657.jpg?v=1732634830&width=1200",
    birthday: "16 de enero, 1996",
    zodiac: "Capricornio",
    soloHit: "SOLO",
    funFact: "Estudió en Nueva Zelanda y habla inglés con fluidez",
    color: "#f082ac",
  },
  {
    name: "ROSE",
    role: "Vocalista y Guitarrista",
    fact: "Posee una voz única que ha conquistado al mundo",
    image: "https://cdn.shopify.com/s/files/1/0469/3927/5428/files/Bildschirmfoto_2024-11-22_um_11.58.02.png?v=1732273097",
    birthday: "11 de febrero, 1997",
    zodiac: "Acuario",
    soloHit: "On The Ground",
    funFact: "Nació en Nueva Zelanda y creció en Australia",
    color: "#d4af37",
  },
  {
    name: "LISA",
    role: "Bailarina Principal y Rapera",
    fact: "La única integrante no coreana, nacida en Tailandia",
    image: "https://i0.wp.com/plus.cusica.com/wp-content/uploads/2021/07/Lisa-e1626180793774.jpeg?fit=1080%2C685&ssl=1",
    birthday: "27 de marzo, 1997",
    zodiac: "Aries",
    soloHit: "LALISA & Money",
    funFact: "Es la artista K-pop más seguida en Instagram",
    color: "#e0457b",
  },
]

const setlist = [
  { name: "Pink Venom", duration: "3:07" },
  { name: "Shut Down", duration: "2:57" },
  { name: "How You Like That", duration: "3:02" },
  { name: "Lovesick Girls", duration: "3:14" },
  { name: "Kill This Love", duration: "3:08" },
  { name: "DDU-DU DDU-DU", duration: "3:28" },
]

export function LineupSection() {
  const [flippedCard, setFlippedCard] = useState<string | null>(null)

  const toggleCard = (name: string) => {
    setFlippedCard(flippedCard === name ? null : name)
  }

  return (
    <section id="lineup" className="py-20 px-4 animated-gradient relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-20 left-0 w-72 h-72 bg-[#e0457b]/5 rounded-full blur-3xl blob" />
      <div className="absolute bottom-20 right-0 w-96 h-96 bg-[#f082ac]/5 rounded-full blur-3xl blob" style={{ animationDelay: "-4s" }} />

      <div className="max-w-7xl mx-auto relative z-10">
        <h2 className="font-[var(--font-bebas)] text-4xl md:text-6xl text-center mb-4 text-gradient-animated">
          QUIÉNES SE PRESENTAN
        </h2>
        <p className="text-center text-white/60 mb-6 max-w-2xl mx-auto">
          Conoce a las integrantes que harán vibrar el Estadio El Campín
        </p>
        <p className="text-center text-white/40 text-sm mb-16">
          Conoce más sobre cada integrante
        </p>

        {/* Member Cards - 3D Flip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {members.map((member, index) => (
            <div
              key={member.name}
              className="h-[400px] cursor-pointer"
              onClick={() => toggleCard(member.name)}
              style={{ 
                animationDelay: `${index * 100}ms`,
                perspective: "1500px"
              }}
            >
              <div
                className="relative w-full h-full transition-transform duration-700"
                style={{ 
                  transformStyle: "preserve-3d",
                  transform: flippedCard === member.name ? "rotateY(180deg)" : "rotateY(0deg)"
                }}
              >
                {/* Front of card */}
                <div 
                  className="absolute inset-0 glass p-6 text-center card-shine rounded-2xl"
                  style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
                >
                  <div className="relative w-32 h-32 mx-auto mb-6">
                    <div 
                      className="absolute inset-0 rounded-full blur-xl opacity-50"
                      style={{ background: `linear-gradient(135deg, ${member.color}, ${member.color}40)` }}
                    />
                    <img
                      src={member.image}
                      alt={member.name}
                      className="relative w-32 h-32 rounded-full object-cover border-4 transition-all duration-300"
                      style={{ borderColor: `${member.color}50` }}
                    />
                  </div>
                  <h3 className="font-[var(--font-bebas)] text-3xl text-white mb-1 tracking-wider">
                    {member.name}
                  </h3>
                  <p className="text-sm uppercase tracking-wider mb-3" style={{ color: member.color }}>
                    {member.role}
                  </p>
                  <p className="text-white/60 text-sm leading-relaxed">
                    {member.fact}
                  </p>
                  
                  </div>

                {/* Back of card */}
                <div 
                  className="absolute inset-0 p-6 text-left rounded-2xl"
                  style={{ 
                    background: `linear-gradient(135deg, ${member.color}20, #0a0a0a90)`,
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                    transform: "rotateY(180deg)"
                  }}
                >
                  <div className="h-full flex flex-col">
                    <h3 className="font-[var(--font-bebas)] text-2xl text-white mb-4 tracking-wider flex items-center gap-2">
                      <Heart className="w-5 h-5" style={{ color: member.color }} />
                      {member.name}
                    </h3>
                    
                    <div className="space-y-3 flex-1">
                      <div>
                        <p className="text-white/40 text-xs uppercase tracking-wider">Cumpleaños</p>
                        <p className="text-white text-sm">{member.birthday}</p>
                      </div>
                      <div>
                        <p className="text-white/40 text-xs uppercase tracking-wider">Signo</p>
                        <p className="text-white text-sm">{member.zodiac}</p>
                      </div>
                      <div>
                        <p className="text-white/40 text-xs uppercase tracking-wider">Hit Solista</p>
                        <p className="text-sm" style={{ color: member.color }}>{member.soloHit}</p>
                      </div>
                      <div>
                        <p className="text-white/40 text-xs uppercase tracking-wider">Dato Curioso</p>
                        <p className="text-white/80 text-sm leading-relaxed">{member.funFact}</p>
                      </div>
                    </div>

                    {/* Social indicator */}
                    <div className="flex items-center gap-2 mt-4 pt-4 border-t border-white/10">
                      <Instagram className="w-4 h-4 text-white/40" />
                      <span className="text-white/40 text-xs">@{member.name.toLowerCase()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Setlist with visualizer effect */}
        <div className="max-w-2xl mx-auto">
          <h3 className="font-[var(--font-bebas)] text-3xl md:text-4xl text-center mb-8 text-white flex items-center justify-center gap-3">
            <Music className="w-8 h-8 text-[#e0457b]" />
            SETLIST ESPERADO
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {setlist.map((song, index) => (
              <div
                key={song.name}
                className="flex items-center gap-4 glass rounded-xl p-4 group hover:neon-border transition-all duration-300 scale-spring"
              >
                {/* Track number */}
                <span className="w-8 h-8 rounded-full bg-[#e0457b]/20 flex items-center justify-center text-[#e0457b] text-sm font-bold">
                  {index + 1}
                </span>
                
                {/* Visualizer bars on hover */}
                <div className="flex items-end gap-0.5 h-6 w-6">
                  {[0, 1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="w-1 bg-[#e0457b] rounded-full opacity-0 group-hover:opacity-100 transition-opacity visualizer-bar"
                      style={{
                        height: "40%",
                        animationDuration: `${0.3 + i * 0.1}s`,
                        animationDelay: `${i * 0.05}s`,
                      }}
                    />
                  ))}
                </div>
                
                {/* Song info */}
                <div className="flex-1">
                  <span className="text-white/80 group-hover:text-white transition-colors">
                    {song.name}
                  </span>
                </div>
                
                {/* Duration */}
                <span className="text-white/40 text-sm font-mono">
                  {song.duration}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
