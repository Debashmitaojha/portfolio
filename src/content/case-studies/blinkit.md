---
title: "Blinkit's products are all there. The path to them is broken — in three layers."
kicker: "Blinkit · Quick commerce · UX audit"
oneLiner: "The taxonomy is built like a warehouse, the filters assume digital fluency, and order history is never used in the browse path. A six-fix sequence, ordered by leverage — because shortcuts to a broken destination don't help."
why: "the sharpest diagnosis — three failure layers most audits never bother to separate."
pattern: dots
order: 4
featured: false
role: "Solo — audit, framework, fix sequencing"
timeline: "UX Sprint · May 2026"
method: "Direct usage observation + intent-mode analysis"
output: "17-page audit: 3-layer failure model, 4 intent modes, behavioural personas, 6-fix roadmap"
tools: ["UX audit", "Intent modeling", "Behavioural personas", "IA"]
metrics:
  - value: "3 layers"
    caption: "of discovery failure: structural taxonomy, filter literacy, missing personalisation"
  - value: "4 modes"
    caption: "of shopping intent, each failing differently — a single fix serves only one"
metricsNote: "Personas are behavioural archetypes from direct usage observation, not survey-validated profiles — stated as such in the audit itself."
exec:
  problem: "Blinkit sells 10-minute delivery, but product discovery quietly breaks before speed ever matters: a Plum shampoo lives under Personal Care only, a Milton mop under Kitchen only — users loop through 3–4 wrong categories and give up, or fall back to search forever. The design assumes a digitally fluent, patient user that a mass-market Indian platform doesn't actually have."
  approach: "Started from a plausible hypothesis — personalised home-screen shortcuts — and rejected it through real usage: shortcuts accelerate a path that's broken underneath. An intent-mode framework (brand-known + urgent, brand-known, need-known brand-unknown, exploratory) showed each mode fails at a different layer, so the audit sequences six fixes by leverage: rebuild the taxonomy around user mental models first, personalise the category page, make filters plain-language — and only then add shortcuts."
  outcome: "A prioritised fix sequence with effort and business impact per item, and the audit's key insight: the original hypothesis wasn't wrong, it was solving the right problem at the wrong layer. Fix the path, then accelerate it."
---

## 01 · The problem I audited

Blinkit promises 10-minute delivery — the entire value proposition is
speed. But getting users to discover and add products through category
browsing is where the experience quietly breaks down.

This audit began with a hypothesis: *personalised category shortcuts on the
home screen would increase add-to-cart rates.* Real usage across multiple
sessions revealed the problem runs deeper. It isn't about where shortcuts
sit. It's about whether the discovery architecture matches how users
actually think.

Two real failures triggered the audit:

| Failure case | What I tried | Root cause |
| --- | --- | --- |
| Plum Avocado Shampoo | Hair Care → Personal Care → Beauty. Product exists. Took 3 wrong-category attempts. | Category architecture made it invisible. Search was the only exit. |
| Milton Cleaning Mop | Sits at the boundary of Home Care, Kitchen, Cleaning. No tile surfaced it. | Cross-category products have no multi-bucket placement. Browse failed entirely. |

And underneath both: **the assumed user is wrong.** The design assumes a
digitally fluent, patient user who knows filters exist and has time to
scroll. Blinkit's actual base includes people mid-cooking, senior citizens
and first-time smartphone users. Designing for the educated user on a
mass-market platform is a fundamental UX error.

## 02 · The intent-mode framework

Browsing failure isn't one problem — it varies by why the user opened the
app, how well they know what they want, and how digitally comfortable they
are. Four modes emerged from direct usage observation:

| Intent mode | Example | Primary failure | Severity |
| --- | --- | --- | --- |
| Brand-known + urgent | "I need a Vicks inhaler right now" | Product buried in grid; no urgency-first surfacing | CRITICAL |
| Brand-known, not urgent | "I want Plum Avocado shampoo" | Category label mismatch; the wrong-category loop | HIGH |
| Need-known, brand-unknown | "Something for itchy scalp" | No problem-based discovery path; filters useless without a brand | HIGH |
| Exploratory | "Let me see what's on offer" | Home screen overloaded; no navigational hierarchy | MEDIUM |

The framework insight: **a single fix serves only one mode.** A complete
solution must serve all four — and cannot require digital literacy as a
prerequisite.

## 03 · Behavioural personas

*Researcher's note, as stated in the audit itself: these are behavioural
archetypes from direct usage observation and session analysis — not
survey-validated profiles. Interviews and session recordings should be
layered on before implementation decisions.*

- **Riya, 28 — the Habit Shopper.** Opens Blinkit 4–5× a week, same 10–15
  items. Tapped search within 4 seconds when the home screen showed her
  banners instead of her usual brand. The home screen treats her like a
  first-time visitor despite high loyalty.
- **Karan, 34 — the Opportunistic Browser.** "I came for milk. I stayed for
  snacks." Category tiles give zero preview of what's inside; every tile is
  a guess. Personalisation must sit *above* his grid, never replace it — he
  needs breadth.
- **Arjun, 26 — the Lost Intent Shopper.** Knows exactly what he wants;
  can't find where Blinkit put it. Scrolled 30+ products in the wrong
  category while the product existed the whole time. Now falls back to
  search every time. *He is not the problem — the taxonomy is.*
- **Sneha, 22 — the First-Timer.** No history, low familiarity. Spent 40
  seconds staring at tiles, never found cleaning supplies under "Home
  Care." Personalisation can't help her — she needs intent-based labels and
  a start-here path.

Four personas, four intent modes, **two shared failure points**: the
taxonomy reflects how the warehouse thinks, and the design assumes fluency
much of the real user base doesn't have.

## 04 · The flow, step by step

Walking the actual browse path from home screen to cart:

| # | Where | What actually happens | Verdict |
| --- | --- | --- | --- |
| 01 | Home screen | Categories, banners, carousels competing equally; no hierarchy; identical for new and loyal users | HIGH |
| 02 | Browse path | Search dominates above the fold; category grid buried under sponsored banners — layout structurally steers users to search | HIGH |
| 03 | Category grid | Warehouse-defined labels, no intent grouping, cross-category products in one bucket only | CRITICAL |
| 04 | Filter bar | Filters exist and work — but demand notice, memory, and brand knowledge; a hurried user never looks up | CRITICAL |
| 05 | Wrong-category loop | Tap wrong tile → backtrack → try again, 3–4 times in real sessions | CRITICAL |
| 06 | Category page sort | Default sort is popularity and margin; order history unused | MEDIUM |
| 07 | Product grid | 20–40 products, no previously-bought signal — the highest abandonment point in the path | HIGH |
| 08 | PDP "Bought Before" tag | ✔ Works and is validated — users just never reach it | WORKS |
| 09 | Add to cart | ✔ Works well — everything before it is what breaks | WORKS |

The flow insight that reframed everything: **the original hypothesis placed
the fix at step 1. The real breakdowns are at steps 3–5 and 7.** The Bought
Before tag at step 8 already works; users simply never get there.

## 05 · Competitive check — is this a Blinkit problem?

A parallel test across quick-commerce and e-commerce:

| Platform | Taxonomy | Filter UX | Personalisation |
| --- | --- | --- | --- |
| Blinkit | Warehouse-defined; cross-category products in one bucket | Passive — needs discovery, patience, brand knowledge | Order history unused in browse |
| Zepto | Broader top-level categories; slightly fewer wrong-category loops | Smart query interpretation ("dandruff shampoo"), still no progressive chips | Similar passive baseline |
| Amazon India | Faceted filters appear immediately; 200+ results → 8–10 in 2 taps | Best-in-class for intent-based discovery | "Frequently bought" prominent |
| Swiggy Instamart | **Identical taxonomy failure** — the same mop invisible in the same way | Same filter-literacy gap | Similar baseline |

The competitive insight: Swiggy Instamart failing identically proves this
is a **structural quick-commerce industry problem** — whoever fixes
information architecture first differentiates in a category where every
player is equally broken on this dimension.

## 06 · The six fixes — sequenced by leverage

| # | Fix | Effort | Business impact |
| --- | --- | --- | --- |
| 1 | Rebuild category taxonomy (intent-based architecture) | HIGH · 2–3 sprints | Direct cart conversion; kills the wrong-category loop |
| 2 | Progressive contextual filter chips | LOW-MED · 1–2 sprints | Browse completion rate |
| 3 | Personalise the category page ("Your Usuals") | MED · 1–2 sprints | Repeat purchase rate — highest ROI vs cost |
| 4 | Digital-literacy-first filter UX | MED · 1–2 sprints | Mass-market reach |
| 5 | Need-to-product discovery path | HIGH · 2+ sprints | Captures the unserved intent segment |
| 6 | Home screen shortcuts — layer on top LAST | LOW · 1 sprint | Session efficiency, only after 1–4 |

The ones worth reading closely:

**Fix 1 — taxonomy.** Warehouse labels ("Hair Care / Personal Care /
Beauty") become intent groupings ("Hair & Skin", "Morning Essentials",
"Cleaning & Home Care"), with cross-category products cross-tagged into
every relevant bucket. The product database doesn't change — only the
surfacing logic. Worked example: Plum shampoo appears in Hair & Skin *and*
Personal Care; the Milton mop in Cleaning & Home Care *and* Kitchen.

**Fix 3 — "Your Usuals."** A strip of 3–5 previously-bought items at the
top of the category page. Blinkit already has the data; this is the single
highest-ROI change relative to cost — one tap to the usual choice instead
of scanning 30 products.

**Fix 4 — plain-language filters.** "Filter" becomes "Narrow down by
brand"; an applied filter shows a visible removable badge ("Showing:
Anti-dandruff ×"); the bar stays sticky; labels get a Hindi/regional
option. Copy and orientation changes, not new features.

**Fix 6 — the original hypothesis, repositioned.** "Jump Back In" shortcuts
ship *last*, gated to users with 3+ sessions, never replacing the full
grid, with a weekly watch on basket category diversity — throttled if
diversity drops. A shortcut to a broken destination is not a fix.

## 07 · Metrics — and the guardrails

Every metric requires a pre-launch baseline; without one, post-launch
numbers can't prove causation. Baselines below are hypothesized ranges,
stated as such.

| Success metric | Hypothesized baseline → target |
| --- | --- |
| Discovery-to-add-to-cart rate (primary) | ~18–25% browse-path vs ~55–65% search-path → close the gap after fixes 1–4 |
| Category nav first-tap success | ~40–50% → 70%+ after the taxonomy fix |
| Browse-vs-search-fallback ratio | ~60–70% of browse sessions fall back → 15–20 point reduction |
| Filter usage per category page | ~8–12% → 30%+ after fixes 2+4 |
| Time to first add-to-cart | ~90–120s → under 60s for 5+-session users after fix 3 |

And the guardrails — because fixes can quietly do harm: **category
diversity per basket** (shortcuts must not lock users into 2–3 categories),
**new-category exploration rate** (personalisation must not kill
serendipity for Karan), **search usage** (cannibalising search without
lifting conversion is net zero), and **return/refund rate** (faster
add-to-cart is only valuable if it doesn't produce regret purchases).

## 08 · The core finding

> The hypothesis is not wrong. It is solving the right problem in the wrong
> place — at the wrong layer.

Products exist. Users have intent. Filters work. The Bought Before tag
works. None of these are connected in a way that serves the actual breadth
of Blinkit's user base. Fix the path first — taxonomy, then filters, then
personalisation, then literacy, then the need-to-product bridge — and only
then accelerate it with shortcuts.

What this audit taught me: a well-framed hypothesis can still point at the
wrong layer, and **designing for the educated user on a mass-market
platform is a UX error that compounds silently across millions of
sessions.**
