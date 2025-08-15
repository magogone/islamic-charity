"use client";

import { useState } from "react";
import { RewardInfoCards } from "@/components/reward-info-cards";

// Sample data
const rewardSummaryData = {
  expectedReward: 100,
  maxReward: 180,
  withdrawnAmount: 50,
  withdrawableAmount: 30,
};

// Sample daily rewards data
const dailyRewardsData = Array.from({ length: 40 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - 40 + i);
  const dateStr = `${date.getMonth() + 1}/${date.getDate()}`;

  // Generate random data
  const actualReward = Math.random() * 6 + 1;
  const maxReward = actualReward + Math.random() * 2;
  const completionRate = Math.floor((actualReward / maxReward) * 100);

  // Determine status based on date
  let status: "Distributed" | "Pending" | "Potential" = "Potential";
  if (i < 30) {
    status = "Distributed";
  } else if (i < 35) {
    status = "Pending";
  }

  return {
    date: dateStr,
    actualReward,
    maxReward,
    completionRate,
    status,
  };
});

export default function RewardsPage() {
  const [showWithdrawConfirm, setShowWithdrawConfirm] = useState(false);

  // Sample data
  const basicReward = {
    current: 1.5,
    max: 2.5,
    totalEarned: 100,
  };

  const referralReward = {
    current: {
      level1: 10,
      level2: 4,
      level3: 2,
      level4: 2,
      level5: 2,
      total: 20,
    },
    max: {
      level1: 20,
      level2: 4,
      level3: 2,
      level4: 2,
      level5: 2,
      total: 30,
    },
    totalEarned: 15,
  };

  const handleWithdraw = () => {
    setShowWithdrawConfirm(true);
    // Add withdrawal logic here
    setTimeout(() => {
      setShowWithdrawConfirm(false);
      // Show withdrawal success notification
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-islamic-dark/90 text-white p-4">
      <div className="max-w-lg mx-auto">
        <h1 className="text-xl font-bold text-islamic-gold mb-4">
          Reward Information
        </h1>

        <RewardInfoCards
          basicReward={basicReward}
          referralReward={referralReward}
          className="mb-6"
        />

        {/* Add more content here, such as reward history */}
      </div>
    </div>
  );
}
