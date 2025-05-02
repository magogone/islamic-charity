"use client"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { NewsAnnouncementItem, type NewsAnnouncementItemProps } from "./news-announcement-item"
import { cn } from "@/lib/utils"

interface NewsSectionProps {
  news: NewsAnnouncementItemProps[]
  className?: string
}

export function NewsSection({ news, className }: NewsSectionProps) {
  const scrollContainer = (direction: "left" | "right") => {
    const container = document.getElementById("news-scroll-container")
    if (container) {
      const scrollAmount = direction === "left" ? -300 : 300
      container.scrollBy({ left: scrollAmount, behavior: "smooth" })
    }
  }

  return (
    <div className={cn("w-full my-6", className)}>
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-bold text-islamic-gold">News</h2>
          <p className="text-sm text-islamic-cream/70">Learn about the latest information</p>
        </div>
      </div>

      <div className="relative">
        <div
          id="news-scroll-container"
          className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {news.map((item) => (
            <div key={item.id} className="min-w-[280px] w-[280px] md:w-[280px] snap-start sm:min-w-[90%] sm:w-[90%]">
              <NewsAnnouncementItem {...item} />
            </div>
          ))}
        </div>

        <Button
          variant="outline"
          size="icon"
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-islamic-dark/80 border-islamic-medium/50 text-islamic-cream hover:bg-islamic-dark hover:text-islamic-gold z-10 rounded-full h-8 w-8"
          onClick={() => scrollContainer("left")}
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Scroll Left</span>
        </Button>

        <Button
          variant="outline"
          size="icon"
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 bg-islamic-dark/80 border-islamic-medium/50 text-islamic-cream hover:bg-islamic-dark hover:text-islamic-gold z-10 rounded-full h-8 w-8"
          onClick={() => scrollContainer("right")}
        >
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Scroll Right</span>
        </Button>
      </div>
    </div>
  )
}
