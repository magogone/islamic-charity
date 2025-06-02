"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
  useRef,
} from "react";
import { useAuth } from "@/store/use-auth";
import { LoginModal } from "@/components/login-modal";
import { usePathname, useRouter } from "next/navigation";
import { useToast } from "@/components/ui/toast";

interface AuthContextType {
  openLoginModal: (targetPath?: string) => void;
  closeLoginModal: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 创建一个延迟检查函数
const delayCheckAuth = (callback: () => void, delay: number) => {
  return setTimeout(callback, delay);
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [targetPath, setTargetPath] = useState<string | undefined>(undefined);
  const [isInitialized, setIsInitialized] = useState(false);
  // 添加一个状态来跟踪是否正在进行认证检查
  const [isCheckingAuth, setIsCheckingAuth] = useState(false);
  // 添加一个引用来防止重复检查
  const hasCheckedAuthRef = useRef(false);
  // 添加一个计时器引用
  const authCheckTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Safely access auth properties with default values
  const auth = useAuth();
  const isAuthenticated = auth?.isAuthenticated || false;
  const logout = auth?.logout || (() => {});
  const user = auth?.user || null;

  const router = useRouter();
  const pathname = usePathname();
  const { info, ToastContainer } = useToast();

  // 设置初始化状态，确保 SSR 时不进行检查
  useEffect(() => {
    setIsInitialized(true);

    return () => {
      // 组件卸载时清除任何定时器
      if (authCheckTimerRef.current) {
        clearTimeout(authCheckTimerRef.current);
      }
    };
  }, []);

  // 监听认证失败事件 - 暂时禁用
  useEffect(() => {
    // 暂时禁用认证失败监听
    return;

    // 原来的认证失败监听逻辑（已禁用）
    /*
    if (!isInitialized || typeof window === 'undefined') {
      return;
    }

    const handleAuthFailure = (event: CustomEvent<{endpoint: string, statusCode: number, currentPath: string}>) => {
      const { endpoint, statusCode, currentPath } = event.detail;
      
      // 如果登录模态框已经打开，不重复打开
      if (isLoginModalOpen) {
        return;
      }
      
      // 对于 /auth/me 接口的失败，说明服务器端认证已失效
      // 无论本地状态如何，都应该提示用户重新登录
      if (endpoint.includes('/auth/me')) {
        // 清除本地认证状态，确保状态同步
        if (isAuthenticated) {
          logout();
        }
        
        // 显示认证失败的提示信息
        info("Your login session has expired, please log in again to continue");
        
        // 打开登录模态框，并设置目标路径为当前路径
        setTargetPath(currentPath);
        setIsLoginModalOpen(true);
        return;
      }
      
      // 对于其他接口的认证失败，只有在用户确实未认证时才显示登录提示
      if (isAuthenticated && user) {
        return;
      }
      
      // 显示认证失败的提示信息
      info("Your login session has expired, please log in again to continue");
      
      // 打开登录模态框，并设置目标路径为当前路径
      setTargetPath(currentPath);
      setIsLoginModalOpen(true);
    };

    // 添加事件监听器
    window.addEventListener('auth-failure' as any, handleAuthFailure as EventListener);
    
    return () => {
      // 清理事件监听器
      window.removeEventListener('auth-failure' as any, handleAuthFailure as EventListener);
    };
    */
  }, []); // 移除所有依赖项

  const openLoginModal = useCallback((path?: string) => {
    // 暂时禁用登录模态框
    console.log("登录功能已暂时禁用，目标路径:", path);
    return;

    // 原来的登录模态框逻辑（已禁用）
    /*
    // 如果用户已认证，不要显示登录框
    if (isAuthenticated && user) {
      // 如果指定了路径，直接导航过去
      if (path) {
        router.push(path)
      }
      return
    }
    
    // 只有当确实需要登录时才显示登录框
    setTargetPath(path)
    setIsLoginModalOpen(true)
    */
  }, []); // 移除依赖项

  const closeLoginModal = useCallback(() => {
    setIsLoginModalOpen(false);
    setTargetPath(undefined);
  }, []);

  // Handle logout with redirection
  const handleLogout = useCallback(() => {
    logout();
    router.push("/");
  }, [logout, router]);

  // 检查 cookie 是否存在
  const hasAuthCookie = useCallback((): boolean => {
    if (typeof window === "undefined") return false;
    return document.cookie.includes("charity_session=");
  }, []);

  // 检查当前路径是否受保护 - 暂时禁用
  // const isProtectedRoute = pathname === "/donation" || pathname === "/promotion" || pathname.startsWith("/profile")
  const isProtectedRoute = false; // 暂时将所有路由设为非保护路由

  // 主要的认证状态检查逻辑 - 暂时禁用
  useEffect(() => {
    // 暂时禁用所有认证检查逻辑
    return;

    // 原来的认证检查逻辑（已禁用）
    /*
    // 非客户端或未初始化时不执行检查
    if (!isInitialized || typeof window === 'undefined') {
      return;
    }
    
    // 如果用户已登录，关闭任何打开的登录框并完成
    if (isAuthenticated && user) {
      if (isLoginModalOpen) {
        closeLoginModal();
      }
      // 重置检查标志以便下次路由变化时重新检查
      hasCheckedAuthRef.current = false;
      return;
    }
    
    // 如果正在检查，不执行后续操作
    if (isCheckingAuth) {
      return;
    }
    
    // 非保护路由不需要检查
    if (!isProtectedRoute) {
      return;
    }
    
    // 如果没有认证 cookie，并且未显示登录框，则显示
    if (!hasAuthCookie()) {
      if (!isLoginModalOpen) {
        openLoginModal(pathname);
      }
      return;
    }
    
    // 有 cookie 但未认证，可能是状态同步问题
    if (!isAuthenticated && hasAuthCookie()) {      
      // 阻止后续检查直到这次检查完成
      setIsCheckingAuth(true);
      hasCheckedAuthRef.current = true;
      
      // 清除之前的定时器
      if (authCheckTimerRef.current) {
        clearTimeout(authCheckTimerRef.current);
      }
      
      // 增加延迟时间，给认证状态更多时间同步 (从1秒增加到2秒)
      authCheckTimerRef.current = delayCheckAuth(() => {
        // 再次检查认证状态
        setIsCheckingAuth(false);
        
        // 重新读取认证状态，已确保获取最新值
        const nowAuthenticated = auth?.isAuthenticated || false;
        const nowHasUser = !!auth?.user;
        
        // 只有当确实未认证时才显示登录框
        if (!nowAuthenticated && isProtectedRoute && !isLoginModalOpen) {
          openLoginModal(pathname);
        } else {          
          // 如果认证状态变为已认证，尝试导航到目标路径
          if (nowAuthenticated && pathname === targetPath) {
            router.push(pathname);
          }
        }
      }, 2000); // 延长延迟时间到2秒
    }
    */
  }, []); // 移除所有依赖项

  return (
    <AuthContext.Provider value={{ openLoginModal, closeLoginModal }}>
      {children}
      {/* 暂时隐藏登录模态框 */}
      {/* <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} targetPath={targetPath} /> */}
      <ToastContainer />
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
}
