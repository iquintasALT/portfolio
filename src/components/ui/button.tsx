import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/helpers";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-indigo-600 text-zinc-100 shadow hover:bg-indigo-700",
        destructive: "bg-red-600 text-white shadow-sm hover:bg-red-700",
        outline: "border border-zinc-700 bg-zinc-900 shadow-sm hover:bg-zinc-800 hover:text-indigo-400",
        secondary:
          "border border-primary text-primary rounded-full px-6 py-2 bg-transparent hover:bg-primary/50 transition-colors duration-300",
        ghost: "hover:bg-zinc-800 hover:text-indigo-400",
        link: "text-indigo-500 underline-offset-4 hover:underline",
        gradient:
          "flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 py-2 px-6 font-semibold text-white shadow-lg transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-60 hover:from-indigo-600 hover:to-purple-700 hover:scale-[1.03]",
        star: "star-button",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    isLoading?: boolean;
    icon?: React.ReactNode;
    iconPosition?: "left" | "right";
  };

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, children, isLoading, icon, iconPosition = "left", ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }), "gap-2")} ref={ref} {...props}>
        {isLoading && (
          <svg
            className="animate-spin h-4 w-4 text-current"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
          </svg>
        )}
        {!isLoading && icon && iconPosition === "left" && <>{icon}</>}
        <>{children}</>
        {!isLoading && icon && iconPosition === "right" && <>{icon}</>}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
