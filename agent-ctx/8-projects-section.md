# Task 8 - Projects Section Component

## Summary
Created the Featured Projects Section component at `/home/z/my-project/src/components/portfolio/projects-section.tsx`.

## What was built
- **ProjectsSection** — Main section component with `id="projects"`, SectionHeading, and responsive 2-column grid
- **ProjectCard** — Individual project card with glassmorphism styling, 3D tilt effect (mouse position-based perspective rotation), image overlay on hover with "View Details" button and quick links
- **ProjectModal** — Dialog/Modal using shadcn/ui Dialog component, showing full project details with larger image, full description, tech stack, and action buttons

## Features implemented
1. Section with `id="projects"` and SectionHeading (title="Featured Projects", subtitle="// My Work")
2. 4 project cards in a responsive grid (1 col mobile, 2 col tablet/desktop)
3. All 4 projects with correct data: NeonCommerce, DataViz Pro, ConnectHub, StudioFlow
4. Glassmorphism card style using `glass` CSS class
5. 3D tilt effect on hover (spring-animated perspective rotation based on mouse position)
6. Image scale animation on hover (1.08x with smooth easing)
7. Hover overlay with "View Details" button and Demo/Code quick links
8. Animated gradient border on hover
9. Tech tags as small styled badges
10. Click "View Details" opens Dialog modal with larger image, full description, tech stack, and action buttons
11. Framer Motion staggered entrance animations for cards
12. Modal transitions with AnimatePresence
13. Subtle background accent glows (cyan and purple)
14. `cursor-hover` class on all interactive elements
15. Responsive design throughout

## Design compliance
- Background: #050510 (via section context)
- Card background: #0f0f23 (via `glass` class)
- Primary accent: #00f5d4
- Secondary accent: #a855f7
- CSS classes used: glass, glass-strong, gradient-text, cursor-hover
- SectionHeading component used as specified
- Dialog from @/components/ui/dialog used for modal
- Button from @/components/ui/button used for action buttons

## Lint status
✅ Passes clean — no errors or warnings
