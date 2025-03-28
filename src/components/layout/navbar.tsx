"use client"
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image 
            src="/audi.svg" 
            alt="Audi Logo" 
            width={100} 
            height={40} 
            className="h-10 w-auto"
          />
        </Link>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-600 hover:text-gray-900 focus:outline-none"
          >
            {isOpen ? (
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M6 18L18 6M6 6l12 12" 
                />
              </svg>
            ) : (
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M4 6h16M4 12h16M4 18h16" 
                />
              </svg>
            )}
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center">
          <Link 
            href="/" 
            className="text-gray-800 dark:text-white hover:text-red-600 transition"
          >
            Inicio
          </Link>
          <Link 
            href="/empresa" 
            className="text-gray-800 dark:text-white hover:text-red-600 transition"
          >
            Empresa
          </Link>
          <Link 
            href="/catalogo" 
            className="text-gray-800 dark:text-white hover:text-red-600 transition"
          >
            Catálogo
          </Link>
          <Link 
            href="/postventa" 
            className="text-gray-800 dark:text-white hover:text-red-600 transition"
          >
            Post-Venta
          </Link>
          <Link 
            href="/contacto" 
            className="text-gray-800 dark:text-white hover:text-red-600 transition"
          >
            Contacto
          </Link>
        </div>

        {/* Mobile Menu Dropdown */}
        {isOpen && (
          <div className="absolute top-20 left-0 w-full bg-white dark:bg-gray-900 md:hidden">
            <div className="flex flex-col space-y-2 p-4">
              <Link 
                href="/" 
                className="text-gray-800 dark:text-white hover:bg-gray-100 p-2 rounded"
                onClick={() => setIsOpen(false)}
              >
                Inicio
              </Link>
              <Link 
                href="/empresa" 
                className="text-gray-800 dark:text-white hover:bg-gray-100 p-2 rounded"
                onClick={() => setIsOpen(false)}
              >
                Empresa
              </Link>
              <Link 
                href="/catalogo" 
                className="text-gray-800 dark:text-white hover:bg-gray-100 p-2 rounded"
                onClick={() => setIsOpen(false)}
              >
                Catálogo
              </Link>
              <Link 
                href="/postventa" 
                className="text-gray-800 dark:text-white hover:bg-gray-100 p-2 rounded"
                onClick={() => setIsOpen(false)}
              >
                Post-Venta
              </Link>
              <Link 
                href="/contacto" 
                className="text-gray-800 dark:text-white hover:bg-gray-100 p-2 rounded"
                onClick={() => setIsOpen(false)}
              >
                Contacto
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}