"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { useTranslation } from "@/lib/i18n";

interface DonationCardProps {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  onDonateClick?: () => void;
  // 保持原有 HeroSection 的接口兼容性
  description?: string;
  onButtonClick?: () => void;
}

export function HeroSection({
  title,
  subtitle,
  buttonText,

  onDonateClick,
  // HeroSection 兼容性参数
  description,
  onButtonClick,
}: DonationCardProps) {
  const { t } = useTranslation();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  // 优化视频加载和播放
  const optimizeVideo = useCallback(() => {
    const video = videoRef.current;
    if (video) {
      // 设置视频缓冲优化
      video.setAttribute("preload", "metadata");
      video.setAttribute("webkit-playsinline", "true");
      video.setAttribute("x5-playsinline", "true");

      // 监听视频事件
      const handleCanPlay = () => {
        setVideoLoaded(true);
        console.log("[Video] Ready to play smoothly");
      };

      const handleLoadedData = () => {
        // 视频数据加载完成，确保流畅播放
        if (video.readyState >= 2) {
          video.currentTime = 0;
        }
      };

      video.addEventListener("canplay", handleCanPlay);
      video.addEventListener("loadeddata", handleLoadedData);

      return () => {
        video.removeEventListener("canplay", handleCanPlay);
        video.removeEventListener("loadeddata", handleLoadedData);
      };
    }
  }, []);

  useEffect(() => {
    const cleanup = optimizeVideo();
    return cleanup;
  }, [optimizeVideo]);

  // 使用传入的描述或多语言翻译
  const displaySubtitle = subtitle || description || t("home.fullDescription");

  const displayTitle = title || t("home.title");
  const displayButtonText = buttonText || t("home.donateButton");

  // 处理点击事件，保持向后兼容
  const handleClick = () => {
    if (onDonateClick) onDonateClick();
    if (onButtonClick) onButtonClick();
  };

  return (
    <div className="w-full max-w-6xl mx-auto -mt-4">
      {/* 视频展示区域 */}
      <div
        style={{ paddingLeft: "1px", paddingRight: "1px", paddingTop: "3px" }}
      >
        <div className="w-full max-w-none">
          <div className="bg-white/5 backdrop-blur-sm overflow-hidden rounded-lg">
            <div className="w-full bg-black" style={{ height: "60px" }}></div>
            <div className="aspect-video bg-black relative">
              {/* 临时使用占位符，如果视频文件不存在 */}
              <video
                ref={videoRef}
                src="/assets/ship111.mp4"
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                poster="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjQ1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMDAwMDAwIi8+PC9zdmc+"
                className={`w-full h-full object-contain transition-opacity duration-500 ${
                  videoLoaded ? "opacity-100" : "opacity-75"
                }`}
                style={{
                  backgroundColor: "#000000",
                  transform: "scale(1.45) translateY(5px) translateX(3px)",
                  willChange: "transform",
                }}
                onLoadStart={() => {
                  console.log("[Video] Loading started");
                }}
                onCanPlay={() => {
                  console.log("[Video] Can play");
                  setVideoLoaded(true);
                }}
                onWaiting={() => {
                  console.log("[Video] Buffering...");
                }}
                onPlaying={() => {
                  console.log("[Video] Playing smoothly");
                }}
                onError={(e) => {
                  // 如果视频加载失败，隐藏视频元素并显示占位符
                  const target = e.target as HTMLVideoElement;
                  target.style.display = "none";
                  // 创建占位符
                  const parent = target.parentElement;
                  if (parent && !parent.querySelector(".video-placeholder")) {
                    const placeholder = document.createElement("div");
                    placeholder.className =
                      "video-placeholder absolute inset-0 bg-gradient-to-br from-islamic-dark via-islamic-medium to-islamic-dark flex items-center justify-center";
                    placeholder.innerHTML =
                      '<div class="text-islamic-gold text-lg">视频加载中...</div>';
                    parent.appendChild(placeholder);
                  }
                }}
              />

              {/* 伊斯兰国家名称装饰 */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ transform: "translateY(-50%)" }}
              >
                <div
                  className="absolute text-white font-light"
                  style={{
                    fontSize: "13.5px",
                    top: "8%",
                    left: "5%",
                    opacity: 0.3,
                    color: "#d2ba82",
                    transform: "rotate(-12deg)",
                  }}
                >
                  Saudi Arabia
                </div>
                <div
                  className="absolute text-white font-light"
                  style={{
                    fontSize: "13.5px",
                    top: "80%",
                    left: "3%",
                    opacity: 0.25,
                    color: "#d2ba82",
                    transform: "rotate(15deg)",
                  }}
                >
                  Turkey
                </div>
                <div
                  className="absolute text-white font-light"
                  style={{
                    fontSize: "13.5px",
                    top: "45%",
                    left: "6%",
                    opacity: 0.2,
                    color: "#d2ba82",
                    transform: "rotate(-8deg)",
                  }}
                >
                  Indonesia
                </div>
                <div
                  className="absolute text-white font-light"
                  style={{
                    fontSize: "13.5px",
                    top: "65%",
                    left: "4%",
                    opacity: 0.3,
                    color: "#d2ba82",
                    transform: "rotate(18deg)",
                  }}
                >
                  Pakistan
                </div>
                <div
                  className="absolute text-white font-light"
                  style={{
                    fontSize: "13.5px",
                    top: "12%",
                    right: "4%",
                    opacity: 0.4,
                    color: "#d2ba82",
                    transform: "rotate(10deg)",
                  }}
                >
                  UAE
                </div>
                <div
                  className="absolute text-white font-light"
                  style={{
                    fontSize: "13.5px",
                    top: "35%",
                    right: "6%",
                    opacity: 0.28,
                    color: "#d2ba82",
                    transform: "rotate(-14deg)",
                  }}
                >
                  Qatar
                </div>
                <div
                  className="absolute text-white font-light"
                  style={{
                    fontSize: "13.5px",
                    top: "55%",
                    right: "3%",
                    opacity: 0.35,
                    color: "#d2ba82",
                    transform: "rotate(22deg)",
                  }}
                >
                  Malaysia
                </div>
                <div
                  className="absolute text-white font-light"
                  style={{
                    fontSize: "13.5px",
                    top: "75%",
                    right: "5%",
                    opacity: 0.32,
                    color: "#d2ba82",
                    transform: "rotate(-6deg)",
                  }}
                >
                  Kuwait
                </div>
                <div
                  className="absolute text-white font-light"
                  style={{
                    fontSize: "13.5px",
                    top: "15%",
                    left: "10%",
                    opacity: 0.15,
                    color: "#d2ba82",
                    transform: "rotate(25deg)",
                  }}
                >
                  Jordan
                </div>
                <div
                  className="absolute text-white font-light"
                  style={{
                    fontSize: "13.5px",
                    top: "40%",
                    right: "10%",
                    opacity: 0.18,
                    color: "#d2ba82",
                    transform: "rotate(-20deg)",
                  }}
                >
                  Oman
                </div>
                <div
                  className="absolute text-white font-light"
                  style={{
                    fontSize: "13.5px",
                    bottom: "15%",
                    left: "8%",
                    opacity: 0.12,
                    color: "#d2ba82",
                    transform: "rotate(8deg)",
                  }}
                >
                  Morocco
                </div>
                <div
                  className="absolute text-white font-light"
                  style={{
                    fontSize: "13.5px",
                    bottom: "25%",
                    right: "9%",
                    opacity: 0.16,
                    color: "#d2ba82",
                    transform: "rotate(-16deg)",
                  }}
                >
                  Bahrain
                </div>
              </div>
            </div>

            {/* 下方内容区域 */}
            <div className="bg-black flex flex-col justify-center items-center px-4 py-8 pt-16">
              <p className="text-sm text-gray-300 text-center mb-6 max-w-lg leading-relaxed">
                {displaySubtitle}
              </p>
              <button
                className="px-6 py-3 rounded-lg font-semibold text-black hover:opacity-90 transition-opacity"
                style={{ backgroundColor: "#d5b96e" }}
                onClick={handleClick}
              >
                {displayButtonText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 为了完全兼容，导出 DonationCard 别名
export const DonationCard = HeroSection;
