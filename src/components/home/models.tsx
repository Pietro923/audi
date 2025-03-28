'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { supabase } from '@/lib/supabase/client'

// Definición del tipo para un vehículo
type Vehicle = {
  id: string
  make: string
  model: string
  year: number
  price: number
  description?: string
  images?: string[]
}

export default function Models() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    // Función para obtener los vehículos destacados
    const fetchFeaturedVehicles = async () => {
      try {
        setLoading(true)
        
        // Consultar vehículos destacados de Supabase
        const { data, error } = await supabase
          .from('vehicles')
          .select('*')
          .eq('is_featured', true)
          .order('created_at', { ascending: false })
          .limit(3)
        
        if (error) {
          throw new Error(error.message)
        }
        
        setVehicles(data || [])
      } catch (err) {
        console.error('Error:', err)
        setError('No se pudieron cargar los vehículos destacados. Por favor, intente más tarde.')
      } finally {
        setLoading(false)
      }
    }

    fetchFeaturedVehicles()
  }, []) // Array vacío para que solo se ejecute una vez al montar el componente

  // Mostrar mensaje de carga
  if (loading) {
    return (
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-center mb-12">Nuestros Modelos</h2>
        <div className="flex justify-center">
          <p className="text-lg">Cargando vehículos destacados...</p>
        </div>
      </section>
    )
  }

  // Mostrar mensaje de error
  if (error) {
    return (
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-center mb-12">Nuestros Modelos</h2>
        <div className="flex justify-center">
          <p className="text-red-500">{error}</p>
        </div>
      </section>
    )
  }

  // Si no hay vehículos destacados
  if (vehicles.length === 0) {
    return (
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-center mb-12">Nuestros Modelos</h2>
        <div className="flex justify-center">
          <p className="text-lg">No hay vehículos destacados disponibles en este momento.</p>
        </div>
      </section>
    )
  }

  // Renderizar los vehículos destacados
  return (
    <section className="container mx-auto px-4 py-16">
      <h2 className="text-4xl font-bold text-center mb-12">Nuestros Modelos Destacados</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {vehicles.map((vehicle) => {
          // Obtener la primera imagen o usar una imagen predeterminada
          const imageUrl = vehicle.images && vehicle.images.length > 0 
            ? vehicle.images[0] 
            : '/placeholder-car.jpg'
            
          return (
            <div 
              key={vehicle.id} 
              className="bg-white rounded-xl shadow-lg overflow-hidden transform transition hover:scale-105"
            >
              <img 
                src={imageUrl} 
                alt={`${vehicle.make} ${vehicle.model}`} 
                width={600} 
                height={400} 
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-2">{vehicle.make} {vehicle.model} {vehicle.year}</h3>
                <p className="text-gray-600 mb-4">
                  {vehicle.description || `${vehicle.make} ${vehicle.model} en excelentes condiciones`}
                </p>
                <div className="flex justify-between items-center">
                  <p className="text-xl font-bold text-red-600">
                    ${vehicle.price.toLocaleString('es-MX')}
                  </p>
                  <Link 
                    href={`/vehiculo/${vehicle.id}`}
                    className="text-red-600 hover:text-red-700 font-bold flex items-center"
                  >
                    Ver Detalles
                    <span className="ml-2">→</span>
                  </Link>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      
      <div className="text-center mt-12">
        <Link 
          href="/catalogo" 
          className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full transition"
        >
          Ver todos los vehículos
        </Link>
      </div>
    </section>
  )
}