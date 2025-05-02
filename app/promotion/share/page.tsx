"use client"

import { useState } from "react"
import Image from "next/image"
import { BackgroundWrapper } from "@/components/background-wrapper"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Copy, Check, QrCode, LinkIcon, Share } from "lucide-react"

export default function SharePage() {
  const [copied, setCopied] = useState(false)
  const [activeTab, setActiveTab] = useState("qrcode")

  const inviteLink = "https://islamicfund.app/invite/user123"

  const handleCopy = () => {
    navigator.clipboard.writeText(inviteLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "Invitation to Join Barkat Foundation",
        text: "Join Barkat Foundation, participate in Islamic charity, and receive poverty relief fund support!",
        url: inviteLink,
      })
    } else {
      // If native sharing is not supported, copy the link
      handleCopy()
    }
  }

  return (
    <BackgroundWrapper>
      {/* Page header */}
      <div className="px-6 py-4 border-b border-[#d4b96e]/30 bg-[#1a0d2c]/80 backdrop-blur-sm">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center">
            <button onClick={() => window.history.back()} className="mr-3 text-[#d4b96e]">
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
                className="lucide lucide-chevron-left"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>
            <h1 className="text-xl font-bold text-[#d4b96e]">Invite Friends</h1>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-lg mx-auto px-4 py-6">
        <Card className="overflow-hidden border-none shadow-xl bg-islamic-cardBg/90 backdrop-blur-lg text-white mb-6">
          <div className="p-6">
            <h2 className="text-xl font-bold text-center text-[#8dc63f] mb-4">Share Your Invitation Link</h2>
            <p className="text-center text-islamic-cream/80 mb-6">
              Invite friends to join Barkat Foundation, participate together in Islamic charity, and you'll receive
              generous referral rewards!
            </p>

            <Tabs defaultValue="qrcode" className="w-full" onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2 bg-islamic-medium/50">
                <TabsTrigger
                  value="qrcode"
                  className="data-[state=active]:bg-[#8dc63f] data-[state=active]:text-[#1a0d2c]"
                >
                  <QrCode className="w-4 h-4 mr-2" />
                  QR Code
                </TabsTrigger>
                <TabsTrigger
                  value="link"
                  className="data-[state=active]:bg-[#8dc63f] data-[state=active]:text-[#1a0d2c]"
                >
                  <LinkIcon className="w-4 h-4 mr-2" />
                  Invitation Link
                </TabsTrigger>
              </TabsList>

              <TabsContent value="qrcode" className="mt-6">
                <div className="flex flex-col items-center">
                  <div className="bg-white p-4 rounded-lg mb-4">
                    <Image
                      src="/qr-code-generic.png"
                      alt="Invitation QR Code"
                      width={200}
                      height={200}
                      className="rounded-md"
                    />
                  </div>
                  <p className="text-sm text-islamic-cream/70 mb-4 text-center">
                    Scan the QR code above to join Barkat Foundation
                  </p>
                  <Button onClick={handleShare} className="bg-[#8dc63f] hover:bg-[#8dc63f]/90 text-[#1a0d2c] w-full">
                    <Share className="w-4 h-4 mr-2" />
                    Share QR Code
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="link" className="mt-6">
                <div className="flex flex-col">
                  <div className="flex items-center bg-islamic-medium/30 rounded-lg p-3 mb-4">
                    <input
                      type="text"
                      value={inviteLink}
                      readOnly
                      className="flex-1 bg-transparent border-none outline-none text-islamic-cream"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handleCopy}
                      className="text-[#8dc63f] hover:text-[#8dc63f]/80 hover:bg-transparent"
                    >
                      {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
                    </Button>
                  </div>
                  <p className="text-sm text-islamic-cream/70 mb-4 text-center">
                    Copy the link above and share it with your friends
                  </p>
                  <Button onClick={handleShare} className="bg-[#8dc63f] hover:bg-[#8dc63f]/90 text-[#1a0d2c]">
                    <Share className="w-4 h-4 mr-2" />
                    Share Invitation Link
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </Card>

        {/* Invitation Reward Explanation */}
        <Card className="overflow-hidden border-none shadow-xl bg-islamic-cardBg/90 backdrop-blur-lg text-white">
          <div className="p-6">
            <h2 className="text-xl font-bold text-[#8dc63f] mb-4">Invitation Reward Explanation</h2>

            <div className="space-y-4">
              <div className="bg-islamic-medium/30 rounded-lg p-4">
                <h3 className="font-medium text-[#8dc63f] mb-2">Direct Invitation Rewards</h3>
                <p className="text-sm text-islamic-cream/80">
                  When your directly invited friends complete a donation, you'll receive 10% of their donation amount as
                  a reward.
                </p>
              </div>

              <div className="bg-islamic-medium/30 rounded-lg p-4">
                <h3 className="font-medium text-[#8dc63f] mb-2">Indirect Invitation Rewards</h3>
                <p className="text-sm text-islamic-cream/80">
                  When your direct invitees invite others (2nd generation), you'll receive 4% reward. For 3rd-5th
                  generations, you'll receive 2% reward.
                </p>
              </div>

              <div className="bg-islamic-medium/30 rounded-lg p-4">
                <h3 className="font-medium text-[#8dc63f] mb-2">Relief Fund Increase</h3>
                <p className="text-sm text-islamic-cream/80">
                  The more people you invite, the higher your relief fund rate:
                  <br />
                  No referrals: Base rate 1%
                  <br />1 referral: Increased to 1.5%
                  <br />
                  2-4 referrals: Increased to 2%
                  <br />
                  5+ referrals: Increased to 2.5%
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </BackgroundWrapper>
  )
}
