// components/home/Hero.tsx
import Link from 'next/link'
import Image from 'next/image'

export default function Hero() {
  return (
    <div className="relative w-full h-[80vh] overflow-hidden">
      <video 
        autoPlay 
        loop 
        muted 
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src="videos/audi4.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute inset-0  bg-opacity-50 flex items-center justify-center text-center">
        <div className="text-white px-4">
          <h1 className="text-5xl font-bold mb-4">Audi Tucumán</h1>
          <p className="text-xl mb-8">Experiencia Premium, Tecnología de Vanguardia</p>
          <div className="space-x-4">
            <Link 
              href="/catalogo" 
              className="bg-red-600 text-white px-8 py-3 rounded-full hover:bg-red-700 transition"
            >
              Explorar Modelos
            </Link>
            <Link 
              href="/agendar-prueba" 
              className="border-2 border-white text-white px-8 py-3 rounded-full hover:bg-white hover:text-black transition"
            >
              Agendar Prueba
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}