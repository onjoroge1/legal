"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, ThumbsUp, MoreHorizontal, Reply } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface Comment {
  id: string
  user: {
    name: string
    avatar?: string
    initials: string
  }
  content: string
  timestamp: string
  likes: number
  replies: CommentReply[]
}

interface CommentReply {
  id: string
  user: {
    name: string
    avatar?: string
    initials: string
  }
  content: string
  timestamp: string
}

export default function DocumentComments() {
  const [newComment, setNewComment] = useState("")
  const [comments, setComments] = useState<Comment[]>([
    {
      id: "1",
      user: {
        name: "John Smith",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "JS",
      },
      content: "I think we should add more specific language about the payment terms in section 3.",
      timestamp: "2 hours ago",
      likes: 2,
      replies: [
        {
          id: "1-1",
          user: {
            name: "Sarah Johnson",
            avatar: "/placeholder.svg?height=32&width=32",
            initials: "SJ",
          },
          content: "Good point. I'll draft some language about payment schedules and late fees.",
          timestamp: "1 hour ago",
        },
      ],
    },
    {
      id: "2",
      user: {
        name: "Michael Brown",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "MB",
      },
      content:
        "The confidentiality clause in section 5 needs to be more comprehensive. We should specify the duration of the confidentiality obligation.",
      timestamp: "Yesterday",
      likes: 1,
      replies: [],
    },
  ])

  const handleAddComment = () => {
    if (!newComment.trim()) return

    const comment: Comment = {
      id: `${comments.length + 1}`,
      user: {
        name: "You",
        initials: "YO",
      },
      content: newComment,
      timestamp: "Just now",
      likes: 0,
      replies: [],
    }

    setComments([comment, ...comments])
    setNewComment("")
  }

  return (
    <div className="flex flex-col h-[600px]">
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-6">
          {comments.map((comment) => (
            <div key={comment.id} className="space-y-4">
              <div className="flex gap-3">
                <Avatar className="h-8 w-8">
                  {comment.user.avatar && <AvatarImage src={comment.user.avatar} alt={comment.user.name} />}
                  <AvatarFallback className="bg-primary/10 text-primary text-xs">
                    {comment.user.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">{comment.user.name}</span>
                      <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">More options</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Delete</DropdownMenuItem>
                        <DropdownMenuItem>Report</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <p className="text-sm">{comment.content}</p>
                  <div className="flex items-center gap-4 pt-1">
                    <Button variant="ghost" size="sm" className="h-7 gap-1 text-xs">
                      <ThumbsUp className="h-3 w-3" />
                      {comment.likes > 0 && <span>{comment.likes}</span>}
                    </Button>
                    <Button variant="ghost" size="sm" className="h-7 gap-1 text-xs">
                      <Reply className="h-3 w-3" />
                      Reply
                    </Button>
                  </div>
                </div>
              </div>

              {comment.replies.length > 0 && (
                <div className="ml-11 space-y-4 border-l-2 pl-4">
                  {comment.replies.map((reply) => (
                    <div key={reply.id} className="flex gap-3">
                      <Avatar className="h-6 w-6">
                        {reply.user.avatar && <AvatarImage src={reply.user.avatar} alt={reply.user.name} />}
                        <AvatarFallback className="bg-primary/10 text-primary text-xs">
                          {reply.user.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-sm">{reply.user.name}</span>
                            <span className="text-xs text-muted-foreground">{reply.timestamp}</span>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-6 w-6">
                                <MoreHorizontal className="h-3 w-3" />
                                <span className="sr-only">More options</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>Edit</DropdownMenuItem>
                              <DropdownMenuItem>Delete</DropdownMenuItem>
                              <DropdownMenuItem>Report</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                        <p className="text-sm">{reply.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="border-t p-4">
        <div className="flex gap-3">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-primary/10 text-primary text-xs">YO</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-2">
            <Textarea
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="min-h-[80px]"
            />
            <div className="flex justify-end">
              <Button size="sm" onClick={handleAddComment} className="gap-1">
                <Send className="h-4 w-4" />
                Comment
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

