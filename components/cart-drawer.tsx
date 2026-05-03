"use client"

import { X, Plus, Minus, ShoppingCart, Trash2, Ticket, AlertTriangle } from "lucide-react"

export interface CartItem {
  id: number
  name: string
  price: number
  image?: string
  quantity: number
  type: "merch" | "ticket"
}

interface CartDrawerProps {
  isOpen: boolean
  onClose: () => void
  items: CartItem[]
  onUpdateQuantity: (id: number, type: "merch" | "ticket", delta: number) => void
  onRemoveItem: (id: number, type: "merch" | "ticket") => void
  onCheckout: () => void
  hasTickets?: boolean
}

function formatPrice(price: number): string {
  return price.toLocaleString('es-CO')
}

export function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}: CartDrawerProps) {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const hasTickets = items.some((item) => item.type === "ticket")

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/60 z-[90] transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-[#0f0f0f] z-[95] transform transition-transform duration-300 ease-out flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#e0457b]/20">
          <div className="flex items-center gap-3">
            <ShoppingCart className="w-6 h-6 text-[#e0457b]" />
            <h2 className="font-[var(--font-bebas)] text-2xl text-white tracking-wider">
              Tu Carrito
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-white/60 hover:text-white transition-colors"
            aria-label="Cerrar carrito"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingCart className="w-16 h-16 text-white/20 mb-4" />
              <p className="text-white/60 text-lg mb-2">Tu carrito esta vacio</p>
              <p className="text-white/40 text-sm mb-6">Agrega productos o tickets para continuar</p>
              <a
                href="#merch"
                onClick={onClose}
                className="px-6 py-3 bg-[#e0457b] text-white font-semibold rounded-lg hover:bg-[#e0457b]/90 transition-colors"
              >
                Ver Merch
              </a>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Ticket warning */}
              {hasTickets && (
                <div className="flex items-start gap-3 p-3 bg-[#d4af37]/10 border border-[#d4af37]/30 rounded-lg">
                  <AlertTriangle className="w-5 h-5 text-[#d4af37] flex-shrink-0 mt-0.5" />
                  <p className="text-[#d4af37] text-sm">
                    Los tickets son nominales. Recuerda llevar tu documento de identidad el dia del evento.
                  </p>
                </div>
              )}

              {/* Items */}
              {items.map((item) => (
                <div
                  key={`${item.type}-${item.id}`}
                  className="flex gap-4 p-3 glass rounded-xl"
                >
                  {/* Image or Icon */}
                  <div className="w-20 h-20 rounded-lg overflow-hidden bg-[#1a1a1a] flex-shrink-0 flex items-center justify-center">
                    {item.type === "ticket" ? (
                      <Ticket className="w-8 h-8 text-[#e0457b]" />
                    ) : item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.style.display = "none"
                        }}
                      />
                    ) : (
                      <ShoppingCart className="w-8 h-8 text-[#e0457b]" />
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-semibold text-sm line-clamp-2 mb-1">
                      {item.name}
                    </h3>
                    <p className="text-[#e0457b] font-bold text-sm">
                      ${formatPrice(item.price)} <span className="text-white/50 font-normal">COP</span>
                    </p>
                    
                    {/* Quantity controls */}
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.type, -1)}
                          disabled={item.quantity <= 1}
                          className="w-7 h-7 rounded-full border border-[#e0457b]/30 flex items-center justify-center text-white/60 hover:text-white hover:border-[#e0457b] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-white w-6 text-center text-sm">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.type, 1)}
                          disabled={item.type === "ticket" && item.quantity >= 8}
                          className="w-7 h-7 rounded-full border border-[#e0457b]/30 flex items-center justify-center text-white/60 hover:text-white hover:border-[#e0457b] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <button
                        onClick={() => onRemoveItem(item.id, item.type)}
                        className="p-1.5 text-white/40 hover:text-red-400 transition-colors"
                        aria-label="Eliminar"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Subtotal */}
                    <p className="text-white/50 text-xs mt-1">
                      Subtotal: ${formatPrice(item.price * item.quantity)} COP
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-4 border-t border-[#e0457b]/20 space-y-4">
            {/* Total */}
            <div className="flex items-center justify-between">
              <span className="text-white/60">Total:</span>
              <span className="text-2xl font-bold text-[#e0457b]">
                ${formatPrice(total)} <span className="text-sm text-white/50 font-normal">COP</span>
              </span>
            </div>

            {/* Buttons */}
            <button
              onClick={onCheckout}
              className="w-full py-4 bg-[#e0457b] text-white font-semibold uppercase tracking-wider rounded-lg pulse-neon hover:bg-[#e0457b]/90 transition-colors"
            >
              Proceder al Pago
            </button>
            <button
              onClick={onClose}
              className="w-full py-3 border border-[#e0457b]/30 text-white/80 font-semibold uppercase tracking-wider rounded-lg hover:bg-white/5 transition-colors"
            >
              Seguir Comprando
            </button>
          </div>
        )}
      </div>
    </>
  )
}
