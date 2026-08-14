# Game Ratings

Shared scoreboard: add games, rate them in your PIN-locked column, sync live via Supabase.

## Setup

1. `npm install`
2. Copy `.env.example` to `.env` and add `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY`
3. `npm run dev`

## Scripts

- `npm run dev` — local server
- `npm run build` — production build to `dist`
- `npm run preview` — preview the build

GitHub Pages reads the same Vite keys from Actions secrets.
