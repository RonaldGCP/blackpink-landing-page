"use client"

import { useState } from "react"
import { Instagram, Youtube, Twitter } from "lucide-react"

const socialLinks = [
  { icon: Instagram, href: "https://instagram.com/blackpinkofficial", label: "Instagram" },
  { icon: Youtube, href: "https://youtube.com/blackpink", label: "YouTube" },
  { icon: Twitter, href: "https://twitter.com/BLACKPINK", label: "Twitter/X" },
]

// TikTok Icon component since Lucide doesn't have it
function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  )
}

export function Footer() {
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail("")
      setTimeout(() => setSubscribed(false), 3000)
    }
  }

  return (
    <footer className="py-16 px-4 bg-gradient-to-b from-[#0a0a0a] to-black border-t border-[#e0457b]/20">
      <div className="max-w-6xl mx-auto">
        {/* Logo */}
        <div className="text-center mb-10">
          <h2 className="font-[var(--font-bebas)] text-4xl md:text-5xl tracking-wider neon-text text-[#e0457b]">
            BLACKPINK
          </h2>
        </div>

        {/* Social Links */}
        <div className="flex items-center justify-center gap-6 mb-10">
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full border border-[#e0457b]/30 flex items-center justify-center text-white/70 hover:text-[#e0457b] hover:border-[#e0457b] hover:neon-border transition-all duration-300"
              aria-label={social.label}
            >
              <social.icon className="w-5 h-5" />
            </a>
          ))}
          <a
            href="https://tiktok.com/@blackpinkofficial"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-full border border-[#e0457b]/30 flex items-center justify-center text-white/70 hover:text-[#e0457b] hover:border-[#e0457b] hover:neon-border transition-all duration-300"
            aria-label="TikTok"
          >
            <TikTokIcon className="w-5 h-5" />
          </a>
        </div>

        {/* Newsletter */}
        <div className="max-w-md mx-auto mb-10">
          <p className="text-center text-white/70 mb-4">
            Únete a la familia BLINK – ingresa tu correo
          </p>
          <form onSubmit={handleSubscribe} className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              className="flex-1 px-4 py-3 bg-white/5 border border-[#e0457b]/30 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-[#e0457b] transition-colors"
              required
            />
            <button
              type="submit"
              className="px-6 py-3 bg-[#e0457b] text-white font-semibold rounded-lg hover:bg-[#e0457b]/90 transition-colors"
            >
              {subscribed ? "¡Listo!" : "Unirme"}
            </button>
          </form>
        </div>

        {/* Copyright */}
        <div className="text-center text-white/60 text-sm space-y-2">
          <p className="font-[var(--font-kpop)] text-base tracking-wide">
            © 2026 BLACKPINK WORLD TOUR
          </p>
          <p>Todos los derechos reservados.</p>
          <p className="text-[#e0457b]/80 font-medium">
            Página creada por Ronald Cubides
          </p>
        </div>
      </div>
    </footer>
  )
}
