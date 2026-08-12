export interface Palette {
  id: string;
  label: string;
  fg: string;
  mid: string;
  dim: string;
  bg: string;
  accent: string;
}

export const PALETTES: Palette[] = [
  {
    id: "ramp",
    label: "PAPER RAMP",
    fg: "#e2e2dc",
    mid: "#9a9a92",
    dim: "#3a3a35",
    bg: "#12120f",
    accent: "#c83124",
  },
  {
    id: "ink",
    label: "INK & SIGNAL",
    fg: "#14130f",
    mid: "#6d6d66",
    dim: "#d8d6ce",
    bg: "#f0eee6",
    accent: "#c83124",
  },
  {
    id: "field",
    label: "FIELD PAPER",
    fg: "#e8e4d8",
    mid: "#8a8674",
    dim: "#333028",
    bg: "#191813",
    accent: "#d97b28",
  },
];
