"use client"

import { cn } from "@/lib/utils"
import type React from "react"

interface IconStatItemProps {
  icon: React.ReactNode
  iconBgColor?: string
  iconColor?: string
  value: string
  unit?: string
  description: string
  className?: string
  iconClassName?: string
  valueClassName?: string
  unitClassName?: string
  descriptionClassName?: string
}

export function IconStatItem({
  icon,
  iconBgColor = "bg-islamic-gold/20",
  iconColor = "text-islamic-gold",
  value,
  unit,
  description,
  className,
  iconClassName,
  valueClassName,
  unitClassName,
  descriptionClassName,
}: IconStatItemProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className={cn("flex h-8 w-8 items-center justify-center rounded-full", iconBgColor, iconClassName)}>
        <div className={cn(iconColor)}>{icon}</div>
      </div>
      <div className="flex flex-col">
        <div className="flex items-baseline gap-1">
          <span className={cn("font-bold", valueClassName)}>{value}</span>
          {unit && <span className={cn("text-xs opacity-80", unitClassName)}>{unit}</span>}
        </div>
        <span className={cn("text-xs text-islamic-cream/70", descriptionClassName)}>{description}</span>
      </div>
    </div>
  )
}
