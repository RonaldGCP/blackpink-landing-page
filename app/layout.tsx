import type { Metadata } from 'next'
import { Bebas_Neue, Inter, Black_Han_Sans, Poppins } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
// @ts-ignore: CSS module declaration not found in this environment
import './globals.css'

const bebasNeue = Bebas_Neue({ 
  weight: '400',
  subsets: ["latin"],
  variable: '--font-bebas'
});
const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter'
});
const blackHanSans = Black_Han_Sans({
  weight: '400',
  subsets: ["latin"],
  variable: '--font-kpop'
});
const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ["latin"],
  variable: '--font-poppins'
});

export const metadata: Metadata = {
  title: 'BLACKPINK WORLD TOUR 2025 | BORN PINK FOREVER',
  description: 'Vive la experiencia BLACKPINK en vivo. 7 de octubre de 2026 en el Estadio El Campín, Bogotá, Colombia. Consigue tus tickets ahora.',
  generator: 'v0.app',
  keywords: ['BLACKPINK', 'concierto', 'K-pop', 'Bogotá', 'World Tour', 'BORN PINK'],
  icons: {
    icon: [
      {
        url: 'https://i.pinimg.com/736x/a1/a5/4b/a1a54b1d7fcccfcf269bf272bc3d2f0b.jpg',
        type: 'image/png',
      },
    ],
    apple: 'https://i.pinimg.com/736x/a1/a5/4b/a1a54b1d7fcccfcf269bf272bc3d2f0b.jpg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={`${bebasNeue.variable} ${inter.variable} ${blackHanSans.variable} ${poppins.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
