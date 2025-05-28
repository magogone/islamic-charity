import { apiRequest, ApiResponse } from '@/lib/api'
import type { 
  HomepageNewsRequest, 
  NewsDetailRequest,
  NewsApiItem
} from '@/types/api'

/**
 * 获取新闻详情
 */
export async function fetchNewsDetail(params: NewsDetailRequest): Promise<ApiResponse<NewsApiItem>> {
  return apiRequest<NewsApiItem>(`/news/${params.id}`, 'GET', {
    language: params.language
  })
}

/**
 * 获取首页新闻
 */
export async function fetchHomepageNews(params: HomepageNewsRequest = {}): Promise<ApiResponse<NewsApiItem[]>> {
  return apiRequest<NewsApiItem[]>('/news/homepage', 'GET', {
    language: params.language,
    limit: params.limit
  })
} 
