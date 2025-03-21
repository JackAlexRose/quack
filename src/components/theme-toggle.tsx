"use client";

import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  activeScaleClass,
  hoverScaleClass,
  scaleTransitionClass,
} from "@/lib/utils";
import { cn } from "@/lib/utils";
import Image from "next/image";

export function ThemeToggle() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className={cn(
            "relative",
            scaleTransitionClass,
            hoverScaleClass,
            activeScaleClass
          )}
        >
          <Image
            src="/favicon.ico"
            alt="Theme toggle light"
            width={20}
            height={20}
            className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 invert dark:invert-0"
          />
          <Image
            src="/favicon.ico"
            alt="Theme toggle dark"
            width={20}
            height={20}
            className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 invert dark:invert-0"
          />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
