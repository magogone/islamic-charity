import Image from "next/image"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export interface NewsAnnouncementItemProps {
  id: string
  title: string
  content: string
  imageUrl: string
  date: string
  isNew?: boolean
  isImportant?: boolean
  type: "news" | "announcement"
  className?: string
}

export function NewsAnnouncementItem({
  title,
  content,
  imageUrl,
  date,
  isNew = false,
  isImportant = false,
  type,
  className,
}: NewsAnnouncementItemProps) {
  return (
    <Card
      className={cn(
        "overflow-hidden border-none shadow-md bg-islamic-dark/80 hover:bg-islamic-dark/90 transition-all w-full",
        className,
      )}
    >
      <div className="relative w-full h-48">
        <Image src={imageUrl || "/placeholder.svg"} alt={title} fill className="object-cover" sizes="100vw" />
        <div className="absolute top-2 right-2 flex gap-2">
          {isNew && (
            <Badge variant="secondary" className="bg-islamic-gold text-islamic-dark">
              New
            </Badge>
          )}
          {isImportant && (
            <Badge variant="destructive" className="bg-red-500">
              Important
            </Badge>
          )}
          <Badge className={cn(type === "news" ? "bg-islamic-teal/80" : "bg-islamic-gold/80", "text-white")}>
            {type === "news" ? "News" : "Announcement"}
          </Badge>
        </div>
      </div>
      <CardContent className="p-4">
        <h3 className="text-lg font-bold text-islamic-cream mb-2">{title}</h3>
        <p className="text-sm text-islamic-cream/80 mb-3 line-clamp-3">{content}</p>
        <div className="flex justify-between items-center">
          <span className="text-xs text-islamic-cream/60">{date}</span>
        </div>
      </CardContent>
    </Card>
  )
}
