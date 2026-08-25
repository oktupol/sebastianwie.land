# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Personal website (sebastianwie.land) — a zoneless, fully standalone Angular 22 SPA, pre-rendered to static HTML at build time and deployed to GitHub Pages. Its main feature is a contact form that PGP-encrypts a full MIME message **in the browser** before posting it to an API, plus a page that verifies PGP signatures on `.eml` files exported from mail clients.

## Commands

```bash
npm start                    # ng serve --ssl (HTTPS; dev backend is https://localhost:8001/api)
npm run build                # production build + prerender → dist/sebastianwie-land/browser
npm test                     # Karma/Jasmine, watch mode
```

Headless single run (what CI-style verification wants):

```bash
CHROME_BIN=$(which chromium) npx ng test --watch=false --browsers=ChromeHeadless
```

Run a single spec by adding `--include='**/encoding.service.spec.ts'`. `karma.conf.js` names the `Chromium` browser for interactive use; the local binary is `/usr/bin/chromium`, so `CHROME_BIN` usually has to be set.

There is no linter configured.

CI (`.github/workflows/publish.yml`) runs `npm ci` → `npm run build` → `peaceiris/actions-gh-pages`, publishing `dist/sebastianwie-land/browser` on every push to `master`. It needs no browser: prerendering runs in Node.

## Architecture

### Build and pre-rendering
The `@angular/build:application` (esbuild) builder is configured with `outputMode: "static"`, so `npm run build` prerenders **every** route to static HTML — currently 10, listed in `dist/sebastianwie-land/prerendered-routes.json`. Routes are discovered automatically from the router config, including the legacy `/signature-info` and `/signature-info.html` redirects, which emit redirect stubs to `/contact/verify`.

`src/main.server.ts` / `src/app/app.module.server.ts` / `src/app/app.routes.server.ts` exist **only** to drive prerendering; no server is deployed. `app.routes.server.ts` marks `**` as `RenderMode.Prerender`.

Because the app is rendered in Node at build time, **anything touching `window` at module scope breaks the build**. Existing accommodations, worth preserving:
- `hammerjs` is imported lazily inside `TitleListenerComponent`, and listener setup is skipped unless `isPlatformBrowser`, because importing Hammer touches `window`.
- The `WINDOW` token resolves via `DOCUMENT.defaultView` and is typed `Window | null`.
- `provideHttpClient` deliberately uses the default fetch backend (no `withXhr()`), which is what lets the markdown pages prerender with their content rather than an empty shell.

`src/gh-pages/` is copied to the output root verbatim (`CNAME`, `.nojekyll`, `keybase.txt`, `pgp-pubkey.asc`). Rotating the PGP key means replacing `pgp-pubkey.asc` there.

### Routing & configuration
The app is **fully standalone** — there are no NgModules. Wiring lives in:
- `src/app/app.config.ts` — the root `ApplicationConfig` (router, store, effects, devtools, HttpClient, hydration, `WINDOW`).
- `src/app/app.config.server.ts` — merges the server-rendering providers on top for prerendering.
- `src/app/app.routes.ts` — root routes, lazy-loading `sites/*` → `content.routes.ts` and `contact/*` → `contact.routes.ts`.

Feature-scoped state and services are declared in the feature route's `providers` (`provideState`, `provideEffects`, plus the contact services), which keeps them lazy exactly as the old feature NgModules did.

Content pages are markdown-driven: `ContentRoutingModule` maps a route to `MarkdownComponent` via `data.markdownFile` pointing at `src/assets/content/*.md` (rendered by `ngx-markdown`). Adding a prose page = add a `.md` file plus a route entry, no new component — and it will be prerendered automatically.

### State (NgRx)
Root store (`src/app/store`) holds `title`, `navigation`, `globalMessages`. `ContactModule` registers a feature store (`src/app/modules/contact/store`) with `contactForm` and `openpgp` slices. Convention throughout: `actions/`, `effects/`, `reducer(s)/`, `selectors/`, each reducer file exporting `FEATURE`, `State`, `initialState`, `reducer`, and a barrel `index.ts` composing them.

User-facing errors/notices go through `GlobalMessagesService` (store-backed), rendered by `GlobalMessagesComponent` — not `alert`/`console`.

### Layered contact flow
Components dispatch or call services; services orchestrate; adapters do HTTP; effects handle side effects.

Sending (`ContactFormService.send`):
1. `fillTemplate` prepends sender info / passphrase notice to the body.
2. `MultipartDocumentService` builds a `multipart/mixed` MIME document via a fluent factory (`factories/multipart-document.factory.ts`, entities in `entities/multipart-document.entity.ts`), attaching files read as `ArrayBuffer` and base64-encoded by `EncodingService`. Message-ID is random base32 + `environment.contact.messageIdDomain`.
3. `OpenpgpService.encrypt` encrypts the whole document with the site's public key and returns a plain `string` (openpgp 6 types a non-streamed message that way).
4. Dispatches `send`; `ContactFormEffects` POSTs to `${backendUrl}/mail` with an `X-Nwie-Message-Id` header and maps 413/429/other to global messages.

Size limits are enforced twice — plaintext against `maxMessageSize`, ciphertext against `maxEncryptedMessageSize`.

The public key is fetched lazily from `/pgp-pubkey.asc` and cached in the `openpgp` store slice. `OpenpgpService.getOpenpgpKey()` implements this: it selects the key, dispatches `loadPublicKey()` and returns `EMPTY` on a miss, and completes once the key arrives. Always go through it rather than fetching the key directly.

If the sender attaches their own `.asc` public key matching their address (`checkForPublicKey`), the passphrase prompt is skipped.

Verification (`VerificationService.verify`) is entirely client-side: it hand-parses the `.eml` (headers, content-type params, multipart boundaries — no MIME library), checks the From address against `environment.contact.senderVerificationAddress`, special-cases ProtonMail internal E2E headers, then verifies the `multipart/signed` part with OpenPGP. Outcomes are the `VerificationResponse` union in `src/app/util/types.ts`; the template branches on those exact strings, so add new cases in both places.

### Environments
`src/environments/environment.ts` (dev) / `.prod.ts` hold `backendUrl` and the `contact` config. Email addresses are stored as char-code arrays and reassembled at runtime to keep them out of GitHub scrapers — keep that obfuscation when editing them. The same intent explains the per-character `<span>` splitting and `&#64;` entities in `title.component.html` and `imprint.component.html`.

### Landing page interaction
The root route is `TitleListenerComponent`: j/k/arrow keys and Hammer.js swipes move a "position" (`up`/`down`) in the title store, and Enter/swipe-right dispatches `activate`, which `TitleEffects` turns into navigation (`up` → `sites/about`, `down` → `contact`).

## Conventions

These are load-bearing — the app runs **zoneless**, so breaking them means the view silently stops updating.

- Every component is standalone and uses `ChangeDetectionStrategy.OnPush`.
- **State that a template reads must be a signal.** Store state via `store.selectSignal(...)`, observables via `toSignal(...)`, local state via `signal(...)`. Assigning a plain field from a `subscribe()` will not re-render.
- Dependencies are obtained with `inject()`, not constructor parameters. Services use `@Service({ autoProvided: false })`.
- Subscriptions are torn down with `takeUntilDestroyed(this.destroyRef)`, not a manual `destroy$` Subject.
- Inputs/outputs use `input()` / `input.required()` / `output()`, and queries use `viewChild()`. The one exception is `TitleComponent.position`, a setter input that deliberately ignores invalid values — a signal input cannot express that.
- A `FormControl`'s value is not reactive; if a template shows it, derive a signal from `valueChanges` (see `AttachmentComponent`).
- Component selector prefix `nwie`; SCSS everywhere; TypeScript strict mode with `strictTemplates`.
- Templates use Angular block control flow (`@if` / `@for`), not `*ngIf` / `*ngFor`, and self-closing tags where possible.
- Explicit `public`/`private` modifiers are used on members.
- Shared components live in `src/app/shared/components/<name>/` — plain standalone components, no module files.
- Global SCSS is split under `src/styles/` (`variables`, `z-indexes`, `fonts`, `globalStyles`) and pulled in by `src/styles.scss`; use the shared variables rather than literal colors/z-indexes.
- Stylesheets use the Sass **module system**: `@use` / `@forward`, never `@import`, and namespaced built-ins (`map.get`, `color.adjust`, `list.append`, `string.quote`). `variables.scss` forwards `z-indexes.scss`, so `@use "<path>/variables" as *;` provides both.
- Font `url()`s in SCSS must be root-relative (`/assets/...`): esbuild resolves them against the entry stylesheet, not the file that declares them.
- `tsconfig.json` uses `paths` (not the deprecated `baseUrl`) to make `src/...` imports resolve.

## Testing notes

The app and the `TestBed` are both zoneless, so no change-detection override is needed in `src/test.ts`.

Because components are standalone, a spec renders the component's **real** children rather than silently ignoring unknown elements. A spec therefore has to provide whatever that subtree injects — most commonly `provideMockStore(...)` (needed for `selectSignal`), `provideRouter([])` for `routerLink`, and the feature services. Declaring a stub component with a matching selector no longer intercepts anything.

Anything the mocked store feeds into `setValue()` must cover the full form shape, since `setValue` requires every control.
