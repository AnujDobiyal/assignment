"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import Link from "next/link";
import React from "react";

const LinkedButton = ({
  href,
  scale,
  duration,
  ease,
  className,
  children,
}: {
  href: string;
  scale?: number;
  duration?: number;
  ease?: "easeIn" | "easeOut" | "easeInOut";
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <motion.div
      whileHover={{ scale: scale ? scale : 1.08 }}
      transition={{
        duration: duration ? duration : 0.15,
        ease: ease ? ease : "easeIn",
      }}
      className="inline-block"
    >
      <Link
        href={href}
        className={cn(
          "inline-block bg-blue-600 hover:bg-blue-700 text-[10px] text-white px-4 py-2 font-bold tracking-tight rounded-sm cursor-pointer shadow-sm",
          className, 
        )}
      >
        {children}
      </Link>
    </motion.div>
  );
};

export { LinkedButton };
