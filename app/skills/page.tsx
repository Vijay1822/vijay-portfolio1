import type { Metadata } from "next";
import { Skills } from "@/components/skills/skills";
import { PERSONAL_INFO } from "@/lib/data";

export const metadata: Metadata = {
  title: `Technical Skills | ${PERSONAL_INFO.preferredName} Kumar`,
  description: `Authoritative technical skill matrix of ${PERSONAL_INFO.preferredName} Kumar across AI/ML, LLM agents, frontend engineering, backend gateways, databases, and IoT hardware protocols.`,
};

export default function SkillsPage() {
  return <Skills />;
}
