"use client"

import { useState, useCallback, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { NewsTicker } from "@/components/news-ticker"
import { CountdownSection } from "@/components/countdown-section"
import { LineupSection } from "@/components/lineup-section"
import { GallerySection } from "@/components/gallery-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { QuizSection } from "@/components/quiz-section"
import { SpotifySection } from "@/components/spotify-section"
import { VideosSection } from "@/components/videos-section"
import { LocationSection } from "@/components/location-section"
import { MerchSection, type Product } from "@/components/merch-section"
import { TicketsSection } from "@/components/tickets-section"
import { FaqSection } from "@/components/faq-section"
import { Footer } from "@/components/footer"
import { BackToTop } from "@/components/back-to-top"
import { CursorTrail } from "@/components/cursor-trail"
import { ToastNotification } from "@/components/toast-notification"
import { AuthModal } from "@/components/auth-modal"
import { CartDrawer, type CartItem } from "@/components/cart-drawer"
import { CheckoutModal } from "@/components/checkout-modal"
import { MyTicketsModal } from "@/components/my-tickets-modal"
import { FloatingParticles } from "@/components/floating-particles"
import { SplashScreen } from "@/components/splash-screen"
import { ScrollReveal } from "@/components/scroll-reveal"

export default function BlackpinkLandingPage() {
  const [showSplash, setShowSplash] = useState(true)
  const [cart, setCart] = useState<CartItem[]>([])
  const [toastMessage, setToastMessage] = useState("")
  const [isToastVisible, setIsToastVisible] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)
  const [isMyTicketsOpen, setIsMyTicketsOpen] = useState(false)
  const [user, setUser] = useState<{ name: string; email: string } | null>(null)
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null)

  // Check if splash was already shown this session
  useEffect(() => {
    const splashShown = sessionStorage.getItem("bp_splash_shown")
    if (splashShown) {
      setShowSplash(false)
    }
  }, [])

  const handleSplashComplete = useCallback(() => {
    setShowSplash(false)
    sessionStorage.setItem("bp_splash_shown", "true")
  }, [])

  // Load cart and user from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("bp_cart")
    if (savedCart) {
      setCart(JSON.parse(savedCart))
    }
    const savedUser = localStorage.getItem("bp_user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("bp_cart", JSON.stringify(cart))
  }, [cart])

  // Scroll progress
  useEffect(() => {
    if (showSplash) return
    
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (scrollTop / docHeight) * 100
      setScrollProgress(progress)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [showSplash])

  const showToast = useCallback((message: string) => {
    setToastMessage(message)
    setIsToastVisible(true)
  }, [])

  const requireAuth = useCallback((action: () => void) => {
    if (user) {
      action()
    } else {
      setPendingAction(() => action)
      setIsAuthModalOpen(true)
    }
  }, [user])

  const handleLoginSuccess = useCallback((loggedInUser: { name: string; email: string }) => {
    setUser(loggedInUser)
    showToast(`Bienvenido/a, ${loggedInUser.name}!`)
    if (pendingAction) {
      pendingAction()
      setPendingAction(null)
    }
  }, [pendingAction, showToast])

  const handleLogout = useCallback(() => {
    localStorage.removeItem("bp_user")
    setUser(null)
    showToast("Sesion cerrada correctamente")
  }, [showToast])

  const handleAddToCart = useCallback((product: Product) => {
    requireAuth(() => {
      setCart((prev) => {
        const existing = prev.find((item) => item.id === product.id && item.type === "merch")
        if (existing) {
          return prev.map((item) =>
            item.id === product.id && item.type === "merch"
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        }
        return [...prev, { ...product, quantity: 1, type: "merch" as const }]
      })
      showToast(`"${product.name}" agregado al carrito`)
    })
  }, [requireAuth, showToast])

  const handleBuyTicket = useCallback((ticket: { id: number; name: string; price: number }) => {
    requireAuth(() => {
      setCart((prev) => {
        const existing = prev.find((item) => item.id === ticket.id && item.type === "ticket")
        if (existing) {
          if (existing.quantity >= 8) {
            showToast("Maximo 8 tickets por tipo")
            return prev
          }
          return prev.map((item) =>
            item.id === ticket.id && item.type === "ticket"
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        }
        return [...prev, { 
          id: ticket.id, 
          name: ticket.name, 
          price: ticket.price, 
          quantity: 1, 
          type: "ticket" as const,
          image: ""
        }]
      })
      showToast(`Ticket "${ticket.name}" agregado al carrito`)
    })
  }, [requireAuth, showToast])

  const handleUpdateQuantity = useCallback((id: number, type: "merch" | "ticket", delta: number) => {
    setCart((prev) => {
      return prev.map((item) => {
        if (item.id === id && item.type === type) {
          const newQuantity = item.quantity + delta
          if (type === "ticket" && newQuantity > 8) {
            showToast("Maximo 8 tickets por tipo")
            return item
          }
          if (newQuantity <= 0) return item
          return { ...item, quantity: newQuantity }
        }
        return item
      })
    })
  }, [showToast])

  const handleRemoveItem = useCallback((id: number, type: "merch" | "ticket") => {
    setCart((prev) => prev.filter((item) => !(item.id === id && item.type === type)))
  }, [])

  const handleCheckout = useCallback(() => {
    if (cart.length === 0) {
      showToast("Agrega productos antes de continuar")
      return
    }
    requireAuth(() => {
      setIsCartOpen(false)
      setIsCheckoutOpen(true)
    })
  }, [requireAuth, cart.length, showToast])

  const handleCheckoutComplete = useCallback(() => {
    setCart([])
    showToast("Compra realizada con exito! Revisa tus tickets.")
  }, [showToast])

  const closeToast = useCallback(() => {
    setIsToastVisible(false)
  }, [])

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  // Show splash screen
  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] overflow-x-hidden">
      {/* Scroll Progress Bar */}
      <div 
        className="scroll-progress" 
        style={{ width: `${scrollProgress}%` }} 
      />

      {/* Floating Particles */}
      <FloatingParticles />

      {/* Cursor Trail Effect - Hidden on mobile for performance */}
      <div className="hidden lg:block">
        <CursorTrail />
      </div>

      {/* Navigation */}
      <Navbar 
        cartCount={cartCount} 
        user={user}
        onCartClick={() => setIsCartOpen(true)}
        onLoginClick={() => setIsAuthModalOpen(true)}
        onLogout={handleLogout}
        onMyTicketsClick={() => setIsMyTicketsOpen(true)}
      />

      {/* Hero Section */}
      <HeroSection />

      {/* News Ticker */}
      <NewsTicker />

      {/* Countdown */}
      <ScrollReveal>
        <CountdownSection />
      </ScrollReveal>

      {/* Lineup / Setlist */}
      <LineupSection />

      {/* Testimonials - NEW */}
      <ScrollReveal>
        <TestimonialsSection />
      </ScrollReveal>

      {/* Gallery */}
      <ScrollReveal>
        <GallerySection />
      </ScrollReveal>

      {/* Videos */}
      <ScrollReveal>
        <VideosSection />
      </ScrollReveal>

      {/* Spotify Section */}
      <ScrollReveal>
        <SpotifySection />
      </ScrollReveal>

      {/* Location */}
      <ScrollReveal>
        <LocationSection />
      </ScrollReveal>

      {/* Merchandise */}
      <ScrollReveal>
        <MerchSection onAddToCart={handleAddToCart} />
      </ScrollReveal>

      {/* Tickets */}
      <ScrollReveal>
        <TicketsSection onBuyTicket={handleBuyTicket} />
      </ScrollReveal>

      {/* FAQ */}
      <ScrollReveal>
        <FaqSection />
      </ScrollReveal>

      {/* Quiz Section - At the end */}
      <ScrollReveal>
        <QuizSection />
      </ScrollReveal>

      {/* Footer */}
      <Footer />

      {/* Back to Top Button */}
      <BackToTop />

      {/* Toast Notification */}
      <ToastNotification
        message={toastMessage}
        isVisible={isToastVisible}
        onClose={closeToast}
      />

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => {
          setIsAuthModalOpen(false)
          setPendingAction(null)
        }}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cart}
        user={user}
        onComplete={handleCheckoutComplete}
      />

      {/* My Tickets Modal */}
      <MyTicketsModal
        isOpen={isMyTicketsOpen}
        onClose={() => setIsMyTicketsOpen(false)}
      />
    </main>
  )
}
