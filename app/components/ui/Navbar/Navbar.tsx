import { Menu, X } from "lucide-react";
import React, { useEffect, useState } from "react";

import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import { navItems } from "./navItems";

import { cn } from "~/lib/helpers";

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleScroll = () => {
      setIsScrolled((globalThis as any).window.scrollY > 10);
    };
    (globalThis as any).window.addEventListener("scroll", handleScroll);
    return () => (globalThis as any).window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed w-full z-40 transition-all duration-300",
        isScrolled ? "py-3 bg-backgorund/80 backdrop-blur-md shadow-xs" : "py-5"
      )}
    >
      <div className="container flex items-center justify-between">
        <a
          className="text-xl font-bold text-primary flex items-center"
          href="#me"
        >
          <span className="relative z-10">
            <span className="text-glow text-foreground"> iquintasALT </span> Portfolio
          </span>
        </a>
        <DesktopNav navItems={navItems} />
        <button
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="md:hidden p-2 text-foreground z-50"
          aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <MobileNav navItems={navItems} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      </div>
    </nav>
  );
};

export default Navbar;
