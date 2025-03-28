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

export default function Footer() {
  const socialLinks = [
    { icon: Facebook, label: "Facebook", href:"https://www.facebook.com/AudiUBMotors" },
    { icon: Instagram, label: "Instagram", href:"https://www.instagram.com/audiubmotors/" },
    { icon: Linkedin, label: "LinkedIn", href:"" },
  ];

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 to-red-900 text-white">
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:30px_30px]" />
      
      <div className="container mx-auto px-4 relative">
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* About */}
          <div className="space-y-4">
            <img src="audi.svg" alt="UB Motors" /> <h2>UB Motors</h2>
            <h3 className="text-xl font-bold w-fit border-b-2 border-red-500">Sobre Nosotros</h3>
            <p className="text-gray-300 leading-relaxed">
              Pueble S.A. es líder en maquinaria agrícola y de construcción, ofreciendo soluciones 
              confiables y de calidad para el campo argentino desde hace más de 20 años.
            </p>
            <div className="flex gap-4">
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
            <ul className="space-y-3">
              <li className="flex gap-3 text-gray-300">
                <Building2 className="w-5 h-5 flex-shrink-0" />
                <span>Santiago del Estero 902 | Tucumán | Argentina</span>
              </li>
              <li className="flex gap-3 text-gray-300">
                <Phone className="w-5 h-5 flex-shrink-0" />
                <span>3814976908</span>
              </li>
              <li className="flex gap-3 text-gray-300">
                <Clock className="w-5 h-5 flex-shrink-0" />
                <span>De 9:00 hs a 13:00 hs</span>
              </li>
              <ul className="space-y-3">
                <li className="flex gap-3 text-gray-300">
                  <Mail className="w-5 h-5 flex-shrink-0" />
                  <span>Ventas: rojas.gonzalo@ubmotors.com.ar</span>
                </li>
                <li className="flex gap-3 text-gray-300">
                  <Mail className="w-5 h-5 flex-shrink-0" />
                  <span>Postventa: jose.liberti@ubmotors.com.ar</span>
                </li>
                <li className="flex gap-3 text-gray-300">
                  <Mail className="w-5 h-5 flex-shrink-0" />
                  <span>Repuestos: leonardo.cocha@ubmotors.com.ar</span>
                </li>
                <li className="flex gap-3 text-gray-300">
                  <Mail className="w-5 h-5 flex-shrink-0" />
                  <span>Turnos: contacto@ubmotors.com.ar</span>
                </li>
              </ul>
            </ul>
          </div>

          {/* Trabaja con nosotros */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 w-fit border-b-2 border-red-500">
              <Briefcase className="w-5 h-5" />
              <h3 className="text-xl font-bold">Trabaja con Nosotros</h3>
            </div>
            <p className="text-gray-300">
              ¿Querés ser parte de nuestro equipo? Dejanos tus datos.
            </p>
            <Link href="/trabaja-con-nosotros">
              <Button className="w-full bg-white text-gray-900 hover:bg-gray-200 mt-5">
                Postularme
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>

        <div className="py-6 border-t border-white/10 text-center text-gray-400 text-sm">
          <p className="mb-2">&copy; {new Date().getFullYear()} Pueble S.A. Todos los derechos reservados.</p>
          <a
            href="https://portfolio-bonacossa.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
          >
            <Code className="w-4 h-4" />
            <span>Desing by P</span>
          </a>
        </div>
      </div>
    </footer>
  );
}