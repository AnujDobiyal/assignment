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
const Button = ({
  onclick,
  scale,
  duration,
  ease,
  className,
  children,
}: {
  onclick: () => void;
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
      <button
        onClick={onclick}
        className={cn(
          "inline-block bg-blue-600 hover:bg-blue-700 text-[10px] text-white px-4 py-2 font-bold tracking-tight rounded-sm cursor-pointer shadow-sm",
          className,
        )}
      >
        {children}
      </button>
    </motion.div>
  );
};

const LinkedPlaneButton = ({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <Link
      href={href}
      className={cn(
        "w-full flex items-end gap-2 px-3 py-3 border border-neutral-200 shadow-xs rounded-lg font-bold text-neutral-700 hover:border-blue-500 hover:text-blue-500 cursor-pointer ",
        className,
      )}
    >
      {children}
    </Link>
  );
};

const PlaneButton = ({
  onclick,
  children,
  className,
}: {
  onclick?: () => void;
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <button
      onClick={onclick}
      className={cn(
        "flex items-center gap-1 px-3 py-2 border border-neutral-700 text-sm shadow-xs rounded-lg font-bold text-neutral-700 hover:border-blue-500 hover:text-blue-500 cursor-pointer ",
        className,
      )}
    >
      {children}
    </button>
  );
};

export {Button, LinkedButton, LinkedPlaneButton, PlaneButton };
