"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"

interface HeroProps {
  mousePos: { x: number; y: number }
  scrollY: number
}

export default function HeroSection({ mousePos, scrollY }: HeroProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-start overflow-hidden pt-20 pb-32">
      {/* Background Layer Group */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div
          className="absolute inset-0 w-full h-full parallax-bg"
          style={{
            backgroundImage: "url(/images/owner2.jpeg)",
            backgroundSize: "cover",
            backgroundPosition: "center 30%",
            backgroundAttachment: "fixed",
            filter: "blur(8px) brightness(0.4)",
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/98 via-slate-950/80 to-slate-950/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/30 to-slate-950/90" />

        {/* Animated glow orbs - restricted to background */}
        <div
          className="absolute w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] parallax-bg"
          style={{
            left: "-5%",
            top: "15%",
            animationDelay: "-2s"
          }}
        />
        <div
          className="absolute w-96 h-96 bg-purple-500/5 rounded-full blur-[100px] parallax-bg"
          style={{
            right: "0%",
            bottom: "5%",
            animationDelay: "-5s"
          }}
        />
      </div>

      {/* Foreground Layer - Pure Sharp Text */}
      <div className="relative z-50 px-6 sm:px-8 md:px-16 lg:px-24 max-w-4xl">
        <div className="mb-8">
          <h1
            className={`text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-none mb-4 select-none ${isLoaded ? "animate-hero-name hero-name-hover" : "opacity-0"}`}
            style={{
              background: "linear-gradient(to right, #3b82f6, #06b6d4, #a855f7)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Harshit Raj
          </h1>
        </div>

        <div
          className={`mb-10 transition-all duration-1000 delay-500 ${isLoaded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-5"}`}
        >
          <p className="text-lg sm:text-xl md:text-2xl font-medium text-white/90 leading-tight tracking-tight drop-shadow-md">
            CSE Student @ BMSIT <span className="text-cyan-400 mx-2">|</span> C++ & DSA <span className="text-cyan-400 mx-2">|</span> Full-Stack Builder
          </p>
        </div>

        <p
          className={`text-base sm:text-lg text-slate-200 mb-14 leading-relaxed max-w-2xl font-normal drop-shadow-sm transition-all duration-1000 delay-700 ${isLoaded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-5"}`}
        >
          Grinding through DSA, learning web development, and building at hackathons.
          Every line of code is a step toward mastery.
        </p>

        {/* Profile Image - Simplified for clarity */}
        <div
          className={`mb-14 flex justify-start transition-all duration-1000 delay-[900ms] ${isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
        >
          <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full border-4 border-white/10 shadow-2xl overflow-hidden">
            <Image
              src="/images/owner2.jpeg"
              alt="Harshit Raj"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        <div
          className={`flex flex-wrap gap-5 transition-all duration-1000 delay-[1100ms] ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
        >
          <button
            onClick={() => {
              const element = document.getElementById("projects")
              element?.scrollIntoView({ behavior: "smooth" })
            }}
            className="px-10 py-4 bg-cyan-500 text-slate-950 font-bold rounded-lg shadow-xl w-full sm:w-auto btn-hover-lift"
          >
            Explore Work
          </button>

          <Link href="/connect">
            <button
              className="px-10 py-4 border-2 border-white/20 text-white font-bold rounded-lg transition-all duration-200 shadow-lg w-full sm:w-auto btn-hover-lift"
            >
              Let's Connect
            </button>
          </Link>
        </div>
      </div>

      {/* Floating scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-6 sm:left-8 md:left-16 lg:left-24 z-50 pointer-events-none"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-white/20 rounded-full flex items-start justify-center p-1">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 bg-white/60 rounded-full"
          />
        </div>
      </motion.div>
    </section>
  )
}
