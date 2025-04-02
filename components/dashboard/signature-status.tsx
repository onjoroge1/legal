import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle, Clock, AlertCircle, Send, Eye } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export default function SignatureStatus() {
  const signers = [
    {
      id: "1",
      name: "John Smith",
      email: "john.smith@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "JS",
      status: "completed",
      completedAt: "Jul 12, 2023 at 10:23 AM",
    },
    {
      id: "2",
      name: "Sarah Johnson",
      email: "sarah.johnson@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "SJ",
      status: "waiting",
      completedAt: null,
    },
    {
      id: "3",
      name: "Michael Brown",
      email: "michael.brown@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "MB",
      status: "not_sent",
      completedAt: null,
    },
  ]

  const completedCount = signers.filter((signer) => signer.status === "completed").length
  const progress = (completedCount / signers.length) * 100

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-medium">Signature Progress</h3>
          <span className="text-sm">
            {completedCount} of {signers.length} completed
          </span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <div className="space-y-4">
        {signers.map((signer) => (
          <div key={signer.id} className="flex items-center justify-between border rounded-md p-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-10 w-10">
                {signer.avatar && <AvatarImage src={signer.avatar} alt={signer.name} />}
                <AvatarFallback className="bg-primary/10 text-primary">{signer.initials}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{signer.name}</p>
                <p className="text-sm text-muted-foreground">{signer.email}</p>
                {signer.completedAt && (
                  <p className="text-xs text-muted-foreground mt-1">Signed on {signer.completedAt}</p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-3">
              {signer.status === "completed" ? (
                <>
                  <Badge className="gap-1 bg-green-100 text-green-800 hover:bg-green-100">
                    <CheckCircle className="h-3 w-3" />
                    Signed
                  </Badge>
                  <Button variant="ghost" size="sm" className="gap-1">
                    <Eye className="h-4 w-4" />
                    View
                  </Button>
                </>
              ) : signer.status === "waiting" ? (
                <>
                  <Badge variant="outline" className="gap-1 bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                    <Clock className="h-3 w-3" />
                    Waiting
                  </Badge>
                  <Button variant="ghost" size="sm" className="gap-1">
                    <Send className="h-4 w-4" />
                    Remind
                  </Button>
                </>
              ) : (
                <>
                  <Badge variant="outline" className="gap-1">
                    <AlertCircle className="h-3 w-3" />
                    Not Sent
                  </Badge>
                  <Button size="sm" className="gap-1">
                    <Send className="h-4 w-4" />
                    Send
                  </Button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="border rounded-md p-4 bg-muted/50">
        <h3 className="text-sm font-medium mb-2">Document Details</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Document Name</p>
            <p className="font-medium">Service Agreement</p>
          </div>
          <div>
            <p className="text-muted-foreground">Created On</p>
            <p className="font-medium">Jul 10, 2023</p>
          </div>
          <div>
            <p className="text-muted-foreground">Expires On</p>
            <p className="font-medium">Jul 24, 2023</p>
          </div>
          <div>
            <p className="text-muted-foreground">Document ID</p>
            <p className="font-medium">DOC-2023-07-001</p>
          </div>
        </div>
      </div>
    </div>
  )
}

