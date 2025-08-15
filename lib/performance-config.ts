/**
 * 性能优化配置
 */

export const PERFORMANCE_CONFIG = {
  // 弹窗动画持续时间
  MODAL_ANIMATION_DURATION: 150,

  // 路由跳转延迟（避免阻塞UI）
  NAVIGATION_DELAY: 0,

  // 预加载配置
  PRELOAD: {
    DONATION_PAGE: true,
    PAYMENT_DIALOG: true,
  },

  // 防抖配置
  DEBOUNCE: {
    BUTTON_CLICK: 300,
    INPUT_CHANGE: 150,
  },

  // 组件懒加载配置
  LAZY_LOAD: {
    THRESHOLD: 0.1,
    ROOT_MARGIN: "50px",
  },
} as const;

/**
 * 性能优化的防抖函数
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return (...args: Parameters<T>) => {
    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
      func.apply(null, args);
    }, wait);
  };
}

/**
 * 使用 requestAnimationFrame 优化的延迟执行
 */
export function rafDelay(callback: () => void, frames: number = 1): void {
  if (frames <= 0) {
    callback();
    return;
  }

  requestAnimationFrame(() => rafDelay(callback, frames - 1));
}

/**
 * 预加载资源
 */
export function preloadResource(href: string, as: string = "fetch"): void {
  if (typeof window === "undefined") return;

  const link = document.createElement("link");
  link.rel = "preload";
  link.as = as;
  link.href = href;

  document.head.appendChild(link);
}

/**
 * 预取资源（低优先级）
 */
export function prefetchResource(href: string): void {
  if (typeof window === "undefined") return;

  const link = document.createElement("link");
  link.rel = "prefetch";
  link.href = href;

  document.head.appendChild(link);
}
