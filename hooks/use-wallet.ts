"use client";

import { useAccount, useDisconnect, useBalance, useChainId } from "wagmi";
import { modal } from "@/context";
import { useState, useEffect } from "react";
import { useIsMounted } from "@/components/client-providers";
import { ENV } from "@/lib/env-config";

// Type for wallet state
export type WalletState = {
  address: string | undefined;
  shortenedAddress: string;
  isConnected: boolean;
  status: "connected" | "reconnecting" | "connecting" | "disconnected";
  chainId: number | undefined;
  balance: any | undefined;
  connectWallet: () => void;
  disconnectWallet: () => void;
};

// Default wallet state
const defaultWalletState: WalletState = {
  address: undefined,
  shortenedAddress: "",
  isConnected: false,
  status: "disconnected",
  chainId: undefined,
  balance: undefined,
  connectWallet: () => {},
  disconnectWallet: () => {},
};

// Actual implementation of the wallet hook (client-side only)
function useWalletClient(): WalletState {
  const [shortenedAddress, setShortenedAddress] = useState<string>("");

  // Safe to call wagmi hooks here
  const account = useAccount();
  const { disconnect } = useDisconnect();
  const chainId = useChainId();

  // Get balance only if address is available
  const balanceResult = useBalance({
    address: account.address,
  });

  // 监听用户注销事件，断开钱包连接
  useEffect(() => {
    const handleUserLogout = () => {
      if (account.isConnected) {
        disconnect();
      }
    };

    // 添加事件监听
    window.addEventListener("user-logout", handleUserLogout);

    // 清理事件监听
    return () => {
      window.removeEventListener("user-logout", handleUserLogout);
    };
  }, [account.isConnected, disconnect]);

  // Format wallet address
  useEffect(() => {
    if (account.address) {
      const start = account.address.substring(0, 6);
      const end = account.address.substring(account.address.length - 4);
      setShortenedAddress(`${start}...${end}`);
    } else {
      setShortenedAddress("");
    }
  }, [account.address]);

  // Connect wallet function
  const connectWallet = () => {
    // 检查是否在开发环境HTTPS模式
    const isDevelopment = process.env.NODE_ENV === "development";
    const isHttps = ENV.SITE_URL.startsWith("https://");

    if (isDevelopment && isHttps) {
      alert(
        "🔧 开发环境HTTPS模式：钱包连接已禁用，避免CORS错误。\n请使用生产环境或配置CORS。"
      );
      return;
    }

    modal?.open();
  };

  // Disconnect wallet function
  const disconnectWallet = () => {
    disconnect();
  };

  return {
    address: account.address,
    shortenedAddress,
    isConnected: account.isConnected,
    status: account.status,
    chainId,
    balance: balanceResult.data,
    connectWallet,
    disconnectWallet,
  };
}

// Public hook that's safe to use anywhere - wraps the client hook with SSR safety
export function useWallet(): WalletState {
  const isMounted = useIsMounted();

  // Return default state during SSR
  if (!isMounted) {
    return defaultWalletState;
  }

  // Use the actual implementation on the client
  return useWalletClient();
}
