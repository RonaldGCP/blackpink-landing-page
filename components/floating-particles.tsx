"use client"

import { useEffect, useState } from "react"
import { Heart, Star } from "lucide-react"

interface Particle {
  id: number
  x: number
  y: number
  size: number
  delay: number
  duration: number
  type: "heart" | "star"
}

export function FloatingParticles() {
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    // Generate random particles
    const newParticles: Particle[] = []
    for (let i = 0; i < 15; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 12 + 8,
        delay: Math.random() * 5,
        duration: Math.random() * 4 + 6,
        type: Math.random() > 0.5 ? "heart" : "star",
      })
    }
    setParticles(newParticles)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute floating-particle"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`,
          }}
        >
          {particle.type === "heart" ? (
            <Heart
              className="text-[#e0457b]/20"
              style={{ width: particle.size, height: particle.size }}
              fill="currentColor"
            />
          ) : (
            <Star
              className="text-[#f082ac]/15"
              style={{ width: particle.size, height: particle.size }}
              fill="currentColor"
            />
          )}
        </div>
      ))}
    </div>
  )
}
