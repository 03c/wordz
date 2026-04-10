# AGENTS.md

## Cursor Cloud specific instructions

**Wordz** is a client-side Wordle clone built with React 17 + TypeScript via Create React App. There is no backend; the word list is a static `public/words.txt` file.

### Commands

All commands are standard CRA scripts documented in `README.md`:

- **Dev server:** `npm start` (serves on `localhost:3000`)
- **Lint:** `npx eslint src/`
- **Tests:** `npm test` (Jest + React Testing Library, runs in watch mode by default; use `-- --watchAll=false` for CI)
- **Build:** `npm run build`

### Known issues

- The default test in `src/App.test.tsx` fails because it still checks for "learn react" text from the CRA template, which was replaced with game UI. This is a pre-existing issue, not caused by environment setup.

### Notes

- No external services (databases, APIs, Docker) are required.
- Game state is persisted in `localStorage`.
- The `wrangler.toml` and `workers-site/` directory are for optional Cloudflare Workers deployment and are not needed for local development.
