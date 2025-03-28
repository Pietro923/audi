'use client'
import Image from 'next/image'
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { 
  Wrench, 
  ShieldCheck, 
  PhoneCall,
  ArrowRight,
  Car,
  Shield,
  Shirt
} from 'lucide-react'

export default function PostVenta() {
  const servicios = [
    {
      icon: ShieldCheck,
      title: "Garantía Audi",
      description: "Descubre toda la información sobre la garantía Audi y sus características exclusivas.",
      buttonText: "Más información"
    },
    {
      icon: Car,
      title: "Repuestos Originales",
      description: "Todas las piezas y repuestos originales de Audi, adaptados a la calidad y experiencia de siempre.",
      buttonText: "Ver Catálogo"
    },
    {
      icon: Shirt,
      title: "Accesorios Originales",
      description: "Sumale a tu auto tu toque original y personal con los Accesorios Originales Audi.",
      buttonText: "Explorar"
    }
  ];

  const beneficios = [
    {
      icon: Wrench,
      title: "Mantenimiento Especializado",
      description: "Servicio técnico de alta precisión para tu Audi, con tecnología de punta y técnicos certificados."
    },
    {
      icon: PhoneCall,
      title: "Asesoramiento Personalizado",
      description: "Contamos con asesores especializados para resolver todas tus dudas y necesidades."
    },
    {
      icon: Shield,
      title: "Garantía Extendida",
      description: "Protección adicional y tranquilidad para tu vehículo más allá de la garantía original."
    }
  ];

  return (
    <section className="min-h-screen  py-12 px-4 sm:px-6 lg:px-8">
      {/* Hero Section with Minimalist Overlay */}
      <div className="relative h-[32rem] w-full mb-16 rounded-2xl overflow-hidden">
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center px-4"
          >
            <h1 className="text-4xl md:text-5xl font-extralight text-white mb-4 tracking-tight">Servicio Post-Venta Audi</h1>
            <p className="text-xl text-neutral-200 max-w-2xl mx-auto font-light">
              Excelencia en cada detalle para mantener tu Audi en perfecto estado.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Servicios Principales con Diseño de Tarjetas Minimalista */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-2xl font-light text-neutral-800 text-center mb-12">Nuestros Servicios</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {servicios.map((servicio, index) => {
              const Icon = servicio.icon;
              return (
                <motion.div
                  key={index}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all"
                >
                  <div className="flex flex-col items-center">
                    <div className="p-3 bg-neutral-100 rounded-full mb-4">
                      <Icon className="w-7 h-7 text-neutral-700" />
                    </div>
                    <h4 className="text-xl font-medium text-neutral-800 mb-3 text-center">{servicio.title}</h4>
                    <p className="text-neutral-600 text-center mb-6 min-h-[75px]">{servicio.description}</p>
                    <Button 
                      variant="outline" 
                      className="w-full border-neutral-400 text-neutral-800 hover:bg-neutral-100 hover:border-neutral-500"
                    >
                      {servicio.buttonText} <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Sección de Beneficios con Layout Minimalista */}
        <div className="bg-white border border-neutral-200 rounded-2xl p-12 mb-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <h3 className="text-2xl font-light text-neutral-800 mb-6">Beneficios Exclusivos</h3>
              <div className="space-y-6">
                {beneficios.map((beneficio, index) => {
                  const Icon = beneficio.icon;
                  return (
                    <div key={index} className="flex items-start gap-4 border-b border-neutral-200 pb-6 last:border-0">
                      <div className="p-2 bg-neutral-100 rounded-lg mt-1">
                        <Icon className="w-5 h-5 text-neutral-700" />
                      </div>
                      <div>
                        <h4 className="font-medium text-neutral-800 mb-2">{beneficio.title}</h4>
                        <p className="text-neutral-600">{beneficio.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="order-1 md:order-2">
              <img 
                src="/api/placeholder/600/400" 
                alt="Audi Taller"
                className="rounded-xl shadow-lg grayscale hover:grayscale-0 transition-all"
              />
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center bg-neutral-100 p-12 rounded-2xl"
        >
          <h3 className="text-2xl font-light text-neutral-900 mb-4">¿Necesitas asistencia con tu Audi?</h3>
          <p className="text-neutral-600 mb-6 max-w-2xl mx-auto">
            Nuestros especialistas están listos para brindarte el mejor servicio.
          </p>
          <Button 
            className="bg-neutral-900 hover:bg-neutral-800 px-8 py-4 text-lg" 
            asChild
          >
            <a href="https://www.audi.com" target="_blank" rel="noopener noreferrer">
              Solicitar Turno <PhoneCall className="ml-2 w-5 h-5" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}