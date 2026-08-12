import { useScrollProgress } from "../hooks";

const REPO = "https://github.com/JULESlois/ZeTermux";

export default function Nav() {
  const p = useScrollProgress();
  return (
    <header>
      <div className="scroll-progress" style={{ transform: `scaleX(${p})` }} />
      <nav>
        <a className="brand" href="#top">
          <span className="brand-mark" />
          ZeTermux
        </a>
        <div className="nav-links">
          <a href="#why">Why</a>
          <a href="#touch">Touch</a>
          <a href="#immersive">Immersive</a>
          <a href="#demo">Demo</a>
          <a href="#roadmap">Roadmap</a>
          <a href="#docs">Docs</a>
        </div>
        <a className="nav-gh" href={REPO} target="_blank" rel="noreferrer">
          GitHub ↗
        </a>
      </nav>
    </header>
  );
}
