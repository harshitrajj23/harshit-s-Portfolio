"use client"

import { useReveal } from "@/hooks/use-reveal"

interface SkillsSectionProps {
  scrollY: number
}

const skillCategories = [
  {
    category: "Core Languages",
    skills: ["C++", "JavaScript", "HTML", "CSS"],
    color: "from-cyan-500 to-blue-500",
  },
  {
    category: "Specialization",
    skills: ["Data Structures", "Algorithms", "DSA", "Competitive Programming"],
    color: "from-purple-500 to-pink-500",
  },
  {
    category: "Web & Databases",
    skills: ["Next.js (Basic)", "Supabase", "GitHub", "Learning"],
    color: "from-blue-500 to-cyan-500",
  },
]

export default function SkillsSection({ scrollY }: SkillsSectionProps) {
  const containerRef = useReveal()

  return (
    <section className="relative py-32 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto" ref={containerRef}>
        <div className="reveal-on-scroll text-center mb-20">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-white">
            Skills &{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">Toolbox</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Always learning, always building. This is where I'm at right now—honest and growing every day.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skillCategories.map((cat, idx) => (
            <div
              key={cat.category}
              className="reveal-on-scroll"
              style={{ transitionDelay: `${idx * 150}ms` }}
            >
              <div className="group relative p-8 rounded-2xl backdrop-blur-md border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] hover:border-white/30 transition-all duration-300 overflow-hidden hover:-translate-y-2">
                {/* Background gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                />

                {/* Border glow */}
                <div
                  className={`absolute -inset-0.5 bg-gradient-to-br ${cat.color} opacity-0 group-hover:opacity-15 rounded-2xl blur transition-opacity duration-300 -z-10`}
                />

                <div className="relative z-10">
                  <h3 className={`text-2xl font-bold mb-6 bg-gradient-to-r ${cat.color} bg-clip-text text-transparent`}>
                    {cat.category}
                  </h3>

                  <div className="flex flex-wrap gap-3">
                    {cat.skills.map((skill) => (
                      <span
                        key={skill}
                        className={`px-4 py-2 rounded-lg text-sm font-medium bg-white/5 border border-white/10 hover:border-cyan-500/50 hover:bg-cyan-500/5 transition-all text-slate-300 hover:text-cyan-300 cursor-default btn-hover-lift`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
