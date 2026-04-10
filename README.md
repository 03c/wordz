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
| `npm run deploy:cf` | Production build + Cloudflare Workers deploy (see below) |

## Deploying to Cloudflare

This repo uses [Workers Sites](https://developers.cloudflare.com/workers/platform/sites/) (`[site]` in `wrangler.toml`) to serve the CRA `build/` folder.

**Do not use** `wrangler versions upload` for this project. Workers Sites does not support that flow; you must deploy with:

```bash
npm run deploy:cf
```

That runs `npm run build` and then `wrangler deploy`. You need the [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/) authenticated (`wrangler login`) and a matching `build/` output before deploy.

## Tech Stack

- [React 17](https://reactjs.org/) + TypeScript
- [Create React App](https://create-react-app.dev/)
- [react-toastify](https://github.com/fkhadra/react-toastify) for notifications
- Optional [Cloudflare Workers](https://workers.cloudflare.com/) deployment

## Author

Made by [03c](https://github.com/03c) — read more on [hardcopy.dev](https://hardcopy.dev).

## License

MIT

