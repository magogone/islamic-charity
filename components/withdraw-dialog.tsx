"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Wallet, Check, Copy, AlertCircle, Globe } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  NETWORK_CONFIG,
  NetworkConfig,
  SUPPORTED_NETWORK_NAMES,
} from "@/config/networks";
import { withdrawAmount } from "@/lib/api";
import { useToast } from "@/components/ui/toast";
import { isAddress } from "viem";

interface WithdrawDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  availableAmount: number;
}

export function WithdrawDialog({
  open,
  onOpenChange,
  availableAmount,
}: WithdrawDialogProps) {
  const [amount, setAmount] = useState<number>(availableAmount);
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [selectedNetwork, setSelectedNetwork] = useState<string>("");
  const [supportedNetworks, setSupportedNetworks] = useState<NetworkConfig[]>(
    []
  );
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [transactionId, setTransactionId] = useState<string>(""); // actual transaction ID from API
  const { success, error: showError, ToastContainer } = useToast();

  // 验证以太坊地址格式
  const isValidEthereumAddress = (address: string): boolean => {
    return isAddress(address);
  };

  // Load supported networks on component mount
  useEffect(() => {
    const networks = Object.values(NETWORK_CONFIG).filter(
      (network) => network.isSupported
    );
    setSupportedNetworks(networks);

    // Default to the first supported network if available
    if (networks.length > 0 && !selectedNetwork) {
      setSelectedNetwork(networks[0].key);
    }
  }, [selectedNetwork]);

  const handleWithdraw = async () => {
    // Validate inputs
    if (!walletAddress) {
      setError("Please enter a valid wallet address");
      return;
    }

    // 验证以太坊地址格式
    if (!isValidEthereumAddress(walletAddress)) {
      setError(
        "Please enter a valid Ethereum address (must start with 0x and be 42 characters long)"
      );
      return;
    }

    if (amount <= 0 || amount > availableAmount) {
      setError(`Please enter an amount between 1 and ${availableAmount}`);
      return;
    }

    if (!selectedNetwork) {
      setError("Please select a blockchain network");
      return;
    }

    // Find the selected network config to get the chain ID
    const selectedNetworkConfig = supportedNetworks.find(
      (network) => network.key === selectedNetwork
    );
    if (!selectedNetworkConfig) {
      setError("Invalid network selected");
      return;
    }

    // Clear any previous errors
    setError(null);

    // Start processing
    setIsProcessing(true);

    try {
      // Call the withdraw API with chain ID
      const response = await withdrawAmount(
        selectedNetworkConfig.id.toString(),
        amount.toString(),
        walletAddress
      );

      if (!response.success) {
        throw new Error(response.error?.message || "Withdrawal failed");
      }

      // Set the transaction ID from the response
      if (response.data?.transaction_id) {
        setTransactionId(response.data.transaction_id);
      } else {
        // Use a placeholder if not provided
        setTransactionId("Transaction pending...");
      }

      setIsProcessing(false);
      setIsComplete(true);
      success("Withdrawal request submitted successfully");

      // Reset dialog after showing success
      setTimeout(() => {
        setIsComplete(false);
        setAmount(availableAmount);
        setWalletAddress("");
        setSelectedNetwork("");
        onOpenChange(false);
      }, 5000);
    } catch (err) {
      setIsProcessing(false);
      if (err instanceof Error) {
        setError(err.message);
        showError(err.message);
      } else {
        setError("An unexpected error occurred");
        showError("An unexpected error occurred");
      }
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(transactionId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] max-h-[85vh] h-auto bg-islamic-cardBg text-white border-islamic-medium p-0 flex flex-col">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-islamic-gold to-islamic-gold/50"></div>

        {/* 头部区域 */}
        <div className="flex-shrink-0 p-6 pb-0">
          <DialogHeader>
            <DialogTitle className="text-islamic-gold flex items-center">
              <Wallet className="mr-2 h-5 w-5" />
              Withdraw Funds
            </DialogTitle>
            <DialogDescription className="text-islamic-cream/70">
              Withdraw your available funds to your wallet
            </DialogDescription>
          </DialogHeader>
        </div>

        {!isProcessing && !isComplete ? (
          <>
            {/* 可滚动内容区域，包含表单和按钮 */}
            <div className="flex-1 overflow-y-auto px-6 py-4 min-h-0">
              <div className="grid gap-4">
                <div className="p-4 rounded-lg bg-islamic-medium/50 border border-islamic-gold/30 text-center mb-4">
                  <p className="text-islamic-cream/80 mb-2">
                    Available Balance
                  </p>
                  <p className="text-3xl font-bold text-islamic-gold">
                    {availableAmount} <span className="text-xs">USD</span>
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="amount" className="text-islamic-cream">
                    Withdrawal Amount
                  </Label>
                  <Input
                    id="amount"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    max={availableAmount}
                    min={1}
                    className="bg-islamic-medium/30 border-islamic-medium text-islamic-cream"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="network" className="text-islamic-cream">
                    Blockchain Network
                  </Label>
                  <Select
                    value={selectedNetwork}
                    onValueChange={setSelectedNetwork}
                  >
                    <SelectTrigger
                      id="network"
                      className="bg-islamic-medium/30 border-islamic-medium text-islamic-cream"
                    >
                      <SelectValue placeholder="Select network" />
                    </SelectTrigger>
                    <SelectContent className="bg-islamic-dark border-islamic-medium text-islamic-cream">
                      {supportedNetworks.map((network) => (
                        <SelectItem
                          key={network.key}
                          value={network.key}
                          className="text-islamic-cream hover:text-islamic-gold hover:bg-islamic-medium/50"
                        >
                          <div className="flex items-center">
                            {network.name} {network.testnet && "(Testnet)"}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-islamic-cream/60 mt-1">
                    Make sure your wallet is on the same network
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="wallet" className="text-islamic-cream">
                    USD Wallet Address
                  </Label>
                  <Input
                    id="wallet"
                    value={walletAddress}
                    onChange={(e) => setWalletAddress(e.target.value)}
                    placeholder="Enter your wallet address (0x...)"
                    className={`bg-islamic-medium/30 border-islamic-medium text-islamic-cream ${
                      walletAddress && !isValidEthereumAddress(walletAddress)
                        ? "border-red-500 focus:border-red-500"
                        : walletAddress && isValidEthereumAddress(walletAddress)
                        ? "border-green-500 focus:border-green-500"
                        : ""
                    }`}
                  />
                  {walletAddress && (
                    <p
                      className={`text-xs mt-1 ${
                        isValidEthereumAddress(walletAddress)
                          ? "text-green-400"
                          : "text-red-400"
                      }`}
                    >
                      {isValidEthereumAddress(walletAddress)
                        ? "✓ Valid Ethereum address"
                        : "✗ Invalid address format (must start with 0x and be 42 characters long)"}
                    </p>
                  )}
                </div>

                <div className="flex items-start space-x-2 rounded-md border border-islamic-gold/20 p-3 bg-islamic-gold/10">
                  <Globe className="h-5 w-5 text-islamic-gold mt-0.5 flex-shrink-0" />
                  <div className="text-xs text-islamic-cream/90">
                    <p className="font-medium text-islamic-gold mb-1">
                      Network Information
                    </p>
                    <p>
                      Supported networks: {SUPPORTED_NETWORK_NAMES}. Make sure
                      your wallet address is on the selected network.
                    </p>
                  </div>
                </div>

                {error && (
                  <div className="flex items-center p-3 rounded-md bg-red-500/20 border border-red-500/30 text-red-200">
                    <AlertCircle className="h-4 w-4 mr-2" />
                    <p className="text-sm">{error}</p>
                  </div>
                )}

                {/* 提现按钮放在表单内容的底部 */}
                <div className="mt-8 pt-4 border-t border-islamic-medium/30">
                  <Button
                    type="button"
                    className="bg-islamic-gold text-islamic-dark hover:bg-islamic-gold/90 w-full h-12 text-base font-medium"
                    onClick={handleWithdraw}
                  >
                    Withdraw Now
                  </Button>
                </div>
              </div>
            </div>
          </>
        ) : isProcessing ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6">
            <div className="w-12 h-12 rounded-full border-4 border-islamic-gold/30 border-t-islamic-gold animate-spin mb-4"></div>
            <p className="text-islamic-cream">
              Processing withdrawal, please wait...
            </p>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-6">
            <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
              <Check className="h-6 w-6 text-green-500" />
            </div>
            <p className="text-islamic-cream text-center font-medium">
              Withdrawal Successful!
            </p>
            <p className="text-islamic-cream/70 text-center text-sm mt-1 mb-4">
              {amount} USD has been sent to your wallet on{" "}
              {supportedNetworks.find((n) => n.key === selectedNetwork)?.name ||
                selectedNetwork}
            </p>

            <div className="w-full p-3 bg-islamic-medium/30 rounded-md flex items-center justify-between mb-2">
              <div className="overflow-hidden">
                <p className="text-xs text-islamic-cream/70 mb-1">
                  Transaction ID
                </p>
                <p className="text-sm text-islamic-cream truncate">
                  {transactionId}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-islamic-gold hover:text-islamic-gold/80"
                onClick={copyToClipboard}
              >
                {copied ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>

            <p className="text-xs text-islamic-cream/50 text-center mt-2">
              The transaction may take 10-30 minutes to be confirmed on the
              blockchain
            </p>
          </div>
        )}
      </DialogContent>
      <ToastContainer />
    </Dialog>
  );
}
