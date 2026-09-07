# Movie Watchlist

A dark-mode movie watchlist built with React, TypeScript, and Vite for the Session 10 mini project.

## Requirements

- Git.
- Node.js 22 or newer, with npm.
- Access to this private GitHub repository and GitHub authentication configured for Git.

No backend service, API key, or environment file is required.

## Get the project and run it

Clone the repository and enter its folder:

```bash
git clone https://github.com/majedhmoud/mini-project-2.git
cd mini-project-2
```

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Open the local URL printed in the terminal, usually `http://localhost:5173`. Vite may choose another port if that one is busy. Keep the terminal running while using the app; press `Ctrl+C` to stop it.

If cloning reports “Repository not found,” check that you are signed into a GitHub account with access to this private repository.

Use `npm install` for the first installation: this repository currently has no committed `package-lock.json`, so `npm ci` will not work until a lockfile is generated and committed.

## Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the development server with live updates. |
| `npm run lint` | Check the source code with ESLint. |
| `npm run build` | Run TypeScript checks and create the production build in `dist/`. |
| `npm run preview` | Serve an existing production build locally for inspection. |

To inspect the build locally:

```bash
npm run build
npm run preview
```

Open the URL printed by the preview server. Read the production-data limitation below before expecting movies to load in preview.

## Things to be aware of

- **Changes are temporary.** Movies initially load from `public/movies.json`. Adding, editing, deleting, and toggling movies only changes React state. Refreshing the page restores the original data; there is no database or local-storage persistence.
- **Editing currently saves only the title.** The edit form includes genre and director controls, but `handleSaveEdit` in `src/App.tsx` currently updates only the title.
- **Genre options come from the current movie list.** You cannot create a new genre through the form. Deleting every movie in a genre removes that option; deleting all movies leaves no genre available for adding another movie until you reload the sample data.
- **Counts use the full list.** Search and status filters affect visible movies, but the statistics and genre counts describe the entire current collection.
- **Filters combine.** If a movie seems missing, clear the search and select both the all-status filter and All Genres.
- **Production data loading needs a path correction.** `src/api.ts` currently requests `./public/movies.json`. Vite copies public assets to the build root, so this path does not match the built `dist/movies.json`. Before deployment, change the URL to `${import.meta.env.BASE_URL}movies.json` and verify movie loading with `npm run preview`. A successful build alone does not verify data loading.

## What not to do

- Do not rely on the app to permanently save your watchlist; refreshes discard your changes.
- Do not open `index.html` directly from the file system. Use the Vite development or preview server.
- Do not edit `dist/` or `node_modules/`; update the source files instead. These generated directories are ignored by Git.
- Do not put passwords, tokens, or private data in source files or `public/`. Public assets are delivered to the browser, and frontend code cannot keep secrets. Local `.env` files are ignored by Git, but values included in frontend bundles are still visible to users.
- Do not treat `npm run preview` as a production hosting service. It is for checking a build locally.

## Project structure

```text
public/movies.json       Sample movie data
src/App.tsx             Movie state, event handlers, filters, and statistics
src/components/         Movie cards, forms, search, filters, and header
src/api.ts              Movie-data loading
src/types.ts            Shared TypeScript types
src/index.css           Dark theme and responsive styling
src/main.tsx            React entry point
```
