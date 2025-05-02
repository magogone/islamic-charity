import { VipLevelDetail } from "@/components/vip-level-detail"

export default function VipLevelPage() {
  // 这里应该从API获取用户的VIP等级信息
  // 以下是模拟数据
  const vipData = {
    vipLevel: 1,
    currentDailyFund: 1.2,
    maxDailyFund: 3,
    referralRewards: {
      level1: 10,
      level2: 4,
      level3to5: 2,
    },
    maxReferralRewards: {
      level1: 15,
      level2: 8,
      level3to5: 5,
    },
    totalRewardRatio: 16,
    maxTotalRewardRatio: 28,
    povertyFundRatios: {
      noReferral: 1,
      referral1: 1.5,
      referral3: 2,
      referral5: 2.5,
    },
    maxPovertyFundRatios: {
      noReferral: 2,
      referral1: 3,
      referral3: 4,
      referral5: 5,
    },
  }

  return (
    <div className="min-h-screen bg-islamic-dark py-8 px-4">
      <VipLevelDetail {...vipData} />
    </div>
  )
}
