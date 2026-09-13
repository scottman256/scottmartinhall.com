/* ==========================================================================
   scottmartinhall.com
   Plain ES6 — no jQuery, no Waypoints. Loaded with `defer`, so the DOM is
   already parsed by the time this runs.
   ========================================================================== */

(function () {
    'use strict';

    var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ----------------------------------------------------------------------
       Smooth scrolling for same-page anchor links
       ---------------------------------------------------------------------- */

    document.querySelectorAll('a[href*="#"]').forEach(function (link) {
        var hash = link.hash;

        // Skip links that don't point at anything.
        if (!hash || hash === '#' || hash === '#0') {
            return;
        }

        // Skip links to other pages.
        if (link.pathname !== window.location.pathname || link.hostname !== window.location.hostname) {
            return;
        }

        link.addEventListener('click', function (event) {
            var target = document.querySelector(hash) ||
                document.querySelector('[name="' + hash.slice(1) + '"]');

            if (!target) {
                return;
            }

            event.preventDefault();

            target.scrollIntoView({
                behavior: prefersReducedMotion ? 'auto' : 'smooth',
                block: 'start'
            });

            // Move keyboard focus along with the viewport.
            if (!target.hasAttribute('tabindex')) {
                target.setAttribute('tabindex', '-1');
            }
            target.focus({ preventScroll: true });
        });
    });

    /* ----------------------------------------------------------------------
       Reveal-on-scroll
       Mirrors the previous Waypoints behaviour: the first element of a group
       to cross the middle of the viewport reveals the whole group at once.
       ---------------------------------------------------------------------- */

    function revealGroup(selector, animationClass) {
        var elements = document.querySelectorAll(selector);

        if (!elements.length) {
            return;
        }

        function reveal() {
            elements.forEach(function (el) {
                el.classList.add('animated', animationClass);
            });
        }

        if (prefersReducedMotion || !('IntersectionObserver' in window)) {
            reveal();
            return;
        }

        var observer = new IntersectionObserver(function (entries) {
            if (entries.some(function (entry) { return entry.isIntersecting; })) {
                reveal();
                observer.disconnect();
            }
        }, {
            // Trigger once an element reaches the vertical middle of the viewport.
            rootMargin: '0px 0px -50% 0px'
        });

        elements.forEach(function (el) {
            observer.observe(el);
        });
    }

    revealGroup('.js-1', 'fadeIn');
    revealGroup('.js-2', 'fadeInLeft');

    /* ----------------------------------------------------------------------
       Sticky navigation
       The nav sticks once the "About Me" section reaches 60px from the top.
       ---------------------------------------------------------------------- */

    (function stickyNav() {
        var trigger = document.querySelector('.js-about');
        var nav = document.querySelector('nav');

        if (!trigger || !nav) {
            return;
        }

        var STICK_AT = 60; // px from the top of the viewport
        var ticking = false;

        function update() {
            ticking = false;
            nav.classList.toggle('sticky', trigger.getBoundingClientRect().top <= STICK_AT);
        }

        function onScroll() {
            // Coalesce scroll events into one measurement per animation frame.
            if (!ticking) {
                ticking = true;
                window.requestAnimationFrame(update);
            }
        }

        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll, { passive: true });
        update();
    })();
})();
