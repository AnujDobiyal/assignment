"use client";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";

//a fixed component for outside click div
export const Modal = ({ children }: { children: React.ReactNode }) => {
  //checks for document
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;

  //directly display div on document.body
  return createPortal(
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-center">
      {children}
    </div>,
    document.body,
  );
};