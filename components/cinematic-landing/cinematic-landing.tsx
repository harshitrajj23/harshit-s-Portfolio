"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import Lenis from "lenis"
import CanvasSequence from "./canvas-sequence"
import OverfadeText from "./overfade-text"

const SCROLL_HEIGHT_VH = 800

export default function CinematicLanding() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const tickingRef = useRef(false)
  const router = useRouter()

  // Initialize Lenis for buttery-smooth scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    return () => lenis.destroy()
  }, [])

  // Track scroll progress with rAF batching
  useEffect(() => {
    const handleScroll = () => {
      if (!tickingRef.current) {
        requestAnimationFrame(() => {
          const scrollTop = window.scrollY
          const maxScroll =
            document.documentElement.scrollHeight - window.innerHeight
          if (maxScroll > 0) {
            setScrollProgress(Math.min(scrollTop / maxScroll, 1))
          }
          tickingRef.current = false
        })
        tickingRef.current = true
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const showButton = scrollProgress > 0.88
  const showScrollHint = scrollProgress < 0.03

  const handleGetStarted = useCallback(() => {
    router.push("/portal")
  }, [router])

  return (
    <div
      ref={containerRef}
      className="relative bg-black"
      style={{ height: `${SCROLL_HEIGHT_VH}vh` }}
    >
      {/* Sticky viewport — everything is locked to screen while scrolling */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Canvas animation with subtle zoom */}
        <div
          className="absolute inset-0 transition-transform duration-[2000ms] ease-out"
          style={{
            transform: `scale(${1 + scrollProgress * 0.12})`,
            transformOrigin: "center center",
          }}
        >
          <CanvasSequence scrollProgress={scrollProgress} />
        </div>

        {/* Cinematic vignette overlay */}
        <div
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            background: `
              radial-gradient(ellipse 80% 70% at 50% 50%, transparent 30%, rgba(0,0,0,0.5) 70%, rgba(0,0,0,0.85) 100%),
              linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, transparent 20%, transparent 80%, rgba(0,0,0,0.4) 100%)
            `,
          }}
        />

        {/* Side gradient for text readability */}
        <div
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            background:
              "linear-gradient(to right, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.2) 30%, transparent 60%)",
          }}
        />

        {/* Overfade text with glassmorphism panels */}
        <OverfadeText scrollProgress={scrollProgress} />

        {/* Get Started button — appears at the end */}
        <AnimatePresence>
          {showButton && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 flex items-center justify-center z-30"
            >
              <button
                onClick={handleGetStarted}
                className="group relative px-14 py-5 rounded-full overflow-hidden cursor-pointer
                  bg-white/[0.07] backdrop-blur-2xl
                  border border-white/[0.15]
                  text-white text-lg font-medium tracking-[0.15em] uppercase
                  transition-all duration-700 ease-out
                  hover:scale-[1.06] hover:bg-white/[0.12] hover:border-white/[0.35]
                  hover:shadow-[0_0_80px_rgba(255,255,255,0.1),0_0_30px_rgba(6,182,212,0.08)]
                  active:scale-[0.98]"
              >
                <span className="relative z-10">Get Started</span>

                {/* Gradient underlay on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(6,182,212,0.12) 0%, rgba(147,51,234,0.12) 50%, rgba(6,182,212,0.12) 100%)",
                  }}
                />

                {/* Shimmer sweep */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Scroll indicator */}
        <AnimatePresence>
          {showScrollHint && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 1.5, duration: 1.2 }}
              className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-3"
            >
              <span className="text-white/20 text-[10px] tracking-[0.5em] uppercase font-light">
                Scroll to explore
              </span>

              {/* Mouse scroll icon */}
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 1.8,
                  ease: "easeInOut",
                }}
                className="w-5 h-8 rounded-full border border-white/15 flex items-start justify-center pt-2"
              >
                <motion.div
                  animate={{ opacity: [0.6, 0.2, 0.6], y: [0, 4, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.8,
                    ease: "easeInOut",
                  }}
                  className="w-[3px] h-[6px] rounded-full bg-white/40"
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Subtle ambient glow — top-right accent */}
        <div
          className="absolute -top-32 -right-32 w-96 h-96 rounded-full pointer-events-none z-[5] opacity-20 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(6,182,212,0.3) 0%, transparent 70%)",
          }}
        />

        {/* Bottom-left accent glow */}
        <div
          className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full pointer-events-none z-[5] opacity-15 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(147,51,234,0.25) 0%, transparent 70%)",
          }}
        />

        {/* Noise overlay for cinematic grain */}
        <div className="noise-overlay !z-40 !opacity-[0.03]" />
      </div>
    </div>
  )
}
