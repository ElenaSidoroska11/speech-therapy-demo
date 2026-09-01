"use client";

import { motion } from "framer-motion";

type FlowerProps = {
  petal: string;
  center: string;
  delay?: number;
  className?: string;
};

export function Flower({
  petal,
  center,
  delay = 0,
  className,
}: FlowerProps) {
  return (
    <motion.svg
      viewBox="0 0 40 76"
      aria-hidden
      className={className}
      style={{ originX: 0.5, originY: 1 }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0, rotate: [-5, 5, -5] }}
      transition={{
        opacity: { duration: 0.45, delay },
        y: { duration: 0.45, delay },
        rotate: {
          duration: 3.4 + delay,
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}
    >
      <path
        d="M20 30 L20 74"
        fill="none"
        stroke="#3F9E62"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
      <ellipse
        cx="12"
        cy="54"
        rx="8"
        ry="3.6"
        fill="#5FBF7E"
        transform="rotate(-32 12 54)"
      />
      <ellipse
        cx="28"
        cy="61"
        rx="8"
        ry="3.6"
        fill="#4CAF70"
        transform="rotate(30 28 61)"
      />
      {Array.from({ length: 6 }, (_, i) => (
        <ellipse
          key={i}
          cx="20"
          cy="11"
          rx="5.4"
          ry="10"
          fill={petal}
          transform={`rotate(${i * 60} 20 20)`}
        />
      ))}
      <circle cx="20" cy="20" r="6.2" fill={center} />
      <circle cx="18.5" cy="18.6" r="1.6" fill="#fff" opacity="0.55" />
    </motion.svg>
  );
}
