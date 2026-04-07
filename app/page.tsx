import type { Metadata } from "next"
import CinematicLanding from "@/components/cinematic-landing/cinematic-landing"

export const metadata: Metadata = {
  title: "Welcome — Creative Developer",
  description:
    "An immersive cinematic experience showcasing expertise in JavaScript, DSA, Blockchain, and AI. Explore the journey.",
}

export default function LandingPage() {
  return <CinematicLanding />
}
