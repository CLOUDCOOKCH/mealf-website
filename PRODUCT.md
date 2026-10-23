# Mealf

<!-- impeccable:product-schema 1 -->

## Platform
web

## Product Purpose
Mealf is a self-hosted meal planning application with recipe management, Bring! shopping-list integration, and AI-to-recipe conversion. Users can onboard their own AI to make recipes from inspiration such as TikToks. These capabilities were confirmed directly by the user.

## Brand Commitments
The user explicitly explained the name as a play on MILF and meal and requested naughty jokes on the landing page, then asked for more. The preferred voice is overt adult food innuendo: dinner with benefits, saucy quickies, peach jokes, and server-rack double entendres. Use cheeky adult food double entendres, such as “Meals you’d like to fork,” while keeping feature labels, instructions, sample disclosures, and development limits clear.
Use Mealf as the product name. The source repository still uses the former name: https://github.com/CLOUDCOOKCH/aircooker-server.
Preserve its existing original peach mascot and image wordmark. README and docs/BRANDING.md verify that Mealf is open source under Apache 2.0, delivered as a self-hosted Docker application with a PWA, without mandatory hosted service or analytics/tracking. It is a development preview, not a stable release.
The user requested that clicking the peach logo slap it. All landing-page peach mascots respond to click, tap, or keyboard activation with a playful slap animation and a reduced-motion alternative. Do not replace or redraw the original brand images.

## Evidence on Hand
The user supplied the features and repository URL. This project is a marketing landing page, not the Mealf application. The product showcase uses seven original screenshots supplied by the user on 23 October 2026, with demo and household views clearly identified. Preserve the PNGs unchanged. The hero food photograph remains labeled illustrative; screenshot controls browse images rather than running the app. Do not invent customers, ratings, metrics, prices, licensing, or installation commands.
Repository evidence establishes text-based AI adapters and a Bring! adapter without live verification. Social imports do not provide authenticated video fetching or automatic transcription. Explain text or user-supplied notes/transcripts rather than promising direct TikTok video extraction. AI and Bring! remain optional external integrations.
The user corrected installation to one complete Mealf compose.yml with port 5152, an explicit Uvicorn command and matching healthcheck, a persistent mealf-data volume, and BASE_URL https://mealf.example.com. Use the verified moving :preview image with pull_policy: always so Compose checks for the newest published preview on up. Link to the image registry and releases. The full YAML is authoritative in content/compose.yml; generated snippets and downloads must match it. Preserve the rest of the user-provided settings. Related wiki examples must match this installation profile.

The user requested an on-site wiki based on the complete `docs/wiki` directory in the source repository. Preserve its technical details, commands, preview limits, and inter-page links. The wiki is a dated source snapshot with local search and navigation. Keep the documentation voice clear and practical. The landing-page installation YAML and linked Cloudflare guide remain available.

## Stack
Static HTML, CSS, and JavaScript, chosen for a lightweight presentation page. Hosted separately with Sites.
