"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import type { GameStatus } from "@/types/game-types";

interface GameStatusProps {
  status: GameStatus;
  attempts: number;
  maxAttempts: number;
  onReset: () => void;
  onNextLevel?: () => void;
  hasNextLevel: boolean;
}

export default function GameStatus({
  status,
  attempts,
  maxAttempts,
  onReset,
  onNextLevel,
  hasNextLevel,
}: GameStatusProps) {
  if (status === "playing") return null;

  return (
    <div className="mt-6 p-4 bg-white/20 backdrop-blur-sm rounded-lg text-center fixed top-0 left-0 w-screen h-screen z-[1000] text-[22px]">
      {status === "won" ? (
        <>
          <h2 className="text-2xl font-bold mb-2">Congratulations! 🎉</h2>
          <p className="mb-4">
            You completed the level in {attempts} attempts.
          </p>
        </>
      ) : (
        <>
          <h2 className="text-2xl font-bold mb-2">Game Over 😢</h2>
          <p className="mb-4">
            You've reached the maximum of {maxAttempts} attempts.
          </p>
        </>
      )}

      <div className="flex gap-3 justify-center flex-wrap">
        <Button
          onClick={onReset}
          className="bg-white text-purple-600 hover:bg-white/90"
        >
          {status === "won" ? "Play Again" : "Try Again"}
        </Button>

        {status === "won" && hasNextLevel && (
          <Button
            onClick={onNextLevel}
            className="bg-green-500 text-white hover:bg-green-600"
          >
            Next Level
          </Button>
        )}

        <Link href="/">
          <Button
            variant="outline"
            className="border-white bg-green-500 text-white hover:bg-green-600"
          >
            Level Select
          </Button>
        </Link>
      </div>
    </div>
  );
}
