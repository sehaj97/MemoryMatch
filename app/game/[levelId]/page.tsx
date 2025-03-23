import MemoryGame from "@/components/memory-game";

interface GamePageProps {
  params: {
    levelId: string;
  };
}

export default function GamePage({ params }: GamePageProps) {
  const levelId = Number.parseInt(params.levelId);

  return (
    <main className="min-h-screen flex flex-col p-4 bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-500 text-white">
      <div className="flex-1 flex flex-col items-center justify-center mx-auto w-3/4">
        <MemoryGame levelId={levelId} />
      </div>
    </main>
  );
}
