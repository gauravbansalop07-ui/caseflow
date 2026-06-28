# CaseFlow — AI-Powered Indian Legal Research

> Research Indian case law in seconds. Upload any judgment and instantly extract facts, legal issues, precedents, and AI-generated legal insights.

[![Deploy to GitHub Pages](https://github.com/gauravbansalop07-ui/CaseFlow/actions/workflows/deploy.yml/badge.svg)](https://github.com/gauravbansalop07-ui/CaseFlow/actions/workflows/deploy.yml)

## 🚀 Live Demo

**[→ View on GitHub Pages](https://gauravbansalop07-ui.github.io/CaseFlow)**

---

## 🛠 Tech Stack

- **Next.js 16** (App Router, Static Export)
- **Tailwind CSS v4** with custom design system
- **Framer Motion** for premium animations
- **Base UI / Shadcn** for accessible components
- **Zustand** for client-side state
- **Framer Motion** page transitions

---

## 📦 Deploy to GitHub Pages

### Prerequisites
- A GitHub account
- This repository pushed to GitHub

### One-Time GitHub Setup
1. Go to your repo → **Settings → Pages**
2. Under **Source**, select **GitHub Actions**
3. Save

### Auto-Deploy (push to `main`)
Every push to `main` automatically triggers the GitHub Actions workflow at [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) which:
1. Installs dependencies
2. Runs `next build` with `NEXT_PUBLIC_BASE_PATH=/caseflow`
3. Uploads the `out/` folder to GitHub Pages

### Manual Local Export
```bash
npm install
NEXT_PUBLIC_BASE_PATH=/caseflow npm run build
# Static files are in the out/ directory
```

### Custom Domain
If you deploy to a custom domain (e.g. `caseflow.yourdomain.com`), set `NEXT_PUBLIC_BASE_PATH` to an empty string `""` in the workflow file and remove `basePath` from `next.config.ts`.

---

## 🏗 Development

```bash
npm install
npm run dev        # Start dev server at http://localhost:3000
npm run build      # Production build (no base path — for Vercel/local)
npm run export     # GitHub Pages build (with /caseflow base path)
```

---

## 📁 Project Structure

```
src/
├── app/
│   ├── (app)/          # Authenticated app shell (dashboard, research, analysis)
│   ├── (auth)/         # Login & signup pages
│   └── (marketing)/    # Public landing page
├── components/
│   ├── analysis/       # PDF viewer, insights panel, analysis view
│   ├── chat/           # AI chat interface
│   ├── layout/         # Sidebar, header, mobile nav
│   ├── shared/         # Animated containers, logo
│   ├── ui/             # Base UI / Shadcn component wrappers
│   └── upload/         # Drag-and-drop upload zone, analysis timeline
├── lib/
│   ├── constants.ts    # App-wide constants
│   └── utils.ts        # Utility functions
└── stores/
    └── index.ts        # Zustand global state
```

---

## 🔑 Environment Variables

For local development, copy `.env.local.example` to `.env.local`:

| Variable | Description |
|---|---|
| `GEMINI_API_KEY` | Google Gemini API key (optional — enables real AI chat) |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL (optional) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key (optional) |

> ⚠️ GitHub Pages is a **static host** — server-side features (Gemini AI, Supabase auth) require a separate backend deployment (Vercel/Render/Railway).

