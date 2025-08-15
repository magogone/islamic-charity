"use client";

import { useState } from "react";
import { Globe, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTranslation, languageNames, type Locale } from "@/lib/i18n";

export function LanguageSelector() {
  const { locale, setLocale, locales } = useTranslation();
  const [open, setOpen] = useState(false);

  const handleLocaleChange = (newLocale: Locale) => {
    setLocale(newLocale);
    setOpen(false);
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="text-[#d4b96e] hover:bg-[#d4b96e]/10 border-none p-3 h-12 w-12"
        >
          <Globe className="h-7 w-7" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="bg-[#131b29] border-[#d4b96e]/20 text-[#f5efe0]"
      >
        {locales.map((loc) => (
          <DropdownMenuItem
            key={loc}
            onClick={() => handleLocaleChange(loc)}
            className="cursor-pointer hover:bg-[#d4b96e]/10 focus:bg-[#d4b96e]/10"
          >
            <div className="flex items-center justify-between w-full">
              <span>{languageNames[loc]}</span>
              {locale === loc && <Check className="h-4 w-4 text-[#d4b96e]" />}
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
