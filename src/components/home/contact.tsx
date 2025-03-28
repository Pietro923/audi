// components/home/Contact.tsx
import Link from 'next/link'

export default function Contact() {
  return (
    <section className="bg-gray-100 w-full py-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-8">Contacta con Audi Tucumán</h2>
        <div className="max-w-2xl mx-auto grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Dirección</h3>
            <p className="text-gray-700">
              Av. Presidente Perón 1234
              Tucumán, Argentina
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Teléfono</h3>
            <p className="text-gray-700">(381) 123-4567</p>
            <p className="text-gray-700">(381) 987-6543</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Horarios</h3>
            <p className="text-gray-700">Lunes a Viernes: 9:00 - 18:00</p>
            <p className="text-gray-700">Sábados: 10:00 - 14:00</p>
          </div>
        </div>
        <div className="mt-12">
          <Link 
            href="/contacto" 
            className="bg-red-600 text-white px-8 py-3 rounded-full hover:bg-red-700 transition"
          >
            Contáctanos
          </Link>
        </div>
      </div>
    </section>
  )
}