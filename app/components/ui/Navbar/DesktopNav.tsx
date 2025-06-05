import React from "react";

import type { NavItem } from "../navItems";

interface DesktopNavProps {
  navItems: NavItem[];
}

const DesktopNav: React.FC<DesktopNavProps> = React.memo(({ navItems }) => (
  <div className="hidden md:flex space-x-8">
    {navItems.map((item) => (
      <a
        key={item.href}
        href={item.href}
        className="text-foreground/80 hover:text-primary transition-colors duration-300"
      >
        {item.name}
      </a>
    ))}
  </div>
));

export default DesktopNav;
