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
          href={`https://wa.me/5493816618632?text=Hola%20estoy%20en%20la%20pagina%20web%20y%20quiero%20hacer%20una%20consulta!`}
          target="_blank"
          className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-green-500 text-white hover:bg-green-600 transition-transform transform hover:scale-110"
          aria-label="Contactar por WhatsApp"
        >
         <img src="/whatsapp.svg" className="w-6 h-6" alt="WhatsApp" />
        </a>
        <Toaster />
      </body>
    </html>
  )
}