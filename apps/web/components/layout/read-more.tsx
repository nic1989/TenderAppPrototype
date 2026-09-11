"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ReadMoreProps extends React.HTMLAttributes<HTMLParagraphElement> {
  text: string
  characterLimit?: number
  className?: string
}

export function ReadMore({ text, characterLimit = 150, className = '', ...props }: ReadMoreProps) {
  const [isExpanded, setIsExpanded] = React.useState(false)

  // Explicitly check text length before truncating
  const shouldTruncate = text.length > characterLimit
  
  const displayedText = isExpanded || !shouldTruncate 
    ? text 
    : `${text.slice(0, characterLimit)}...`

  return (
    <div className="space-y-2">
      <p className={`text-sm leading-relaxed ${className}`} {...props}>
        {displayedText}
      </p>
      {shouldTruncate && (
        <Button
          variant="link"
          size="sm"
          className="h-auto p-0 text-primary font-bold hover:no-underline cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? "Read less" : "Read more"}
        </Button>
      )}
    </div>
  )
}
