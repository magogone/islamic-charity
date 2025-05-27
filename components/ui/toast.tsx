"use client"

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { cn } from '@/lib/utils'
import { X } from 'lucide-react'

interface ToastProps {
  message: string
  type: 'success' | 'error' | 'info'
  duration?: number
  onClose?: () => void
}

export function Toast({ message, type, duration = 5000, onClose }: ToastProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [isExiting, setIsExiting] = useState(false)

  const handleClose = (e?: React.MouseEvent) => {
    // 阻止事件冒泡
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
    
    setIsExiting(true)
    setTimeout(() => {
      setIsVisible(false)
      onClose?.()
    }, 200) // 给退出动画时间
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      handleClose()
    }, duration)

    return () => clearTimeout(timer)
  }, [duration])

  if (!isVisible) return null

  return (
    <div
      className={cn(
        'flex items-center p-4 rounded-md shadow-lg transform transition-all duration-300 min-w-[300px] max-w-[400px]',
        isExiting ? 'translate-x-full opacity-0' : 'translate-x-0 opacity-100',
        type === 'success' && 'bg-green-900/95 text-green-100 border border-green-700',
        type === 'error' && 'bg-red-900/95 text-red-100 border border-red-700',
        type === 'info' && 'bg-blue-900/95 text-blue-100 border border-blue-700'
      )}
      onClick={(e) => {
        // 阻止toast本身的点击事件冒泡
        e.stopPropagation()
      }}
    >
      <div className="mr-3 flex-shrink-0">
        {type === 'success' && (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        )}
        {type === 'error' && (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        )}
        {type === 'info' && (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )}
      </div>
      <p className="flex-1 text-sm leading-relaxed">{message}</p>
      <button
        onClick={handleClose}
        className={cn(
          'ml-3 flex-shrink-0 p-1 rounded-full transition-all duration-200 hover:scale-110',
          'focus:outline-none focus:ring-2 focus:ring-offset-2',
          type === 'success' && 'hover:bg-green-800 focus:ring-green-500',
          type === 'error' && 'hover:bg-red-800 focus:ring-red-500',
          type === 'info' && 'hover:bg-blue-800 focus:ring-blue-500'
        )}
        aria-label="Close notification"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  )
}

export function useToast() {
  const [toasts, setToasts] = useState<Array<{ id: string; message: string; type: 'success' | 'error' | 'info'; duration?: number; timestamp: number }>>([])
  const [recentMessages, setRecentMessages] = useState<Map<string, number>>(new Map())
  const [isMounted, setIsMounted] = useState(false)
  const [idCounter, setIdCounter] = useState(0)

  // 确保客户端挂载后才开始使用时间相关功能
  useEffect(() => {
    setIsMounted(true)
  }, [])

  const addToast = (message: string, type: 'success' | 'error' | 'info', duration?: number) => {
    // 只在客户端挂载后才进行防重复检查
    if (isMounted) {
      const now = Date.now()
      const messageKey = `${type}:${message}`
      
      // 检查是否在防重复时间窗口内（3秒）
      const lastShown = recentMessages.get(messageKey)
      if (lastShown && now - lastShown < 3000) {
        console.log('Toast prevented: duplicate message within 3 seconds')
        return null // 防止重复显示
      }
      
      // 更新最近消息记录
      setRecentMessages(prev => {
        const newMap = new Map(prev)
        newMap.set(messageKey, now)
        
        // 清理超过10秒的旧记录
        for (const [key, timestamp] of newMap.entries()) {
          if (now - timestamp > 10000) {
            newMap.delete(key)
          }
        }
        
        return newMap
      })
    }
    
    // 使用递增计数器而不是随机数生成ID，确保SSR一致性
    const id = `toast-${idCounter}`
    setIdCounter(prev => prev + 1)
    
    const timestamp = isMounted ? Date.now() : 0
    setToasts((prev) => [...prev, { id, message, type, duration, timestamp }])
    return id
  }

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }

  const success = (message: string, duration?: number) => addToast(message, 'success', duration)
  const error = (message: string, duration?: number) => addToast(message, 'error', duration)
  const info = (message: string, duration?: number) => addToast(message, 'info', duration)

  const ToastContainer = () => {
    // 在服务器端或未挂载时不渲染任何内容
    if (typeof window === 'undefined' || !isMounted) return null
    
    return createPortal(
      <div 
        className="fixed bottom-4 right-4 z-50 flex flex-col-reverse gap-2 pointer-events-none"
        onClick={(e) => {
          // 阻止事件冒泡，确保toast点击不影响其他对话框
          e.stopPropagation()
        }}
        onKeyDown={(e) => {
          // 阻止键盘事件冒泡
          e.stopPropagation()
        }}
      >
        {toasts.map((toast, index) => (
          <div 
            key={toast.id} 
            className="pointer-events-auto"
            style={{
              transform: `translateY(-${index * 8}px)`,
              zIndex: 50 + toasts.length - index
            }}
            onClick={(e) => {
              // 阻止事件冒泡到父级
              e.stopPropagation()
            }}
          >
            <Toast
              message={toast.message}
              type={toast.type}
              duration={toast.duration}
              onClose={() => removeToast(toast.id)}
            />
          </div>
        ))}
      </div>,
      document.body
    )
  }

  return {
    success,
    error,
    info,
    ToastContainer,
  }
}
