import Section, { Head } from "./Section";

const PHASES = [
  {
    name: "FOUNDATION",
    state: "shipped",
    bar: "████",
    items: [
      ["architecture", "released"],
      ["UI cleanup", "released"],
      ["build toolchain", "released"],
    ],
  },
  {
    name: "INTERACTION",
    state: "active",
    bar: "██░░",
    items: [
      ["touch controls", "in dev"],
      ["gestures", "in dev"],
      ["IME", "in dev"],
    ],
  },
  {
    name: "IMMERSION",
    state: "next",
    bar: "█░░░",
    items: [
      ["true fullscreen workspace", "in dev"],
      ["UI customization", "planned"],
    ],
  },
  {
    name: "GRAPHICS",
    state: "research",
    bar: "░░░░",
    items: [
      ["sixel rendering", "experimental"],
      ["kitty protocol", "research"],
    ],
  },
];

export default function Roadmap() {
  return (
    <Section id="roadmap">
      <div className="wrap">
        <Head
          title="Where the project is going."
          lead="Big directions only. Issues, PRs and dates live on GitHub; the site shows intent."
        />
        <div className="ledger" style={{ marginTop: 44 }}>
          <div className="ledger-head">
            <span>STATUS</span>
            <span className="g">SYSTEM</span>
            <span>STATE</span>
          </div>
          {PHASES.map((p) => (
            <div key={p.name} className="ledger-phase">
              <div className="ledger-row">
                <span className="ledger-bar">{p.bar}</span>
                <span className="ledger-name">{p.name}</span>
                <span className={`ledger-state ${p.state}`}>{p.state}</span>
              </div>
              <div className="ledger-items">
                {p.items.map(([label, st], i) => (
                  <div key={label} className="ledger-item">
                    <span>
                      <span className="tree">{i === p.items.length - 1 ? "└─" : "├─"}</span>
                      {label}
                    </span>
                    <span>{st}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <p className="sec-lead" style={{ marginTop: 28, fontSize: 15 }}>
          Status markers stay honest: shipped, in development, experimental,
          research. Nothing here is a promise — the direction will change as the
          codebase proves out.
        </p>
      </div>
    </Section>
  );
}
