# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — Start development server
- `npm run build` — Production build
- `npm start` — Start production server
- `npm run lint` — Run ESLint

No test framework is configured.

## Architecture

Next.js 16 + React 19 TypeScript dashboard for chia seed shipment analytics ("Zafra 2025"). Purely client-side — no database, no API routes, no backend. All data is hardcoded in `src/lib/data.ts` (147 shipment records).

### Data flow

Static shipment data (`src/lib/data.ts`) → aggregation functions (`src/lib/aggregations.ts`) → dashboard components render KPI cards, 8 Recharts charts, and a searchable/sortable data table.

### Key directories

- `src/app/` — Single-page app: `page.tsx` (client component), `layout.tsx` (providers), `globals.css`
- `src/components/dashboard/` — Domain components: header, kpi-cards, charts, data-table, lang-context
- `src/components/ui/` — shadcn/ui primitives (card, button, input, table, badge)
- `src/lib/` — Data, types, i18n translations, aggregations, chart colors, `cn()` utility

### Patterns

- All components use `"use client"` directive
- State: React Context for language (ES/EN), `useState` for local state, `next-themes` for dark/light mode
- Styling: Tailwind CSS v4 with oklch CSS variables, shadcn/ui "new-york" style, `cn()` (clsx + tailwind-merge)
- i18n: Spanish (default) and English via `src/lib/i18n.ts` translations and `LangContext`
- Path alias: `@/*` → `src/*`
- TypeScript strict mode enabled
