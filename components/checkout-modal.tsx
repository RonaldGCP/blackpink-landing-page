"use client"

import { useState, useEffect, useRef } from "react"
import { X, CreditCard, Smartphone, Check, Download, Share2, ChevronLeft, ChevronRight, Loader2, AlertCircle } from "lucide-react"
import { QRCodeSVG } from "qrcode.react"
import type { CartItem } from "./cart-drawer"

interface CheckoutModalProps {
  isOpen: boolean
  onClose: () => void
  items: CartItem[]
  user: { name: string; email: string } | null
  onComplete: () => void
}

interface PersonalData {
  fullName: string
  document: string
  email: string
  phone: string
}

interface FormErrors {
  fullName?: string
  document?: string
  email?: string
  phone?: string
}

interface GeneratedTicket {
  id: string
  ticketNumber: string
  attendeeName: string
  document: string
  ticketType: string
  date: string
  venue: string
  time: string
  qrData: string
  createdAt: string
}

interface OrderData {
  orderNumber: string
  items: CartItem[]
  total: number
  personalData: PersonalData
  paymentMethod: string
  createdAt: string
  tickets: GeneratedTicket[]
}

const paymentMethods = [
  { id: "pse", name: "PSE - Pagos Seguros en Linea", icon: Smartphone },
  { id: "nequi", name: "Nequi", icon: Smartphone },
  { id: "daviplata", name: "Daviplata", icon: Smartphone },
  { id: "card", name: "Tarjeta de Credito/Debito", icon: CreditCard },
]

function formatPrice(price: number): string {
  return price.toLocaleString("es-CO")
}

function generateOrderNumber(): string {
  const random = Math.random().toString(36).substring(2, 7).toUpperCase()
  return `BP-2025-${random}`
}

function generateTicketNumber(): string {
  const random = Math.random().toString(36).substring(2, 7).toUpperCase()
  return `TKT-${random}`
}

function validateEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email)
}

function validateExpiryDate(expiry: string): boolean {
  if (expiry.length !== 5) return false
  const [month, year] = expiry.split("/")
  const numMonth = parseInt(month, 10)
  const numYear = parseInt("20" + year, 10)
  
  if (numMonth < 1 || numMonth > 12) return false
  
  const now = new Date()
  const expiryDate = new Date(numYear, numMonth - 1)
  return expiryDate > now
}

export function CheckoutModal({ isOpen, onClose, items, user, onComplete }: CheckoutModalProps) {
  const [step, setStep] = useState(1)
  const [personalData, setPersonalData] = useState<PersonalData>({
    fullName: user?.name || "",
    document: "",
    email: user?.email || "",
    phone: "",
  })
  const [formErrors, setFormErrors] = useState<FormErrors>({})
  const [selectedPayment, setSelectedPayment] = useState("")
  const [cardData, setCardData] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
  })
  const [cardErrors, setCardErrors] = useState<{ [key: string]: string }>({})
  const [isCardFlipped, setIsCardFlipped] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [generatedTickets, setGeneratedTickets] = useState<GeneratedTicket[]>([])
  const [currentTicketIndex, setCurrentTicketIndex] = useState(0)
  const [showConfetti, setShowConfetti] = useState(false)
  const [orderNumber, setOrderNumber] = useState("")
  const ticketRef = useRef<HTMLDivElement>(null)

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const ticketItems = items.filter((item) => item.type === "ticket")

  useEffect(() => {
    if (user) {
      setPersonalData((prev) => ({
        ...prev,
        fullName: user.name,
        email: user.email,
      }))
    }
  }, [user])

  useEffect(() => {
    if (!isOpen) {
      // Reset all state when modal closes
      setStep(1)
      setSelectedPayment("")
      setCardData({ number: "", name: "", expiry: "", cvv: "" })
      setCardErrors({})
      setFormErrors({})
      setIsCardFlipped(false)
      setIsProcessing(false)
      setGeneratedTickets([])
      setCurrentTicketIndex(0)
      setShowConfetti(false)
      setOrderNumber("")
    }
  }, [isOpen])

  const validatePersonalData = (): boolean => {
    const errors: FormErrors = {}
    
    // Validate name (minimum 3 characters)
    if (!personalData.fullName || personalData.fullName.trim().length < 3) {
      errors.fullName = "El nombre debe tener al menos 3 caracteres"
    }
    
    // Validate document (only numbers, minimum 6 digits)
    const docNumbers = personalData.document.replace(/\D/g, "")
    if (!docNumbers || docNumbers.length < 6) {
      errors.document = "El documento debe tener al menos 6 digitos"
    }
    
    // Validate email
    if (!personalData.email || !validateEmail(personalData.email)) {
      errors.email = "Ingresa un correo electronico valido"
    }
    
    // Validate phone (only numbers, minimum 10 digits)
    const phoneNumbers = personalData.phone.replace(/\D/g, "")
    if (!phoneNumbers || phoneNumbers.length < 10) {
      errors.phone = "El telefono debe tener al menos 10 digitos"
    }
    
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const validateCardData = (): boolean => {
    const errors: { [key: string]: string } = {}
    
    // Validate card number (16 digits)
    const cardNumbers = cardData.number.replace(/\s/g, "")
    if (cardNumbers.length < 16) {
      errors.number = "Numero de tarjeta incompleto"
    }
    
    // Validate name
    if (!cardData.name || cardData.name.trim().length < 3) {
      errors.name = "Ingresa el nombre del titular"
    }
    
    // Validate expiry
    if (!cardData.expiry || cardData.expiry.length < 5) {
      errors.expiry = "Fecha incompleta"
    } else if (!validateExpiryDate(cardData.expiry)) {
      errors.expiry = "Tarjeta vencida"
    }
    
    // Validate CVV
    if (!cardData.cvv || cardData.cvv.length < 3) {
      errors.cvv = "CVV incompleto"
    }
    
    setCardErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleContinueFromPersonalData = () => {
    if (validatePersonalData()) {
      setStep(3)
    }
  }

  const handlePayment = async () => {
    // Validate card data if card is selected
    if (selectedPayment === "card" && !validateCardData()) {
      return
    }
    
    setIsProcessing(true)
    
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))
    
    // Generate order number
    const newOrderNumber = generateOrderNumber()
    setOrderNumber(newOrderNumber)
    
    // Generate tickets for ticket items only
    const tickets: GeneratedTicket[] = []
    ticketItems.forEach((item) => {
      for (let i = 0; i < item.quantity; i++) {
        const ticketNumber = generateTicketNumber()
        const ticket: GeneratedTicket = {
          id: `${Date.now()}-${Math.random().toString(36).substring(7)}`,
          ticketNumber,
          attendeeName: personalData.fullName,
          document: personalData.document,
          ticketType: item.name,
          date: "Miercoles 7 de octubre de 2026",
          venue: "Estadio El Campin, Bogota, Colombia",
          time: "Puertas 6:00 PM | Show 9:00 PM",
          qrData: JSON.stringify({
            orderNumber: newOrderNumber,
            ticketNumber,
            name: personalData.fullName,
            document: personalData.document,
            type: item.name,
            event: "BLACKPINK WORLD TOUR 2026",
            date: "2026-10-07",
            venue: "Estadio El Campin",
          }),
          createdAt: new Date().toISOString(),
        }
        tickets.push(ticket)
      }
    })

    // Save order to localStorage
    const orderData: OrderData = {
      orderNumber: newOrderNumber,
      items: [...items],
      total,
      personalData,
      paymentMethod: selectedPayment,
      createdAt: new Date().toISOString(),
      tickets,
    }
    
    const existingOrders = JSON.parse(localStorage.getItem("bp_orders") || "[]")
    localStorage.setItem("bp_orders", JSON.stringify([...existingOrders, orderData]))

    // Save tickets separately for easy access
    const existingTickets = JSON.parse(localStorage.getItem("bp_tickets") || "[]")
    localStorage.setItem("bp_tickets", JSON.stringify([...existingTickets, ...tickets]))

    setGeneratedTickets(tickets)
    setIsProcessing(false)
    setShowConfetti(true)
    setStep(4)
  }

  const downloadTicket = async (format: "png" | "pdf") => {
    if (!ticketRef.current) return

    const html2canvas = (await import("html2canvas")).default
    const canvas = await html2canvas(ticketRef.current, {
      backgroundColor: "#0a0a0a",
      scale: 2,
    })

    if (format === "png") {
      const link = document.createElement("a")
      link.download = `BLACKPINK-Ticket-${generatedTickets[currentTicketIndex]?.ticketNumber}.png`
      link.href = canvas.toDataURL("image/png")
      link.click()
    } else {
      const { jsPDF } = await import("jspdf")
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "px",
        format: [canvas.width / 2, canvas.height / 2],
      })
      pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, 0, canvas.width / 2, canvas.height / 2)
      pdf.save(`BLACKPINK-Ticket-${generatedTickets[currentTicketIndex]?.ticketNumber}.pdf`)
    }
  }

  const downloadAllTickets = async () => {
    if (generatedTickets.length === 0) return
    
    for (let i = 0; i < generatedTickets.length; i++) {
      setCurrentTicketIndex(i)
      await new Promise(resolve => setTimeout(resolve, 500))
      await downloadTicket("png")
    }
    setCurrentTicketIndex(0)
  }

  const shareTicket = async () => {
    const ticket = generatedTickets[currentTicketIndex]
    const text = `¡Tengo mi ticket para BLACKPINK WORLD TOUR 2026! 🖤🩷\n\nTicket: ${ticket?.ticketNumber}\nTipo: ${ticket?.ticketType}\nFecha: 7 de octubre de 2026\nLugar: Estadio El Campin, Bogota`
    
    if (navigator.share) {
      await navigator.share({ title: "Mi Ticket BLACKPINK", text })
    } else {
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`
      window.open(whatsappUrl, "_blank")
    }
  }

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ""
    const parts = []
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    return parts.length ? parts.join(" ") : value
  }

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4)
    }
    return v
  }

  const handleFinish = () => {
    onComplete()
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

      {/* Confetti */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-[101] overflow-hidden">
          {Array.from({ length: 60 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-3 h-3 rounded-sm"
              style={{
                left: `${Math.random() * 100}%`,
                top: "-20px",
                backgroundColor: i % 3 === 0 ? "#e0457b" : i % 3 === 1 ? "#0a0a0a" : "#f082ac",
                animation: `confetti-fall ${2 + Math.random() * 2}s linear forwards`,
                animationDelay: `${Math.random() * 1}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Modal */}
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto glass rounded-2xl z-[102]">
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between p-4 border-b border-[#e0457b]/20 bg-[#0f0f0f]/95 backdrop-blur-md z-10">
          <div className="flex items-center gap-4">
            {step > 1 && step < 4 && (
              <button onClick={() => setStep(step - 1)} className="text-white/60 hover:text-white">
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}
            <h2 className="font-[var(--font-bebas)] text-xl text-white tracking-wider">
              {step === 1 && "Resumen del Pedido"}
              {step === 2 && "Datos Personales"}
              {step === 3 && "Metodo de Pago"}
              {step === 4 && "Confirmacion"}
            </h2>
          </div>
          <button onClick={onClose} className="text-white/60 hover:text-white p-1">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Progress bar */}
        {step < 4 && (
          <div className="flex gap-2 p-4">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`flex-1 h-1 rounded-full transition-colors ${
                  s <= step ? "bg-[#e0457b]" : "bg-white/20"
                }`}
              />
            ))}
          </div>
        )}

        {/* Content */}
        <div className="p-4 md:p-6">
          {/* Step 1: Order Summary */}
          {step === 1 && (
            <div className="space-y-4">
              {items.length === 0 ? (
                <div className="text-center py-8">
                  <AlertCircle className="w-16 h-16 text-[#e0457b]/50 mx-auto mb-4" />
                  <p className="text-white/60 text-lg">Agrega productos antes de continuar</p>
                </div>
              ) : (
                <>
                  {items.map((item) => (
                    <div key={`${item.type}-${item.id}`} className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                      <div>
                        <p className="text-white font-medium">{item.name}</p>
                        <p className="text-white/60 text-sm">Cantidad: {item.quantity}</p>
                      </div>
                      <p className="text-[#e0457b] font-bold">${formatPrice(item.price * item.quantity)} COP</p>
                    </div>
                  ))}
                  <div className="border-t border-white/10 pt-4 mt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-white text-lg font-semibold">Total:</span>
                      <span className="text-[#e0457b] text-2xl font-bold">${formatPrice(total)} COP</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setStep(2)}
                    className="w-full py-4 bg-[#e0457b] text-white font-semibold uppercase tracking-wider rounded-lg hover:bg-[#e0457b]/90 transition-colors"
                  >
                    Continuar
                  </button>
                </>
              )}
            </div>
          )}

          {/* Step 2: Personal Data */}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <label className="block text-white/80 text-sm mb-2">Nombre completo *</label>
                <input
                  type="text"
                  value={personalData.fullName}
                  onChange={(e) => {
                    setPersonalData({ ...personalData, fullName: e.target.value })
                    if (formErrors.fullName) setFormErrors({ ...formErrors, fullName: undefined })
                  }}
                  className={`w-full px-4 py-3 bg-white/5 border rounded-lg text-white focus:outline-none ${
                    formErrors.fullName ? "border-red-500 focus:border-red-500" : "border-white/10 focus:border-[#e0457b]"
                  }`}
                  placeholder="Tu nombre completo"
                />
                {formErrors.fullName && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.fullName}</p>
                )}
              </div>
              <div>
                <label className="block text-white/80 text-sm mb-2">Numero de documento (Cedula) *</label>
                <input
                  type="text"
                  value={personalData.document}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "")
                    setPersonalData({ ...personalData, document: value })
                    if (formErrors.document) setFormErrors({ ...formErrors, document: undefined })
                  }}
                  className={`w-full px-4 py-3 bg-white/5 border rounded-lg text-white focus:outline-none ${
                    formErrors.document ? "border-red-500 focus:border-red-500" : "border-white/10 focus:border-[#e0457b]"
                  }`}
                  placeholder="Tu numero de cedula"
                />
                {formErrors.document && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.document}</p>
                )}
              </div>
              <div>
                <label className="block text-white/80 text-sm mb-2">Correo electronico *</label>
                <input
                  type="email"
                  value={personalData.email}
                  onChange={(e) => {
                    setPersonalData({ ...personalData, email: e.target.value })
                    if (formErrors.email) setFormErrors({ ...formErrors, email: undefined })
                  }}
                  className={`w-full px-4 py-3 bg-white/5 border rounded-lg text-white focus:outline-none ${
                    formErrors.email ? "border-red-500 focus:border-red-500" : "border-white/10 focus:border-[#e0457b]"
                  }`}
                  placeholder="tu@email.com"
                />
                {formErrors.email && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
                )}
              </div>
              <div>
                <label className="block text-white/80 text-sm mb-2">Telefono celular *</label>
                <input
                  type="tel"
                  value={personalData.phone}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "")
                    setPersonalData({ ...personalData, phone: value })
                    if (formErrors.phone) setFormErrors({ ...formErrors, phone: undefined })
                  }}
                  className={`w-full px-4 py-3 bg-white/5 border rounded-lg text-white focus:outline-none ${
                    formErrors.phone ? "border-red-500 focus:border-red-500" : "border-white/10 focus:border-[#e0457b]"
                  }`}
                  placeholder="3001234567"
                />
                {formErrors.phone && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.phone}</p>
                )}
              </div>
              <button
                onClick={handleContinueFromPersonalData}
                className="w-full py-4 bg-[#e0457b] text-white font-semibold uppercase tracking-wider rounded-lg hover:bg-[#e0457b]/90 transition-colors"
              >
                Continuar
              </button>
            </div>
          )}

          {/* Step 3: Payment Method */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-3">
                {paymentMethods.map((method) => (
                  <button
                    key={method.id}
                    onClick={() => {
                      setSelectedPayment(method.id)
                      setCardErrors({})
                    }}
                    className={`p-4 rounded-lg border-2 transition-all text-left ${
                      selectedPayment === method.id
                        ? "border-[#e0457b] bg-[#e0457b]/10"
                        : "border-white/10 hover:border-white/30"
                    }`}
                  >
                    <method.icon className={`w-6 h-6 mb-2 ${selectedPayment === method.id ? "text-[#e0457b]" : "text-white/60"}`} />
                    <p className={`text-sm ${selectedPayment === method.id ? "text-white" : "text-white/80"}`}>{method.name}</p>
                  </button>
                ))}
              </div>

              {/* PSE/Nequi/Daviplata Message */}
              {selectedPayment && selectedPayment !== "card" && (
                <div className="p-4 bg-[#e0457b]/10 border border-[#e0457b]/30 rounded-lg">
                  <p className="text-white text-center">
                    Seras redirigido a <span className="font-bold text-[#e0457b]">
                      {selectedPayment === "pse" ? "PSE" : selectedPayment === "nequi" ? "Nequi" : "Daviplata"}
                    </span> para completar el pago
                  </p>
                </div>
              )}

              {/* Card Form */}
              {selectedPayment === "card" && (
                <div className="space-y-4">
                  {/* 3D Card Preview */}
                  <div className="relative h-48 perspective-[1000px] mx-auto" style={{ maxWidth: "320px" }}>
                    <div
                      className={`relative w-full h-full transition-transform duration-700 preserve-3d ${
                        isCardFlipped ? "[transform:rotateY(180deg)]" : ""
                      }`}
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      {/* Front */}
                      <div
                        className="absolute inset-0 w-full h-full rounded-xl p-5 bg-gradient-to-br from-[#1a1a1a] via-[#2a2a2a] to-[#1a1a1a] border border-[#e0457b]/30"
                        style={{ backfaceVisibility: "hidden" }}
                      >
                        <div className="flex justify-between items-start mb-8">
                          <div className="w-12 h-8 rounded bg-gradient-to-br from-yellow-400 to-yellow-600" />
                          <p className="font-[var(--font-bebas)] text-[#e0457b] text-xl">BLACKPINK</p>
                        </div>
                        <p className="font-mono text-white text-lg tracking-wider mb-6">
                          {cardData.number || "**** **** **** ****"}
                        </p>
                        <div className="flex justify-between">
                          <div>
                            <p className="text-white/40 text-xs">TITULAR</p>
                            <p className="text-white text-sm uppercase">{cardData.name || "NOMBRE"}</p>
                          </div>
                          <div>
                            <p className="text-white/40 text-xs">VENCE</p>
                            <p className="text-white text-sm">{cardData.expiry || "MM/YY"}</p>
                          </div>
                        </div>
                      </div>
                      {/* Back */}
                      <div
                        className="absolute inset-0 w-full h-full rounded-xl bg-gradient-to-br from-[#1a1a1a] via-[#2a2a2a] to-[#1a1a1a] border border-[#e0457b]/30 [transform:rotateY(180deg)]"
                        style={{ backfaceVisibility: "hidden" }}
                      >
                        <div className="w-full h-10 bg-black/50 mt-6" />
                        <div className="px-5 mt-4">
                          <div className="flex items-center justify-end">
                            <div className="bg-white/80 h-8 w-16 flex items-center justify-center font-mono text-gray-800">
                              {cardData.cvv || "***"}
                            </div>
                          </div>
                          <p className="text-white/40 text-xs text-right mt-1">CVV</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card form fields */}
                  <div className="space-y-3">
                    <div>
                      <input
                        type="text"
                        value={cardData.number}
                        onChange={(e) => {
                          setCardData({ ...cardData, number: formatCardNumber(e.target.value) })
                          if (cardErrors.number) setCardErrors({ ...cardErrors, number: "" })
                        }}
                        maxLength={19}
                        className={`w-full px-4 py-3 bg-white/5 border rounded-lg text-white focus:outline-none font-mono ${
                          cardErrors.number ? "border-red-500" : "border-white/10 focus:border-[#e0457b]"
                        }`}
                        placeholder="Numero de tarjeta"
                        onFocus={() => setIsCardFlipped(false)}
                      />
                      {cardErrors.number && <p className="text-red-500 text-sm mt-1">{cardErrors.number}</p>}
                    </div>
                    <div>
                      <input
                        type="text"
                        value={cardData.name}
                        onChange={(e) => {
                          const value = e.target.value.replace(/[^a-zA-Z\s]/g, "").toUpperCase()
                          setCardData({ ...cardData, name: value })
                          if (cardErrors.name) setCardErrors({ ...cardErrors, name: "" })
                        }}
                        className={`w-full px-4 py-3 bg-white/5 border rounded-lg text-white focus:outline-none uppercase ${
                          cardErrors.name ? "border-red-500" : "border-white/10 focus:border-[#e0457b]"
                        }`}
                        placeholder="Nombre en la tarjeta"
                        onFocus={() => setIsCardFlipped(false)}
                      />
                      {cardErrors.name && <p className="text-red-500 text-sm mt-1">{cardErrors.name}</p>}
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <input
                          type="text"
                          value={cardData.expiry}
                          onChange={(e) => {
                            setCardData({ ...cardData, expiry: formatExpiry(e.target.value) })
                            if (cardErrors.expiry) setCardErrors({ ...cardErrors, expiry: "" })
                          }}
                          maxLength={5}
                          className={`w-full px-4 py-3 bg-white/5 border rounded-lg text-white focus:outline-none font-mono ${
                            cardErrors.expiry ? "border-red-500" : "border-white/10 focus:border-[#e0457b]"
                          }`}
                          placeholder="MM/YY"
                          onFocus={() => setIsCardFlipped(false)}
                        />
                        {cardErrors.expiry && <p className="text-red-500 text-sm mt-1">{cardErrors.expiry}</p>}
                      </div>
                      <div>
                        <input
                          type="text"
                          value={cardData.cvv}
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, "").slice(0, 4)
                            setCardData({ ...cardData, cvv: value })
                            if (cardErrors.cvv) setCardErrors({ ...cardErrors, cvv: "" })
                          }}
                          maxLength={4}
                          className={`w-full px-4 py-3 bg-white/5 border rounded-lg text-white focus:outline-none font-mono ${
                            cardErrors.cvv ? "border-red-500" : "border-white/10 focus:border-[#e0457b]"
                          }`}
                          placeholder="CVV"
                          onFocus={() => setIsCardFlipped(true)}
                          onBlur={() => setIsCardFlipped(false)}
                        />
                        {cardErrors.cvv && <p className="text-red-500 text-sm mt-1">{cardErrors.cvv}</p>}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <button
                onClick={handlePayment}
                disabled={!selectedPayment || isProcessing}
                className="w-full py-4 bg-[#e0457b] text-white font-semibold uppercase tracking-wider rounded-lg hover:bg-[#e0457b]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Procesando...
                  </>
                ) : (
                  `PAGAR ${formatPrice(total)} COP`
                )}
              </button>
            </div>
          )}

          {/* Step 4: Confirmation */}
          {step === 4 && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-[#e0457b]/20 flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-[#e0457b]" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  ¡Felicitaciones {personalData.fullName.split(" ")[0]}!
                </h3>
                <p className="text-white/60 mb-2">Eres oficialmente un BLINK 🖤🩷</p>
                <p className="text-[#d4af37] font-mono font-bold text-lg">
                  Orden: {orderNumber}
                </p>
              </div>

              {/* Order Summary */}
              <div className="p-4 bg-white/5 rounded-lg space-y-2">
                <p className="text-white/60 text-sm font-semibold mb-2">Resumen de compra:</p>
                {items.map((item) => (
                  <div key={`${item.type}-${item.id}`} className="flex justify-between text-sm">
                    <span className="text-white/80">{item.name} x{item.quantity}</span>
                    <span className="text-white">${formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
                <div className="border-t border-white/10 pt-2 mt-2 flex justify-between">
                  <span className="text-white font-semibold">Total pagado:</span>
                  <span className="text-[#e0457b] font-bold">${formatPrice(total)} COP</span>
                </div>
              </div>

              {/* Ticket Preview (if tickets were purchased) */}
              {generatedTickets.length > 0 && (
                <>
                  {/* Ticket Carousel */}
                  {generatedTickets.length > 1 && (
                    <div className="flex items-center justify-center gap-4">
                      <button
                        onClick={() => setCurrentTicketIndex(Math.max(0, currentTicketIndex - 1))}
                        disabled={currentTicketIndex === 0}
                        className="p-2 text-white/60 hover:text-white disabled:opacity-30"
                      >
                        <ChevronLeft className="w-6 h-6" />
                      </button>
                      <span className="text-white/60">
                        Ticket {currentTicketIndex + 1} de {generatedTickets.length}
                      </span>
                      <button
                        onClick={() => setCurrentTicketIndex(Math.min(generatedTickets.length - 1, currentTicketIndex + 1))}
                        disabled={currentTicketIndex === generatedTickets.length - 1}
                        className="p-2 text-white/60 hover:text-white disabled:opacity-30"
                      >
                        <ChevronRight className="w-6 h-6" />
                      </button>
                    </div>
                  )}

                  {/* Ticket Preview */}
                  <div
                    ref={ticketRef}
                    className="relative bg-[#0a0a0a] rounded-xl overflow-hidden border border-[#e0457b]/30"
                  >
                    {/* Decorative side stripe */}
                    <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-b from-[#e0457b] via-[#f082ac] to-[#e0457b]" />
                    
                    <div className="p-6 pl-8">
                      {/* Header */}
                      <div className="text-center mb-4">
                        <h4 className="font-[var(--font-bebas)] text-3xl text-[#e0457b] tracking-wider">BLACKPINK</h4>
                        <p className="text-white/60 text-sm tracking-widest">BORN PINK FOREVER WORLD TOUR 2026</p>
                      </div>

                      <div className="h-px bg-gradient-to-r from-transparent via-[#e0457b]/50 to-transparent mb-4" />

                      <div className="grid grid-cols-[1fr,auto] gap-4">
                        {/* Ticket Info */}
                        <div className="space-y-2 text-sm">
                          <div>
                            <span className="text-white/40">Nombre:</span>
                            <p className="text-white font-semibold">{generatedTickets[currentTicketIndex]?.attendeeName}</p>
                          </div>
                          <div>
                            <span className="text-white/40">Documento:</span>
                            <p className="text-white font-semibold">{generatedTickets[currentTicketIndex]?.document}</p>
                          </div>
                          <div>
                            <span className="text-white/40">Tipo:</span>
                            <p className="text-[#e0457b] font-bold">{generatedTickets[currentTicketIndex]?.ticketType}</p>
                          </div>
                          <div>
                            <span className="text-white/40">Fecha:</span>
                            <p className="text-white">{generatedTickets[currentTicketIndex]?.date}</p>
                          </div>
                          <div>
                            <span className="text-white/40">Lugar:</span>
                            <p className="text-white">{generatedTickets[currentTicketIndex]?.venue}</p>
                          </div>
                          <div>
                            <span className="text-white/40">Hora:</span>
                            <p className="text-white">{generatedTickets[currentTicketIndex]?.time}</p>
                          </div>
                          <div>
                            <span className="text-white/40">Ticket #:</span>
                            <p className="text-[#d4af37] font-mono font-bold">{generatedTickets[currentTicketIndex]?.ticketNumber}</p>
                          </div>
                        </div>

                        {/* QR Code */}
                        <div className="flex flex-col items-center">
                          <div className="p-2 bg-white rounded-lg">
                            <QRCodeSVG
                              value={generatedTickets[currentTicketIndex]?.qrData || ""}
                              size={100}
                              level="H"
                            />
                          </div>
                          <p className="text-white/40 text-xs mt-2">Escanea para verificar</p>
                        </div>
                      </div>

                      {/* Footer */}
                      <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
                        <p className="text-white/40 text-xs">Ticket nominal - presentar documento de identidad</p>
                        <div className="w-12 h-12 rounded-full border-2 border-[#e0457b]/50 flex items-center justify-center">
                          <span className="text-[#e0457b] text-[6px] text-center leading-tight font-bold">OFFICIAL<br/>2026</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Download Buttons */}
                  <div className="grid grid-cols-3 gap-3">
                    <button
                      onClick={() => downloadTicket("png")}
                      className="flex flex-col items-center gap-2 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                    >
                      <Download className="w-5 h-5 text-[#e0457b]" />
                      <span className="text-white text-xs">PNG</span>
                    </button>
                    <button
                      onClick={() => downloadTicket("pdf")}
                      className="flex flex-col items-center gap-2 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                    >
                      <Download className="w-5 h-5 text-[#e0457b]" />
                      <span className="text-white text-xs">PDF</span>
                    </button>
                    <button
                      onClick={shareTicket}
                      className="flex flex-col items-center gap-2 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                    >
                      <Share2 className="w-5 h-5 text-[#e0457b]" />
                      <span className="text-white text-xs">Compartir</span>
                    </button>
                  </div>

                  {generatedTickets.length > 1 && (
                    <button
                      onClick={downloadAllTickets}
                      className="w-full py-3 border border-[#e0457b]/30 text-white font-semibold rounded-lg hover:bg-white/5 transition-colors flex items-center justify-center gap-2"
                    >
                      <Download className="w-5 h-5" />
                      DESCARGAR TODOS MIS TICKETS
                    </button>
                  )}
                </>
              )}

              <button
                onClick={handleFinish}
                className="w-full py-4 bg-[#e0457b] text-white font-semibold uppercase tracking-wider rounded-lg hover:bg-[#e0457b]/90 transition-colors"
              >
                VOLVER AL INICIO
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
