// API响应的原始数据结构
export interface NewsApiItem {
  id: string
  title: string
  content: string
  summary?: string
  imageUrl: string
  date: string
  publishTime: string
}

// 新闻详情API响应
export interface NewsDetailApiResponse {
  code: number
  message: string
  data: NewsApiItem
}

// API响应接口
export interface NewsApiResponse {
  code: number
  message: string
  data: NewsApiItem[]
}

export interface NewsListApiResponse {
  code: number
  message: string
  data: {
    items: NewsApiItem[]
    pagination: {
      current_page: number
      per_page: number
      total: number
      total_pages: number
      has_next: boolean
      has_prev: boolean
    }
  }
}

// API请求参数
export interface HomepageNewsRequest {
  language?: string
  limit?: number
}

export interface NewsListRequest {
  page?: number
  limit?: number
  language?: string
}

export interface NewsDetailRequest {
  id: string
  language?: string
} 
