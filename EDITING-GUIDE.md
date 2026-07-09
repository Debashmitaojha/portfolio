# How to edit your portfolio (no design skills needed)

Everything you'll ever want to change lives in **three places**. You never
need to touch layouts or components.

```
src/data/site.json        ← all copy on home/footer, email, socials, spirit animal
src/content/              ← case studies, playground items
src/styles/tokens.css     ← every color, font size, spacing (change once, applies everywhere)
public/                   ← images, video, resume PDF
```

After any change, the site rebuilds automatically while `npm run dev` is
running (or run `npm run build` for production).

---

## Change words (hero, intro, stickers, the big close, spirit animal)
Open `src/data/site.json`. Every sentence on the home page and footer is a
field there — hero shout, the italic line under it, the mono self-intro
lines, "I wear many hats" stickers, the closing shout, the button text,
your email. Edit, save, done.

## Add a new case study
1. Copy any file in `src/content/case-studies/` (e.g. `tata-neu.md`).
2. Rename it (`my-new-project.md` → page appears at `/work/my-new-project`).
3. Edit the frontmatter: title, kicker, one-liner, `why`, metrics, exec
   summary. Set `order:` to control its position on the rack.
4. Long-form content goes below the `---` as normal Markdown.

**Video walkthrough button**: add `video: "/media/your-file.mp4"` (drop the
file into `public/media/`). Delete the line and the button disappears.
Same for `demo:`.

**Work-grid card cover**: add `cover: "/media/your-image.jpg"` to use a
real screenshot as the card's square cover on the home page. Leave it out
and the card automatically gets a generated ink cover instead — pick the
motif with `pattern: rings` / `dots` / `waves` (defaults to `rings`).

## Add a playground item
Drop one markdown file into `src/content/playground/`:
```md
---
title: "My new thing"
blurb: "One sentence about it."
order: 3
image: "/brand/my-image.png"   # optional
---
```
That's it — a new card appears.

## Swap images
- **Intro drawing** (home): replace `public/brand/intro-art.png`
- **About photo**: add `public/brand/portrait.jpg`
- **Signature**: replace `public/brand/dojha-mark.jpeg` with a new scan,
  then run `node scripts/make-signature.mjs` (navy) and
  `node scripts/make-signature.mjs f4efe4 public/brand/dojha-ink-bone.png`
  (white). If the letters change, the writing animation path needs
  re-tracing — ask for that, it's a 20-minute job.

## Resume
- **The simple way**: drop `resume.pdf` into `public/`. From the next build,
  clicking **resume** in the nav downloads your PDF directly (named
  "Debashmita-Ojha-Resume.pdf"). No page, no fuss.
- Until a PDF exists, the nav shows the draft resume page instead.
- Draft page text: edit `src/pages/resume.astro` (the `projects` and
  `skills` lists at the top — plain lists).

## Case study "live screen" (the media beside the title)
Add to any case study's frontmatter:
```yaml
heroMedia: "/media/my-screen-recording.mp4"   # or .gif / .png / .webp
heroMediaAlt: "What's happening in the clip"
```
Drop the file in `public/media/`. Videos autoplay silently on a loop beside
the title so recruiters see the product at first glance; gifs and images
work the same. Remove the line, the slot disappears. (The retail checkout
study already uses your walkthrough video — that's the pattern to copy.)

## Change colors or fonts globally
Open `src/styles/tokens.css`. The palette (void/bone/pink/acid), all font
sizes, and spacing are named variables at the top. Change a value; the
whole site follows. The four font families are listed under "Typography".

## Spirit animal
`site.json → spiritAnimal` — emoji, name, blurb, and an optional `gif`:
set `"gif": "/media/my-animal.gif"` (file in `public/media/`) and the page
shows your gif instead of the emoji. Clear it back to `""` for the emoji.

## Blog (future)
Create `src/content/blog/` following the playground pattern — the content
system already supports new collections; ask when you want the pages wired.

## Deploy
The site is a static build (`npm run build` → `dist/`). Netlify/Vercel free
tier: connect the repo, set build command `npm run build`, publish dir
`dist`. Nothing else to configure.
