"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NewsAnnouncementItem,
  type NewsAnnouncementItemProps,
} from "./news-announcement-item";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

interface NewsAnnouncementsSectionProps {
  news: NewsAnnouncementItemProps[];
  announcements: NewsAnnouncementItemProps[];
  className?: string;
}

export function NewsAnnouncementsSection({
  news,
  announcements,
  className,
}: NewsAnnouncementsSectionProps) {
  const [activeTab, setActiveTab] = useState<string>("all");

  // Merge and sort by date
  const allItems = [...news, ...announcements].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // Filter items based on current tab
  const filteredItems =
    activeTab === "all"
      ? allItems
      : activeTab === "news"
      ? news
      : announcements;

  const scrollContainer = (direction: "left" | "right") => {
    const container = document.getElementById("news-scroll-container");
    if (container) {
      const scrollAmount = direction === "left" ? -300 : 300;
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className={cn("w-full my-6", className)}>
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-bold text-islamic-gold">新闻公告</h2>
          <p className="text-sm text-islamic-cream/70">了解最新资讯</p>
        </div>
        <Tabs
          defaultValue="all"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-auto"
        >
          <TabsList className="bg-islamic-dark/50 border border-islamic-medium/30">
            <TabsTrigger
              value="all"
              className="data-[state=active]:bg-islamic-gold data-[state=active]:text-islamic-dark"
            >
              全部
            </TabsTrigger>
            <TabsTrigger
              value="news"
              className="data-[state=active]:bg-islamic-gold data-[state=active]:text-islamic-dark"
            >
              新闻
            </TabsTrigger>
            <TabsTrigger
              value="announcement"
              className="data-[state=active]:bg-islamic-gold data-[state=active]:text-islamic-dark"
            >
              公告
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="relative">
        <div
          id="news-scroll-container"
          className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="min-w-[280px] w-[280px] md:w-[280px] snap-start sm:min-w-[90%] sm:w-[90%]"
            >
              <NewsAnnouncementItem {...item} />
            </div>
          ))}
        </div>

        <Button
          variant="outline"
          size="icon"
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-islamic-dark/80 border-islamic-medium/50 text-islamic-cream hover:bg-islamic-dark hover:text-islamic-gold z-10 rounded-full h-8 w-8"
          onClick={() => scrollContainer("left")}
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">向左滚动</span>
        </Button>

        <Button
          variant="outline"
          size="icon"
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 bg-islamic-dark/80 border-islamic-medium/50 text-islamic-cream hover:bg-islamic-dark hover:text-islamic-gold z-10 rounded-full h-8 w-8"
          onClick={() => scrollContainer("right")}
        >
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">向右滚动</span>
        </Button>
      </div>
    </div>
  );
}
