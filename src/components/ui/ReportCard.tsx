import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, FileBarChart } from "lucide-react";

import Link from "next/link";

interface ReportCardProps {
  id?: string;
  title: string;
  description: string;
  date: string;
  imageUrl?: string;
  category?: string;
}

export function ReportCard({ id, title, description, date, imageUrl, category = "Analytics" }: ReportCardProps) {
  return (
    <Card className="overflow-hidden flex flex-col hover:shadow-xl transition-all duration-300 border border-slate-800 group bg-slate-900 rounded-xl shadow-lg">
      <div className="relative w-full h-48 bg-slate-800 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src={imageUrl || "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&q=80"} 
          alt={title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
        />
        <div className="absolute top-3 left-3 bg-slate-950/90 backdrop-blur-md shadow-sm text-xs font-semibold px-2.5 py-1 rounded-md text-slate-200 border border-slate-700">
          {category}
        </div>
      </div>
      <CardHeader className="flex-none p-5 pb-2">
        <CardTitle className="text-xl line-clamp-1 group-hover:text-cyan-400 transition-colors text-slate-100">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 p-5 pt-0">
        <p className="text-slate-400 text-sm line-clamp-2 mt-2 leading-relaxed">{description}</p>
        
        {/* Meta Info Row: Price, Date, Rating */}
        <div className="flex items-center justify-between mt-5 pt-4 border-t border-slate-800/60 text-xs font-medium">
          <div className="flex items-center gap-1.5 text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-md">
            <span>Free</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-400">
            <Calendar className="w-3.5 h-3.5" />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-1 text-amber-400">
            <span>★ 4.8</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-5 pt-0 mt-auto">
        {id ? (
          <Link href={`/items/${id}`} className="w-full">
            <Button variant="secondary" className="w-full bg-slate-800 text-slate-300 hover:bg-cyan-500 hover:text-slate-950 transition-all shadow-sm border-0">
              View Details
            </Button>
          </Link>
        ) : (
          <Button variant="secondary" className="w-full bg-slate-800 text-slate-300 hover:bg-cyan-500 hover:text-slate-950 transition-all shadow-sm border-0">
            View Details
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
