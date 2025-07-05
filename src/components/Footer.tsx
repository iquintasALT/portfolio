import { ChevronUp } from "lucide-react";

const Footer = () => {
  return (
    <footer
      className="py-8 bg-card relative border-t border-border mt-12 pt-8 flex flex-wrap 
    justify-center items-center"
    >
      <p className="text-sm text-muted-foreground">
        {" "}
        &copy; {new Date().getFullYear()} Made by Iago. All rights reserved.
      </p>

      <a
        href="#me"
        className="p-2 rounded-full bg-primary/10 hover:bg_primary transition-colors"
      >
        <ChevronUp></ChevronUp>
      </a>
    </footer>
  );
};

export default Footer;
