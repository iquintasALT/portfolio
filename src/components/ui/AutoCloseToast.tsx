import { useEffect } from "react";

interface AutoCloseToastProps {
  setOpen: (open: boolean) => void;
  duration?: number;
}

export default function AutoCloseToast({ setOpen, duration = 3500 }: AutoCloseToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => setOpen(false), duration);
    return () => clearTimeout(timer);
  }, [setOpen, duration]);
  return null;
}
