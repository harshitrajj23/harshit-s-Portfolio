"use client"

import { Mail, Linkedin, Instagram, ArrowLeft } from "lucide-react"
import Link from "next/link"
import CustomCursor from "@/components/custom-cursor"
import { useReveal } from "@/hooks/use-reveal"

const contactMethods = [
    {
        name: "LinkedIn",
        icon: <Linkedin className="w-8 h-8" />,
        link: "https://www.linkedin.com/in/harshit-raj-3106b9383/",
        description: "Professional networking and career growth.",
        color: "group-hover:text-blue-400",
        border: "group-hover:border-blue-400/50",
    },
    {
        name: "Email",
        icon: <Mail className="w-8 h-8" />,
        link: "mailto:hr9199274@gmail.com",
        description: "Drop a line for collaborations or inquiries.",
        color: "group-hover:text-cyan-400",
        border: "group-hover:border-cyan-400/50",
    },
    {
        name: "Instagram",
        icon: <Instagram className="w-8 h-8" />,
        link: "https://www.instagram.com/harshit_singhh007/",
        description: "Casual updates and coding journey highlights.",
        color: "group-hover:text-pink-400",
        border: "group-hover:border-pink-400/50",
    },
]

export default function ConnectPage() {
    const containerRef = useReveal()

    return (
        <main className="relative min-h-screen bg-slate-950 text-white overflow-hidden flex flex-col">
            {/* Background Orbs */}
            <div className="fixed inset-0 pointer-events-none opacity-30">
                <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-cyan-500/20 rounded-full blur-[120px] parallax-bg" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[150px] parallax-bg" style={{ animationDelay: "-5s" }} />
            </div>

            {/* Navigation */}
            <nav className="relative z-50 p-6 sm:p-10">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors group"
                >
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    <span className="font-medium">Back to Portfolio</span>
                </Link>
            </nav>

            {/* Content */}
            <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 pb-20" ref={containerRef}>
                <div className="text-center mb-16 reveal-on-scroll">
                    <h1 className="text-5xl sm:text-7xl font-black mb-6 bg-gradient-to-r from-white via-slate-400 to-slate-600 bg-clip-text text-transparent">
                        Let's Connect
                    </h1>
                    <p className="text-slate-400 text-lg sm:text-xl max-w-xl mx-auto font-light leading-relaxed">
                        Interested in working together or just want to say hi?
                        Feel free to reach out through any of these platforms.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
                    {contactMethods.map((method, idx) => (
                        <a
                            key={method.name}
                            href={method.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`reveal-on-scroll group flex flex-col items-center p-10 rounded-3xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.06] transition-all duration-500 ${method.border} hover:shadow-[0_0_40px_rgba(0,0,0,0.3)] shadow-2xl btn-hover-lift`}
                            style={{ transitionDelay: `${idx * 150}ms` }}
                        >
                            <div className={`mb-6 transition-colors duration-500 text-slate-300 ${method.color}`}>
                                {method.icon}
                            </div>
                            <h2 className="text-2xl font-bold mb-3 group-hover:scale-105 transition-transform">{method.name}</h2>
                            <p className="text-slate-500 text-center text-sm font-light leading-relaxed">
                                {method.description}
                            </p>
                        </a>
                    ))}
                </div>
            </div>

            {/* Global Noise Overlay */}
            <div className="noise-overlay" />
            <CustomCursor />
        </main>
    )
}
