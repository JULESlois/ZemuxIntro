import { useScrollProgress } from "../hooks";

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
          <a href="#features">Features</a>
          <a href="#demo">Demo</a>
          <a href="#roadmap">Roadmap</a>
          <a href="#download">Download</a>
          <a href="#docs">Docs</a>
        </div>
        <a className="nav-gh" href="#github">
          GitHub ↗
        </a>
      </nav>
    </header>
  );
}
