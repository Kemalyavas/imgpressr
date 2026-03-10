"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Sun, Moon, Menu } from "lucide-react"
import { cn } from "@/lib/utils"

const NAV_LINKS = [
  { href: "/png-to-jpg", label: "PNG to JPG" },
  { href: "/jpg-to-webp", label: "JPG to WebP" },
  { href: "/png-to-webp", label: "PNG to WebP" },
  { href: "/webp-to-jpg", label: "WebP to JPG" },
  { href: "/blog", label: "Blog" },
]

function ThemeToggle() {
  const { setTheme, theme } = useTheme()
  return (
    <Button
      variant="ghost"
      size="icon"
      className="size-9 relative"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label="Toggle theme"
    >
      <Sun className="size-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute size-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
  )
}

export function Navbar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => setOpen(false), [pathname])

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2.5">
            <Image
              src="/logo-light.jpeg"
              alt="ImgPressr"
              width={32}
              height={32}
              className="h-8 w-8 rounded-lg dark:hidden"
            />
            <Image
              src="/logo-dark.jpeg"
              alt="ImgPressr"
              width={32}
              height={32}
              className="hidden h-8 w-8 rounded-lg dark:block"
            />
            <span className="text-base font-bold text-foreground">ImgPressr</span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-semibold transition-colors hover:bg-secondary hover:text-foreground",
                  pathname === link.href || (link.href === "/blog" && pathname.startsWith("/blog"))
                    ? "bg-secondary text-foreground"
                    : "text-muted-foreground"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-1">
          <ThemeToggle />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="size-8">
                <Menu className="size-4" />
                <span className="sr-only">Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[260px]">
              <SheetHeader>
                <SheetTitle className="text-left">Menu</SheetTitle>
              </SheetHeader>
              <div className="mt-6 flex flex-col gap-1">
                <Link
                  href="/"
                  className={cn(
                    "rounded-md px-3 py-2 text-sm transition-colors hover:bg-secondary",
                    pathname === "/" ? "bg-secondary font-medium" : "text-foreground"
                  )}
                >
                  Home
                </Link>
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "rounded-md px-3 py-2 text-sm transition-colors hover:bg-secondary",
                      pathname === link.href || (link.href === "/blog" && pathname.startsWith("/blog"))
                        ? "bg-secondary font-medium"
                        : "text-foreground"
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
