"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Edit2, Eye, FileText, Trash2, Plus, Loader2, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export default function ManageItemsPage() {
  const queryClient = useQueryClient();
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["user-items"],
    queryFn: async () => {
      // Dummy authorId for now until real auth is wired up
      const res = await fetch(`${API_URL}/items?authorId=dummy_user_123`);
      if (!res.ok) throw new Error("Failed to fetch items");
      return res.json();
    },
    retry: 1
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`${API_URL}/items/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete item");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-items"] });
      queryClient.invalidateQueries({ queryKey: ["items"] }); // Also invalidate explore page
    }
  });

  const items = data?.data || [];

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-background p-6 lg:p-12">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Manage Items</h1>
            <p className="text-muted-foreground mt-2">View, edit, or delete your uploaded datasets and reports.</p>
          </div>
          <Link href="/items/add">
            <Button className="shadow-sm hover:shadow-md transition-shadow">
              <Plus className="w-4 h-4 mr-2" />
              Upload New Item
            </Button>
          </Link>
        </div>

        {/* Responsive Grid representation of a Table for better mobile UX */}
        <div className="grid gap-4">
          {isLoading ? (
            <div className="flex justify-center p-12"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
          ) : isError ? (
            <Card className="bg-destructive/5 border-destructive/20">
              <CardContent className="flex flex-col items-center justify-center p-12 text-center text-destructive">
                <AlertCircle className="w-12 h-12 mb-4 opacity-80" />
                <h3 className="text-lg font-semibold">Error Loading Items</h3>
                <p className="mt-2 max-w-sm opacity-80">{error?.message || "Could not connect to the backend server."}</p>
              </CardContent>
            </Card>
          ) : items.length === 0 ? (
            <Card className="bg-background/50 backdrop-blur-sm border-dashed">
              <CardContent className="flex flex-col items-center justify-center p-12 text-center">
                <FileText className="w-12 h-12 text-muted-foreground mb-4 opacity-20" />
                <h3 className="text-lg font-semibold">No items found</h3>
                <p className="text-muted-foreground mt-2 max-w-sm">You haven't uploaded any items yet. Start by uploading a dataset.</p>
                <Link href="/items/add" className="mt-6">
                  <Button variant="outline">Upload First Item</Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            items.map((item: any) => (
              <Card key={item._id} className="group border-primary/10 hover:border-primary/30 hover:shadow-md transition-all duration-300 bg-background/50 backdrop-blur-sm">
                <CardContent className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center shrink-0 text-accent group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300 shadow-sm">
                      <FileText className="w-6 h-6" />
                    </div>
                    <div className="overflow-hidden">
                      <h3 className="font-semibold text-lg truncate" title={item.title}>{item.title}</h3>
                      <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mt-1">
                        <span className="flex items-center gap-1.5 font-medium">
                          <span className="w-2 h-2 rounded-full bg-green-500"></span>
                          Ready
                        </span>
                        <span className="hidden sm:inline">•</span>
                        <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                        <span className="hidden sm:inline">•</span>
                        <span>{item.category}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto justify-end pt-4 sm:pt-0 border-t sm:border-0 border-border mt-2 sm:mt-0">
                    <Button variant="outline" size="sm" className="hidden sm:flex hover:bg-secondary">
                      <Eye className="w-4 h-4 mr-2" />
                      View
                    </Button>
                    <Button variant="outline" size="icon" className="sm:hidden hover:bg-secondary">
                      <Eye className="w-4 h-4" />
                    </Button>

                    <Button variant="outline" size="sm" className="hidden sm:flex hover:bg-secondary">
                      <Edit2 className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                    <Button variant="outline" size="icon" className="sm:hidden hover:bg-secondary">
                      <Edit2 className="w-4 h-4" />
                    </Button>

                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="hidden sm:flex text-destructive hover:bg-destructive/10 hover:text-destructive"
                      onClick={() => deleteMutation.mutate(item._id)}
                      disabled={deleteMutation.isPending}
                    >
                      {deleteMutation.isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Trash2 className="w-4 h-4 mr-2" />}
                      Delete
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="sm:hidden text-destructive hover:bg-destructive/10 hover:text-destructive"
                      onClick={() => deleteMutation.mutate(item._id)}
                      disabled={deleteMutation.isPending}
                    >
                      {deleteMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
