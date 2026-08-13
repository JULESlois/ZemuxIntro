import { useEffect, useRef } from "react";

const MONO = '"JetBrains Mono", monospace';

const TERM_LINES: Array<{ text: string; dim?: boolean }> = [
  { text: "$ ssh pi@camera.local" },
  { text: "Welcome to Raspberry Pi OS", dim: true },
  { text: "$ tail -f /var/log/motion.log" },
  { text: "motion: frame 20481 — 12:41:07" },
  { text: "motion: frame 20482 — 12:41:08" },
  { text: "⟨ ctrl-c pressed via control bar ⟩", dim: true },
  { text: "$ exit" },
];

export default function ImmersiveCanvas() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = wrap.clientWidth;
    let h = wrap.clientHeight;
    const resize = () => {
      w = wrap.clientWidth;
      h = wrap.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    let raf = 0;
    let t = 0;

    const draw = () => {
      t += 0.012;
      const loop = (Math.sin(t * 0.55) + 1) / 2; // 0..1
      const split = loop; // 0 = immersive, 1 = stock android chrome

      ctx.clearRect(0, 0, w, h);

      // centered phone geometry, aspect ratio ~0.5
      const maxH = h - 48;
      const maxW = w - 48;
      const phW = Math.min(maxW, 360, maxH * 0.5);
      const phH = phW * 2;
      const phX = (w - phW) / 2;
      const phY = (h - phH) / 2;

      // phone body
      ctx.fillStyle = "#12120f";
      roundRect(ctx, phX, phY, phW, phH, 18);
      ctx.fill();

      const inset = 6;
      const sx = phX + inset;
      const sy = phY + inset;
      const sw = phW - inset * 2;
      const sh = phH - inset * 2;

      // chrome sizes driven by split
      const topBar = 26 * split;
      const botBar = 30 * split;
      const termTop = sy + topBar;
      const termH = sh - topBar - botBar;

      // status / nav bars (Android chrome)
      if (split > 0.02) {
        ctx.fillStyle = "rgba(250,250,247,0.05)";
        ctx.fillRect(sx, sy, sw, topBar);
        ctx.fillRect(sx, sy + topBar + termH, sw, botBar);
        // clock
        ctx.fillStyle = "rgba(164,164,154,0.9)";
        ctx.font = `600 9px ${MONO}`;
        ctx.fillText("09:41", sx + 8, sy + 16);
        ctx.textAlign = "right";
        ctx.fillText("▂▄▆ 5G", sx + sw - 8, sy + 16);
        ctx.textAlign = "left";
        // gesture pill
        const pillW = Math.min(90, sw * 0.3);
        ctx.fillStyle = "rgba(250,250,247,0.25)";
        roundRect(ctx, sx + sw / 2 - pillW / 2, sy + topBar + termH + 10, pillW, 4, 2);
        ctx.fill();
      }

      // terminal region
      ctx.save();
      ctx.beginPath();
      ctx.rect(sx, termTop, sw, termH);
      ctx.clip();
      ctx.fillStyle = "#0c0c0a";
      ctx.fillRect(sx, termTop, sw, termH);

      // clean terminal content
      const lh = Math.max(14, termH / 20);
      const fs = Math.max(10, Math.min(12, sw / 26));
      ctx.font = `${fs}px ${MONO}`;
      ctx.textBaseline = "top";
      let ty = termTop + 12;
      for (const l of TERM_LINES) {
        ctx.fillStyle = l.dim ? "#6d6d66" : "#e2e2dc";
        const label = l.text.startsWith("$ ");
        if (label) {
          ctx.fillStyle = "#ff5a3c";
          ctx.fillText("$ ", sx + 10, ty);
          ctx.fillStyle = l.dim ? "#6d6d66" : "#e2e2dc";
          ctx.fillText(l.text.slice(2), sx + 10 + ctx.measureText("$ ").width, ty);
        } else {
          ctx.fillText(l.text, sx + 10, ty);
        }
        ty += lh;
      }

      // subtle scanline
      const sweep = ((t * 60) % termH);
      ctx.fillStyle = "rgba(200,49,36,0.06)";
      ctx.fillRect(sx, termTop + sweep, sw, 2);
      ctx.restore();

      // labels around the canvas
      ctx.fillStyle = "#6d6d66";
      ctx.font = `11px ${MONO}`;
      ctx.fillText(
        split > 0.5 ? "STOCK ANDROID LAYOUT" : "ZETERMUX IMMERSIVE MODE",
        12,
        h - 12
      );
      ctx.fillStyle = split > 0.5 ? "#6d6d66" : "#ff5a3c";
      ctx.textAlign = "right";
      ctx.fillText(split > 0.5 ? "SYSTEM CHROME: VISIBLE" : "SYSTEM CHROME: HIDDEN", w - 12, h - 12);
      ctx.textAlign = "left";

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <div className="canvas-wrap" ref={wrapRef}>
      <canvas ref={canvasRef} />
    </div>
  );
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}
