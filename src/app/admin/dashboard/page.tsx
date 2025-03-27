'use client'

import { useState } from 'react'
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card'
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs'
import { VehicleForm } from '@/components/admin/vehicle-form'
import { VehicleList } from '@/components/admin/vehicle-list'
import { SalesOverview } from '@/components/admin/sales-overview'

export default function AdminDashboard() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Panel de Administración</h1>
      
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Resumen</TabsTrigger>
          <TabsTrigger value="add-vehicle">Agregar Vehículo</TabsTrigger>
          <TabsTrigger value="vehicle-list">Lista de Vehículos</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <SalesOverview />
        </TabsContent>
        
        <TabsContent value="add-vehicle">
          <VehicleForm />
        </TabsContent>
        
        <TabsContent value="vehicle-list">
          <VehicleList />
        </TabsContent>
      </Tabs>
    </div>
  )
}