// 临时的i18n解决方案，直到安装next-intl
export const locales = ['en', 'zh', 'ar'] as const;
export type Locale = typeof locales[number];
export const defaultLocale: Locale = 'en';

// 导入语言包
import enMessages from '../messages/en.json';
import zhMessages from '../messages/zh.json';
import arMessages from '../messages/ar.json';

const messages = {
  en: enMessages,
  zh: zhMessages,
  ar: arMessages,
};

// 客户端存储locale的key
const LOCALE_STORAGE_KEY = 'preferred-locale';

// 获取当前locale
export function getCurrentLocale(): Locale {
  if (typeof window === 'undefined') return defaultLocale;
  
  const stored = localStorage.getItem(LOCALE_STORAGE_KEY);
  if (stored && locales.includes(stored as Locale)) {
    return stored as Locale;
  }
  
  const browserLang = navigator.language.split('-')[0] as Locale;
  if (locales.includes(browserLang)) {
    return browserLang;
  }
  
  return defaultLocale;
}

// 设置locale
export function setLocale(locale: Locale) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  window.dispatchEvent(new Event('localechange'));
}

// 获取嵌套对象的值
function getNestedValue(obj: any, path: string): string {
  return path.split('.').reduce((current, key) => current?.[key], obj) || path;
}

// 翻译函数
export function t(key: string, locale?: Locale): string {
  const currentLocale = locale || getCurrentLocale();
  const messageObj = messages[currentLocale];
  return getNestedValue(messageObj, key);
}

// React Hook for translations
import { useState, useEffect } from 'react';

export function useTranslation() {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);
  
  useEffect(() => {
    setLocaleState(getCurrentLocale());
    
    const handleLocaleChange = () => {
      setLocaleState(getCurrentLocale());
    };
    
    window.addEventListener('localechange', handleLocaleChange);
    return () => window.removeEventListener('localechange', handleLocaleChange);
  }, []);
  
  const translate = (key: string) => t(key, locale);
  
  return {
    t: translate,
    locale,
    setLocale: (newLocale: Locale) => {
      setLocale(newLocale);
      setLocaleState(newLocale);
    },
    locales,
  };
}

// 语言名称映射
export const languageNames = {
  en: 'English',
  zh: '中文',
  ar: 'العربية',
} as const; 
