'use client'

import Image from 'next/image'
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card"
import { 
  Building2, 
  Factory, 
  MapPin,  
  Shield, 
  Phone,
  Wrench,
  ArrowRight,
} from 'lucide-react'
import { useEffect, useState } from 'react'

export default function Company() {
  const [contactLink, setContactLink] = useState("");
  const facilities = [
    {
      icon: Factory,
      title: 'Planta Principal',
      description: 'Moderna planta de producción con tecnología de última generación'
    },
    {
      icon: Wrench,
      title: 'Taller Especializado',
      description: 'Centro de servicio técnico y mantenimiento certificado'
    },
    {
      icon: Shield,
      title: 'Control de Calidad',
      description: 'Laboratorio de pruebas y certificación de equipos'
    }
  ];

  const teams = [
    {
      image: "/imagenes/equipos/postventa.jpeg",
      name: "Equipo de Postventa",
      description: "Expertos en mantenimiento y soporte técnico para garantizar el máximo rendimiento de tus equipos."
    },
    {
      image: "/imagenes/equipos/afs.jpeg",
      name: "Equipo AFS",
      description: "Especialistas en sistemas de agricultura de precisión para optimizar tus cosechas."
    },
    {
      image: "/imagenes/equipos/administracion.jpg",
      name: "Administración",
      description: "Nuestro equipo administrativo asegura una gestión eficiente y transparente."
    }
  ];
  
  useEffect(() => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
      setContactLink("tel:+543814530680"); // Llamada en móviles
    } else {
      setContactLink("https://wa.me/543816618632"); // WhatsApp en PC
    }
  }, []);

  return (
    <section className="min-h-screen bg-gradient-to-br from-red-900 via-black to-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto px-4 relative">
        {/* Título y descripción */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 text-white border-b-2 border-red-500 w-fit mx-auto">Nuestras Instalaciones</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Infraestructura de primer nivel para garantizar la mejor calidad en 
            productos y servicios para el sector agrícola
          </p>
        </motion.div>

        {/* Sección de instalaciones */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <Card className="bg-white/10 backdrop-blur-sm border-0 hover:bg-white/15 transition-colors duration-300 text-white">
              <CardHeader>
                <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-gradient-to-br from-red-600 to-red-800 rounded-lg shadow-md">
                    <Building2 className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle>Sede Central</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2 text-gray-300">
                  <MapPin className="w-5 h-5" />
                  <span className="font-semibold">Tucumán, Argentina</span>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  Nuestra sede central cuenta con más de <span className="font-semibold">5000m²</span> dedicados a la 
                  exhibición, venta y mantenimiento de <span className="font-semibold">maquinaria agrícola y de construcción </span> de 
                  primera línea.
                </p>
                <Button className="bg-red-600 hover:bg-red-700">
      <a href={contactLink} target="_blank" rel="noopener noreferrer">
        Contactar
      </a>
      <Phone className="ml-2 w-4 h-4" />
    </Button>

              </CardContent>
            </Card>

            <div className="relative">
              <Image
                src="/imagenes/empresa/imagen 2.jpg"
                alt="Vista aérea de Pueble S.A."
                width={800}
                height={100}
                className="rounded-lg shadow-xl"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-transparent rounded-lg" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid gap-6"
          >
            {facilities.map((facility, index) => {
              const Icon = facility.icon;
              return (
                <Card 
                  key={index} 
                  className="bg-white/10 backdrop-blur-sm border-0 hover:bg-white/15 transition-colors duration-300 text-white"
                >
                  <CardHeader>
                    <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-br from-red-600 to-red-800 rounded-lg shadow-md">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <CardTitle className="text-lg">{facility.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300">{facility.description}</p>
                  </CardContent>
                </Card>
              );
            })}

            <Button 
              className="w-full bg-red-600 hover:bg-red-700"
            >
              <a href="https://web.whatsapp.com/send?phone=3816618632&text=Hola!%20Quiero%20agendar%20una%20visita" target="_blank" rel="noopener noreferrer"> 
              Agendar una Visita
            </a>
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </motion.div>
        </div>

        {/* Sección de equipos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-3xl font-bold text-white text-center mb-8 border-b-2 border-red-500 w-fit mx-auto">Nuestros Equipos</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teams.map((team, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-sm border-0 hover:bg-white/15 transition-colors duration-300 text-white">
                <CardHeader>
                  <div className="relative h-48 w-full">
                    <Image
                      src={team.image}
                      alt={team.name}
                      fill
                      className="object-cover rounded-t-lg"
                    />
                  </div>
                </CardHeader>
                <CardContent className="mt-4">
                  <CardTitle className="text-xl mb-2">{team.name}</CardTitle>
                  <p className="text-gray-300">{team.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Video de visita guiada */}
        <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="mb-16"
      >
        <h3 className="text-3xl font-bold text-white text-center mb-8 border-b-2 border-red-500 w-fit mx-auto">Visita Guiada</h3>
        <div className="relative aspect-video rounded-lg overflow-hidden">
          <video
            src="/videos/visita.mp4"
            controls
            preload="metadata"
            playsInline
            poster="/videos/thumbnail.jpg" 
            className="w-full h-full"
          >
            Tu navegador no soporta la reproducción de videos.
          </video>
        </div>
      </motion.div>

        {/* Estadísticas 
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative p-6 bg-white/10 backdrop-blur-sm rounded-lg shadow-lg"
        >
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <h3 className="text-4xl font-bold text-red-600 mb-2">+5000m²</h3>
              <p className="text-gray-300">De instalaciones</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-red-600 mb-2">24/7</h3>
              <p className="text-gray-300">Soporte técnico</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-red-600 mb-2">+15</h3>
              <p className="text-gray-300">Centros de servicio</p>
            </div>
          </div>
        </motion.div>
        */}
      </div>
    </section>
  );
}