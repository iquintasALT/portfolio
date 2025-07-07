import React from "react";
import Link from "next/link";
import type { NavItem } from "~/components/ui/Navbar/navItems";

interface DesktopNavProps {
  navItems: NavItem[];
}

const DesktopNav: React.FC<DesktopNavProps> = React.memo(function DesktopNav({ navItems }) {
  return (
    <div className="hidden md:flex space-x-8">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="text-foreground/80 hover:text-primary transition-colors duration-300"
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
});

export default DesktopNav;
