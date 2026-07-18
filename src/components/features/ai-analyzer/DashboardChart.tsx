"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";

interface DashboardChartProps {
  data: {
    summary: string;
    topTrends: string[];
  };
}

export function DashboardChart({ data }: DashboardChartProps) {
  // Map trends to a data format for Recharts with a mock impact score
  const chartData = data.topTrends.map((trend, index) => ({
    name: `Trend ${index + 1}`,
    fullTrend: trend,
    impact: Math.floor(Math.random() * 50) + 50, // Mock impact score 50-100
  }));

  return (
    <div className="space-y-6 mt-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <Card className="border-primary/10 shadow-lg bg-background/60 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-2xl text-primary">AI Analysis Summary</CardTitle>
          <CardDescription className="text-base text-foreground/80 leading-relaxed">
            {data.summary}
          </CardDescription>
        </CardHeader>
      </Card>

      <Card className="border-primary/10 shadow-lg bg-background/60 backdrop-blur-xl">
        <CardHeader>
          <CardTitle>Top Trends Impact</CardTitle>
          <CardDescription>Visualizing the potential business impact of identified trends.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis 
                  dataKey="name" 
                  stroke="#888888" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                />
                <YAxis 
                  stroke="#888888" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                  tickFormatter={(value) => `${value}%`} 
                />
                <Tooltip 
                  cursor={{ fill: "transparent" }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-background/95 border border-border p-3 rounded-lg shadow-xl max-w-xs">
                          <p className="font-semibold text-primary mb-1">{payload[0].payload.name}</p>
                          <p className="text-sm text-muted-foreground">{payload[0].payload.fullTrend}</p>
                          <p className="text-sm font-bold mt-2 text-accent">Impact Score: {payload[0].value}%</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar 
                  dataKey="impact" 
                  fill="currentColor" 
                  className="fill-primary" 
                  radius={[4, 4, 0, 0]} 
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="mt-6 space-y-3">
            <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">Identified Trends</h4>
            <ul className="space-y-2">
              {data.topTrends.map((trend, i) => (
                <li key={i} className="flex gap-3 items-start bg-secondary/30 p-3 rounded-md">
                  <span className="font-bold text-accent shrink-0">{i + 1}.</span>
                  <span className="text-sm">{trend}</span>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
