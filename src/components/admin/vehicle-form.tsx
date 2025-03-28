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
import { Textarea } from '@/components/ui/textarea'
import { 
  Car, 
  DollarSign, 
  Clock, 
  ImagePlus, 
  Palette, 
  RefreshCcw 
} from 'lucide-react'

// Expanded vehicle schema with more fields
const vehicleSchema = z.object({
  make: z.string().min(2, "Marca es requerida"),
  model: z.string().min(2, "Modelo es requerido"),
  year: z.coerce.number().min(1900, "Año inválido").max(new Date().getFullYear() + 1),
  price: z.coerce.number().min(0, "Precio debe ser positivo"),
  mileage: z.coerce.number().min(0, "Kilometraje debe ser positivo"),
  condition: z.enum(["nuevo", "seminuevo", "usado"]),
  description: z.string().optional(),
  color: z.string().optional(),
  transmission: z.enum(["manual", "automatico", "tiptronic"]).optional()
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
      description: '',
      color: '',
      transmission: 'automatico'
    }
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [image, setImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  // Handle image selection with preview
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }
  
  const onSubmit = async (data: VehicleFormData) => {
    setIsSubmitting(true)
    try {
      let imageUrl = null
      if (image) {
        const fileExt = image.name.split('.').pop()
        const fileName = `${Math.random()}.${fileExt}`
        
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('vehicle-images')
          .upload(fileName, image, {
            cacheControl: '3600',
            upsert: false
          })
        
        if (uploadError) {
          console.error('Error uploading image:', uploadError)
          throw uploadError
        }
        
        const { data: urlData } = supabase.storage
          .from('vehicle-images')
          .getPublicUrl(fileName)
        
        imageUrl = urlData.publicUrl
      }
  
      const { data: vehicleData, error: vehicleError } = await supabase
        .from('vehicles')
        .insert([{
          ...data,
          images: imageUrl ? [imageUrl] : []
        }])
        .select('id')
  
      if (vehicleError) {
        console.error('Error inserting vehicle:', vehicleError)
        throw vehicleError
      }
  
      toast.success('Vehículo agregado exitosamente')
      reset() // Clear form
      setImage(null)
      setImagePreview(null)
    } catch (error) {
      console.error('Error adding vehicle:', error)
      toast.error('Error al agregar vehículo')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Car className="w-6 h-6 text-red-500" />
          <span>Agregar Nuevo Vehículo</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <Controller
              name="make"
              control={control}
              render={({ field }) => (
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <Car className="w-4 h-4 text-gray-500" />
                    <label className="text-sm">Marca</label>
                  </div>
                  <Input 
                    {...field} 
                    placeholder="Ej. Toyota" 
                    className={errors.make ? 'border-red-500' : ''}
                  />
                  {errors.make && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.make.message}
                    </p>
                  )}
                </div>
              )}
            />
            <Controller
              name="model"
              control={control}
              render={({ field }) => (
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <RefreshCcw className="w-4 h-4 text-gray-500" />
                    <label className="text-sm">Modelo</label>
                  </div>
                  <Input 
                    {...field} 
                    placeholder="Ej. Camry" 
                    className={errors.model ? 'border-red-500' : ''}
                  />
                  {errors.model && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.model.message}
                    </p>
                  )}
                </div>
              )}
            />
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <Controller
              name="year"
              control={control}
              render={({ field }) => (
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <label className="text-sm">Año</label>
                  </div>
                  <Input 
                    {...field} 
                    type="number" 
                    placeholder="Año" 
                    className={errors.year ? 'border-red-500' : ''}
                  />
                  {errors.year && (
                    <p className="text-red-500 text-sm mt-1">
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
                  <div className="flex items-center space-x-2 mb-1">
                    <DollarSign className="w-4 h-4 text-gray-500" />
                    <label className="text-sm">Precio</label>
                  </div>
                  <Input 
                    {...field} 
                    type="number" 
                    placeholder="Precio" 
                    className={errors.price ? 'border-red-500' : ''}
                  />
                  {errors.price && (
                    <p className="text-red-500 text-sm mt-1">
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
                  <div className="flex items-center space-x-2 mb-1">
                    <Car className="w-4 h-4 text-gray-500" />
                    <label className="text-sm">Kilometraje</label>
                  </div>
                  <Input 
                    {...field} 
                    type="number" 
                    placeholder="Kilometraje" 
                    className={errors.mileage ? 'border-red-500' : ''}
                  />
                  {errors.mileage && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.mileage.message}
                    </p>
                  )}
                </div>
              )}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <Controller
              name="condition"
              control={control}
              render={({ field }) => (
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <Car className="w-4 h-4 text-gray-500" />
                    <label className="text-sm">Estado del Vehículo</label>
                  </div>
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
                </div>
              )}
            />
            <Controller
              name="transmission"
              control={control}
              render={({ field }) => (
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <RefreshCcw className="w-4 h-4 text-gray-500" />
                    <label className="text-sm">Transmisión</label>
                  </div>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Tipo de Transmisión" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="manual">Manual</SelectItem>
                      <SelectItem value="automatico">Automático</SelectItem>
                      <SelectItem value="tiptronic">Tiptronic</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <Controller
              name="color"
              control={control}
              render={({ field }) => (
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <Palette className="w-4 h-4 text-gray-500" />
                    <label className="text-sm">Color Exterior</label>
                  </div>
                  <Input 
                    {...field} 
                    placeholder="Color del vehículo" 
                  />
                </div>
              )}
            />
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <ImagePlus className="w-4 h-4 text-gray-500" />
                <label className="text-sm">Imagen</label>
              </div>
              <Input 
                type="file" 
                accept="image/*" 
                onChange={handleImageChange}
                className="file:mr-4 file:rounded-full file:border-0 file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
              />
              {imagePreview && (
                <div className="mt-2 flex justify-center">
                  <img 
                    src={imagePreview} 
                    alt="Vista previa" 
                    className="h-24 w-auto rounded-md object-cover"
                  />
                </div>
              )}
            </div>
          </div>

          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <Car className="w-4 h-4 text-gray-500" />
                  <label className="text-sm">Descripción</label>
                </div>
                <Textarea 
                  {...field} 
                  placeholder="Descripción del vehículo (Opcional)" 
                  className="min-h-[100px]"
                />
              </div>
            )}
          />

          <Button 
            type="submit" 
            className="w-full bg-red-500 hover:bg-red-600"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Guardando...' : 'Agregar Vehículo'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}