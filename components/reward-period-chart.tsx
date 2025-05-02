"use client"
import { useState } from "react"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, ReferenceLine } from "recharts"
import { Card, CardContent } from "@/components/ui/card"
import { X } from "lucide-react"

interface RewardData {
  date: string
  actual: number
  maximum: number
  distributed: boolean // 添加标志表示是否已发放
}

interface RewardPeriodChartProps {
  data: RewardData[]
  startDate?: string
  endDate?: string
}

export function RewardPeriodChart({ data, startDate, endDate }: RewardPeriodChartProps) {
  const [activePoint, setActivePoint] = useState<null | {
    date: string
    actual: number
    maximum: number
    distributed: boolean
  }>(null)

  // 获取今天的日期字符串
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const todayStr = today.toISOString().split("T")[0]

  // 处理数据，计算差值
  const chartData = data.map((item) => {
    return {
      date: item.date,
      actual: item.actual,
      potential: item.maximum - item.actual,
      maximum: item.maximum,
      distributed: item.distributed,
    }
  })

  // 自定义提示框
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const actual = payload[0].value
      const maximum = actual + (payload[1]?.value || 0)
      const distributed = payload[0].payload.distributed

      return (
        <div className="bg-islamic-medium border border-islamic-gold/30 p-2 rounded-md shadow-md text-xs">
          <p className="text-islamic-gold font-medium mb-1">{formatDate(label)}</p>
          <p className="text-islamic-cream flex justify-between">
            <span>{distributed ? "实际奖励: " : "预期奖励: "}</span>
            <span className="font-medium" style={{ color: distributed ? "#8dc63f" : "#4caf50" }}>
              {actual} USDT
            </span>
          </p>
          <p className="text-islamic-cream/80 flex justify-between">
            <span>最大奖励: </span>
            <span className="font-medium">{maximum} USDT</span>
          </p>
          <p className="text-islamic-cream/80 flex justify-between text-[10px] mt-1">
            <span>完成率: </span>
            <span>{Math.round((actual / maximum) * 100)}%</span>
          </p>
        </div>
      )
    }
    return null
  }

  // 格式化日期
  const formatDate = (dateStr: string) => {
    if (!dateStr) return ""
    try {
      const date = new Date(dateStr)
      return `${date.getMonth() + 1}月${date.getDate()}日`
    } catch (e) {
      return dateStr
    }
  }

  // 自定义X轴刻度
  const CustomizedAxisTick = (props: any) => {
    const { x, y, payload } = props

    // 添加安全检查
    if (!payload || payload.value === undefined) {
      return null
    }

    try {
      const date = new Date(payload.value)
      const month = date.getMonth() + 1
      const day = date.getDate()
      const isToday = date.toDateString() === today.toDateString()

      return (
        <g transform={`translate(${x},${y})`}>
          <text
            x={0}
            y={0}
            dy={16}
            textAnchor="middle"
            fill={isToday ? "#d4b96e" : "#f5efe0"}
            fontSize={10}
            fontWeight={isToday ? "bold" : "normal"}
          >
            {`${month}/${day}`}
          </text>
        </g>
      )
    } catch (e) {
      // 如果日期解析失败，显示原始值
      return (
        <g transform={`translate(${x},${y})`}>
          <text x={0} y={0} dy={16} textAnchor="middle" fill="#f5efe0" fontSize={10}>
            {String(payload.value).substring(0, 5)}
          </text>
        </g>
      )
    }
  }

  // 处理点击事件
  const handleClick = (data: any, index: number) => {
    if (data && data.activePayload && data.activePayload.length) {
      const clickedData = data.activePayload[0].payload
      setActivePoint({
        date: clickedData.date,
        actual: clickedData.actual,
        maximum: clickedData.maximum || clickedData.actual + clickedData.potential,
        distributed: clickedData.distributed,
      })
    }
  }

  // 关闭详情
  const closeDetails = () => {
    setActivePoint(null)
  }

  // 如果没有数据，显示空状态
  if (!data || data.length === 0) {
    return <div className="flex items-center justify-center h-full text-islamic-cream/70">暂无奖励数据</div>
  }

  // 颜色定义
  const colors = {
    distributed: "#8dc63f", // 已发放 - 亮绿色
    future: "#4caf50", // 将发放 - 浅绿色
    potential: "#555555", // 潜在奖励 - 灰色
  }

  // 获取开始和结束日期
  const periodStartDate = startDate || (data.length > 0 ? data[0].date : "")
  const periodEndDate = endDate || (data.length > 0 ? data[data.length - 1].date : "")

  // 计算剩余天数
  let remainingDays = 0
  try {
    const endDate = new Date(periodEndDate)
    if (!isNaN(endDate.getTime())) {
      remainingDays = Math.ceil((endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))

      // 如果是过去的日期，显示已结束
      if (remainingDays < 0) {
        remainingDays = 0
      }
    }
  } catch (e) {
    console.error("日期计算错误:", e)
  }

  return (
    <div className="relative">
      {/* 标题和图例 */}
      <div className="flex justify-between items-center text-xs mb-2">
        <div className="text-islamic-cream/80">开始: {formatDate(periodStartDate)}</div>
        <div className="flex space-x-3">
          <div className="flex items-center">
            <div className="w-3 h-3 mr-1" style={{ backgroundColor: colors.distributed }}></div>
            <span className="text-islamic-cream/80">已发放</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 mr-1" style={{ backgroundColor: colors.future }}></div>
            <span className="text-islamic-cream/80">将发放</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 mr-1" style={{ backgroundColor: colors.potential }}></div>
            <span className="text-islamic-cream/80">潜在奖励</span>
          </div>
        </div>
        <div className="text-islamic-cream/80">结束: {formatDate(periodEndDate)}</div>
      </div>

      {/* 图表容器 */}
      <div className="h-[240px] relative">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 10, right: 0, left: -20, bottom: 0 }}
            barSize={8}
            barGap={0}
            onClick={handleClick}
          >
            <XAxis
              dataKey="date"
              tick={<CustomizedAxisTick />}
              axisLine={{ stroke: "#2a1c3d" }}
              tickLine={false}
              interval={Math.max(0, Math.floor(chartData.length / 15))}
            />
            <YAxis hide={true} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(212, 185, 110, 0.1)" }} />

            {/* 添加今天的参考线 */}
            <ReferenceLine x={todayStr} stroke="#d4b96e" strokeWidth={1} strokeDasharray="3 3" />

            <Bar dataKey="actual" stackId="a" fill={colors.distributed}>
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-actual-${index}`}
                  fill={entry.distributed ? colors.distributed : colors.future}
                  cursor="pointer"
                />
              ))}
            </Bar>
            <Bar dataKey="potential" stackId="a" fill={colors.potential}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-potential-${index}`} fill={colors.potential} cursor="pointer" opacity={0.3} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>

        {/* 点击后显示详细信息 - 浮动在图表中央 */}
        {activePoint && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 w-64">
            <Card className="bg-islamic-medium border-islamic-gold/30 text-white">
              <div className="absolute top-2 right-2">
                <button
                  onClick={closeDetails}
                  className="text-islamic-cream/70 hover:text-islamic-cream transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
              <CardContent className="p-4">
                <div className="text-base font-medium text-islamic-gold mb-3">
                  {formatDate(activePoint.date)} 奖励详情
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-islamic-cream/80">{activePoint.distributed ? "实际奖励:" : "预期奖励:"}</span>
                    <span
                      className="font-medium text-lg"
                      style={{ color: activePoint.distributed ? colors.distributed : colors.future }}
                    >
                      {activePoint.actual} USDT
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-islamic-cream/80">最大奖励:</span>
                    <span className="font-medium text-lg text-islamic-cream">{activePoint.maximum} USDT</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-islamic-cream/80">完成率:</span>
                    <span className="font-medium text-lg text-islamic-cream">
                      {Math.round((activePoint.actual / activePoint.maximum) * 100)}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-islamic-cream/80">差额:</span>
                    <span className="font-medium text-islamic-cream/80">
                      {(activePoint.maximum - activePoint.actual).toFixed(2)} USDT
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-islamic-cream/80">状态:</span>
                    <span
                      className="font-medium"
                      style={{ color: activePoint.distributed ? colors.distributed : colors.future }}
                    >
                      {activePoint.distributed ? "已发放" : "未发放"}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
