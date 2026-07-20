"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Edit2, Eye, FileText, Trash2, Plus, Loader2, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { authClient } from "@/lib/auth-client";

interface Item {
  _id: string;
  title: string;
  description: string;
  category: string;
  authorId: string;
  authorEmail?: string;
  createdAt: string;
  fileUrl?: string;
}

export default function ManageItemsPage() {
  const queryClient = useQueryClient();

  // Retrieve the current user's session so we can scope items to the real user
  const { data: sessionData, isPending: isSessionLoading } = authClient.useSession();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["user-items", sessionData?.user?.email],
    queryFn: async () => {
      // Secure backend fetching: pass authorEmail to ONLY fetch the user's items
      const url = sessionData?.user?.email ? '/api/items?authorEmail=' + sessionData.user.email : '/api/items';
      const res = await fetch(
        url,
        { credentials: "include" }
      );
      if (!res.ok) throw new Error("Failed to fetch items");
      return res.json();
    },
    // Prevent fetching until session is available, or run if no session is expected (though manage items requires auth)
    enabled: !isSessionLoading && !!sessionData?.user?.email,
    retry: 1
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/items/${id}`, {
        method: "DELETE",
        // credentials:'include' is required to forward the HttpOnly session cookie
        // to the cross-origin Express server for requireAuth verification
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to delete item");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-items"] });
      queryClient.invalidateQueries({ queryKey: ["items"] });
    },
  });

  const rawItems: Item[] = data?.data || [];
  
  // Strict Client-Side Filter: Users can ONLY see their own items.
  const items = rawItems.filter(item => 
    sessionData?.user?.id === item.authorId || 
    (item.authorEmail && sessionData?.user?.email === item.authorEmail)
  );

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-950 p-6 lg:p-12">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Manage Items</h1>
            <p className="text-slate-400 mt-2">View, edit, or delete your uploaded datasets and reports.</p>
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
            <div className="flex justify-center p-12"><Loader2 className="w-8 h-8 animate-spin text-cyan-400" /></div>
          ) : isError ? (
            <Card className="bg-destructive/5 border-destructive/20">
              <CardContent className="flex flex-col items-center justify-center p-12 text-center text-destructive">
                <AlertCircle className="w-12 h-12 mb-4 opacity-80" />
                <h3 className="text-lg font-semibold">Error Loading Items</h3>
                <p className="mt-2 max-w-sm opacity-80">{error?.message || "Could not connect to the backend server."}</p>
              </CardContent>
            </Card>
          ) : items.length === 0 ? (
            <Card className="bg-slate-950/50 backdrop-blur-sm border-dashed">
              <CardContent className="flex flex-col items-center justify-center p-12 text-center">
                <FileText className="w-12 h-12 text-slate-400 mb-4 opacity-20" />
                <h3 className="text-lg font-semibold">No items found</h3>
                <p className="text-slate-400 mt-2 max-w-sm">You haven&apos;t uploaded any items yet. Start by uploading a dataset.</p>
                <Link href="/items/add" className="mt-6">
                  <Button variant="outline">Upload First Item</Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            items.map((item: Item) => (
              <Card key={item._id} className="group border border-slate-800 hover:border-slate-700 hover:shadow-lg transition-all duration-300 bg-slate-900 rounded-xl shadow-md">
                <CardContent className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <div className="w-12 h-12 rounded-lg bg-slate-800 flex items-center justify-center shrink-0 text-cyan-500 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-colors duration-300 shadow-sm">
                      <FileText className="w-6 h-6" />
                    </div>
                    <div className="overflow-hidden">
                      <h3 className="font-semibold text-lg truncate text-slate-100" title={item.title}>{item.title}</h3>
                      <div className="flex flex-wrap items-center gap-3 text-sm text-slate-400 mt-1">
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

                  <div className="flex items-center gap-2 w-full sm:w-auto justify-end pt-4 sm:pt-0 border-t sm:border-0 border-slate-800 mt-2 sm:mt-0">
                    <Link href={`/items/${item._id}`} className="hidden sm:inline-block">
                      <Button variant="outline" size="sm" className="w-full hover:bg-slate-800">
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </Button>
                    </Link>
                    <Link href={`/items/${item._id}`} className="sm:hidden inline-block">
                      <Button variant="outline" size="icon" className="hover:bg-slate-800">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </Link>

                    {(sessionData?.user?.id === item.authorId || (item.authorEmail && sessionData?.user?.email === item.authorEmail)) && (
                      <>
                        <Link href={`/items/${item._id}/edit`} className="hidden sm:inline-block">
                          <Button variant="outline" size="sm" className="w-full hover:bg-slate-800">
                            <Edit2 className="w-4 h-4 mr-2" />
                            Edit
                          </Button>
                        </Link>
                        <Link href={`/items/${item._id}/edit`} className="sm:hidden inline-block">
                          <Button variant="outline" size="icon" className="hover:bg-slate-800">
                            <Edit2 className="w-4 h-4" />
                          </Button>
                        </Link>

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
                      </>
                    )}
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
