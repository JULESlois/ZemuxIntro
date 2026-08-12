import type { ReactNode } from "react";
import { useReveal } from "../hooks";

interface Props {
  id?: string;
  num?: string;
  label?: string;
  title?: string;
  lead?: string;
  children?: ReactNode;
  tone?: "dark" | "light" | "warm";
}

export default function Section({ id, num, label, title, lead, children, tone }: Props) {
  const ref = useReveal<HTMLElement>();
  const cls = ["section", tone === "dark" ? "section-dark" : "", tone === "warm" ? "" : ""]
    .filter(Boolean)
    .join(" ");
  return (
    <section id={id} className={cls} ref={ref}>
      <div className="wrap">
        {(num || title) && (
          <div className="sec-head reveal-group">
            {num && <div className="sec-num">{num}</div>}
            {label && (
              <div className="sec-label">
                <span className="kicker-dot" />
                {label}
              </div>
            )}
            {title && <h2>{title}</h2>}
            {lead && <p className="sec-lead">{lead}</p>}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
