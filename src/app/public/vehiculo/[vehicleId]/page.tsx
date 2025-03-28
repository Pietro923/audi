'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase/client'
import { useParams } from 'next/navigation'

interface Vehicle {
  id: string
  make: string
  model: string
  year: number
  price: number
  condition: string
  mileage: number
  description?: string
  images?: string[]
}

export default function VehicleDetailPage() {
  const params = useParams<{ vehicleId: string }>()
  const [vehicle, setVehicle] = useState<Vehicle | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchVehicleDetails = async () => {
      if (!params.vehicleId) {
        setError('ID de vehículo no encontrado')
        setLoading(false)
        return
      }

      try {
        const { data, error } = await supabase
          .from('vehicles')
          .select('*')
          .eq('id', params.vehicleId)
          .single()

        if (error) throw error

        setVehicle(data)
      } catch (err) {
        console.error('Error fetching vehicle details:', err)
        setError('No se pudo cargar los detalles del vehículo')
      } finally {
        setLoading(false)
      }
    }

    fetchVehicleDetails()
  }, [params.vehicleId])

  if (loading) return <div>Cargando...</div>
  if (error) return <div>{error}</div>
  if (!vehicle) return <div>Vehículo no encontrado</div>

  return (
    <div className="container mx-auto p-6">
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          {vehicle.images && vehicle.images.length > 0 && (
            <img 
              src={vehicle.images[0]} 
              alt={`${vehicle.make} ${vehicle.model}`} 
              className="rounded-lg shadow-md w-full h-auto object-cover"
            />
          )}
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-4">
            {vehicle.make} {vehicle.model}
          </h1>
          <div className="space-y-4">
            <p><strong>Año:</strong> {vehicle.year}</p>
            <p><strong>Precio:</strong> ${vehicle.price.toLocaleString()}</p>
            <p><strong>Kilometraje:</strong> {vehicle.mileage.toLocaleString()} km</p>
            <p><strong>Condición:</strong> {vehicle.condition}</p>
            {vehicle.description && (
              <p><strong>Descripción:</strong> {vehicle.description}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}