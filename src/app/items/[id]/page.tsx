"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Loader2, ArrowLeft, FileText, Calendar, User } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ItemDetailsPage() {
  const { id } = useParams();
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["item", id],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/items/${id}`);
      if (!res.ok) throw new Error("Failed to fetch item details");
      return res.json();
    }
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-4rem)]">
        <Loader2 className="w-8 h-8 animate-spin text-cyan-400" />
      </div>
    );
  }

  if (isError || !data?.data) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-6">
        <Card className="max-w-md w-full bg-destructive/5 border-destructive/20 text-center p-8">
          <h2 className="text-xl font-bold text-destructive mb-2">Error</h2>
          <p className="text-slate-400">{error?.message || "Item not found"}</p>
          <Link href="/items/manage">
            <Button variant="outline" className="mt-6">Go Back</Button>
          </Link>
        </Card>
      </div>
    );
  }

  const item = data.data;

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-950 p-6 lg:p-12 relative overflow-hidden">
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto space-y-8 relative z-10">
        <div className="flex items-center gap-4">
          <Link href="/items/manage">
            <Button variant="ghost" size="icon" className="shrink-0 hover:bg-slate-800">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{item.title}</h1>
            <p className="text-slate-400 mt-1 flex items-center gap-4 text-sm">
              <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {new Date(item.createdAt).toLocaleDateString()}</span>
              <span className="flex items-center gap-1.5"><User className="w-4 h-4" /> {item.authorId}</span>
              <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 font-medium text-xs border border-primary/20">{item.category}</span>
            </p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="md:col-span-2 border-slate-800 shadow-xl shadow-primary/5 bg-slate-950/60 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-cyan-400" />
                Description
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-100 leading-relaxed whitespace-pre-wrap">{item.description}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
