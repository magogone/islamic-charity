"use client"
import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { NewsAnnouncementItem, type NewsAnnouncementItemProps } from "./news-announcement-item"
import { cn } from "@/lib/utils"

interface NewsSectionProps {
  news: NewsAnnouncementItemProps[]
  className?: string
}

export function NewsSection({ news, className }: NewsSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % news.length)
  }

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + news.length) % news.length)
  }

  return (
    <div className={cn("w-full my-6", className)}>
      <div className="mb-4">
        <h2 className="text-xl font-bold text-islamic-gold">News</h2>
        <p className="text-sm text-islamic-cream/70">Learn about the latest information</p>
      </div>

      <div className="relative">
        {/* Full-width carousel */}
        <div className="overflow-hidden relative">
          <div
            className="transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            <div className="flex">
              {news.map((item) => (
                <div key={item.id} className="w-full flex-shrink-0">
                  <NewsAnnouncementItem {...item} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Navigation buttons */}
        <Button
          variant="outline"
          size="icon"
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-islamic-dark/80 border-islamic-medium/50 text-islamic-cream hover:bg-islamic-dark hover:text-islamic-gold z-10 rounded-full h-8 w-8"
          onClick={goToPrevious}
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Previous</span>
        </Button>

        <Button
          variant="outline"
          size="icon"
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-islamic-dark/80 border-islamic-medium/50 text-islamic-cream hover:bg-islamic-dark hover:text-islamic-gold z-10 rounded-full h-8 w-8"
          onClick={goToNext}
        >
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Next</span>
        </Button>

        {/* Pagination indicators */}
        <div className="flex justify-center mt-4 space-x-2">
          {news.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex ? "bg-islamic-gold w-4" : "bg-islamic-cream/30"
              }`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
