import type { Metadata } from "next";
import { ResumeViewer } from "@/components/resume/resume-viewer";
import { PERSONAL_INFO } from "@/lib/data";

export const metadata: Metadata = {
  title: `Resume | ${PERSONAL_INFO.name}`,
  description: `Official resume of ${PERSONAL_INFO.preferredName} Kumar — AI/ML Engineer, Generative AI Specialist, and Full-Stack Developer. Education at VNR VJIET (9.45 CGPA), BudgetMind project, skills, and hackathons.`,
};

export default function ResumePage() {
  return <ResumeViewer />;
}
