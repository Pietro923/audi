'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase/client'
import { useParams, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Car, 
  Gauge, 
  Calendar, 
  Tag, 
  ShieldCheck, 
  ArrowRight,
  CheckCircle2,
  X,
  Phone,
  Info,
  Clock,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

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
  const router = useRouter()
  const [vehicle, setVehicle] = useState<Vehicle | null>(null)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchVehicleDetails = async () => {
      if (!params.vehicleId) {
        setError('ID de vehículo no encontrado')
        setIsLoading(false)
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
        setIsLoading(false)
      } catch (err) {
        console.error('Error fetching vehicle details:', err)
        setError('No se pudo cargar los detalles del vehículo')
        setIsLoading(false)
      }
    }
    
    fetchVehicleDetails()
  }, [params.vehicleId])

  const handlePrevImage = () => {
    if (!vehicle?.images?.length) return
    setSelectedImageIndex((prevIndex) => 
      prevIndex === 0 ? vehicle.images!.length - 1 : prevIndex - 1
    )
  }

  const handleNextImage = () => {
    if (!vehicle?.images?.length) return
    setSelectedImageIndex((prevIndex) => 
      prevIndex === vehicle.images!.length - 1 ? 0 : prevIndex + 1
    )
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-neutral-400 mx-auto mb-4"></div>
          <p className="text-xl text-neutral-600">
            Cargando detalles del vehículo...
          </p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-neutral-50 p-4">
        <div className="text-center max-w-md mx-auto">
          <div className="p-4 rounded-full bg-neutral-100 inline-block mb-4">
            <X className="w-12 h-12 text-neutral-700" />
          </div>
          <h1 className="text-3xl font-light text-neutral-800 mb-4">
            Error al Cargar
          </h1>
          <p className="text-neutral-600 mb-6">{error}</p>
          <Button 
            variant="outline" 
            className="bg-neutral-800 text-white hover:bg-neutral-900"
            onClick={() => router.push('/catalogo')}
          >
            Volver al Catálogo
          </Button>
        </div>
      </div>
    )
  }

  if (!vehicle) {
    return null
  }

  const selectedImage = vehicle.images?.[selectedImageIndex] || '/placeholder-car.jpg'

  return (
    <div className="bg-neutral-50 min-h-screen">
      {/* Breadcrumb Navigation */}
      <div className="container mx-auto px-4 pt-6">
        <button 
          onClick={() => router.push('/catalogo')}
          className="inline-flex items-center text-neutral-600 hover:text-neutral-900 mb-4"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          <span>Volver al catálogo</span>
        </button>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-12 gap-12">
          {/* Image Gallery */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="md:col-span-7 space-y-4"
          >
            {/* Main Image */}
            <div className="bg-white rounded-xl overflow-hidden shadow-sm relative">
              <div className="relative aspect-[4/3]">
                <AnimatePresence mode="wait">
                  <motion.img 
                    key={selectedImageIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    src={selectedImage}
                    alt={`${vehicle.make} ${vehicle.model}`}
                    className="w-full h-full object-cover"
                  />
                </AnimatePresence>
                
                {vehicle.condition && (
                  <div className="absolute top-4 left-4 bg-neutral-800 text-white px-3 py-1 rounded-full text-xs font-medium">
                    {vehicle.condition}
                  </div>
                )}
                
                {/* Navigation Arrows */}
                {vehicle.images && vehicle.images.length > 1 && (
                  <>
                    <button 
                      onClick={handlePrevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 hover:bg-white transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5 text-neutral-800" />
                    </button>
                    <button 
                      onClick={handleNextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 hover:bg-white transition-colors"
                    >
                      <ChevronRight className="w-5 h-5 text-neutral-800" />
                    </button>
                  </>
                )}
              </div>
            </div>
            
            {/* Thumbnail Gallery */}
            {vehicle.images && vehicle.images.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto scrollbar-thin pb-2">
                {vehicle.images.map((img, index) => (
                  <button 
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`
                      w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden
                      ${selectedImageIndex === index ? 'ring-2 ring-neutral-800' : 'opacity-70 hover:opacity-100'}
                      transition-all duration-300
                    `}
                  >
                    <img 
                      src={img} 
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Vehicle Details */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:col-span-5 space-y-6"
          >
            <div>
              <h1 className="text-3xl font-light text-neutral-900 mb-2">
                {vehicle.make} {vehicle.model}
              </h1>
              <p className="text-2xl text-neutral-800 font-normal">
                ${vehicle.price.toLocaleString()}
              </p>
            </div>

            <Tabs defaultValue="info" className="w-full">
              <TabsList className="grid grid-cols-2 mb-4">
                <TabsTrigger value="info">Información</TabsTrigger>
                <TabsTrigger value="specs">Especificaciones</TabsTrigger>
              </TabsList>

              <TabsContent value="info" className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm">
                    <Calendar className="text-neutral-500 w-5 h-5" />
                    <div>
                      <div className="text-xs text-neutral-500">Año</div>
                      <div className="font-medium">{vehicle.year}</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm">
                    <Gauge className="text-neutral-500 w-5 h-5" />
                    <div>
                      <div className="text-xs text-neutral-500">Kilometraje</div>
                      <div className="font-medium">{vehicle.mileage.toLocaleString()} km</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm">
                    <Car className="text-neutral-500 w-5 h-5" />
                    <div>
                      <div className="text-xs text-neutral-500">Color Exterior</div>
                      <div className="font-medium">{vehicle.exterior_color || 'No especificado'}</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm">
                    <ShieldCheck className="text-neutral-500 w-5 h-5" />
                    <div>
                      <div className="text-xs text-neutral-500">Condición</div>
                      <div className="font-medium">{vehicle.condition}</div>
                    </div>
                  </div>
                </div>

                {vehicle.description && (
                  <div className="p-4 bg-white rounded-lg shadow-sm">
                    <h2 className="text-neutral-900 font-medium mb-2 flex items-center">
                      <Info className="w-4 h-4 mr-2" />
                      Descripción
                    </h2>
                    <p className="text-neutral-600 text-sm">
                      {vehicle.description}
                    </p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="specs" className="space-y-4">
                <div className="grid gap-3">
                  {vehicle.transmission && (
                    <div className="p-3 bg-white rounded-lg shadow-sm flex justify-between">
                      <span className="text-neutral-600">Transmisión</span>
                      <span className="font-medium">{vehicle.transmission}</span>
                    </div>
                  )}
                  
                  {vehicle.fuel_type && (
                    <div className="p-3 bg-white rounded-lg shadow-sm flex justify-between">
                      <span className="text-neutral-600">Combustible</span>
                      <span className="font-medium">{vehicle.fuel_type}</span>
                    </div>
                  )}
                  
                  {vehicle.engine && (
                    <div className="p-3 bg-white rounded-lg shadow-sm flex justify-between">
                      <span className="text-neutral-600">Motor</span>
                      <span className="font-medium">{vehicle.engine}</span>
                    </div>
                  )}
                  
                  {vehicle.interior_color && (
                    <div className="p-3 bg-white rounded-lg shadow-sm flex justify-between">
                      <span className="text-neutral-600">Color Interior</span>
                      <span className="font-medium">{vehicle.interior_color}</span>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>

            <div className="space-y-3 pt-2">
              <Button 
                className="w-full bg-neutral-900 hover:bg-neutral-800 text-white"
                size="lg"
              >
                Cotizar Ahora <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              
              <div className="grid grid-cols-2 gap-3">
                <Button 
                  variant="outline" 
                  className="border-neutral-400 text-neutral-800"
                >
                  <Phone className="mr-2 w-4 h-4" />
                  Contacto
                </Button>
                
                <Button 
                  variant="outline" 
                  className="border-neutral-400 text-neutral-800"
                >
                  <Clock className="mr-2 w-4 h-4" />
                  Agendar Prueba
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}