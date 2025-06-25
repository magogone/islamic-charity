import Image from "next/image";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "@/lib/i18n";

export interface NewsAnnouncementItemProps {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
  date: string;
  isNew?: boolean;
  isImportant?: boolean;
  type: "news" | "announcement";
  className?: string;
  onClick?: () => void;
}

export function NewsAnnouncementItem({
  title,
  content,
  imageUrl,
  date,
  isNew = false,
  isImportant = false,
  type,
  className,
  onClick,
}: NewsAnnouncementItemProps) {
  const { t } = useTranslation();

  return (
    <Card
      className={cn(
        "overflow-hidden border-none shadow-md bg-islamic-dark/80 hover:bg-islamic-dark/90 transition-all w-full",
        onClick && "cursor-pointer hover:shadow-lg hover:scale-[1.02]",
        className
      )}
      onClick={onClick}
    >
      <div className="relative w-full h-48">
        <Image
          src={imageUrl || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute top-2 right-2 flex gap-2 z-10">
          {isNew && (
            <Badge
              variant="secondary"
              className="bg-islamic-gold text-islamic-dark hover:bg-islamic-gold/90 hover:scale-105 transition-all duration-200 cursor-default shadow-lg"
            >
              {t("news.newBadge")}
            </Badge>
          )}
          {isImportant && (
            <Badge
              variant="destructive"
              className="bg-red-500 text-white hover:bg-red-600 hover:scale-105 transition-all duration-200 cursor-default shadow-lg"
            >
              {t("news.importantBadge")}
            </Badge>
          )}
          <Badge
            className={cn(
              type === "news"
                ? "bg-islamic-teal/80 hover:bg-islamic-teal"
                : "bg-islamic-gold/80 hover:bg-islamic-gold",
              "text-white hover:scale-105 transition-all duration-200 cursor-default shadow-lg"
            )}
          >
            {type === "news" ? t("news.newsType") : t("news.announcementType")}
          </Badge>
        </div>
      </div>
      <CardContent className="p-4">
        <h3 className="text-lg font-bold text-islamic-cream mb-2">{title}</h3>
        <p className="text-sm text-islamic-cream/80 mb-3 line-clamp-3">
          {content}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-xs text-islamic-cream/60">{date}</span>
          {onClick && (
            <span className="text-xs text-islamic-gold/80 hover:text-islamic-gold transition-colors">
              {t("news.readMore")}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
