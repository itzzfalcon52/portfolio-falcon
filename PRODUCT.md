# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Rebuild in Next.js (App Router, v16) + React 19 + Tailwind CSS 4, the stack recorded in `package-lock.json`. The previous source is gone: route folders (`src/app/about`, `src/app/projects`, `src/app/blog/[slug]`, `src/modules/home`) are empty, there is no `package.json`, and `.git` has no HEAD. Treat the remnants as content, not as a design system to preserve. Deploy target: Vercel.

## Users

Recruiters and engineering hiring managers screening Hussain Taher Kagalwala for software-engineering internships and early roles. They usually arrive from a resume link, LinkedIn or GitHub, skim for a minute or two, and decide whether he can ship real, working software. Technical reviewers may then go deeper into a project write-up or the blog.

## Product Purpose

A personal portfolio presenting Hussain as a **full-stack + AI generalist**: someone who builds and deploys complete products, with AI (LLM agents, classical ML, on-device models) as one strong skill among several. Success: a visitor quickly sees deployed, in-use work, understands the range (web apps, real-time systems, LLM tooling, edge ML), and contacts him or downloads the resume.

## Positioning

What sets him apart from typical student portfolios is breadth backed by deployment: live products with real users (SponsCRM is used by E-Cell; Holdfast has a public demo), real-time systems (HangoutX), production-minded AI work (guardrails, evals, tracing, drift checks, 162 tests), and on-device ML that runs on microcontrollers. It's the same engineer working across browser, server, model and hardware.

## Operating Context

- Student at BITS Pilani, Hyderabad Campus: M.Sc. Chemistry + B.E. Electrical & Electronics, 2024–2029, CGPA 7.94/10. On the site he is described as an **EEE student** (never "CS student").
- Experience: Edge AI & Embedded Systems Intern, Digitoad Technologies (Bengaluru, May–Jul 2026); Treasurer, E-Cell BITS Pilani Hyderabad (Aug 2026–present).
- Visitors often open the site on a phone from LinkedIn as well as on desktop.

## Capabilities and Constraints

- Sections: home, projects, about, blog (with `/blog/[slug]` posts).
- **Featured work** (order lives in `src/content/site.ts`):
  - Holdfast: churn and retention copilot with AI briefs (LangGraph agent, guardrails, LLM gateway, eval harness, ML pipeline, connectors). holdfast-ai.duckdns.org
  - Keyword spotting on Coral Dev Board Micro: 12-class voice commands, INT8 / Edge TPU, C++ audio pipeline; research paper in progress.
  - SponsCRM: E-Cell sponsorship CRM, actively used. www.sponscrm.tech
  - SkillForge: LeetCode-style online judge / code execution platform (Next.js, Node, Prisma, PostgreSQL, Judge0, async judging). github.com/itzzfalcon52/skill-forge, skill-forge-orpin.vercel.app. The "code execution platform" blog post is about this project.
  - HangoutX: real-time 2D metaverse (React, Phaser, WebSockets, WebRTC voice/video). www.hangoutx.space, github.com/itzzfalcon52/HangoutX
  - AntarBodh (Smart India Hackathon 2026, team): subsurface ocean temperature from satellite data.
- **Experience:** Edge AI & Embedded Systems Intern, Digitoad Technologies, Bengaluru (May–Jul 2026); Treasurer, E-Cell BITS Pilani Hyderabad (Aug 2026–present); Organizer, Launchpad'26; Web Developer, DOTA BPHC fest site.
- Older course projects (worldwise, usepopcorn, yumlyst, UmbrellaAlert) are **dropped**.
- **Writing:** a short Writing section on the home page plus post pages for the two posts in `src/content/posts.ts` (HangoutX metaverse; SkillForge code execution platform).
- **Contact:** email, GitHub (github.com/itzzfalcon52), LinkedIn (https://www.linkedin.com/in/hussain-kagalwala-467a77328/, the working URL from the live site). The phone number must **not** appear on the site.
- **Resume:** one downloadable resume. *Open: which variant (GenAI or Edge AI) to publish; not yet decided.*

## Brand Commitments

- Name: Hussain Taher Kagalwala. Handle: itzzfalcon52.
- Voice follows the resumes: plain, specific and factual. It names what was built and how, and doesn't hype.

## Evidence on Hand

- Resume facts (both variants) are the source of truth for all claims, dates and numbers.
- `public/profile.jpeg`: original profile photo. `public/me-cutout.png` (background removed with macOS Vision, head and shoulders) is the source for the dithered portrait; `public/me.jpg` is the plain crop.
- `public/HangoutX.png`: HangoutX screenshot. Thumbnails: real screenshots for Holdfast, SponsCRM, SkillForge, HangoutX; a drawn illustration (labelled as one in its alt text) for the Digitoad drowsiness project; SVG placeholders for Coral KWS and AntarBodh. Screenshots are never faked.
- Tech logo images in `public/` (nextjs, react, node-js, webrtc, shadcn, framer, zustand, css-3).
- No testimonials, user counts, metrics beyond the resumes, or press. Do not invent any.
- Current site: hussaincodes.live (being replaced).

## Product Principles

1. Lead with things that ship: show deployed links and real usage before stack lists.
2. Show range without diluting it: web, real-time, LLM and edge work should read as one engineer, not four profiles.
3. Every claim traces back to the resume; no inflated numbers or invented proof.
4. Respect a skimming recruiter: the essentials (who, what he builds, how to reach him) must be clear within seconds on any device.
5. Depth on demand: project details and blog posts are there for technical readers who want them.
