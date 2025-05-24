"use client"

import React, { useEffect, useRef, useState } from "react"
import type { ReactNode } from "react"
import Link from "next/link"
import { useAuth } from "@/store/use-auth"
import { useToast } from "@/components/ui/toast"
import { Home, Share2, User } from "lucide-react"
import { HeartPlusIcon } from "@/components/heart-plus-icon"
import { useRouter } from "next/navigation"
import { useAuthContext } from "@/store/auth-context"

// 跟踪是否已经执行过布局组件的会话检查
let layoutCheckPerformed = false;

interface MainLayoutProps {
  children: ReactNode
  title?: string
  currentPath: string
}

export function MainLayout({ children, title, currentPath }: MainLayoutProps) {
  const { checkSession, isAuthenticated, user } = useAuth()
  const { ToastContainer } = useToast()
  const router = useRouter()
  const { openLoginModal } = useAuthContext()
  const hasCheckedRef = useRef(false);
  const mainLayoutRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  // 添加客户端渲染状态，避免服务端渲染与客户端水合不匹配
  const [mounted, setMounted] = useState(false);

  // 设置客户端挂载状态
  useEffect(() => {
    setMounted(true);
    
    // 确保页面可以正常滚动
    document.body.style.overflow = 'auto';
    document.documentElement.style.overflow = 'auto';
    document.body.style.height = 'auto';
    
    // 监听滚动事件
    const handleScroll = () => {
      // 不再需要输出调试信息
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // 保存原始的wheel处理器，以便在清理时恢复
    const originalWheelHandler = window.onwheel;
    
    // 尝试使用passive wheel事件监听器，确保滚动正常
    window.addEventListener('wheel', () => {
      // 空函数，仅用于确保滚动事件传播
    }, { passive: true });
    
    // 在移动设备上处理触摸滑动，确保滚动正常工作
    if (currentPath === '/donation') {
      // 延迟处理，确保页面完全加载
      setTimeout(() => {
        if (mainLayoutRef.current) {
          // 确保内容容器高度足够
          if (contentRef.current) {
            contentRef.current.style.minHeight = 'calc(100vh + 300px)';
          }
          
          // 页面加载后尝试滚动以激活滚动功能
          if (window.scrollY < 10) {
            window.scrollTo({top: 10, behavior: 'smooth'});
            setTimeout(() => {
              window.scrollTo({top: 0, behavior: 'smooth'});
            }, 100);
          }
        }
      }, 1000);
    }
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.onwheel = originalWheelHandler;
    };
  }, [currentPath]);
  
  // 新增：专门处理底部导航按钮的点击事件
  useEffect(() => {
    if (!mounted) return;
    
    // 手动添加导航事件处理器，防止事件被其他元素拦截
    const setupDirectNavigation = () => {
      // 获取底部导航按钮
      const homeButton = document.querySelector('[data-path="/"]');
      const donateButton = document.querySelector('[data-path="/donation"]');
      const inviteButton = document.querySelector('[data-path="/promotion"]');
      const profileButton = document.querySelector('[data-path="/profile"]');
      
      // 为每个按钮添加点击事件
      if (homeButton) {
        homeButton.addEventListener('click', (e) => {
          e.stopPropagation(); // 阻止事件冒泡
          if (currentPath !== "/") {
            router.push("/");
          }
        });
      }
      
      if (donateButton) {
        donateButton.addEventListener('click', (e) => {
          e.stopPropagation(); // 阻止事件冒泡
          if (isAuthenticated) {
            router.push("/donation");
          } else {
            openLoginModal("/donation");
          }
        });
      }
      
      if (inviteButton) {
        inviteButton.addEventListener('click', (e) => {
          e.stopPropagation(); // 阻止事件冒泡
          if (isAuthenticated) {
            router.push("/promotion");
          } else {
            openLoginModal("/promotion");
          }
        });
      }
      
      if (profileButton) {
        profileButton.addEventListener('click', (e) => {
          e.stopPropagation(); // 阻止事件冒泡
          if (isAuthenticated) {
            router.push("/profile");
          } else {
            openLoginModal("/profile");
          }
        });
      }
    };
    
    // 延迟设置，确保DOM已完全渲染
    const navSetupTimer = setTimeout(setupDirectNavigation, 500);
    
    return () => {
      clearTimeout(navSetupTimer);
    };
  }, [mounted, currentPath, isAuthenticated, router, openLoginModal]);
  
  // 只检查一次会话，避免重复请求
  useEffect(() => {
    // 如果已执行过检查，则跳过
    if (hasCheckedRef.current || layoutCheckPerformed) {
      return;
    }
    
    // 导入AuthSessionChecker的状态检查函数
    let getSessionCheckStatus;
    try {
      getSessionCheckStatus = require("./auth-session-checker").getSessionCheckStatus;
    } catch (e) {
      console.error("[MainLayout] Failed to import getSessionCheckStatus", e);
    }
    
    hasCheckedRef.current = true;
    
    // 如果AuthSessionChecker已经完成检查，则不需要再次检查
    if (getSessionCheckStatus && getSessionCheckStatus()) {
      layoutCheckPerformed = true;
      return;
    }
    
    // 获取上次活动时间
    const lastActivity = sessionStorage.getItem('last_activity');
    const currentTime = Date.now();
    
    // 仅在下列条件下执行会话检查:
    // 1. 有超过30秒的不活动期间 (可能是页面刷新) 
    // 2. 当前没有有效的用户会话
    // 3. AuthSessionChecker尚未完成检查
    if ((!lastActivity || (currentTime - parseInt(lastActivity)) > 30000) && 
        !isAuthenticated && !layoutCheckPerformed) {
      layoutCheckPerformed = true;
      checkSession();
    }
    
    // 更新上次活动时间戳
    sessionStorage.setItem('last_activity', currentTime.toString());
  }, [checkSession, isAuthenticated]);

  // Function to handle navigation with auth check
  const handleNavigation = (path: string) => {
    if (path === "/" || isAuthenticated) {
      router.push(path)
    } else {
      // Open login modal with target path
      openLoginModal(path)
    }
  }

  // 渲染用户信息或登录按钮的函数
  const renderAuthSection = () => {
    if (!mounted) {
      // 在客户端挂载前，返回一个占位符，避免水合不匹配
      return <div className="auth-placeholder"></div>;
    }
    
    return isAuthenticated && user ? (
      <div className="flex items-center">
        <span className="text-sm text-islamic-cream">
          {user.username || user.email.split("@")[0]}
        </span>
      </div>
    ) : (
      <button
        onClick={() => openLoginModal()}
        className="px-3 py-1 border border-islamic-gold text-islamic-gold rounded-md hover:bg-islamic-gold/10 transition-colors"
      >
        Login
      </button>
    );
  };

  return (
    <div ref={mainLayoutRef} className="min-h-screen bg-islamic-dark text-white overflow-visible">
      {/* Header */}
      <header className="px-6 py-4 border-b border-islamic-medium/50 bg-islamic-dark/70 backdrop-blur-sm sticky top-0 z-20">
        <div className="flex items-center justify-between max-w-lg mx-auto">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-islamic-gold">{title}</h1>
          </div>

          {/* Username or login button */}
          <div>
            {renderAuthSection()}
          </div>
        </div>
      </header>

      {/* Main content - 使用相对定位和更明确的滚动区域 */}
      <div 
        ref={contentRef} 
        className="container max-w-lg mx-auto px-4 py-6 pb-24 min-h-screen overflow-y-auto overscroll-auto relative"
        style={{ WebkitOverflowScrolling: 'touch' }}  // 增强iOS滚动行为
      >
        {children}
      </div>

      {/* Bottom navigation - Fixed */}
      <div className="fixed bottom-0 left-0 right-0 bg-islamic-dark border-t border-islamic-medium/30 py-2 z-50">
        <div className="container max-w-lg mx-auto px-4">
          <div className="flex justify-around">
            <button
              onClick={() => {
                handleNavigation("/");
              }}
              className={`flex flex-col items-center w-full bottom-nav-item ${
                currentPath === "/" ? "text-islamic-gold active-nav" : "text-islamic-cream/60 hover:text-islamic-gold"
              } transition-colors py-2 relative z-50`}
              data-path="/"
              style={{ touchAction: 'manipulation' }}
            >
              <Home className="h-6 w-6" />
              <span className="text-xs mt-1">Home</span>
            </button>
            <button
              onClick={() => {
                handleNavigation("/donation");
              }}
              className={`flex flex-col items-center w-full bottom-nav-item ${
                currentPath === "/donation" ? "text-islamic-gold active-nav" : "text-islamic-cream/60 hover:text-islamic-gold"
              } transition-colors py-2 relative z-50`}
              data-path="/donation"
              style={{ touchAction: 'manipulation' }}
            >
              <HeartPlusIcon className="h-6 w-6" />
              <span className="text-xs mt-1">Donate</span>
            </button>
            <button
              onClick={() => {
                handleNavigation("/promotion");
              }}
              className={`flex flex-col items-center w-full bottom-nav-item ${
                currentPath === "/promotion" ? "text-islamic-gold active-nav" : "text-islamic-cream/60 hover:text-islamic-gold"
              } transition-colors py-2 relative z-50`}
              data-path="/promotion"
              style={{ touchAction: 'manipulation' }}
            >
              <Share2 className="h-6 w-6" />
              <span className="text-xs mt-1">Invite</span>
            </button>
            <button
              onClick={() => {
                handleNavigation("/profile");
              }}
              className={`flex flex-col items-center w-full bottom-nav-item ${
                currentPath === "/profile" ? "text-islamic-gold active-nav" : "text-islamic-cream/60 hover:text-islamic-gold"
              } transition-colors py-2 relative z-50`}
              data-path="/profile"
              style={{ touchAction: 'manipulation' }}
            >
              <User className="h-6 w-6" />
              <span className="text-xs mt-1">Profile</span>
            </button>
          </div>
        </div>
      </div>
      
      <ToastContainer />
    </div>
  )
}
