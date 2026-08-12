import Section from "./Section";

const BUTTONS = ["ESC", "CTRL", "ALT", "TAB", "|", "/", "-", "←", "↓", "↑", "→", "HOME", "END", "PGUP", "PGDN"];

export default function TouchDemo() {
  return (
    <Section
      id="touch"
      num="01"
      label="TOUCH-FIRST"
      title="Controls, visible and reachable."
      lead="Common terminal actions should not hide behind hardware buttons or gesture combinations. ZeTermux exposes them as a configurable on-screen layer."
    >
      <div className="split">
        <div className="visual">
          <div className="phone">
            <div className="phone-screen" style={{ display: "flex", flexDirection: "column" }}>
              <div className="phone-lines" style={{ flex: 1 }}>
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
        <div>
          <div className="feature-tags">
            <span className="tag">Custom buttons</span>
            <span className="tag">Modifier keys</span>
            <span className="tag">Mouse actions</span>
            <span className="tag">Gestures</span>
            <span className="tag">Profiles</span>
            <span className="tag">Per-session sets</span>
          </div>
          <p className="sec-lead" style={{ marginTop: 28 }}>
            Long-press for modifiers. Slide for mouse. Tap-hold for selection.
            The control bar replaces the volume-key gymnastics that Android
            terminal users have memorised for a decade.
          </p>
          <table className="kv" style={{ marginTop: 34 }}>
            <tbody>
              <tr><td>Tap latency</td><td>&lt; 16 ms key dispatch</td></tr>
              <tr><td>Sticky modifiers</td><td>Ctrl / Alt / Shift latching</td></tr>
              <tr><td>Profiles</td><td>switch bar sets per app — vim, emacs, tmux</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </Section>
  );
}
