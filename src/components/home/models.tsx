// components/home/Models.tsx
import Image from 'next/image'
import Link from 'next/link'

const featuredModels = [
  {
    name: 'Audi A4',
    description: 'Elegancia y rendimiento en perfecta armonía',
    image: '/images/audi-a4.jpg',
    link: '/modelos/a4'
  },
  {
    name: 'Audi Q5',
    description: 'SUV de lujo con tecnología de punta',
    image: '/images/audi-q5.jpg',
    link: '/modelos/q5'
  },
  {
    name: 'Audi e-tron',
    description: 'Movilidad eléctrica de próxima generación',
    image: '/images/audi-etron.jpg',
    link: '/modelos/e-tron'
  }
]

export default function Models() {
  return (
    <section className="container mx-auto px-4 py-16">
      <h2 className="text-4xl font-bold text-center mb-12">Nuestros Modelos</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {featuredModels.map((model) => (
          <div 
            key={model.name} 
            className="bg-white rounded-xl shadow-lg overflow-hidden transform transition hover:scale-105"
          >
            <Image 
              src={model.image} 
              alt={model.name} 
              width={600} 
              height={400} 
              className="w-full h-64 object-cover"
            />
            <div className="p-6">
              <h3 className="text-2xl font-semibold mb-2">{model.name}</h3>
              <p className="text-gray-600 mb-4">{model.description}</p>
              <Link 
                href={model.link} 
                className="text-red-600 hover:text-red-700 font-bold flex items-center"
              >
                Explorar Modelo
                <span className="ml-2">→</span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}