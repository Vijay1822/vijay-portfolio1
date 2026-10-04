import type { Metadata } from "next";
import { Contact } from "@/components/contact/contact";
import { PERSONAL_INFO } from "@/lib/data";

export const metadata: Metadata = {
  title: `Contact | ${PERSONAL_INFO.name}`,
  description: `Get in touch with ${PERSONAL_INFO.preferredName} Kumar for AI engineering opportunities, full-stack development, collaborative research, or discussions.`,
};

export default function ContactPage() {
  return <Contact />;
}
