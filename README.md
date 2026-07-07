# ✨ Muskan Sultana — Portfolio

An interactive, "cute-meets-cutting-edge" personal portfolio for **Mohammad Muskan Sultana** —
Electrical & Electronics Engineering student, IoT developer, and patent co-inventor.

Built with **React + Vite**, **Tailwind CSS**, and **Framer Motion**. Deploys to **GitHub Pages** out of the box.

![tech](https://img.shields.io/badge/React-18-7c6cff) ![tech](https://img.shields.io/badge/Vite-5-5eead4) ![tech](https://img.shields.io/badge/Tailwind-3-38bdf8) ![tech](https://img.shields.io/badge/Framer%20Motion-11-fb7185)

---

## 🎨 Features

- **Blush-&-lavender kawaii aesthetic** — warm cream backgrounds, soft pink + lilac + butter-yellow + sage pastels, rounded fonts, pillowy cards, handwritten accents, floating hearts & sparkles — cute but unmistakably *electrical*.
- **Illustrated mascot** — a friendly girl character with her electrical sidekick **Volt** (a smiley battery that bobs, blinks & sparks) anchors the hero, plus a rotating role headline.
- **Interactive education & experience timelines**, including a scroll-driven cute battery-charging animation.
- **"My Lab"** — bespoke pastel animated illustrations per project (a pet feeder that dispenses food, a growing greenhouse plant, rippling solar/piezo tiles).
- **Bento skill matrix**, **collectible certification badges**, **leadership grid**.
- **Playful contact form** with a paper-airplane "Message Sent!" animation (+ a real `mailto:` fallback).
- **Custom pastel scrollbar**, full **responsiveness**, and `prefers-reduced-motion` support.

## 🧱 Tech Stack

| Concern      | Choice                              |
| ------------ | ----------------------------------- |
| Framework    | React 18 + Vite 5                   |
| Styling      | Tailwind CSS 3 (+ custom design system in `src/index.css`) |
| Animation    | Framer Motion 11                    |
| Icons        | lucide-react + custom inline SVG    |
| Hosting      | GitHub Pages (via GitHub Actions)   |

## 🚀 Getting Started

Requires **Node.js 18+**.

```bash
# 1. install dependencies
npm install

# 2. start the dev server (http://localhost:5173)
npm run dev

# 3. production build -> ./dist
npm run build

# 4. preview the production build locally
npm run preview
```

## 📝 Editing Content

All text/content lives in a single file — **`src/data/portfolio.js`**.
Edit the `profile`, `contact`, `education`, `experience`, `projects`, `skills`,
`certifications`, `leadership`, and `navLinks` objects and the whole site updates.
No need to touch component code for content changes.

## 🌐 Deploying to GitHub Pages

The `base` in `vite.config.js` is set to `'./'` (relative), so the site works whether it's served
from the domain root **or** a project sub-path — **no configuration required**.

### Option A — Automatic (recommended, already set up)

A GitHub Actions workflow is included at `.github/workflows/deploy.yml`.

1. Create a GitHub repo and push this project to the **`main`** branch.
2. In the repo, go to **Settings → Pages → Build and deployment → Source** and choose **GitHub Actions**.
3. Every push to `main` now builds and publishes automatically. Your site goes live at
   `https://<your-username>.github.io/<repo-name>/`.

### Option B — Manual, via the `gh-pages` branch

```bash
npm run deploy   # builds and pushes ./dist to the gh-pages branch
```

Then set **Settings → Pages → Source** to the **`gh-pages`** branch (root).

> `.nojekyll` is included so GitHub Pages serves the Vite `assets/` output as-is.

## 📁 Project Structure

```
muskan/
├─ .github/workflows/deploy.yml   # CI → GitHub Pages
├─ public/                        # favicon.svg, .nojekyll
├─ src/
│  ├─ components/                 # Navbar, Hero, About, Experience, Projects, ProjectCard,
│  │  │                           # Skills, Certifications, Leadership, Contact, Footer
│  │  └─ ui/                      # SectionHeading, Particles, CircuitBackground
│  ├─ data/portfolio.js           # ← single source of truth for all content
│  ├─ lib/motion.js               # shared Framer Motion variants
│  ├─ index.css                   # Tailwind + custom design system
│  ├─ App.jsx                     # section composition
│  └─ main.jsx
├─ index.html
├─ tailwind.config.js             # design tokens (colors, shadows, animations)
├─ vite.config.js
└─ package.json
```

## 📄 License

Personal portfolio content © Mohammad Muskan Sultana. Code is free to reuse as a template.
