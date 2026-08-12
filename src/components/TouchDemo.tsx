import Section, { Head } from "./Section";

const BUTTONS = ["ESC", "CTRL", "ALT", "TAB", "|", "/", "-", "←", "↓", "↑", "→", "HOME", "END", "PGUP", "PGDN"];

const ANNOTATIONS = [
  ["CTRL", "Long-press to latch. Modifier keys stay visible, never hidden behind volume-key gymnastics."],
  ["Gestures", "Slide for mouse, tap-hold for selection. Direct manipulation instead of memorised incantations."],
  ["Profiles", "Per-session control sets — vim, emacs, tmux each get the bar they actually need."],
  ["Discoverable", "Every action is reachable on screen. Power features remain visible, not buried."],
];

export default function TouchDemo() {
  return (
    <Section id="touch">
      <div className="wrap">
        <Head
          num="01"
          label="TOUCH-FIRST"
          title="Controls, visible and reachable."
          lead="Common terminal actions should not hide behind hardware buttons or gesture combinations. ZeTermux exposes them as a configurable on-screen layer."
        />
        <div className="touch" style={{ marginTop: 48 }}>
          <div className="visual">
            <div className="phone">
              <div className="phone-screen">
                <div className="phone-lines">
                  <p><span className="prompt">$</span> ssh pi@camera.local</p>
                  <p className="dim">Welcome to Raspberry Pi OS</p>
                  <p><span className="prompt">$</span> tail -f /var/log/motion.log</p>
                  <p>motion: frame 20481 — 12:41:07</p>
                  <p>motion: frame 20482 — 12:41:08</p>
                  <p className="dim">⟨ ctrl-c pressed via control bar ⟩</p>
                  <p><span className="prompt">$</span> exit</p>
                </div>
                <div className="controlbar">
                  {BUTTONS.map((b) => (
                    <span key={b} className={`ckey${["ESC", "CTRL", "ALT"].includes(b) ? " on" : ""}`}>
                      {b}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="anno">
            {ANNOTATIONS.map(([k, d]) => (
              <div key={k} className="anno-item">
                <span className="anno-key">{k}</span>
                <p>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
