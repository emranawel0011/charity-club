# The Helping Hand Charity Club — Technical Specification

## Dependencies

### Runtime

| Package | Version | Purpose |
|---------|---------|---------|
| react | ^19.0 | UI framework |
| react-dom | ^19.0 | React DOM renderer |
| gsap | ^3.12 | Core animation engine — timelines, tweens, ScrollTrigger |
| lenis | ^1.2 | Smooth scroll with inertia |
| react-fast-marquee | ^1.6 | Auto-scrolling image rows (Story gallery) |
| lucide-react | ^0.468 | Icons (heart, hand, stars, social, checkmark, menu, X) |

### Dev

| Package | Version | Purpose |
|---------|---------|---------|
| vite | ^6.0 | Build tool |
| @vitejs/plugin-react | ^4.3 | Vite React support |
| typescript | ^5.7 | Type checking |
| @types/react | ^19.0 | React type definitions |
| @types/react-dom | ^19.0 | ReactDOM type definitions |
| tailwindcss | ^4.0 | Utility-first CSS |
| @tailwindcss/vite | ^4.0 | Tailwind Vite integration |

### Fonts

Playfair Display (400, 500, 600) and Inter (400, 500) loaded via Google Fonts `<link>` in `index.html`.

---

## Component Inventory

### Layout

| Component | Source | Notes |
|-----------|--------|-------|
| Navigation | Custom | Fixed bar, scroll-aware backdrop blur, mobile hamburger. Active section via Intersection Observer. |
| Footer | Custom | 4-column grid, newsletter form, social icons. |

### Sections

| Component | Source | Notes |
|-----------|--------|-------|
| HeroSection | Custom | Two-column, floating petals canvas, rotating badge, image collage |
| MissionSection | Custom | 3-column card grid |
| AboutSection | Custom | Split layout (image + text + stats) |
| ProgramsSection | Custom | 3×2 grid desktop, horizontal scroll mobile |
| StorySection | Custom | Terracotta background, dual Marquee rows, quote card overlay, stats bar |
| CTASection | Custom | Centered banner with button group |

### Reusable Components

| Component | Source | Used By |
|-----------|--------|---------|
| SectionLabel | Custom | All sections — caption text + sparkle icon |
| PrimaryButton | Custom | Nav, Hero, About, CTA, Footer — magnetic hover effect |
| SecondaryButton | Custom | About, CTA |
| TextLink | Custom | Mission cards — "Learn More →" with arrow shift on hover |
| MissionCard | Custom | MissionSection — image + title + description + link |
| ProgramCard | Custom | ProgramsSection — image + title + description + donation tag |
| FloatingPetals | Custom | HeroSection — canvas-based ambient particle system |
| RotatingBadge | Custom | HeroSection — circular text ring with CSS rotation |
| AnimatedCounter | Custom | AboutSection, StorySection — number count-up on scroll |

### Hooks

| Hook | Purpose |
|------|---------|
| useMagneticEffect | Magnetic button hover — RAF lerp, spring return on mouse leave |
| useScrollEntrance | Reusable scroll-triggered entrance (fade + slide up) via GSAP ScrollTrigger |
| useLenis | Initialize Lenis smooth scroll, expose instance for nav programmatic scroll |

---

## Animation Implementation

| Animation | Library | Approach | Complexity |
|-----------|---------|----------|------------|
| Smooth scrolling | Lenis | Global Lenis instance in useLenis hook, integrated with GSAP ticker | Low |
| Page load sequence | GSAP timeline | Sequential timeline: nav fade → hero content stagger → petals start → badge start | Medium |
| Scroll-triggered entrances | GSAP + ScrollTrigger | Reusable useScrollEntrance hook; opacity 0→1, translateY 40→0, stagger siblings. Trigger at 85% viewport. | Low |
| Floating petals | Canvas 2D + RAF | Custom FloatingPetals component: canvas element with 25–30 petal particles. Each petal has independent sine-wave horizontal drift, slow vertical rise, rotation, and opacity fade lifecycle. Pure canvas draw (no DOM elements). Mobile reduces to 10–12 petals. | **High** 🔒 |
| Rotating badge | CSS animation | `@keyframes rotate { to { transform: rotate(360deg) } }` on text ring, 15s linear infinite. Inner icon stationary. | Low |
| Magnetic button | RAF + lerp | useMagneticEffect hook: tracks cursor within 60px radius, applies lerp (0.15) translate offset. Spring physics return on mouse leave. | Medium |
| Marquee gallery | react-fast-marquee | Two `<Marquee>` instances with opposite `direction` props, 40s speed. Pause when section leaves viewport via Intersection Observer. | Low |
| Animated counters | GSAP | `gsap.to()` on proxy object, updating DOM text in `onUpdate`. ScrollTrigger once. | Low |
| Nav scroll state | Scroll listener | Toggle CSS class at 50px scroll threshold for backdrop-filter + bg transition. | Low |
| Card hover effects | CSS transitions | `translateY(-4px)` + `box-shadow` on hover via Tailwind `transition` utilities. | Low |
| Image hover scale | CSS transitions | `scale(1.03)` on parent hover with `overflow-hidden`. | Low |
| Hero image collage stagger | GSAP timeline | Part of hero load timeline: 3 images fade in with increasing delays (300ms, 500ms, 700ms). | Low |
| Badge entrance | GSAP | `scale(0.5→1)` + `opacity(0→1)`, spring ease, 800ms delay in hero timeline. | Low |
| Story quote entrance | GSAP + ScrollTrigger | `opacity(0→1)` + `scale(0.95→1)`, 600ms, 400ms delay after section enters viewport. | Low |
| Mobile menu | CSS transition | Slide-down panel with `max-height` transition. | Low |

---

## State & Logic Plan

### Lenis ↔ GSAP ScrollTrigger Integration

Lenis must drive ScrollTrigger's scroll position. On each Lenis scroll event, call `ScrollTrigger.update()`. Connect Lenis to GSAP's ticker via `lenis.raf()` in a `gsap.ticker.add()` callback. This is a single integration point in the `useLenis` hook.

### Floating Petals Canvas — Imperative Animation Loop

The FloatingPetals component manages its own render loop via `requestAnimationFrame`. Key decisions:
- Petal positions, rotations, and opacities are stored in a typed array or plain objects (not React state) to avoid re-renders.
- The canvas uses `devicePixelRatio` for crisp rendering on retina screens.
- Cleanup: cancel RAF on unmount.
- Performance guard: reduce petal count to 10 on mobile (detected via `window.innerWidth < 768`).

### Mobile Animation Degradation

The site reduces animation complexity on mobile (< 768px) for performance:
- FloatingPetals: 25→10 petals
- Scroll entrance stagger delays reduced by 50%
- Magnetic buttons disabled (touch devices — no hover)
- Marquee speed increased slightly (30s vs 40s) for mobile engagement

This is a single `isMobile` flag derived from a resize listener, passed as a prop or stored in a lightweight context.

---

## Other Key Decisions

### Marquee over CSS-only scroll

The Story section's dual-row auto-scrolling gallery uses `react-fast-marquee` instead of a pure CSS `@keyframes` infinite scroll. Reason: built-in pause/play, proper duplication for seamless loops, and Intersection Observer integration (pause when off-screen) without custom implementation.

### No shadcn/ui components

The design is fully custom with no standard UI patterns (no dialogs, tables, dropdowns). All components are custom-built with Tailwind. The newsletter form in the footer is a simple `<input>` + `<button>` — no form library needed.

### Image collage as positioned elements, not CSS Grid

The hero's three-image collage uses absolute/overlapping positioning with z-index layering. CSS Grid cannot express the organic overlap design (main 60%, secondary overlapping 20%, accent circle at 8° rotation). Use relative container + absolute-positioned children.
