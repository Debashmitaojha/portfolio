---
title: "The home screen sells a super-app. The cart breaks the promise."
kicker: "Tata Neu · Super-app · UX audit + prototype"
oneLiner: "A reproducible cart experiment across 7 Tata brands, a Ghost Tab fix that needs zero backend change, and a pilot-tested second iteration — aimed at the exact step where sessions collapse."
why: "the deepest thinking on the rack — a fix built, pilot-tested, and iterated on evidence."
pattern: rings
order: 1
featured: true
role: "Solo — research, audit, prototype, testing"
timeline: "UX Sprint · June 2026"
method: "5-step AI co-pilot workflow"
output: "Working React prototype, 2 iterations, pilot usability test"
tools: ["UX audit", "React prototype", "Usability pilot · n=1", "Friction mapping"]
metrics:
  - value: "<25%"
    caption: "of ~140M NeuPass users complete a multi-category transaction"
    footnote: "†"
  - value: "6 taps"
    caption: "to recover a 'lost' item across 3 context switches in the real app"
  - value: "<30s"
    caption: "to find both items unaided in the pilot — the real app scores ~0 on this task"
    footnote: "†"
metricsNote: "† Sources: Tata Sons FY25 annual report (business context, not my design outcome) · moderated pilot, n=1 — pilot data informs iteration, not metrics."
exec:
  problem: "Tata Neu's global cart shows BigBasket and Croma always — even empty — while Tata Cliq, 1mg, Tanishq and travel never appear. The same 'add to cart' action produces different system responses with no signal in the layer the user is watching. Result: items silently vanish from the user's view, and after one failed retry, confusion converts to conviction — 'this app is broken.'"
  approach: "A reproducible experiment (add items from all 7 brands, open the global cart) established the failure surface. A friction map separated deliberate, constrained and accidental failures, and an emotion-mapped user journey located the exact step where sessions collapse. The fix — a Ghost Tab that appears in the global cart whenever Tata Cliq holds items, marked with an honest redirect badge — is display-layer only: no backend change. Built as a working React prototype and pilot-tested (5 tasks, think-aloud, SEQ)."
  outcome: "The pilot fixed findability (both items found unaided in under 30 seconds, first tap correct) but exposed a comprehension gap — 'it doesn't tell anything to me.' Iteration 2 shipped three text-level changes (brand-naming banner, action-shaped CTA, loop-closing success state) and deliberately held back three heavier ones to keep the next 5-participant test diagnostic. The interception problem, not the recovery problem, is the frame the fix pays off."
---

## 01 · The flow, and why it matters

Tata Neu's home screen makes a promise: **all of Tata in one app** —
groceries (BigBasket), electronics (Croma), fashion (Tata Cliq), pharmacy
(1mg), travel, jewellery. The framing problem is real — the home screen
reads as fintech, then shopping, then super-app, within thirty seconds. But
the audit question I chose is sharper, and downstream of it:

> Does Tata Neu's cart deliver the super-app promise the home screen makes?

The business stake is not cosmetic. Cross-brand basket size is the strategic
reason Tata Neu exists. Per Tata Sons' FY25 annual report, **fewer than 25%
of ~140M NeuPass users complete a multi-category transaction**. Every
session this flow kills lands in the other 75%.

## 02 · The experiment

A reproducible test anyone can run: add items to the cart from each
integrated brand, then open the global cart.

| Brand | Category | In the global cart? |
| --- | --- | --- |
| BigBasket | Grocery | ✅ Always — permanent tab, even when empty |
| Croma | Electronics | ✅ Always — permanent tab, even when empty |
| Tata Cliq | Fashion | ❌ Never |
| Tata Cliq Luxury | Luxury | ❌ Never |
| Tata 1mg | Pharmacy | ❌ Never |
| Tanishq | Jewellery | ❌ Never |
| AirAsia / Hotels | Travel | ❌ Never |

The empty-tab pattern is the tell: the architecture **can** carry
brand-level cart state — the exclusion is selective, not structural.

### Three failure layers

1. **Surface** — the global cart shows two brands always and hides five
   always. An inconsistent UI presented as complete truth.
2. **Behaviour** — the same action ("add to cart") produces different
   system responses with no signal in the layer the user is watching. The
   Cliq sub-header ticks up; the global cart stays silent. The signal
   exists — in the wrong layer.
3. **Architecture** — even the "unified" cart isn't: BigBasket and Croma
   still check out separately. The super-app is a display layer over
   separate businesses.

## 03 · The collapse, step by step

Primary persona: **Arjun, 22 — the Explorer.** Session 1–2, digitally
native, expects a cart to behave like Amazon's. (Two supporting personas —
Sunita, the BigBasket loyalist who never discovers other carts, and Rahul,
the NeuPass optimizer betrayed by split payments — are documented in the
research files.)

| Step | Action | State |
| --- | --- | --- |
| 1–2 | Adds Croma earphones → global cart badge updates | Expectation SET — "this works like Amazon" |
| 3–5 | Opens Fashion → silent redirect into Tata Cliq → adds jacket → sub-header cart ticks | Signal lands in the wrong layer |
| 6 | Taps Close ✕ — returns to Neu. No handoff, no message | The last interception window |
| 7–8 | Opens global cart: earphones present, jacket gone. Retries. Fails. | Expectation BROKEN → session collapses |

The core insight of the whole audit: **this is an interception problem, not
a recovery problem.** After step 7, confusion converts to conviction in one
retry — "this app is broken." Every fix must land before step 7, or change
what step 7 shows.

## 04 · The friction map

| # | Friction | Step | Type |
| --- | --- | --- | --- |
| 1 | False visual equivalence — identical Neu header frames native and redirect brands | 3–4 | Constrained |
| 2 | Close ✕ exits the brand silo with zero cart-state handoff | 6 | Constrained |
| 3 | **Global cart silence — incomplete picture presented as complete truth** | 7 | Deliberate |
| 4 | Broken recovery path — 6 taps, 3 context switches, no signposts | 8 | Deliberate |
| 5 | "Add to Cart" vs "Add to Bag" vs "Add to Basket" — three labels, one action | 5 | Accidental |
| 6 | Global cart icon disappears inside every brand silo | 4 | Deliberate |

Highest-leverage fix: **#3.** If the global cart acknowledges what it isn't
showing, the recovery-path failure (#4) largely solves itself.

## 05 · The fix — Ghost Tab

The strategic fork is honest: Tata Neu must eventually choose between
committing to the super-app (a unified view — the Honest Aggregator) or to
an honest portal (the WeChat model). Both are defensible; sitting between
them is not. But my recommendation doesn't wait for that decision:

**Ghost Tab** — a Fashion tab appears in the global cart whenever Tata Cliq
holds items, visually marked with an ↗ redirect badge. Tapping it routes
into Tata Cliq's own cart. **Display-layer only; no backend change.**
Precedent: Gojek's "Multiple Orders" — a unified view over a split backend.

Design decisions, from the audit's decision log:

- **Trigger = items-only, not always-on** — avoids seven-tab clutter.
- **Tap = honest redirect, not inline rendering** — inline would smuggle in
  the exact backend dependency the fix claims to avoid.
- **Differentiation = full opacity + ↗, not greyed-out** — reduced opacity
  reads as disabled.

## 06 · Validation — pilot usability test (n=1)

I built the Ghost Tab as a working React prototype and ran a moderated,
task-based pilot: 5 tasks, think-aloud, SEQ after each. Pilot data informs
iteration, not metrics.

| Task | Result | Evidence |
| --- | --- | --- |
| T1 — Find everything you added | **FIXED** | Both items found unaided, <30s, first tap correct. The real app scores ~0 on this task. |
| T2 — What do the circles & ↗ mean? | **FAILED** | Badge unnoticed; once seen: "it doesn't tell anything to me." |
| T3 — Buy the jacket | FRICTION | Correct first tap, but hesitated at the CTA — "I thought I was already in Tata Cliq." |
| T4 — Total & number of payments | PARTIAL | Understood 2 payments; couldn't compute the combined total. |
| T5 — Go back to the headphones | FRICTION | Feared Close ✕ would "close the checkout." First instinct: OS back gesture. |

The pilot's mental model: *"3 tabs in the cart → the next step is
checkout."* The Tata Cliq cart was read as step 2 of one funnel — not a
separate brand's cart. The structure worked; the words didn't.

The senior takeaway: **findability without comprehension just moves the
confusion one screen later.** Asked "what is this page?" on the Cliq cart,
the participant answered "this is the Tata Neu cart" — anchored entirely on
the persistent Neu header. Direct evidence for friction #1.

## 07 · Iteration 2 — words do the teaching

Three changes shipped (text-level, zero added friction); three deliberately
held back to keep the next test diagnostic. The Cliq cart screen was also
rebuilt 1:1 against the real app for fidelity.

**Shipped:**

1. Banner names the brand: *"Sold by Tata Cliq · checks out on Tata Cliq."*
2. Action-shaped CTA: *"Continue to Tata Cliq cart →"* (replacing the
   icon-only signalling the pilot called "doesn't tell anything").
3. Checkout closes the loop → a success state auto-returns to Tata Neu,
   replacing the pilot's dead checkout button.

**Held back — deliberately:**

| Held change | Why |
| --- | --- |
| Confirmation sheet ("Switch to Tata Cliq cart — Continue / Stay") | Added friction — test zero-tap wording first; escalate only if needed |
| Cliq-branded page header inside the Neu chrome | Strongest-evidence change, held to measure whether wording alone fixes "where am I?" |
| Reassurance toast on Close ✕ | Keeps T5 diagnostic — if upstream fixes build the model, ✕-fear should disappear unaided |

## 08 · Business rationale & next steps

Metrics that matter: **cross-category conversion rate** and **new-user
activation rate**, against the baseline of <25% of ~140M users crossing
categories. The Ghost Tab gives every Arjun a thread to pull at the exact
step where sessions currently collapse — and makes Class-B cart abandonment
measurable for the first time. The strategic fix (Honest Aggregator) waits
on the product question the cart keeps asking: *what does Tata Neu actually
want to be?* Paytm's retreat shows the cost of never answering it.

**Next:** run the 5-participant test on Iteration 2 (script now includes a
super-app framing line and a brand-awareness warm-up — both pilot
learnings). Pass bar: ≥4/5 find the jacket unaided in <30s **and** ≥4/5
explain that fashion checks out separately. If "where am I?" recurs,
escalate in order: Cliq page header → confirmation sheet → toast.

---

*Supporting files: audit master doc · research notes · personas · flow &
friction map · usability test plan · pilot results · iteration decision log
· working React prototype (both iterations switchable). Sources: Tata Sons
FY25 Annual Report · Medianama (2022) · NN/g on WeChat Mini Programs ·
Gojek "Multiple Orders" case study.*
