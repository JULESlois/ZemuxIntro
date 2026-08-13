import { useState } from "react";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Section, { Head } from "./components/Section";
import TouchDemo from "./components/TouchDemo";
import ImmersiveCanvas from "./components/ImmersiveCanvas";
import GraphicsCanvas from "./components/GraphicsCanvas";
import CompatCanvas from "./components/CompatCanvas";
import CanvasTerminal from "./components/CanvasTerminal";
import Roadmap from "./components/Roadmap";
import { PALETTES } from "./sixel";
import { GithubIcon } from "./components/icons";

const REPO = "https://github.com/JULESlois/ZeTermux";

export default function App() {
  const [palette, setPalette] = useState(PALETTES[0]);

  return (
    <>
      <Nav />
      <Hero />

      <Section id="why">
        <div className="wrap">
          <Head
            title="Termux runs on Android. ZeTermux is built for it."
            lead="A fork's worth is the layer it adds. ZeTermux keeps the Termux ecosystem intact and rebuilds the interaction layer on top of it."
          />
          <div className="why" style={{ marginTop: 48 }}>
            <div className="why-col">
              <div className="why-label">A — DESKTOP MODEL</div>
              <ul className="why-list">
                <li><span className="k">mouse</span><span className="v">cursor + click targets</span></li>
                <li><span className="k">keyboard</span><span className="v">full physical row</span></li>
                <li><span className="k">window</span><span className="v">resizable, stacked chrome</span></li>
              </ul>
            </div>
            <div className="why-col">
              <div className="why-label">B — ANDROID MODEL</div>
              <ul className="why-list">
                <li><span className="k">touch</span><span className="v">finger + direct manipulation</span></li>
                <li><span className="k">IME</span><span className="v">software input, CJK, emoji</span></li>
                <li><span className="k">viewport</span><span className="v">single fullscreen surface</span></li>
              </ul>
            </div>
          </div>
          <div className="why-foot">
            <span className="lead">ZETERMUX INTERACTION</span>
            <span className="line" />
            <span className="tail">mobile-first layer</span>
          </div>
          <div className="stack">
            <span className="node">TERMUX</span>
            <span className="flow">→ ecosystem · unchanged</span>
            <span className="node acc">ZETERMUX</span>
            <span className="flow">→ mobile-first interaction layer</span>
            <span className="node">ANDROID</span>
          </div>
        </div>
      </Section>

      <TouchDemo />

      <Section id="immersive" bleed>
        <div className="wrap bleed-head">
          <Head
            title="A workspace, not a window."
            lead="The canvas below alternates between stock Android chrome and ZeTermux's immersive mode. Same phone. Different philosophy."
          />
        </div>
        <div className="bleed-media">
          <ImmersiveCanvas />
        </div>
        <div className="wrap bleed-foot">
          <div className="st-row">
            <span className="st">◈ True fullscreen — no persistent system chrome</span>
            <span className="st">◈ Edge-swipe reveals controls only when asked</span>
            <span className="st">◈ Works with gesture and 3-button navigation</span>
          </div>
        </div>
      </Section>

      <Section id="keyboard">
        <div className="wrap">
          <Head
            title="Android's input system, on the terminal's terms."
            lead="ZeTermux cooperates with the platform instead of forcing a desktop keyboard model onto a phone."
          />
          <div className="ime-langs" style={{ marginTop: 44 }}>
            <span>ENGLISH</span>
            <span>中文</span>
            <span>日本語</span>
            <span>한국어</span>
            <span>EMOJI</span>
            <span>THIRD-PARTY</span>
          </div>
          <div className="ime-flow">
            ANDROID IME <span className="acc">→</span> COMPOSITION{" "}
            <span className="acc">→</span> TERMINAL
          </div>
          <p className="sec-lead" style={{ marginTop: 22 }}>
            CJK input, emoji, candidate popups and hardware keyboards all route
            through the IME the user already trusts. Composition inside
            alternate-screen apps (vim, tmux) is the hardest part of any Android
            terminal — ZeTermux tracks it openly, not as a promise.
          </p>
          <div className="ime-status">● EXPERIMENTAL</div>
        </div>
      </Section>

      <Section id="graphics" bleed>
        <div className="wrap bleed-head">
          <Head
            title="Terminal ≠ text only."
            lead="A first-class escape-sequence pipeline so images, plots and previews can live beside your prompt."
          />
        </div>
        <div className="bleed-media">
          <GraphicsCanvas palette={palette} />
        </div>
        <div className="wrap bleed-foot">
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
          <div className="st-row">
            <span className="st exp">SIXEL — EXPERIMENTAL</span>
            <span className="st res">KITTY — RESEARCH</span>
            <span className="st on">24-BIT TRUE COLOR</span>
            <span className="st on">UNICODE &amp; LIGATURES</span>
          </div>
        </div>
      </Section>

      <Section id="compat" bleed>
        <div className="wrap bleed-head">
          <Head
            title="Built on the Termux ecosystem."
            lead="ZeTermux does not replace Termux. Every package you rely on streams through the same ecosystem — `pkg install git neovim clang` works the day you install."
          />
        </div>
        <div className="bleed-media">
          <div className="compat-canvas">
            <CompatCanvas />
          </div>
        </div>
        <div className="wrap bleed-foot">
          <code className="cmd-line">pkg install git neovim clang tmux fzf</code>
        </div>
      </Section>

      <Section id="demo" bleed>
        <div className="bleed-media">
          <CanvasTerminal />
        </div>
      </Section>

      <Section id="philosophy">
        <div className="wrap">
          <Head title="Terminal UX should evolve." />
          <div className="philo" style={{ marginTop: 44 }}>
            <div className="philo-item">
              <div className="philo-num">01</div>
              <div>
                <h3>Touch is not<br />a fallback.</h3>
                <p>Touch input is a first-class interface, not a downgrade from a keyboard.</p>
              </div>
            </div>
            <div className="philo-item">
              <div className="philo-num">02</div>
              <div>
                <h3>Power stays<br />discoverable.</h3>
                <p>Advanced features should remain visible and reachable, not hidden behind memorised incantations.</p>
              </div>
            </div>
            <div className="philo-item">
              <div className="philo-num">03</div>
              <div>
                <h3>Mobile ≠<br />desktop.</h3>
                <p>Mobile interfaces should not imitate desktop interaction models blindly.</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Roadmap />

      <Section id="download">
        <div className="wrap">
          <div className="dl">
            <div className="dl-state">DEVELOPMENT BUILD</div>
            <h2 className="dl-title">Get ZeTermux.</h2>
            <p className="dl-note">
              No stable release yet — the project is in active development. When
              a release ships, version, architecture and checksums will be
              sourced directly from GitHub Releases.
            </p>
            <div className="dl-cta">
              <a
                className="btn-solid"
                href={`${REPO}/releases`}
                target="_blank"
                rel="noreferrer"
              >
                GitHub Releases ↗
              </a>
              <a className="btn" href={REPO} target="_blank" rel="noreferrer">
                Build from source
              </a>
            </div>
            <div className="dl-meta">
              VERSION / ARCH / RELEASE — sourced from GitHub Releases
            </div>
          </div>
        </div>
      </Section>

      <Section id="docs">
        <div className="wrap">
          <Head
            title="Documentation."
            lead="Guides for daily use and for building ZeTermux itself."
          />
          <div className="doc-index" style={{ marginTop: 44 }}>
            {[
              ["01", "Getting Started", "Installation / First Launch"],
              ["02", "Using ZeTermux", "Touch / Keys / Gestures"],
              ["03", "Terminal", "Sessions / Fonts / Graphics"],
              ["04", "Android", "Storage / Permissions"],
            ].map(([n, t, d]) => (
              <a key={n} className="doc-row" href={REPO} target="_blank" rel="noreferrer">
                <span className="n">{n}</span>
                <span className="t">{t}</span>
                <span className="d">{d}</span>
                <span className="arrow">→</span>
              </a>
            ))}
          </div>
        </div>
      </Section>

      <Section id="project">
        <div className="wrap">
          <Head title="Origins." />
          <div className="origins" style={{ marginTop: 40 }}>
            <p className="sec-lead" style={{ marginTop: 0 }}>
              ZeTermux began as an exploration of improving the Android terminal
              experience. The project is developed directly around the Termux
              codebase and ecosystem — it inherits the environment, and builds
              its own terminal UX on top of it.
            </p>
            <div>
              <div className="fact"><span>License</span><b>GPLv3</b></div>
              <div className="fact"><span>Based on</span><b>Termux</b></div>
              <div className="fact"><span>Direction</span><b>Independent UX</b></div>
            </div>
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
            <div className="footer-links">
              <a className="btn-solid" href={REPO} target="_blank" rel="noreferrer">
                <GithubIcon />
                GitHub
              </a>
              <a className="btn" href={`${REPO}/issues`} target="_blank" rel="noreferrer">
                Issues
              </a>
              <a className="btn" href={`${REPO}/discussions`} target="_blank" rel="noreferrer">
                Discussions
              </a>
            </div>
          </div>
          <div className="footer-meta">
            <span>ZeTermux — built for Android.</span>
            <span>Open source on GitHub · GPLv3</span>
          </div>
        </div>
      </footer>
    </>
  );
}
