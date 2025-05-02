"use client"

import { useState, useRef, type ReactNode, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface HorizontalScrollSectionProps {
  title?: string
  subtitle?: string
  children: ReactNode
  className?: string
  showControls?: boolean
  showHeader?: boolean
  carouselMode?: boolean // New carousel mode option
  itemsToShow?: number // Number of cards to show at once
}

export function HorizontalScrollSection({
  title,
  subtitle,
  children,
  className,
  showControls = true,
  showHeader = true,
  carouselMode = true, // Default enable carousel mode
  itemsToShow = 1, // Default show 1 card at a time
}: HorizontalScrollSectionProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [itemWidth, setItemWidth] = useState(0)
  const [containerWidth, setContainerWidth] = useState(0)
  const [childrenCount, setChildrenCount] = useState(0)

  // Calculate number of children
  useEffect(() => {
    if (scrollContainerRef.current) {
      const childCount = scrollContainerRef.current.children.length
      setChildrenCount(childCount)

      // Calculate container width
      const containerWidth = scrollContainerRef.current.clientWidth
      setContainerWidth(containerWidth)

      // Calculate each item's width (including spacing)
      if (childCount > 0) {
        const firstChild = scrollContainerRef.current.children[0] as HTMLElement
        const itemFullWidth = firstChild.offsetWidth + 16 // 16px is spacing
        setItemWidth(itemFullWidth)
      }
    }
  }, [])

  const checkScrollability = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10) // 10px buffer

      // Update current index
      if (itemWidth > 0) {
        const newIndex = Math.round(scrollLeft / itemWidth)
        setCurrentIndex(newIndex)
      }
    }
  }

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      let scrollAmount = 0

      if (carouselMode) {
        // Carousel mode: scroll one or more complete cards
        const itemsToScroll = Math.min(itemsToShow, 1) // Scroll at least 1
        scrollAmount = itemWidth * itemsToScroll
      } else {
        // Normal mode: scroll 75% of container width
        scrollAmount = scrollContainerRef.current.clientWidth * 0.75
      }

      const newScrollLeft =
        direction === "left"
          ? scrollContainerRef.current.scrollLeft - scrollAmount
          : scrollContainerRef.current.scrollLeft + scrollAmount

      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      })
    }
  }

  return (
    <div className={cn("w-full", className)}>
      {showHeader && (
        <div className="flex items-center justify-between mb-3">
          <div>
            {title && (
              <div className="flex items-center mb-1">
                <div className="w-5 h-0.5 mr-2 bg-[#d4b96e]"></div>
                <h3 className="text-base font-bold text-[#d4b96e]">{title}</h3>
              </div>
            )}
            {subtitle && <p className="text-xs text-[#f5efe0]/70">{subtitle}</p>}
          </div>

          {showControls && (
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="icon"
                className={cn(
                  "h-7 w-7 rounded-full border-[#3d2953] bg-[#2d1b40]/80 text-[#d4b96e] hover:bg-[#3d2953]",
                  !canScrollLeft && "opacity-50 cursor-not-allowed",
                )}
                onClick={() => scroll("left")}
                disabled={!canScrollLeft}
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Scroll Left</span>
              </Button>
              <Button
                variant="outline"
                size="icon"
                className={cn(
                  "h-7 w-7 rounded-full border-[#3d2953] bg-[#2d1b40]/80 text-[#d4b96e] hover:bg-[#3d2953]",
                  !canScrollRight && "opacity-50 cursor-not-allowed",
                )}
                onClick={() => scroll("right")}
                disabled={!canScrollRight}
              >
                <ChevronRight className="h-4 w-4" />
                <span className="sr-only">Scroll Right</span>
              </Button>
            </div>
          )}
        </div>
      )}

      <div
        ref={scrollContainerRef}
        className={cn(
          "flex overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4 space-x-4 snap-x snap-mandatory",
          carouselMode && "carousel-container",
        )}
        onScroll={checkScrollability}
      >
        {children}
      </div>

      {/* Carousel indicators */}
      {carouselMode && childrenCount > 1 && (
        <div className="flex justify-center mt-2 space-x-1">
          {Array.from({ length: childrenCount }).map((_, index) => (
            <button
              key={index}
              className={cn(
                "w-1.5 h-1.5 rounded-full transition-all",
                currentIndex === index ? "bg-[#d4b96e] w-3" : "bg-[#3d2953]",
              )}
              onClick={() => {
                if (scrollContainerRef.current) {
                  scrollContainerRef.current.scrollTo({
                    left: index * itemWidth,
                    behavior: "smooth",
                  })
                }
              }}
              aria-label={`Go to item ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
