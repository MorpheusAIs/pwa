import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import type {NavLink} from "./layout"
import {Menu} from "lucide-react"

interface HeaderProps {
  links: NavLink[]
}

const Header: React.FC<HeaderProps> = ({links}) => {
  return (
    <header id="header" className="px-4 py-4 lg:px-8 lg:py-6 flex justify-between">
      <p>Morpheus</p>
      <Sheet >
        <SheetTrigger asChild className="md:hidden">
          <Button variant="outline" >
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="md:hidden">
          <SheetHeader>
            <SheetTitle>Sidebar</SheetTitle>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            {links.map((link) => (
              <SheetClose asChild key={link.name}>
                <Button asChild>
                  <Link href={link.href} >
                    {link.name}
                  </Link>
                </Button>
              </SheetClose>
            ))}
          </div>
          <SheetFooter>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </header>
  )
}

export default Header

