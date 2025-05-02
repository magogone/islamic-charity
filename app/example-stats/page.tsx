"use client"

import { IconStatExamples } from "@/components/icon-stat-examples"
import { IconStatItem } from "@/components/icon-stat-item"
import { Gift } from "lucide-react"

export default function ExampleStatsPage() {
  return (
    <div className="container mx-auto p-4 space-y-8">
      <h1 className="text-2xl font-bold text-islamic-gold">统计组件示例</h1>

      {/* 单个组件示例 - 与图片完全匹配 */}
      <div className="p-4 bg-[#f0f0ff] rounded-lg w-fit">
        <IconStatItem
          icon={<Gift className="h-4 w-4" />}
          value="¥7,000"
          description="升级"
          iconBgColor="bg-[#fff5e0]"
          iconColor="text-[#d4a040]"
          valueColor="text-[#333333]"
          descriptionColor="text-[#666666]"
        />
      </div>

      {/* 多个组件示例 - 使用应用全局风格 */}
      <IconStatExamples />
    </div>
  )
}
