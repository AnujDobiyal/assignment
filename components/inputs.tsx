import { cn } from "@/lib/utils";
import React from "react";

const Checkbox = ({
  check,
  handleChange,
  children,
  className,
}: {
  check: boolean;
  handleChange: () => void;
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <label
      className={cn(
        "text-sm flex items-center gap-1 border rounded-md px-2 py-2 border-neutral-200 hover:border-neutral-300 shadow-sm has-checked:border-blue-500 text-neutral-500 hover:text-neutral-700 has-checked:text-blue-500 cursor-pointer",
        className,
      )}
    >
      <input
        type="checkbox"
        checked={check}
        onChange={handleChange}
        className=" "
      />
      {children}
    </label>
  );
};

export  {Checkbox};
