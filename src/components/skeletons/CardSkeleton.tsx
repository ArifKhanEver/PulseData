import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function CardSkeleton() {
  return (
    <Card className="overflow-hidden flex flex-col border-primary/5 shadow-sm">
      <Skeleton className="w-full h-48 rounded-none" />
      <CardHeader className="p-5 pb-2">
        <Skeleton className="h-6 w-3/4 mb-2" />
      </CardHeader>
      <CardContent className="flex-1 p-5 pt-0 space-y-2 mt-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-3 w-1/3 mt-4" />
      </CardContent>
      <CardFooter className="p-5 pt-0 mt-auto">
        <Skeleton className="h-10 w-full" />
      </CardFooter>
    </Card>
  );
}
