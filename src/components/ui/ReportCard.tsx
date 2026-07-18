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
        {imageUrl ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-slate-800 text-slate-500 group-hover:scale-105 transition-transform duration-500">
            <FileBarChart className="w-12 h-12 opacity-20" />
          </div>
        )}
        <div className="absolute top-3 left-3 bg-slate-950/90 backdrop-blur-md shadow-sm text-xs font-semibold px-2.5 py-1 rounded-md text-slate-200 border border-slate-700">
          {category}
        </div>
      </div>
      <CardHeader className="flex-none p-5 pb-2">
        <CardTitle className="text-xl line-clamp-1 group-hover:text-cyan-400 transition-colors text-slate-100">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 p-5 pt-0">
        <p className="text-slate-400 text-sm line-clamp-2 mt-2 leading-relaxed">{description}</p>
        <div className="flex items-center gap-2 mt-4 text-xs text-slate-500 font-medium">
          <Calendar className="w-3.5 h-3.5" />
          <span>{date}</span>
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
