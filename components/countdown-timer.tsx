"use client"

import { useState, useEffect } from "react"
import { Clock } from "lucide-react"

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 47,
    minutes: 59,
    seconds: 32,
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev

        if (seconds > 0) {
          seconds -= 1
        } else {
          seconds = 59
          if (minutes > 0) {
            minutes -= 1
          } else {
            minutes = 59
            if (hours > 0) {
              hours -= 1
            } else {
              // Reset to initial time when countdown reaches zero
              hours = 47
              minutes = 59
              seconds = 32
            }
          }
        }

        return { hours, minutes, seconds }
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (time: number) => time.toString().padStart(2, "0")

  return (
    <div className="bg-primary text-white py-3 text-center font-medium">
      <div className="container flex items-center justify-center gap-2">
        Limited-Time Offer: 20% off your first month!
        <span className="inline-flex items-center gap-1 bg-primary-foreground/20 px-2 py-1 rounded">
          <Clock className="h-4 w-4" />
          {formatTime(timeLeft.hours)}:{formatTime(timeLeft.minutes)}:{formatTime(timeLeft.seconds)}
        </span>
        remaining
      </div>
    </div>
  )
}

