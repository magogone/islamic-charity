"use client"

import type React from "react"
import { createContext, useContext, useReducer, type ReactNode } from "react"
import type { NewsAnnouncementItemProps } from "@/components/news-announcement-item"

// Define the store state types
export interface StoreState {
  // User data
  user: {
    id: string
    username: string
    vipLevel: number
    totalDonation: number
    referrals: number
  }

  // Donation data
  donation: {
    totalDonation: number
    vipLevel: number
    dailyFunds: {
      current: number
      max: number
    }
    referrals: number
    periodProgress: number
    startDate: string
    remainingDays: number
    endDate: string
    currentRate: number
    maxRate: number
    totalAccumulated: number
    totalExpectedReward: number
    totalMaxReward: number
    withdrawnAmount: number
    withdrawableAmount: number
  }

  // Invitation data
  invitation: {
    totalReferrals: number
    directReferrals: number
    indirectReferrals: number
    totalRewards: number
    rewardRate: {
      level1: number
      level2: number
      level3: number
      level4: number
      level5: number
      total: number
    }
    basicReward: {
      current: number
      max: number
    }
    maxReferralReward: {
      level1: number
      level2: number
      level3: number
      level4: number
      level5: number
      total: number
    }
  }

  // News data
  news: NewsAnnouncementItemProps[]
}

// Define action types
type ActionType =
  | { type: "UPDATE_USER"; payload: Partial<StoreState["user"]> }
  | { type: "UPDATE_DONATION"; payload: Partial<StoreState["donation"]> }
  | { type: "UPDATE_INVITATION"; payload: Partial<StoreState["invitation"]> }
  | { type: "UPDATE_NEWS"; payload: NewsAnnouncementItemProps[] }

// Initial state
const initialState: StoreState = {
  user: {
    id: "user123",
    username: "User123456",
    vipLevel: 1,
    totalDonation: 100,
    referrals: 2,
  },
  donation: {
    totalDonation: 100,
    vipLevel: 1,
    dailyFunds: {
      current: 3,
      max: 6,
    },
    referrals: 2,
    periodProgress: 65,
    startDate: "2023-04-01",
    remainingDays: 14,
    endDate: "2023-05-10",
    currentRate: 2,
    maxRate: 2.5,
    totalAccumulated: 120,
    totalExpectedReward: 120,
    totalMaxReward: 180,
    withdrawnAmount: 50,
    withdrawableAmount: 30,
  },
  invitation: {
    totalReferrals: 5,
    directReferrals: 2,
    indirectReferrals: 3,
    totalRewards: 15,
    rewardRate: {
      level1: 10,
      level2: 4,
      level3: 2,
      level4: 2,
      level5: 2,
      total: 20,
    },
    basicReward: {
      current: 1.5,
      max: 2.5,
    },
    maxReferralReward: {
      level1: 15,
      level2: 6,
      level3: 3,
      level4: 3,
      level5: 3,
      total: 30,
    },
  },
  news: [
    {
      id: "news1",
      title: "Barkat Foundation Launches New Poverty Relief Project",
      content:
        "Barkat Foundation announces the launch of a new poverty relief project aimed at helping more Muslim families in impoverished areas. The project will provide education, medical care, and essential living supplies. This initiative is expected to reach over 5,000 families in its first phase and will expand to more regions in the coming months.",
      imageUrl: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=600&auto=format&fit=crop",
      date: "2023-04-15",
      isNew: true,
      type: "news",
    },
    {
      id: "news2",
      title: "Foundation Partners with International Charity Organizations",
      content:
        "Barkat Foundation has established strategic partnerships with multiple international charity organizations to jointly advance poverty alleviation work in global Muslim communities and expand charitable impact. These partnerships will enable the foundation to reach more beneficiaries and implement more effective programs.",
      imageUrl: "https://images.unsplash.com/photo-1560252829-804f1aedf1be?q=80&w=600&auto=format&fit=crop",
      date: "2023-04-10",
      type: "news",
    },
    {
      id: "news3",
      title: "Annual Charity Report Released",
      content:
        "Barkat Foundation releases its 2023 annual charity report, detailing charitable achievements, fund usage, and future plans over the past year. The report highlights the foundation's commitment to transparency and accountability in its operations. Key achievements include providing clean water to over 10,000 people and supporting the education of 500 children.",
      imageUrl: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?q=80&w=600&auto=format&fit=crop",
      date: "2023-04-05",
      type: "news",
    },
    {
      id: "news4",
      title: "New Feature: Direct Charity Project Donations",
      content:
        "We've added a direct charity project donation feature. Users can now choose specific charity projects for targeted donations to better fulfill their charitable intentions. This feature allows donors to see exactly where their money is going and the impact it is making.",
      imageUrl: "https://images.unsplash.com/photo-1607000975631-e05b9830fbea?q=80&w=600&auto=format&fit=crop",
      date: "2023-04-12",
      isNew: true,
      type: "news",
    },
  ],
}

// Create reducer
const reducer = (state: StoreState, action: ActionType): StoreState => {
  switch (action.type) {
    case "UPDATE_USER":
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload,
        },
      }
    case "UPDATE_DONATION":
      return {
        ...state,
        donation: {
          ...state.donation,
          ...action.payload,
        },
      }
    case "UPDATE_INVITATION":
      return {
        ...state,
        invitation: {
          ...state.invitation,
          ...action.payload,
        },
      }
    case "UPDATE_NEWS":
      return {
        ...state,
        news: action.payload,
      }
    default:
      return state
  }
}

// Create context
type StoreContextType = {
  state: StoreState
  dispatch: React.Dispatch<ActionType>
}

const StoreContext = createContext<StoreContextType | undefined>(undefined)

// Create provider component
export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  return <StoreContext.Provider value={{ state, dispatch }}>{children}</StoreContext.Provider>
}

// Custom hook to use the store
export function useStore() {
  const context = useContext(StoreContext)
  if (context === undefined) {
    throw new Error("useStore must be used within a StoreProvider")
  }
  return context
}
