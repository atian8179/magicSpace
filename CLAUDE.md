# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

天赋测评系统 (Talent Quiz System) — a Chinese-language children's talent assessment funnel used to drive enrollment for 核桃编程 (Walnut Programming) experience classes. The user flow is: Home → Quiz (23 questions) → Result (radar chart + talent type) → Course (lead-capture form).

## Commands

```bash
npm install        # install dependencies
npm run dev        # vite dev server
npm run build      # production build → dist/
npm run preview    # preview built output
```

No test, lint, or typecheck scripts are configured.

Deployment is via Vercel (`vercel.json` sets `buildCommand`, `outputDirectory: dist`, `devCommand`).

## Architecture

### Stack
Vue 3 (Composition API + `<script setup>`) · Vite 7 · Vue Router 4 (history mode) · Pinia 3. `echarts` / `vue-echarts` are declared in `package.json` but the radar visualization in `src/components/RadarChart.vue` is a hand-rolled SVG — echarts is currently unused.

### Scoring model (the core domain logic)
The quiz scores six dimensions: `logic`, `creativity`, `space`, `focus`, `collaboration`, `exploration`. Each of the 23 questions in `src/data/quizData.js` has 4 options, and each option contributes points to **one or more** dimensions (not just the question's nominal dimension).

`src/stores/quiz.js` (Pinia store, the single source of truth):
- `answerQuestion(index)` appends the answer, adds the option's `score` map to `scores`, and advances the index.
- `previousQuestion()` pops the last answer and **subtracts** its score — keep this symmetric if you change scoring.
- `calculateResult()` sorts dimensions by score, then uses a hard-coded mapping from `(topDimension, scoreDiff vs. second)` to one of 6 `talentTypes` (indices 0–5 in `quizData.js`). Normalization assumes `maxPossibleScore = answers.length * 0.4`, which is a heuristic — be aware when adjusting question counts or score values.
- `talentTypes[2]` (结构建筑师 / "Structure Architect") is **never reached** by the current mapping logic in `calculateResult`. If you change scoring, decide whether to wire it up or remove it.

When editing `quizData.js`: each question's `dimension` field is metadata (used for the dimension tag UI in `Quiz.vue`); actual scoring comes from the per-option `score` map. The two can diverge intentionally.

### Routing & analytics
`src/router/index.js` registers 4 lazy-loaded routes: `/` `/quiz` `/result` `/course`. Global guards in the router automatically call `onPageEnter`/`onPageLeave` from `src/utils/analytics.js` on every navigation, plus a `beforeunload` listener for the final page. **Do not add manual `trackPageView` calls in views** — they would double-count.

`src/utils/analytics.js` wraps Baidu Tongji (`window._hmt`). The tracking ID placeholder in `index.html` (`你的统计代码ID`) must be replaced before production deploy.

### Result → Course handoff
`Result.vue` reads `result` from the Pinia store; if missing, it redirects to `/`. `Course.vue` does the same read but falls back to a default talent type object for the card. The course form submission in `Course.vue` is a **stubbed** `setTimeout(1500)` + `console.log` — the README explicitly notes this must be replaced with a real API call before deployment.

### Styling system
Global design tokens live in `src/styles/design-system.css` (imported via `src/style.css` → `main.js`). All views and components use CSS custom properties: `--brand-orange`, `--bg-primary`, `--space-*`, `--radius-*`, `--easing-spring`, `--gradient-brand`, etc. Two fonts are loaded from Google Fonts: `Outfit` (`--font-display`) and `Plus Jakarta Sans` (`--font-body`). The visual language is "Tech-Forward Optimism" — dark slate background, orange brand accents, no purple.

Components use scoped styles. Several keyframe animations (`slideUp`, `fadeIn`, `pulse-glow`, `spring-in`, `float`) are defined globally in `design-system.css` **and** redefined locally in some views — when adding animations, prefer the global ones.

### Component layout
- `src/views/` — page-level components, one per route.
- `src/components/common/` — shared (`GeometricDecoration`, `TestimonialCard`).
- `src/components/course/` — Course page subcomponents (`CourseCard`, `CourseCountdown`, `CourseForm`, `CourseGiftAnimation`, `SuccessModal`).
- `src/components/RadarChart.vue` — SVG radar at root because it's used only by `Result.vue`.

### Form validation
`CourseForm.vue` enforces a Chinese mobile regex `/^1[3-9]\d{9}$/` and 11-char length client-side; the submit button stays disabled until name, phone, and grade are all valid.

## Conventions

- The UI is Chinese-only; user-facing strings are not externalized — keep new copy in Chinese to match.
- Vue SFCs use `<script setup>` exclusively. Reach for `storeToRefs(useQuizStore())` when destructuring reactive store state in views.
- The quiz must remain completable on mobile in portrait — the layouts already include `@media (max-width: 480px)` breakpoints; respect them.
