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

  // 检查是否只有一个值为0的情况
  const hasOneZeroWithdrawn = (data.withdrawnAmount === 0 && data.withdrawableAmount > 0) || 
                              (data.withdrawnAmount > 0 && data.withdrawableAmount === 0);
  
  const hasOneZeroExpected = (data.expectedReward === 0 && additionalPotential > 0) || 
                             (data.expectedReward > 0 && additionalPotential === 0);

  // Prepare data for stacked bars
  const withdrawnData = [
    {
      name: "Withdrawn/Withdrawable",
      // 当只有一个值为0时，使用固定的50/50比例
      withdrawn: hasOneZeroWithdrawn ? 1 : (data.withdrawnAmount || 0.001),
      withdrawable: hasOneZeroWithdrawn ? 1 : (data.withdrawableAmount || 0.001),
      // 添加标记字段表示是否为零值
      isWithdrawnZero: data.withdrawnAmount === 0,
      isWithdrawableZero: data.withdrawableAmount === 0,
      // 添加原始值用于显示
      originalWithdrawn: data.withdrawnAmount,
      originalWithdrawable: data.withdrawableAmount
    },
  ]

  const expectedData = [
    {
      name: "Expected/Maximum",
      // 当只有一个值为0时，使用固定的50/50比例
      expected: hasOneZeroExpected ? 1 : (data.expectedReward || 0.001),
      maxPotential: hasOneZeroExpected ? 1 : (additionalPotential || 0.001),
      isExpectedZero: data.expectedReward === 0,
      isMaxPotentialZero: additionalPotential === 0,
      // 添加原始值用于显示
      originalExpected: data.expectedReward,
      originalMaxPotential: additionalPotential
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

  return (
    <TooltipProvider>
      <div className="w-full">
        {/* 采用统一的布局容器来确保对齐 */}
        <div className="grid grid-cols-2 mb-1">
          <div className="text-sm text-islamic-cream/80 text-left pl-2">Withdrawn</div>
          <div className="text-sm text-islamic-cream/80 text-right pr-2">Withdrawable</div>
        </div>

        {/* Row 2: Withdrawn/Withdrawable stacked bar */}
        <div className="mb-6 h-[40px] relative">
          {/* 确保背景容器始终可见 */}
          <div className="absolute inset-0 bg-islamic-dark/50 rounded-md"></div>
          
          {/* 当都为0时直接显示固定内容 */}
          {data.withdrawnAmount === 0 && data.withdrawableAmount === 0 ? (
            <div className="absolute inset-0 grid grid-cols-2 divide-x divide-islamic-cream/30">
              <div className="flex items-center justify-center">
                <span className="text-xs font-medium text-white">0 USDT</span>
              </div>
              <div className="flex items-center justify-center">
                <span className="text-xs font-medium text-white">0 USDT</span>
              </div>
            </div>
          ) : hasOneZeroWithdrawn ? (
            // 当只有一个值为0时使用固定布局
            <div className="absolute inset-0 grid grid-cols-2 divide-x divide-islamic-cream/30">
              <div className="flex items-center justify-center" style={{ backgroundColor: data.withdrawnAmount === 0 ? 'transparent' : 'rgba(212, 185, 110, 0.8)' }}>
                <span className="text-xs font-medium text-white">{data.withdrawnAmount} USDT</span>
              </div>
              <div className="flex items-center justify-center" style={{ backgroundColor: data.withdrawableAmount === 0 ? 'transparent' : 'rgba(212, 185, 110, 0.5)' }}>
                <span className="text-xs font-medium text-white">{data.withdrawableAmount} USDT</span>
              </div>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={withdrawnData}
                layout="vertical"
                margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                barSize={40}
              >
                <XAxis 
                  type="number" 
                  hide 
                  domain={[0, 'dataMax']} 
                />
                <YAxis type="category" hide />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255, 255, 255, 0.1)" }} />
                <Bar 
                  dataKey="withdrawn" 
                  stackId="a" 
                  fill={data.withdrawnAmount === 0 ? (hasOneZeroWithdrawn ? "#d4b96e30" : "#d4b96e30") : "#d4b96e"}
                  radius={[4, 0, 0, 4]} 
                  name="Withdrawn"
                  minPointSize={1}
                >
                  <LabelList 
                    dataKey="withdrawn" 
                    position="center"
                    content={(props: any) => {
                      const { x, y, width, height, value, index } = props;
                      // 计算中心点位置
                      const centerX = x + (width || 0) / 2;
                      const centerY = y + (height || 0) / 2;
                      
                      // 使用原始值来显示
                      const displayValue = withdrawnData[index].originalWithdrawn;
                      
                      return (
                        <text
                          x={centerX}
                          y={centerY}
                          fill="#fff"
                          textAnchor="middle"
                          dominantBaseline="middle"
                          className="text-xs font-medium"
                        >
                          {`${displayValue} USDT`}
                        </text>
                      );
                    }} 
                  />
                </Bar>
                <Bar 
                  dataKey="withdrawable" 
                  stackId="a" 
                  fill={data.withdrawableAmount === 0 ? (hasOneZeroWithdrawn ? "#d4b96e30" : "#d4b96e30") : "#d4b96e80"}
                  radius={[0, 4, 4, 0]} 
                  name="Withdrawable"
                  minPointSize={1}
                >
                  <LabelList 
                    dataKey="withdrawable" 
                    position="center"
                    content={(props: any) => {
                      const { x, y, width, height, value, index } = props;
                      // 计算中心点位置
                      const centerX = x + (width || 0) / 2;
                      const centerY = y + (height || 0) / 2;
                      
                      // 使用原始值来显示
                      const displayValue = withdrawnData[index].originalWithdrawable;
                      
                      return (
                        <text
                          x={centerX}
                          y={centerY}
                          fill="#fff"
                          textAnchor="middle"
                          dominantBaseline="middle"
                          className="text-xs font-medium"
                        >
                          {`${displayValue} USDT`}
                        </text>
                      );
                    }} 
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* 同样对期望/最大值区域应用相同的对齐方式 */}
        <div className="grid grid-cols-2 mb-1">
          <div className="text-sm text-islamic-cream/80 text-left pl-2">Expected</div>
          <div className="text-sm text-islamic-cream/80 text-right pr-2">Maximum</div>
        </div>

        {/* Row 4: Expected/Maximum stacked bar */}
        <div className="h-[40px] relative">
          {/* 确保背景容器始终可见 */}
          <div className="absolute inset-0 bg-islamic-dark/50 rounded-md"></div>
          
          {/* 当都为0时直接显示固定内容 */}
          {data.expectedReward === 0 && additionalPotential === 0 ? (
            <div className="absolute inset-0 grid grid-cols-2 divide-x divide-islamic-cream/30">
              <div className="flex items-center justify-center">
                <span className="text-xs font-medium text-white">0 USDT</span>
              </div>
              <div className="flex items-center justify-center">
                <span className="text-xs font-medium text-white">0 USDT</span>
              </div>
            </div>
          ) : hasOneZeroExpected ? (
            // 当只有一个值为0时使用固定布局
            <div className="absolute inset-0 grid grid-cols-2 divide-x divide-islamic-cream/30">
              <div className="flex items-center justify-center" style={{ backgroundColor: data.expectedReward === 0 ? 'transparent' : 'rgba(141, 198, 63, 0.8)' }}>
                <span className="text-xs font-medium text-white">{data.expectedReward} USDT</span>
              </div>
              <div className="flex items-center justify-center" style={{ backgroundColor: additionalPotential === 0 ? 'transparent' : 'rgba(141, 198, 63, 0.5)' }}>
                <span className="text-xs font-medium text-white">{additionalPotential} USDT</span>
              </div>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={expectedData}
                layout="vertical"
                margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                barSize={40}
              >
                <XAxis 
                  type="number" 
                  hide 
                  domain={[0, 'dataMax']} 
                />
                <YAxis type="category" hide />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255, 255, 255, 0.1)" }} />
                <Bar 
                  dataKey="expected" 
                  stackId="b" 
                  fill={data.expectedReward === 0 ? (hasOneZeroExpected ? "#8dc63f30" : "#8dc63f30") : "#8dc63f"} 
                  radius={[4, 0, 0, 4]} 
                  name="Expected"
                  minPointSize={1}
                >
                  <LabelList 
                    dataKey="expected" 
                    position="center"
                    content={(props: any) => {
                      const { x, y, width, height, value, index } = props;
                      // 计算中心点位置
                      const centerX = x + (width || 0) / 2;
                      const centerY = y + (height || 0) / 2;
                      
                      // 使用原始值来显示
                      const displayValue = expectedData[index].originalExpected;
                      
                      return (
                        <text
                          x={centerX}
                          y={centerY}
                          fill="#fff"
                          textAnchor="middle"
                          dominantBaseline="middle"
                          className="text-xs font-medium"
                        >
                          {`${displayValue} USDT`}
                        </text>
                      );
                    }} 
                  />
                </Bar>
                <Bar 
                  dataKey="maxPotential" 
                  stackId="b" 
                  fill={additionalPotential === 0 ? (hasOneZeroExpected ? "#8dc63f30" : "#8dc63f30") : "#8dc63f80"} 
                  radius={[0, 4, 4, 0]} 
                  name="Maximum"
                  minPointSize={1}
                >
                  <LabelList 
                    dataKey="maxPotential" 
                    position="center"
                    content={(props: any) => {
                      const { x, y, width, height, value, index } = props;
                      // 计算中心点位置
                      const centerX = x + (width || 0) / 2;
                      const centerY = y + (height || 0) / 2;
                      
                      // 使用原始值来显示
                      const displayValue = expectedData[index].originalMaxPotential;
                      
                      return (
                        <text
                          x={centerX}
                          y={centerY}
                          fill="#fff"
                          textAnchor="middle"
                          dominantBaseline="middle"
                          className="text-xs font-medium"
                        >
                          {`${displayValue} USDT`}
                        </text>
                      );
                    }} 
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </TooltipProvider>
  )
}
