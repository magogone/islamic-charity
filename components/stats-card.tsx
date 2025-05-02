import { DollarSign, TrendingUp, User, Info } from "lucide-react"
import { cn } from "@/lib/utils"
import { IconStatItem } from "./icon-stat-item"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface StatsCardProps {
  currentEarnings: number
  maxEarnings: number
  currentPercentage: number
  maxPercentage: number
  referrals?: number
  className?: string
}

export function StatsCard({
  currentEarnings,
  maxEarnings,
  currentPercentage,
  maxPercentage,
  referrals = 2,
  className,
}: StatsCardProps) {
  return (
    <div className={cn("rounded-xl bg-islamic-dark p-4", className)}>
      <div className="mb-3 flex items-center">
        <TrendingUp className="mr-2 h-4 w-4 text-islamic-gold" />
        <h3 className="text-sm font-medium text-islamic-gold">捐赠奖励</h3>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <IconStatItem
          icon={<DollarSign className="h-4 w-4" />}
          iconBgColor="bg-islamic-gold/20"
          iconColor="text-islamic-gold"
          value={`${currentEarnings}`}
          unit="USDT"
          description="当前获得"
          valueClassName="text-xl font-bold text-islamic-gold"
          unitClassName="text-xs text-islamic-gold/80"
          descriptionClassName="text-[10px] text-islamic-cream/60"
        />

        <IconStatItem
          icon={<TrendingUp className="h-4 w-4" />}
          iconBgColor="bg-islamic-gold/20"
          iconColor="text-islamic-gold"
          value={`${maxEarnings}`}
          unit="USDT"
          description="最大可得"
          valueClassName="text-xl font-bold text-islamic-gold"
          unitClassName="text-xs text-islamic-gold/80"
          descriptionClassName="text-[10px] text-islamic-cream/60"
        />

        <IconStatItem
          icon={<DollarSign className="h-4 w-4" />}
          iconBgColor="bg-islamic-gold/20"
          iconColor="text-islamic-gold"
          value={`${currentPercentage}%`}
          description="当前比例"
          valueClassName="text-xl font-bold text-islamic-gold"
          descriptionClassName="text-[10px] text-islamic-cream/60"
        />

        <IconStatItem
          icon={<TrendingUp className="h-4 w-4" />}
          iconBgColor="bg-islamic-gold/20"
          iconColor="text-islamic-gold"
          value={`${maxPercentage}%`}
          description="最高比例"
          valueClassName="text-xl font-bold text-islamic-gold"
          descriptionClassName="text-[10px] text-islamic-cream/60"
        />
      </div>

      <div className="mt-4 flex items-center justify-end">
        <User className="mr-1 h-3 w-3 text-islamic-cream/60" />
        <span className="text-xs text-islamic-cream/60">已推荐 {referrals} 人</span>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="ml-1 h-4 w-4 p-0">
                <Info className="h-3 w-3 text-islamic-cream/60" />
                <span className="sr-only">更多信息</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-xs">推荐更多好友获得更高奖励</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  )
}
