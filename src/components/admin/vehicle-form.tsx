'use client'

import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { supabase } from '@/lib/supabase/client'
import toast from 'react-hot-toast'
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select'

// Esquema de validación para el formulario
const vehicleSchema = z.object({
  make: z.string().min(2, "Marca es requerida"),
  model: z.string().min(2, "Modelo es requerido"),
  year: z.coerce.number().min(1900, "Año inválido").max(new Date().getFullYear() + 1),
  price: z.coerce.number().min(0, "Precio debe ser positivo"),
  mileage: z.coerce.number().min(0, "Kilometraje debe ser positivo"),
  condition: z.enum(["nuevo", "seminuevo", "usado"]),
  description: z.string().optional()
})

type VehicleFormData = z.infer<typeof vehicleSchema>

export function VehicleForm() {
  const { 
    control, 
    handleSubmit, 
    reset, 
    formState: { errors } 
  } = useForm<VehicleFormData>({
    resolver: zodResolver(vehicleSchema),
    defaultValues: {
      make: '',
      model: '',
      year: new Date().getFullYear(),
      price: 0,
      mileage: 0,
      condition: 'seminuevo',
      description: ''
    }
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const onSubmit = async (data: VehicleFormData) => {
    setIsSubmitting(true)
    try {
      const { error } = await supabase
        .from('vehicles')
        .insert([data])

      if (error) throw error

      toast.success('Vehículo agregado exitosamente')
      reset() // Limpiar formulario
    } catch (error) {
      console.error('Error adding vehicle:', error)
      toast.error('Error al agregar vehículo')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Agregar Nuevo Vehículo</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Controller
                name="make"
                control={control}
                render={({ field }) => (
                  <div>
                    <Input 
                      {...field} 
                      placeholder="Marca (Ej. Toyota)" 
                    />
                    {errors.make && (
                      <p className="text-red-500 text-sm">
                        {errors.make.message}
                      </p>
                    )}
                  </div>
                )}
              />
            </div>
            <div>
              <Controller
                name="model"
                control={control}
                render={({ field }) => (
                  <div>
                    <Input 
                      {...field} 
                      placeholder="Modelo (Ej. Camry)" 
                    />
                    {errors.model && (
                      <p className="text-red-500 text-sm">
                        {errors.model.message}
                      </p>
                    )}
                  </div>
                )}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <Controller
              name="year"
              control={control}
              render={({ field }) => (
                <div>
                  <Input 
                    {...field} 
                    type="number" 
                    placeholder="Año" 
                  />
                  {errors.year && (
                    <p className="text-red-500 text-sm">
                      {errors.year.message}
                    </p>
                  )}
                </div>
              )}
            />

            <Controller
              name="price"
              control={control}
              render={({ field }) => (
                <div>
                  <Input 
                    {...field} 
                    type="number" 
                    placeholder="Precio" 
                  />
                  {errors.price && (
                    <p className="text-red-500 text-sm">
                      {errors.price.message}
                    </p>
                  )}
                </div>
              )}
            />

            <Controller
              name="mileage"
              control={control}
              render={({ field }) => (
                <div>
                  <Input 
                    {...field} 
                    type="number" 
                    placeholder="Kilometraje" 
                  />
                  {errors.mileage && (
                    <p className="text-red-500 text-sm">
                      {errors.mileage.message}
                    </p>
                  )}
                </div>
              )}
            />
          </div>

          <Controller
            name="condition"
            control={control}
            render={({ field }) => (
              <Select 
                onValueChange={field.onChange} 
                defaultValue={field.value}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Estado del Vehículo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="nuevo">Nuevo</SelectItem>
                  <SelectItem value="seminuevo">Semi-Nuevo</SelectItem>
                  <SelectItem value="usado">Usado</SelectItem>
                </SelectContent>
              </Select>
            )}
          />

          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <Input 
                {...field} 
                placeholder="Descripción (Opcional)" 
              />
            )}
          />

          <Button 
            type="submit" 
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Guardando...' : 'Agregar Vehículo'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}