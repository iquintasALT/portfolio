"use client";

import { Provider } from "react-redux";

import ThemeToggle from "../components/ThemeToggle";
import Navbar from "../components/ui/Navbar/Navbar";
import StarBackground from "../components/ui/StarBackground";
import RadixToastProvider from "../components/ui/ToastProvider";
import { store } from "../store/store";

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
