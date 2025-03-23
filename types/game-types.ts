export type CardType = {
  id: number
  emoji: string
  icon: string
  isFlipped: boolean
  isMatched: boolean
}

export type GameStatus = "playing" | "won" | "lost"

export type LevelConfig = {
  id: number
  name: string
  pairs: number
  gridCols: {
    mobile: number
    tablet: number
    desktop: number
  }
  maxAttempts: number
}

