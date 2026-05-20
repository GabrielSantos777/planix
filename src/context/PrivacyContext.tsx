import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'

interface PrivacyContextType {
  isPrivacyEnabled: boolean
  togglePrivacy: () => void
  hideValue: (value: string) => string
}

const STORAGE_KEY = 'planix-privacy-enabled'

const PrivacyContext = createContext<PrivacyContextType | undefined>(undefined)

export const PrivacyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isPrivacyEnabled, setIsPrivacyEnabled] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) === 'true'
    } catch {
      return false
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, String(isPrivacyEnabled))
    } catch {
      // localStorage unavailable
    }
  }, [isPrivacyEnabled])

  const togglePrivacy = useCallback(() => {
    setIsPrivacyEnabled(prev => !prev)
  }, [])

  const hideValue = useCallback((value: string) => {
    if (!isPrivacyEnabled) return value
    // Use fixed-width dots for consistent masking
    return '• • • • •'
  }, [isPrivacyEnabled])

  return (
    <PrivacyContext.Provider value={{ isPrivacyEnabled, togglePrivacy, hideValue }}>
      {children}
    </PrivacyContext.Provider>
  )
}

export const usePrivacy = () => {
  const context = useContext(PrivacyContext)
  if (!context) {
    throw new Error('usePrivacy must be used within a PrivacyProvider')
  }
  return context
}
