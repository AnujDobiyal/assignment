import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { ChevronRight } from "./svgs";

const Breadcrumb = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <nav className={cn("flex items-center gap-0.5", className)}>{children}</nav>
  );
};

const BreadcrumbLink = ({
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
        "text-sm font-medium text-neutral-500 hover:text-blue-500",
        className,
      )}
    >
      {children}
    </Link>
  );
};

const BreadcrumbSepater = () => {
  return <ChevronRight className="p-0.5 stroke-neutral-500" />;
};

const BreadcrumbPage = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <span className={cn("text-sm font-bold tracking-wide text-neutral-800", className)}>
      {children}
    </span>
  );
};

export { Breadcrumb, BreadcrumbLink, BreadcrumbSepater, BreadcrumbPage };
