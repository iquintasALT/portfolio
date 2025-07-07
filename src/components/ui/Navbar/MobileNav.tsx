import React from "react";
import Link from "next/link";
import { cn } from "~/lib/helpers";

import type { NavItem } from "@/components/ui/Navbar/navItems";

interface MobileNavProps {
  navItems: NavItem[];
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const MobileNav: React.FC<MobileNavProps> = React.memo(function MobileNav({ navItems, isMenuOpen, setIsMenuOpen }) {
  return (
    <div
      className={cn(
        "fixed inset-0 bg-background/95 backdrop-blur-md z-40 flex flex-col items-center justify-center",
        "transition-all duration-300 md:hidden",
        isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      )}
    >
      <div className="flex flex-col space-y-8 text-xl">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="text-foreground/80 hover:text-primary transition-colors duration-300"
            onClick={() => setIsMenuOpen(false)}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
});

export default MobileNav;
