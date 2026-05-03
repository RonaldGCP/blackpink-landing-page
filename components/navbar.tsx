"use client"

import { useState, useEffect } from "react"
import { Menu, X, ShoppingCart, User, LogOut, Ticket } from "lucide-react"
import { cn } from "@/lib/utils"

interface NavbarProps {
  cartCount: number
  user: { name: string; email: string } | null
  onCartClick: () => void
  onLoginClick: () => void
  onLogout: () => void
  onMyTicketsClick: () => void
}

const navLinks = [
  { href: "#inicio", label: "Inicio" },
  { href: "#lineup", label: "Lineup" },
  { href: "#galeria", label: "Galería" },
  { href: "#lugar", label: "Lugar" },
  { href: "#merch", label: "Merch" },
  { href: "#tickets", label: "Tickets" },
]

export function Navbar({ cartCount, user, onCartClick, onLoginClick, onLogout, onMyTicketsClick }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("#inicio")

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)

      // Track active section
      const sections = navLinks.map((link) => link.href.slice(1))
      for (const section of sections.reverse()) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 150) {
            setActiveSection(`#${section}`)
            break
          }
        }
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleNavClick = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "glass-dark py-3" : "bg-transparent py-5"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <a 
          href="#inicio" 
          className="font-[var(--font-bebas)] text-2xl md:text-3xl tracking-wider logo-pulse text-[#e0457b]"
        >
          BLACKPINK
        </a>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={cn(
                "nav-link text-sm uppercase tracking-wide transition-colors duration-300",
                activeSection === link.href ? "text-[#e0457b]" : "text-white/80 hover:text-[#e0457b]"
              )}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-4">
          {/* Cart */}
          <button
            onClick={onCartClick}
            className="relative p-2 text-white/80 hover:text-[#e0457b] transition-colors"
            aria-label="Carrito"
          >
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#e0457b] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center neon-border">
                {cartCount > 9 ? "9+" : cartCount}
              </span>
            )}
          </button>

          {/* User */}
          {user ? (
            <div className="flex items-center gap-3">
              <button
                onClick={onMyTicketsClick}
                className="p-2 text-white/60 hover:text-[#e0457b] transition-colors"
                aria-label="Mis tickets"
                title="Mis Tickets"
              >
                <Ticket className="w-5 h-5" />
              </button>
              <span className="text-white/80 text-sm">Hola, {user.name.split(" ")[0]}</span>
              <button
                onClick={onLogout}
                className="p-2 text-white/60 hover:text-[#e0457b] transition-colors"
                aria-label="Cerrar sesión"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <button
              onClick={onLoginClick}
              className="flex items-center gap-2 px-4 py-2 border border-[#e0457b]/30 rounded-lg text-white/80 hover:text-[#e0457b] hover:border-[#e0457b] transition-colors"
            >
              <User className="w-4 h-4" />
              <span className="text-sm">Entrar</span>
            </button>
          )}
        </div>

        {/* Tablet/Mobile Actions */}
        <div className="flex lg:hidden items-center gap-3">
          {/* Cart - visible on tablet and mobile */}
          <button
            onClick={onCartClick}
            className="relative p-2 text-white/80"
            aria-label="Carrito"
          >
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#e0457b] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount > 9 ? "9+" : cartCount}
              </span>
            )}
          </button>

          {/* User icon on mobile and tablet */}
          <button
            onClick={user ? onLogout : onLoginClick}
            className="p-2 text-white/80"
            aria-label={user ? "Cerrar sesión" : "Iniciar sesión"}
          >
            {user ? <LogOut className="w-5 h-5" /> : <User className="w-5 h-5" />}
          </button>

          {/* Menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-white min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu - Full screen */}
      <div
        className={cn(
          "lg:hidden fixed inset-0 top-[56px] md:top-[60px] glass-dark transition-all duration-300 flex flex-col",
          isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        )}
      >
        <div className="flex-1 flex flex-col justify-center items-center gap-6 p-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={handleNavClick}
              className={cn(
                "text-2xl font-semibold uppercase tracking-wider transition-colors min-h-[48px] flex items-center",
                activeSection === link.href ? "text-[#e0457b]" : "text-white/80 hover:text-[#e0457b]"
              )}
            >
              {link.label}
            </a>
          ))}

          {/* Mobile user actions */}
          <div className="mt-8 pt-8 border-t border-[#e0457b]/20 w-full max-w-xs space-y-4">
            {user ? (
              <>
                <p className="text-center text-white/60">
                  Conectado como <span className="text-[#e0457b]">{user.name}</span>
                </p>
                <button
                  onClick={() => {
                    onMyTicketsClick()
                    handleNavClick()
                  }}
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-[#e0457b] text-white font-semibold rounded-lg min-h-[48px]"
                >
                  <Ticket className="w-5 h-5" />
                  Mis Tickets
                </button>
                <button
                  onClick={() => {
                    onLogout()
                    handleNavClick()
                  }}
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 border border-[#e0457b]/30 rounded-lg text-white/80 min-h-[48px]"
                >
                  <LogOut className="w-5 h-5" />
                  Cerrar Sesión
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  onLoginClick()
                  handleNavClick()
                }}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-[#e0457b] text-white font-semibold rounded-lg min-h-[48px]"
              >
                <User className="w-5 h-5" />
                Iniciar Sesión
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
