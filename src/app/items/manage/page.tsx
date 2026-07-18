import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Edit2, Eye, FileText, Trash2, Plus } from "lucide-react";
import Link from "next/link";

export default function ManageItemsPage() {
  // Realistic dummy data
  const items = Array.from({ length: 6 }).map((_, i) => ({
    id: i + 1,
    title: `Dataset_Alpha_${2024 - i}.csv`,
    status: i % 3 === 0 ? "Processing" : "Ready",
    date: new Date(Date.now() - i * 86400000 * 5).toLocaleDateString(),
    size: `${(Math.random() * 10 + 1).toFixed(1)} MB`
  }));

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
          {items.map((item) => (
            <Card key={item.id} className="group border-primary/10 hover:border-primary/30 hover:shadow-md transition-all duration-300 bg-background/50 backdrop-blur-sm">
              <CardContent className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center shrink-0 text-accent group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300 shadow-sm">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div className="overflow-hidden">
                    <h3 className="font-semibold text-lg truncate" title={item.title}>{item.title}</h3>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mt-1">
                      <span className="flex items-center gap-1.5 font-medium">
                        <span className={`w-2 h-2 rounded-full ${item.status === 'Ready' ? 'bg-green-500' : 'bg-yellow-500 animate-pulse'}`}></span>
                        {item.status}
                      </span>
                      <span className="hidden sm:inline">•</span>
                      <span>{item.date}</span>
                      <span className="hidden sm:inline">•</span>
                      <span>{item.size}</span>
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

                  <Button variant="ghost" size="sm" className="hidden sm:flex text-destructive hover:bg-destructive/10 hover:text-destructive">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </Button>
                  <Button variant="ghost" size="icon" className="sm:hidden text-destructive hover:bg-destructive/10 hover:text-destructive">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
