"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { X, Loader2, AlertCircle } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { fetchNewsDetail } from "@/lib/api/news"
import { useTranslation } from "@/lib/i18n"
import { cn } from "@/lib/utils"
import type { NewsAnnouncementItemProps } from "./news-announcement-item"
import type { NewsApiItem } from "@/types/api"

interface NewsDetailDialogProps {
  newsId: string | null
  isOpen: boolean
  onClose: () => void
  className?: string
}

/**
 * 转换单个新闻项
 */
function transformSingleNewsData(apiData: NewsApiItem): NewsAnnouncementItemProps {
  // 计算是否为新发布的新闻（3天内）
  const now = new Date()
  const publishDate = new Date(apiData.date)
  const timeDiff = now.getTime() - publishDate.getTime()
  const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24))
  const isNew = daysDiff <= 3

  return {
    id: apiData.id,
    title: apiData.title,
    content: apiData.content, // 详情页使用完整内容
    imageUrl: apiData.imageUrl,
    date: apiData.date,
    isNew: isNew, // 根据发布时间动态计算
    isImportant: false,
    type: "news" as const,
  }
}

export function NewsDetailDialog({
  newsId,
  isOpen,
  onClose,
  className,
}: NewsDetailDialogProps) {
  const [newsDetail, setNewsDetail] = useState<NewsAnnouncementItemProps | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { t, locale } = useTranslation()

  // 获取新闻详情
  useEffect(() => {
    if (!newsId || !isOpen) {
      setNewsDetail(null)
      setError(null)
      return
    }

    const fetchDetail = async () => {
      setLoading(true)
      setError(null)
      
      try {
        const response = await fetchNewsDetail({
          id: newsId,
          language: locale
        })
        
        // 检查API响应是否成功
        if (response.success && response.data) {
          const transformedData = transformSingleNewsData(response.data)
          setNewsDetail(transformedData)
        } else {
          throw new Error(response.error?.message || 'API request failed')
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch news detail'
        setError(errorMessage)
        console.error('Error fetching news detail:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchDetail()
  }, [newsId, isOpen, locale])

  // 重试加载
  const handleRetry = () => {
    if (newsId) {
      const fetchDetail = async () => {
        setLoading(true)
        setError(null)
        
        try {
          const response = await fetchNewsDetail({
            id: newsId,
            language: locale
          })
          
          // 检查API响应是否成功
          if (response.success && response.data) {
            const transformedData = transformSingleNewsData(response.data)
            setNewsDetail(transformedData)
          } else {
            throw new Error(response.error?.message || 'API request failed')
          }
        } catch (err) {
          const errorMessage = err instanceof Error ? err.message : 'Failed to fetch news detail'
          setError(errorMessage)
        } finally {
          setLoading(false)
        }
      }
      
      fetchDetail()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={cn(
        "max-w-4xl max-h-[90vh] bg-islamic-dark border-islamic-medium/50 text-islamic-cream",
        "[&>button]:text-islamic-cream/60 [&>button]:hover:text-islamic-cream [&>button]:hover:bg-islamic-medium/20",
        className
      )}>
        <DialogHeader className="border-b border-islamic-medium/30 pb-4">
          <DialogTitle className="text-xl font-bold text-islamic-gold">
            {loading ? t('news.loadingDetail') : newsDetail?.title || t('news.newsDetail')}
          </DialogTitle>
          <DialogDescription className="text-islamic-cream/70 text-sm">
            {loading 
              ? t('news.loadingDetail')
              : error 
                ? t('news.loadError')
                : newsDetail 
                  ? `${t('news.newsType')} - ${newsDetail.date}`
                  : t('news.newsDetail')
            }
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="flex-1 max-h-[calc(90vh-120px)]">
          <div className="p-6">
            {/* 加载状态 */}
            {loading && (
              <div className="flex flex-col items-center justify-center py-20">
                <Loader2 className="h-8 w-8 text-islamic-gold animate-spin mb-4" />
                <p className="text-islamic-cream/80">{t('news.loadingDetail')}</p>
              </div>
            )}

            {/* 错误状态 */}
            {error && !loading && (
              <div className="flex flex-col items-center justify-center py-20">
                <AlertCircle className="h-8 w-8 text-red-400 mb-4" />
                <p className="text-islamic-cream/80 mb-4 text-center">{error}</p>
                <Button 
                  onClick={handleRetry}
                  variant="outline"
                  className="border-islamic-gold text-islamic-gold hover:bg-islamic-gold hover:text-islamic-dark"
                >
                  {t('news.retry')}
                </Button>
              </div>
            )}

            {/* 新闻详情内容 */}
            {newsDetail && !loading && !error && (
              <div className="space-y-6">
                {/* 新闻图片 */}
                {newsDetail.imageUrl && (
                  <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden">
                    <Image
                      src={newsDetail.imageUrl}
                      alt={newsDetail.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                      priority
                    />
                  </div>
                )}

                {/* 新闻元信息 */}
                <div className="flex flex-wrap items-center gap-3">
                  <Badge className={cn(
                    newsDetail.type === "news" ? "bg-islamic-teal/80" : "bg-islamic-gold/80",
                    "text-white"
                  )}>
                    {newsDetail.type === "news" ? t('news.newsType') : t('news.announcementType')}
                  </Badge>
                  
                  {newsDetail.isNew && (
                    <Badge variant="secondary" className="bg-islamic-gold text-islamic-dark">
                      {t('news.newBadge')}
                    </Badge>
                  )}
                  
                  {newsDetail.isImportant && (
                    <Badge variant="destructive" className="bg-red-500">
                      {t('news.importantBadge')}
                    </Badge>
                  )}
                  
                  <span className="text-sm text-islamic-cream/60 ml-auto">
                    {newsDetail.date}
                  </span>
                </div>

                {/* 新闻标题 */}
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-islamic-cream mb-4 leading-tight">
                    {newsDetail.title}
                  </h1>
                </div>

                {/* 新闻内容 */}
                <div className="prose prose-invert max-w-none">
                  <div className="text-islamic-cream/90 leading-relaxed whitespace-pre-wrap">
                    {newsDetail.content}
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
} 
