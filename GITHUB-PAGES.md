# Mealf website on GitHub Pages

This repository serves the landing page directly from its root on the `main` branch.

In **Settings → Pages**, keep **Deploy from a branch → main → / (root)** as the publishing source. Pushes to `main` trigger GitHub's Pages deployment.

Keep the folder structure intact when uploading or updating files:

```text
index.html
styles.css
app.js
assets/
  mealf-peach.png
  rigatoni.webp
  screenshots/
    home.png
    calendar.png
    ...
downloads/
  compose.yml
wiki/
  index.html
  installation.html
  wiki.css
  wiki.js
  search-index.json
  ...
```

The images, fonts, screenshot viewer, wiki and installation download rely on these relative paths. Use Git or upload folders while preserving their hierarchy; uploading all contained files individually into the root breaks these paths.

The original upload also left copies of files in the root. Those copies are retained; the site uses the restored `assets/`, `downloads/` and `wiki/` folders. The root `.nojekyll` file tells GitHub Pages to serve the prepared static site.

The live page is https://cloudcookch.github.io/mealf-website/.
