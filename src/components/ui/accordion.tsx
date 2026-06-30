"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { ChevronDown } from "lucide-react"

interface AccordionItem {
  title: string
  content: string
}

function Accordion({
  items,
  className,
}: {
  items: AccordionItem[]
  className?: string
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className={cn("divide-y divide-border rounded-xl border", className)}>
      {items.map((item, index) => (
        <div key={index}>
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="flex w-full items-center justify-between px-6 py-4 text-left text-sm font-medium transition-colors hover:bg-muted/50"
          >
            {item.title}
            <ChevronDown
              className={cn(
                "size-4 shrink-0 text-muted-foreground transition-transform duration-200",
                openIndex === index && "rotate-180"
              )}
            />
          </button>
          <div
            className={cn(
              "overflow-hidden transition-all duration-200",
              openIndex === index ? "max-h-96" : "max-h-0"
            )}
          >
            <p className="px-6 pb-4 text-sm text-muted-foreground">
              {item.content}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

export { Accordion }
export type { AccordionItem }
