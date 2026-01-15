"use client"

import { useState } from "react"
import { useReveal } from "@/hooks/use-reveal"

interface ProjectShowcaseProps {
  scrollY: number
}

const projects = [
  {
    id: 1,
    title: "API TITAN",
    description:
      "Mock API platform for testing and learning. Create, simulate, and test REST APIs without backend setup.",
    tags: ["JavaScript", "HTML", "CSS", "Next.js", "API Design"],
    color: "from-blue-600 to-cyan-600",
    link: "https://github.com/harshitrajj23/hacktitans.git",
  },
  {
    id: 2,
    title: "Finance Tracker App",
    description:
      "Personal finance management with expense tracking, budgeting, and visual analytics. Built to understand real-world data management.",
    tags: ["JavaScript", "Supabase", "Next.js", "TailwindCSS", "Analytics"],
    color: "from-purple-600 to-pink-600",
    link: "https://github.com/harshitrajj23/Syntax_Squad.git",
  },
  {
    id: 3,
    title: "DSA Solutions",
    description:
      "Curated C++ solutions for competitive programming problems. Problem-solving focused, optimized for interviews.",
    tags: ["C++", "Data Structures", "Algorithms", "GitHub"],
    color: "from-cyan-600 to-blue-600",
    link: "https://github.com/harshitrajj23/DSA-Cpp-Solutions.git",
  },
]

export default function ProjectShowcase({ scrollY }: ProjectShowcaseProps) {
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const containerRef = useReveal()

  return (
    <section id="projects" className="relative py-32 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto" ref={containerRef}>
        <div className="reveal-on-scroll text-center mb-20">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-white">
            Featured{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">Projects</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Building real solutions that solve problems. Honest work, real learning.
          </p>
        </div>

        <div className="space-y-8">
          {projects.map((project, idx) => (
            <div
              key={project.id}
              className="reveal-on-scroll"
              style={{ transitionDelay: `${idx * 150}ms` }}
            >
              <div
                className={`group relative rounded-2xl overflow-hidden backdrop-blur-md border transition-all duration-300 ${hoveredId === project.id ? "border-cyan-500/50 bg-white/5" : "border-white/10 bg-white/10"
                  }`}
                onMouseEnter={() => setHoveredId(project.id)}
                onMouseLeave={() => setHoveredId(null)}
                style={{
                  transform: hoveredId === project.id ? "scale(1.01)" : "scale(1)",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10 p-8 lg:p-12 flex flex-col lg:flex-row items-center gap-8">
                  {/* Project Image Placeholder */}
                  <div className="w-full lg:w-2/5 flex-shrink-0 relative group/img overflow-hidden rounded-xl bg-slate-800 shadow-2xl">
                    <div className={`relative w-full aspect-video bg-gradient-to-br ${project.color} opacity-40 group-hover:opacity-60 transition-opacity duration-700 ease-out`} />
                    <div className="absolute inset-0 flex items-center justify-center text-white/50 font-bold text-2xl tracking-widest group-hover/img:scale-110 transition-transform duration-700">
                      {project.title}
                    </div>
                    {/* Sweep Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/img:translate-x-full transition-transform duration-1000 ease-in-out" />
                  </div>

                  {/* Project Content */}
                  <div className="flex-1">
                    <h3 className="text-2xl lg:text-3xl font-bold text-white mb-3 bg-gradient-to-r from-white to-slate-400 bg-clip-text">
                      {project.title}
                    </h3>
                    <p className="text-slate-300 mb-6 leading-relaxed font-light">{project.description}</p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-cyan-300 hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all cursor-default"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-cyan-400 font-semibold hover:text-cyan-300 transition-all duration-300 btn-hover-lift"
                    >
                      View Project <span className="inline-block transition-transform group-hover/link:translate-x-1">→</span>
                    </a>
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
