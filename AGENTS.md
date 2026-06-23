# AGENTS.md — Juan Román Garza Webpage

## Stack

Vue 3 + TypeScript + Vite 7 + Pinia + Vue Router 4 + SCSS + GSAP + Axios.

## Commands

| Command | What it does |
|---------|-------------|
| `pnpm dev` | Start Vite dev server |
| `pnpm build` | **`vue-tsc -b && vite build`** — typecheck + build in one step |
| `pnpm preview` | Preview built output |

pnpm is the package manager. `.npmrc` sets `node-linker=hoisted`.

## No tests, no linter, no formatter

This project has no test framework, no ESLint, no Prettier, no CI config.

## Routes (7, lazy-loaded)

- `/` → HomeView
- `/sobre-mi` → AboutView
- `/powerhouse` → PowerhouseView
- `/longevidad-regenerativa` → ApproachView
- `/empresas` → EcosystemView
- `/prensa-y-eventos` → PressView
- `/contacto` → ContactView

Each route sets `document.title` via `router.beforeEach`. Dynamic SEO meta (OG, Twitter, canonical) is handled by `useSeoMeta` composable in `App.vue`.

## Key conventions

- **Path alias**: `@` maps to `src/` (vite + tsconfig configured).
- **SCSS**: `@/styles/index.scss` is auto-injected globally via vite config (`additionalData`). Color and font variables from `colorVariables.module.scss` and `fonts.module.scss` are always available.
- **Single dark theme**: The app uses a dark blue palette only. The `toggleTheme` in `App.vue` exists but light theme styles were removed.
- **Components are under `src/components/`**, views under `src/views/`, composables under `src/composables/`.
- **One Pinia store** (`src/stores/user.ts`) handles auth token hydration from `localStorage`.

## Services & env

- **API client**: `src/services/httpBase.ts` — axios wrapper. Base URL from `VITE_API_BASE_URL` (default `http://localhost:8100/api`). Reads `access_token` from localStorage for Bearer auth. Dispatches `auth:token-expired` event on 401.
- **Contact form**: `ContactForm.vue` posts to a LeadConnectorHQ webhook from `VITE_WEBHOOK_URL` env var. Includes `vue-tel-input` for international phone.
- Required env: `VITE_API_BASE_URL`, `VITE_WEBHOOK_URL` (see `.env.example`).

## Assets

Images/videos are hosted on Cloudinary and tracked in `assets-info.json` at the repo root. The Cloudinary account is `drw5sn8qw`, assets under `assets-juan/` folder.

## SEO

- Full JSON-LD schemas (Person, Organization, WebSite, ProfessionalService) in `index.html`.
- `assets-info.json` has descriptions for Google Images SEO.
- `public/llms.txt` for LLM ingestion (llmstxt.org standard).
- `public/_redirects` has `/* /index.html 200` for SPA fallback on static hosts (Netlify-style).
- GTM container ID: `GTM-MHMGHTBH`.
- LeadConnectorHQ chat widget loaded in `index.html` (widget `6a1cb4e896c166bea6161213`).

## Additional

- `vite.config.js` and `vite.config.ts` are duplicates — edit both or prefer `vite.config.ts` (included in tsconfig.node.json).
- SCSS global file `src/styles/index.scss` forwards color/font modules and defines sass helpers (`lighten`, `darken`) — do not duplicate these.
