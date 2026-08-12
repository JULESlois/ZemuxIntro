# ZeTermux Intro

The website for [ZeTermux](https://github.com/JULESlois/ZeTermux) — a Termux-based
terminal environment rebuilt around touch interaction and modern mobile UX.

This repo contains the static intro site (Phase 2 — anti-template visual
consolidation). It is not the terminal itself; the terminal lives in the
`JULESlois/ZeTermux` repository.

## Stack

- React + TypeScript + Vite
- No UI framework — hand-rolled stylesheet only
- JetBrains Mono for system/code metadata, Inter for display and body text

## Develop

```bash
npm install
npm run dev       # start the dev server
npm run build     # type-check + production build
npm run lint      # oxlint
```

## Design rules

1. No generic bento grids.
2. No pill-shaped tags or badges.
3. Default border-radius = 0.
4. Use borders / rules / spacing instead of containers.
5. Every major section uses a different composition.
6. JetBrains Mono is for system/code metadata, not all prose.
7. Canvas / terminal visuals may break out of the content grid.
8. Never imitate desktop window chrome on an Android-first product.

If removing a card does not make the information harder to understand, remove
the card.
