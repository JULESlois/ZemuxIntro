import { useState } from "react";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Section from "./components/Section";
import TouchDemo from "./components/TouchDemo";
import ImmersiveCanvas from "./components/ImmersiveCanvas";
import GraphicsCanvas from "./components/GraphicsCanvas";
import CompatCanvas from "./components/CompatCanvas";
import TerminalDemo from "./components/TerminalDemo";
import Roadmap from "./components/Roadmap";
import { PALETTES } from "./sixel";

export default function App() {
  const [palette, setPalette] = useState(PALETTES[0]);

  return (
    <>
      <Nav />
      <Hero />

      <Section
        id="why"
        num="01"
        label="WHY ZETERMUX"
        title="Termux runs on Android. ZeTermux is built for it."
        lead="A fork's worth is the layer it adds. ZeTermux keeps the Termux ecosystem intact and rebuilds the interaction layer on top of it."
      >
        <div className="why-grid" style={{ marginTop: 52 }}>
          <div className="panel">
            <span className="panel-idx">A</span>
            <h3>Terminal UX</h3>
            <p>
              Desktop emulators assume a mouse, a keyboard and a window manager.
              Android gives you a finger, an IME and a small screen. ZeTermux
              redesigns the emulator around that reality.
            </p>
          </div>
          <div className="panel">
            <span className="panel-idx">B</span>
            <h3>Touch-first</h3>
            <p>
              Ctrl, Alt, Tab, arrows, selection, paste, mouse — no volume keys,
              no hidden gestures, no memorised incantations. Visible,
              configurable, discoverable controls.
            </p>
          </div>
          <div className="panel">
            <span className="panel-idx">C</span>
            <h3>Real fullscreen</h3>
            <p>
              Not "hide the toolbar." ZeTermux is a true immersive terminal
              workspace — status bar, navigation bar and chrome all yield
              to the session.
            </p>
          </div>
        </div>

        <div className="rule-wrap" style={{ marginTop: 56 }}>
          <div className="rule-label">THE STACK</div>
          <div className="rule-diagram">
            <span className="th">TERMUX</span>
            <span className="arrow">powerful ecosystem · unchanged</span>
            <span className="th acc">ZETERMUX</span>
            <span className="arrow">mobile-first interaction layer</span>
            <span className="th">ANDROID</span>
            <span className="arrow">gestures · IME · hardware</span>
          </div>
        </div>
      </Section>

      <TouchDemo />

      <Section
        id="immersive"
        num="02"
        label="IMMERSIVE MODE"
        title="A workspace, not a window."
        lead="The canvas below alternates between stock Android chrome and ZeTermux's immersive mode. Same phone. Different philosophy."
      >
        <div className="immersive-stage">
          <ImmersiveCanvas />
        </div>
        <div className="note-strip" style={{ marginTop: 18 }}>
          <span>◈ True fullscreen — no persistent system chrome</span>
          <span>◈ Edge-swipe reveals controls only when asked</span>
          <span>◈ Works with gesture and 3-button navigation</span>
        </div>
      </Section>

      <Section
        id="keyboard"
        num="03"
        label="KEYBOARD / IME"
        title="Android's input system, on the terminal's terms."
        lead="ZeTermux cooperates with the platform instead of forcing a desktop keyboard model onto a phone."
      >
        <div className="split" style={{ marginTop: 48 }}>
          <div>
            <div className="ime-row">
              <span className="ime-chip">English</span>
              <span className="ime-chip">中文</span>
              <span className="ime-chip">日本語</span>
              <span className="ime-chip">한국어</span>
              <span className="ime-chip">Emoji</span>
              <span className="ime-chip">Third-party IMEs</span>
            </div>
            <p className="sec-lead" style={{ marginTop: 26 }}>
              CJK input, emoji, candidate popups and hardware keyboards all
              route through the IME the user already trusts.
            </p>
          </div>
          <div className="panel" style={{ borderRadius: 12 }}>
            <span className="panel-idx">STATUS</span>
            <h3>
              Experimental <span className="badge exp" style={{ fontSize: 10 }}>in development</span>
            </h3>
            <p>
              IME composition inside alternate-screen apps (vim, tmux) is the
              hardest part of any Android terminal. ZeTermux tracks it openly —
              the site marks what is shipped, not what is hoped.
            </p>
          </div>
        </div>
      </Section>

      <Section
        id="graphics"
        num="04"
        label="TERMINAL GRAPHICS"
        title="Terminal ≠ text only."
        lead="A first-class escape-sequence pipeline so images, plots and previews can live beside your prompt."
      >
        <div className="graphics-frame" style={{ marginTop: 48 }}>
          <GraphicsCanvas palette={palette} />
          <div className="palette-bar">
            <span>Palette</span>
            {PALETTES.map((p) => (
              <button
                key={p.id}
                className={`chip ${p.id === palette.id ? "active" : ""}`}
                onClick={() => setPalette(p)}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
        <div className="feature-tags" style={{ marginTop: 22 }}>
          <span className="tag">Sixel — experimental</span>
          <span className="tag">Kitty protocol — research</span>
          <span className="tag">24-bit true color</span>
          <span className="tag">Unicode & ligatures</span>
        </div>
      </Section>

      <Section
        id="compat"
        num="05"
        label="COMPATIBILITY"
        title="Built on the Termux ecosystem."
        lead="ZeTermux does not replace Termux. Every package you rely on streams through the same ecosystem — `pkg install git neovim clang` works the day you install."
      >
        <div className="compat-stage" style={{ marginTop: 48 }}>
          <CompatCanvas />
        </div>
        <code className="cmd-line" style={{ display: "inline-block", marginTop: 22 }}>
          pkg install git neovim clang tmux fzf
        </code>
      </Section>

      <Section
        id="demo"
        num="06"
        label="INTERACTIVE"
        title="Try the shell."
        lead="A live command parser running in your browser. Same tone the real app aims for — factual, fast, touchable."
      >
        <div style={{ marginTop: 48 }}>
          <TerminalDemo />
        </div>
      </Section>

      <Section
        id="philosophy"
        num="08"
        label="PHILOSOPHY"
        title="Terminal UX should evolve."
      >
        <div className="principles" style={{ marginTop: 44 }}>
          <div className="principle">
            <div className="big">01</div>
            <p>Touch is not a fallback.</p>
          </div>
          <div className="principle">
            <div className="big">02</div>
            <p>Power features should remain discoverable.</p>
          </div>
          <div className="principle">
            <div className="big">03</div>
            <p>Mobile interfaces should not imitate desktops blindly.</p>
          </div>
        </div>
      </Section>

      <Roadmap />

      <Section id="download" num="09" label="DOWNLOAD" tone="dark" title="Get ZeTermux.">
        <div className="dl-grid" style={{ marginTop: 48 }}>
          <div className="dl-card">
            <div className="dl-version">v0.4.2</div>
            <div className="dl-sub">Latest release · Android · arm64-v8a</div>
            <div>
              <a className="btn-solid" href="#download">
                Download APK — 64 MB
              </a>
              <a
                className="btn"
                style={{ marginLeft: 8 }}
                href="#github"
              >
                GitHub Releases ↗
              </a>
            </div>
            <div className="dl-req">Requires Android 7.0+ · arm64-v8a or armeabi-v7a · 200 MB storage</div>
          </div>
          <div>
            <div className="dl-steps">
              <div className="step">
                <span className="step-n">1</span>
                <span>Download the APK for your architecture from Download or GitHub Releases.</span>
              </div>
              <div className="step">
                <span className="step-n">2</span>
                <span>Allow "install from this source" in Android settings.</span>
              </div>
              <div className="step">
                <span className="step-n">3</span>
                <span>Install and launch ZeTermux.</span>
              </div>
              <div className="step">
                <span className="step-n">4</span>
                <span>Update in place — your <code style={{ color: "var(--fg)" }}>$HOME</code> and pkg data are preserved.</span>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section
        id="docs"
        num="10"
        label="DOCS"
        title="Documentation."
        lead="Guides for daily use and for building ZeTermux itself."
      >
        <div className="doc-grid" style={{ marginTop: 48 }}>
          {[
            ["Getting Started", "Installation, first launch, basic commands."],
            ["Using ZeTermux", "Touch controls, extra keys, gestures, fullscreen, clipboard."],
            ["Terminal", "Shell, sessions, colors, fonts, graphics support."],
            ["Android", "Storage, permissions, files, background execution."],
          ].map(([t, d]) => (
            <div key={t} className="doc-card">
              <h4>{t} <span className="arrow">→</span></h4>
              <p>{d}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section
        id="project"
        num="11"
        label="PROJECT"
        title="Origins."
      >
        <div className="split" style={{ marginTop: 40 }}>
          <p className="sec-lead">
            ZeTermux began as an exploration of improving the Android terminal
            experience. The project is developed directly around the Termux
            codebase and ecosystem — it inherits the environment, and builds
            its own terminal UX on top of it.
          </p>
          <div className="note-strip">
            <span>Apache License 2.0</span>
            <span>Based on Termux</span>
            <span>Independent UX direction</span>
          </div>
        </div>
      </Section>

      <footer id="github">
        <div className="wrap">
          <div className="footer-cta">
            <h2>
              ZeTermux is open source.
              <br />
              Build it. Break it. Improve it.
            </h2>
            <div>
              <a className="btn-solid" href="#top">GitHub ↗</a>
              <a className="btn" style={{ marginLeft: 8 }} href="#github">Issues</a>
              <a className="btn" style={{ marginLeft: 8 }} href="#github">Discussions</a>
              <a className="btn" style={{ marginLeft: 8 }} href="#github">Contributing</a>
            </div>
          </div>
          <div className="footer-grid">
            <div>
              <span className="fg-head">Product</span>
              <a href="#features">Features</a>
              <a href="#download">Download</a>
              <a href="#docs">Docs</a>
            </div>
            <div>
              <span className="fg-head">Project</span>
              <a href="#roadmap">Roadmap</a>
              <a href="#project">Origins</a>
              <a href="#github">Changelog</a>
            </div>
            <div>
              <span className="fg-head">Community</span>
              <a href="#github">Issues</a>
              <a href="#github">Discussions</a>
              <a href="#github">Contributing</a>
            </div>
          </div>
          <div className="footer-bottom">
            <span>ZeTermux — built for Android.</span>
            <span>Open source on GitHub · Apache 2.0</span>
          </div>
        </div>
      </footer>
    </>
  );
}
