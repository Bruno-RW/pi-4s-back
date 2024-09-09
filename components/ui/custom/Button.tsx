import { cva, VariantProps } from "class-variance-authority";
import React, { forwardRef } from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";

const buttonStyles = cva(
  "items-center h-10 p-2 rounded-lg transition-transform-opacity active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4",
  {
    variants: {
      variant: {
        default : "bg-border hover:text-black/90 dark:hover:text-white",
        red: "text-gray-50 outline-[#C43B3B] bg-red-600 dark:bg-red-500/80",
        blue: "text-gray-50 outline-[#0664CF] bg-blue-600 dark:bg-blue-500/80",
      },
      defaultVariants: { 
        variant: "default"
      }
    }
  }
);

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonStyles> {
  isLoading?: boolean;
  href?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  className,
  children,
  disabled,
  isLoading,
  href,
  variant="default",
  type = "button",
  ...props
}, ref) => {
  return (
    <>
      {href ? (
        <Link className={cn(buttonStyles({ variant }), isLoading && "active:scale-100 transition-none", className)} href={href}>
          <div className="flex items-center justify-center gap-x-2">
            {isLoading && (<div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white" />)}
            {children}
          </div>
        </Link>
      ) : (
        <button className={cn(buttonStyles({ variant }), isLoading && "active:scale-100 transition-none", className)}
          {...props}
          disabled={disabled || isLoading}
          ref={ref}
          type={type}
        >
          <div className="flex items-center justify-center gap-x-2">
            {isLoading && (<div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white" />)}
            {children}
          </div>
        </button>
      )}
    </>
  )
});

Button.displayName = "Button";
export default Button;