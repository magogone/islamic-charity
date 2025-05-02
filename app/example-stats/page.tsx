"use client"

import { IconStatExamples } from "@/components/icon-stat-examples"
import { IconStatItem } from "@/components/icon-stat-item"
import { Gift } from "lucide-react"

export default function ExampleStatsPage() {
  return (
    <div className="container mx-auto p-4 space-y-8">
      <h1 className="text-2xl font-bold text-islamic-gold">Statistics Component Examples</h1>

      {/* Single component example - exact match with image */}
      <div className="p-4 bg-[#f0f0ff] rounded-lg w-fit">
        <IconStatItem
          icon={<Gift className="h-4 w-4" />}
          value="¥7,000"
          description="Upgrade"
          iconBgColor="bg-[#fff5e0]"
          iconColor="text-[#d4a040]"
          valueColor="text-[#333333]"
          descriptionColor="text-[#666666]"
        />
      </div>

      {/* Multiple component examples - using app global style */}
      <IconStatExamples />
    </div>
  )
}
