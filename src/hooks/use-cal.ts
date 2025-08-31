"use client"

import { useState } from 'react'

export function useCal() {
  const [isOpen, setIsOpen] = useState(false)

  const openCal = () => setIsOpen(true)
  const closeCal = () => setIsOpen(false)

  return {
    isOpen,
    openCal,
    closeCal
  }
}
