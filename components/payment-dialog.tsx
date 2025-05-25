"use client"

import { DialogFooter } from "@/components/ui/dialog"
import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Wallet, Info, LogOut, ExternalLink, CheckCircle, XCircle } from "lucide-react"
import { useVipInfo } from "@/store/use-vip-info"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/toast"
import { useWallet } from "@/hooks/use-wallet"
import { WalletConnectButton } from "@/components/wallet-connect-button"
import { useIsMounted } from "@/components/client-providers"
import { getSetting } from "@/lib/settings"
import { useWriteContract, useReadContract, useWaitForTransactionReceipt } from "wagmi"
import { 
  getNetworkConfig, 
  getTransactionLink, 
  getAddressLink, 
  SUPPORTED_NETWORK_NAMES
} from "@/config/networks"
import { parseUnits } from "viem"
import { donateAmount } from "@/lib/api"
import { useTranslation } from "@/lib/i18n"

// ERC20 代币 ABI
const erc20Abi = [
  {
    "inputs": [
      {"internalType": "address", "name": "recipient", "type": "address"},
      {"internalType": "uint256", "name": "amount", "type": "uint256"}
    ],
    "name": "transfer",
    "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "address", "name": "account", "type": "address"}
    ],
    "name": "balanceOf",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "decimals",
    "outputs": [{"internalType": "uint8", "name": "", "type": "uint8"}],
    "stateMutability": "view",
    "type": "function"
  }
] as const;

interface PaymentDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentVipLevel?: number
  nextLevelAmount?: number
}

export function PaymentDialog({ 
  open, 
  onOpenChange, 
  currentVipLevel = 1, 
  nextLevelAmount
}: PaymentDialogProps) {
  const [amount, setAmount] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [paymentStep, setPaymentStep] = useState<'initial' | 'donating' | 'transferring' | 'complete'>('initial')
  const [usdtAddress, setUsdtAddress] = useState<`0x${string}` | null>(null)
  const [targetAddress, setTargetAddress] = useState<`0x${string}` | null>(null)
  const [transactionHash, setTransactionHash] = useState<string | null>(null)
  const [isNetworkSupported, setIsNetworkSupported] = useState(false)
  const [decimals, setDecimals] = useState<number>(6) // 默认 USDT 精度
  const [isSubmitting, setIsSubmitting] = useState(false) // 防止重复提交
  const [donationId, setDonationId] = useState<string | null>(null) // 存储API返回的捐赠ID
  const isMounted = useIsMounted()
  const { getVipLevelDonationAmount } = useVipInfo()
  const { success, error, ToastContainer } = useToast()
  const { t } = useTranslation()

  // When not mounted, don't try to use wallet hooks
  if (!isMounted) {
    return null;
  }
  
  // Now safe to use wallet hooks
  const { isConnected, address, shortenedAddress, disconnectWallet, chainId } = useWallet()

  // 写入合约状态
  const { writeContract, isPending: isTransferPending, isError: isTransferError, error: transferError } = useWriteContract()
  
  // 读取代币小数位数
  const { data: decimalsData } = useReadContract({
    address: usdtAddress as `0x${string}`,
    abi: erc20Abi,
    functionName: 'decimals',
    query: {
      enabled: !!usdtAddress && isConnected && chainId !== undefined
    }
  })
  
  // 等待交易结果
  const { isSuccess: isTransactionSuccess, isError: isTransactionError } = useWaitForTransactionReceipt({
    hash: transactionHash as `0x${string}`,
    query: {
      enabled: !!transactionHash
    }
  })
  
  // 获取当前网络配置
  const networkConfig = getNetworkConfig(chainId);
  
  // 设置支持的网络状态
  useEffect(() => {
    setIsNetworkSupported(networkConfig.isSupported);
  }, [networkConfig]);
  
  // 获取 ERC20 小数位数
  useEffect(() => {
    if (decimalsData !== undefined) {
      setDecimals(Number(decimalsData));
    }
  }, [decimalsData]);
  
  // 当网络变化时获取合约地址
  useEffect(() => {
    const fetchContractAddresses = async () => {
      if (chainId && networkConfig.isSupported) {
        try {
          // 从设置获取合约和目标地址
          const settingResult = await getSetting(networkConfig.id.toString(), 'donate-payment', '', true);
          
          if (settingResult) {
            try {
              const parsed = JSON.parse(settingResult);
              setUsdtAddress(parsed.usdt as `0x${string}`);
              setTargetAddress(parsed.target as `0x${string}`);
            } catch (e) {
              console.error("Invalid contract addresses format:", e);
              error("Failed to parse contract addresses");
            }
          }
        } catch (e) {
          console.error("Failed to fetch contract addresses:", e);
          error("Failed to fetch contract addresses");
        }
      } else {
        // 重置地址
        setUsdtAddress(null);
        setTargetAddress(null);
      }
    };
    
    fetchContractAddresses();
  }, [chainId, networkConfig, error]);
  
  // 当弹窗打开或nextLevelAmount更改时更新金额
  useEffect(() => {
    if (open && nextLevelAmount !== undefined) {
      setAmount(nextLevelAmount.toString());
    }
  }, [open, nextLevelAmount]);
  
  // 当对话框关闭时重置状态
  useEffect(() => {
    if (!open) {
      // 重置对话框状态
      setIsProcessing(false);
      setIsComplete(false);
      setPaymentStep('initial');
      setTransactionHash(null);
      setIsSubmitting(false); // 重置提交状态
      setDonationId(null); // 重置捐赠ID
    }
  }, [open]);
  
  // 当交易成功时更新状态
  useEffect(() => {
    if (isTransactionSuccess && paymentStep === 'transferring') {
      setPaymentStep('complete');
      setIsComplete(true);
      success("Payment successful!");
      
      // 重置状态并关闭对话框
      setTimeout(() => {
        setIsComplete(false);
        setPaymentStep('initial');
        onOpenChange(false);
      }, 3000);
    }
  }, [isTransactionSuccess, paymentStep, success, onOpenChange]);
  
  // 处理交易错误
  useEffect(() => {
    if (isTransactionError && paymentStep === 'transferring') {
      setIsProcessing(false);
      setPaymentStep('initial');
      error("Transaction failed. Please try again.");
    }
  }, [isTransactionError, paymentStep, error]);

  // 获取下一级VIP的全额费用
  const nextLevel = currentVipLevel < 5 ? currentVipLevel + 1 : 5
  const suggestedAmount = nextLevelAmount || getVipLevelDonationAmount(nextLevel)

  // 验证输入是否为整数
  const validateInput = (value: string) => {
    const num = parseFloat(value)
    if (isNaN(num) || num <= 0) {
      error(t('payment.invalidAmount'));
      return false;
    }
    return true;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (validateInput(value)) {
      setAmount(value);
    }
  }

  const handleDisconnect = () => {
    disconnectWallet();
  }

  const handlePayment = async () => {
    if (!isConnected) {
      error(t('payment.connectWalletFirst'));
      return;
    }
    
    if (!isNetworkSupported) {
      error(t('payment.switchToSupportedNetwork'));
      return;
    }

    if (!amount || parseInt(amount) <= 0) {
      error(t('payment.invalidAmount'));
      return;
    }
    
    if (!usdtAddress || !targetAddress) {
      error(t('payment.contractAddressesNotAvailable'));
      return;
    }
    
    // 防止重复提交
    if (isSubmitting || isProcessing) {
      error(t('payment.paymentInProgress'));
      return;
    }

    // 设置状态防止重复点击
    setIsSubmitting(true);
    setIsProcessing(true);
    setPaymentStep('donating');
    
    try {
      if (!address) {
        throw new Error(t('payment.walletAddressNotAvailable'));
      }

      if (!chainId) {
        throw new Error(t('payment.chainIdNotAvailable'));
      }

      // 处理API部分
      try {
        // 检查是否已经有捐赠ID，避免重复调用API
        if (!donationId) {
          // 调用后端捐赠API
          const response = await donateAmount(
            chainId.toString(),
            amount,
            "USDT",
            address // 钱包地址作为备注
          );
          
          if (!response.success) {
            throw new Error(t('payment.donationApiCallFailed'));
          }
          
          // 使用响应中的任何唯一标识符作为捐赠ID
          // 这里使用时间戳作为简单的唯一标识符
          setDonationId(Date.now().toString());
        }
      } catch (apiError) {
        console.error("API call failed:", apiError);
        throw new Error(t('payment.donationApiCallFailed') + ": " + 
          (apiError instanceof Error ? apiError.message : "Unknown error"));
      }

      // 计算转账金额
      const transferAmount = parseUnits(amount, decimals);
      
      // 执行区块链转账
      try {
        await writeContract({
          address: usdtAddress,
          abi: erc20Abi,
          functionName: 'transfer',
          args: [targetAddress, transferAmount]
        }, {
          onSuccess: (hash: `0x${string}`) => {
            setTransactionHash(hash);
            setPaymentStep('transferring');
          },
          onError: (err: Error) => {
            // 检查是否为用户拒绝交易的错误
            const errorMessage = err.message.toLowerCase();
            if (
              errorMessage.includes("user rejected") || 
              errorMessage.includes("user denied") ||
              errorMessage.includes("user cancelled")
            ) {
              // 用户拒绝交易，提示并重置状态
              error(t('payment.transactionCancelledByUser'));
              setIsProcessing(false);
              setPaymentStep('initial');
              // 不抛出错误，因为这是用户主动取消，不是真正的错误
              return;
            }
            
            throw err; // 其他类型的错误，继续抛出以被外层catch捕获
          }
        });
      } catch (blockchainError) {
        console.error("Blockchain transaction failed:", blockchainError);
        
        // 检查是否为用户拒绝交易的错误
        const errorMessage = blockchainError instanceof Error 
          ? blockchainError.message.toLowerCase()
          : String(blockchainError).toLowerCase();
          
        if (
          errorMessage.includes("user rejected") || 
          errorMessage.includes("user denied") ||
          errorMessage.includes("user cancelled")
        ) {
          // 用户拒绝交易，直接抛出特定错误
          throw new Error(t('payment.transactionCancelledByUser'));
        } else {
          // 其他错误
          throw new Error(t('payment.blockchainTransactionFailed') + ": " + 
            (blockchainError instanceof Error ? blockchainError.message : "Unknown error"));
        }
      }
      
    } catch (err) {
      console.error("Payment flow error:", err);
      setIsProcessing(false);
      setIsSubmitting(false); // 重置提交状态
      setPaymentStep('initial');
      
      // 检查是否为用户取消交易的错误
      const errString = String(err).toLowerCase();
      if (
        errString.includes("user rejected") || 
        errString.includes("user denied") || 
        errString.includes("user cancelled") ||
        errString.includes("transaction cancelled")
      ) {
        error(t('payment.transactionCancelledByUser'));
      } else {
        error(t('payment.paymentFailed') + ": " + (err instanceof Error ? err.message : "Unknown error"));
      }
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-islamic-cardBg text-white border-islamic-medium">
        <DialogHeader>
          <DialogTitle className="text-islamic-gold">{t('payment.donate')}</DialogTitle>
          <DialogDescription className="text-islamic-cream/70">
            {t('payment.donateToUpgrade')}
          </DialogDescription>
        </DialogHeader>

        {!isProcessing && !isComplete ? (
          <>
            <div className="grid gap-4 py-4">
              <div className="p-6 rounded-lg bg-islamic-medium/50 border border-islamic-gold/30">
                <Label htmlFor="amount" className="text-islamic-cream/80 mb-2">{t('payment.donationAmount')}</Label>
                <div className="relative mt-1">
                  <Input
                    id="amount"
                    value={amount}
                    onChange={handleInputChange}
                    className="bg-islamic-dark border-islamic-gold/30 text-islamic-gold text-xl font-bold p-2 h-12"
                    placeholder={t('payment.enterAmount')}
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <span className="text-islamic-gold">U</span>
                  </div>
                </div>
                <p className="text-xs text-islamic-cream/60 mt-2">{t('payment.suggestedAmount').replace('{level}', nextLevel.toString()).replace('{amount}', suggestedAmount.toString())}</p>
              </div>

              {/* 钱包连接区域 */}
              <div className="flex flex-col space-y-3 rounded-md border border-islamic-medium/50 p-4 bg-islamic-medium/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Wallet className="mr-2 h-5 w-5 text-islamic-gold" />
                    <span className="text-islamic-cream">{t('payment.paymentWallet')}</span>
                  </div>
                  {!isConnected ? (
                    <WalletConnectButton className="bg-islamic-gold text-islamic-dark hover:bg-islamic-gold/90 text-xs py-1 px-3 h-8" />
                  ) : (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="border-red-400/30 text-red-400 hover:bg-red-400/10 text-xs py-1 px-3 h-8"
                      onClick={handleDisconnect}
                    >
                      <LogOut className="h-3.5 w-3.5 mr-1" />
                      {t('payment.disconnect')}
                    </Button>
                  )}
                </div>
                
                {isConnected && address && (
                  <div className="space-y-2">
                    {/* 钱包地址 */}
                    <div className="text-xs">
                      <p className="text-islamic-cream/70 mb-1">{t('payment.connectedWallet')}</p>
                      <div className="p-2 rounded bg-islamic-dark/50 text-islamic-cream break-all font-mono flex items-center justify-between">
                        <span>{shortenedAddress || address.substring(0, 10) + '...'}</span>
                        <a 
                          href={getAddressLink(networkConfig, address)}
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-islamic-gold hover:text-islamic-gold/80"
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      </div>
                    </div>
                    
                    {/* 网络信息 */}
                    {chainId !== undefined && (
                      <div className="text-xs">
                        <p className="text-islamic-cream/70 mb-1">{t('payment.network')}</p>
                        <div className="flex items-center">
                          <div className="p-2 rounded bg-islamic-dark/50 text-islamic-cream">
                            <div className="flex items-center">
                              <div className={`h-2.5 w-2.5 rounded-full mr-2 ${isNetworkSupported ? 'bg-green-500' : 'bg-red-500'}`}></div>
                              <span>{networkConfig.name}</span>
                              {!isNetworkSupported && (
                                <XCircle className="text-red-500 h-4 w-4 ml-2" />
                              )}
                              {isNetworkSupported && (
                                <CheckCircle className="text-green-500 h-4 w-4 ml-2" />
                              )}
                            </div>
                          </div>
                        </div>
                        {!isNetworkSupported && (
                          <p className="text-red-400 text-xs mt-1">
                            {t('payment.switchToSupported').replace('{networks}', SUPPORTED_NETWORK_NAMES)}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* 添加支付说明 */}
              <div className="flex items-start space-x-2 rounded-md border border-islamic-gold/20 p-3 bg-islamic-gold/10">
                <Info className="h-5 w-5 text-islamic-gold mt-0.5 flex-shrink-0" />
                <div className="text-xs text-islamic-cream/90">
                  <p className="font-medium text-islamic-gold mb-1">{t('payment.paymentInformation')}</p>
                  <p>
                    {t('payment.fullAmountRequired')}
                  </p>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                className="bg-islamic-gold text-islamic-dark hover:bg-islamic-gold/90 w-full"
                onClick={handlePayment}
                disabled={!isConnected || !isNetworkSupported || isSubmitting}
              >
                {!isConnected ? t('payment.connectWallet') : 
                 !isNetworkSupported ? t('payment.switchNetwork') : 
                 isSubmitting ? t('payment.processing') :
                 t('payment.donateNowButton')}
              </Button>
            </DialogFooter>
          </>
        ) : isProcessing ? (
          <div className="py-8 flex flex-col items-center justify-center">
            <div className="w-12 h-12 rounded-full border-4 border-islamic-gold/30 border-t-islamic-gold animate-spin mb-4"></div>
            <p className="text-islamic-cream">
              {paymentStep === 'donating' ? t('payment.processingDonation') : 
               paymentStep === 'transferring' ? t('payment.waitingConfirmation') : 
               t('payment.processingPlease')}
            </p>
            {paymentStep === 'transferring' && transactionHash && (
              <div className="mt-4 text-center">
                <p className="text-xs text-islamic-cream/70 mb-1">{t('payment.transactionHash')}</p>
                <a 
                  href={getTransactionLink(networkConfig, transactionHash)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-islamic-gold hover:underline break-all"
                >
                  {transactionHash}
                </a>
              </div>
            )}
            
            {/* 添加取消按钮 */}
                          <Button
                variant="outline"
                size="sm"
                className="mt-4 text-islamic-cream/70 border-islamic-cream/20 hover:bg-islamic-medium"
                onClick={() => {
                  // 设置状态回到初始状态
                  setIsProcessing(false);
                  setIsSubmitting(false); // 重置提交状态，允许重新提交
                  setPaymentStep('initial');
                  
                  // 如果处于区块链交易等待中，提示用户交易仍在进行
                  if (paymentStep === 'transferring' && transactionHash) {
                    error(t('payment.dialogClosed'));
                  }
                }}
            >
              {t('payment.cancel')}
            </Button>
          </div>
        ) : (
          <div className="py-8 flex flex-col items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6 text-green-500"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <p className="text-islamic-cream text-center">{t('payment.paymentSuccessful')}</p>
            <p className="text-islamic-cream/70 text-center text-sm mt-1">
              {t('payment.thankYouMessage')}
            </p>
            {transactionHash && (
              <div className="mt-4 text-center">
                <p className="text-xs text-islamic-cream/70 mb-1">{t('payment.transactionHash')}</p>
                <a 
                  href={getTransactionLink(networkConfig, transactionHash)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-islamic-gold hover:underline break-all"
                >
                  {transactionHash}
                </a>
              </div>
            )}
          </div>
        )}
      </DialogContent>
      <ToastContainer />
    </Dialog>
  )
}
