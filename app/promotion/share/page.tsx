"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { BackgroundWrapper } from "@/components/background-wrapper";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Copy,
  Check,
  QrCode,
  LinkIcon,
  Share,
  Users,
  Award,
  Loader2,
} from "lucide-react";
import { useUser } from "@/store/use-user";
import { useStore } from "@/store/store-context";
import { useDailyRewardRates } from "@/hooks/use-daily-reward-rates";
import { generateInviteCode } from "@/lib/api";
import { ENV } from "@/lib/env-config";
import { useAuth } from "@/store/use-auth";
import { useTranslation } from "@/lib/i18n";

export default function SharePage() {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState("qrcode");
  const { userData } = useUser();
  const { state } = useStore();
  const { rateConfigs, loading: ratesLoading } = useDailyRewardRates();
  const { isAuthenticated } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [inviteCode, setInviteCode] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Set mounted state on client-side
  useEffect(() => {
    setMounted(true);
  }, []);

  // Fetch invite code when component mounts
  useEffect(() => {
    async function fetchInviteCode() {
      if (!isAuthenticated || !mounted || inviteCode) return; // Don't fetch if we already have a code

      try {
        setLoading(true);
        setError(null);

        const response = await generateInviteCode();

        if (response.success && response.data) {
          setInviteCode(response.data.invite_code);
        } else {
          setError(t("share.couldNotGenerateCode"));
        }
      } catch (err) {
        console.error("Error generating invite code:", err);
        setError(t("share.errorGeneratingCode"));
      } finally {
        setLoading(false);
      }
    }

    fetchInviteCode();
  }, [isAuthenticated, mounted, inviteCode]); // Removed 't' from dependencies

  const siteUrl = ENV.SITE_URL;

  // Generate invite link that directly points to the registration page with code
  const inviteLink = inviteCode ? `${siteUrl}/register?code=${inviteCode}` : "";

  const handleCopy = () => {
    if (!inviteLink) return;

    navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    if (!inviteLink) return;

    if (navigator.share) {
      navigator.share({
        title: t("share.invitationToJoin"),
        text: t("share.joinDescription"),
        url: inviteLink,
      });
    } else {
      // If native sharing is not supported, copy the link
      handleCopy();
    }
  };

  return (
    <BackgroundWrapper>
      {/* Page header */}
      <div className="px-6 py-4 border-b border-[#d4b96e]/30 bg-[#1a0d2c]/80 backdrop-blur-sm">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center">
            <button
              onClick={() => window.history.back()}
              className="mr-3 text-[#d4b96e]"
            >
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
            <h1 className="text-xl font-bold text-[#d4b96e]">
              {t("share.inviteFriends")}
            </h1>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-lg mx-auto px-4 py-6">
        <Card className="overflow-hidden border-none shadow-xl bg-islamic-cardBg/90 backdrop-blur-lg text-white mb-6">
          <div className="p-6">
            <h2 className="text-xl font-bold text-center text-[#8dc63f] mb-4">
              {t("share.shareYourInvitationLink")}
            </h2>
            <p className="text-center text-islamic-cream/80 mb-6">
              {t("share.inviteDescription")}
            </p>

            {loading ? (
              <div className="flex flex-col items-center justify-center py-8">
                <Loader2 className="h-8 w-8 text-islamic-gold animate-spin mb-4" />
                <p className="text-islamic-cream/80">
                  {t("share.generatingInvitationLink")}
                </p>
              </div>
            ) : error ? (
              <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4 text-center">
                <p className="text-red-100 mb-2">{error}</p>
                <Button
                  onClick={() => window.location.reload()}
                  className="bg-[#8dc63f] hover:bg-[#8dc63f]/90 text-[#1a0d2c] mt-2"
                >
                  {t("share.retry")}
                </Button>
              </div>
            ) : (
              <Tabs
                defaultValue="qrcode"
                className="w-full"
                onValueChange={setActiveTab}
              >
                <TabsList className="grid w-full grid-cols-2 bg-islamic-medium/50">
                  <TabsTrigger
                    value="qrcode"
                    className="data-[state=active]:bg-[#8dc63f] data-[state=active]:text-[#1a0d2c]"
                  >
                    <QrCode className="w-4 h-4 mr-2" />
                    {t("share.qrCode")}
                  </TabsTrigger>
                  <TabsTrigger
                    value="link"
                    className="data-[state=active]:bg-[#8dc63f] data-[state=active]:text-[#1a0d2c]"
                  >
                    <LinkIcon className="w-4 h-4 mr-2" />
                    {t("share.invitationLink")}
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="qrcode" className="mt-6">
                  <div className="flex flex-col items-center">
                    {inviteLink ? (
                      <>
                        <div className="bg-white p-4 rounded-lg mb-4">
                          <Image
                            src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
                              inviteLink
                            )}`}
                            alt="Invitation QR Code"
                            width={200}
                            height={200}
                            className="rounded-md"
                            onError={(e) => {
                              console.error("QR Code failed to load:", e);
                            }}
                          />
                        </div>
                        <p className="text-sm text-islamic-cream/70 mb-4 text-center">
                          {t("share.scanQrCode")}
                        </p>
                        <Button
                          onClick={handleShare}
                          className="bg-[#8dc63f] hover:bg-[#8dc63f]/90 text-[#1a0d2c] w-full"
                        >
                          <Share className="w-4 h-4 mr-2" />
                          {t("share.shareQrCode")}
                        </Button>
                      </>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-8">
                        <div className="w-[200px] h-[200px] bg-islamic-medium/30 rounded-lg flex items-center justify-center mb-4">
                          <QrCode className="h-16 w-16 text-islamic-cream/30" />
                        </div>
                        <p className="text-sm text-islamic-cream/70 text-center">
                          {t("share.generatingInvitationLink")}
                        </p>
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="link" className="mt-6">
                  <div className="flex flex-col">
                    {inviteLink ? (
                      <>
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
                            {copied ? (
                              <Check className="h-5 w-5" />
                            ) : (
                              <Copy className="h-5 w-5" />
                            )}
                          </Button>
                        </div>
                        <p className="text-sm text-islamic-cream/70 mb-4 text-center">
                          {t("share.copyLinkAndShare")}
                        </p>
                        <Button
                          onClick={handleShare}
                          className="bg-[#8dc63f] hover:bg-[#8dc63f]/90 text-[#1a0d2c]"
                        >
                          <Share className="w-4 h-4 mr-2" />
                          {t("share.shareInvitationLink")}
                        </Button>
                      </>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-8">
                        <div className="w-full h-12 bg-islamic-medium/30 rounded-lg flex items-center justify-center mb-4">
                          <LinkIcon className="h-6 w-6 text-islamic-cream/30 mr-2" />
                          <span className="text-islamic-cream/50">
                            {t("share.generatingInvitationLink")}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            )}
          </div>
        </Card>

        {/* Reward Benefit Program table using VIP config */}
        <Card className="overflow-hidden border-none shadow-xl bg-islamic-cardBg/90 backdrop-blur-lg text-white mb-6">
          <div className="p-6">
            <h2 className="text-xl font-bold text-[#8dc63f] mb-4">
              {t("share.referralRewardProgram")}
            </h2>
            <p className="text-sm text-islamic-cream/80 mb-4">
              {t("share.earnRewardsDescription")}
            </p>

            {/* Table-based reward explanation */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-islamic-medium/30">
                    <th className="p-2 text-left text-xs font-medium text-islamic-cream/70">
                      {t("share.level")}
                    </th>
                    <th className="p-2 text-center text-xs font-medium text-islamic-cream/70">
                      {t("share.vipLevel")} 1
                    </th>
                    <th className="p-2 text-center text-xs font-medium text-islamic-cream/70">
                      {t("share.vipLevel")} 2
                    </th>
                    <th className="p-2 text-center text-xs font-medium text-islamic-cream/70">
                      {t("share.vipLevel")} 3
                    </th>
                    <th className="p-2 text-center text-xs font-medium text-islamic-cream/70">
                      {t("share.vipLevel")} 4
                    </th>
                    <th className="p-2 text-center text-xs font-medium text-islamic-cream/70">
                      {t("share.vipLevel")} 5
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* Level 1 */}
                  <tr className="border-b border-islamic-medium/20">
                    <td className="p-2 text-left">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1 text-islamic-gold/80" />
                        <span className="text-xs">{t("share.level1")}</span>
                      </div>
                    </td>
                    <td className="p-2 text-center text-xs font-medium text-islamic-gold">
                      {(mounted &&
                        state?.vipInfo?.levels?.[1]?.rewardRates?.level1) ||
                        10}
                      %
                    </td>
                    <td className="p-2 text-center text-xs font-medium text-islamic-gold">
                      {(mounted &&
                        state?.vipInfo?.levels?.[2]?.rewardRates?.level1) ||
                        12}
                      %
                    </td>
                    <td className="p-2 text-center text-xs font-medium text-islamic-gold">
                      {(mounted &&
                        state?.vipInfo?.levels?.[3]?.rewardRates?.level1) ||
                        15}
                      %
                    </td>
                    <td className="p-2 text-center text-xs font-medium text-islamic-gold">
                      {(mounted &&
                        state?.vipInfo?.levels?.[4]?.rewardRates?.level1) ||
                        18}
                      %
                    </td>
                    <td className="p-2 text-center text-xs font-medium text-islamic-gold">
                      {(mounted &&
                        state?.vipInfo?.levels?.[5]?.rewardRates?.level1) ||
                        20}
                      %
                    </td>
                  </tr>

                  {/* Level 2 */}
                  <tr className="border-b border-islamic-medium/20">
                    <td className="p-2 text-left">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1 text-islamic-gold/80" />
                        <span className="text-xs">{t("share.level2")}</span>
                      </div>
                    </td>
                    <td className="p-2 text-center text-xs font-medium text-islamic-gold">
                      {(mounted &&
                        state?.vipInfo?.levels?.[1]?.rewardRates?.level2) ||
                        4}
                      %
                    </td>
                    <td className="p-2 text-center text-xs font-medium text-islamic-gold">
                      {(mounted &&
                        state?.vipInfo?.levels?.[2]?.rewardRates?.level2) ||
                        4}
                      %
                    </td>
                    <td className="p-2 text-center text-xs font-medium text-islamic-gold">
                      {(mounted &&
                        state?.vipInfo?.levels?.[3]?.rewardRates?.level2) ||
                        4}
                      %
                    </td>
                    <td className="p-2 text-center text-xs font-medium text-islamic-gold">
                      {(mounted &&
                        state?.vipInfo?.levels?.[4]?.rewardRates?.level2) ||
                        4}
                      %
                    </td>
                    <td className="p-2 text-center text-xs font-medium text-islamic-gold">
                      {(mounted &&
                        state?.vipInfo?.levels?.[5]?.rewardRates?.level2) ||
                        4}
                      %
                    </td>
                  </tr>

                  {/* Level 3 */}
                  <tr className="border-b border-islamic-medium/20">
                    <td className="p-2 text-left">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1 text-islamic-gold/80" />
                        <span className="text-xs">{t("share.level3")}</span>
                      </div>
                    </td>
                    <td className="p-2 text-center text-xs font-medium text-islamic-gold">
                      {(mounted &&
                        state?.vipInfo?.levels?.[1]?.rewardRates?.level3) ||
                        2}
                      %
                    </td>
                    <td className="p-2 text-center text-xs font-medium text-islamic-gold">
                      {(mounted &&
                        state?.vipInfo?.levels?.[2]?.rewardRates?.level3) ||
                        2}
                      %
                    </td>
                    <td className="p-2 text-center text-xs font-medium text-islamic-gold">
                      {(mounted &&
                        state?.vipInfo?.levels?.[3]?.rewardRates?.level3) ||
                        2}
                      %
                    </td>
                    <td className="p-2 text-center text-xs font-medium text-islamic-gold">
                      {(mounted &&
                        state?.vipInfo?.levels?.[4]?.rewardRates?.level3) ||
                        2}
                      %
                    </td>
                    <td className="p-2 text-center text-xs font-medium text-islamic-gold">
                      {(mounted &&
                        state?.vipInfo?.levels?.[5]?.rewardRates?.level3) ||
                        2}
                      %
                    </td>
                  </tr>

                  {/* Level 4 */}
                  <tr className="border-b border-islamic-medium/20">
                    <td className="p-2 text-left">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1 text-islamic-gold/80" />
                        <span className="text-xs">{t("share.level4")}</span>
                      </div>
                    </td>
                    <td className="p-2 text-center text-xs font-medium text-islamic-gold">
                      {(mounted &&
                        state?.vipInfo?.levels?.[1]?.rewardRates?.level4) ||
                        2}
                      %
                    </td>
                    <td className="p-2 text-center text-xs font-medium text-islamic-gold">
                      {(mounted &&
                        state?.vipInfo?.levels?.[2]?.rewardRates?.level4) ||
                        2}
                      %
                    </td>
                    <td className="p-2 text-center text-xs font-medium text-islamic-gold">
                      {(mounted &&
                        state?.vipInfo?.levels?.[3]?.rewardRates?.level4) ||
                        2}
                      %
                    </td>
                    <td className="p-2 text-center text-xs font-medium text-islamic-gold">
                      {(mounted &&
                        state?.vipInfo?.levels?.[4]?.rewardRates?.level4) ||
                        2}
                      %
                    </td>
                    <td className="p-2 text-center text-xs font-medium text-islamic-gold">
                      {(mounted &&
                        state?.vipInfo?.levels?.[5]?.rewardRates?.level4) ||
                        2}
                      %
                    </td>
                  </tr>

                  {/* Level 5 */}
                  <tr className="border-b border-islamic-medium/20">
                    <td className="p-2 text-left">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1 text-islamic-gold/80" />
                        <span className="text-xs">{t("share.level5")}</span>
                      </div>
                    </td>
                    <td className="p-2 text-center text-xs font-medium text-islamic-gold">
                      {(mounted &&
                        state?.vipInfo?.levels?.[1]?.rewardRates?.level5) ||
                        2}
                      %
                    </td>
                    <td className="p-2 text-center text-xs font-medium text-islamic-gold">
                      {(mounted &&
                        state?.vipInfo?.levels?.[2]?.rewardRates?.level5) ||
                        2}
                      %
                    </td>
                    <td className="p-2 text-center text-xs font-medium text-islamic-gold">
                      {(mounted &&
                        state?.vipInfo?.levels?.[3]?.rewardRates?.level5) ||
                        2}
                      %
                    </td>
                    <td className="p-2 text-center text-xs font-medium text-islamic-gold">
                      {(mounted &&
                        state?.vipInfo?.levels?.[4]?.rewardRates?.level5) ||
                        2}
                      %
                    </td>
                    <td className="p-2 text-center text-xs font-medium text-islamic-gold">
                      {(mounted &&
                        state?.vipInfo?.levels?.[5]?.rewardRates?.level5) ||
                        2}
                      %
                    </td>
                  </tr>

                  {/* Total Row */}
                  <tr className="bg-islamic-medium/30">
                    <td className="p-2 text-left font-medium">
                      <div className="flex items-center">
                        <Award className="h-4 w-4 mr-1 text-islamic-gold" />
                        <span className="text-xs">{t("invitation.total")}</span>
                      </div>
                    </td>
                    <td className="p-2 text-center text-xs font-bold text-islamic-gold">
                      {(mounted &&
                        state?.vipInfo?.levels?.[1]?.rewardRates?.total) ||
                        20}
                      %
                    </td>
                    <td className="p-2 text-center text-xs font-bold text-islamic-gold">
                      {(mounted &&
                        state?.vipInfo?.levels?.[2]?.rewardRates?.total) ||
                        22}
                      %
                    </td>
                    <td className="p-2 text-center text-xs font-bold text-islamic-gold">
                      {(mounted &&
                        state?.vipInfo?.levels?.[3]?.rewardRates?.total) ||
                        25}
                      %
                    </td>
                    <td className="p-2 text-center text-xs font-bold text-islamic-gold">
                      {(mounted &&
                        state?.vipInfo?.levels?.[4]?.rewardRates?.total) ||
                        28}
                      %
                    </td>
                    <td className="p-2 text-center text-xs font-bold text-islamic-gold">
                      {(mounted &&
                        state?.vipInfo?.levels?.[5]?.rewardRates?.total) ||
                        30}
                      %
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </Card>

        {/* Reward Fund Increase using Daily Reward config */}
        <Card className="overflow-hidden border-none shadow-xl bg-islamic-cardBg/90 backdrop-blur-lg text-white">
          <div className="p-6">
            <h3 className="text-xl font-bold text-[#8dc63f] mb-4 flex items-center">
              <Users className="h-5 w-5 mr-2" />
              {t("share.reliefFundIncrease")}
            </h3>
            <p className="text-sm text-islamic-cream/80 mb-3">
              {t("share.moreInvitesHigherRate")}
            </p>
            <div className="grid grid-cols-2 gap-2 mt-2">
              <div className="flex justify-between items-center p-2 rounded-md border border-islamic-medium/50 bg-islamic-medium/20">
                <span className="text-xs flex items-center">
                  <Users className="h-3 w-3 mr-1 opacity-70" />
                  <span>0 {t("share.people")}</span>
                </span>
                <span className="text-xs font-medium text-islamic-gold">
                  {mounted && !ratesLoading
                    ? `${rateConfigs.noReferral}%`
                    : "1%"}
                </span>
              </div>
              <div className="flex justify-between items-center p-2 rounded-md border border-islamic-medium/50 bg-islamic-medium/20">
                <span className="text-xs flex items-center">
                  <Users className="h-3 w-3 mr-1 opacity-70" />
                  <span>1 {t("share.person")}</span>
                </span>
                <span className="text-xs font-medium text-islamic-gold">
                  {mounted && !ratesLoading
                    ? `${rateConfigs.referral1}%`
                    : "1.5%"}
                </span>
              </div>
              <div className="flex justify-between items-center p-2 rounded-md border border-islamic-medium/50 bg-islamic-medium/20">
                <span className="text-xs flex items-center">
                  <Users className="h-3 w-3 mr-1 opacity-70" />
                  <span>2-4 {t("share.people")}</span>
                </span>
                <span className="text-xs font-medium text-islamic-gold">
                  {mounted && !ratesLoading
                    ? `${rateConfigs.referral3}%`
                    : "2%"}
                </span>
              </div>
              <div className="flex justify-between items-center p-2 rounded-md border border-islamic-medium/50 bg-islamic-medium/20">
                <span className="text-xs flex items-center">
                  <Users className="h-3 w-3 mr-1 opacity-70" />
                  <span>5+ {t("share.people")}</span>
                </span>
                <span className="text-xs font-medium text-islamic-gold">
                  {mounted && !ratesLoading
                    ? `${rateConfigs.referral5}%`
                    : "2.5%"}
                </span>
              </div>
            </div>
            <p className="text-xs text-islamic-cream/70 italic mt-3">
              {t("share.reliefFundNote")}
            </p>
          </div>
        </Card>
      </div>
    </BackgroundWrapper>
  );
}
