import type { Metadata } from "next";
import { Achievements } from "@/components/achievements/achievements";
import { PERSONAL_INFO } from "@/lib/data";

export const metadata: Metadata = {
  title: `Journey & Milestones | ${PERSONAL_INFO.name}`,
  description: `Chronological engineering timeline, hackathons, certifications, and milestones in the journey of ${PERSONAL_INFO.preferredName} Kumar.`,
};

export default function JourneyPage() {
  return <Achievements />;
}
