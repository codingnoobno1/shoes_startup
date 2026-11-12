import type { Metadata } from "next";
import { InquiryForm } from "@/components/inquiry-form";

export const metadata: Metadata = { title: "Work with us" };

export default function CareersPage() {
  return (
    <section className="formPage careerPage">
      <div className="formIntro">
        <span className="eyebrow">Careers & collaborations</span>
        <h1>Do considered<br />work with us.</h1>
        <p>We welcome thoughtful people across retail, product, operations, and creative disciplines—as well as business associates with a strong idea.</p>
        <blockquote>“Good taste gets attention. Good work earns trust.”</blockquote>
      </div>
      <InquiryForm type="career" />
    </section>
  );
}
