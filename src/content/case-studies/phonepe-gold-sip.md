---
title: "Why aren't more PhonePe users starting a Gold SIP?"
kicker: "PhonePe · Fintech · Feature adoption concept"
oneLiner: "Not a redesign — a discoverability and trust problem, worked through five proto-personas and a five-screen onboarding flow, with the full design process documented as it happened: PM review, engineering review, pushback and all."
why: "product strategy on the record — the whole design argument, PM and eng reviews included."
pattern: waves
order: 3
featured: true
role: "Solo — product thinking, UX, AI-augmented design process"
timeline: "2026"
method: "AI-augmented design, documented end-to-end (27-slide interactive artifact)"
output: "Interactive artifact: versioned flows, 5 proto-personas, PM/Eng review lenses, working demo"
tools: ["Product strategy", "Proto-personas", "Flow design", "Interactive artifact"]
metrics:
  - value: "5"
    caption: "proto-personas driving versioned flows — First-Timer, Festive Buyer, Anxious Planner, Optimizer, Lapsed User"
  - value: "5 screens"
    caption: "Emotional Hook → How It Works → Pick Amount → Set Up SIP → Confirm"
metricsNote: "Personas are assumption-based proto-personas — planned user interviews (5–6) were not conducted. Every claim that depends on real user data is marked as such in the full case study."
exec:
  problem: "PhonePe has enormous UPI reach, but Gold SIP adoption depends on two things the funnel doesn't currently deliver: users discovering the feature at a moment that makes sense, and trusting digital gold enough to commit to a recurring purchase. The goal was never 'redesign PhonePe' — it was to answer why users don't discover or trust Gold SIP."
  approach: "The onboarding flow was designed persona-by-persona — not just personalised copy, but structural changes per persona — and stress-tested through documented PM-review, engineering-review and pushback rounds ('a design that can't survive a PM review meeting won't ship'). Metrics thinking framed the work: north-star adoption, supported by feature CTR, start rate, completion, repeat SIPs and 30-day retention, with experiments like surfacing Gold SIP after a successful UPI payment or salary credit."
  outcome: "A five-screen, five-persona onboarding flow with versioned iterations and a working interactive demo, plus the complete reasoning trail — including which engineering concessions were necessary and which were premature. The end-to-end journey question closed the loop: a design that convinces but doesn't convert is still a failure."
status: "Built from 9 screenshots of the interactive artifact plus my original strategy conversation — the full 27-slide artifact export would let me deepen this further. Ask if you'd like the live artifact link."
---

## 01 · Starting from the right question

The easy version of this project is "redesign PhonePe." I didn't want that
version. PhonePe already has enormous UPI reach — the interesting question
isn't visual, it's behavioural: **why aren't more of those users discovering
and starting a Gold SIP?**

That reframing matters because it changes what counts as a good answer. A
redesign is judged on taste. A discoverability-and-trust problem is judged
on whether it moves adoption — which forces the work into research
questions, hypotheses, and metrics instead of screens for their own sake.

## 02 · The hypothesis

Two candidate explanations, and the research design exists to tell them
apart rather than assume one:

- **Discoverability** — users who would invest in gold never see the
  feature in the first place.
- **Trust** — users see it, and hesitate anyway, because digital gold and
  a recurring commitment both carry friction that a single screen can't
  resolve.

The honest planned method was 5–6 short user interviews probing exactly
this split: *Have you heard of Gold SIP? Where do you invest money today?
What do you think about digital gold? Have you struggled to find features
inside PhonePe? What would make you actually start a Gold SIP?*

*Note on evidence: those interviews were planned as the next step, not
completed. Everything below is proto-persona and hypothesis work — assumed
segments used to structure the design, not survey-validated user research.
I'm stating that plainly rather than dressing proto-personas up as
findings.*

## 03 · Five proto-personas driving five versioned flows

Rather than one generic onboarding, the flow branches by assumed intent —
not just the copy, but the screen sequence itself:

- **First-Timer** — never invested; needs the emotional case before the
  mechanics.
- **Festive Buyer** — buys gold seasonally (Diwali-driven); needs a
  seasonal hook, not a generic pitch.
- **Anxious Planner** — has dependents; needs reassurance and control
  framing over upside framing.
- **Optimizer** — already invests elsewhere; needs a comparison angle, not
  a "what is gold" explainer.
- **Lapsed User** — dropped off; needs a re-entry hook, not onboarding from
  zero.

## 04 · The flow — walked from the First-Timer path

The onboarding is five screens: **Emotional Hook → How It Works → Pick
Amount → Set Up SIP → Confirm.** For the First-Timer, screen one carries no
numbers and no commitment ask at all — by design. It opens on:

> "This Diwali, start something just for you. Not for anyone else. A small,
> quiet decision your future self will thank you for."

— with a single "Tell me more" CTA. The annotation on this screen, kept
directly in the design file rather than left implicit, reads: *"No numbers.
No commitment ask."* That's a deliberate sequencing choice: earn emotional
buy-in before asking for a rupee amount, which only appears two screens
later.

## 05 · Documented under real-world pressure, not just designed

The part of this project I'd point a design lead to first isn't the
screens — it's that the process was stress-tested the way a real team
would, in stages I kept as separate, named passes rather than folding them
quietly into "iteration":

- **PM review** — *"Would this actually pass a product review meeting? A
  design that can't survive one won't ship."* The best designers critique
  their own work before anyone else can.
- **Engineering review** — *"Would an engineering manager actually build
  this? A design that can't be built in the given sprint is a drawing, not
  a product."* Sequencing constraints were named explicitly, not glossed
  over: *"Design is not the bottleneck. Sequencing is."*
- **Pushback** — deciding what to concede to engineering and what to
  defend, on purpose: *"Conceding gracefully on what doesn't matter builds
  credibility for the fights that do."*
- **Full journey** — checking the onboarding actually connects to a real
  transaction, because *"a design that convinces but doesn't convert is
  still a failure."*

## 06 · Metrics — adoption as the north star, not a proxy

**North star:** Gold SIP adoption.
**Supporting metrics:** feature CTR, page visits, SIP start rate,
completion rate, repeat SIPs, 30-day retention.

**Proposed experiments**, each designed to isolate a different lever:

1. Surface Gold SIP right after a successful UPI payment — tests
   discoverability at a moment of proven trust in the app.
2. Surface it after a salary credit — tests discoverability at a moment of
   financial slack.
3. Compare educational onboarding against a direct signup path — tests
   whether trust-building screens help or just add friction.

Each experiment is measured on the same funnel — CTR, conversion,
completion, retention — so the results are comparable against each other,
not just against a baseline.

## 07 · What I'd verify next

The single biggest gap between this case study and a shippable
recommendation is the interviews that were never run. Before trusting any
of the persona-driven branching above, I'd want real answers to the
discoverability-vs-trust split — because the two failure modes call for
almost opposite fixes, and right now the flow is designed to hedge across
both rather than commit to the one the data would actually support.
