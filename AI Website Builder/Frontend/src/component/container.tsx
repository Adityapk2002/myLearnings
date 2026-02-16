import React from "react";
import { cn } from "../lib/utils";

const Container = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("max-w-5xl mx-auto relative z-10 ", className)}>
      {children}
    </div>
  );
};

export default Container;
