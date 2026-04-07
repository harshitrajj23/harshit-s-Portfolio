"use client"

import type React from "react"

interface GlassPanelProps {
  children: React.ReactNode
  className?: string
}

export default function GlassPanel({ children, className = "" }: GlassPanelProps) {
  return (
    <div
      className={`
        bg-white/[0.06] backdrop-blur-xl
        border border-white/[0.1]
        rounded-2xl
        shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.08)]
        ${className}
      `}
    >
      {/* Top highlight line for depth */}
      <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-white/[0.12] to-transparent" />
      {children}
    </div>
  )
}
