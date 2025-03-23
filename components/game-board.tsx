"use client";

import { useEffect, useState } from "react";
import type { CardType, LevelConfig } from "@/types/game-types";
import CardItem from "@/components/card-item";
import { useMobile } from "@/hooks/use-mobile";

interface GameBoardProps {
  cards: CardType[];
  level: LevelConfig;
  onCardClick: (id: number) => void;
}

export default function GameBoard({
  cards,
  level,
  onCardClick,
}: GameBoardProps) {
  const isMobile = useMobile();
  const isTablet = !isMobile && window.innerWidth < 1024;

  // Determine grid columns based on screen size and level
  const getGridCols = () => {
    if (isMobile) return level.gridCols.mobile;
    if (isTablet) return level.gridCols.tablet;
    return level.gridCols.desktop;
  };

  // Determine card size based on level
  const getCardSize = () => {
    const pairs = level.pairs;
    if (pairs <= 8) return "lg";
    if (pairs <= 18) return "md";
    if (pairs <= 50) return "sm";
    return "xs";
  };

  const [gridCols, setGridCols] = useState(getGridCols());
  const [cardSize, setCardSize] = useState(getCardSize());

  // Update grid columns and card size when screen size or level changes
  useEffect(() => {
    setGridCols(getGridCols());
    setCardSize(getCardSize());

    const handleResize = () => {
      setGridCols(getGridCols());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMobile, isTablet, level]);

  return (
    <div
      className={`grid gap-1 sm:gap-2 mb-4`}
      style={{ gridTemplateColumns: `repeat(${gridCols}, minmax(0, 1fr))` }}
    >
      {cards.map((card) => (
        <CardItem
          key={card.id}
          card={card}
          onClick={onCardClick}
          size={cardSize as "xs" | "sm" | "md" | "lg"}
        />
      ))}
    </div>
  );
}
