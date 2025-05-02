"use client"

import { useStore } from "./store-context"
import type { NewsAnnouncementItemProps } from "@/components/news-announcement-item"

export function useNews() {
  const { state, dispatch } = useStore()

  const updateNews = (news: NewsAnnouncementItemProps[]) => {
    dispatch({ type: "UPDATE_NEWS", payload: news })
  }

  return {
    news: state.news,
    updateNews,
  }
}
