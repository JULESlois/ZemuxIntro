import { useEffect, useRef } from "react";

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
    const glyphRows = 24;
    const glyphCols = 44;
    const noise: number[] = [];
    for (let i = 0; i < glyphCols * glyphRows; i++) noise.push(Math.random());

    const chars = "01#@$%&*+=~^{}[]();.:";
    const draw = () => {
      t += 0.012;
      const loop = (Math.sin(t * 0.55) + 1) / 2; // 0..1
      const split = loop; // 0 = immersive, 1 = normal android chrome

      ctx.clearRect(0, 0, w, h);

      // Phone body
      const padX = 10;
      ctx.fillStyle = "#12120f";
      ctx.fillRect(padX, 8, w - padX * 2, h - 16);

      // compute chrome sizes driven by split
      const topBar = 22 * split;
      const botBar = 26 * split;
      const termTop = 8 + topBar;
      const termH = h - 16 - topBar - botBar;

      // status / nav bars (Android chrome)
      if (split > 0.02) {
        ctx.fillStyle = "rgba(250,250,247,0.05)";
        ctx.fillRect(padX, 8, w - padX * 2, topBar);
        ctx.fillRect(padX, 8 + topBar + termH, w - padX * 2, botBar);
        // clock
        ctx.fillStyle = "rgba(164,164,154,0.9)";
        ctx.font = `600 10px "JetBrains Mono", monospace`;
        ctx.fillText("09:41", padX + 10, 20);
        ctx.textAlign = "right";
        ctx.fillText("▂▄▆ 5G 🔋", w - padX - 10, 20);
        ctx.textAlign = "left";
        // gesture pill
        const pillW = 90;
        ctx.fillStyle = "rgba(250,250,247,0.25)";
        roundRect(ctx, w / 2 - pillW / 2, 8 + topBar + termH + 9, pillW, 4, 2);
        ctx.fill();
      }

      // terminal region
      ctx.save();
      ctx.beginPath();
      ctx.rect(padX + 2, termTop, w - padX * 2 - 4, termH);
      ctx.clip();

      ctx.fillStyle = "#0c0c0a";
      ctx.fillRect(padX + 2, termTop, w - padX * 2 - 4, termH);

      const cellW = (w - padX * 2) / glyphCols;
      const cellH = termH / glyphRows;
      ctx.font = `${Math.max(9, cellH * 0.72)}px "JetBrains Mono", monospace`;
      for (let r = 0; r < glyphRows; r++) {
        for (let c = 0; c < glyphCols; c++) {
          const n = noise[r * glyphCols + c];
          const pulse = Math.sin(t * 2 + r * 0.6 + c * 0.25) * 0.5 + 0.5;
          const v = n * pulse;
          if (v < 0.35) continue;
          const accent = (r === 3 && c < 12 && pulse > 0.6) || noise[(r * 7 + c) % 10] < 0.04;
          ctx.fillStyle = accent
            ? `rgba(255,90,60,${0.25 + pulse * 0.5})`
            : `rgba(226,226,220,${0.06 + pulse * 0.22})`;
          const ch = chars[(r * glyphCols + c + Math.floor(t * 6)) % chars.length];
          ctx.fillText(ch, padX + 4 + c * cellW, termTop + (r + 0.82) * cellH);
        }
      }

      // scanline up the terminal
      const sweep = ((t * 90) % (termH + 120)) - 60 - 30;
      const sy = termTop + sweep;
      ctx.fillStyle = "rgba(200,49,36,0.10)";
      ctx.fillRect(padX + 2, sy, w - padX * 2 - 4, 24);
      ctx.restore();

      // labels around the canvas
      ctx.fillStyle = "#6d6d66";
      ctx.font = `11px "JetBrains Mono", monospace`;
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
