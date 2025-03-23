"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import type { CardType } from "@/types/game-types";
import { iconMap } from "@/utils/game-utils";

interface CardItemProps {
  card: CardType;
  onClick: (id: number) => void;
  size: "xs" | "sm" | "md" | "lg";
}

export default function CardItem({ card, onClick, size }: CardItemProps) {
  const Icon = iconMap[card.icon];

  // Size classes for different card sizes
  const sizeClasses = {
    xs: {
      card: "aspect-square w-full",
      emoji: "text-3xl",
      icon: "w-6 h-6",
    },
    sm: {
      card: "aspect-square w-full",
      emoji: "text-3xl",
      icon: "w-6 h-6",
    },
    md: {
      card: "aspect-square w-full",
      emoji: "text-3xl",
      icon: "w-6 h-6",
    },
    lg: {
      card: "aspect-square w-full",
      emoji: "text-3xl",
      icon: "w-6 h-6",
    },
  };

  return (
    <motion.div
      initial={{ rotateY: 0 }}
      animate={{ rotateY: card.isFlipped ? 180 : 0 }}
      transition={{ duration: 0.5 }}
      className="perspective-500"
      onClick={() => onClick(card.id)}
    >
      <Card
        className={`
        ${
          sizeClasses[size].card
        } cursor-pointer transform-style-3d transition-transform duration-500
        ${card.isMatched ? "border-white border-2" : "border-white/30"}
        bg-white/10 backdrop-blur-sm
      `}
      >
        <div
          className={`
          absolute inset-0 flex items-center justify-center
          ${card.isFlipped ? "opacity-0 backface-hidden" : "opacity-100"}
          rounded-md
        `}
        >
          <span className="text-white font-bold">?</span>
        </div>
        <div
          className={`
          absolute inset-0 flex flex-col items-center justify-center gap-1 rotate-y-180
          ${card.isFlipped ? "opacity-100" : "opacity-0"}
          bg-white/20 rounded-md
        `}
        >
          <span className={sizeClasses[size].emoji}>{card.emoji}</span>
          {Icon && <Icon className={`${sizeClasses[size].icon} text-white`} />}
        </div>
      </Card>
    </motion.div>
  );
}
