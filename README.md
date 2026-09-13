# scottmartinhall.com

Scott Martin Hall's personal and professional website — a single-page profile
site introducing who he is, where he's traveled, and what he plays.

Originally built in 2020, then modernized with the help of Claude in 2026. The
refresh was deliberately visual-no-op: the rendered page is pixel-for-pixel
identical to the original, verified across four viewports.

## Features

- **Hero** — full-viewport fixed-attachment cover photo, portrait, and calls to
  action linking to LinkedIn and the blog.
- **Sticky navigation** — the top nav detaches and pins itself once you scroll
  past the hero, revealing the monogram logo.
- **About Me** — a twelve-card grid covering background, career, hobbies and
  interests, including a live Codewars rank badge.
- **Where I've Been** — a photo grid of the states Scott has visited.
- **My Favorite Video Games** — a ranked top-five countdown with box art.
- **Scroll animations** — cards and artwork fade in as they enter the viewport.
- **Smooth scrolling** — in-page nav links glide to their section and move
  keyboard focus along with the viewport.
- **Responsive** — breakpoints at 1200px, 1023px, 767px and 480px collapse the
  grid to a single column on phones.
- **Blog placeholder** — `blog.html`, currently a "coming soon" page.

## Tech stack

Plain HTML5, CSS3 and vanilla ES6 — no build step, no framework, no runtime
dependencies. Deploy by copying the files to the web root.

- `IntersectionObserver` drives the scroll reveals; a `requestAnimationFrame`
  throttled passive scroll listener drives the sticky nav.
- Social icons are inlined SVG; the two animations used are ~20 lines of local
  CSS. Both replaced third-party libraries (ionicons, animate.css).
- The only external requests are the Lato webfont, the Codewars badge and
  Google Analytics.
- Layout uses a small vendored float grid (`external-resources/css/grid.css`).

## Structure

```
index.html                  Main single-page site
blog.html                   Blog placeholder
resources/
  css/style.css             Base styles, layout, components
  css/queries.css           Responsive breakpoints
  css/animations.css        fadeIn / fadeInLeft keyframes
  css/img/                  Background images referenced by CSS
  js/script.js              Smooth scroll, scroll reveals, sticky nav
  img/                      Photos, game art, icons, favicons
external-resources/
  css/grid.css              Vendored float-based grid system
```

Stylesheet load order is significant — `grid.css` is intentionally loaded after
`queries.css` so its `.col` rules win.

## Running locally

No tooling required; open `index.html` in a browser. To exercise it over HTTP
(so the manifest and analytics behave normally):

```bash
npx serve .
```

## Notes

- Analytics still uses a Universal Analytics property (`UA-164038466-1`).
  Universal Analytics stopped processing data in July 2023, so this currently
  collects nothing — it needs a GA4 Measurement ID (`G-XXXXXXX`) to work.
- Icons by [Icons8](https://icons8.com).
