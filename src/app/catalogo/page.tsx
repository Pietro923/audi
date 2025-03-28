'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase/client'
import Link from 'next/link'
import Image from 'next/image'
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { 
  Filter, 
  Car, 
  SortAsc 
} from 'lucide-react'

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
  transmission?: string
}

export default function CatalogoVehiculos() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [filtros, setFiltros] = useState({
    make: '',
    minPrice: '',
    maxPrice: '',
    condition: ''
  })
  const [isLoading, setIsLoading] = useState(true)
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')

  // Fetch vehicles with dynamic filtering
  const fetchVehicles = async () => {
    setIsLoading(true)
  
    let query = supabase.from('vehicles').select('*')
  
    if (filtros.make) {
      query = query.ilike('make', `%${filtros.make}%`)
    }
    if (filtros.minPrice) {
      query = query.gte('price', parseFloat(filtros.minPrice))
    }
    if (filtros.maxPrice) {
      query = query.lte('price', parseFloat(filtros.maxPrice))
    }
    if (filtros.condition && filtros.condition !== "todos") {
      query = query.eq('condition', filtros.condition)
    }
  
    query = query.order('price', { ascending: sortOrder === 'asc' })
  
    const { data, error } = await query
    if (error) {
      console.error('Error fetching vehicles:', error)
      return
    }
    setVehicles(data || [])
    setIsLoading(false)
  }

  // Initial fetch and filter changes
  useEffect(() => {
    fetchVehicles()
  }, [filtros, sortOrder])

  const renderVehicleCard = (vehicle: Vehicle) => {
    const imageUrl = vehicle.images && vehicle.images.length > 0 
      ? vehicle.images[0] 
      : '/placeholder-car.jpg'
  
    return (
      <motion.div
        key={vehicle.id}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        whileHover={{ scale: 1.05 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-2xl"
      >
        <Link href={`/vehiculo/${vehicle.id}`} className="block">
          <div className="relative h-56 w-full">
          {imageUrl ? (
          <img 
            src={imageUrl} 
            alt={`${vehicle.make} ${vehicle.model}`} 
            className="w-full h-48 object-cover"
          />
        ) : null}
            <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm">
              {vehicle.condition}
            </div>
          </div>
          
          <div className="p-5">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {vehicle.make} {vehicle.model}
              </h2>
              <span className="text-red-600 font-bold text-xl">
                ${vehicle.price.toLocaleString()}
              </span>
            </div>
            
            <div className="flex justify-between text-gray-600 dark:text-gray-400">
              <div className="flex items-center space-x-2">
                <Car className="w-5 h-5" />
                <span>{vehicle.year}</span>
              </div>
              <div className="flex items-center space-x-2">
                <SortAsc className="w-5 h-5" />
                <span>{vehicle.mileage.toLocaleString()} km</span>
              </div>
            </div>
          </div>
        </Link>
      </motion.div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
          Catálogo de Vehículos
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Encuentra tu próximo Audi
        </p>
      </div>
      
      {/* Filtros */}
      <div className="mb-8 grid md:grid-cols-5 gap-4">
        <div className="col-span-2 flex space-x-2">
          <Input 
            placeholder="Buscar Marca" 
            value={filtros.make}
            onChange={(e) => setFiltros({...filtros, make: e.target.value})}
            className="flex-grow"
          />
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            className="text-gray-600 hover:bg-gray-100"
          >
            <SortAsc className={`w-5 h-5 ${sortOrder === 'desc' ? 'transform rotate-180' : ''}`} />
          </Button>
        </div>
        
        <Input 
          placeholder="Precio Mínimo" 
          type="number"
          value={filtros.minPrice}
          onChange={(e) => setFiltros({...filtros, minPrice: e.target.value})}
        />
        <Input 
          placeholder="Precio Máximo" 
          type="number"
          value={filtros.maxPrice}
          onChange={(e) => setFiltros({...filtros, maxPrice: e.target.value})}
        />
        
        <Select 
  onValueChange={(value) => setFiltros({...filtros, condition: value === "todos" ? "" : value})}
  value={filtros.condition || "todos"} // Asegura que "Todos" sea la opción por defecto
>
  <SelectTrigger>
    <SelectValue placeholder="Estado" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="todos">Todos</SelectItem>
    <SelectItem value="nuevo">Nuevo</SelectItem>
    <SelectItem value="seminuevo">Semi-Nuevo</SelectItem>
    <SelectItem value="usado">Usado</SelectItem>
  </SelectContent>
</Select>

      </div>

      {/* Resultados */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-red-500"></div>
        </div>
      ) : vehicles.length === 0 ? (
        <div className="text-center text-gray-500 py-12">
          <p className="text-2xl mb-4">No se encontraron vehículos</p>
          <p>Prueba ajustando tus filtros de búsqueda</p>
        </div>
      ) : (
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { 
              opacity: 1,
              transition: {
                delayChildren: 0.2,
                staggerChildren: 0.1
              }
            }
          }}
          className="grid md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {vehicles.map(renderVehicleCard)}
        </motion.div>
      )}
    </div>
  )
}