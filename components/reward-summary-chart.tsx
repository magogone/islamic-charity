"use client"

import { Bar, BarChart, LabelList, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

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
  // 计算已发放总额 = 已提取 + 可提取
  const distributedAmount = data.withdrawnAmount + data.withdrawableAmount
  // 计算潜在额外收益 = 最大可得 - 预期
  const additionalPotential = data.maxReward - data.expectedReward

  // 准备堆叠图数据 - 水平方向
  const chartData = [
    {
      name: "已提取/可提取",
      withdrawn: data.withdrawnAmount,
      withdrawable: data.withdrawableAmount,
    },
    {
      name: "预期/最大",
      expected: data.expectedReward,
      maxPotential: additionalPotential > 0 ? additionalPotential : 0,
    },
  ]

  // 自定义提示框
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      // 根据不同的数据行显示不同的内容
      if (label === "已提取/可提取") {
        return (
          <div className="bg-islamic-medium/90 backdrop-blur-sm p-3 rounded border border-islamic-gold/30 text-white">
            <div className="mb-1">
              <div className="flex items-center mb-1">
                <div className="w-3 h-3 rounded-full bg-[#d4b96e] mr-2"></div>
                <span className="text-xs text-islamic-cream/90">Withdrawn Earnings:</span>
                <span className="text-sm font-medium text-islamic-gold ml-2">{data.withdrawnAmount} USDT</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-[#d4b96e]/60 mr-2"></div>
                <span className="text-xs text-islamic-cream/90">Withdrawable Earnings:</span>
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
                <span className="text-xs text-islamic-cream/90">Expected Total Earnings:</span>
                <span className="text-sm font-medium text-[#8dc63f] ml-2">{data.expectedReward} USDT</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-[#8dc63f]/60 mr-2"></div>
                <span className="text-xs text-islamic-cream/90">Maximum Potential Earnings:</span>
                <span className="text-sm font-medium text-[#8dc63f]/80 ml-2">{data.maxReward} USDT</span>
              </div>
            </div>
          </div>
        )
      }
    }
    return null
  }

  // 自定义标签
  const renderCustomizedLabel = (props: any) => {
    const { x, y, width, height, value, dataKey } = props

    // 只有当值大于0时才显示标签
    if (!value || value <= 0) return null

    // 根据数据类型设置不同的标签文本
    const labelText = `${value} USDT`

    // 根据数据类型设置不同的位置
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
    <div className="w-full h-[140px]">
      <div className="flex items-center mb-2">
        <div className="text-xs text-islamic-cream/80 w-[70px]">
          <div>Withdrawn</div>
          <div>Withdrawable</div>
        </div>
        <div className="flex-1 h-[30px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={[chartData[0]]}
              layout="vertical"
              margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
              barSize={30}
            >
              <XAxis type="number" hide />
              <YAxis type="category" hide />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255, 255, 255, 0.1)" }} />
              <Bar dataKey="withdrawn" stackId="a" fill="#d4b96e" radius={[4, 0, 0, 4]} name="已提取收益">
                <LabelList dataKey="withdrawn" content={renderCustomizedLabel} />
              </Bar>
              <Bar dataKey="withdrawable" stackId="a" fill="#d4b96e80" radius={[0, 4, 4, 0]} name="可提取收益">
                <LabelList dataKey="withdrawable" content={renderCustomizedLabel} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="flex items-center mt-4">
        <div className="text-xs text-islamic-cream/80 w-[70px]">
          <div>Expected</div>
          <div>Maximum</div>
        </div>
        <div className="flex-1 h-[30px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={[chartData[1]]}
              layout="vertical"
              margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
              barSize={30}
            >
              <XAxis type="number" hide />
              <YAxis type="category" hide />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255, 255, 255, 0.1)" }} />
              <Bar dataKey="expected" stackId="b" fill="#8dc63f" radius={[4, 0, 0, 4]} name="预计总收益">
                <LabelList dataKey="expected" content={renderCustomizedLabel} />
              </Bar>
              <Bar dataKey="maxPotential" stackId="b" fill="#8dc63f80" radius={[0, 4, 4, 0]} name="潜在额外收益">
                <LabelList dataKey="maxPotential" content={renderCustomizedLabel} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
