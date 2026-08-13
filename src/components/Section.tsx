import type { ReactNode } from "react";
import { useReveal } from "../hooks";

interface SectionProps {
  id?: string;
  bleed?: boolean;
  children?: ReactNode;
}

export default function Section({ id, bleed, children }: SectionProps) {
  const ref = useReveal<HTMLElement>();
  return (
    <section id={id} ref={ref} className={bleed ? "section-bleed" : "section"}>
      {children}
    </section>
  );
}

interface HeadProps {
  title?: string;
  lead?: string;
}

export function Head({ title, lead }: HeadProps) {
  return (
    <div className="sec-head">
      {title && <h2 className="sec-title">{title}</h2>}
      {lead && <p className="sec-lead">{lead}</p>}
    </div>
  );
}
