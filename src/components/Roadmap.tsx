import Section from "./Section";

const PHASES = [
  {
    name: "FOUNDATION",
    status: "done",
    items: [
      ["Termux-based architecture", "done"],
      ["UI cleanup & relayout", "done"],
      ["Modern build toolchain", "done"],
    ],
  },
  {
    name: "INTERACTION",
    status: "active",
    items: [
      ["Touch control system", "active"],
      ["Gesture redesign", "active"],
      ["Keyboard / IME integration", "active"],
    ],
  },
  {
    name: "IMMERSION",
    status: "next",
    items: [
      ["True fullscreen workspace", "done"],
      ["UI customization", "next"],
    ],
  },
  {
    name: "GRAPHICS",
    status: "future",
    items: [
      ["Sixel rendering", "exp"],
      ["Kitty graphics protocol", "future"],
    ],
  },
];

export default function Roadmap() {
  return (
    <Section
      id="roadmap"
      num="07"
      label="ROADMAP"
      title="Where the project is going."
      lead="Big directions only. Issues, PRs and dates live on GitHub; the site shows intent."
    >
      <div className="rm-grid" style={{ marginTop: 44 }}>
        {PHASES.map((p) => (
          <div key={p.name} className={`rm-phase ${p.status}`}>
            <span className="rm-dot" />
            <h3>{p.name}</h3>
            {p.items.map(([label, st]) => (
              <div key={label} style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
                <span style={{ fontSize: 13, color: "var(--dim)" }}>{label}</span>
                <span className={`badge ${st}`}>
                  {st === "done" ? "released" : st === "active" ? "in dev" : st === "exp" ? "experimental" : "future"}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
      <p className="sec-lead" style={{ marginTop: 26, fontSize: 15 }}>
        Status markers stay honest: released, in development, experimental, research.
        Nothing here is a promise — the direction will change as the codebase proves out.
      </p>
    </Section>
  );
}
