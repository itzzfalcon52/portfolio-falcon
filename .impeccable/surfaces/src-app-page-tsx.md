---
version: 1
slug: "src-app-page-tsx"
primary_target: "src/app/page.tsx"
related_targets: []
---

# Home (portfolio)

Scope: `/` single-page portfolio plus `/blog/[slug]` post pages. Mode: Experience (a personal brand surface; the person is the work). Audience: recruiters and founders skimming from LinkedIn/resume links; job: remember Hussain within 10 seconds, scroll, reach out. Constraints: brief-pinned world (cream / greyish-black, one rare accent, centered 640–720px axis, no cards, grids, logo walls, glass, gradients). Static export on Vercel; Lighthouse 90+; WCAG AA both themes; reduced motion respected.

Memorable moment: the 1-bit dithered portrait that assembles from scattered dots and ripples away from the cursor.

Unresolved: hook (4 options in content file, #1 default); accent (3 options switchable via `data-accent`); project screenshots for everything but HangoutX are labelled placeholders.

## Direction contract

THESIS: A calm personal page on one narrow axis where the person is drawn in dots: a 1-bit, theme-coloured dithered portrait made of the same ink as the type. Refuses the stacked-section template: hero banner, card grids, tech-logo walls, "Hire Me" buttons.

OWN-WORLD: Warm paper (#F6F2EA) or graphite (#171716), one ink for type and portrait dots, hairline rules, Bricolage Grotesque with its weight and width axes doing the expressive work, JetBrains Mono only for dates and data. One rare accent (hoodie blue, marigold, or olive) on hover, the hook's single word and the easter eggs. No cards, no fills, no shadows.

STORY: Visitor sees a face forming from dots, a name, and one plain sentence about web, servers and tiny chips. Scrolling shows a ruled list of shipped work with previews, a short timeline, three lines of tools, writing, and a big friendly contact line. They copy the email.

FIRST VIEWPORT: Theme toggle top right, nothing else in the chrome. Centered: dithered portrait ~220–260px square, name in Bricolage at clamp(3rem, 9vw, 5.5rem), hook in secondary at ~1.35rem, mono status line, two quiet text links. All within the first 100svh on a 1280×800 laptop and a 390×844 phone.

FORM: Brief-pinned single-column personal page with canvas dither portrait; my ordered list was not rolled because the user pinned the world. seed: none (brief-pinned; concept-seed not run)

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
