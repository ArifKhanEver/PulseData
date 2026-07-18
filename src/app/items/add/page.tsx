"use client";

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
import { UploadCloud } from "lucide-react";

// Form Schema
const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  file: z.any().refine((files) => files?.length === 1, "File is required."),
});

export default function AddItemPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // Future: Handle submission via backend API
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-background p-6 lg:p-12 relative overflow-hidden">
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-2xl mx-auto space-y-8 relative z-10">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Add New Item</h1>
          <p className="text-muted-foreground mt-2">Upload a new dataset or report for processing.</p>
        </div>

        <Card className="border-primary/10 shadow-xl shadow-primary/5 bg-background/60 backdrop-blur-xl">
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
                        <Input placeholder="E.g., Q3 Sales Data" className="bg-background/50" {...field} />
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
                        <Input placeholder="Describe the contents of this dataset..." className="bg-background/50" {...field} />
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
                        <div className="relative border-2 border-dashed border-primary/20 rounded-lg p-10 flex flex-col items-center justify-center text-muted-foreground bg-secondary/10 hover:bg-secondary/30 transition-colors duration-300">
                          <UploadCloud className="w-12 h-12 mb-4 text-accent" />
                          <p className="text-sm font-medium text-foreground mb-1">Click to upload or drag and drop</p>
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
                      <FormDescription>Upload the dataset file for analysis.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full shadow-md hover:shadow-lg transition-all active:scale-[0.98]">
                  Upload and Save
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
