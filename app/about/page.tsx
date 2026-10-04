import type { Metadata } from "next";
import { About } from "@/components/about/about";
import { PERSONAL_INFO } from "@/lib/data";

export const metadata: Metadata = {
  title: `About ${PERSONAL_INFO.preferredName} Kumar | AI Engineer & Full-Stack Developer`,
  description: `Learn more about ${PERSONAL_INFO.preferredName} Kumar — his background in CSE-IoT at VNR VJIET, core engineering philosophy, what he builds, interests, and current focus.`,
};

export default function AboutPage() {
  return <About />;
}
