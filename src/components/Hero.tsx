import { useEffect, useRef } from "react";
import { useReveal } from "../hooks";

const MONO = '"JetBrains Mono", monospace';

interface Cell {
  col: number;
  row: number;
  life: number;
  char: string;
}

const TRAIL_CHARS = "▒░#@$%&*+=~^:01".split("");

function drawCodeLine(ctx: CanvasRenderingContext2D, line: number) {
  const glyphs = "abcdefghijkmnpqrstuvwxyz0123456789_{}();=>:";
  const len = 8 + Math.floor(Math.random() * 28);
  let s = Math.random() > 0.5 ? "$ " : "  ";
  for (let i = 0; i < len; i++) {
    if (Math.random() < 0.14) s += " ";
    else s += glyphs[Math.floor(Math.random() * glyphs.length)];
  }
  ctx.fillStyle = "#8a8a82";
  ctx.font = `13px ${MONO}`;
  ctx.fillText(s, 30, 70 + line * 22);
}

export default function Hero() {
  const ref = useReveal<HTMLElement>();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const parent = canvas.parentElement!;
    let w = parent.clientWidth;
    let h = parent.clientHeight;
    const resize = () => {
      w = parent.clientWidth;
      h = parent.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.font = `13px ${MONO}`;
    };
    resize();

    // static content
    const lines = 16;
    for (let i = 0; i < lines; i++) drawCodeLine(ctx, i);

    // prompt
    ctx.fillStyle = "#e2e2dc";
    ctx.font = `600 13px ${MONO}`;
    ctx.fillText("zetermux $ neofetch --os android", 30, 70 + lines * 22);

    let cells: Cell[] = [];
    let raf = 0;
    let t = 0;
    const trail = () => {
      t++;
      // fading overlay
      ctx.fillStyle = "rgba(12,12,10,0.16)";
      ctx.fillRect(0, 36, w, h - 72);

      // re-stamp persistent base lines occasionally to keep them stable
      if (t % 24 === 0) {
        const idx = Math.floor(Math.random() * lines);
        ctx.fillStyle = "#0c0c0a";
        ctx.clearRect(24, 60 + idx * 22, w - 48, 20);
        drawCodeLine(ctx, idx);
      }

      // spawn walker cells
      if (t % 2 === 0) {
        cells.push({
          col: 8 + Math.floor(Math.random() * (w - 60) / 9),
          row: 1 + Math.floor(Math.random() * (h - 100) / 22),
          life: 1,
          char: TRAIL_CHARS[Math.floor(Math.random() * TRAIL_CHARS.length)],
        });
      }
      const keptTime = 260;
      ctx.font = `600 13px ${MONO}`;
      for (const c of cells) {
        c.life -= 1 / keptTime;
        if (c.life <= 0) continue;
        const a = c.life * 0.6;
        ctx.fillStyle = `rgba(255,90,60,${a.toFixed(3)})`;
        ctx.fillText(c.char, 30 + c.col * 9, 52 + c.row * 22);
      }
      cells = cells.filter((c) => c.life > 0);
      raf = requestAnimationFrame(trail);
    };
    raf = requestAnimationFrame(trail);

    const ro = new ResizeObserver(resize);
    ro.observe(parent);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <section className="hero" ref={ref}>
      <div className="hero-inner">
        <div className="copy">
          <div className="kicker">
            <span className="kicker-dot" />
            ZETERMUX — ANDROID TERMINAL
          </div>
          <h1 className="hero-title">
            A terminal built
            <br />
            for <span className="accent">Android</span>.
          </h1>
          <p className="hero-sub">
            A Termux-based terminal environment focused on touch interaction,
            modern mobile UX and powerful terminal capabilities. Termux
            compatible. Designed for touch.
          </p>
          <div className="hero-cta">
            <a className="btn-solid" href="#download">
              Get ZeTermux
            </a>
            <a
              className="btn"
              href="https://github.com/JULESlois/ZeTermux"
              target="_blank"
              rel="noreferrer"
            >
              View on GitHub
            </a>
          </div>
          <div className="hero-meta">
            <span>Android terminal</span>
            <span>Open source</span>
            <span>GPLv3</span>
          </div>
        </div>

        <div className="hero-term">
          <div className="hero-term-head">
            <span>ZETERMUX / SESSION 01</span>
            <span className="live">Android / arm64</span>
          </div>
          <div className="hero-canvas-wrap">
            <canvas ref={canvasRef} />
          </div>
          <div className="hero-term-bar">
            <span className="key">CTRL</span>
            <span className="key">ALT</span>
            <span className="key">ESC</span>
            <span className="key">TAB</span>
            <span className="key">←</span>
            <span className="key">→</span>
            <span className="spacer">80×24</span>
          </div>
        </div>
      </div>
      <div className="hero-rule" />
    </section>
  );
}
