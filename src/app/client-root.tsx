"use client";

import { Provider } from "react-redux";

import RadixToastProvider from "@/components/providers/toast-provider";
import StarBackground from "@/components/ui/star-background";
import Navbar from "@/features/navigation/components/navbar";
import ThemeToggle from "@/features/theme/components/theme-toggle";
import { store } from "@/stores/store";

export default function ClientRoot({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <RadixToastProvider>
        {/* Theme toggle */}
        <ThemeToggle />
        {/* Background effects */}
        <StarBackground />
        {/* Navbar */}
        <Navbar />
        {children}
      </RadixToastProvider>
    </Provider>
  );
}
