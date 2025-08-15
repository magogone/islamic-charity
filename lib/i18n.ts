// 临时的i18n解决方案，直到安装next-intl
export const locales = ["en", "zh", "ar", "ur"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

// 导入语言包
import enMessages from "../messages/en.json";
import zhMessages from "../messages/zh.json";
import arMessages from "../messages/ar.json";
import urMessages from "../messages/ur.json";

const messages = {
  en: enMessages,
  zh: zhMessages,
  ar: arMessages,
  ur: urMessages,
};

// 语言名称映射
export const languageNames = {
  en: "English",
  zh: "中文",
  ar: "العربية",
  ur: "اردو",
} as const;

// 语言方向映射
export const languageDirections = {
  en: "ltr",
  zh: "ltr",
  ar: "rtl",
  ur: "rtl",
} as const;

export type Direction = (typeof languageDirections)[Locale];

// 获取当前语言方向
export function getCurrentDirection(locale?: Locale): "ltr" | "rtl" {
  const currentLocale = locale || getCurrentLocale();
  return languageDirections[currentLocale];
}

// 客户端存储locale的key
const LOCALE_STORAGE_KEY = "preferred-locale";

// 获取当前locale
export function getCurrentLocale(): Locale {
  if (typeof window === "undefined") return defaultLocale;

  const stored = localStorage.getItem(LOCALE_STORAGE_KEY);
  if (stored && locales.includes(stored as Locale)) {
    return stored as Locale;
  }

  const browserLang = navigator.language.split("-")[0] as Locale;
  if (locales.includes(browserLang)) {
    return browserLang;
  }

  return defaultLocale;
}

// 设置locale
export function setLocale(locale: Locale) {
  if (typeof window === "undefined") return;
  localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  window.dispatchEvent(new Event("localechange"));
}

// 获取嵌套对象的值
function getNestedValue(obj: any, path: string): string {
  return path.split(".").reduce((current, key) => current?.[key], obj) || path;
}

// 翻译函数
export function t(key: string, locale?: Locale): string {
  const currentLocale = locale || getCurrentLocale();
  const messageObj = messages[currentLocale];
  return getNestedValue(messageObj, key);
}

// React Hook for translations
import { useState, useEffect } from "react";

export function useTranslation() {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // 客户端初始化时获取正确的语言设置
    const currentLocale = getCurrentLocale();
    setLocaleState(currentLocale);
    setIsInitialized(true);

    const handleLocaleChange = () => {
      setLocaleState(getCurrentLocale());
    };

    window.addEventListener("localechange", handleLocaleChange);
    return () => window.removeEventListener("localechange", handleLocaleChange);
  }, []);

  const translate = (key: string) => t(key, locale);

  return {
    t: translate,
    locale,
    isInitialized,
    setLocale: (newLocale: Locale) => {
      setLocale(newLocale);
      setLocaleState(newLocale);
    },
    locales,
    direction: getCurrentDirection(locale),
    isRTL: getCurrentDirection(locale) === "rtl",
  };
}
