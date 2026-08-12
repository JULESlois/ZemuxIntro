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
  ctx.fillStyle = "#a4a49a";
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
    ctx.fillStyle = "#0f0f0d";
    ctx.font = `600 13px ${MONO}`;
    ctx.fillText("zetermux $ neofetch --os android", 30, 70 + lines * 22);

    let cells: Cell[] = [];
    let raf = 0;
    let t = 0;
    const trail = () => {
      t++;
      // fading overlay
      ctx.fillStyle = "rgba(250,250,247,0.14)";
      ctx.fillRect(0, 36, w, h - 72);

      // re-stamp persistent base lines occasionally to keep them stable
      if (t % 24 === 0) {
        ctx.fillStyle = "rgba(250,250,247,1)";
        // redraw one base line to counteract fade
        const idx = Math.floor(Math.random() * lines);
        ctx.save();
        ctx.clearRect(24, 60 + idx * 22, w - 48, 20);
        ctx.restore();
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
        const a = c.life * 0.5;
        ctx.fillStyle = `rgba(200,49,36,${a.toFixed(3)})`;
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
        <div className="copy reveal-group">
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
              Download ZeTermux
            </a>
            <a className="btn" href="#github">
              View on GitHub
            </a>
          </div>
          <div className="hero-meta">
            <span>v0.4.2</span>
            <span>arm64-v8a</span>
            <span>Open source — Apache 2.0</span>
          </div>
        </div>

        <div className="hero-demo">
          <div className="demo-chrome">
            <span className="dot red" />
            <span className="dot" />
            <span className="dot" />
            <span className="demo-title">zetermux — tmux attach</span>
            <span className="live-tag">live canvas</span>
          </div>
          <div className="hero-canvas-wrap">
            <canvas ref={canvasRef} />
          </div>
          <div className="demo-bar">
            <span>ESC</span>
            <span>CTRL</span>
            <span>ALT</span>
            <span>TAB</span>
            <span>←</span>
            <span>→</span>
            <span style={{ marginLeft: "auto" }}>80×24</span>
          </div>
        </div>
      </div>
      <div className="hero-rule" />
    </section>
  );
}
