import ThemeToggle from "~/components/ThemeToggle";

export function meta() {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* Theme toggle */}
      <ThemeToggle />
      {/* Background effects */}
      {/* Navbar */}
      {/* Main content */}
      {/* Footer */}
    </div>
  );
}
