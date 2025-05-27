"use client"

import { useEffect } from 'react'
import { useTranslation } from '@/lib/i18n'

interface RTLProviderProps {
  children: React.ReactNode
}

export function RTLProvider({ children }: RTLProviderProps) {
  const { direction, isRTL, locale } = useTranslation()

  useEffect(() => {
    // 设置HTML文档的方向属性
    document.documentElement.dir = direction
    
    // 根据当前语言设置正确的lang属性
    const langMap: Record<string, string> = {
      'en': 'en',
      'zh': 'zh-CN',
      'ar': 'ar',
      'ur': 'ur'
    }
    document.documentElement.lang = langMap[locale] || 'en'
    
    // 为RTL语言添加特殊的CSS类
    if (isRTL) {
      document.documentElement.classList.add('rtl')
      document.documentElement.classList.remove('ltr')
    } else {
      document.documentElement.classList.add('ltr')
      document.documentElement.classList.remove('rtl')
    }
  }, [direction, isRTL, locale])

  return (
    <div dir={direction} className={isRTL ? 'rtl' : 'ltr'}>
      {children}
    </div>
  )
} 
 