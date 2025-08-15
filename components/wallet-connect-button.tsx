"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";
import { modal } from "@/context";
import { useAccount, useDisconnect } from "wagmi";
import { useIsMounted } from "@/components/client-providers";
import { ENV } from "@/lib/env-config";

export function WalletConnectButton({
  className = "",
}: {
  className?: string;
}) {
  const isMounted = useIsMounted();
  const [shortenedAddress, setShortenedAddress] = useState<string>("");

  // If not mounted yet, return a disabled button
  if (!isMounted) {
    return (
      <Button
        disabled
        className={`flex items-center ${className}`}
        variant="outline"
      >
        <Wallet className="mr-2 h-4 w-4" />
        Connect Wallet
      </Button>
    );
  }

  // Safe to call hooks now
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  // Format wallet address
  useEffect(() => {
    if (address) {
      const start = address.substring(0, 6);
      const end = address.substring(address.length - 4);
      setShortenedAddress(`${start}...${end}`);
    } else {
      setShortenedAddress("");
    }
  }, [address]);

  const handleClick = () => {
    // 检查是否在开发环境HTTPS模式
    const isDevelopment = process.env.NODE_ENV === "development";
    const isHttps = ENV.SITE_URL.startsWith("https://");

    if (isDevelopment && isHttps) {
      alert(
        "🔧 开发环境HTTPS模式：钱包连接已禁用，避免CORS错误。\n请使用生产环境或配置CORS。"
      );
      return;
    }

    if (isConnected && address) {
      disconnect();
    } else {
      // Open the reown modal
      modal?.open();
    }
  };

  return (
    <Button
      onClick={handleClick}
      className={`flex items-center ${className}`}
      variant="outline"
    >
      <Wallet className="mr-2 h-4 w-4" />
      {isConnected ? shortenedAddress : "Connect Wallet"}
    </Button>
  );
}
