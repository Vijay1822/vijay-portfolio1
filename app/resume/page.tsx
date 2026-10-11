import type { Metadata } from "next";
import { ResumeViewer } from "@/components/resume/resume-viewer";
import { PERSONAL_INFO } from "@/lib/data";

export const metadata: Metadata = {
  title: `Resume | ${PERSONAL_INFO.preferredName} Kumar`,
  description: `Official resume and verified technical credentials of ${PERSONAL_INFO.name} — AI Engineer, Generative AI specialist, and Full-Stack Developer at VNR VJIET (9.45 CGPA).`,
};

export default function ResumePage() {
  return <ResumeViewer />;
}
