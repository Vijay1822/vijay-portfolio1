import type { Metadata } from "next";
import { Skills } from "@/components/skills/skills";
import { PERSONAL_INFO } from "@/lib/data";

export const metadata: Metadata = {
  title: `Skills & Technologies | ${PERSONAL_INFO.name}`,
  description: `Explore the full technical skill set of ${PERSONAL_INFO.preferredName} across Programming Languages, AI & Machine Learning, Frontend Engineering, Backend Systems, Databases, IoT & Hardware Interfacing, and DevOps.`,
};

export default function SkillsPage() {
  return <Skills />;
}
