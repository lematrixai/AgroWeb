"use client";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export const BackgroundBeams = ({ className }: { className?: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = container.getBoundingClientRect();
      const x = (clientX - left) / width;
      const y = (clientY - top) / height;

      container.style.setProperty("--x", x.toString());
      container.style.setProperty("--y", y.toString());
    };

    container.addEventListener("mousemove", handleMouseMove);
    return () => container.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        "fixed inset-0 overflow-hidden pointer-events-none",
        className
      )}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_calc(var(--x,0.5)*100%)_calc(var(--y,0.5)*100%),rgba(59,130,246,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_calc(var(--x,0.5)*100%)_calc(var(--y,0.5)*100%),rgba(59,130,246,0.05),transparent_50%)] animate-pulse" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_calc(var(--x,0.5)*100%)_calc(var(--y,0.5)*100%),rgba(59,130,246,0.02),transparent_50%)] animate-pulse [animation-delay:0.5s]" />
    </div>
  );
}; 