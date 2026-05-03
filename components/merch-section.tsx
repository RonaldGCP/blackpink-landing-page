"use client"

import { ShoppingCart } from "lucide-react"

export interface Product {
  id: number
  name: string
  price: number
  image: string
  isLimited: boolean
}

interface MerchSectionProps {
  onAddToCart: (product: Product) => void
}

export const products: Product[] = [
  {
    id: 1,
    name: "Hoodie BORN PINK FOREVER",
    price: 189000,
    image: "https://m.media-amazon.com/images/I/51LUWjndSKL._AC_UY1000_.jpg",
    isLimited: true,
  },
  {
    id: 2,
    name: "Light Stick Ver. 3",
    price: 95000,
    image: "https://http2.mlstatic.com/D_Q_NP_2X_931350-CBT105746329900_022026-P.webp",
    isLimited: false,
  },
  {
    id: 3,
    name: "Photo Book del Tour",
    price: 75000,
    image: "https://http2.mlstatic.com/D_NQ_NP_640143-MLM89140696750_082025-O.webp",
    isLimited: false,
  },
  {
    id: 4,
    name: "Set de Acrílicos de Integrantes",
    price: 55000,
    image: "https://down-co.img.susercontent.com/file/sg-11134201-22120-uz0f5zcxjjkv9d",
    isLimited: false,
  },
]

function formatPrice(price: number): string {
  return price.toLocaleString('es-CO')
}

export function MerchSection({ onAddToCart }: MerchSectionProps) {
  return (
    <section id="merch" className="py-20 px-4 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-[var(--font-bebas)] text-4xl md:text-6xl text-center mb-4 neon-text-subtle text-[#e0457b]">
          MERCH OFICIAL
        </h2>
        <p className="text-center text-white/60 mb-12 max-w-2xl mx-auto">
          Lleva contigo un recuerdo exclusivo del tour
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="group glass rounded-2xl overflow-hidden hover:neon-border transition-all duration-300"
            >
              <div className="relative aspect-square overflow-hidden">
                {product.isLimited && (
                  <span className="absolute top-3 left-3 z-10 bg-[#d4af37] text-[#0a0a0a] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    Edición Limitada
                  </span>
                )}
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-5">
                <h3 className="text-white font-semibold mb-2 line-clamp-2">
                  {product.name}
                </h3>
                <p className="text-[#e0457b] text-xl font-bold mb-1">
                  ${formatPrice(product.price)}
                </p>
                <p className="text-white/50 text-xs mb-4">COP</p>
                <button
                  onClick={() => onAddToCart(product)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 border-2 border-[#e0457b] text-white font-semibold text-sm uppercase tracking-wider rounded-lg hover:bg-[#e0457b] transition-all duration-300"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Agregar al carrito
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
