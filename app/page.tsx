import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Heart, Star, Zap, Music } from "lucide-react"
import { levels } from "@/utils/game-utils"

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-500 text-white">
      <div className="w-full max-w-md mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold">Memory Match Game</h1>
          <p className="text-lg opacity-90">Test your memory by matching pairs of cards</p>
        </div>

        <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20">
          <h2 className="text-xl font-semibold mb-4">How to Play</h2>
          <ul className="space-y-2 list-disc list-inside">
            <li>Flip cards by tapping on them</li>
            <li>Find matching pairs of emojis and icons</li>
            <li>Complete the level by matching all pairs</li>
            <li>Each level has a maximum number of attempts</li>
            <li>Higher levels have more cards to match</li>
          </ul>
        </Card>

        <div className="grid grid-cols-2 gap-3 max-w-[280px] mx-auto">
          {[
            { emoji: "🐶", icon: Heart },
            { emoji: "🐱", icon: Star },
            { emoji: "🐭", icon: Zap },
            { emoji: "🐹", icon: Music },
          ].map((item, index) => (
            <div
              key={index}
              className="aspect-square bg-white/20 rounded-lg flex flex-col items-center justify-center gap-1"
            >
              <span className="text-3xl">{item.emoji}</span>
              <item.icon className="w-5 h-5 text-white" />
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-center">Select a Level</h2>
          <div className="grid grid-cols-2 gap-3">
            {levels.map((level) => (
              <Link key={level.id} href={`/game/${level.id}`} className="block">
                <Button variant="outline" className="w-full border-white/30 bg-white/10 hover:bg-white/20 text-white">
                  <div className="text-center">
                    <div className="font-bold">{level.name}</div>
                    <div className="text-xs opacity-80">{level.pairs * 2} cards</div>
                  </div>
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}

