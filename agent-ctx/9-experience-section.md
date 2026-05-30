# Task 9 - Experience Section Component

## Summary

Created the Experience Section component at `/home/z/my-project/src/components/portfolio/experience-section.tsx`.

## What was built

A premium interactive vertical timeline component for the portfolio website with:

### Structure

- Section with `id="experience"` for navigation anchoring
- `SectionHeading` component with `title="Experience"` and `subtitle="// My Journey"`
- Interactive vertical timeline with 5 experience entries

### Timeline Entries

1. **2026 - Present**: Creative Technologist @ TechVision Labs (marked as current)
2. **2025 - 2026**: Full-Stack Developer @ DigitalCraft Studio
3. **2024 - 2025**: Full-Stack Developer @ InnovateTech
4. **2023 - 2024**: Frontend Developer @ WebSphere Agency
5. **2022 - 2023**: Junior Developer @ CodeStart

### Design Features

- **Central glowing timeline line** using `timeline-glow` CSS class with animated height on scroll
- **Alternating left/right cards** on desktop, all right-aligned on mobile
- **Glassmorphism cards** with subtle borders (`bg-[#0f0f23]/80`, `backdrop-blur-md`, `border-white/[0.06]`)
- **Gradient text** for period/year display using `gradient-text` class
- **Accent color per entry** cycling through #00f5d4, #a855f7, #f472b6, #38bdf8
- **Animated gradient border** on card hover (mask-based technique)
- **Glow behind card** on hover with blur effect
- **Accent bar** on the card side facing the timeline
- **"Current" badge** with pulsing dot animation for the first entry
- **Pulsing dot** on the timeline for the current position
- **Connecting dots** on the timeline with glow rings
- **"Learn more" arrow** that appears on hover with slide animation
- **Decorative corner accent** (radial gradient) on each card
- **Timeline end cap** with a rotated diamond shape

### Animations (Framer Motion)

- Cards animate in from alternating left/right directions when scrolling into view
- Timeline line grows from top to bottom when section enters viewport
- Current badge springs into view
- Current position dot has infinite pulse animation
- Cards scale up slightly and gain glow on hover
- End cap springs into view

### Responsive Design

- Mobile: Single column, all cards to the right of the timeline, timeline on the left
- Desktop (md+): Alternating left/right cards, timeline centered

### Technical Details

- Uses `'use client'` directive
- Imports: `motion`, `useInView` from framer-motion; `Briefcase`, `ArrowRight` from lucide-react
- Uses `cursor-hover` class on interactive elements
- Uses existing CSS classes: `timeline-glow`, `gradient-text`
- Follows the established design patterns from other portfolio sections

## Lint Status

✅ Passes ESLint with no errors
