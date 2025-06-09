"use client";
import { cn } from "@/lib/utils";
import { motion, stagger, useAnimate, useInView } from "framer-motion";
import { useEffect } from "react";

export const TypewriterEffect = ({
  words,
  className,
}: {
  words: {
    text: string;
    className?: string;
  }[];
  className?: string;
}) => {
  const [scope, animate] = useAnimate();
  const isInView = useInView(scope);

  useEffect(() => {
    if (isInView) {
      animate(
        "span",
        {
          opacity: 1,
        },
        {
          duration: 0.3,
          delay: stagger(0.1),
        }
      );
    }
  }, [isInView, animate]);

  return (
    <motion.div
      ref={scope}
      className={cn("text-base sm:text-xl md:text-3xl font-bold", className)}
    >
      {words.map((word, idx) => {
        return (
          <motion.span
            key={`word-${idx}`}
            className={cn("opacity-0 inline-block", word.className)}
          >
            {word.text.split("").map((char, charIdx) => (
              <motion.span
                key={`char-${charIdx}`}
                className="inline-block"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: charIdx * 0.05 }}
              >
                {char}
              </motion.span>
            ))}
            &nbsp;
          </motion.span>
        );
      })}
    </motion.div>
  );
}; 