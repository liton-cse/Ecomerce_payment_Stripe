import type React from "react"

interface BadgeProps {
  variant?: "default" | "secondary" | "outline"
  className?: string
  children: React.ReactNode
}

export function Badge({ variant = "default", className = "", children }: BadgeProps) {
  const variants = {
    default:
      "bg-slate-900 text-slate-50 hover:bg-slate-900/80 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/80",
    secondary:
      "bg-slate-100 text-slate-900 hover:bg-slate-100/80 dark:bg-slate-800 dark:text-slate-50 dark:hover:bg-slate-800/80",
    outline: "text-slate-950 dark:text-slate-50 border border-slate-200 dark:border-slate-800",
  }

  return (
    <div
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${variants[variant]} ${className}`}
    >
      {children}
    </div>
  )
}
