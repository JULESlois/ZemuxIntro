import { useEffect, useRef } from "react";

const MONO = '"JetBrains Mono", monospace';

interface Line {
  text: string;
  tone?: "dim" | "accent" | "normal";
}

const HELP: Line[] = [
  { text: "Available commands:", tone: "dim" },
  { text: "  help       list commands" },
  { text: "  neofetch   system info" },
  { text: "  about      what ZeTermux is" },
  { text: "  features   the touch-first layer" },
  { text: "  graphics   sixel / kitty status" },
  { text: "  install    get the apk" },
  { text: "  github     source, issues, PRs" },
  { text: "  clear      wipe the screen" },
];

const NEOFETCH: Line[] = [
  { text: "zetermux@android" },
  { text: "──────────────", tone: "dim" },
  { text: "OS        Android" },
  { text: "Host      arm64" },
  { text: "Kernel    Linux" },
  { text: "Shell     bash" },
  { text: "Terminal  ZeTermux", tone: "accent" },
  { text: "" },
  { text: "▓▓▓▓▓▓▓▓▓▓▓▓▓▓", tone: "dim" },
];

function respond(cmd: string): Line[] {
  switch (cmd) {
    case "help":
      return HELP;
    case "about":
      return [
        { text: "ZeTermux — a Termux-based terminal for Android." },
        { text: "Termux provides the environment.", tone: "dim" },
        { text: "ZeTermux rethinks the terminal experience.", tone: "dim" },
      ];
    case "features":
      return [
        { text: "  touch controls    custom control bar" },
        { text: "  immersive mode    true fullscreen workspace" },
        { text: "  keyboard / IME    android-native input" },
        { text: "  gestures          scroll, select, paste" },
        { text: "  termux ecosystem  pkg, bash, tmux, git…", tone: "dim" },
      ];
    case "graphics":
      return [
        { text: "  sixel          EXPERIMENTAL", tone: "accent" },
        { text: "  kitty          RESEARCH", tone: "dim" },
        { text: "  true color     SUPPORTED" },
      ];
    case "install":
      return [
        { text: "  1. download the apk from GitHub Releases" },
        { text: "  2. allow installation from this source" },
        { text: "  3. install and launch ZeTermux" },
        { text: "  → your $HOME and pkg data are kept on update", tone: "dim" },
      ];
    case "github":
      return [
        { text: "  repo         github.com/JULESlois/ZeTermux" },
        { text: "  issues       report bugs & requests" },
        { text: "  discussions  design conversations" },
        { text: "  contributing build it. break it. improve it.", tone: "dim" },
      ];
    case "neofetch":
      return NEOFETCH;
    case "ls":
      return [{ text: "bin  etc  home  lib  tmp  usr  var", tone: "dim" }];
    case "whoami":
      return [{ text: "you — on android, finally at home.", tone: "accent" }];
    case "":
      return [];
    default:
      return [
        { text: `zetermux: command not found: ${cmd}`, tone: "dim" },
        { text: "type `help` to list commands", tone: "dim" },
      ];
  }
}

export default function CanvasTerminal() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const FONT = 14;
    const LH = 24;
    const PAD = 32;

    let w = 0;
    let h = 0;
    let raf = 0;
    let last = 0;
    let cursorOn = true;

    let lines: Line[] = [
      { text: "ZeTermux — interactive terminal", tone: "dim" },
      { text: "development build · touch-first shell", tone: "dim" },
      { text: "" },
      { text: "type `help` and press enter", tone: "accent" },
    ];
    let input = "";
    let history: string[] = [];
    let hIdx = -1;

    const resize = () => {
      w = wrap.clientWidth;
      h = wrap.clientHeight;
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const run = (raw: string) => {
      const cmd = raw.trim().toLowerCase();
      if (cmd) history.push(raw);
      hIdx = -1;
      lines.push({ text: `ze$ ${raw}`, tone: "normal" });
      if (cmd === "clear") {
        lines = [];
        input = "";
        return;
      }
      lines.push(...respond(cmd));
      input = "";
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault();
        run(input);
      } else if (e.key === "Backspace") {
        e.preventDefault();
        input = input.slice(0, -1);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        if (history.length === 0) return;
        hIdx = hIdx < 0 ? history.length - 1 : Math.max(0, hIdx - 1);
        input = history[hIdx];
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        if (hIdx < 0) return;
        const i = hIdx + 1;
        if (i >= history.length) {
          hIdx = -1;
          input = "";
        } else {
          hIdx = i;
          input = history[i];
        }
      } else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
        e.preventDefault();
        input += e.key;
      }
    };

    const render = () => {
      ctx.fillStyle = "#0c0c0a";
      ctx.fillRect(0, 0, w, h);

      ctx.font = `${FONT}px ${MONO}`;
      ctx.textBaseline = "top";

      const prompt = "ze$ ";
      const pw = ctx.measureText(prompt).width;
      const promptY = h - PAD - LH;

      // history lines above the prompt
      const room = Math.floor((promptY - PAD) / LH);
      const start = Math.max(0, lines.length - room);
      const vis = lines.slice(start);
      let y = promptY - vis.length * LH;
      for (const l of vis) {
        ctx.fillStyle =
          l.tone === "dim" ? "#6d6d66" : l.tone === "accent" ? "#ff5a3c" : "#e2e2dc";
        ctx.fillText(l.text, PAD, y);
        y += LH;
      }

      // prompt (dim "ze", accent "$")
      ctx.fillStyle = "#6d6d66";
      ctx.fillText("ze", PAD, promptY);
      ctx.fillStyle = "#ff5a3c";
      ctx.fillText("$ ", PAD + ctx.measureText("ze").width, promptY);

      // input
      ctx.fillStyle = "#e2e2dc";
      ctx.fillText(input, PAD + pw, promptY);

      // block cursor
      if (cursorOn) {
        const iw = ctx.measureText(input).width;
        ctx.fillStyle = "#ff5a3c";
        ctx.fillRect(PAD + pw + iw, promptY + 3, 9, FONT + 1);
      }
    };

    const loop = (ts: number) => {
      if (ts - last > 520) {
        cursorOn = !cursorOn;
        last = ts;
      }
      render();
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    canvas.tabIndex = 0;
    canvas.addEventListener("keydown", onKey);
    const focus = () => canvas.focus();
    wrap.addEventListener("click", focus);
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    return () => {
      cancelAnimationFrame(raf);
      canvas.removeEventListener("keydown", onKey);
      wrap.removeEventListener("click", focus);
      ro.disconnect();
    };
  }, []);

  return (
    <div className="canvas-term" ref={wrapRef}>
      <canvas ref={canvasRef} />
    </div>
  );
}
