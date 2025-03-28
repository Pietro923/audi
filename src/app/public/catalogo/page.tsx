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

export default function CatalogoVehiculos() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [filtros, setFiltros] = useState({
    make: '',
    minPrice: '',
    maxPrice: '',
    condition: ''
  })
  const [isLoading, setIsLoading] = useState(true)

  // Fetch vehicles with dynamic filtering
  const fetchVehicles = async () => {
    setIsLoading(true)
    
    // Base query
    let query = supabase.from('vehicles').select('*')
    
    // Apply filters
    if (filtros.make) {
      query = query.ilike('make', `%${filtros.make}%`)
    }
    
    if (filtros.minPrice) {
      query = query.gte('price', parseFloat(filtros.minPrice))
    }
    
    if (filtros.maxPrice) {
      query = query.lte('price', parseFloat(filtros.maxPrice))
    }
    
    if (filtros.condition) {
      query = query.eq('condition', filtros.condition)
    }

    const { data, error } = await query.order('created_at', { ascending: false })

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
  }, [filtros])

  const renderVehicleCard = (vehicle: Vehicle) => {
    // Usar la primera imagen del array, sin placeholder
    const imageUrl = vehicle.images && vehicle.images.length > 0 
      ? vehicle.images[0] 
      : '' // Dejar vacío si no hay imagen
  
    return (
      <Link 
        href={`/public/vehiculo/${vehicle.id}`} 
        key={vehicle.id} 
        className="border rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow"
      >
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt={`${vehicle.make} ${vehicle.model}`} 
            className="w-full h-48 object-cover"
          />
        ) : null}
        <div className="p-4">
          <h2 className="text-xl font-bold">
            {vehicle.make} {vehicle.model}
          </h2>
          <div className="flex justify-between items-center mt-2">
            <span className="text-green-600 font-semibold">
              ${vehicle.price.toLocaleString()}
            </span>
            <span className="text-gray-500">
              {vehicle.year} | {vehicle.condition}
            </span>
          </div>
        </div>
      </Link>
    )
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Catálogo de Vehículos</h1>
      
      {/* Filtros */}
      <div className="grid md:grid-cols-4 gap-4 mb-6">
        <Input 
          placeholder="Marca" 
          value={filtros.make}
          onChange={(e) => setFiltros({...filtros, make: e.target.value})}
        />
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
          onValueChange={(value) => setFiltros({...filtros, condition: value})}
        >
          <SelectTrigger>
            <SelectValue placeholder="Estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="nuevo">Nuevo</SelectItem>
            <SelectItem value="seminuevo">Semi-Nuevo</SelectItem>
            <SelectItem value="usado">Usado</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Resultados */}
      {isLoading ? (
        <div>Cargando vehículos...</div>
      ) : vehicles.length === 0 ? (
        <div className="text-center text-gray-500">
          No se encontraron vehículos
        </div>
      ) : (
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
          {vehicles.map(renderVehicleCard)}
        </div>
      )}
    </div>
  )
}