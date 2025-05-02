"use client"

import { cn } from "@/lib/utils"
import { Calendar } from "lucide-react"
import { FallbackImage } from "./fallback-image"

interface EventCardProps {
  imageUrl: string
  title: string
  description?: string
  date?: string
  time?: string
  location?: string
  language?: string
  isFeatured?: boolean
  className?: string
  onClick?: () => void
  fullWidth?: boolean
}

export function EventCard({
  imageUrl,
  title,
  description,
  date,
  time,
  location,
  language = "中文",
  isFeatured = false,
  className,
  onClick,
  fullWidth = false,
}: EventCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl overflow-hidden bg-islamic-cardBg/90 backdrop-blur-sm shadow-md flex flex-col",
        fullWidth ? "w-full" : "w-[280px]",
        className,
      )}
      onClick={onClick}
    >
      {/* 图片区域 - 使用叠加效果使图片与背景色调和 */}
      <div className="relative h-32 w-full">
        <div className="relative w-full h-full">
          <FallbackImage
            src={imageUrl}
            fallbackSrc="/Eid-Celebration.png"
            alt={title}
            fill
            className="object-cover opacity-90"
            unoptimized={true}
          />
        </div>
        <div className="absolute inset-0 bg-islamic-dark/30 mix-blend-multiply"></div>

        {/* 语言标签 */}
        {language && (
          <div className="absolute top-2 right-2 px-2 py-0.5 bg-black/30 backdrop-blur-sm text-white text-xs rounded-full">
            {language}
          </div>
        )}

        {/* 日期突出显示 */}
        {date && (
          <div className="absolute bottom-2 left-2 flex items-center bg-[#2d1b40]/70 backdrop-blur-sm rounded-md px-2 py-1">
            <Calendar className="h-3 w-3 text-[#d4b96e] mr-1" />
            <span className="text-xs text-[#f5efe0]">{date}</span>
          </div>
        )}
      </div>

      {/* 内容区域 */}
      <div className="p-3 flex-1 flex flex-col">
        <h3 className="text-base font-medium text-[#d4b96e] line-clamp-1">{title}</h3>
        {description && <p className="text-xs text-[#f5efe0]/70 mt-1 line-clamp-4">{description}</p>}

        <div className="mt-3 grid grid-cols-2 gap-x-2 gap-y-1 text-xs">
          {time && (
            <>
              <div className="text-[#f5efe0]/70">时间</div>
              <div className="font-medium text-[#f5efe0] text-right">{time}</div>
            </>
          )}
          {location && (
            <>
              <div className="text-[#f5efe0]/70">地点</div>
              <div className="font-medium text-[#f5efe0] text-right">{location}</div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
