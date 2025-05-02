import { Heart, PlusCircle } from "lucide-react"

interface HeartPlusIconProps {
  className?: string
  heartClassName?: string
  plusClassName?: string
}

export function HeartPlusIcon({
  className = "h-5 w-5",
  heartClassName = "text-current",
  plusClassName = "text-current",
}: HeartPlusIconProps) {
  return (
    <div className={`relative inline-flex ${className}`}>
      <Heart className={`${heartClassName}`} />
      <PlusCircle className={`absolute -top-1.5 -right-1.5 h-3 w-3 ${plusClassName}`} />
    </div>
  )
}
