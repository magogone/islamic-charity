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
        title: "邀请加入巴卡特基金",
        text: "加入巴卡特基金，参与伊斯兰慈善事业，获得扶贫资金支持！",
        url: inviteLink,
      })
    } else {
      // 如果不支持原生分享，则复制链接
      handleCopy()
    }
  }

  return (
    <BackgroundWrapper>
      {/* 页面头部 */}
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
            <h1 className="text-xl font-bold text-[#d4b96e]">邀请好友</h1>
          </div>
        </div>
      </div>

      {/* 主要内容 */}
      <div className="max-w-lg mx-auto px-4 py-6">
        <Card className="overflow-hidden border-none shadow-xl bg-islamic-cardBg/90 backdrop-blur-lg text-white mb-6">
          <div className="p-6">
            <h2 className="text-xl font-bold text-center text-[#8dc63f] mb-4">分享您的邀请链接</h2>
            <p className="text-center text-islamic-cream/80 mb-6">
              邀请好友加入巴卡特基金，共同参与伊斯兰慈善事业，您将获得丰厚的推荐奖励！
            </p>

            <Tabs defaultValue="qrcode" className="w-full" onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2 bg-islamic-medium/50">
                <TabsTrigger
                  value="qrcode"
                  className="data-[state=active]:bg-[#8dc63f] data-[state=active]:text-[#1a0d2c]"
                >
                  <QrCode className="w-4 h-4 mr-2" />
                  二维码
                </TabsTrigger>
                <TabsTrigger
                  value="link"
                  className="data-[state=active]:bg-[#8dc63f] data-[state=active]:text-[#1a0d2c]"
                >
                  <LinkIcon className="w-4 h-4 mr-2" />
                  邀请链接
                </TabsTrigger>
              </TabsList>

              <TabsContent value="qrcode" className="mt-6">
                <div className="flex flex-col items-center">
                  <div className="bg-white p-4 rounded-lg mb-4">
                    <Image
                      src="/qr-code-generic.png"
                      alt="邀请二维码"
                      width={200}
                      height={200}
                      className="rounded-md"
                    />
                  </div>
                  <p className="text-sm text-islamic-cream/70 mb-4 text-center">扫描上方二维码，加入巴卡特基金</p>
                  <Button onClick={handleShare} className="bg-[#8dc63f] hover:bg-[#8dc63f]/90 text-[#1a0d2c] w-full">
                    <Share className="w-4 h-4 mr-2" />
                    分享二维码
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
                  <p className="text-sm text-islamic-cream/70 mb-4 text-center">复制上方链接，分享给您的好友</p>
                  <Button onClick={handleShare} className="bg-[#8dc63f] hover:bg-[#8dc63f]/90 text-[#1a0d2c]">
                    <Share className="w-4 h-4 mr-2" />
                    分享邀请链接
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </Card>

        {/* 邀请奖励说明 */}
        <Card className="overflow-hidden border-none shadow-xl bg-islamic-cardBg/90 backdrop-blur-lg text-white">
          <div className="p-6">
            <h2 className="text-xl font-bold text-[#8dc63f] mb-4">邀请奖励说明</h2>

            <div className="space-y-4">
              <div className="bg-islamic-medium/30 rounded-lg p-4">
                <h3 className="font-medium text-[#8dc63f] mb-2">直接邀请奖励</h3>
                <p className="text-sm text-islamic-cream/80">
                  当您直接邀请的好友完成捐赠后，您将获得其捐赠金额的10%作为奖励。
                </p>
              </div>

              <div className="bg-islamic-medium/30 rounded-lg p-4">
                <h3 className="font-medium text-[#8dc63f] mb-2">间接邀请奖励</h3>
                <p className="text-sm text-islamic-cream/80">
                  您的直接邀请好友再邀请他人（2代），您将获得4%的奖励。 3-5代邀请，您将获得2%的奖励。
                </p>
              </div>

              <div className="bg-islamic-medium/30 rounded-lg p-4">
                <h3 className="font-medium text-[#8dc63f] mb-2">扶贫资金提升</h3>
                <p className="text-sm text-islamic-cream/80">
                  邀请人数越多，您的扶贫资金率越高：
                  <br />
                  无推荐：基础率1%
                  <br />
                  推荐1人：提升至1.5%
                  <br />
                  推荐2-4人：提升至2%
                  <br />
                  推荐5人及以上：提升至2.5%
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </BackgroundWrapper>
  )
}
