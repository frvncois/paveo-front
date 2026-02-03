# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

PAVÉO is a Vue 3 + TypeScript + Vite single-page application for a Montreal-based general contractor specializing in landscaping, exterior construction, and residential renovation.

## Development Commands

### Start Development Server
```sh
npm run dev
```

### Build for Production
```sh
npm run build
```
This runs type-checking and builds in parallel.

### Type Checking Only
```sh
npm run type-check
```

### Preview Production Build
```sh
npm run preview
```

## Architecture

### Tech Stack
- **Vue 3** with Composition API (`<script setup>`)
- **TypeScript** with strict typing
- **Vue Router** for client-side routing
- **Pinia** for state management (initialized but no stores yet)
- **GSAP** with ScrollTrigger for animations
- **Lenis** for smooth scrolling
- **Vite** as build tool

### Project Structure

```
src/
├── assets/          # Static assets (videos, SVG components, CSS)
├── components/
│   ├── blocks/      # Reusable content blocks (DetailsPanel, ReviewBlock, etc.)
│   ├── global/      # App-level components (GlobalHeader, GlobalFooter)
│   └── layout/      # Layout components (ListStickyCards)
├── views/           # Route-level page components
├── router/          # Vue Router configuration
└── main.ts          # App entry point with GSAP/Lenis setup
```

### Key Architectural Patterns

**Component Organization:**
- `blocks/` - Self-contained, reusable content sections that accept props
- `global/` - App-wide components rendered in App.vue (header, footer)
- `layout/` - Components that orchestrate multiple blocks and define page structure
- `views/` - Route components that compose blocks and layouts with page-specific data

**Animation System:**
- GSAP and ScrollTrigger are registered globally in main.ts:25
- Lenis smooth scrolling is initialized globally with `autoRaf: true`
- Component-level animations use GSAP in `onMounted()` hooks (see GlobalHeader.vue:68-88)
- Scroll-based animations leverage ScrollTrigger (registered globally)

**Styling:**
- CSS custom properties defined in assets/main.css for theming (colors, spacing, typography)
- Scoped component styles using nested CSS
- Base font size is viewport-responsive: `0.85vw`
- Custom CSS properties for dynamic values (e.g., `--item-bg` in ListItemRow.vue:24)

**Routing:**
- All routes except home use lazy-loading: `component: () => import('../views/ServiceView.vue')`
- Router uses `createWebHistory` (requires server-side configuration for production)

**TypeScript:**
- Props defined using `defineProps<{}>()` with inline types
- Path alias `@/*` maps to `src/*` (configured in vite.config.ts and tsconfig.app.json)

### Important Files

- **vite.config.ts** - Vite configuration with `@` alias and Vue DevTools plugin
- **src/main.ts** - Initializes Lenis, GSAP plugins, Pinia, and Vue Router
- **src/assets/main.css** - Global CSS variables and base styles
- **src/router/index.ts** - All application routes
- **src/App.vue** - Root component with GlobalHeader, RouterView, GlobalFooter

### Node Version Requirement
This project requires Node.js ^20.19.0 or >=22.12.0 (specified in package.json:6-8)
