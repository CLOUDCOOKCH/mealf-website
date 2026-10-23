# Mealf landing page

A responsive, buildless marketing page for [Mealf](https://github.com/CLOUDCOOKCH/aircooker-server).

## Preview

From this directory, run `python -m http.server 4173 --directory dist` and open `http://localhost:4173`.

The deployable site lives in `dist/`. No dependencies or build step are required. See [GITHUB-PAGES.md](GITHUB-PAGES.md) for deployment through GitHub Pages.

## Behavior

The product showcase displays seven original user-supplied Mealf screenshots. Tabs support click, touch, arrow keys, Home and End. Images and Enlarge links open a native full-size viewer with previous/next, fit-to-screen, original PNG links, Escape dismissal and focus restoration. On phones the original-resolution image can be panned. The showcase does not connect to a Mealf backend. Setup and documentation links lead to the on-site wiki and the Mealf repository.

Every peach mascot is a native button. Clicking, tapping, or using Enter/Space triggers a short hand-slap, squash, wobble, and “SMACK!” feedback. Rapid clicks restart the same effect. Reduced motion uses a brief static mark and label; switching that preference immediately cancels active movement. The original brand image files remain unchanged.

The `#self-host` section and wiki Installation page provide the complete user-supplied single-container Compose configuration for port 5152. `content/compose.yml` is the shared source for displayed YAML and the downloadable file; `npm run build:wiki` synchronizes all three. The moving `:preview` image plus `pull_policy: always` checks for the newest published preview on Compose up. Image-registry and release links sit beside it. The page never runs installation commands.

The page preserves the repository's original peach and wordmark. Product copy reflects the development-preview status and the documented limits of social imports. Source references and image provenance are in `ASSETS.json`. Manrope is self-hosted; its OFL license ships with the font.

## Validation

Chromium checks covered widths 320, 390, 768, 1024, 1280, 1440, and 1600, with no horizontal overflow. Screenshot switching, keyboard navigation, full-size viewing, focus restoration, peach controls, FAQs, internal links, image loading, and JavaScript runtime errors are covered by browser QA. Desktop and phone screenshots were reviewed. This validates the landing page, not the Mealf application or its external integrations.


The `/wiki/` area renders all 13 articles from `CLOUDCOOKCH/aircooker-server/docs/wiki`, imported on 22 October 2026. It includes grouped topic navigation, a per-page contents list, full-text search, copyable code, responsive tables, previous/next guides, and source links. Source Markdown and blob hashes are retained in `content/wiki/`; `npm ci && npm run build:wiki` rebuilds the static HTML and search index. Unmodified imports are verified against their original Git blob hashes. User-corrected pages retain the upstream blob SHA and add a separate local blob SHA plus adaptation provenance. The import is a dated snapshot, not automatic synchronization. Markdown/code remain authoritative; rendered prose normalizes the product spelling to Mealf, and the Mermaid workflow has an accessible SVG counterpart.
