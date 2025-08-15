"use client";

/**
 * 环境配置
 */
export const ENV = {
  // 站点URL - 支持HTTPS开发环境
  SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || "https://localhost:3000",
  // API URL - 支持HTTPS开发环境
  API_URL: process.env.NEXT_PUBLIC_API_URL || "https://localhost:3000/api",
};

// Make sure to add actual environment variables in .env.local or in your hosting platform
