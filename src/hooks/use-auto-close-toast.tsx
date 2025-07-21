import { useEffect } from "react";

export function useAutoCloseToast(setOpen: (open: boolean) => void, duration = 3500) {
  useEffect(() => {
    const timer = setTimeout(() => setOpen(false), duration);
    return () => clearTimeout(timer);
  }, [setOpen, duration]);
}
