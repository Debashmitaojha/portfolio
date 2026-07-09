---
title: "Teaching a signature to write itself"
blurb: "An Apple-'hello'-style stroke animation of my real handwriting: the pen path was traced against the ink pixel-by-pixel until a coverage checker scored it 99.4%."
order: 2
---

The footer signature isn't a wipe or a GIF — it's an SVG mask whose strokes
follow the actual pen order of my handwriting: the D, then "ojha" flowing
into the flourish, then the j-dot tapped last. Getting the mask to hug the
ink took a purpose-built measurement loop: render candidate strokes, compare
against the real ink pixels, fix the misses, repeat — eight iterations to
99.4% coverage.
