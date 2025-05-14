"use client"

import { useState } from "react"
import Image, { type ImageProps } from "next/image"

interface FallbackImageProps extends Omit<ImageProps, "onError"> {
  fallbackSrc?: string
}

export function FallbackImage({
  src,
  alt,
  fallbackSrc = "/intricate-islamic-geometric-pattern.png",
  onLoad,
  ...props
}: FallbackImageProps) {
  const [error, setError] = useState(false)

  const handleError = () => {
    setError(true)
  }

  const handleLoad = (event: any) => {
    if (onLoad) {
      onLoad(event)
    }
  }

  return <Image {...props} src={error ? fallbackSrc : src} alt={alt} onError={handleError} onLoad={handleLoad} />
}
