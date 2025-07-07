"use client";

import React from "react";
import * as Toast from "@radix-ui/react-toast";

export default function RadixToastProvider({ children }: { children: React.ReactNode }) {
  return (
    <Toast.Provider duration={4000} swipeDirection="right">
      {children}
      <Toast.Viewport className="fixed bottom-4 right-4 z-[9999] w-[360px] max-w-full outline-none" />
    </Toast.Provider>
  );
}
