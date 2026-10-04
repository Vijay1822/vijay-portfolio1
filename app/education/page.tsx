import type { Metadata } from "next";
import { Education } from "@/components/education/education";
import { PERSONAL_INFO } from "@/lib/data";

export const metadata: Metadata = {
  title: `Education | ${PERSONAL_INFO.name}`,
  description: `Academic foundation and B.Tech in Computer Science and Engineering (IoT) at VNR VJIET by ${PERSONAL_INFO.preferredName} Kumar.`,
};

export default function EducationPage() {
  return <Education />;
}
