"use client"

import { useState } from 'react'

export function useCalendly() {
  const [isOpen, setIsOpen] = useState(false)

  const openCalendly = () => setIsOpen(true)
  const closeCalendly = () => setIsOpen(false)

  return {
    isOpen,
    openCalendly,
    closeCalendly
  }
}
