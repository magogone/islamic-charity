"use client"

import { Gift, TrendingUp, Users, Wallet } from "lucide-react"
import { IconStatItem } from "./icon-stat-item"

export function IconStatExamples() {
  return (
    <div className="p-4 space-y-4 bg-islamic-cream/10 rounded-lg">
      <h3 className="text-islamic-gold text-lg font-medium mb-4">统计信息</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* 升级奖励示例 */}
        <IconStatItem
          icon={<Gift className="h-4 w-4" />}
          value="¥7,000"
          description="升级"
          iconBgColor="bg-islamic-gold/20"
          iconColor="text-islamic-gold"
          valueColor="text-islamic-dark"
          descriptionColor="text-islamic-dark/70"
        />

        {/* 捐赠金额示例 */}
        <IconStatItem
          icon={<Wallet className="h-4 w-4" />}
          value="¥12,500"
          description="总捐赠"
          iconBgColor="bg-islamic-gold/20"
          iconColor="text-islamic-gold"
          valueColor="text-islamic-dark"
          descriptionColor="text-islamic-dark/70"
        />

        {/* 推荐人数示例 */}
        <IconStatItem
          icon={<Users className="h-4 w-4" />}
          value="24"
          description="推荐人数"
          iconBgColor="bg-islamic-gold/20"
          iconColor="text-islamic-gold"
          valueColor="text-islamic-dark"
          descriptionColor="text-islamic-dark/70"
        />

        {/* 增长率示例 */}
        <IconStatItem
          icon={<TrendingUp className="h-4 w-4" />}
          value="15%"
          description="增长率"
          iconBgColor="bg-islamic-gold/20"
          iconColor="text-islamic-gold"
          valueColor="text-islamic-dark"
          descriptionColor="text-islamic-dark/70"
        />
      </div>
    </div>
  )
}
