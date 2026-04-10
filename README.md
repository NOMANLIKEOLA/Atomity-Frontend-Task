# VandGross Construction Co. - Budget Control Dashboard

Basically, my takeaway on the first feature from the video that was i am to build a feature that keeps track of spending within a team, to avoid waste of funds and also inputs expenditures automatically. So i created a mock company, VandGross Construction Co., then firstly, i needed data so i went and gave mock allocated budgets for four departments(project management, engineering, procurement & health and safety), i gave the amount of $10k, $50k, $200k and $5k respectively, then i requested a research for how the allocated budgets would most likely be spent in a construction company and i got results. I used and refined the results for my data in which was inputed to this project.

Live Demo → https://vandgross-dashboard.vercel.app/ 

---

## Tech Stack

Next.js 15 · TypeScript · Framer Motion · TanStack Query v5 · Tailwind CSS v4

---

## Features

- Department cards with budget, spend, balance, and net return — animated on scroll
- Expand-all toggle to view every department's full report in one view
- Custom SVG bar chart with Budget vs Spend and Net Return % modes
- Per-department detail report — expense breakdown, insights, recommendations, live activity feed
- API-enriched metrics via DummyJSON and JSONPlaceholder with TanStack Query caching
- Dark/light mode with localStorage persistence
- Fully responsive — mobile, tablet, and desktop

---

## Local Development

bash
npm install
npm run dev




## Architecture Decisions

- **No UI libraries** — every component built from scratch
- **Design tokens** — all hex values live exclusively in globals.css as CSS custom properties; components never reference raw hex
- **Caching** — TanStack Query with 5-minute stale time; zero redundant requests on revisit
- **Animations** — scroll-triggered via useInView, reduced-motion respected throughout
- **Modern CSS** — clamp(), color-mix(), CSS nesting, container queries, logical properties, :has()

---

## Author

Built by Ahmed Oladipo for the Atomity Frontend Engineering Challenge.
