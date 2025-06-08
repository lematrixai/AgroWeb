"use client"

import { useState } from "react"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "@/components/ui/chart"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data for charts
const lineChartData = [
  { name: "Jan", healthy: 400, msv: 240, mln: 100 },
  { name: "Feb", healthy: 300, msv: 280, mln: 120 },
  { name: "Mar", healthy: 200, msv: 220, mln: 180 },
  { name: "Apr", healthy: 278, msv: 250, mln: 190 },
  { name: "May", healthy: 189, msv: 310, mln: 230 },
  { name: "Jun", healthy: 239, msv: 340, mln: 270 },
  { name: "Jul", healthy: 349, msv: 290, mln: 220 },
]

const barChartData = [
  { name: "Eastern", healthy: 400, msv: 240, mln: 100 },
  { name: "Western", healthy: 300, msv: 280, mln: 120 },
  { name: "Northern", healthy: 200, msv: 220, mln: 180 },
  { name: "Southern", healthy: 278, msv: 250, mln: 190 },
  { name: "Central", healthy: 189, msv: 310, mln: 230 },
]

const pieChartData = [
  { name: "Healthy", value: 1274 },
  { name: "MSV", value: 684 },
  { name: "MLN", value: 387 },
]

const COLORS = ["#10b981", "#eab308", "#ef4444"]

export default function AdminDashboard() {
  const [chartType, setChartType] = useState<"line" | "bar" | "pie">("line")

  return (
    <div className="space-y-4">
      <Tabs defaultValue="line" className="w-full" onValueChange={(value) => setChartType(value as any)}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="line">Trend</TabsTrigger>
          <TabsTrigger value="bar">By Region</TabsTrigger>
          <TabsTrigger value="pie">Distribution</TabsTrigger>
        </TabsList>

        <TabsContent value="line" className="space-y-4">
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={lineChartData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="healthy" stroke="#10b981" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="msv" stroke="#eab308" />
                <Line type="monotone" dataKey="mln" stroke="#ef4444" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>

        <TabsContent value="bar" className="space-y-4">
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={barChartData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="healthy" fill="#10b981" />
                <Bar dataKey="msv" fill="#eab308" />
                <Bar dataKey="mln" fill="#ef4444" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>

        <TabsContent value="pie" className="space-y-4">
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
