import type { Metadata } from "next";
import { About } from "@/components/about/about";
import { PERSONAL_INFO } from "@/lib/data";

export const metadata: Metadata = {
  title: `About ${PERSONAL_INFO.preferredName} Kumar | AI Engineer & Engineering Identity`,
  description: `Learn about ${PERSONAL_INFO.preferredName} Kumar — his engineering mindset, problem-solving heuristics, learning philosophy, and background at VNR VJIET.`,
};

export default function AboutPage() {
  return <About />;
}
