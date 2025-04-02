import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Mail, UserMinus, UserCog } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface TeamMemberCardProps {
  name: string
  email: string
  role: string
  avatar?: string
  initials: string
  lastActive: string
}

export default function TeamMemberCard({ name, email, role, avatar, initials, lastActive }: TeamMemberCardProps) {
  // Determine badge color based on role
  const getBadgeVariant = (role: string) => {
    switch (role.toLowerCase()) {
      case "admin":
        return "default"
      case "editor":
        return "secondary"
      case "viewer":
        return "outline"
      default:
        return "outline"
    }
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div className="flex items-start gap-4">
            <Avatar className="h-10 w-10">
              {avatar && <AvatarImage src={avatar} alt={name} />}
              <AvatarFallback className="bg-primary/10 text-primary">{initials}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium">{name}</h3>
              <p className="text-sm text-muted-foreground">{email}</p>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant={getBadgeVariant(role)}>{role}</Badge>
                <span className="text-xs text-muted-foreground">Active {lastActive}</span>
              </div>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">More options</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem className="gap-2">
                <Mail className="h-4 w-4" />
                Send Email
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2">
                <UserCog className="h-4 w-4" />
                Change Role
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-500 gap-2">
                <UserMinus className="h-4 w-4" />
                Remove from Team
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  )
}

