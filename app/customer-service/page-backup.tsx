"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  MessageCircle,
  Send,
  ArrowLeft,
  Bot,
  User,
  ChevronDown,
  ChevronUp,
  HelpCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useTranslation } from "@/lib/i18n";

export default function CustomerServicePage() {
  const router = useRouter();
  const { t } = useTranslation();
  const [isQAExpanded, setIsQAExpanded] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "bot",
      content: t("customerService.welcome"),
      time: new Date().toLocaleTimeString(),
    },
    {
      id: 2,
      type: "bot",
      content: t("customerService.introduction"),
      time: new Date().toLocaleTimeString(),
    },
    {
      id: 3,
      type: "bot",
      content: t("customerService.services"),
      time: new Date().toLocaleTimeString(),
    },
    {
      id: 4,
      type: "bot",
      content: t("customerService.helpPrompt"),
      time: new Date().toLocaleTimeString(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");

  const quickReplies = [
    t("customerService.quickReplies.donation"),
    t("customerService.quickReplies.investment"),
    t("customerService.quickReplies.vip"),
    t("customerService.quickReplies.overseas"),
    t("customerService.quickReplies.rewards"),
    t("customerService.quickReplies.account"),
    t("customerService.quickReplies.human"),
  ];

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      type: "user" as const,
      content: inputMessage,
      time: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");

    // 模拟客服回复
    setTimeout(() => {
      const botReply = {
        id: messages.length + 2,
        type: "bot" as const,
        content: t("customerService.reply"),
        time: new Date().toLocaleTimeString(),
      };
      setMessages((prev) => [...prev, botReply]);
    }, 1000);
  };

  const handleQuickReply = (reply: string) => {
    setInputMessage(reply);
  };

  return (
    <div className="min-h-screen bg-[#2d1b40]">
      {/* 顶部导航 */}
      <div className="sticky top-0 bg-[#2d1b40] border-b border-[#d4b96e]/20 p-4 z-10">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="text-[#d4b96e] hover:bg-[#d4b96e]/10"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t("customerService.back")}
          </Button>
        </div>
      </div>

      {/* 聊天区域 */}
      <div className="flex flex-col h-[calc(100vh-80px)]">
        {/* 消息列表 */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.type === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`flex items-start space-x-2 max-w-[80%] ${
                  message.type === "user"
                    ? "flex-row-reverse space-x-reverse"
                    : ""
                }`}
              >
                {/* 头像 */}
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.type === "user"
                      ? "bg-[#d4b96e]"
                      : "bg-gradient-to-br from-[#d4b96e] to-[#b39339]"
                  }`}
                >
                  {message.type === "user" ? (
                    <User className="h-4 w-4 text-black" />
                  ) : (
                    <Bot className="h-4 w-4 text-black" />
                  )}
                </div>

                {/* 消息内容 */}
                <div
                  className={`rounded-lg p-3 ${
                    message.type === "user"
                      ? "bg-[#d4b96e] text-black"
                      : "bg-[#2a2f3c] text-[#f5efe0]"
                  }`}
                >
                  <div className="text-sm whitespace-pre-line">
                    {message.content}
                  </div>
                  <div
                    className={`text-xs mt-1 ${
                      message.type === "user"
                        ? "text-black/70"
                        : "text-[#f5efe0]/50"
                    }`}
                  >
                    {message.time}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 常见问题展开区域 */}
      {isQAExpanded && (
        <div className="fixed bottom-16 left-0 right-0 bg-[#2d1b40] border-t border-[#d4b96e]/20 z-20 max-h-48 overflow-y-auto">
          <div className="px-4 py-4">
            <div className="container mx-auto max-w-lg">
              <div className="flex justify-center">
                <div className="w-full max-w-sm">
                  <div className="grid grid-cols-2 gap-2">
                    {quickReplies.map((reply, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          handleQuickReply(reply);
                          setIsQAExpanded(false);
                        }}
                        className="text-xs border-[#d4b96e]/30 text-[#d4b96e] hover:bg-[#d4b96e]/10 h-8 whitespace-nowrap"
                      >
                        {reply}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 固定在底部的输入区域 */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#2d1b40] border-t border-[#d4b96e]/20 z-20">
        {/* 添加安全区域适配 */}
        <div className="px-4 py-3 pb-safe">
          <div className="container mx-auto max-w-lg">
            <div className="flex items-center justify-center">
              <div className="flex items-center space-x-2 w-full max-w-sm">
                {/* 帮助按钮 */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsQAExpanded(!isQAExpanded)}
                  className="border-[#d4b96e]/30 text-[#d4b96e] hover:bg-[#d4b96e]/10 p-2 flex-shrink-0"
                >
                  <HelpCircle className="h-4 w-4" />
                </Button>

                {/* 输入框 */}
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder={t("customerService.inputPlaceholder")}
                  className="flex-1 bg-[#2a2f3c] border border-[#d4b96e]/20 rounded-lg px-3 py-2 text-[#f5efe0] placeholder-[#f5efe0]/50 focus:outline-none focus:border-[#d4b96e] min-w-0"
                />

                {/* 发送按钮 */}
                <Button
                  onClick={handleSendMessage}
                  className="bg-[#d4b96e] text-black hover:bg-[#b39339] p-2 flex-shrink-0"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
