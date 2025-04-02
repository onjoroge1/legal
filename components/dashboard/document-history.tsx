import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { History, RotateCcw, Eye } from "lucide-react"

export default function DocumentHistory() {
  const historyItems = [
    {
      id: "1",
      user: {
        name: "John Smith",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "JS",
      },
      action: "edited",
      section: "Section 3: Compensation",
      timestamp: "2 hours ago",
      changes: "Added payment schedule and late fee provisions",
    },
    {
      id: "2",
      user: {
        name: "Sarah Johnson",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "SJ",
      },
      action: "edited",
      section: "Section 1: Services",
      timestamp: "Yesterday",
      changes: "Updated service description and deliverables",
    },
    {
      id: "3",
      user: {
        name: "John Smith",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "JS",
      },
      action: "created",
      section: "Document",
      timestamp: "3 days ago",
      changes: "Created document from Service Agreement template",
    },
  ]

  return (
    <ScrollArea className="h-[600px]">
      <div className="p-4 space-y-1">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-sm font-medium">Version History</h3>
          <Button variant="outline" size="sm" className="gap-1">
            <History className="h-4 w-4" />
            Compare Versions
          </Button>
        </div>

        {historyItems.map((item, index) => (
          <div key={item.id} className={`flex items-start gap-3 p-3 rounded-md ${index === 0 ? "bg-muted" : ""}`}>
            <Avatar className="h-8 w-8">
              {item.user.avatar && <AvatarImage src={item.user.avatar} alt={item.user.name} />}
              <AvatarFallback className="bg-primary/10 text-primary text-xs">{item.user.initials}</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm">{item.user.name}</span>
                  <Badge variant="outline" className="text-xs">
                    {item.action === "created" ? "Created" : "Edited"}
                  </Badge>
                </div>
                <span className="text-xs text-muted-foreground">{item.timestamp}</span>
              </div>
              <p className="text-sm">
                {item.action === "created" ? `Created document from template` : `Changed ${item.section}`}
              </p>
              {item.action === "edited" && <p className="text-xs text-muted-foreground">{item.changes}</p>}
              <div className="flex gap-2 pt-1">
                <Button variant="ghost" size="sm" className="h-7 gap-1 text-xs">
                  <Eye className="h-3 w-3" />
                  View
                </Button>
                {index > 0 && (
                  <Button variant="ghost" size="sm" className="h-7 gap-1 text-xs">
                    <RotateCcw className="h-3 w-3" />
                    Restore
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}

