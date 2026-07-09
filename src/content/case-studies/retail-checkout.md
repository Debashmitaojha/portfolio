---
title: "A retail checkout that skips the queue — designed, then actually built."
kicker: "Scan and Go · Retail · 0→1 build"
oneLiner: "Scan products while you shop, pay in-app, verify at the exit. Built end-to-end in React Native with Firebase and Razorpay — to experience how the flow behaves before it ships, not just how it looks in mockups."
why: "proof I ship — a working app you can watch running, not a stack of mockups."
cover: "/media/retail-checkout-cover.jpg"
order: 2
featured: true
role: "Solo — product, design, AI-assisted build"
timeline: "June 2026"
method: "AI-augmented build (Cursor) — zero hand-written code"
output: "Working app: scanning, cart, coupons, OTP auth, payment, order verification"
tools: ["React Native", "Cursor", "Firebase · Firestore + OTP", "Razorpay", "Zustand", "Design tokens"]
metrics:
  - value: "7 screens"
    caption: "scan → cart → coupons → auth → pay → verify → feedback, all working"
  - value: "3 coupon types"
    caption: "flat, percentage-with-cap, and threshold-gated — evaluated live against the cart"
  - value: "0 lines"
    caption: "of code written by hand — built through AI-assisted development in Cursor"
video: "/media/retail-checkout-walkthrough.mp4"
heroMedia: "/media/retail-checkout-walkthrough.mp4"
heroMediaAlt: "The Scan and Go app running: scanning a product, cart updating, payment screen"
exec:
  problem: "The billing queue is the worst part of physical retail: you chose your products in minutes and then wait to be allowed to pay. The idea — a customer scans products while shopping, builds the cart in real time, pays in-app and verifies the order at the exit — only proves itself in a working flow, not in static screens."
  approach: "Instead of stopping at a prototype, I built the entire workflow in React Native through AI-assisted development in Cursor: barcode capture via camera plus manual entry for real-world failure cases, Firebase phone-OTP auth and Firestore order state, coupon logic with flat and percentage rules, thresholds and caps, and a Razorpay checkout integration — on a reusable UI foundation of design tokens, shared components and Zustand state."
  outcome: "A complete, working retail checkout flow — live barcode scanning with a manual fallback, a real multi-rule coupon engine, Firebase phone-OTP auth, an actual Razorpay test-mode payment, and a QR-code exit-verification screen that replaces the billing counter. The walkthrough above is an unedited recording of it running."
---

## 01 · Why build it, not just design it

The billing queue is the worst part of physical retail: you chose your
products in minutes, then you wait for permission to pay. The idea — scan
as you shop, pay in-app, verify at the exit — is easy to mock up and easy
to hand-wave. It only proves itself when the flow actually runs: does live
barcode scanning hold up in a real store's lighting? Does the coupon math
survive a cart edit? Does a payment failure leave the cart in a sane state?

So I didn't stop at screens. I built "Scan and Go" end-to-end in React
Native through AI-assisted development in Cursor — description in prompts,
review and correction by me — to find out how the flow actually behaves
before it ships, not how it looks frozen in Figma.

## 02 · The flow, screen by screen

**Scan.** The camera opens directly on a live barcode feed with the store
name pinned at the top ("Dummy Store, Malviya Nagar") and a persistent
"Having trouble? Enter barcode" fallback for damaged or unreadable codes —
the real-world case a demo-only prototype would skip. Each successful scan
drops a product card at the bottom with live price and a running "View
cart" total, so the cart builds itself while you're still standing in the
aisle.

**Review cart.** Quantity steppers per item, an "Add more items" shortcut
back to scanning, and a bill summary that separates the item total from
what's actually payable — the gap is where the coupon engine does its work.

**Coupons.** Three simultaneous, differently-shaped rules, not one
discount code: a percentage-off-with-a-cap ("50% off up to ₹200" —
WELCOME50), a flat-amount-off with a minimum spend the UI actively enforces
("Add ₹281 more to avail this offer" appears when the cart doesn't qualify
yet), and a threshold flat discount. Applying WELCOME50 against this cart
triggered a real cap calculation — ₹109.5 saved, not a flat 50% — confirmed
by both a celebratory success modal and a recalculated bill summary
downstream.

**Auth.** "Login to continue" gates checkout, not scanning — you can build
a full cart anonymously and only prove identity at the point of paying.
Phone number → OTP → reCAPTCHA → "Logged in successfully," using Firebase
phone authentication, not a mocked login screen.

**Pay.** Checkout hands off to a real Razorpay integration running in test
mode (the diagonal "Test Mode" ribbon is Razorpay's own, not something I
added). The card sheet is Razorpay's production UI showing a real bank
BIN — DCB Bank Visa, "CVV not needed for secured cards" — followed by an
OTP send, an animated "Confirming Payment" state, and a plain, fast success
screen. This is the actual payment gateway integration, exercised in test
mode so no real money moves.

**Verify.** The payment success screen hands off immediately to a
**QR-code verification screen** — "Please head towards the exit and show
this screen for security checking" — carrying the order ID, the paid
amount, and item thumbnails. This is the screen that replaces the billing
counter: a store associate scans it on the way out instead of re-ringing
every item.

**Close the loop.** A final confirmation screen ("You're all set! Thank you
for shopping with us") repeats the order ID and items, asks a one-tap
experience rating (bad / neutral / good), and offers "Continue shopping" —
turning a single transaction back into a session instead of a dead end.

## 03 · What's underneath

- **Scanning** — device camera barcode capture with a manual-entry escape
  hatch for real-world failure cases.
- **State** — Zustand managing cart contents, quantities, and applied
  coupon across the scan → review → pay flow.
- **Backend** — Firebase: phone-OTP authentication and Firestore for order
  and product state.
- **Coupon engine** — flat and percentage rules, spend thresholds, and
  discount caps, evaluated live against the current cart.
- **Payments** — Razorpay checkout integration in test mode.
- **UI foundation** — shared components and design tokens, built once and
  reused across every screen above.

## 04 · What building it (instead of mocking it) actually taught me

Static screens can't fail in the ways real systems fail — a coupon that
looks correct in a spec can still be wrong once it meets an actual cart
total; a login screen is a different design problem when it has to survive
a real OTP round-trip and a possible reCAPTCHA challenge; a payment step
looks trivial until you're the one deciding what the UI shows during the
two seconds a gateway takes to confirm. Building the whole path end-to-end
— not just the happy-path screen — is what surfaced those questions early
enough to answer them.

---

*Video above: unedited screen recording of the app running against
Razorpay's test-mode gateway and a live Firebase backend.*
