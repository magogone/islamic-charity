"use client"

import { useState, useEffect, useRef } from 'react';
import { getSetting, clearSettingsCache } from '@/lib/settings';

/**
 * React Hook，用于在组件中获取设置值
 * 
 * @param key 设置键
 * @param group 设置组
 * @param defaultValue 默认值，当设置不存在或请求失败时返回
 * @returns 设置值、加载状态和刷新函数
 */
export function useSetting(key: string, group: string, defaultValue: string = "") {
  const [value, setValue] = useState<string>(defaultValue);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const renderCountRef = useRef(0);
  const requestCountRef = useRef(0);

  // 用于跟踪组件渲染
  useEffect(() => {
    renderCountRef.current += 1;
  });

  // 加载设置值
  const loadSetting = async (useCache = true) => {
    try {
      const requestId = ++requestCountRef.current;
      
      setIsLoading(true);
      setError(null);
      const startTime = Date.now();
      const settingValue = await getSetting(key, group, defaultValue, useCache);
      
      setValue(settingValue);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load setting'));
      console.error(`[use-settings] Error loading setting ${key} from group ${group}:`, err);
    } finally {
      setIsLoading(false);
    }
  };

  // 刷新设置，跳过缓存重新获取
  const refreshSetting = () => {
    // 清除特定设置的缓存
    clearSettingsCache(key, group);
    // 重新加载，不使用缓存
    return loadSetting(false);
  };

  // 首次加载
  useEffect(() => {
    loadSetting();
    
    return () => {
      // cleanup
    };
  }, [key, group, defaultValue]);

  return {
    value,
    isLoading,
    error,
    refresh: refreshSetting
  };
}

/**
 * 工具类，用于管理应用中的所有设置
 */
export const useSettings = () => {
  return {
    getSetting,
    clearCache: clearSettingsCache,
    useSetting,
  };
}; 
