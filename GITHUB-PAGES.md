# Deploy Mealf's landing page on GitHub Pages

1. Create a public GitHub repository, for example `CLOUDCOOKCH/mealf-website`, using `main` as its default branch.
2. Extract this ZIP and commit its contents at the repository root. Include the hidden `.github` folder. The root must contain `.github/workflows/pages.yml` and `dist/index.html`.
3. In the repository, open **Settings → Pages**. Under **Build and deployment → Source**, select **GitHub Actions**.
4. Open **Actions → Deploy to GitHub Pages → Run workflow**, select `main`, and run it. If Actions are disabled for the repository, enable them first.
5. The completed deployment shows the live URL. For a repository named `CLOUDCOOKCH/mealf-website`, the default URL is `https://cloudcookch.github.io/mealf-website/`.

After setup, every push to `main` deploys the updated `dist/` folder. No secrets, Docker container, npm install, or build step are needed to deploy the included site and wiki.

## Edit the site

Edit `dist/index.html`, its CSS/JavaScript and assets directly. The wiki's source articles are under `content/wiki/`. If you edit those articles or `content/compose.yml`, run `npm ci` and `npm run build:wiki`, then commit the changed `dist/` files as well.

The workflow sets the canonical, Open Graph page URL and sharing-image URL to the Pages deployment's base URL. All local navigation and assets use relative paths, so project repositories work under `/repository-name/`.

## Optional custom domain

Configure the domain in **Settings → Pages → Custom domain**, then add the DNS records GitHub specifies and enable **Enforce HTTPS** when available. Rerun the deployment afterwards so its metadata uses the custom domain.

## Reference

GitHub's documentation: https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages
