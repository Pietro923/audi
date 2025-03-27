'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase/client'
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card'
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts'

interface SalesData {
  month: string
  totalSales: number
  vehiclesSold: number
}

export function SalesOverview() {
  const [salesData, setSalesData] = useState<SalesData[]>([])
  const [totalStats, setTotalStats] = useState({
    totalVehicles: 0,
    totalValue: 0
  })

  useEffect(() => {
    fetchSalesData()
    fetchTotalStats()
  }, [])

  const fetchSalesData = async () => {
    // Esta es una simulación. En un caso real, necesitarías una vista o función en Supabase
    const mockData: SalesData[] = [
      { month: 'Ene', totalSales: 150000, vehiclesSold: 5 },
      { month: 'Feb', totalSales: 220000, vehiclesSold: 7 },
      { month: 'Mar', totalSales: 180000, vehiclesSold: 6 },
      { month: 'Abr', totalSales: 250000, vehiclesSold: 8 },
      { month: 'May', totalSales: 200000, vehiclesSold: 6 },
    ]
    setSalesData(mockData)
  }

  const fetchTotalStats = async () => {
    try {
      const { count: vehicleCount } = await supabase
        .from('vehicles')
        .select('*', { count: 'exact' })

      const { data: valueData } = await supabase
        .from('vehicles')
        .select('price')

      const totalValue = valueData?.reduce((sum, vehicle) => sum + vehicle.price, 0) || 0

      setTotalStats({
        totalVehicles: vehicleCount || 0,
        totalValue
      })
    } catch (error) {
      console.error('Error fetching stats:', error)
    }
  }

  return (
    <div className="grid md:grid-cols-2 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Resumen de Inventario</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p>Total de Vehículos: {totalStats.totalVehicles}</p>
            <p>Valor Total del Inventario: ${totalStats.totalValue.toLocaleString()}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Ventas Mensuales</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={salesData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="totalSales" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}