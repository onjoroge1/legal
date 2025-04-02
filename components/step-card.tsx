interface StepCardProps {
  number: number
  title: string
  description: string
}

export default function StepCard({ number, title, description }: StepCardProps) {
  return (
    <div className="flex flex-col items-center text-center z-10 px-4">
      <div className="w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center text-xl font-bold mb-4">
        {number}
      </div>
      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm max-w-[200px]">{description}</p>
    </div>
  )
}

