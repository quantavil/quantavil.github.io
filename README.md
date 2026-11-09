# quantavil

A small GitHub index built with Bun and no runtime dependencies. Edit `src/site.config.ts` for the introduction and footer. Run `bun install`, then `bun run dev` or `bun run build`.

To publish, open the repository’s Settings → Pages and set Source to **GitHub Actions**. Push to `main` to deploy.

For agents and other automated clients, the build generates `/llms.txt` with a complete public GitHub data snapshot and `/data.json` with the same data as JSON. Both include the profile, all public repositories, and all starred repositories with star timestamps. The snapshot refreshes on deployment. For live data, use `https://api.github.com/users/quantavil`, `/repos?per_page=100`, and `/starred?per_page=100`; follow the `Link` header’s `rel="next"` until exhausted, and request `Accept: application/vnd.github.star+json` for star timestamps. Building requires GitHub API access; set `GITHUB_TOKEN` to increase the rate limit.
