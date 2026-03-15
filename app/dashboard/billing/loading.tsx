import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function Loading() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      {/* Header skeleton */}
      <div className="flex items-center justify-between">
        <div>
          <Skeleton className="h-8 w-52" />
          <Skeleton className="h-4 w-80 mt-2" />
        </div>
        <Skeleton className="h-10 w-48" />
      </div>

      {/* Tab bar skeleton */}
      <div className="flex gap-1 border-b pb-0">
        <Skeleton className="h-9 w-28 rounded-md" />
        <Skeleton className="h-9 w-36 rounded-md" />
        <Skeleton className="h-9 w-28 rounded-md" />
      </div>

      {/* Current plan card skeleton */}
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-4 w-64 mt-1" />
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Skeleton className="h-6 w-32 mb-1" />
              <Skeleton className="h-4 w-24" />
            </div>
            <div className="text-right">
              <Skeleton className="h-6 w-24 mb-1" />
              <Skeleton className="h-4 w-32" />
            </div>
          </div>

          <div className="border-t pt-4">
            <Skeleton className="h-6 w-32 mb-4" />

            {/* Plan comparison cards skeleton - 3 cards */}
            <div className="grid gap-4 md:grid-cols-3">
              {Array(3)
                .fill(0)
                .map((_, i) => (
                  <Card key={i}>
                    <CardHeader>
                      <Skeleton className="h-6 w-28" />
                      <Skeleton className="h-4 w-full mt-1" />
                    </CardHeader>
                    <CardContent>
                      <Skeleton className="h-8 w-20 mb-4" />
                      <div className="space-y-2 mb-4">
                        {Array(4)
                          .fill(0)
                          .map((_, j) => (
                            <div key={j} className="flex items-center gap-2">
                              <Skeleton className="h-4 w-4 rounded-full" />
                              <Skeleton className="h-4 w-36" />
                            </div>
                          ))}
                      </div>
                      <Skeleton className="h-10 w-full" />
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
