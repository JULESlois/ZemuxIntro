import { useEffect, useRef, useState } from "react";

interface Line {
  text: string;
  tone?: "dim" | "accent" | "normal";
}

const HELP: Line[] = [
  { text: "Available commands:", tone: "dim" },
  { text: "  about      what ZeTermux is" },
  { text: "  features   the touch-first layer" },
  { text: "  graphics   sixel / kitty status" },
  { text: "  install    get the apk" },
  { text: "  github     source, issues, PRs" },
  { text: "  clear      wipe the screen" },
];

function respond(cmd: string): Line[] {
  switch (cmd.trim().toLowerCase()) {
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
        { text: "  touch controls      custom control bar" },
        { text: "  immersive mode      true fullscreen workspace" },
        { text: "  keyboard / IME      android-native input" },
        { text: "  gestures            scroll, select, paste" },
        { text: "  termux ecosystem    pkg, bash, tmux, git…", tone: "dim" },
      ];
    case "graphics":
      return [
        { text: "  sixel          EXPERIMENTAL", tone: "accent" },
        { text: "  kitty          RESEARCH", tone: "dim" },
        { text: "  true color     SUPPORTED" },
      ];
    case "install":
      return [
        { text: "  1. download the apk from the Download section" },
        { text: "  2. allow installation from this source" },
        { text: "  3. install and launch ZeTermux" },
        { text: "  → your $HOME and pkg data are kept on update", tone: "dim" },
      ];
    case "github":
      return [
        { text: "  repo         github.com/zetermux/zetermux" },
        { text: "  issues       report bugs & requests" },
        { text: "  discussions  design conversations" },
        { text: "  contributing build it. break it. improve it.", tone: "dim" },
      ];
    case "hello":
    case "hi":
      return [{ text: "  hello, traveler. try `help`.", tone: "accent" }];
    case "ls":
      return [{ text: "  bin  etc  home  lib  tmp  usr  var", tone: "dim" }];
    case "whoami":
      return [{ text: "  you — on android, finally at home.", tone: "accent" }];
    case "":
      return [];
    default:
      return [
        { text: `  zetermux: command not found: ${cmd.trim()}`, tone: "dim" },
        { text: "  type `help` to list commands", tone: "dim" },
      ];
  }
}

export default function TerminalDemo() {
  const [lines, setLines] = useState<Line[]>([
    { text: "ZeTermux 0.4.2 — interactive preview", tone: "dim" },
    { text: "Termux environment · touch-first shell", tone: "dim" },
    { text: "type `help` and press enter", tone: "accent" },
  ]);
  const [value, setValue] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [hIdx, setHIdx] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = boxRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  const run = () => {
    const cmd = value;
    setValue("");
    setHIdx(-1);
    if (cmd.trim().toLowerCase() === "clear") {
      setHistory((h) => [...h, cmd]);
      setLines([]);
      return;
    }
    setHistory((h) => [...h, cmd]);
    setLines((l) => [
      ...l,
      { text: `ze$ ${cmd}`, tone: "normal" },
      ...respond(cmd),
    ]);
  };

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") run();
    else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length === 0) return;
      const i = hIdx < 0 ? history.length - 1 : Math.max(0, hIdx - 1);
      setHIdx(i);
      setValue(history[i]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (hIdx < 0) return;
      const i = hIdx + 1;
      if (i >= history.length) {
        setHIdx(-1);
        setValue("");
      } else {
        setHIdx(i);
        setValue(history[i]);
      }
    }
  };

  return (
    <div className="term-frame" onClick={() => inputRef.current?.focus()}>
      <div className="term-wrap" ref={boxRef}>
        {lines.map((l, i) => (
          <div
            key={i}
            className={`tline ${l.tone === "dim" ? "dim" : l.tone === "accent" ? "accent" : ""}`}
          >
            {l.text}
          </div>
        ))}
      </div>
      <div className="term-input-row">
        <span className="prompt">ze$</span>
        <input
          ref={inputRef}
          className="term-input"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={onKey}
          placeholder="help"
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck={false}
          aria-label="terminal input"
        />
        <span className="cursor-block" />
      </div>
      <div className="term-chips">
        {["help", "features", "graphics", "install", "github", "clear"].map(
          (c) => (
            <button
              key={c}
              className="chip"
              onClick={() => {
                setValue(c);
                inputRef.current?.focus();
              }}
            >
              {c}
            </button>
          )
        )}
      </div>
    </div>
  );
}
