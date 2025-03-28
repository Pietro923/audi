'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase/client'
import Link from 'next/link'
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
  SortAsc,
  ChevronRight 
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

  useEffect(() => {
    fetchVehicles()
  }, [filtros, sortOrder])

  const renderVehicleCard = (vehicle: Vehicle, index: number) => {
    const imageUrl = vehicle.images && vehicle.images.length > 0 
      ? vehicle.images[0] 
      : '/placeholder-car.jpg'
  
    // Determine grid span based on index for Bento-style layout
    const gridSpanClass = index === 0 
      ? 'md:col-span-2 md:row-span-2' 
      : (index % 5 === 0 
        ? 'md:col-span-2' 
        : 'md:col-span-1')

    return (
      <motion.div
        key={vehicle.id}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        whileHover={{ scale: 1.05 }}
        className={`${gridSpanClass} bg-white border border-neutral-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300`}
      >
        <Link href={`/vehiculo/${vehicle.id}`} className="block h-full">
          <div className="grid grid-rows-[2fr_1fr] h-full">
            <div className="relative overflow-hidden">
              <img 
                src={imageUrl} 
                alt={`${vehicle.make} ${vehicle.model}`} 
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-neutral-800 text-white px-3 py-1 rounded-full text-xs">
                {vehicle.condition}
              </div>
            </div>
            
            <div className="p-4 flex flex-col justify-between h-full">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-lg font-semibold text-neutral-900 truncate">
                    {vehicle.make} {vehicle.model}
                  </h2>
                  <span className="text-neutral-700 font-bold text-base ml-2">
                    ${vehicle.price.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-neutral-600 text-sm">
                  <div className="flex items-center space-x-1">
                    <Car className="w-4 h-4" />
                    <span>{vehicle.year}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <SortAsc className="w-4 h-4" />
                    <span>{vehicle.mileage.toLocaleString()} km</span>
                  </div>
                </div>
              </div>
              <div className="flex justify-end items-center mt-2">
                <ChevronRight className="w-5 h-5 text-neutral-600" />
              </div>
            </div>
          </div>
        </Link>
      </motion.div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-light mb-4 text-neutral-900">
          Catálogo de Vehículos
        </h1>
        <p className="text-xl text-neutral-600">
          Encuentra tu próximo Audi
        </p>
      </div>
      
      {/* Filtros - Bento-style Filters */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-12">
        <div className="md:col-span-2 flex space-x-2">
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
            className="text-neutral-600 hover:bg-neutral-100"
          >
            <SortAsc className={`w-5 h-5 ${sortOrder === 'desc' ? 'transform rotate-180' : ''}`} />
          </Button>
        </div>
        
        <Input 
          placeholder="Precio Mínimo" 
          type="number"
          value={filtros.minPrice}
          onChange={(e) => setFiltros({...filtros, minPrice: e.target.value})}
          className="md:col-span-1"
        />
        <Input 
          placeholder="Precio Máximo" 
          type="number"
          value={filtros.maxPrice}
          onChange={(e) => setFiltros({...filtros, maxPrice: e.target.value})}
          className="md:col-span-1"
        />
        
        <Select 
          onValueChange={(value) => setFiltros({...filtros, condition: value === "todos" ? "" : value})}
          value={filtros.condition || "todos"}
        >
          <SelectTrigger className="md:col-span-2">
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

      {/* Resultados - Bento Grid */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-neutral-500"></div>
        </div>
      ) : vehicles.length === 0 ? (
        <div className="text-center text-neutral-500 py-12">
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
          className="grid grid-cols-1 md:grid-cols-4 gap-6"
        >
          {vehicles.map(renderVehicleCard)}
        </motion.div>
      )}
    </div>
  )
}