"use client"

import { useState, useEffect, useRef } from "react"
import { X, Download, Share2, ChevronLeft, ChevronRight, Ticket } from "lucide-react"
import { QRCodeSVG } from "qrcode.react"

interface SavedTicket {
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

interface MyTicketsModalProps {
  isOpen: boolean
  onClose: () => void
}

export function MyTicketsModal({ isOpen, onClose }: MyTicketsModalProps) {
  const [tickets, setTickets] = useState<SavedTicket[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const ticketRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen) {
      const savedTickets = JSON.parse(localStorage.getItem("bp_tickets") || "[]")
      setTickets(savedTickets)
      setCurrentIndex(0)
    }
  }, [isOpen])

  const downloadTicket = async (format: "png" | "pdf") => {
    if (!ticketRef.current) return

    const html2canvas = (await import("html2canvas")).default
    const canvas = await html2canvas(ticketRef.current, {
      backgroundColor: "#0a0a0a",
      scale: 2,
    })

    if (format === "png") {
      const link = document.createElement("a")
      link.download = `BLACKPINK-Ticket-${tickets[currentIndex]?.ticketNumber}.png`
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
      pdf.save(`BLACKPINK-Ticket-${tickets[currentIndex]?.ticketNumber}.pdf`)
    }
  }

  const shareTicket = async () => {
    const ticket = tickets[currentIndex]
    const text = `Mi ticket para BLACKPINK WORLD TOUR 2025! ${ticket?.ticketNumber} - ${ticket?.ticketType}`
    
    if (navigator.share) {
      await navigator.share({ title: "BLACKPINK Ticket", text })
    } else {
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`
      window.open(whatsappUrl, "_blank")
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80" onClick={onClose} />

      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto glass rounded-2xl z-[101]">
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between p-4 border-b border-[#e0457b]/20 bg-[#0f0f0f]/90 backdrop-blur z-10">
          <div className="flex items-center gap-3">
            <Ticket className="w-6 h-6 text-[#e0457b]" />
            <h2 className="font-[var(--font-bebas)] text-xl text-white tracking-wider">
              Mis Tickets
            </h2>
          </div>
          <button onClick={onClose} className="text-white/60 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-4 md:p-6">
          {tickets.length === 0 ? (
            <div className="text-center py-12">
              <Ticket className="w-16 h-16 text-white/20 mx-auto mb-4" />
              <p className="text-white/60 text-lg mb-2">No tienes tickets</p>
              <p className="text-white/40 text-sm">Compra tus tickets para verlos aqui</p>
            </div>
          ) : (
            <>
              {/* Ticket navigation */}
              {tickets.length > 1 && (
                <div className="flex items-center justify-center gap-4 mb-4">
                  <button
                    onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
                    disabled={currentIndex === 0}
                    className="p-2 text-white/60 hover:text-white disabled:opacity-30"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <span className="text-white/60">
                    Ticket {currentIndex + 1} de {tickets.length}
                  </span>
                  <button
                    onClick={() => setCurrentIndex(Math.min(tickets.length - 1, currentIndex + 1))}
                    disabled={currentIndex === tickets.length - 1}
                    className="p-2 text-white/60 hover:text-white disabled:opacity-30"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>
              )}

              {/* Ticket */}
              <div
                ref={ticketRef}
                className="relative bg-[#0a0a0a] rounded-xl overflow-hidden border border-[#e0457b]/30"
              >
                <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-b from-[#e0457b] via-[#f082ac] to-[#e0457b]" />
                
                <div className="p-6 pl-8">
                  <div className="text-center mb-4">
                    <h4 className="font-[var(--font-bebas)] text-3xl text-[#e0457b] tracking-wider">BLACKPINK</h4>
                    <p className="text-white/60 text-sm tracking-widest">BORN PINK FOREVER WORLD TOUR 2025</p>
                  </div>

                  <div className="h-px bg-gradient-to-r from-transparent via-[#e0457b]/50 to-transparent mb-4" />

                  <div className="grid grid-cols-[1fr,auto] gap-4">
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="text-white/40">Nombre:</span>
                        <p className="text-white font-semibold">{tickets[currentIndex]?.attendeeName}</p>
                      </div>
                      <div>
                        <span className="text-white/40">Documento:</span>
                        <p className="text-white font-semibold">{tickets[currentIndex]?.document}</p>
                      </div>
                      <div>
                        <span className="text-white/40">Tipo:</span>
                        <p className="text-[#e0457b] font-bold">{tickets[currentIndex]?.ticketType}</p>
                      </div>
                      <div>
                        <span className="text-white/40">Fecha:</span>
                        <p className="text-white">{tickets[currentIndex]?.date}</p>
                      </div>
                      <div>
                        <span className="text-white/40">Lugar:</span>
                        <p className="text-white">{tickets[currentIndex]?.venue}</p>
                      </div>
                      <div>
                        <span className="text-white/40">Hora:</span>
                        <p className="text-white">{tickets[currentIndex]?.time}</p>
                      </div>
                      <div>
                        <span className="text-white/40">Ticket #:</span>
                        <p className="text-[#d4af37] font-mono font-bold">{tickets[currentIndex]?.ticketNumber}</p>
                      </div>
                    </div>

                    <div className="flex flex-col items-center">
                      <div className="p-2 bg-white rounded-lg">
                        <QRCodeSVG
                          value={tickets[currentIndex]?.qrData || ""}
                          size={100}
                          level="H"
                        />
                      </div>
                      <p className="text-white/40 text-xs mt-2">Escanea para verificar</p>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
                    <p className="text-white/40 text-xs">Ticket nominal - presentar documento de identidad</p>
                    <div className="w-12 h-12 rounded-full border-2 border-[#e0457b]/50 flex items-center justify-center">
                      <span className="text-[#e0457b] text-[6px] text-center leading-tight font-bold">OFFICIAL<br/>2025</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="grid grid-cols-3 gap-3 mt-4">
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
            </>
          )}
        </div>
      </div>
    </div>
  )
}
