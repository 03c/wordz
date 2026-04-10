# Wordz

A client-side clone of the popular [Wordle](https://www.nytimes.com/games/wordle/index.html) word game, built with React and TypeScript.

Play it live at [wordz.hardcopy.dev](https://wordz.hardcopy.dev).

## How to Play

1. Guess the 6-letter word in 6 attempts.
2. After each guess, tiles change colour to show how close you were:
   - **Green** — correct letter in the correct position.
   - **Yellow** — correct letter in the wrong position.
   - **Grey** — letter not in the word.
3. Use the on-screen keyboard or your own to type guesses.

## Getting Started

```bash
npm install
npm start
```

The app runs at [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start the dev server |
| `npm test` | Run tests (Jest + React Testing Library) |
| `npm run build` | Production build to `build/` |
| `npm run deploy` | Cloudflare Workers deploy (`predeploy` runs `npm run build`; uses `wrangler.toml`) |

## Deploying to Cloudflare

Production and PR preview deploys run in **GitHub Actions** (see `.github/workflows/`). They call **`wrangler deploy`** explicitly — `cloudflare/wrangler-action` defaults to `versions upload` when `command` is omitted, which **does not work** with [Workers Sites](https://developers.cloudflare.com/workers/platform/sites/) (`[site]` in `wrangler.toml`).

Locally, after `wrangler login`:

```bash
npm run deploy
```

**PR previews** deploy a separate Worker named `wordz-pr-<number>` on `*.workers.dev` and post the URL as a sticky PR comment. They do not use production zone routes. Fork PRs skip deploy (no repo secrets).

## Tech Stack

- [React 17](https://reactjs.org/) + TypeScript
- [Create React App](https://create-react-app.dev/)
- [react-toastify](https://github.com/fkhadra/react-toastify) for notifications
- Optional [Cloudflare Workers](https://workers.cloudflare.com/) deployment

## Author

Made by [03c](https://github.com/03c) — read more on [hardcopy.dev](https://hardcopy.dev).

## License

MIT

