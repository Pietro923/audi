'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase/client'
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from '@/components/ui/carousel'
import { Badge } from '@/components/ui/badge'
import { 
  Car, 
  CalendarDays, 
  Gauge, 
  DollarSign, 
  Shield 
} from 'lucide-react'

interface Vehicle {
  id: number
  make: string
  model: string
  year: number
  price: number
  mileage: number
  condition: string
  description?: string
  images?: string[]
}

export default function VehicleDetailsPage({ 
  params 
}: { 
  params: { vehicleId: string } 
}) {
  const [vehicle, setVehicle] = useState<Vehicle | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)

  useEffect(() => {
    fetchVehicleDetails()
  }, [params.vehicleId])

  const fetchVehicleDetails = async () => {
    setIsLoading(true)
    try {
      const { data, error } = await supabase
        .from('vehicles')
        .select('*')
        .eq('id', params.vehicleId)
        .single()

      if (error) throw error

      // Mock images if not present
      const vehicleData = {
        ...data,
        images: data.images || [
          `/api/placeholder/800/600?text=${data.make}+${data.model}`,
          `/api/placeholder/800/600?text=${data.year}`,
          `/api/placeholder/800/600?text=${data.condition}`
        ]
      }

      setVehicle(vehicleData)
    } catch (error) {
      console.error('Error fetching vehicle details:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleContactSeller = () => {
    // Implement contact logic (modal, email, etc.)
    alert('Contactar vendedor - Implementar lógica')
  }

  if (isLoading) {
    return <div className="container mx-auto p-6">Cargando detalles...</div>
  }

  if (!vehicle) {
    return <div className="container mx-auto p-6">Vehículo no encontrado</div>
  }

  return (
    <div className="container mx-auto p-6">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Image Section */}
        <div>
          <Carousel className="w-full">
            <CarouselContent>
              {vehicle.images.map((image, index) => (
                <CarouselItem key={index}>
                  <img 
                    src={image} 
                    alt={`${vehicle.make} ${vehicle.model} - Vista ${index + 1}`} 
                    className="w-full h-96 object-cover rounded-lg"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>

        {/* Vehicle Details Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">
              {vehicle.make} {vehicle.model}
            </CardTitle>
            <div className="flex items-center justify-between">
              <Badge variant="secondary" className="text-lg">
                {vehicle.year}
              </Badge>
              <Badge 
                variant={
                  vehicle.condition === 'nuevo' 
                    ? 'default' 
                    : vehicle.condition === 'seminuevo' 
                    ? 'outline' 
                    : 'destructive'
                }
              >
                {vehicle.condition.charAt(0).toUpperCase() + vehicle.condition.slice(1)}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <DollarSign className="text-blue-500" />
                <span>Precio: ${vehicle.price.toLocaleString()}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Gauge className="text-green-500" />
                <span>Kilometraje: {vehicle.mileage.toLocaleString()} km</span>
              </div>
              <div className="flex items-center space-x-2">
                <Car className="text-purple-500" />
                <span>Marca: {vehicle.make}</span>
              </div>
              <div className="flex items-center space-x-2">
                <CalendarDays className="text-red-500" />
                <span>Año: {vehicle.year}</span>
              </div>
            </div>

            {vehicle.description && (
              <div>
                <h3 className="font-semibold mb-2">Descripción</h3>
                <p className="text-gray-600">{vehicle.description}</p>
              </div>
            )}

            <div className="flex items-center space-x-2 bg-blue-50 p-3 rounded-lg">
              <Shield className="text-blue-600" />
              <span className="text-sm text-blue-800">
                Garantía disponible para este vehículo
              </span>
            </div>

            <div className="space-y-2">
              <Button 
                onClick={handleContactSeller} 
                className="w-full"
              >
                Contactar Vendedor
              </Button>
              <Button 
                variant="outline" 
                className="w-full"
              >
                Solicitar Prueba de Manejo
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}