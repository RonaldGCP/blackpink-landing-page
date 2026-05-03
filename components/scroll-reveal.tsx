"use client"

import { useEffect, useRef, useState, ReactNode } from "react"

interface ScrollRevealProps {
  children: ReactNode
  className?: string
  delay?: number
  direction?: "up" | "left" | "right" | "fade"
}

export function ScrollReveal({ 
  children, 
  className = "", 
  delay = 0,
  direction = "up" 
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isRevealed, setIsRevealed] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isRevealed) {
          setTimeout(() => {
            setIsRevealed(true)
          }, delay)
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [delay, isRevealed])

  const getAnimationClass = () => {
    if (!isRevealed) {
      switch (direction) {
        case "left":
          return "opacity-0 translate-x-[-50px]"
        case "right":
          return "opacity-0 translate-x-[50px]"
        case "fade":
          return "opacity-0"
        default:
          return "opacity-0 translate-y-[40px]"
      }
    }
    return "opacity-100 translate-x-0 translate-y-0"
  }

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${getAnimationClass()} ${className}`}
    >
      {children}
    </div>
  )
}
