export default function DocumentStats() {
  return (
    <div className="space-y-8">
      <div className="flex items-center">
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Non-Disclosure Agreement</p>
          <p className="text-sm text-muted-foreground">Modified 2 days ago</p>
        </div>
        <div className="ml-auto font-medium">Completed</div>
      </div>
      <div className="flex items-center">
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Service Agreement</p>
          <p className="text-sm text-muted-foreground">Created 1 week ago</p>
        </div>
        <div className="ml-auto font-medium">Draft</div>
      </div>
      <div className="flex items-center">
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">LLC Operating Agreement</p>
          <p className="text-sm text-muted-foreground">Modified 3 days ago</p>
        </div>
        <div className="ml-auto font-medium">Needs Review</div>
      </div>
      <div className="flex items-center">
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Employment Contract</p>
          <p className="text-sm text-muted-foreground">Created 2 weeks ago</p>
        </div>
        <div className="ml-auto font-medium">Completed</div>
      </div>
      <div className="flex items-center">
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Privacy Policy</p>
          <p className="text-sm text-muted-foreground">Modified 1 month ago</p>
        </div>
        <div className="ml-auto font-medium">Completed</div>
      </div>
    </div>
  )
}

