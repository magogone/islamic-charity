"use client"
import { NewsAnnouncementItem, type NewsAnnouncementItemProps } from "./news-announcement-item"
import { cn } from "@/lib/utils"

interface NewsSectionProps {
  news: NewsAnnouncementItemProps[]
  className?: string
}

export function NewsSection({ news, className }: NewsSectionProps) {
  return (
    <div className={cn("w-full my-6", className)}>
      <div className="mb-4">
        <h2 className="text-xl font-bold text-islamic-gold">News</h2>
        <p className="text-sm text-islamic-cream/70">Learn about the latest information</p>
      </div>

      <div className="space-y-4">
        {news.map((item) => (
          <div key={item.id} className="w-full">
            <NewsAnnouncementItem {...item} />
          </div>
        ))}
      </div>
    </div>
  )
}
