# HealthCarePlus — Premium Medical Website Template

> A modern, conversion-focused website template for clinics, hospitals, and healthcare providers. Built for speed, accessibility, and trust.

## Features

- **6 Pages** — Home, About, Services, Blog, Contact, and dynamic blog detail pages
- **12 Components** — Hero, Navigation, Services, Team/Find a Doctor, Testimonials, Stats, Patient Portal, Trust Signals, CTA, Footer, Blog Cards, FAQ
- **Content Collections** — Blog posts, services, team members, and testimonials managed through simple Markdown files
- **Smooth Scroll** — Lenis smooth scrolling with GSAP ScrollTrigger parallax effects
- **3D Card Hover** — Premium perspective-based tilt effect on cards
- **Scroll Animations** — Staggered reveal animations on every section
- **View Transitions** — Smooth page transitions with shared element morphing
- **Fully Responsive** — Mobile-first design from 375px to ultrawide
- **Fast** — 95+ Lighthouse performance score
- **Accessible** — WCAG 2.1 AA compliant, reduced motion support, keyboard navigable

## Tech Stack

- [Astro 5](https://astro.build) — Static Site Generator
- TypeScript
- CSS Modules
- [GSAP](https://gsap.com) — ScrollTrigger parallax
- [Lenis](https://lenis.darkroom.engineering) — Smooth scrolling
- Plus Jakarta Sans + Source Serif 4 (Google Fonts)

## Quick Start

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

Open [http://localhost:4321](http://localhost:4321)

## Project Structure

```
src/
├── assets/              # Images (auto-optimized to WebP)
├── components/          # UI components
│   ├── Hero.astro       # Split hero with parallax + floating stat cards
│   ├── Navigation.astro # Scroll-aware nav with mobile hamburger menu
│   ├── Services.astro   # Services grid with hover effects
│   ├── FindDoctor.astro # Searchable doctor directory with 3D card tilt
│   ├── Team.astro       # Team section with 3D card tilt
│   ├── Testimonials.astro
│   ├── Stats.astro      # Animated counters
│   ├── PatientPortal.astro
│   ├── TrustSignals.astro
│   ├── CTA.astro
│   └── Footer.astro
├── content/             # Markdown content (edit these!)
│   ├── config.ts        # Content schemas
│   ├── blog/            # Blog posts
│   ├── services/        # Service descriptions
│   ├── team/            # Doctor/team profiles
│   └── testimonials/    # Patient testimonials
├── layouts/
│   └── BaseLayout.astro # Base layout with View Transitions + Lenis + GSAP
├── pages/
│   ├── index.astro      # Homepage
│   ├── about.astro      # About page
│   ├── services.astro   # Services listing
│   ├── contact.astro    # Contact form
│   └── blog/
│       ├── index.astro  # Blog listing
│       └── [...slug].astro # Blog detail pages
├── styles/
│   └── global.css       # Design tokens, CSS custom properties, animations
└── types/               # TypeScript type definitions
```

## Customization

### Colors

Edit `src/styles/global.css`:

```css
:root {
  --bg: #fafaf9;         /* Background */
  --primary: #0891b2;    /* Teal (trust, calm) */
  --accent: #f97316;     /* Orange (CTAs, warmth) */
  --text: #1c1917;       /* Body text */
  --text-muted: #78716c; /* Secondary text */
  --border: #e7e5e4;     /* Borders */
}
```

### Content

Edit Markdown files in `src/content/`:

- **Blog posts** — `src/content/blog/*.md`
- **Services** — `src/content/services/*.md`
- **Team members** — `src/content/team/*.md`
- **Testimonials** — `src/content/testimonials/*.md`

Each file has frontmatter (metadata) and body content. Add or remove files to update the site.

### Fonts

Fonts are loaded via Google Fonts in `BaseLayout.astro`. To change:

1. Update the `<link>` tag in `src/layouts/BaseLayout.astro`
2. Update `--font-heading` and `--font-body` in `src/styles/global.css`

### Images

Drop images in `src/assets/` — Astro auto-optimizes them to WebP on build.

## Deployment

### GitHub Pages

Push to GitHub with the included GitHub Actions workflow for automatic deployment.

### Netlify / Vercel

```
Build command: npm run build
Publish directory: dist
```

### Custom Domain

Update `site` and `base` in `astro.config.mjs` to match your domain.

## Browser Support

Chrome, Firefox, Safari, Edge (last 2 versions)

## License

- Use for personal and client projects
- Modify and customize freely
- Do not redistribute or resell

---

Template by [jagoFps](https://jagofps.dev)
