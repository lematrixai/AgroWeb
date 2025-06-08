'use client'

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface AnimatedCardProps {
  title?: string
  description?: string
  children?: React.ReactNode
  footer?: React.ReactNode
  className?: string
  delay?: number
  onClick?: () => void
}

export function AnimatedCard({
  title,
  description,
  children,
  footer,
  className,
  delay = 0,
  onClick
}: AnimatedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.02 }}
      onClick={onClick}
      className={cn("cursor-pointer", className)}
    >
      <Card className="h-full">
        {(title || description) && (
          <CardHeader>
            {title && <CardTitle>{title}</CardTitle>}
            {description && <CardDescription>{description}</CardDescription>}
          </CardHeader>
        )}
        <CardContent>{children}</CardContent>
        {footer && <CardFooter>{footer}</CardFooter>}
      </Card>
    </motion.div>
  )
} 