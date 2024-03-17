"use client"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import type {NavLink} from "./layout"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {ChevronLeft, ChevronRight} from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

type SidebarProps = {
  links: NavLink[],
}
const Sidebar: React.FC<SidebarProps> = ({links}) => {

  const [isOpen, setIsOpen] = useState(true)

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}
      className={cn("w-0 hidden md:flex flex-row h-[75vh] gap-4 pt-8 sticky left-0 top-0 transition-all bg-green-100 ", isOpen && 'w-1/5 px-6 ')}
    >
      <CollapsibleContent
        className="flex flex-col gap-4 w-full"
      >
        {links.map((link) => (
          <Button asChild key={link.name}>
            <Link href={link.href} >
              {link.name}
            </Link>
          </Button>
        ))}
      </CollapsibleContent>
      <CollapsibleTrigger className="relative top-0 left-0 w-fit h-fit">
        <ChevronLeft className={cn("w-6 h-6 transition-all duration-300", isOpen ? 'rotate-180' : '')} />
      </CollapsibleTrigger>
    </Collapsible>
  )
}

export default Sidebar
