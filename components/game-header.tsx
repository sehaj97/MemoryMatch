"use client"

import { Button } from "@/components/ui/button"
import type { LevelConfig } from "@/types/game-types"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

interface GameHeaderProps {
  attempts: number
  matches: number
  level: LevelConfig
  onReset: () => void
}

export default function GameHeader({ attempts, matches, level, onReset }: GameHeaderProps) {
  return (
    <div className="mb-4 space-y-2">
      <div className="flex items-center justify-between">
        <Link href="/">
          <Button variant="ghost" size="sm" className="text-white hover:bg-white/10 -ml-2">
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back
          </Button>
        </Link>

        <div className="text-center">
          <h2 className="font-bold">{level.name} Level</h2>
        </div>

        <Button
          onClick={onReset}
          variant="outline"
          size="sm"
          className="bg-navy border-navy text-white hover:bg-navy/90 hover:text-white"
        >
          Reset
        </Button>
      </div>

      <div className="flex justify-between items-center px-2 text-sm">
        <div className="font-medium">
          Attempts: {attempts}/{level.maxAttempts}
        </div>

        <div className="font-medium">
          Matches: {matches}/{level.pairs}
        </div>
      </div>
    </div>
  )
}

