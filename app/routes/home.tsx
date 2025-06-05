import StarBackground from "~/components/StarBackground";
import ThemeToggle from "~/components/ThemeToggle";
import Navbar from "~/components/ui/Navbar/Navbar";

export function meta() {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Theme toggle */}
      <ThemeToggle />
      {/* Background effects */}
      <StarBackground/>
      {/* Navbar */}
      <Navbar/>
      {/* Main content */}
      {/* Footer */}
    </div>
  );
}
