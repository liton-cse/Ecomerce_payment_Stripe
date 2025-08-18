import type React from "react"

interface AvatarProps {
  className?: string
  children: React.ReactNode
}

export function Avatar({ className = "", children }: AvatarProps) {
  return <div className={`relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full ${className}`}>{children}</div>
}

export function AvatarImage({ src, alt }: { src?: string; alt?: string }) {
  return (
    <img
      className="aspect-square h-full w-full"
      src={src || "/placeholder.svg"}
      alt={alt}
      onError={(e) => {
        e.currentTarget.style.display = "none"
      }}
    />
  )
}

export function AvatarFallback({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full w-full items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
      {children}
    </div>
  )
}
