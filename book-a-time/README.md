# Regency Leads intro-call page

Rebrands the live `/book-a-time/` page with the approved Regency Leads identity. Static HTML and CSS, with local licensed fonts and unchanged original logo artwork copied from the approved confirmation-page assets.

The agenda now covers advisor states and asset criteria, phone screening, qualified attendance, capacity and package terms. The calendar uses a light theme. A direct calendar link remains visible if embedding fails. The existing confirmation destination and booking metadata contract are retained; the supported Cal.com booking-success callback handles the redirect.

## Validation

Checked at 1440px and 375px with loaded fonts/images and no horizontal overflow. Local assets resolve. Booking-success callback and redirect payload checks pass without creating appointments. Git whitespace checks pass.

## Calendar and compact layout (2026-09-15)

The operator supplied `https://cal.com/regency-leads/regency-leads-strategy-call`. Both the iframe and direct fallback use this event. A compact logo/header and brief introduction put the calendar in the first screen. Preparation details remain in an expandable section below the calendar.

GitHub Pages serves the main branch; the apex domain proxies this route. Only this page and its assets are in scope.

Uses the Cal.com inline SDK so hiding event details, brand color, timezone selection and automatic frame sizing work on mobile. Calendar begins at approximately 162px on desktop and 187px on a 375px phone. The confirmation page’s fallback rescheduling URL also uses the supplied event.
