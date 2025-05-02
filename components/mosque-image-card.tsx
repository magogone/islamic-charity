import Image from "next/image"
import { cn } from "@/lib/utils"

interface MosqueImageCardProps {
  imageUrl: string
  title: string
  subtitle?: string
  className?: string
  width?: number
  height?: number
}

export function MosqueImageCard({
  imageUrl,
  title,
  subtitle,
  className,
  width = 200,
  height = 250,
}: MosqueImageCardProps) {
  return (
    <div className={cn("relative rounded-xl overflow-hidden", className)} style={{ width, height }}>
      <Image src={imageUrl || "/placeholder.svg"} alt={title} fill className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#1a0d2c] to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <h3 className="text-lg font-bold text-white">{title}</h3>
        {subtitle && <p className="text-xs text-[#f5efe0]/80">{subtitle}</p>}
      </div>
    </div>
  )
}
