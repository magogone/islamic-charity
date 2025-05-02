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
        "overflow-hidden border-none shadow-md bg-islamic-dark/80 hover:bg-islamic-dark/90 transition-all",
        className,
      )}
    >
      <div className="flex flex-col h-full">
        <div className="relative h-40 w-full">
          <Image
            src={imageUrl || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <div className="absolute top-2 right-2 flex gap-2">
            {isNew && (
              <Badge variant="secondary" className="bg-islamic-gold text-islamic-dark">
                新
              </Badge>
            )}
            {isImportant && (
              <Badge variant="destructive" className="bg-red-500">
                重要
              </Badge>
            )}
            <Badge className={cn(type === "news" ? "bg-islamic-teal/80" : "bg-islamic-gold/80", "text-white")}>
              {type === "news" ? "新闻" : "公告"}
            </Badge>
          </div>
        </div>
        <CardContent className="flex flex-col flex-grow p-4">
          <h3 className="text-lg font-bold text-islamic-cream mb-2 line-clamp-2">{title}</h3>
          <p className="text-sm text-islamic-cream/80 flex-grow line-clamp-3">{content}</p>
          <div className="flex justify-between items-center mt-3">
            <span className="text-xs text-islamic-cream/60">{date}</span>
          </div>
        </CardContent>
      </div>
    </Card>
  )
}
