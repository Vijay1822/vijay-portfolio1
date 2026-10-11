import type { Metadata } from "next";
import { Contact } from "@/components/contact/contact";
import { PERSONAL_INFO } from "@/lib/data";

export const metadata: Metadata = {
  title: `Contact | ${PERSONAL_INFO.preferredName} Kumar`,
  description: `Get in touch with ${PERSONAL_INFO.name} for AI engineering opportunities, full-stack systems development, technical internships, or project collaboration.`,
};

export default function ContactPage() {
  return <Contact />;
}
