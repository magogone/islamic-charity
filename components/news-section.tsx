"use client"
import { useState } from "react"
import { ChevronLeft, ChevronRight, Loader2, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { NewsAnnouncementItem, type NewsAnnouncementItemProps } from "./news-announcement-item"
import { NewsDetailDialog } from "./news-detail-dialog"
import { useTranslation } from "@/lib/i18n"
import { cn } from "@/lib/utils"

interface NewsSectionProps {
  news: NewsAnnouncementItemProps[]
  className?: string
  isLoading?: boolean
  error?: string | null
  onRetry?: () => void
}

export function NewsSection({ 
  news, 
  className, 
  isLoading = false, 
  error = null,
  onRetry 
}: NewsSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedNewsId, setSelectedNewsId] = useState<string | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { t, direction, isRTL } = useTranslation()

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % news.length)
  }

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + news.length) % news.length)
  }

  // 处理新闻点击
  const handleNewsClick = (newsId: string) => {
    setSelectedNewsId(newsId)
    setIsDialogOpen(true)
  }

  // 关闭弹窗
  const handleCloseDialog = () => {
    setIsDialogOpen(false)
    setSelectedNewsId(null)
  }

  // 加载状态
  if (isLoading) {
    return (
      <div className={cn("w-full my-6", className)} dir={direction}>
        <div className="mb-4">
          <h2 className="text-xl font-bold text-islamic-gold">{t('news.title')}</h2>
          <p className="text-sm text-islamic-cream/70">{t('news.subtitle')}</p>
        </div>
        
        <div className="flex justify-center items-center py-20 bg-islamic-dark/50 rounded-lg">
          <Loader2 className="h-8 w-8 text-islamic-gold animate-spin" />
          <span className={cn("text-islamic-cream", isRTL ? "mr-3" : "ml-3")}>{t('news.loading')}</span>
        </div>
      </div>
    )
  }

  // 错误状态
  if (error) {
    return (
      <div className={cn("w-full my-6", className)} dir={direction}>
        <div className="mb-4">
          <h2 className="text-xl font-bold text-islamic-gold">{t('news.title')}</h2>
          <p className="text-sm text-islamic-cream/70">{t('news.subtitle')}</p>
        </div>
        
        <div className="flex flex-col justify-center items-center py-20 bg-islamic-dark/50 rounded-lg">
          <AlertCircle className="h-8 w-8 text-red-400 mb-3" />
          <p className="text-islamic-cream/80 mb-4 text-center">{error}</p>
          {onRetry && (
            <Button 
              onClick={onRetry}
              variant="outline"
              className="border-islamic-gold text-islamic-gold hover:bg-islamic-gold hover:text-islamic-dark"
            >
              {t('news.retry')}
            </Button>
          )}
        </div>
      </div>
    )
  }

  // 无数据状态
  if (!news || news.length === 0) {
    return (
      <div className={cn("w-full my-6", className)} dir={direction}>
        <div className="mb-4">
          <h2 className="text-xl font-bold text-islamic-gold">{t('news.title')}</h2>
          <p className="text-sm text-islamic-cream/70">{t('news.subtitle')}</p>
        </div>
        
        <div className="flex justify-center items-center py-20 bg-islamic-dark/50 rounded-lg">
          <p className="text-islamic-cream/70">{t('news.noData')}</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className={cn("w-full my-6", className)}>
        <div className="mb-4">
          <h2 className="text-xl font-bold text-islamic-gold">{t('news.title')}</h2>
          <p className="text-sm text-islamic-cream/70">{t('news.subtitle')}</p>
        </div>

        <div className="relative">
          {/* Full-width carousel */}
          <div className="overflow-hidden relative">
            <div
              className="transition-transform duration-300 ease-in-out flex"
              style={{ 
                transform: `translateX(-${currentIndex * 100}%)`,
                direction: 'ltr'
              }}
            >
              {news.map((item) => (
                <div key={item.id} className="w-full flex-shrink-0">
                  <NewsAnnouncementItem 
                    {...item} 
                    onClick={() => handleNewsClick(item.id)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Navigation buttons */}
          {news.length > 1 && (
            <>
              <Button
                variant="outline"
                size="icon"
                className={cn(
                  "absolute top-1/2 -translate-y-1/2 bg-islamic-dark/80 border-islamic-medium/50 text-islamic-cream hover:bg-islamic-dark hover:text-islamic-gold z-10 rounded-full h-8 w-8",
                  isRTL ? "right-0" : "left-0"
                )}
                onClick={goToPrevious}
              >
                {isRTL ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
                <span className="sr-only">{t('news.previous')}</span>
              </Button>

              <Button
                variant="outline"
                size="icon"
                className={cn(
                  "absolute top-1/2 -translate-y-1/2 bg-islamic-dark/80 border-islamic-medium/50 text-islamic-cream hover:bg-islamic-dark hover:text-islamic-gold z-10 rounded-full h-8 w-8",
                  isRTL ? "left-0" : "right-0"
                )}
                onClick={goToNext}
              >
                {isRTL ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                <span className="sr-only">{t('news.next')}</span>
              </Button>

              {/* Pagination indicators */}
              <div className={cn("flex justify-center mt-4", isRTL ? "space-x-reverse space-x-3" : "space-x-3")}>
                {news.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentIndex ? "bg-islamic-gold w-4" : "bg-islamic-cream/30"
                    }`}
                    onClick={() => setCurrentIndex(index)}
                    aria-label={t('news.goToSlide').replace('{number}', (index + 1).toString())}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* 新闻详情弹窗 */}
      <NewsDetailDialog
        newsId={selectedNewsId}
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
      />
    </>
  )
}
