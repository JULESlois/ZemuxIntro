import { useEffect, useRef } from "react";

const PACKAGES = [
  "bash", "zsh", "fish", "tmux", "vim", "neovim", "clang", "python",
  "node", "rust", "git", "ssh", "curl", "grep", "sed", "awk", "make",
  "cmake", "gzip", "tar", "xz", "openssl", "htop", "fzf", "ripgrep",
  "sqlite", "ffmpeg", "imagemagick", "rsync", "nmap", "jq",
];

export default function CompatCanvas() {
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

    const lanes = 5;
    const items = PACKAGES.map((p, i) => ({
      name: p,
      lane: i % lanes,
      speed: 22 + ((i * 13) % 4) * 9,
      seed: Math.random() * w * 2,
    }));

    let raf = 0;
    let t = 0;
    const draw = () => {
      t += 1 / 60;
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "#12120f";
      ctx.fillRect(0, 0, w, h);

      // faint horizontal rules for lanes
      for (let l = 0; l <= lanes; l++) {
        const y = 10 + (h - 60) * (l / lanes);
        ctx.strokeStyle = "rgba(250,250,247,0.05)";
        ctx.beginPath();
        ctx.moveTo(0, y + 0.5);
        ctx.lineTo(w, y + 0.5);
        ctx.stroke();
      }

      ctx.font = `13px "JetBrains Mono", monospace`;
      for (const it of items) {
        const span = w + 160;
        const x = span - ((it.seed + t * it.speed) % span) - 80;
        const y = 10 + (h - 60) * ((it.lane + 0.72) / lanes);
        const centerDist = Math.abs(x - w * 0.5) / (w * 0.5);
        const a = Math.max(0.08, 0.5 - centerDist * 0.55);
        ctx.fillStyle =
          it.name === "neovim" || it.name === "tmux"
            ? `rgba(255,90,60,${(a + 0.25).toFixed(3)})`
            : `rgba(226,226,220,${a.toFixed(3)})`;
        ctx.fillText(it.name, x, y);
      }

      // center marker
      ctx.fillStyle = "rgba(200,49,36,0.85)";
      ctx.fillRect(w * 0.5 - 0.5, 6, 1, h - 52);
      ctx.font = `10px "JetBrains Mono", monospace`;
      ctx.fillStyle = "#6d6d66";
      ctx.textAlign = "center";
      ctx.fillText("TERMUX ECOSYSTEM — CONTINUOUS STREAM", w * 0.5, h - 12);
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
  }, []);

  return <canvas ref={ref} />;
}
