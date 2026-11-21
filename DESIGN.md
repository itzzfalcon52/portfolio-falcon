---
name: Hussain Kagalwala
description: A calm one-column personal page where the person is drawn in the same ink as the type.
colors:
  paper: "#f6f2ea"
  ink: "#1c1a17"
  muted: "#6b645b"
  rule: "#e0d9cc"
  wash: "#ede7dc"
  accent-blue: "#1d6a9e"
  accent-marigold: "#a84e0c"
  accent-olive: "#56632a"
  graphite: "#171716"
  ink-dark: "#ece8e1"
  muted-dark: "#9c968d"
  rule-dark: "#2c2b29"
  wash-dark: "#222120"
  accent-blue-dark: "#6cb8e6"
  accent-marigold-dark: "#f0954a"
  accent-olive-dark: "#a9b86a"
typography:
  display:
    fontFamily: "Bricolage Grotesque, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.75rem, 9vw, 5.5rem)"
    fontWeight: 640
    lineHeight: 0.98
    letterSpacing: "-0.035em"
    fontVariation: "\"opsz\" 96, \"wdth\" 92"
  headline:
    fontFamily: "Bricolage Grotesque, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 7vw, 4.25rem)"
    fontWeight: 660
    lineHeight: 1
    letterSpacing: "-0.035em"
    fontVariation: "\"opsz\" 96, \"wdth\" 92"
  article-title:
    fontFamily: "Bricolage Grotesque, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2rem, 5.5vw, 3.25rem)"
    fontWeight: 650
    lineHeight: 1.05
    letterSpacing: "-0.03em"
    fontVariation: "\"opsz\" 72, \"wdth\" 94"
  hook:
    fontFamily: "Bricolage Grotesque, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.25rem, 1.05rem + 0.75vw, 1.5rem)"
    fontWeight: 400
    lineHeight: 1.4
    fontVariation: "\"opsz\" 28"
  title:
    fontFamily: "Bricolage Grotesque, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.3125rem"
    fontWeight: 620
    lineHeight: 1.25
    letterSpacing: "-0.015em"
    fontVariation: "\"opsz\" 32"
  section:
    fontFamily: "Bricolage Grotesque, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 660
    letterSpacing: "-0.005em"
    fontVariation: "\"opsz\" 24, \"wdth\" 86"
  body:
    fontFamily: "Bricolage Grotesque, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.0625rem, 1rem + 0.2vw, 1.125rem)"
    fontWeight: 400
    lineHeight: 1.6
    fontVariation: "\"opsz\" 16"
  label:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "0.8125rem"
    fontWeight: 400
    letterSpacing: "0"
    fontFeature: "\"tnum\""
rounded:
  focus: "3px"
  frame: "6px"
  panel: "10px"
  pill: "999px"
  circle: "50%"
spacing:
  gutter: "20px"
  measure: "680px"
  section: "clamp(5rem, 12vw, 8.5rem)"
  row: "1.25rem"
  list-gap: "1.75rem"
  label-column: "9.5rem"
components:
  text-link:
    textColor: "{colors.ink}"
  text-link-hover:
    textColor: "{colors.accent-blue}"
  work-row:
    textColor: "{colors.ink}"
    typography: "{typography.title}"
    padding: "1.25rem 0 1.3rem"
  work-row-hover:
    textColor: "{colors.accent-blue}"
  copy-email:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "0.85rem 1.1rem"
  preview-frame:
    backgroundColor: "{colors.paper}"
    rounded: "{rounded.frame}"
    width: "320px"
  terminal:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.panel}"
    width: "600px"
  poke-bubble:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    padding: "0.3rem 0.65rem"
  theme-toggle:
    textColor: "{colors.ink}"
    rounded: "{rounded.circle}"
    size: "44px"
  theme-toggle-hover:
    backgroundColor: "{colors.wash}"
---

# Design System: Hussain Kagalwala

## Overview

**Creative North Star: "Drawn in the Same Ink"**

A calm personal page on one narrow axis. The person appears as a 1-bit ordered-dither portrait whose dots are the exact ink of the type, on warm paper by day and graphite by night. Everything else is typography and hairlines: Bricolage Grotesque does the expressive work through its weight, width and optical-size axes, and JetBrains Mono appears only where data lives (dates, status, tags, the terminal).

Density is low and the reading order is linear: one centered first viewport, then ruled lists separated by generous section padding. Depth comes from 1px lines, never from lifted surfaces. Colour is near-monochrome; one rare accent arrives on hover, on the hook's single emphasised word, on focus rings and inside the easter eggs.

The world rejects the stacked-section portfolio template: hero banners, card grids, tech-logo walls, filled "Hire Me" buttons.

**Key Characteristics:**
- One ink for type, icons and portrait dots; paper or graphite ground.
- Hairline rules (1px) are the only structure.
- Variable-axis type: width and weight move, the family never changes.
- Square dots as the recurring mark (portrait cells, status pulse, list bullets, favicon).
- One accent at a time, chosen site-wide (blue, marigold or olive).
- Motion is ease-out and quiet; overshoot only on small things the visitor triggered.

## Colors

Warm, near-monochrome paper-and-ink with a single selectable accent; every role has a light and a dark value swapped by `data-theme`.

### Primary
- **Hoodie Blue** (`accent-blue`; dark `accent-blue-dark`): the default accent. Link and work-name hover, the hook's 2px underline, the status pulse, focus outlines, caret, copied state, terminal prompt and highlights.

### Secondary
- **Marigold** (`accent-marigold`; dark `accent-marigold-dark`): alternate accent, same roles, selected by `html[data-accent="marigold"]`.

### Tertiary
- **Olive** (`accent-olive`; dark `accent-olive-dark`): alternate accent, same roles, selected by `html[data-accent="olive"]`.

Only one of the three is ever live; they are alternates, not a palette to combine.

### Neutral
- **Warm Paper** (`paper`) / **Graphite** (`graphite`): page ground, and the ground of every bordered object (preview frame, terminal, poke bubble). Also the theme-color meta values.
- **Ink** (`ink` / `ink-dark`): all primary type, icons, portrait dots, 1px object borders, and text selection ground.
- **Muted Stone** (`muted` / `muted-dark`): secondary text: hook, descriptions, dates, tags, footer, preview labels.
- **Rule** (`rule` / `rule-dark`): hairlines between list rows, after section titles, above the footer, the copy-email outline, resting link underlines, scrollbar thumb.
- **Wash** (`wash` / `wash-dark`): the pressed/hover ground of icon buttons (theme toggle, terminal close) and the ground of code blocks in articles. Never a card or panel surface.

### Named Rules
**The One Ink Rule.** Type, icons and portrait dots share one colour token. The portrait is never a photo-tone image; it is ink on paper.

**The Rare Accent Rule.** The accent marks state and a single emphasised word. It never fills a surface larger than the 6px status square.

## Typography

**Display Font:** Bricolage Grotesque (variable: wght, opsz, wdth), fallback ui-sans-serif, system-ui
**Body Font:** Bricolage Grotesque at opsz 16
**Label/Mono Font:** JetBrains Mono 400

**Character:** One grotesque stretched across its axes: narrow and heavy at the name, wide-open and light in body text. Mono is a data voice, small and tabular, never a headline.

### Hierarchy
- **Display** (640, clamp 2.75rem to 5.5rem, 0.98): the name only. Each letter reacts to the pointer, moving from wght 640 / wdth 92 toward wght 800 / wdth 78 with a small lift and tilt.
- **Headline** (660, clamp 2.5rem to 4.25rem, 1): the contact line.
- **Article title** (650, clamp 2rem to 3.25rem, 1.05): blog post titles.
- **Hook** (400, clamp 1.25rem to 1.5rem, 1.4, max 30ch): the one sentence under the name, in muted with one ink word underlined in accent.
- **Title** (620, 1.3125rem, 1.25): work item names; article h2 sits beside it at 640 / 1.375rem.
- **Section** (660, 1.0625rem, wdth 86): section headings, followed by a hairline that runs to the column edge.
- **Body** (400, clamp 1.0625rem to 1.125rem, 1.6): running text; descriptions capped at 54 to 58ch, article prose at 68ch.
- **Label** (JetBrains Mono 400, 0.8125rem, tabular numerals): dates, status, tags, footer, terminal.

### Named Rules
**The Axis Not Family Rule.** Hierarchy and expression come from weight, width and optical size of the one grotesque. Do not add a second display family.

**The Mono Means Data Rule.** Mono is reserved for dates, status, tags, labels and the terminal. Never set prose or headings in it.

## Layout

A single centered column: max width 680px measure plus a 20px gutter each side. The first viewport is a full 100svh centered stack: portrait (clamp 224px to 300px square, canvas bleeding 40px beyond it), name, hook, mono status line, two quiet text links. The theme toggle is the only chrome, absolutely placed 14px from the top, just inside the frame's right hairline on wide screens (14px from the viewport edge below 800px).

**The Frame.** From 800px up, two full-height hairlines in `--rule` mark the centre axis (`body::before`, fixed, width = measure + 3 gutters, i.e. 30px outside the text). The footer's top rule spans exactly between them. Below 800px the frame is hidden.

Sections open with clamp(5rem, 12vw, 8.5rem) of top padding; the contact block gets more (clamp 7rem to 11rem) and is centered. Lists are ruled rows (1.25rem vertical padding for work, 1.1rem for writing). The timeline uses a 9.5rem label column with a 1.5rem gap, collapsing to one column at 560px.

**Stack map (What I work with).** Three stations in a row (browser, server, chip), each a 64×48 line drawing in 1.5px ink that wipes in left to right on entry. A dotted line joins them, and a 6px accent square travels along it on a 4.2s loop, only while the section is on screen. Each station's tools are listed under it with a 15px monochrome Simple Icons mark in ink, or a 5px muted square when no mark exists. These are marks beside words, never a logo wall: no colour logos, no tiles. Under 640px the stations stack, joined by a vertical dotted line, and the packet is hidden. With reduced motion everything is static.

Work rows carry their preview inside the column (chosen in live mode, replacing the earlier cursor-following preview): a 132px 16:10 thumbnail between the text and the "+" icon, 4px radius, 1px rule outline. Screenshots render as 2px-cell ink dither (`DitherImage`) and dissolve cell by cell into the colour screenshot while the row is hovered or focused (420ms); projects without a screenshot get a drawn ink placeholder (`PlaceholderArt`: chip + waveform, sea layers + float). On entry each row's top hairline draws left to right (820ms) and its thumbnail wipes open with a clip-path (720ms), both staggered 90ms per row. Under 560px the thumbnail shrinks to a 72px tile beside the title and the description runs full width; opened rows also show a full-width preview on touch screens.

## Elevation & Depth

Flat. There are no box-shadows anywhere in the system. Objects that sit apart from the page (preview frame, terminal dialog, poke bubble) are paper-grounded with a 1px ink border; separation between content is a 1px rule line. The terminal's modal backdrop is the paper colour at 78%, a veil, not a dim.

### Named Rules
**The Hairline Rule.** Structure is drawn with 1px lines: rule-coloured between content, ink-coloured around objects that float. No drop shadows, no filled cards, no filled chips.

## Shapes

Mostly square. Lists and sections have no corners at all, only rules. Small objects take modest radii: 6px on the preview frame, code blocks and the terminal close button; 10px on the terminal; the poke bubble is 10px with a 2px tail corner at bottom-left. Circles are kept for the portrait hit area and the 44px theme toggle. The copy-email control is the single pill (999px, 14px under 480px).

Marks are square: portrait dither cells, the 6px status pulse, the 5px prose bullet, the favicon's 3×3 pixel "H", whose crossbar is the accent square that travels the stack map (colours invert under a dark system theme; apple-icon.png is the light version at 180px). Tab title: "Hussain Kagalwala — Full-stack & Edge AI Developer", posts "Title · Hussain Kagalwala". Icons are an authored 16px set: 1.5 to 1.8 stroke, round caps and joins, currentColor.

### Named Rules
**The Square Dot Rule.** Any small mark (bullet, status, indicator) is a square in ink or accent, echoing the dither cell. No round dots, no glyph bullets.

## Components

### Text Links
Quiet and underlined.
- **Style:** ink text, 1.5px underline in rule colour, offset 0.28em, weight 540 in link rows.
- **Hover:** text and underline turn accent over 180ms; the trailing arrow icon nudges in its direction (down 2px, north-east 2px, west 3px).
- **Focus:** 2px accent outline, 3px offset, 3px radius (global).

### Copy Email (the only button-like control)
- **Shape:** outlined pill (999px), 1px rule border, no fill, 0.85rem by 1.1rem padding.
- **Hover:** border turns ink. **Active:** scale 0.98.
- **Copied:** border and icon turn accent; the copy icon shrinks out and a check draws itself (stroke-dashoffset, 320ms) with a spring scale; a mono accent toast confirms below.

### Work List (signature)
- **Rows:** 1px rule above each row and below the last; name in Title type with a muted note, one muted line (54ch), mono tags, and a 28px plus icon in the right column.
- **Hover:** name turns accent and shifts 4px right; the icon turns ink.
- **Open:** the plus rotates 45 degrees; the panel expands via grid rows over 360ms ease-out, content fading in 80ms later.
- **Preview frame:** 16:10, 6px radius, paper ground, 1px inset ink outline, shown inside opened work rows on touch screens.
- **Work thumbnail:** 132px (72px on phones) 16:10, 4px radius, 1px rule outline; dithered screenshot that resolves to colour on hover/focus, or a drawn placeholder.

### Dithered Portrait (signature)
An 8x8 ordered-dither canvas of the cutout photo, cells of 2, 3 or 4 device pixels by density, painted in ink. Edges dissolve over 5 cells with sparse stray dots; the top 6% and bottom 34% fade out. Dots are pushed by the pointer (44px radius) and spring back; a tap sends a ripple and shows the poke bubble.

### Poke Bubble
Paper ground, 1px ink border, mono 0.75rem, 10/10/10/2px corners; enters with a spring scale from 0.6 over 320ms.

### Theme Toggle
44px circle, ink sun/moon icon that morphs (sun core grows, bite moves, rays rotate out) over 420ms. Hover fills with wash. Switching theme plays a circular view-transition reveal from the toggle.

### Terminal (easter egg)
Native dialog, up to 600 by 440px, paper ground, 1px ink border, 10px radius. A muted mono title bar ruled off below; mono body at 0.8125rem / 1.65 with ink commands, muted output and accent highlights and prompt. Enters with a 10px rise and 0.98 scale over 260ms.

### Section Title
Section-weight heading followed by a flex hairline in rule colour filling the rest of the column.

## Do's and Don'ts

### Do:
- **Do** draw every separation with a 1px line: rule colour between content, ink around floating objects.
- **Do** keep the accent to hover, focus, state, the hook's single word and the easter eggs, and read it from `--accent` so the site-wide accent choice applies.
- **Do** express hierarchy through Bricolage's weight, width and optical-size axes.
- **Do** use JetBrains Mono at 0.8125rem with tabular numerals for dates, status and tags.
- **Do** use `--ease-out` (cubic-bezier(0.16, 1, 0.3, 1)) for transitions, 180 to 420ms; reveals rise 14px over 640ms with 70ms staggers.
- **Do** reserve `--ease-spring` (cubic-bezier(0.34, 1.3, 0.64, 1)) for small moments the visitor triggered: the poke bubble, letter reactions, the copy check, the cookie icon.
- **Do** use real screenshots only where they exist; otherwise a simple drawn placeholder, never a fake screenshot.
- **Do** honour reduced motion: transitions collapse to colour and opacity, reveals do not move.

### Don't:
- **Don't** use drop shadows or any box-shadow elevation.
- **Don't** use filled cards, filled chips or filled pills; the wash ground is only for icon-button hover and code blocks.
- **Don't** combine accents or introduce a fourth one.
- **Don't** render the portrait in tones or colours other than the current ink.
- **Don't** use overshoot easing on scroll reveals, layout changes or anything that moves without the visitor's input.
- **Don't** add a second display family or set headings in mono.
- **Don't** use round dots or glyph characters as bullets and indicators; use the square mark.
