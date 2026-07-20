"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Loader2, ArrowLeft, FileText, Calendar, User, Sparkles, MessageSquare, Star } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

interface Review {
  _id: string;
  userId: string;
  userName: string;
  text: string;
  rating: number;
  createdAt: string;
}

export default function ItemDetailsPage() {
  const { id } = useParams();
  const queryClient = useQueryClient();

  const { data: session } = authClient.useSession();

  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(5);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["item", id],
    queryFn: async () => {
      const res = await fetch(`/api/items/${id}`);
      if (!res.ok) throw new Error("Failed to fetch item details");
      return res.json();
    }
  });

  const reviewMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch(`/api/items/${id}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: reviewText, rating: reviewRating, userName: session?.user?.name || session?.user?.email || "Anonymous", userId: session?.user?.id }),
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to submit review");
      return res.json();
    },
    onSuccess: () => {
      toast.success("Review submitted!");
      setReviewText("");
      setReviewRating(5);
      queryClient.invalidateQueries({ queryKey: ["item", id] });
    },
    onError: () => {
      toast.error("Failed to submit review. Are you logged in?");
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

  // Format AI Response nicely if it's a JSON string
  let formattedAiResponse = item.aiResponse;
  try {
    if (item.aiResponse && item.aiResponse.startsWith("{")) {
      const parsed = JSON.parse(item.aiResponse);
      formattedAiResponse = typeof parsed === "object" ? JSON.stringify(parsed, null, 2) : parsed;
    }
  } catch (e) {
    // leave as string
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-950 p-6 lg:p-12 relative overflow-hidden">
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto space-y-8 relative z-10">
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
              <span className="flex items-center gap-1.5"><User className="w-4 h-4" /> {item.authorEmail || item.authorId}</span>
              <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 font-medium text-xs border border-primary/20">{item.category}</span>
            </p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2 space-y-6">
            <Card className="border-slate-800 shadow-xl shadow-primary/5 bg-slate-950/60 backdrop-blur-xl">
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

            {formattedAiResponse && (
              <Card className="border-cyan-500/30 shadow-xl shadow-cyan-500/10 bg-slate-900/80 backdrop-blur-xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5" />
                <CardHeader className="relative z-10">
                  <CardTitle className="flex items-center gap-2 text-cyan-400">
                    <Sparkles className="w-5 h-5" />
                    AI Analysis & Insights
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                  <pre className="text-slate-300 whitespace-pre-wrap font-mono text-sm leading-relaxed p-4 bg-slate-950/50 rounded-lg border border-slate-800">
                    {formattedAiResponse}
                  </pre>
                </CardContent>
              </Card>
            )}

            <Card className="border-slate-800 shadow-xl shadow-primary/5 bg-slate-950/60 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-indigo-400" />
                  Reviews
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {!session ? (
                  <p className="text-amber-500 text-sm p-4 bg-amber-500/10 rounded-lg border border-amber-500/20">
                    Please log in to leave a review.
                  </p>
                ) : (
                  <form onSubmit={(e) => { e.preventDefault(); reviewMutation.mutate(); }} className="space-y-4 bg-slate-900/50 p-4 rounded-xl border border-slate-800/80">
                    <h4 className="text-sm font-semibold text-slate-300">Leave a Review</h4>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button key={star} type="button" onClick={() => setReviewRating(star)} className="focus:outline-none">
                          <Star className={`w-5 h-5 ${star <= reviewRating ? "text-amber-400 fill-amber-400" : "text-slate-600"}`} />
                        </button>
                      ))}
                    </div>
                    <textarea 
                      value={reviewText}
                      onChange={(e) => setReviewText(e.target.value)}
                      required 
                      rows={3}
                      placeholder="What do you think about this data?" 
                      className="flex w-full rounded-md border bg-slate-950 border-slate-700 px-3 py-2 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                    <Button type="submit" disabled={reviewMutation.isPending} className="bg-indigo-500 hover:bg-indigo-400 text-white">
                      {reviewMutation.isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : "Post Review"}
                    </Button>
                  </form>
                )}

                <div className="space-y-4 mt-6">
                  {item.reviews && item.reviews.length > 0 ? (
                    item.reviews.map((review: Review, i: number) => (
                      <div key={review._id || i} className="p-4 rounded-lg bg-slate-900/40 border border-slate-800">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-slate-200 text-sm flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-xs text-indigo-400">{review.userName?.[0]?.toUpperCase() || "A"}</div>
                            {review.userName}
                          </span>
                          <span className="flex text-amber-400 text-xs">
                            {Array.from({ length: 5 }).map((_, idx) => (
                              <Star key={idx} className={`w-3 h-3 ${idx < review.rating ? "fill-amber-400" : "text-slate-700"}`} />
                            ))}
                          </span>
                        </div>
                        <p className="text-sm text-slate-400">{review.text}</p>
                        <p className="text-xs text-slate-600 mt-2">{new Date(review.createdAt).toLocaleDateString()}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-slate-500 text-sm text-center py-4">No reviews yet. Be the first to share your thoughts!</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="md:col-span-1 space-y-6">
            <Card className="border-slate-800 shadow-xl shadow-primary/5 bg-slate-950/60 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-lg">Key Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-slate-300">
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-500">Price</span>
                  <span className="text-emerald-400 font-medium bg-emerald-500/10 px-2 py-0.5 rounded">Free</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-500">Category</span>
                  <span>{item.category}</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-500">Author</span>
                  <span className="truncate max-w-[120px]" title={item.authorEmail || item.authorId}>{item.authorEmail || item.authorId}</span>
                </div>
                <div className="flex justify-between pb-2">
                  <span className="text-slate-500">Added On</span>
                  <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
