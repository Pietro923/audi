import { Button } from "@/components/ui/button";
import { 
  Building2, 
  Phone, 
  Mail,
  Facebook,
  Instagram,
  Linkedin,
  ArrowRight,
  Briefcase,
  Code,
  Clock
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const socialLinks = [
    { icon: Facebook, label: "Facebook", href:"https://www.facebook.com/AudiUBMotors" },
    { icon: Instagram, label: "Instagram", href:"https://www.instagram.com/audiubmotors/" },
    { icon: Linkedin, label: "LinkedIn", href:"" },
  ];
  return (
    <footer className="text-white" style={{ background: 'linear-gradient(178deg, #8c8c8c, #121212)' }}>
      <div className="container mx-auto px-4 relative">
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* About */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <Image 
                src="/audi.svg" 
                alt="UB Motors" 
                width={50} 
                height={50} 
              />
              <h2 className="text-2xl font-bold">UB Motors</h2>
            </div>
            <h3 className="text-xl font-bold w-fit border-b-2 border-red-500">Nuestra Filosofía</h3>
            <p className="text-gray-300 leading-relaxed">
              En UB Motors tenemos la filosofía de lograr la confianza de nuestros clientes, satisfaciendo sus necesidades. 
              Representamos una marca cuyas señas de identidad son: Compromiso de Servicio, Calidad y Tecnología. 
              Hemos implementado un sistema de Gestión de Calidad basado en la norma ISO 9001, garantizando excelencia 
              en cada uno de nuestros procesos.
            </p>
            <div className="flex gap-4 pt-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:bg-white/10 text-white rounded-full p-2 transition"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>
          {/* Contact */}
<div className="space-y-4">
  <h3 className="text-xl font-bold w-fit border-b-2 border-red-500">Contacto</h3>
  <div className="space-y-4">
    <div className="bg-white/5 p-4 rounded-lg">
      <div className="flex items-center gap-3 mb-2">
        <Building2 className="w-5 h-5 flex-shrink-0 text-red-500" />
        <h4 className="font-semibold text-white">Ubicación</h4>
      </div>
      <p className="text-gray-300 pl-8">Santiago del Estero 902 | Tucumán | Argentina</p>
    </div>

    <div className="bg-white/5 p-4 rounded-lg">
      <div className="flex items-center gap-3 mb-2">
        <Phone className="w-5 h-5 flex-shrink-0 text-red-500" />
        <h4 className="font-semibold text-white">Teléfonos</h4>
      </div>
      <div className="pl-8 space-y-1">
        <p className="text-gray-300">Ventas: +54 381 497-6908</p>
        <p className="text-gray-300">Whatsapp: +54 381 661-8632</p>
      </div>
    </div>

    <div className="bg-white/5 p-4 rounded-lg">
      <div className="flex items-center gap-3 mb-2">
        <Clock className="w-5 h-5 flex-shrink-0 text-red-500" />
        <h4 className="font-semibold text-white">Horario de Atención</h4>
      </div>
      <p className="text-gray-300 pl-8">Lunes a Viernes: 9:00 hs a 13:00 hs</p>
    </div>

    <div className="bg-white/5 p-4 rounded-lg">
      <div className="flex items-center gap-3 mb-2">
        <Mail className="w-5 h-5 flex-shrink-0 text-red-500" />
        <h4 className="font-semibold text-white">Correos Electrónicos</h4>
      </div>
      <div className="pl-8 space-y-1">
        <p className="text-gray-300"> <span className="font-bold text-red-500">Ventas:</span>  rojas.gonzalo@ubmotors.com.ar</p>
        <p className="text-gray-300"> <span className="font-bold text-red-500">Postventa:</span> jose.liberti@ubmotors.com.ar</p>
        <p className="text-gray-300"> <span className="font-bold text-red-500">Repuestos:</span> leonardo.cocha@ubmotors.com.ar</p>
        <p className="text-gray-300"> <span className="font-bold text-red-500">Turnos:</span> contacto@ubmotors.com.ar</p>
      </div>
    </div>
  </div>
</div>
          {/* Trabaja con nosotros */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 w-fit border-b-2 border-red-500">
              <Briefcase className="w-5 h-5" />
              <h3 className="text-xl font-bold">Trabaja con Nosotros</h3>
            </div>
            <p className="text-gray-300">
              ¿Querés ser parte de nuestro equipo? Dejanos tus datos y únete a nuestra comunidad profesional.
            </p>
            <Link href="/trabaja-con-nosotros">
              <Button className="w-full bg-red-600 text-white hover:bg-red-700 mt-5">
                Postularme
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
        <div className="py-6 border-t border-white/10 text-center text-gray-400 text-sm">
          <p className="mb-2">&copy; {new Date().getFullYear()} UB Motors. Todos los derechos reservados.</p>
          <a
            href="https://portfolio-bonacossa.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
          >
            <Code className="w-4 h-4" />
            <span>Design by P</span>
          </a>
        </div>
      </div>
    </footer>
  );
}