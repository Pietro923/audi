'use client'
import Image from 'next/image'
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card"
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
      description: 'Centro de operaciones dedicado a conocer y satisfacer las necesidades de nuestros clientes, garantizando el cumplimiento de los más altos estándares de calidad.'
    },
    {
      icon: Wrench,
      title: 'Taller Especializado',
      description: 'Infraestructura tecnológica de vanguardia que potencia la eficacia de nuestros recursos humanos y técnicos para asegurar trabajos de máxima calidad.'
    },
    {
      icon: Shield,
      title: 'Control de Calidad',
      description: 'Sistema integral de supervisión que garantiza la excelencia en cada etapa del proceso, con un equipo profesional altamente capacitado.'
    },
    {
      icon: Building2,
      title: 'Gestión Estratégica',
      description: 'Mejora continua de nuestros procesos para adaptarnos dinámicamente a las exigencias de un mercado competitivo y en constante evolución.'
    }
  ];

  const strategicBlocks = [
    {
      title: 'Misión',
      description: 'Ser una empresa de vanguardia en la industria automotriz, ofreciendo soluciones premium que superen las expectativas de nuestros clientes, con un compromiso inquebrantable de calidad y servicio.',
      color: 'bg-gray-100'
    },
    {
      title: 'Visión', 
      description: 'Consolidarnos como líderes en cada segmento del mercado automotriz, impulsados por un equipo humano altamente motivado, generando valor para clientes, proveedores y colaboradores.',
      color: 'bg-gray-100'
    },
    {
      title: 'Valores',
      description: 'Integridad, excelencia, compromiso, innovación y respeto. Trabajamos con pasión, buscando la satisfacción total de nuestros clientes y el desarrollo continuo de nuestro equipo.',
      color: 'bg-gray-100'
    }
  ];

  useEffect(() => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    setContactLink(isMobile ? "tel:+543814530680" : "https://wa.me/543816618632");
  }, []);

  return (
    <section className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 font-extralight ">
      {/* Hero Section */}
      <div className="relative h-96 w-full mb-16">
        <img 
          
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-extralight text-white mb-4">UB Motors</h1>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto font-extralight">
              Innovación, progreso y sofisticación. Así definimos nuestro compromiso con la excelencia automotriz.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 relative">
        {/* About Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Nuestra Filosofía</h2>
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/2">
              <img 
                src="https://placehold.co/600x400" 
                alt="Audi Philosophy"
                width={600}
                height={400}
                className="rounded-lg shadow-lg "
              />
            </div>
            <div className="md:w-1/2 text-left">
              <p className="text-lg text-gray-600 mb-6">
                En Audi, nuestra filosofía se centra en la innovación constante y la búsqueda de la perfección técnica. 
                Nos comprometemos a ofrecer vehículos que combinen rendimiento excepcional, diseño vanguardista y tecnología 
                de punta para una experiencia de conducción incomparable.
              </p>
              <p className="text-lg text-gray-600">
                Cada modelo Audi representa nuestra pasión por el progreso y nuestro respeto por la tradición automotriz 
                alemana, creando automóviles que inspiran y superan expectativas.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Facilities Section */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">Nuestras Instalaciones</h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <img 
                  src="https://placehold.co/600x300" 
                  alt="Audi Headquarters"
                  width={600}
                  height={300}
                  className="w-full rounded-t-lg"
                />
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-gray-900 rounded-lg">
                      <Building2 className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-xl">Sede Central</CardTitle>
                  </div>
                  <CardDescription className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    Ingolstadt, Alemania
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Nuestra sede central de 2.3 millones de m² alberga el corazón de la innovación Audi, 
                    donde diseño, ingeniería y manufactura se unen para crear los vehículos del futuro.
                  </p>
                  <Button variant="outline" className="border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white" asChild>
                    <a href={contactLink} target="_blank" rel="noopener noreferrer">
                      Contactar <Phone className="ml-2 w-4 h-4" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {facilities.map((facility, index) => {
                const Icon = facility.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card className="h-full border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                      <CardHeader className="pb-2">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-gray-900 rounded-lg">
                            <Icon className="w-5 h-5 text-white" />
                          </div>
                          <CardTitle className="text-lg">{facility.title}</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 text-sm">{facility.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Strategy Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">Nuestra Estrategia</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {strategicBlocks.map((block, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className={`${block.color} p-6 rounded-lg h-full border border-gray-200 shadow-sm`}>
                  <h4 className="text-xl font-bold text-gray-900 mb-3">{block.title}</h4>
                  <p className="text-gray-600">{block.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Image Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <img 
            src="https://placehold.co/400x300" 
            alt="Audi Factory"
            width={400}
            height={300}
            className="rounded-lg object-cover h-full"
          />
          <img 
            src="https://placehold.co/400x300" 
            alt="Audi Design"
            width={400}
            height={300}
            className="rounded-lg object-cover h-full"
          />
          <img 
            src="https://placehold.co/400x300" 
            alt="Audi Technology"
            width={400}
            height={300}
            className="rounded-lg object-cover h-full"
          />
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center bg-gray-50 p-12 rounded-lg"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-4">¿Listo para experimentar la excelencia Audi?</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Descubre cómo podemos llevar tu experiencia automotriz al siguiente nivel.
          </p>
          <Button className="bg-gray-900 hover:bg-gray-800 px-8 py-4 text-lg" asChild>
            <a href="https://www.audi.com" target="_blank" rel="noopener noreferrer">
              Contactar con Audi <ArrowRight className="ml-2 w-5 h-5" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}