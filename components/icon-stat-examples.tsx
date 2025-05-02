"use client"

import { Gift, Users, Wallet } from "lucide-react"
import { IconStatItem } from "./icon-stat-item"

export function IconStatExamples() {
  return (
    <div className="p-4 space-y-4 bg-islamic-cream/10 rounded-lg">
      <h3 className="text-islamic-gold text-lg font-medium mb-4">Statistics</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Upgrade reward example */}
        <IconStatItem
          icon={<Gift className="h-4 w-4" />}
          value="¥7,000"
          description="Upgrade"
          iconBgColor="bg-islamic-gold/20"
          iconColor="text-islamic-gold"
          valueClassName="text-islamic-dark"
          descriptionClassName="text-islamic-dark/70"
        />

        {/* Donation amount example */}
        <IconStatItem
          icon={<Wallet className="h-4 w-4" />}
          value="¥12,500"
          description="Total Donations"
          iconBgColor="bg-islamic-gold/20"
          iconColor="text-islamic-gold"
          valueClassName="text-islamic-dark"
          descriptionClassName="text-islamic-dark/70"
        />

        {/* Referral count example */}
        <IconStatItem
          icon={<Users className="h-4 w-4" />}
          value="24"
          description="Referrals"
          iconBgColor="bg-islamic-gold/20"
          iconColor="text-islamic-gold"
          valueClassName="text-islamic-dark"
          descriptionClassName="text-islamic-dark/70"
        />
      </div>
    </div>
  )
}
