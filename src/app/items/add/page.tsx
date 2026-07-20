"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, UploadCloud } from "lucide-react";
import { DashboardChart } from "@/components/features/ai-analyzer/DashboardChart";

// Form Schema
const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  file: z.custom<FileList>().refine((files) => files?.length === 1, "File is required."),
});

type AIData = {
  summary: string;
  topTrends: string[];
};

export default function AddItemPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [aiData, setAiData] = useState<AIData | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setAiData(null);
    try {
      const formData = new FormData();
      formData.append("file", values.file[0]);
      formData.append("title", values.title);
      formData.append("description", values.description);
      
      const API_URL = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${API_URL}/ai/process`, {
        method: "POST",
        body: formData,
        // Required for cross-origin requests: forwards the HttpOnly session
        // cookie to the Express server so requireAuth can validate it.
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to process data");
      }

      const result = await response.json();
      setAiData(result.data);
    } catch (error) {
      console.error(error);
      // Fallback dummy data if backend is offline
      setAiData({
        summary: "This is a fallback summary since the backend is unreachable. Sales have steadily increased by 15% over the last quarter.",
        topTrends: [
          "Increased engagement in the SaaS product sector.",
          "High retention rates observed among enterprise clients.",
          "Marketing costs decreased by 5% while conversions remained stable."
        ]
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-950 p-6 lg:p-12 relative overflow-hidden">
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-3xl mx-auto space-y-8 relative z-10">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Add New Item</h1>
          <p className="text-slate-400 mt-2">Upload a new dataset or report for processing.</p>
        </div>

        <Card className="border border-slate-800 shadow-lg bg-slate-900 rounded-xl">
          <CardHeader>
            <CardTitle>Item Details</CardTitle>
            <CardDescription>Fill out the form below to add a new item.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="E.g., Q3 Sales Data" className="bg-slate-900 border-slate-700 text-white placeholder:text-slate-500" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Input placeholder="Describe the contents of this dataset..." className="bg-slate-900 border-slate-700 text-white placeholder:text-slate-500" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="file"
                  render={({ field: { value, onChange, ...fieldProps } }) => (
                    <FormItem>
                      <FormLabel>File Upload</FormLabel>
                      <FormControl>
                        <div className="relative border-2 border-dashed border-slate-700 rounded-lg p-10 flex flex-col items-center justify-center text-slate-400 bg-slate-900 hover:bg-slate-800 transition-colors duration-300">
                          <UploadCloud className="w-12 h-12 mb-4 text-cyan-500" />
                          <p className="text-sm font-medium text-slate-200 mb-1">
                            {value && value.length > 0 ? value[0].name : "Click to upload or drag and drop"}
                          </p>
                          <p className="text-xs">CSV, JSON, or Excel (max. 10MB)</p>
                          <Input 
                            {...fieldProps} 
                            type="file" 
                            className="hidden" 
                            id="file-upload"
                            onChange={(event) => onChange(event.target.files)}
                          />
                          <label htmlFor="file-upload" className="absolute inset-0 cursor-pointer" />
                        </div>
                      </FormControl>
                      <FormDescription>Upload the dataset file for AI analysis.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full shadow-md hover:shadow-lg transition-all active:scale-[0.98]" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing with AI...
                    </>
                  ) : (
                    "Upload and Analyze"
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        {aiData && <DashboardChart data={aiData} />}
      </div>
    </div>
  );
}
