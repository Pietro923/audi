import React from 'react';

// Define a type for our vehicle
interface Vehicle {
  id: number;
  make: string;
  model: string;
  year: number;
  price: number;
  imageUrl: string;
  description: string;
}

// Sample vehicle data
const vehicles: Vehicle[] = [
  {
    id: 1,
    make: 'Toyota',
    model: 'Camry',
    year: 2023,
    price: 28500,
    imageUrl: '/api/placeholder/400/300',
    description: 'Sedán familiar con excelente eficiencia de combustible y comodidad.'
  },
  {
    id: 2,
    make: 'Ford',
    model: 'Mustang',
    year: 2022,
    price: 45000,
    imageUrl: '/api/placeholder/400/300',
    description: 'Potente muscle car con diseño clásico y rendimiento excepcional.'
  },
  {
    id: 3,
    make: 'Tesla',
    model: 'Model 3',
    year: 2024,
    price: 52000,
    imageUrl: '/api/placeholder/400/300',
    description: 'Vehículo eléctrico de última generación con tecnología de punta.'
  },
  {
    id: 4,
    make: 'Honda',
    model: 'CR-V',
    year: 2023,
    price: 32000,
    imageUrl: '/api/placeholder/400/300',
    description: 'SUV compacto ideal para familias, con versatilidad y seguridad.'
  }
];

export default function Catalog() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Catálogo de Vehículos</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {vehicles.map((vehicle) => (
          <div 
            key={vehicle.id} 
            className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <img 
              src={vehicle.imageUrl} 
              alt={`${vehicle.make} ${vehicle.model}`} 
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-2xl font-semibold mb-2">
                {vehicle.make} {vehicle.model}
              </h2>
              <p className="text-gray-600 mb-2">
                Año: {vehicle.year}
              </p>
              <p className="text-lg font-bold text-green-600 mb-2">
                ${vehicle.price.toLocaleString()}
              </p>
              <p className="text-gray-500 mb-4">
                {vehicle.description}
              </p>
              <a href='vehiculo'
                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
              >
                Ver Detalles
              </a>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}