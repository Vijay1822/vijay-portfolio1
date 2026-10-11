import type { Metadata } from "next";
import { Achievements } from "@/components/achievements/achievements";
import { PERSONAL_INFO } from "@/lib/data";

export const metadata: Metadata = {
  title: `Journey & Milestones | ${PERSONAL_INFO.preferredName} Kumar`,
  description: `Verified chronological roadmap of national hackathons (SIH, Adobe), certifications, academic milestones, and hands-on microcontroller prototyping in the engineering journey of ${PERSONAL_INFO.preferredName} Kumar.`,
};

export default function JourneyPage() {
  return <Achievements />;
}
