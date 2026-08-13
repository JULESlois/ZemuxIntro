import { useEffect, useRef } from "react";
import { useReveal } from "../hooks";
import { GithubIcon } from "./icons";

const MONO = '"JetBrains Mono", monospace';

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
    };
    resize();

    const PAD = 26;
    const logo = ["▄▄▄▄▄▄▄▄▄▄▄▄▄", "█ ZETERMUX █", "▀▀▀▀▀▀▀▀▀▀▀▀▀"];
    const info: Array<[string, string]> = [
      ["zetermux@android", ""],
      ["──────────────", ""],
      ["OS", "Android"],
      ["Host", "arm64"],
      ["Shell", "bash"],
      ["Terminal", "ZeTermux"],
    ];

    let raf = 0;
    let last = 0;
    let on = true;

    const render = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.font = `13px ${MONO}`;
      ctx.textBaseline = "top";

      // command line
      ctx.fillStyle = "#6d6d66";
      ctx.fillText("zetermux", PAD, 20);
      const w1 = ctx.measureText("zetermux ").width;
      ctx.fillStyle = "#ff5a3c";
      ctx.fillText("$ ", PAD + w1, 20);
      ctx.fillStyle = "#e2e2dc";
      ctx.fillText("neofetch", PAD + w1 + ctx.measureText("$ ").width, 20);

      // logo (left, red)
      ctx.font = `600 13px ${MONO}`;
      ctx.fillStyle = "#c83124";
      let y = 60;
      for (const l of logo) {
        ctx.fillText(l, PAD, y);
        y += 21;
      }

      // info (right, dim label + light value)
      ctx.font = `13px ${MONO}`;
      const ix = PAD + 150;
      y = 60;
      for (const [k, v] of info) {
        if (v === "") {
          ctx.fillStyle = "#8a8a82";
          ctx.fillText(k, ix, y);
        } else {
          ctx.fillStyle = "#6d6d66";
          ctx.fillText(k, ix, y);
          ctx.fillStyle = "#e2e2dc";
          ctx.fillText(v, ix + ctx.measureText(k + "  ").width, y);
        }
        y += 21;
      }

      // prompt with block cursor
      const py = h - 34;
      ctx.fillStyle = "#6d6d66";
      ctx.fillText("zetermux", PAD, py);
      const pw = ctx.measureText("zetermux ").width;
      ctx.fillStyle = "#ff5a3c";
      ctx.fillText("$", PAD + pw, py);
      if (on) {
        ctx.fillRect(PAD + pw + ctx.measureText("$ ").width, py + 2, 9, 15);
      }
    };

    const loop = (ts: number) => {
      if (ts - last > 520) {
        on = !on;
        last = ts;
      }
      render();
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

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
              <GithubIcon />
              GitHub
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
    </section>
  );
}
