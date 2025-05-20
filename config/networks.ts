'use client'

import { mainnet, sepolia, bsc, bscTestnet } from '@reown/appkit/networks'
import type { AppKitNetwork } from '@reown/appkit/networks'

// 网络配置映射
export interface NetworkConfig {
  id: number;
  name: string;
  key: string;
  explorerUrl: string;
  isSupported: boolean;
  testnet: boolean;
  reownNetwork: AppKitNetwork;
}

// 当前支持的所有网络配置
export const NETWORK_CONFIG: { [chainId: number]: NetworkConfig } = {
  // Ethereum 主网
  [mainnet.id]: {
    id: mainnet.id,
    name: "Ethereum Mainnet",
    key: "mainnet",
    explorerUrl: "https://etherscan.io",
    isSupported: true,
    testnet: false,
    reownNetwork: mainnet
  },
  // Sepolia 测试网
  [sepolia.id]: {
    id: sepolia.id,
    name: "Sepolia Testnet",
    key: "sepolia",
    explorerUrl: "https://sepolia.etherscan.io",
    isSupported: true,
    testnet: true,
    reownNetwork: sepolia
  },
  // BSC 主网
  [bsc.id]: {
    id: bsc.id,
    name: "BNB Smart Chain",
    key: "bsc",
    explorerUrl: "https://bscscan.com",
    isSupported: true,
    testnet: false,
    reownNetwork: bsc
  },
  // BSC 测试网
  [bscTestnet.id]: {
    id: bscTestnet.id,
    name: "BSC Testnet",
    key: "bscTestnet",
    explorerUrl: "https://testnet.bscscan.com",
    isSupported: true,
    testnet: true,
    reownNetwork: bscTestnet
  },
};

// 获取支持的网络配置
export function getNetworkConfig(chainId: number | undefined): NetworkConfig {
  if (!chainId) {
    return {
      id: 0,
      name: "Unknown Network",
      key: "unknown",
      explorerUrl: "",
      isSupported: false,
      testnet: false,
      reownNetwork: {} as AppKitNetwork
    };
  }
  
  return NETWORK_CONFIG[chainId] || {
    id: chainId,
    name: `Network (${chainId})`,
    key: `chain-${chainId}`,
    explorerUrl: "",
    isSupported: false,
    testnet: false,
    reownNetwork: {} as AppKitNetwork
  };
}

// 获取交易链接
export function getTransactionLink(networkConfig: NetworkConfig, txHash: string): string {
  if (!networkConfig.explorerUrl) return "";
  return `${networkConfig.explorerUrl}/tx/${txHash}`;
}

// 获取地址链接
export function getAddressLink(networkConfig: NetworkConfig, address: string): string {
  if (!networkConfig.explorerUrl) return "";
  return `${networkConfig.explorerUrl}/address/${address}`;
}

// 支持的网络列表 (用于钱包设置)
export const SUPPORTED_NETWORKS = Object.values(NETWORK_CONFIG)
  .filter(network => network.isSupported)
  .reduce((acc, network) => {
    acc[network.id] = network.key;
    return acc;
  }, {} as Record<number, string>);

// 用于界面显示的支持网络名称列表
export const SUPPORTED_NETWORK_NAMES = Object.values(NETWORK_CONFIG)
  .filter(network => network.isSupported)
  .map(network => network.name)
  .join(", ");

// 提供给 reown/wagmi 的网络配置数组
export const reownNetworks = (() => {
  const supportedNetworks = Object.values(NETWORK_CONFIG)
    .filter(network => network.isSupported)
    .map(network => network.reownNetwork);
  
  // 确保数组至少有一个元素
  if (supportedNetworks.length === 0) {
    return [mainnet] as [AppKitNetwork, ...AppKitNetwork[]];
  }
  
  return [supportedNetworks[0], ...supportedNetworks.slice(1)] as [AppKitNetwork, ...AppKitNetwork[]];
})(); 
