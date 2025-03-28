import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../style/globals.css'
import Navbar from '@/components/layout/navbar'
import Footer from '@/components/layout/footer'
import { Toaster } from "@/components/ui/sonner"

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-inter'
})

export const metadata: Metadata = {
  metadataBase: new URL("https://audi-center.com/"),
  title: "Audi Center | Experiencia Premium en Automóviles",
  description: "Descubre la excelencia de Audi. Venta de vehículos de lujo, servicio premium, innovación alemana y diseño de vanguardia.",
  keywords: [
    "Audi", 
    "concesionaria Audi", 
    "venta de autos", 
    "autos de lujo", 
    "automóviles alemanes", 
    "servicio automotriz premium"
  ],
  authors: [{ name: "Audi Center" }],
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://audi-center.com/",
    title: "Audi Center | Experiencia Premium en Automóviles",
    description: "Descubre la excelencia de Audi. Venta de vehículos de lujo, servicio premium, innovación alemana y diseño de vanguardia.",
    images: [
      {
        url: "/og-image.jpg", 
        width: 1200,
        height: 630,
        alt: "Audi Center - Automóviles de Lujo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Audi Center | Experiencia Premium en Automóviles",
    description: "Descubre la excelencia de Audi. Venta de vehículos de lujo, servicio premium, innovación alemana y diseño de vanguardia.",
    images: ["/twitter-image.jpg"], 
    creator: "@AudiCenter", 
  },
  verification: {
    google: 'googleXXXXXXXXXXXXXX', // Replace with actual Google Search Console verification
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <body 
        className={`${inter.className} overflow-x-hidden antialiased text-gray-900 dark:text-white bg-white dark:bg-gray-900`}
      >
        <Navbar />
        <main className="min-h-screen font-sans">
          {children}
        </main>
        <Footer />
        
        {/* WhatsApp Contact Button */}
        <a
          href={`https://wa.me/+5491234567890?text=Hola%20estoy%20interesado%20en%20un%20vehículo%20Audi`}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-green-500 text-white hover:bg-green-600 transition-transform transform hover:scale-110 shadow-lg"
          aria-label="Contactar por WhatsApp"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="w-6 h-6" 
            viewBox="0 0 24 24" 
            fill="currentColor"
          >
            <path d="M12.036 5.339c-1.487 0-2.415.834-2.415 2.064v1.727h-1.434v2.11h1.434v5.492h2.558v-5.492h1.682l.206-2.11h-1.888v-1.479c0-.612.415-.79.789-.79h1.099v-2.255h-1.484c-1.395 0-2.06.69-2.06 1.996v1.728h-1.325v2.11h1.325v5.492h2.635v-5.492h1.684l.205-2.11h-1.889v-1.479c0-.612.415-.79.789-.79h1.1v-2.255h-1.484c-1.395 0-2.06.69-2.06 1.996"/>
          </svg>
        </a>
        <Toaster />
      </body>
    </html>
  )
}