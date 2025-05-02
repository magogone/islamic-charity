"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Wallet, Check, Copy, AlertCircle } from "lucide-react"

interface WithdrawDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  availableAmount: number
}

export function WithdrawDialog({ open, onOpenChange, availableAmount }: WithdrawDialogProps) {
  const [amount, setAmount] = useState<number>(availableAmount)
  const [walletAddress, setWalletAddress] = useState<string>("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  // Example transaction ID
  const transactionId = "0x3a8d7f6e9b2c1d5e8f7a6b5c4d3e2f1a0b9c8d7e"

  const handleWithdraw = () => {
    // Validate inputs
    if (!walletAddress) {
      setError("Please enter a valid wallet address")
      return
    }

    if (amount <= 0 || amount > availableAmount) {
      setError(`Please enter an amount between 1 and ${availableAmount}`)
      return
    }

    // Clear any previous errors
    setError(null)

    // Start processing
    setIsProcessing(true)

    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false)
      setIsComplete(true)

      // Reset dialog after showing success
      setTimeout(() => {
        setIsComplete(false)
        setAmount(availableAmount)
        setWalletAddress("")
        onOpenChange(false)
      }, 5000)
    }, 2000)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(transactionId)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-islamic-cardBg text-white border-islamic-medium">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-islamic-gold to-islamic-gold/50"></div>
        <DialogHeader>
          <DialogTitle className="text-islamic-gold flex items-center">
            <Wallet className="mr-2 h-5 w-5" />
            Withdraw Funds
          </DialogTitle>
          <DialogDescription className="text-islamic-cream/70">
            Withdraw your available funds to your wallet
          </DialogDescription>
        </DialogHeader>

        {!isProcessing && !isComplete ? (
          <>
            <div className="grid gap-4 py-4">
              <div className="p-4 rounded-lg bg-islamic-medium/50 border border-islamic-gold/30 text-center mb-4">
                <p className="text-islamic-cream/80 mb-2">Available Balance</p>
                <p className="text-3xl font-bold text-islamic-gold">{availableAmount} USDT</p>
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
                <Label htmlFor="wallet" className="text-islamic-cream">
                  USDT Wallet Address (TRC20)
                </Label>
                <Input
                  id="wallet"
                  value={walletAddress}
                  onChange={(e) => setWalletAddress(e.target.value)}
                  placeholder="Enter your TRC20 wallet address"
                  className="bg-islamic-medium/30 border-islamic-medium text-islamic-cream"
                />
              </div>

              {error && (
                <div className="flex items-center p-3 rounded-md bg-red-500/20 border border-red-500/30 text-red-200">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  <p className="text-sm">{error}</p>
                </div>
              )}
            </div>

            <DialogFooter>
              <Button
                type="button"
                className="bg-islamic-gold text-islamic-dark hover:bg-islamic-gold/90 w-full"
                onClick={handleWithdraw}
              >
                Withdraw Now
              </Button>
            </DialogFooter>
          </>
        ) : isProcessing ? (
          <div className="py-8 flex flex-col items-center justify-center">
            <div className="w-12 h-12 rounded-full border-4 border-islamic-gold/30 border-t-islamic-gold animate-spin mb-4"></div>
            <p className="text-islamic-cream">Processing withdrawal, please wait...</p>
          </div>
        ) : (
          <div className="py-6 flex flex-col items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
              <Check className="h-6 w-6 text-green-500" />
            </div>
            <p className="text-islamic-cream text-center font-medium">Withdrawal Successful!</p>
            <p className="text-islamic-cream/70 text-center text-sm mt-1 mb-4">
              {amount} USDT has been sent to your wallet
            </p>

            <div className="w-full p-3 bg-islamic-medium/30 rounded-md flex items-center justify-between mb-2">
              <div className="overflow-hidden">
                <p className="text-xs text-islamic-cream/70 mb-1">Transaction ID</p>
                <p className="text-sm text-islamic-cream truncate">{transactionId}</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-islamic-gold hover:text-islamic-gold/80"
                onClick={copyToClipboard}
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>

            <p className="text-xs text-islamic-cream/50 text-center mt-2">
              The transaction may take 10-30 minutes to be confirmed on the blockchain
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
