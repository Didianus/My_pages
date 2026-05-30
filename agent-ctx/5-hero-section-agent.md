# Task 5 - Hero Section Component

## Summary
Created the Hero Section component at `/home/z/my-project/src/components/portfolio/hero-section.tsx` for the premium portfolio website.

## What was built
A comprehensive, feature-rich hero section with the following:

### Components & Features
1. **GradientMeshBackground** - Pure CSS animated gradient mesh with 3 animated blobs (cyan, purple, pink), base radial gradients, and a subtle grid pattern overlay
2. **FloatingOrb** - 5 animated floating orbs with different colors (#00f5d4, #a855f7, #f472b6, #38bdf8), sizes, and animation timings
3. **ProfileImage** - Profile image with:
   - 3D tilt effect on mouse hover (perspective + rotateX/Y with spring physics)
   - Animated gradient glow ring (using the existing gradient-rotate CSS animation)
   - Outer glow pulse that intensifies on hover
   - Corner bracket decorations in cyan and purple
   - Responsive sizing (w-64 on mobile → w-[360px] on lg)
4. **useTypewriter hook** - Custom hook that types out the tagline character by character with a configurable speed and start delay
5. **SocialLink** - Animated social link buttons (GitHub, LinkedIn, Twitter) with hover effects and gradient underline
6. **ScrollIndicator** - Bottom scroll indicator with animated chevron and dot

### Layout
- Full viewport height section with `id="home"`
- Responsive: `flex-col-reverse` on mobile (image on top), `lg:flex-row` on desktop (image on right)
- Staggered entrance animations using framer-motion `containerVariants` and `itemVariants`
- Text content center-aligned on mobile, left-aligned on desktop

### Content
- "Available for hire" badge with pulsing dot
- Name: "Alex Hartono" with `gradient-text` class
- Profession: "Full-Stack Developer & Creative Designer"
- Typewriter tagline: "Crafting Digital Experiences That Inspire" with blinking cursor
- Description paragraph
- CTA: "Lihat Proyek" (scrolls to #projects) with neon cyan styling + "Hubungi Saya" (scrolls to #contact) with purple outline styling
- Social links row (GitHub, LinkedIn, Twitter)
- Scroll-down indicator at bottom

### Technical details
- Uses `'use client'` directive
- All animations use `framer-motion`
- Icons from `lucide-react`
- Uses `Button` from `@/components/ui/button`
- Uses `next/image` for the profile image (`/profile.png`)
- Uses `cursor-hover` class for custom cursor integration
- Follows the project's design system (CSS variables, glass classes, neon effects, gradient-text)
- ESLint passes with no errors
- Responsive across all breakpoints
