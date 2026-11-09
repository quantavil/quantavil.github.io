# quantavil

A small GitHub index built with Bun and no runtime dependencies. Edit `src/site.config.ts` for the introduction and footer. Run `bun install`, then `bun run dev` or `bun run build`.

To publish, open the repository’s Settings → Pages and set Source to **GitHub Actions**. Push to `main` to deploy.

For agents and other automated clients, [`llms.txt`](llms.txt) documents direct access to the public GitHub profile, repositories, and starred projects, including pagination and starred timestamps.
