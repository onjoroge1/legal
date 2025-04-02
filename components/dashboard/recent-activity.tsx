import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { FileText, FilePlus, Download, Share2 } from "lucide-react"

export default function RecentActivity() {
  const activities = [
    {
      icon: <FilePlus className="h-4 w-4" />,
      description: "Created a new document",
      document: "Service Agreement",
      time: "2 days ago",
      user: "JS",
    },
    {
      icon: <FileText className="h-4 w-4" />,
      description: "Edited document",
      document: "Non-Disclosure Agreement",
      time: "3 days ago",
      user: "JS",
    },
    {
      icon: <Download className="h-4 w-4" />,
      description: "Downloaded document",
      document: "LLC Operating Agreement",
      time: "1 week ago",
      user: "JS",
    },
    {
      icon: <Share2 className="h-4 w-4" />,
      description: "Shared document",
      document: "Employment Contract",
      time: "2 weeks ago",
      user: "JS",
    },
  ]

  return (
    <div className="space-y-4">
      {activities.map((activity, i) => (
        <div key={i} className="flex items-start gap-4">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-primary/10 text-primary text-xs">{activity.user}</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <p className="text-sm">
              <span className="font-medium">You</span> {activity.description}
              <span className="font-medium"> {activity.document}</span>
            </p>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              {activity.icon}
              {activity.time}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

