import { useEffect, useRef } from "react";
import type { Palette } from "../sixel";

const FG = "#e2e2dc";
const DIM = "#6d6d66";

export default function GraphicsCanvas({ palette }: { palette: Palette }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
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

    let raf = 0;
    let t = 0;
    const blobAt = (x: number, y: number, k: number) => {
      const a = t * (0.8 + k * 0.25) + k;
      return (
        Math.sin(x * 4.5 + a) * Math.cos(y * 5.2 - a * 1.3) +
        Math.sin((x + y) * 6.0 + a * 0.7) * 0.7 +
        Math.sin(Math.hypot(x - 0.5, y - 0.5) * 14 - a * 1.6) * 0.5
      );
    };

    const draw = () => {
      t += 0.02;
      ctx.clearRect(0, 0, w, h);

      // Sixel band (top half)
      const sixH = h * 0.52;
      ctx.fillStyle = "#0c0c0a";
      ctx.fillRect(0, 0, w, sixH);

      const cols = Math.floor(w / 10);
      const rows = Math.floor(sixH / 10);
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const nx = c / cols;
          const ny = r / rows;
          const v = blobAt(nx, ny, 0);
          if (v < 0.2 || nrand(c, r) < 0.12) continue;
          const grad = Math.abs(blobAt(nx + 0.02, ny, 0) - v) * 3;
          const col = pick(v, grad, palette);
          ctx.fillStyle = col;
          // sixel-like block with 2x3 pattern variation
          const px = c * 10;
          const py = r * 10;
          drawSixelCell(ctx, px, py, 10, (c * 3 + r * 7) % 64);
        }
      }

      // Kitty band (bottom half) — crisp image render
      const kH = h - sixH;
      ctx.fillStyle = "#12120f";
      ctx.fillRect(0, sixH, w, kH);
      // crisp blobs
      for (let i = 0; i < 9; i++) {
        const a = t * 0.7 + i;
        const bx = w * (0.5 + Math.sin(a + i * 1.7) * 0.42);
        const by = sixH + kH * (0.5 + Math.cos(a * 0.9 + i) * 0.36);
        const rad = 26 + 14 * Math.sin(t + i * 0.8);
        const g = ctx.createRadialGradient(bx, by, 0, bx, by, rad * 2.2);
        g.addColorStop(0, palette.fg);
        g.addColorStop(0.4, mix(palette.fg, palette.bg, 0.5));
        g.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(bx, by, rad * 2.2, 0, Math.PI * 2);
        ctx.fill();
      }
      // fine grid lines (crisp, as kitty is pixel-accurate)
      ctx.strokeStyle = "rgba(250,250,247,0.06)";
      ctx.lineWidth = 1;
      for (let x = 0; x < w; x += 26) {
        ctx.beginPath();
        ctx.moveTo(x + 0.5, sixH);
        ctx.lineTo(x + 0.5, h);
        ctx.stroke();
      }
      for (let y = sixH; y < h; y += 26) {
        ctx.beginPath();
        ctx.moveTo(0, y + 0.5);
        ctx.lineTo(w, y + 0.5);
        ctx.stroke();
      }

      // labels
      ctx.font = `600 11px "JetBrains Mono", monospace`;
      ctx.fillStyle = FG;
      ctx.fillText("■ SIXEL — DITHERED · CELL-ALIGNED", 14, 22);
      ctx.fillText("■ KITTY GRAPHICS — PIXEL ACCURATE", 14, sixH + 22);
      ctx.fillStyle = DIM;
      ctx.textAlign = "right";
      ctx.fillText("EXPERIMENTAL", w - 14, 22);
      ctx.fillText("RESEARCH", w - 14, sixH + 22);
      ctx.textAlign = "left";

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    const ro = new ResizeObserver(resize);
    ro.observe(parent);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [palette]);

  return (
    <div className="canvas-fill">
      <canvas ref={ref} />
    </div>
  );
}

function nrand(x: number, y: number) {
  let n = x * 374761393 + y * 668265263;
  n = (n ^ (n >> 13)) * 1274126177;
  return ((n ^ (n >> 16)) >>> 0) / 4294967295;
}

function pick(v: number, grad: number, p: Palette) {
  if (v > 1.1) return grad > 0.6 ? p.accent : p.fg;
  if (v > 0.7) return p.mid;
  return p.dim;
}

function mix(a: string, b: string, t: number) {
  const pa = hex(a);
  const pb = hex(b);
  const c = pa.map((v, i) => Math.round(v + (pb[i] - v) * t));
  return `rgb(${c[0]},${c[1]},${c[2]})`;
}
function hex(s: string) {
  const n = s.replace("#", "");
  return [
    parseInt(n.slice(0, 2), 16),
    parseInt(n.slice(2, 4), 16),
    parseInt(n.slice(4, 6), 16),
  ];
}

function drawSixelCell(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  s: number,
  pat: number
) {
  // 2 columns x 3 rows block pattern, sixel-style
  const cw = s / 2;
  const chh = s / 3;
  for (let i = 0; i < 6; i++) {
    if (pat & (1 << i)) {
      ctx.fillRect(x + (i % 2) * cw, y + Math.floor(i / 2) * chh, cw, chh);
    }
  }
}
