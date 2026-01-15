"use client"

import { useReveal } from "@/hooks/use-reveal"

interface FloatingCardsProps {
  mousePos: { x: number; y: number }
  scrollY: number
}

interface Card {
  id: number
  title: string
  description: string
  icon: string
  color: string
}

const cards: Card[] = [
  {
    id: 1,
    title: "Hackathon Wins",
    description: "Built 5+ projects in high-pressure competitions",
    icon: "🚀",
    color: "from-cyan-500/20 to-blue-500/20",
  },
  {
    id: 2,
    title: "Full-Stack Dev",
    description: "React, Next.js, TypeScript, and modern tooling",
    icon: "⚡",
    color: "from-purple-500/20 to-pink-500/20",
  },
  {
    id: 3,
    title: "Problem Solver",
    description: "DSA mastery, debugging obsessed, algorithm nerd",
    icon: "🧠",
    color: "from-blue-500/20 to-cyan-500/20",
  },
  {
    id: 4,
    title: "UI/UX Focused",
    description: "Animations, accessibility, and user-centric design",
    icon: "✨",
    color: "from-pink-500/20 to-purple-500/20",
  },
]

export default function FloatingCards({ mousePos, scrollY }: FloatingCardsProps) {
  const containerRef = useReveal()

  return (
    <section className="relative py-32 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto" ref={containerRef}>
        <div className="reveal-on-scroll text-center mb-20">
          <h2 className="text-4xl lg:text-5xl font-bold text-white">
            My <span className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">Essence</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, idx) => (
            <div
              key={card.id}
              className="reveal-on-scroll"
              style={{ transitionDelay: `${idx * 150}ms` }}
            >
              <div
                className={`group relative p-6 rounded-2xl backdrop-blur-md border border-white/10 bg-gradient-to-br ${card.color} hover:border-cyan-500/50 transition-all duration-500 overflow-hidden cursor-pointer shadow-[0_0_20px_rgba(0,0,0,0.3)] hover:-translate-y-3`}
              >
                {/* Holographic Glint */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />

                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10 transition-transform duration-500 group-hover:translate-z-5">
                  <div className="text-4xl mb-4 transform group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500">
                    {card.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed">{card.description}</p>
                </div>

                {/* Constant floating glow */}
                <div className="absolute inset-0 bg-gradient-radial from-cyan-500/5 to-transparent rounded-2xl opacity-50 pointer-events-none" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
