import { cn } from "@/lib/utils";

export const Card = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return <div className={className}>{children}</div>;
};

export const CardTitle = ({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string
}) => {
  return (
    <h1 className={cn("bg-white inline-block mb-1 py-0.5 px-2 tracking-wide text-sm font-bold rounded-sm shadow-sm", className)}>
      {children}
    </h1>
  );
};

export const CardContent = ({ children, className }: { children: React.ReactNode, className?: string}) => {
  return (
    <div className={cn("flex gap-2 bg-white shadow-sm rounded-md p-2", className)}>
      {children}
    </div>
  );
};