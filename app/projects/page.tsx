import type { Metadata } from "next";
import { Projects } from "@/components/projects/projects";
import { HowVijayAIWorks } from "@/components/ai-architecture/how-vijay-ai-works";
import { PERSONAL_INFO } from "@/lib/data";

export const metadata: Metadata = {
  title: `AI Projects & Architecture | ${PERSONAL_INFO.preferredName} Kumar`,
  description: `Case studies and architectural breakdowns for BudgetMind, Smart Farmer procurement, IoT microclimate control, and the complete Vijay AI chatbot system architecture.`,
};

export default function ProjectsPage() {
  return (
    <>
      <Projects />
      <HowVijayAIWorks />
    </>
  );
}
