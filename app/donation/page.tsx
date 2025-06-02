"use client";

import { DonationOverview } from "@/components/donation-overview";
import { VipBenefitsCard } from "@/components/vip-benefits-card";
import { VipPaymentInfo } from "@/components/vip-payment-info";
import { MainLayout } from "@/components/main-layout";
import { useDonation } from "@/store/use-donation";
import { useUser } from "@/store/use-user";
import { useVipInfo } from "@/store/use-vip-info";
import { useTranslation } from "@/lib/i18n";
import { useEffect, useState, useRef } from "react";
import { PaymentDialog } from "@/components/payment-dialog";
import { useAuth } from "@/store/use-auth";
import { useAuthContext } from "@/store/auth-context";
import { getUserProfit, getUserInfo } from "@/lib/api";
import { useIsMounted } from "@/components/client-providers";

// ERC20 代币 ABI
const erc20Abi = [
  {
    inputs: [
      { internalType: "address", name: "recipient", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "transfer",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
    stateMutability: "view",
    type: "function",
  },
] as const;

// 根据链ID获取代币精度的简化函数
// 大多数ERC20代币使用18位小数，但USDT通常使用6位小数
function getTokenDecimalsByChain(chainId: number, tokenSymbol: string): number {
  // 对于USDT特殊处理
  if (tokenSymbol === "USDT") {
    // 以太坊主网和测试网上的USDT使用6位小数
    if (chainId === 1 || chainId === 11155111) {
      return 6;
    }
    // BSC上的USDT使用18位小数
    if (chainId === 56 || chainId === 97) {
      return 18;
    }
  }

  // 其他代币默认使用18位小数
  return 18;
}

/**
 * 捐赠页面组件
 */
export default function DonationPage() {
  const contentRef = useRef<HTMLDivElement>(null);
  const { userData } = useUser();
  const { donationData, updateDonation } = useDonation();
  const { getVipLevelDonationAmount } = useVipInfo();
  const { isAuthenticated, user, getCurrentUser } = useAuth();
  const { openLoginModal } = useAuthContext();
  const { t } = useTranslation();
  const isMounted = useIsMounted();

  // 使用ref跟踪数据获取状态
  const fetchedUserDataRef = useRef(false);
  const fetchedProfitRef = useRef(false);

  // 添加profit状态
  const [profitData, setProfitData] = useState({
    today_profit: 0,
    max_profit: 0,
  });

  // 添加读取代币精度状态
  const [usdtDecimals, setUsdtDecimals] = useState(6); // 默认USDT精度

  // 获取用户提现和奖励数据 - 暂时禁用API调用
  useEffect(() => {
    // 暂时禁用API调用，使用默认数据
    return;

    // 原来的API调用逻辑（已禁用）
    /*
    const fetchUserData = async () => {
      // 只有在未获取过数据且用户已登录的情况下执行
      if (!fetchedUserDataRef.current && isAuthenticated) {
        try {
          fetchedUserDataRef.current = true; // 标记为已尝试获取
          // 获取用户信息以确保有最新的提现数据
          const userResponse = await getUserInfo();

          if (
            userResponse.success &&
            userResponse.data &&
            userResponse.data.user
          ) {
            const userData = userResponse.data.user;

            // 从用户数据获取提现金额和可提现金额
            const withdrawnAmount = userData.withdraw_amount
              ? parseFloat(userData.withdraw_amount)
              : 0;
            const withdrawableAmount = userData.reward_amount
              ? parseFloat(userData.reward_amount)
              : 0;

            // 计算总累积金额
            const totalAccumulated = withdrawnAmount + withdrawableAmount;

            // 更新donation数据中的提现相关信息
            updateDonation({
              withdrawnAmount,
              withdrawableAmount,
              totalAccumulated,
              // 根据当前值估计总预期和最大奖励
              totalExpectedReward: totalAccumulated,
              totalMaxReward: Math.round(totalAccumulated * 1.5),
            });

            // 确保用户状态也更新，但不依赖于getCurrentUser的引用
            try {
              await getCurrentUser();
            } catch (err) {
              // 静默处理错误
            }
          }
        } catch (error) {
          // 静默处理错误
        }
      }
    };

    fetchUserData();

    // 组件卸载时清理
    return () => {
      fetchedUserDataRef.current = false;
    };
    */
  }, []); // 移除依赖项

  // 获取收益数据 - 暂时禁用API调用
  useEffect(() => {
    // 暂时禁用API调用，使用默认数据
    if (!fetchedProfitRef.current) {
      fetchedProfitRef.current = true;
      // 设置默认收益数据
      setProfitData({ today_profit: 20, max_profit: 50 });
      updateDonation({
        dailyFunds: {
          current: 20,
          max: 50,
        },
      });
    }
    return;

    // 原来的API调用逻辑（已禁用）
    /*
    const fetchProfitData = async () => {
      // 只有在未获取过数据且用户已登录的情况下执行
      if (!fetchedProfitRef.current && isAuthenticated) {
        try {
          fetchedProfitRef.current = true; // 标记为已尝试获取

          const res = await getUserProfit();

          if (res.success && res.data) {
            setProfitData(res.data);
            // 更新donationData中的收益数据
            updateDonation({
              dailyFunds: {
                current: res.data.today_profit,
                max: res.data.max_profit,
              },
            });
          } else {
            // 使用默认值（临时，等待后端实现）
            setProfitData({ today_profit: 20, max_profit: 50 });
            // 更新donationData中的收益数据
            updateDonation({
              dailyFunds: {
                current: 20,
                max: 50,
              },
            });
          }
        } catch (err) {
          // 发生错误时也使用默认值
          setProfitData({ today_profit: 20, max_profit: 50 });
          // 更新donationData中的收益数据
          updateDonation({
            dailyFunds: {
              current: 20,
              max: 50,
            },
          });
        }
      }
    };

    fetchProfitData();

    // 组件卸载时清理
    return () => {
      fetchedProfitRef.current = false;
    };
    */
  }, []); // 移除依赖项

  // 检查 URL 参数或 sessionStorage 以决定是否打开对话框
  const shouldOpenDialog = (() => {
    if (typeof window === "undefined") return false;

    // 检查 URL 参数
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("openPayment") === "true") {
      return true;
    }

    // 检查 sessionStorage
    const storedFlag = sessionStorage.getItem("open_payment_dialog");
    if (storedFlag === "true") {
      sessionStorage.removeItem("open_payment_dialog");
      return true;
    }

    return false;
  })();

  // 初始状态基于参数
  const [paymentOpen, setPaymentOpen] = useState(shouldOpenDialog);

  // 创建安全的用户数据
  const safeUserData = {
    vipLevel: userData?.vipLevel ?? 1,
    totalDonation: userData?.totalDonation ?? 0,
  };

  // 获取下一级 VIP 的金额
  const nextVipLevel = Math.min(safeUserData.vipLevel + 1, 5);
  const nextVipAmount = getVipLevelDonationAmount(nextVipLevel);

  // 即时检查 URL 参数并打开对话框
  useEffect(() => {
    if (typeof window !== "undefined") {
      // 检查 URL 参数
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get("openPayment") === "true") {
        setPaymentOpen(true);

        // 清除 URL 参数
        const url = new URL(window.location.href);
        url.searchParams.delete("openPayment");
        window.history.replaceState({}, "", url);
      }

      // 检查 sessionStorage
      const storedFlag = sessionStorage.getItem("open_payment_dialog");
      if (storedFlag === "true") {
        setPaymentOpen(true);
        sessionStorage.removeItem("open_payment_dialog");
      }

      // 确保页面可以滚动
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";

      // 修复可能的滚动限制
      setTimeout(() => {
        // 尝试滚动到页面顶部
        window.scrollTo(0, 0);

        // 确保可以继续滚动
        if (contentRef.current) {
          contentRef.current.style.minHeight = "150vh"; // 设置为更大的高度以确保可滚动
        }
      }, 500);
    }
  }, []);

  return (
    <MainLayout title={t("donation.title")} currentPath="/donation">
      <div ref={contentRef}>
        <DonationOverview
          data={{
            ...donationData,
            dailyFunds: {
              current: profitData.today_profit, // 使用API获取的今日收益
              max: profitData.max_profit, // 使用API获取的最高收益
            },
          }}
        />

        <div className="mt-4 space-y-6">
          <VipBenefitsCard vipLevel={safeUserData.vipLevel} />

          {/* 添加 VIP 支付信息组件 */}
          <VipPaymentInfo />

          {/* 添加额外的内容以确保可以滚动 */}
          <div className="space-y-6 mt-8">
            <div className="p-5 bg-islamic-medium/20 rounded-lg border border-islamic-gold/20">
              <h3 className="text-lg font-medium text-islamic-gold mb-2">
                {t("donation.impactOfDonations")}
              </h3>
              <p className="text-islamic-cream/80 text-sm mb-3">
                {t("donation.impactDescription")}
              </p>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-xl font-bold text-islamic-gold">100+</p>
                  <p className="text-xs text-islamic-cream/60">
                    {t("donation.projects")}
                  </p>
                </div>
                <div>
                  <p className="text-xl font-bold text-islamic-gold">10K+</p>
                  <p className="text-xs text-islamic-cream/60">
                    {t("donation.beneficiaries")}
                  </p>
                </div>
                <div>
                  <p className="text-xl font-bold text-islamic-gold">25+</p>
                  <p className="text-xs text-islamic-cream/60">
                    {t("donation.countries")}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-5 bg-islamic-medium/20 rounded-lg border border-islamic-gold/20">
              <h3 className="text-lg font-medium text-islamic-gold mb-2">
                {t("donation.howDonationWorks")}
              </h3>
              <ul className="space-y-2 text-sm text-islamic-cream/80">
                <li className="flex items-start">
                  <span className="inline-block w-5 h-5 rounded-full bg-islamic-gold/20 text-islamic-gold text-center mr-2 flex-shrink-0">
                    1
                  </span>
                  <span>{t("donation.step1")}</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-5 h-5 rounded-full bg-islamic-gold/20 text-islamic-gold text-center mr-2 flex-shrink-0">
                    2
                  </span>
                  <span>{t("donation.step2")}</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-5 h-5 rounded-full bg-islamic-gold/20 text-islamic-gold text-center mr-2 flex-shrink-0">
                    3
                  </span>
                  <span>{t("donation.step3")}</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-5 h-5 rounded-full bg-islamic-gold/20 text-islamic-gold text-center mr-2 flex-shrink-0">
                    4
                  </span>
                  <span>{t("donation.step4")}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* 添加版权信息，减少底部留白 */}
        <div className="h-12 flex items-end justify-center pb-4 mt-4 text-islamic-cream/40 text-xs">
          {t("donation.copyright")}
        </div>
      </div>

      {/* 使用原生对话框组件 */}
      <PaymentDialog
        open={paymentOpen}
        onOpenChange={setPaymentOpen}
        currentVipLevel={safeUserData.vipLevel}
        nextLevelAmount={nextVipAmount}
      />
    </MainLayout>
  );
}
