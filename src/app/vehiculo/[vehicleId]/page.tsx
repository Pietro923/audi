'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase/client'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { 
  Car, 
  Gauge, 
  Calendar, 
  Tag, 
  ShieldCheck, 
  ArrowRight,
  CheckCircle2,
  X
} from 'lucide-react'
import { Button } from '@/components/ui/button'

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
  exterior_color?: string
  interior_color?: string
  transmission?: string
  fuel_type?: string
  engine?: string
}

export default function VehicleDetailPage() {
  const params = useParams<{ vehicleId: string }>()
  const [vehicle, setVehicle] = useState<Vehicle | null>(null)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchVehicleDetails = async () => {
      if (!params.vehicleId) {
        setError('ID de vehículo no encontrado')
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
        // Set first image as selected by default
        if (data.images && data.images.length > 0) {
          setSelectedImage(data.images[0])
        }
      } catch (err) {
        console.error('Error fetching vehicle details:', err)
        setError('No se pudo cargar los detalles del vehículo')
      }
    }
    
    fetchVehicleDetails()
  }, [params.vehicleId])

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
        <div className="text-center">
          <X className="w-24 h-24 text-red-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
            Error al Cargar
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">{error}</p>
          <Button variant="destructive">Volver al Catálogo</Button>
        </div>
      </div>
    )
  }

  if (!vehicle) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-red-500 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Cargando detalles del vehículo...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid md:grid-cols-2 gap-12">
        {/* Image Gallery */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          {/* Main Image */}
          <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg">
            <img 
              src={selectedImage || vehicle.images?.[0] || '/placeholder-car.jpg'}
              alt={`${vehicle.make} ${vehicle.model}`}
              width={600}
              height={400}
              className="w-full h-[400px] object-cover"
            />
          </div>

          {/* Thumbnail Gallery */}
          {vehicle.images && vehicle.images.length > 1 && (
            <div className="flex space-x-2 overflow-x-auto pb-2">
              {vehicle.images.map((img, index) => (
                <button 
                  key={index}
                  onClick={() => setSelectedImage(img)}
                  className={`
                    w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden
                    ${selectedImage === img ? 'border-4 border-red-500' : 'opacity-70 hover:opacity-100'}
                    transition-all duration-300
                  `}
                >
                  <Image 
                    src={img} 
                    alt={`Thumbnail ${index + 1}`}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </motion.div>

        {/* Vehicle Details */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              {vehicle.make} {vehicle.model}
            </h1>
            <p className="text-2xl text-red-600 font-semibold">
              ${vehicle.price.toLocaleString()}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-3">
              <Calendar className="text-red-500 w-6 h-6" />
              <span>Año: {vehicle.year}</span>
            </div>
            <div className="flex items-center space-x-3">
              <Gauge className="text-red-500 w-6 h-6" />
              <span>Kilometraje: {vehicle.mileage.toLocaleString()} km</span>
            </div>
            <div className="flex items-center space-x-3">
              <ShieldCheck className="text-red-500 w-6 h-6" />
              <span>Condición: {vehicle.condition}</span>
            </div>
            <div className="flex items-center space-x-3">
              <Car className="text-red-500 w-6 h-6" />
              <span>Color: {vehicle.exterior_color || 'No especificado'}</span>
            </div>
          </div>

          {vehicle.description && (
            <div>
              <h2 className="text-xl font-semibold mb-2">Descripción</h2>
              <p className="text-gray-600 dark:text-gray-300">
                {vehicle.description}
              </p>
            </div>
          )}

          <div className="space-y-4">
            <Button 
              className="w-full bg-red-600 hover:bg-red-700 text-white"
              size="lg"
            >
              Cotizar Ahora <ArrowRight className="ml-2" />
            </Button>
            <Button 
              variant="outline" 
              className="w-full"
            >
              Agendar Prueba de Manejo
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}