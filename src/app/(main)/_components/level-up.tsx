'use client'

import { Level } from '@prisma/client'
import confetti from 'canvas-confetti'
import { useSession } from 'next-auth/react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'

type LevelData = {
  currentLevelId: number
  nextLevelId?: number
}

const saveLevelData = (email: string, data: LevelData) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(email, JSON.stringify(data))
  }
}

const getLevelData = (email: string): LevelData | null => {
  if (typeof window !== 'undefined') {
    const data = localStorage.getItem(email)
    return data ? JSON.parse(data) : null
  }
  return null
}

export const LevelUp = ({
  email,
  currentLevel,
  nextLevel,
}: {
  email: string
  currentLevel: Level
  nextLevel?: Level
}) => {
  const { data: session } = useSession()
  const [clicked, setClicked] = useState(false)

  if (!session?.user) return null

  const savedData = getLevelData(email)

  if (!savedData) {
    saveLevelData(email, {
      currentLevelId: currentLevel.id,
      nextLevelId: nextLevel?.id,
    })

    return null
  }

  const handleClick = () => {
    const end = Date.now() + 3 * 1000 // 3 seconds
    const colors = ['#a786ff', '#fd8bbc', '#eca184', '#f8deb1']

    const frame = () => {
      if (Date.now() > end) return

      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        startVelocity: 60,
        origin: { x: 0, y: 0.5 },
        colors,
      })
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        startVelocity: 60,
        origin: { x: 1, y: 0.5 },
        colors,
      })

      requestAnimationFrame(frame)
    }

    frame()

    // Update saved data
    saveLevelData(email, {
      currentLevelId: currentLevel.id,
      nextLevelId: nextLevel?.id,
    })
    setClicked(true)
  }

  if (
    (currentLevel.id === savedData.nextLevelId ||
      (!currentLevel.id && savedData.nextLevelId)) &&
    !clicked
  ) {
    return (
      <Button onClick={handleClick} size="sm">
        🎉 Level Up!
      </Button>
    )
  } else if (
    currentLevel.id !== savedData.currentLevelId &&
    nextLevel?.id !== savedData.nextLevelId
  ) {
    saveLevelData(email, {
      currentLevelId: currentLevel.id,
      nextLevelId: nextLevel?.id,
    })
  }

  return null
}
