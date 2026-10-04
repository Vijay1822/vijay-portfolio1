import type { Metadata } from "next";
import { Projects } from "@/components/projects/projects";
import { PERSONAL_INFO } from "@/lib/data";

export const metadata: Metadata = {
  title: `Projects | ${PERSONAL_INFO.name}`,
  description: `Explore engineering projects, architectural deep-dives, live demos, and full-stack AI/IoT applications developed by ${PERSONAL_INFO.preferredName} Kumar.`,
};

export default function ProjectsPage() {
  return <Projects />;
}
