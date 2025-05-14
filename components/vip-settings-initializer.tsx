"use client"

import { useVipSettings } from "@/hooks/use-vip-settings"

/**
 * 这个组件不渲染任何UI，只是用于在应用启动时初始化VIP设置
 * 通过全局初始化标志机制避免多次加载
 */
export function VipSettingsInitializer() {
  // 调用useVipSettings钩子（它内部有防止重复初始化的机制）
  useVipSettings()
  
  // 不渲染任何内容
  return null
} 
