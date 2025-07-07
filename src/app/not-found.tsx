import Link from "next/link";
import texts from "@content/texts.json";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center bg-gradient-to-b from-zinc-950/80 to-zinc-900/60 dark:from-zinc-900/90 dark:to-zinc-950/80">
      <div className="max-w-xl w-full p-8 rounded-2xl shadow-2xl border border-zinc-800/60 bg-zinc-900/80 dark:bg-zinc-950/80">
        <h1 className="text-5xl font-extrabold text-indigo-400 mb-4 tracking-tight drop-shadow-lg">
          {texts.notFound.title}
        </h1>
        <h2 className="text-2xl font-semibold text-zinc-100 mb-2">{texts.notFound.subtitle}</h2>
        <p className="text-zinc-400 mb-8">{texts.notFound.description}</p>
        <Link href="/" className="star-button inline-flex items-center gap-2">
          <Home className="w-5 h-5" />
          {texts.notFound.cta}
        </Link>
      </div>
    </main>
  );
}
