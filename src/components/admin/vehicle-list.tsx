'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase/client'
import toast from 'react-hot-toast'
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table'
import { Switch } from '@/components/ui/switch'
import { Star, StarOff, Loader2 } from 'lucide-react'

interface Vehicle {
  id: number
  make: string
  model: string
  year: number
  price: number
  condition: string
  is_featured: boolean
}

export function VehicleList() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [updatingFeatured, setUpdatingFeatured] = useState<number | null>(null)

  useEffect(() => {
    fetchVehicles()
  }, [])

  const fetchVehicles = async () => {
    setIsLoading(true)
    try {
      const { data, error } = await supabase
        .from('vehicles')
        .select('*')
        .order('created_at', { ascending: false })
      if (error) throw error
      setVehicles(data || [])
    } catch (error) {
      console.error('Error fetching vehicles:', error)
      toast.error('No se pudieron cargar los vehículos')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('¿Estás seguro de eliminar este vehículo?')) return
    try {
      const { error } = await supabase
        .from('vehicles')
        .delete()
        .eq('id', id)
      if (error) throw error
      toast.success('Vehículo eliminado')
      fetchVehicles() // Refresh list
    } catch (error) {
      console.error('Error deleting vehicle:', error)
      toast.error('No se pudo eliminar el vehículo')
    }
  }

  const toggleFeatured = async (id: number, currentStatus: boolean) => {
    setUpdatingFeatured(id)
    try {
      const { error } = await supabase
        .from('vehicles')
        .update({ is_featured: !currentStatus })
        .eq('id', id)
        
      if (error) throw error
      
      // Actualizar el estado local
      setVehicles(vehicles.map(vehicle => 
        vehicle.id === id 
          ? { ...vehicle, is_featured: !currentStatus } 
          : vehicle
      ))
      
      toast.success(`Vehículo ${!currentStatus ? 'destacado' : 'quitado de destacados'} exitosamente`)
    } catch (error) {
      console.error('Error updating featured status:', error)
      toast.error('No se pudo actualizar el estado destacado')
    } finally {
      setUpdatingFeatured(null)
    }
  }

  if (isLoading) {
    return <div>Cargando vehículos...</div>
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Lista de Vehículos</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Marca</TableHead>
              <TableHead>Modelo</TableHead>
              <TableHead>Año</TableHead>
              <TableHead>Precio</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Destacado</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {vehicles.map((vehicle) => (
              <TableRow key={vehicle.id}>
                <TableCell>{vehicle.make}</TableCell>
                <TableCell>{vehicle.model}</TableCell>
                <TableCell>{vehicle.year}</TableCell>
                <TableCell>${vehicle.price.toLocaleString()}</TableCell>
                <TableCell>{vehicle.condition}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    {updatingFeatured === vehicle.id ? (
                      <Loader2 className="h-4 w-4 animate-spin text-neutral-500" />
                    ) : vehicle.is_featured ? (
                      <Star className="h-4 w-4 text-amber-500" />
                    ) : (
                      <StarOff className="h-4 w-4 text-neutral-400" />
                    )}
                    <Switch
                      checked={vehicle.is_featured || false}
                      onCheckedChange={() => toggleFeatured(vehicle.id, vehicle.is_featured || false)}
                      disabled={updatingFeatured === vehicle.id}
                      className="data-[state=checked]:bg-amber-500"
                    />
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => handleDelete(vehicle.id)}
                    >
                      Eliminar
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {vehicles.length === 0 && (
          <p className="text-center text-gray-500 mt-4">
            No hay vehículos agregados
          </p>
        )}
      </CardContent>
    </Card>
  )
}