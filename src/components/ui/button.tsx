import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-semibold ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 transform hover:scale-105 active:scale-95",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-medium hover:shadow-large hover:from-blue-700 hover:to-purple-700",
        destructive:
          "bg-gradient-to-r from-red-500 to-pink-600 text-white shadow-medium hover:shadow-large hover:from-red-600 hover:to-pink-700",
        outline:
          "border-2 border-slate-300 dark:border-slate-700 bg-transparent hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-500 dark:hover:border-blue-400 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400",
        secondary:
          "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-700 shadow-soft hover:shadow-medium",
        ghost: "hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400",
        link: "text-blue-600 dark:text-blue-400 underline-offset-4 hover:underline",
        success: "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-medium hover:shadow-large hover:from-green-600 hover:to-emerald-700",
        warning: "bg-gradient-to-r from-yellow-500 to-orange-600 text-white shadow-medium hover:shadow-large hover:from-yellow-600 hover:to-orange-700",
      },
      size: {
        default: "h-11 px-6 py-3",
        sm: "h-9 rounded-lg px-4",
        lg: "h-12 rounded-xl px-8 text-base",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }