"use client"

import { cn } from "@/lib/utils"

interface BarkatLogoProps {
  size?: number
  className?: string
  variant?: "default" | "light" | "gold"
}

export function BarkatLogo({ size = 40, className, variant = "default" }: BarkatLogoProps) {
  // Define color schemes based on variant
  const colors = {
    default: {
      primary: "#d4b96e", // Islamic gold
      secondary: "#f5efe0", // Islamic cream
      accent: "#2d1b40", // Islamic dark
    },
    light: {
      primary: "#f5efe0", // Islamic cream
      secondary: "#f5efe0", // Islamic cream
      accent: "#f5efe0", // Islamic cream (all white for light variant)
    },
    gold: {
      primary: "#d4b96e", // Islamic gold
      secondary: "#d4b96e", // Islamic gold
      accent: "#d4b96e", // Islamic gold (all gold for gold variant)
    },
  }

  const { primary, secondary, accent } = colors[variant]

  return (
    <div className={cn("relative flex items-center justify-center", className)} style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute"
      >
        {/* Outer decorative circle */}
        <circle cx="50" cy="50" r="48" stroke={primary} strokeWidth="2" fill="none" />

        {/* Inner decorative pattern - stylized Islamic geometric pattern */}
        <path
          d="M50 15 
             A35 35 0 0 1 85 50 
             A35 35 0 0 1 50 85
             A35 35 0 0 1 15 50
             A35 35 0 0 1 50 15Z"
          stroke={secondary}
          strokeWidth="1.5"
          fill="none"
        />

        {/* Stylized crescent moon */}
        <path
          d="M65 40 
             A20 20 0 0 1 65 60
             A15 15 0 0 0 65 40Z"
          fill={primary}
        />

        {/* Stylized hand giving/receiving - representing charity */}
        <path
          d="M30 55
             C35 50, 40 48, 45 50
             C50 52, 55 52, 60 48
             C55 58, 45 62, 35 58
             C32 57, 30 55, 30 55Z"
          fill={secondary}
        />

        {/* Decorative dots */}
        <circle cx="50" cy="30" r="2" fill={accent} />
        <circle cx="50" cy="70" r="2" fill={accent} />
        <circle cx="30" cy="50" r="2" fill={accent} />
        <circle cx="70" cy="50" r="2" fill={accent} />
      </svg>

      {/* Text "BA" for Barkat Alliance */}
      <div
        className="absolute font-serif font-bold text-center"
        style={{
          color: primary,
          fontSize: size * 0.4,
          letterSpacing: size * 0.02,
        }}
      >
        BA
      </div>
    </div>
  )
}
