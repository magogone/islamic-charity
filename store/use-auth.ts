"use client"

import { useCallback } from "react"
import { useRouter } from "next/navigation"
import { useStore } from "./store-context"
import type { LoginCredentials, RegisterCredentials, AuthUser } from "./auth-types"

// Mock API functions (in a real app, these would call actual API endpoints)
const mockLogin = async (credentials: LoginCredentials): Promise<AuthUser> => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Simple validation
  if (credentials.email === "test@example.com" && credentials.password === "password") {
    return {
      id: "user123",
      email: credentials.email,
      username: "TestUser",
      isVerified: true,
      createdAt: new Date().toISOString(),
    }
  }

  throw new Error("Invalid email or password")
}

const mockRegister = async (credentials: RegisterCredentials): Promise<AuthUser> => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Simple validation
  if (credentials.password !== credentials.confirmPassword) {
    throw new Error("Passwords do not match")
  }

  // In a real app, you would check if the email is already registered
  return {
    id: "user" + Math.floor(Math.random() * 1000),
    email: credentials.email,
    username: credentials.username,
    isVerified: false,
    createdAt: new Date().toISOString(),
  }
}

export function useAuth() {
  const { state, dispatch } = useStore()
  const router = useRouter()

  // Add safe access to auth state with default values
  const authState = state.auth || {
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
  }

  const login = useCallback(
    async (credentials: LoginCredentials) => {
      try {
        dispatch({ type: "AUTH_LOGIN_START" })
        const user = await mockLogin(credentials)
        dispatch({ type: "AUTH_LOGIN_SUCCESS", payload: user })
        return user
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Login failed"
        dispatch({ type: "AUTH_LOGIN_FAILURE", payload: errorMessage })
        throw error
      }
    },
    [dispatch],
  )

  const register = useCallback(
    async (credentials: RegisterCredentials) => {
      try {
        dispatch({ type: "AUTH_REGISTER_START" })
        const user = await mockRegister(credentials)
        dispatch({ type: "AUTH_REGISTER_SUCCESS", payload: user })
        return user
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Registration failed"
        dispatch({ type: "AUTH_REGISTER_FAILURE", payload: errorMessage })
        throw error
      }
    },
    [dispatch],
  )

  const logout = useCallback(() => {
    dispatch({ type: "AUTH_LOGOUT" })
    // Redirect to home page after logout
    router.push("/")
  }, [dispatch, router])

  return {
    user: authState.user,
    isAuthenticated: authState.isAuthenticated,
    isLoading: authState.isLoading,
    error: authState.error,
    login,
    register,
    logout,
  }
}
