"use client"

export function IslamicBackground() {
  return (
    <>
      {/* 主要背景 - 使用抽象图案替代清真寺 */}
      <div className="fixed inset-0 bg-abstract-pattern opacity-[0.15] dark:opacity-[0.18] pointer-events-none z-0"></div>

      {/* 装饰性图案 */}
      <div className="fixed inset-0 bg-luxury-pattern opacity-[0.15] pointer-events-none z-0"></div>

      {/* 顶部装饰 - 使用几何图案替代清真寺轮廓 */}
      <div className="fixed top-0 left-0 right-0 h-16 pointer-events-none z-0">
        <div className="w-full h-full bg-[url('/geometric-pattern-top.png')] bg-repeat-x bg-top opacity-[0.15] dark:opacity-[0.2]"></div>
      </div>

      {/* 底部装饰 - 使用几何图案替代清真寺轮廓 */}
      <div className="fixed bottom-16 left-0 right-0 h-16 pointer-events-none z-0">
        <div className="w-full h-full bg-[url('/geometric-pattern-bottom.png')] bg-repeat-x bg-bottom opacity-[0.15] dark:opacity-[0.2]"></div>
      </div>

      {/* 边框装饰 */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#d4b96e]/30 to-transparent pointer-events-none z-0"></div>
      <div className="fixed bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#d4b96e]/30 to-transparent pointer-events-none z-0"></div>
    </>
  )
}
