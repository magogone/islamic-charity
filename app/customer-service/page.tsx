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

interface Message {
  id: number;
  type: "bot" | "user";
  content: string;
  time: string;
}

export default function CustomerServicePage() {
  const router = useRouter();
  const { t } = useTranslation();
  const [isQAExpanded, setIsQAExpanded] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [initialTime] = useState(() => new Date().toLocaleTimeString()); // 固定时间，只在组件首次加载时设置

  // 初始化机器人消息，监听语言变化
  useEffect(() => {
    const initialMessages: Message[] = [
      {
        id: 1,
        type: "bot" as const,
        content: t("customerService.welcome"),
        time: initialTime, // 使用固定时间
      },
      {
        id: 2,
        type: "bot" as const,
        content: t("customerService.introduction"),
        time: initialTime, // 使用固定时间
      },
      {
        id: 3,
        type: "bot" as const,
        content: t("customerService.services"),
        time: initialTime, // 使用固定时间
      },
      {
        id: 4,
        type: "bot" as const,
        content: t("customerService.helpPrompt"),
        time: initialTime, // 使用固定时间
      },
    ];
    setMessages(initialMessages);
  }, []); // 只在组件挂载时执行一次

  const quickReplies = [
    t("customerService.quickReplies.donation"),
    t("customerService.quickReplies.investment"),
    t("customerService.quickReplies.vip"),
    t("customerService.quickReplies.overseas"),
    t("customerService.quickReplies.rewards"),
    t("customerService.quickReplies.account"),
  ];

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      const currentTime = new Date().toLocaleTimeString();
      setMessages((prev) => {
        const newMessage: Message = {
          id: prev.length + 1,
          type: "user",
          content: inputMessage,
          time: currentTime,
        };
        return [...prev, newMessage];
      });

      // 模拟机器人回复
      setTimeout(() => {
        setMessages((prev) => {
          const botReply: Message = {
            id: prev.length + 1,
            type: "bot",
            content: t("customerService.reply"),
            time: new Date().toLocaleTimeString(), // 机器人回复用新时间
          };
          return [...prev, botReply];
        });
      }, 1000);

      setInputMessage("");
    }
  };

  const handleQuickReply = (reply: string) => {
    const currentTime = new Date().toLocaleTimeString();

    setMessages((prev) => {
      const newMessage: Message = {
        id: prev.length + 1,
        type: "user",
        content: reply,
        time: currentTime,
      };
      return [...prev, newMessage];
    });

    setTimeout(() => {
      setMessages((prev) => {
        const botReply: Message = {
          id: prev.length + 1,
          type: "bot",
          content: t("customerService.reply"),
          time: new Date().toLocaleTimeString(), // 机器人回复用新时间
        };
        return [...prev, botReply];
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#2d1b40] text-[#f5efe0] pb-20">
      {/* 顶部导航栏 */}
      <div className="sticky top-0 z-30 bg-[#2d1b40] border-b border-[#d4b96e]/20">
        <div className="flex items-center p-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push("/vip-events#overseas-section")}
            className="text-[#d4b96e] hover:bg-[#d4b96e]/10 p-2"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* 聊天消息区域 */}
      <div className="flex-1 overflow-y-auto p-4 pb-32">
        <div className="space-y-4 max-w-4xl mx-auto">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.type === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  message.type === "user"
                    ? "bg-[#d4b96e] text-black"
                    : "bg-[#3a2a5c] text-[#f5efe0]"
                }`}
              >
                <div className="flex items-start space-x-2">
                  {message.type === "bot" && (
                    <Bot className="h-4 w-4 mt-1 text-[#d4b96e] flex-shrink-0" />
                  )}
                  {message.type === "user" && (
                    <User className="h-4 w-4 mt-1 text-black flex-shrink-0" />
                  )}
                  <div className="flex-1">
                    <p className="text-sm">{message.content}</p>
                    <p className="text-xs opacity-70 mt-1">{message.time}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 常见问题展开区域 */}
      {isQAExpanded && (
        <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-[#2d1b40] border-t border-[#d4b96e]/20 z-20 max-h-48 overflow-y-auto">
          <div className="p-4">
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
      )}

      {/* 底部输入栏 - 使用绝对居中 */}
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-[#2d1b40] border-t border-[#d4b96e]/20 z-30">
        <div className="p-4 pb-8">
          <div className="flex items-center gap-3">
            {/* 帮助按钮 */}
            <button
              onClick={() => setIsQAExpanded(!isQAExpanded)}
              className="flex-shrink-0 w-10 h-10 rounded-lg border border-[#d4b96e]/30 bg-transparent text-[#d4b96e] hover:bg-[#d4b96e]/10 flex items-center justify-center transition-colors"
            >
              <HelpCircle className="h-5 w-5" />
            </button>

            {/* 输入框 */}
            <div className="flex-1">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder={t("customerService.inputPlaceholder")}
                className="w-full h-10 px-4 bg-[#2a2f3c] border border-[#d4b96e]/20 rounded-lg text-[#f5efe0] placeholder-[#f5efe0]/50 focus:outline-none focus:border-[#d4b96e] transition-colors"
              />
            </div>

            {/* 发送按钮 */}
            <button
              onClick={handleSendMessage}
              className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#d4b96e] text-black hover:bg-[#b39339] flex items-center justify-center transition-colors"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
