"use client"

import { Bar, BarChart, LabelList, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { TooltipProvider } from "@/components/ui/tooltip"

interface RewardSummaryChartProps {
  data: {
    expectedReward: number
    maxReward: number
    withdrawnAmount: number
    withdrawableAmount: number
  }
  onWithdraw?: () => void
}

export function RewardSummaryChart({ data, onWithdraw }: RewardSummaryChartProps) {
  // Calculate additional potential = maximum - expected
  const additionalPotential = data.maxReward - data.expectedReward > 0 ? data.maxReward - data.expectedReward : 0

  // Prepare data for stacked bars
  const withdrawnData = [
    {
      name: "Withdrawn/Withdrawable",
      withdrawn: data.withdrawnAmount,
      withdrawable: data.withdrawableAmount,
    },
  ]

  const expectedData = [
    {
      name: "Expected/Maximum",
      expected: data.expectedReward,
      maxPotential: additionalPotential,
    },
  ]

  // Custom tooltip for the chart
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const dataKey = payload[0].dataKey

      if (dataKey === "withdrawn" || dataKey === "withdrawable") {
        return (
          <div className="bg-islamic-medium/90 backdrop-blur-sm p-3 rounded border border-islamic-gold/30 text-white">
            <div className="mb-1">
              <div className="flex items-center mb-1">
                <div className="w-3 h-3 rounded-full bg-[#d4b96e] mr-2"></div>
                <span className="text-xs text-islamic-cream/90">Withdrawn:</span>
                <span className="text-sm font-medium text-islamic-gold ml-2">{data.withdrawnAmount} USDT</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-[#d4b96e]/60 mr-2"></div>
                <span className="text-xs text-islamic-cream/90">Withdrawable:</span>
                <span className="text-sm font-medium text-islamic-gold/80 ml-2">{data.withdrawableAmount} USDT</span>
              </div>
            </div>
          </div>
        )
      } else {
        return (
          <div className="bg-islamic-medium/90 backdrop-blur-sm p-3 rounded border border-islamic-gold/30 text-white">
            <div className="mb-1">
              <div className="flex items-center mb-1">
                <div className="w-3 h-3 rounded-full bg-[#8dc63f] mr-2"></div>
                <span className="text-xs text-islamic-cream/90">Expected:</span>
                <span className="text-sm font-medium text-[#8dc63f] ml-2">{data.expectedReward} USDT</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-[#8dc63f]/60 mr-2"></div>
                <span className="text-xs text-islamic-cream/90">Maximum:</span>
                <span className="text-sm font-medium text-[#8dc63f]/80 ml-2">{data.maxReward} USDT</span>
              </div>
            </div>
          </div>
        )
      }
    }
    return null
  }

  // Custom label renderer
  const renderCustomizedLabel = (props: any) => {
    const { x, y, width, height, value } = props

    // Only show label if value is greater than 0
    if (!value || value <= 0) return null

    const labelText = `${value} USDT`
    const labelX = x + width / 2
    const labelY = y + height / 2

    return (
      <text
        x={labelX}
        y={labelY}
        fill="#fff"
        textAnchor="middle"
        dominantBaseline="middle"
        className="text-xs font-medium"
      >
        {labelText}
      </text>
    )
  }

  return (
    <TooltipProvider>
      <div className="w-full">
        {/* Row 1: Withdrawn/Withdrawable labels */}
        <div className="flex mb-1">
          <div className="w-[100px] text-sm text-islamic-cream/80">Withdrawn</div>
          <div className="w-[100px] text-sm text-islamic-cream/80">Withdrawable</div>
        </div>

        {/* Row 2: Withdrawn/Withdrawable stacked bar */}
        <div className="mb-6 h-[40px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={withdrawnData}
              layout="vertical"
              margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
              barSize={40}
            >
              <XAxis type="number" hide />
              <YAxis type="category" hide />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255, 255, 255, 0.1)" }} />
              <Bar dataKey="withdrawn" stackId="a" fill="#d4b96e" radius={[4, 0, 0, 4]} name="Withdrawn">
                <LabelList dataKey="withdrawn" content={renderCustomizedLabel} />
              </Bar>
              <Bar dataKey="withdrawable" stackId="a" fill="#d4b96e80" radius={[0, 4, 4, 0]} name="Withdrawable">
                <LabelList dataKey="withdrawable" content={renderCustomizedLabel} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Row 3: Expected/Maximum labels */}
        <div className="flex mb-1">
          <div className="w-[100px] text-sm text-islamic-cream/80">Expected</div>
          <div className="w-[100px] text-sm text-islamic-cream/80">Maximum</div>
        </div>

        {/* Row 4: Expected/Maximum stacked bar */}
        <div className="h-[40px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={expectedData}
              layout="vertical"
              margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
              barSize={40}
            >
              <XAxis type="number" hide />
              <YAxis type="category" hide />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255, 255, 255, 0.1)" }} />
              <Bar dataKey="expected" stackId="b" fill="#8dc63f" radius={[4, 0, 0, 4]} name="Expected">
                <LabelList dataKey="expected" content={renderCustomizedLabel} />
              </Bar>
              <Bar dataKey="maxPotential" stackId="b" fill="#8dc63f80" radius={[0, 4, 4, 0]} name="Maximum">
                <LabelList dataKey="maxPotential" content={renderCustomizedLabel} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </TooltipProvider>
  )
}
