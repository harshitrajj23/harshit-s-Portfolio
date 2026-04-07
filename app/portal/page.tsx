"use client"

import { useEffect, useState } from "react"
import HeroSection from "@/components/hero-section"
import FloatingCards from "@/components/floating-cards"
import ProjectShowcase from "@/components/project-showcase"
import SkillsSection from "@/components/skills-section"
import FooterSection from "@/components/footer-section"
import CustomCursor from "@/components/custom-cursor"

export default function Home() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      })
    }

    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <main className="relative w-full min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-x-hidden">
      {/* Animated gradient background */}
      <div className="fixed inset-0 opacity-30 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-radial from-cyan-500/20 via-transparent to-transparent blur-3xl" />
        <div className="absolute inset-0 bg-gradient-radial from-purple-500/20 via-transparent to-transparent blur-3xl transform translate-x-1/3 translate-y-1/3" />
      </div>

      <HeroSection mousePos={mousePos} scrollY={scrollY} />
      <FloatingCards mousePos={mousePos} scrollY={scrollY} />
      <ProjectShowcase scrollY={scrollY} />
      <SkillsSection scrollY={scrollY} />
      <FooterSection />

      {/* Global Interactive Cursor */}
      <CustomCursor />

      {/* Global Noise Overlay */}
      <div className="noise-overlay" />
    </main>
  )
}
