"use client"

import { useState } from "react"
import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FallbackImage } from "./fallback-image"
import { PaymentDialog } from "./payment-dialog"

interface HeroSectionProps {
  title?: string
  description?: string
  buttonText?: string
  onButtonClick?: () => void
}

export function HeroSection({
  title = "Barkat Alliance Foundation",
  description = "Innovative Charity Model: Divine Mission",
  buttonText = "Donate Now",
  onButtonClick,
}: HeroSectionProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [paymentOpen, setPaymentOpen] = useState(false)

  const primaryImage = "/grand-mosque.png" // Change back to mosque image
  const fallbackImage =
    "https://images.pexels.com/photos/1537086/pexels-photo-1537086.jpeg?auto=compress&cs=tinysrgb&w=1200" // Mosque backup image

  const handleDonateClick = () => {
    setPaymentOpen(true)
    if (onButtonClick) onButtonClick()
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
            onLoadingComplete={() => setIsLoading(false)}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-islamic-dark/40 via-islamic-dark/30 to-islamic-dark/70"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 pt-6 text-center max-w-lg mx-auto w-full">
        <h1 className="mb-4 text-4xl font-serif font-light tracking-wide text-white">{title}</h1>

        <p className="max-w-md mb-6 text-base text-islamic-cream/90">{description}</p>

        <Button
          className="px-6 py-5 text-base bg-islamic-gold hover:bg-islamic-gold/90 text-islamic-dark"
          onClick={handleDonateClick}
        >
          {buttonText}
          <Heart className="w-4 h-4 ml-2" />
        </Button>
      </div>

      <PaymentDialog open={paymentOpen} onOpenChange={setPaymentOpen} nextLevelAmount={200} />
    </div>
  )
}
