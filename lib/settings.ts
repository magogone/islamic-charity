"use client"

import { getSettings } from "./api";

// 内存缓存设置值，避免重复请求
const settingsCache: Record<string, string> = {};

// 记录正在进行的请求，用于去重
const pendingRequests: Record<string, Promise<string>> = {};

// 记录最后一次请求时间，用于防抖
const lastRequestTimes: Record<string, number> = {};
// 防抖间隔（毫秒）
const DEBOUNCE_INTERVAL = 1000;

// 缓存统计信息对象
const cacheStats = {
  hits: 0,
  misses: 0,
  clears: 0,
  deduped: 0,
  debounced: 0
};

/**
 * 生成设置键的缓存键
 */
function getCacheKey(key: string, group: string): string {
  return `${group}:${key}`;
}

/**
 * 从缓存获取设置值
 */
function getFromCache(key: string, group: string): string | undefined {
  const cacheKey = getCacheKey(key, group);
  const value = settingsCache[cacheKey];
  
  if (value !== undefined) {
    cacheStats.hits++;
  } else {
    cacheStats.misses++;
  }
  
  return value;
}

/**
 * 将设置值保存到缓存
 */
function saveToCache(key: string, group: string, value: string): void {
  const cacheKey = getCacheKey(key, group);
  settingsCache[cacheKey] = value;
}

/**
 * 从API获取设置值
 * @param key 设置键
 * @param group 设置组
 * @param defaultValue 默认值，当API请求失败或值不存在时返回
 * @param useCache 是否使用缓存
 * @returns 设置值或默认值
 */
export async function getSetting(
  key: string, 
  group: string, 
  defaultValue: string = "", 
  useCache: boolean = true
): Promise<string> {
  const cacheKey = getCacheKey(key, group);
  
  // 检查缓存
  if (useCache) {
    const cachedValue = getFromCache(key, group);
    if (cachedValue !== undefined) {
      return cachedValue;
    }
  }
  
  // 防抖：检查是否在短时间内重复请求同一个设置
  const now = Date.now();
  const lastRequestTime = lastRequestTimes[cacheKey] || 0;
  if (useCache && now - lastRequestTime < DEBOUNCE_INTERVAL) {
    cacheStats.debounced++;
    // 返回缓存或默认值
    return getFromCache(key, group) || defaultValue;
  }
  
  // 更新最后请求时间
  lastRequestTimes[cacheKey] = now;

  // 检查是否有相同的请求正在进行中
  if (useCache && pendingRequests[cacheKey] !== undefined) {
    cacheStats.deduped++;
    return pendingRequests[cacheKey];
  }
  
  // 创建请求Promise并保存到进行中的请求
  const requestPromise = (async () => {
    try {
      // 从API获取设置
      const response = await getSettings(key, group);
      
      if (response.success && response.data?.value !== undefined) {
        const value = response.data.value;
        // 保存到缓存
        saveToCache(key, group, value);
        return value;
      }
      
      return defaultValue;
    } catch (error) {
      return defaultValue;
    } finally {
      // 请求完成后，删除进行中的请求记录
      delete pendingRequests[cacheKey];
    }
  })();
  
  // 保存到进行中的请求
  if (useCache) {
    pendingRequests[cacheKey] = requestPromise;
  }
  
  return requestPromise;
}

/**
 * 清除设置缓存
 * @param key 可选，指定要清除的设置键
 * @param group 可选，指定要清除的设置组
 */
export function clearSettingsCache(key?: string, group?: string): void {
  cacheStats.clears++;
  
  if (key && group) {
    // 清除特定设置
    delete settingsCache[getCacheKey(key, group)];
  } else {
    // 清除所有缓存
    Object.keys(settingsCache).forEach(k => delete settingsCache[k]);
  }
}

/**
 * 创建一个hooks版本的设置获取函数（可在后续扩展使用）
 */
// export function useSettings() {
//   // 在此处添加React hooks相关的实现
//   return {
//     getSetting,
//     clearCache: clearSettingsCache
//   };
// } 
