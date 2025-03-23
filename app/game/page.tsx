import { redirect } from "next/navigation"

export default function GamePage() {
  // Redirect to level 1 by default
  redirect("/game/1")
}

