"use client"

import { useState, useEffect } from "react"
import type { GameStatus as GameStatusType } from "@/types/game-types"
import { createShuffledCardsForLevel, getLevelById, levels } from "@/utils/game-utils"
import GameBoard from "@/components/game-board"
import GameStatus from "@/components/game-status"
import GameHeader from "@/components/game-header"
import { useRouter } from "next/navigation"

interface MemoryGameProps {
  levelId: number
}

export default function MemoryGame({ levelId }: MemoryGameProps) {
  const router = useRouter()
  const level = getLevelById(levelId)

  // Game state
  const [cards, setCards] = useState(createShuffledCardsForLevel(level))
  const [flippedCards, setFlippedCards] = useState<number[]>([])
  const [attempts, setAttempts] = useState(0)
  const [matches, setMatches] = useState(0)
  const [gameStatus, setGameStatus] = useState<GameStatusType>("playing")

  // Initialize the game
  useEffect(() => {
    initializeGame()
  }, [levelId])

  // Initialize the game with shuffled cards
  const initializeGame = () => {
    setCards(createShuffledCardsForLevel(level))
    setFlippedCards([])
    setAttempts(0)
    setMatches(0)
    setGameStatus("playing")
  }

  // Handle card click
  const handleCardClick = (id: number) => {
    // Ignore clicks if game is not in playing state or card is already flipped/matched
    if (
      gameStatus !== "playing" ||
      flippedCards.length >= 2 ||
      flippedCards.includes(id) ||
      cards.find((card) => card.id === id)?.isMatched
    ) {
      return
    }

    // Flip the card
    const updatedCards = cards.map((card) => (card.id === id ? { ...card, isFlipped: true } : card))
    setCards(updatedCards)

    // Add card to flipped cards
    const newFlippedCards = [...flippedCards, id]
    setFlippedCards(newFlippedCards)

    // Check for matches if two cards are flipped
    if (newFlippedCards.length === 2) {
      const newAttempts = attempts + 1
      setAttempts(newAttempts)

      const [firstCardId, secondCardId] = newFlippedCards
      const firstCard = updatedCards.find((card) => card.id === firstCardId)
      const secondCard = updatedCards.find((card) => card.id === secondCardId)

      if (firstCard?.emoji === secondCard?.emoji) {
        // Match found
        const matchedCards = updatedCards.map((card) =>
          card.id === firstCardId || card.id === secondCardId ? { ...card, isMatched: true } : card,
        )
        setCards(matchedCards)
        const newMatches = matches + 1
        setMatches(newMatches)
        setFlippedCards([])

        // Check if all matches are found
        if (newMatches === level.pairs) {
          setGameStatus("won")
        }
      } else {
        // No match, flip cards back after a delay
        setTimeout(() => {
          const resetCards = updatedCards.map((card) =>
            card.id === firstCardId || card.id === secondCardId ? { ...card, isFlipped: false } : card,
          )
          setCards(resetCards)
          setFlippedCards([])
        }, 1000)
      }

      // Check if player has reached max attempts
      if (newAttempts >= level.maxAttempts && gameStatus === "playing" && matches < level.pairs) {
        setTimeout(() => {
          setGameStatus("lost")
        }, 1000)
      }
    }
  }

  // Go to next level
  const handleNextLevel = () => {
    const nextLevelId = levelId + 1
    if (nextLevelId <= levels.length) {
      router.push(`/game/${nextLevelId}`)
    }
  }

  // Check if there's a next level
  const hasNextLevel = levelId < levels.length

  return (
    <div className="w-full max-w-[95vw] mx-auto">
      <GameHeader attempts={attempts} matches={matches} level={level} onReset={initializeGame} />

      <GameBoard cards={cards} level={level} onCardClick={handleCardClick} />

      <GameStatus
        status={gameStatus}
        attempts={attempts}
        maxAttempts={level.maxAttempts}
        onReset={initializeGame}
        onNextLevel={handleNextLevel}
        hasNextLevel={hasNextLevel}
      />
    </div>
  )
}

