import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transform hover:scale-105",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-soft hover:shadow-medium",
        secondary:
          "border-transparent bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-700",
        destructive:
          "border-transparent bg-gradient-to-r from-red-500 to-pink-600 text-white shadow-soft hover:shadow-medium",
        outline: "border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800",
        success:
          "border-transparent bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-soft hover:shadow-medium",
        warning:
          "border-transparent bg-gradient-to-r from-yellow-500 to-orange-600 text-white shadow-soft hover:shadow-medium",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }