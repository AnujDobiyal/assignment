import { cn } from "@/lib/utils";
import React from "react";

const Container = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("h-screen max-w-7xl  mx-auto", className)}>
        {children}
    </div>
  );
};

export default Container;
