"use client"

import { motion } from "framer-motion"
import GlassPanel from "./glass-panel"

const TEXTS = [
  { top: "Exploring", bottom: "JavaScript", chapter: "01" },
  { top: "Mastering", bottom: "DSA", chapter: "02" },
  { top: "Building with", bottom: "Blockchain", chapter: "03" },
  { top: "Creating", bottom: "AI Solutions", chapter: "04" },
]

// Each text segment occupies a portion of total scroll (0 to ~0.85)
// With overlapping fade zones for the "overfade" effect
const SEGMENTS = [
  { start: 0.04, fadeIn: 0.10, fadeOut: 0.20, end: 0.26 },
  { start: 0.24, fadeIn: 0.30, fadeOut: 0.40, end: 0.46 },
  { start: 0.44, fadeIn: 0.50, fadeOut: 0.60, end: 0.66 },
  { start: 0.62, fadeIn: 0.68, fadeOut: 0.76, end: 0.82 },
]

function getTextState(
  progress: number,
  seg: (typeof SEGMENTS)[0]
): { opacity: number; y: number } {
  if (progress < seg.start || progress > seg.end) {
    return { opacity: 0, y: 50 }
  }

  // Fade in
  if (progress < seg.fadeIn) {
    const t = (progress - seg.start) / (seg.fadeIn - seg.start)
    const eased = t * t * (3 - 2 * t) // smoothstep
    return { opacity: eased, y: 50 * (1 - eased) }
  }

  // Fully visible
  if (progress <= seg.fadeOut) {
    return { opacity: 1, y: 0 }
  }

  // Fade out
  const t = (progress - seg.fadeOut) / (seg.end - seg.fadeOut)
  const eased = t * t * (3 - 2 * t)
  return { opacity: 1 - eased, y: -40 * eased }
}

interface OverfadeTextProps {
  scrollProgress: number
}

export default function OverfadeText({ scrollProgress }: OverfadeTextProps) {
  // Parallax: text drifts slightly upward as scroll progresses
  const parallaxY = scrollProgress * -30

  return (
    <div
      className="absolute inset-0 flex items-center pointer-events-none z-20"
      style={{ transform: `translateY(${parallaxY}px)` }}
    >
      <div className="ml-[6%] sm:ml-[8%] md:ml-[12%] lg:ml-[15%] relative">
        {TEXTS.map((text, i) => {
          const state = getTextState(scrollProgress, SEGMENTS[i])

          if (state.opacity < 0.01) return null

          return (
            <motion.div
              key={text.chapter}
              className="absolute left-0 top-0"
              animate={{ opacity: state.opacity, y: state.y }}
              transition={{ duration: 0.08, ease: "linear" }}
            >
              <GlassPanel className="relative px-8 py-7 sm:px-10 sm:py-8 md:px-12 md:py-10 min-w-[280px] sm:min-w-[340px] md:min-w-[420px]">
                {/* Chapter number */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-6 h-px bg-gradient-to-r from-white/30 to-transparent" />
                  <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.4em] text-white/25 font-light">
                    Chapter {text.chapter}
                  </span>
                </div>

                {/* Main text */}
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.1]">
                  <span className="block text-white/90">{text.top}</span>
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white/80 via-white/60 to-white/40">
                    {text.bottom}
                  </span>
                </h2>

                {/* Subtle accent line */}
                <div className="mt-5 w-12 h-px bg-gradient-to-r from-cyan-400/30 to-transparent" />
              </GlassPanel>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
