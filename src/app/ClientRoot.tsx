'use client';

import ThemeToggle from "../components/ThemeToggle";
import Navbar from "../components/ui/Navbar/Navbar";
import StarBackground from "../components/ui/StarBackground";
import { Provider } from 'react-redux';
import { store } from '../store/store';
import RadixToastProvider from '../components/ui/ToastProvider';

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
