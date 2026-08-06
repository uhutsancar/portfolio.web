# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

### Environment variables

Copy `.env.example` to `.env` and fill it in. The contact form at `/contact`
posts to `server/api/contact.post.ts`, which sends mail through
[Resend](https://resend.com/docs/introduction).

| Variable | Required | Notes |
| --- | --- | --- |
| `NUXT_RESEND_API_KEY` | yes | From [resend.com/api-keys](https://resend.com/api-keys) |
| `NUXT_RESEND_FROM` | no | Defaults to `Portfolio <onboarding@resend.dev>` |
| `NUXT_RESEND_TO` | yes | Inbox that receives submissions |

Until a domain is verified in Resend, `NUXT_RESEND_FROM` must stay
`onboarding@resend.dev` and `NUXT_RESEND_TO` must be the Resend account email.
After [verifying a domain](https://resend.com/docs/dashboard/domains/introduction),
both can be any address.

The same three variables must be set on the host in production (Vercel /
Netlify / Cloudflare project settings) — `.env` is git-ignored and never
deployed.

### Nuxt Studio

Content is edited through [Nuxt Studio](https://nuxt.studio), which is
self-hosted by the `nuxt-studio` module — there is no external service.

**In development** no setup is needed: run `pnpm dev` and use the floating
editor button on the site. Edits write straight to the files in `content/`
and `public/`. The `/_studio` login route is production-only and 404s locally.

**In production** Studio needs an OAuth app so editors can sign in and publish
commits back to the repo:

1. Create a GitHub OAuth app at
   [github.com/settings/developers](https://github.com/settings/developers).
2. Set the callback URL to
   `https://your-domain.com/__nuxt_studio/auth/github`.
3. Set `STUDIO_GITHUB_CLIENT_ID` and `STUDIO_GITHUB_CLIENT_SECRET` on the host.
4. Visit `/_studio` (or press `Cmd`/`Ctrl` + `.`) and sign in.

Publishing commits to the `main` branch with a `content:` prefix. Because
Studio needs a server route for auth, the site must be deployed with SSR
(`nuxt build`), not fully static `nuxt generate`.

The editor forms are generated from the collection schemas in
[`content.config.ts`](content.config.ts) — `.editor({ label, description,
input })` there is what shapes the panel, so add metadata to new fields.

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
