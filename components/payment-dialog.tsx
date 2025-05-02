"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Check, CreditCard, Wallet } from "lucide-react"

interface PaymentDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function PaymentDialog({ open, onOpenChange }: PaymentDialogProps) {
  const [amount, setAmount] = useState("100")
  const [paymentMethod, setPaymentMethod] = useState("usdt")
  const [isProcessing, setIsProcessing] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  const handlePayment = () => {
    setIsProcessing(true)
    // 模拟支付处理
    setTimeout(() => {
      setIsProcessing(false)
      setIsComplete(true)
      // 重置状态并关闭对话框
      setTimeout(() => {
        setIsComplete(false)
        onOpenChange(false)
        setAmount("100")
      }, 2000)
    }, 1500)
  }

  const predefinedAmounts = ["50", "100", "300", "500", "1000"]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-islamic-cardBg text-white border-islamic-medium">
        <DialogHeader>
          <DialogTitle className="text-islamic-gold">增加捐赠</DialogTitle>
          <DialogDescription className="text-islamic-cream/70">
            请选择或输入您想要捐赠的金额，并选择支付方式。
          </DialogDescription>
        </DialogHeader>

        {!isProcessing && !isComplete ? (
          <>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-3 gap-2">
                {predefinedAmounts.map((presetAmount) => (
                  <Button
                    key={presetAmount}
                    type="button"
                    variant={amount === presetAmount ? "default" : "outline"}
                    className={
                      amount === presetAmount
                        ? "bg-islamic-gold text-islamic-dark hover:bg-islamic-gold/90"
                        : "border-islamic-medium/50 text-islamic-cream hover:bg-islamic-medium/30"
                    }
                    onClick={() => setAmount(presetAmount)}
                  >
                    {presetAmount} U
                  </Button>
                ))}
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="amount" className="text-right text-islamic-cream">
                  自定义金额
                </Label>
                <div className="col-span-3">
                  <Input
                    id="amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="bg-islamic-medium/50 border-islamic-medium/50 text-islamic-cream"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-islamic-cream">支付方式</Label>
                <RadioGroup
                  defaultValue="usdt"
                  value={paymentMethod}
                  onValueChange={setPaymentMethod}
                  className="flex flex-col space-y-1"
                >
                  <div className="flex items-center space-x-2 rounded-md border border-islamic-medium/50 p-3 bg-islamic-medium/30">
                    <RadioGroupItem value="usdt" id="usdt" className="border-islamic-gold text-islamic-gold" />
                    <Label htmlFor="usdt" className="flex-1 cursor-pointer">
                      <div className="flex items-center">
                        <Wallet className="mr-2 h-5 w-5 text-islamic-gold" />
                        <span>USDT</span>
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 rounded-md border border-islamic-medium/50 p-3 bg-islamic-medium/30">
                    <RadioGroupItem value="card" id="card" className="border-islamic-gold text-islamic-gold" />
                    <Label htmlFor="card" className="flex-1 cursor-pointer">
                      <div className="flex items-center">
                        <CreditCard className="mr-2 h-5 w-5 text-islamic-gold" />
                        <span>信用卡/借记卡</span>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                className="bg-islamic-gold text-islamic-dark hover:bg-islamic-gold/90"
                onClick={handlePayment}
              >
                确认支付
              </Button>
            </DialogFooter>
          </>
        ) : isProcessing ? (
          <div className="py-8 flex flex-col items-center justify-center">
            <div className="w-12 h-12 rounded-full border-4 border-islamic-gold/30 border-t-islamic-gold animate-spin mb-4"></div>
            <p className="text-islamic-cream">处理中，请稍候...</p>
          </div>
        ) : (
          <div className="py-8 flex flex-col items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
              <Check className="h-6 w-6 text-green-500" />
            </div>
            <p className="text-islamic-cream text-center">支付成功！</p>
            <p className="text-islamic-cream/70 text-center text-sm mt-1">
              感谢您的捐赠，您的善举将帮助更多需要帮助的人。
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
