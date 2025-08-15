"use client";

import { wagmiAdapter, projectId, networks } from "@/config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createAppKit } from "@reown/appkit/react";
import React, { type ReactNode } from "react";
import { cookieToInitialState, WagmiProvider, type Config } from "wagmi";
import { ENV } from "@/lib/env-config";

// Set up queryClient
const queryClient = new QueryClient();

// Set up metadata
const metadata = {
  name: "islamic-charity",
  description: "next-reown-appkit",
  url: ENV.SITE_URL, // origin must match your domain & subdomain
  icons: ["https://avatars.githubusercontent.com/u/179229932"],
};

// Create the modal - 只在生产环境或有正确CORS配置时初始化
export const modal = (() => {
  // 检查是否在开发环境且使用HTTPS
  const isDevelopment = process.env.NODE_ENV === "development";
  const isHttps = ENV.SITE_URL.startsWith("https://");

  // 如果是开发环境的HTTPS，跳过WalletConnect初始化以避免CORS错误
  if (isDevelopment && isHttps) {
    console.warn("🔧 开发环境HTTPS模式：跳过WalletConnect初始化，避免CORS错误");
    return null;
  }

  return createAppKit({
    adapters: [wagmiAdapter],
    projectId,
    networks,
    metadata,
    themeMode: "light",
    features: {
      analytics: true, // Optional - defaults to your Cloud configuration
    },
    themeVariables: {
      "--w3m-accent": "#000000",
    },
  });
})();

function ContextProvider({
  children,
  cookies,
}: {
  children: ReactNode;
  cookies: string | null;
}) {
  const initialState = cookieToInitialState(
    wagmiAdapter.wagmiConfig as Config,
    cookies
  );

  return (
    <WagmiProvider
      config={wagmiAdapter.wagmiConfig as Config}
      initialState={initialState}
    >
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}

export default ContextProvider;
