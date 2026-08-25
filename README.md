# SebastianwieLand

Personal website, built with [Angular](https://angular.dev) 22 and pre-rendered to static HTML for GitHub Pages.

## Development server

Run `npm start` for a dev server on `https://localhost:4200/` (it serves over HTTPS, matching the local API at `https://localhost:8001/api`). The app reloads automatically on source changes.

## Build

Run `npm run build`. Every route is pre-rendered at build time; the deployable output is `dist/sebastianwie-land/browser`.

## Running unit tests

Run `npm test` to execute the unit tests via [Karma](https://karma-runner.github.io).

For a single headless run:

```bash
CHROME_BIN=$(which chromium) npx ng test --watch=false --browsers=ChromeHeadless
```

## Deployment

Pushing to `master` triggers `.github/workflows/publish.yml`, which builds, pre-renders and publishes to GitHub Pages.
