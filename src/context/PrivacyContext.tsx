import React, { createContext, useContext, useState } from 'react'

interface PrivacyContextType {
  isPrivacyEnabled: boolean
  togglePrivacy: () => void
  hideValue: (value: string) => string
}

const PrivacyContext = createContext<PrivacyContextType | undefined>(undefined)

export const PrivacyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isPrivacyEnabled, setIsPrivacyEnabled] = useState(false)

  const togglePrivacy = () => {
    setIsPrivacyEnabled(prev => !prev)
  }

  const hideValue = (value: string) => {
    if (!isPrivacyEnabled) return value
    return '•'.repeat(value.length)
  }

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
