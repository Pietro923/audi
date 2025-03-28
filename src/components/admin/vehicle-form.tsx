'use client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { supabase } from '@/lib/supabase/client'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'
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
import { Label } from '@/components/ui/label'
import { 
  Car, 
  DollarSign, 
  Clock, 
  ImagePlus, 
  Palette,
  Calendar,
  Gauge,
  ShieldCheck,
  Settings 
} from 'lucide-react'

// Expanded vehicle schema with fields matching the detailed page
const vehicleSchema = z.object({
  make: z.string().min(2, "Marca es requerida"),
  model: z.string().min(2, "Modelo es requerido"),
  year: z.coerce.number().min(1900, "Año inválido").max(new Date().getFullYear() + 1),
  price: z.coerce.number().min(0, "Precio debe ser positivo"),
  mileage: z.coerce.number().min(0, "Kilometraje debe ser positivo"),
  condition: z.enum(["nuevo", "seminuevo", "usado"]),
  description: z.string().optional(),
  exterior_color: z.string().optional(),
  interior_color: z.string().optional(),
  transmission: z.enum(["manual", "automatico", "tiptronic"]).optional(),
  fuel_type: z.enum(["Gasolina", "Eléctrico", "Híbrido", "Diesel"]).optional(),
  engine_type: z.string().optional(),
})

type VehicleFormData = z.infer<typeof vehicleSchema>

export function VehicleForm() {
  const { 
    register,
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
      exterior_color: '',
      interior_color: '',
      transmission: 'automatico',
      fuel_type: 'Gasolina',
      engine_type: '',
    }
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [images, setImages] = useState<File[]>([])
  const [imagePreviews, setImagePreviews] = useState<string[]>([])
  
  // Handle multiple images selection with previews
  const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      const fileArray = Array.from(files)
      setImages(prev => [...prev, ...fileArray])
      
      // Generate previews for all new files
      fileArray.forEach(file => {
        const reader = new FileReader()
        reader.onloadend = () => {
          setImagePreviews(prev => [...prev, reader.result as string])
        }
        reader.readAsDataURL(file)
      })
    }
  }
  
  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index))
    setImagePreviews(prev => prev.filter((_, i) => i !== index))
  }
  
  const onSubmit = async (data: VehicleFormData) => {
    setIsSubmitting(true)
    try {
      let imageUrls: string[] = []
      
      // Upload multiple images if any
      if (images.length > 0) {
        const uploadPromises = images.map(async (image) => {
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
          
          return urlData.publicUrl
        })
        
        imageUrls = await Promise.all(uploadPromises)
      }
  
      const { data: vehicleData, error: vehicleError } = await supabase
        .from('vehicles')
        .insert([{
          ...data,
          images: imageUrls
        }])
        .select('id')
  
      if (vehicleError) {
        console.error('Error inserting vehicle:', vehicleError)
        throw vehicleError
      }
  
      toast.success('Vehículo agregado exitosamente')
      reset() // Clear form
      setImages([])
      setImagePreviews([])
    } catch (error) {
      console.error('Error adding vehicle:', error)
      toast.error('Error al agregar vehículo')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="bg-white shadow-sm border-0">
        <CardHeader className="border-b border-neutral-100">
          <CardTitle className="text-2xl font-light text-neutral-900 flex items-center">
            <Car className="mr-2 w-5 h-5" />
            Agregar Nuevo Vehículo
          </CardTitle>
        </CardHeader>
        
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="make" className="flex items-center text-neutral-700">
                  <Car className="w-4 h-4 mr-2" />
                  Marca
                </Label>
                <Input
                  id="make"
                  {...register("make")}
                  className="border-neutral-200 focus:border-neutral-400 focus:ring-neutral-400"
                />
                {errors.make && (
                  <p className="text-red-500 text-xs mt-1">{errors.make.message}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="model" className="flex items-center text-neutral-700">
                  <Car className="w-4 h-4 mr-2" />
                  Modelo
                </Label>
                <Input
                  id="model"
                  {...register("model")}
                  className="border-neutral-200 focus:border-neutral-400 focus:ring-neutral-400"
                />
                {errors.model && (
                  <p className="text-red-500 text-xs mt-1">{errors.model.message}</p>
                )}
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="year" className="flex items-center text-neutral-700">
                  <Calendar className="w-4 h-4 mr-2" />
                  Año
                </Label>
                <Input
                  id="year"
                  type="number"
                  {...register("year")}
                  className="border-neutral-200 focus:border-neutral-400 focus:ring-neutral-400"
                />
                {errors.year && (
                  <p className="text-red-500 text-xs mt-1">{errors.year.message}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="price" className="flex items-center text-neutral-700">
                  <DollarSign className="w-4 h-4 mr-2" />
                  Precio
                </Label>
                <Input
                  id="price"
                  type="number"
                  {...register("price")}
                  className="border-neutral-200 focus:border-neutral-400 focus:ring-neutral-400"
                />
                {errors.price && (
                  <p className="text-red-500 text-xs mt-1">{errors.price.message}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="mileage" className="flex items-center text-neutral-700">
                  <Gauge className="w-4 h-4 mr-2" />
                  Kilometraje
                </Label>
                <Input
                  id="mileage"
                  type="number"
                  {...register("mileage")}
                  className="border-neutral-200 focus:border-neutral-400 focus:ring-neutral-400"
                />
                {errors.mileage && (
                  <p className="text-red-500 text-xs mt-1">{errors.mileage.message}</p>
                )}
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="condition" className="flex items-center text-neutral-700">
                  <ShieldCheck className="w-4 h-4 mr-2" />
                  Estado del Vehículo
                </Label>
                <Select defaultValue="seminuevo" {...register("condition")}>
                  <SelectTrigger className="border-neutral-200 focus:border-neutral-400 focus:ring-neutral-400">
                    <SelectValue placeholder="Seleccione el estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="nuevo">Nuevo</SelectItem>
                    <SelectItem value="seminuevo">Semi-Nuevo</SelectItem>
                    <SelectItem value="usado">Usado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="transmission" className="flex items-center text-neutral-700">
                  <Settings className="w-4 h-4 mr-2" />
                  Transmisión
                </Label>
                <Select defaultValue="automatico" {...register("transmission")}>
                  <SelectTrigger className="border-neutral-200 focus:border-neutral-400 focus:ring-neutral-400">
                    <SelectValue placeholder="Seleccione la transmisión" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="manual">Manual</SelectItem>
                    <SelectItem value="automatico">Automático</SelectItem>
                    <SelectItem value="tiptronic">Tiptronic</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="fuel_type" className="flex items-center text-neutral-700">
                  <Clock className="w-4 h-4 mr-2" />
                  Combustible
                </Label>
                <Select defaultValue="Gasolina" {...register("fuel_type")}>
                  <SelectTrigger className="border-neutral-200 focus:border-neutral-400 focus:ring-neutral-400">
                    <SelectValue placeholder="Seleccione el combustible" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Gasolina">Gasolina</SelectItem>
                    <SelectItem value="Eléctrico">Eléctrico</SelectItem>
                    <SelectItem value="Híbrido">Híbrido</SelectItem>
                    <SelectItem value="Diesel">Diesel</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="exterior_color" className="flex items-center text-neutral-700">
                  <Palette className="w-4 h-4 mr-2" />
                  Color Exterior
                </Label>
                <Input
                  id="exterior_color"
                  {...register("exterior_color")}
                  className="border-neutral-200 focus:border-neutral-400 focus:ring-neutral-400"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="interior_color" className="flex items-center text-neutral-700">
                  <Palette className="w-4 h-4 mr-2" />
                  Color Interior
                </Label>
                <Input
                  id="interior_color"
                  {...register("interior_color")}
                  className="border-neutral-200 focus:border-neutral-400 focus:ring-neutral-400"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="engine" className="flex items-center text-neutral-700">
                <Settings className="w-4 h-4 mr-2" />
                Motor
              </Label>
              <Input
                id="engine"
                {...register("engine_type")}
                className="border-neutral-200 focus:border-neutral-400 focus:ring-neutral-400"
                placeholder="Ej: 2.0L Turbo"
              />
            </div>
            
            <div className="space-y-2">
              <Label className="flex items-center text-neutral-700">
                <ImagePlus className="w-4 h-4 mr-2" />
                Imágenes
              </Label>
              <div className="border-2 border-dashed border-neutral-200 rounded-lg p-4">
                <Input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImagesChange}
                  className="border-0 p-0 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-neutral-800 file:text-white hover:file:bg-neutral-700"
                />
                <p className="text-xs text-neutral-500 mt-2">
                  Agregue imágenes del vehículo. Recomendamos vistas exteriores e interiores.
                </p>
              </div>
              
              {/* Image Previews */}
              {imagePreviews.length > 0 && (
                <div className="grid grid-cols-3 md:grid-cols-4 gap-2 mt-3">
                  {imagePreviews.map((preview, index) => (
                    <div key={index} className="relative">
                      <img 
                        src={preview} 
                        alt={`Vista previa ${index + 1}`}
                        className="h-24 w-full object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 w-6 h-6 flex items-center justify-center"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description" className="flex items-center text-neutral-700">
                <Car className="w-4 h-4 mr-2" />
                Descripción
              </Label>
              <Textarea
                id="description"
                {...register("description")}
                className="border-neutral-200 focus:border-neutral-400 focus:ring-neutral-400 min-h-32"
                placeholder="Describa las características y estado del vehículo..."
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-neutral-900 hover:bg-neutral-800 text-white"
              disabled={isSubmitting}
              size="lg"
            >
              {isSubmitting ? 'Guardando...' : 'Agregar Vehículo'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  )
}