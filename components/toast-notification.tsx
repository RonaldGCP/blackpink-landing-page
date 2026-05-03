"use client"

import { useEffect } from "react"
import { X, Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface ToastNotificationProps {
  message: string
  isVisible: boolean
  onClose: () => void
}

export function ToastNotification({ message, isVisible, onClose }: ToastNotificationProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose()
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [isVisible, onClose])

  return (
    <div
      className={cn(
        "fixed bottom-24 left-1/2 -translate-x-1/2 z-50 transition-all duration-300",
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-4 pointer-events-none"
      )}
    >
      <div className="glass-dark rounded-xl px-6 py-4 flex items-center gap-4 neon-border">
        <div className="w-8 h-8 bg-[#ff0080] rounded-full flex items-center justify-center">
          <Check className="w-5 h-5 text-white" />
        </div>
        <p className="text-white font-medium">{message}</p>
        <button
          onClick={onClose}
          className="text-white/60 hover:text-white transition-colors"
          aria-label="Cerrar"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}
