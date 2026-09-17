# Regency Leads intro-call page

Rebrands the live `/book-a-time/` page with the approved Regency Leads identity. Static HTML and CSS, with local licensed fonts and unchanged original logo artwork copied from the approved confirmation-page assets.

The agenda now covers advisor states and asset criteria, phone screening, qualified attendance, capacity and package terms. The calendar uses a light theme. A direct calendar link remains visible if embedding fails. The existing confirmation destination and booking metadata contract are retained; the supported Cal.com booking-success callback handles the redirect.

## Validation

Checked at 1440px and 375px with loaded fonts/images and no horizontal overflow. Local assets resolve. Booking-success callback and redirect payload checks pass without creating appointments. Git whitespace checks pass.

## Calendar and compact layout (2026-09-15)

The operator supplied `https://cal.com/regency-leads/regency-leads-strategy-call`. Both the iframe and direct fallback use this event. A compact logo/header and brief introduction put the calendar in the first screen. Preparation details remain in an expandable section below the calendar.

GitHub Pages serves the main branch; the apex domain proxies this route. Only this page and its assets are in scope.

Uses the Cal.com inline SDK so hiding event details, brand color, timezone selection and automatic frame sizing work on mobile. Calendar begins at approximately 162px on desktop and 187px on a 375px phone. The confirmation page’s fallback rescheduling URL also uses the supplied event.

## Complete preparation section above booking

All operator-supplied preparation text is visible above the calendar. The desktop calendar uses a proportional CSS transform with ResizeObserver-based sizing, preserving the full embedded surface and adapting to the available viewport height. At 1280×720 and 1440×900, the initial calendar and preparation page fit without vertical or horizontal scrolling. Mobile retains unscaled controls and natural page scrolling for readability. Form content can grow rather than being clipped.

## One-screen two-column layout (2026-09-16)

The stylesheet was rewritten as one coherent sheet (the earlier file was several layered patches). Colour tokens, type and spacing follow regencyleads.com: cream page, forest headings in Playfair Display, gold kicker and note accent, Source Sans 3 body. From 1200px wide the page is a two-column screen, preparation on the left and the calendar card on the right, with page scrolling disabled; `calendar-fit.js` measures the space between header and footer and scales the whole Cal.com surface down only when the viewport is too short (floor 0.7). Below 1200px the columns stack, the page scrolls and the calendar keeps full size. Checked headless at 1920x1080, 1440x900, 1366x768, 1280x720 and 1200x700 (no scroll, calendar side-by-side), and at 1024x768 and 390x844 (stacked, scrolls).
