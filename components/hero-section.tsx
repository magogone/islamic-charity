"use client"

import { useState } from "react"
import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FallbackImage } from "./fallback-image"
import { PaymentDialog } from "./payment-dialog"
import { useAuth } from "@/store/use-auth"
import { useAuthContext } from "@/store/auth-context"
import { useTranslation } from "@/lib/i18n"

interface HeroSectionProps {
  title?: string
  description?: string
  buttonText?: string
  onButtonClick?: () => void
}

export function HeroSection({
  title,
  description,
  buttonText,
  onButtonClick,
}: HeroSectionProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [paymentOpen, setPaymentOpen] = useState(false)
  const { isAuthenticated } = useAuth()
  const { openLoginModal } = useAuthContext()
  const { t } = useTranslation()

  // 使用翻译作为默认值
  const displayTitle = title || t('hero.title')
  const displayDescription = description || t('hero.description')
  const displayButtonText = buttonText || t('hero.donateButton')

  // 使用可靠的备用图片，避免404错误
  const primaryImage = "https://images.pexels.com/photos/6508083/pexels-photo-6508083.jpeg?auto=compress&cs=tinysrgb&w=1200"
  const fallbackImage = "https://images.pexels.com/photos/1537086/pexels-photo-1537086.jpeg?auto=compress&cs=tinysrgb&w=1200"

  const handleDonateClick = () => {
    if (isAuthenticated) {
      // 如果用户已登录，直接跳转到捐赠页面，不打开本地弹窗
      if (onButtonClick) onButtonClick();
    } else {
      // 如果用户未登录，打开登录对话框，并传递目标路径
      openLoginModal("/donation");
    }
  }

  return (
    <div className="relative w-screen h-[50vh] overflow-hidden -mt-6 left-[50%] right-[50%] -ml-[50vw] -mr-[50vw] mx-auto">
      {/* Loading indicator */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-islamic-dark/50">
          <div className="w-12 h-12 border-4 border-islamic-gold/30 border-t-islamic-gold rounded-full animate-spin"></div>
        </div>
      )}

      {/* Background image */}
      <div className="absolute inset-0">
        <div className="relative w-full h-full">
          <FallbackImage
            src={primaryImage}
            fallbackSrc={fallbackImage}
            alt="Mosque"
            fill
            className="object-cover object-center"
            priority
            onLoad={() => setIsLoading(false)}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-islamic-dark/40 via-islamic-dark/30 to-islamic-dark/70"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 pt-6 text-center max-w-lg mx-auto w-full">
        <h1 className="mb-4 text-4xl font-serif font-light tracking-wide text-white">{displayTitle}</h1>

        <p className="max-w-md mb-6 text-base text-islamic-cream/90">{displayDescription}</p>

        <Button
          className="px-6 py-5 text-base bg-islamic-gold hover:bg-islamic-gold/90 text-islamic-dark"
          onClick={handleDonateClick}
        >
          {displayButtonText}
          <Heart className="w-4 h-4 ml-2" />
        </Button>
      </div>

      <PaymentDialog open={paymentOpen} onOpenChange={setPaymentOpen} />
    </div>
  )
}
