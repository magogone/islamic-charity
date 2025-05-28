"use client"

import { useState, useCallback } from "react"
import { useStore } from "./store-context"
import { fetchHomepageNews } from "@/lib/api/news"
import type { NewsAnnouncementItemProps } from "@/components/news-announcement-item"
import type { NewsApiItem } from "@/types/api"

interface UseNewsReturn {
  news: NewsAnnouncementItemProps[]
  loading: boolean
  error: string | null
  fetchHomepageNews: (language?: string) => Promise<void>
  updateNews: (news: NewsAnnouncementItemProps[]) => void
  refresh: () => Promise<void>
}

/**
 * 数据转换函数：将API数据转换为组件所需格式
 */
function transformNewsData(apiData: NewsApiItem[]): NewsAnnouncementItemProps[] {
  const now = new Date()
  
  return apiData.map(item => {
    // 计算是否为新发布的新闻（3天内）
    const publishDate = new Date(item.date)
    const timeDiff = now.getTime() - publishDate.getTime()
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24))
    const isNew = daysDiff <= 3
    
    return {
      id: item.id,
      title: item.title,
      content: item.summary || item.content, // 优先使用摘要
      imageUrl: item.imageUrl,
      date: item.date,
      isNew: isNew, // 根据发布时间动态计算
      isImportant: false, // 后台不再提供这些字段，设为默认值
      type: "news" as const, // 统一设为news类型
    }
  })
}

export function useNews(): UseNewsReturn {
  const { state, dispatch } = useStore()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [currentLanguage, setCurrentLanguage] = useState<string>('en')

  // 获取首页新闻数据
  const fetchNews = useCallback(async (language: string = 'en') => {
    setLoading(true)
    setError(null)
    setCurrentLanguage(language)
    
    try {
      const response = await fetchHomepageNews({
        language,
        limit: 4
      })
      
      // 检查API响应是否成功
      if (response.success && response.data) {
        // 处理数据，即使是空数组也是正常情况
        const newsData = response.data || []
        const transformedData = transformNewsData(newsData)
        dispatch({ type: "UPDATE_NEWS", payload: transformedData })
      } else {
        throw new Error(response.error?.message || 'API request failed')
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch news'
      setError(errorMessage)
      console.error('Error fetching news:', err)
      
      // 发生错误时保持现有数据，不清空
    } finally {
      setLoading(false)
    }
  }, [dispatch])

  // 手动更新新闻数据
  const updateNews = useCallback((news: NewsAnnouncementItemProps[]) => {
    dispatch({ type: "UPDATE_NEWS", payload: news })
  }, [dispatch])

  // 刷新当前语言的新闻
  const refresh = useCallback(async () => {
    await fetchNews(currentLanguage)
  }, [fetchNews, currentLanguage])

  return {
    news: state.news,
    loading,
    error,
    fetchHomepageNews: fetchNews,
    updateNews,
    refresh,
  }
}
