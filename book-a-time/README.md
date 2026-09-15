# Regency Leads intro-call page

Rebrands the live `/book-a-time/` page with the approved Regency Leads identity. Static HTML and CSS, with local licensed fonts and unchanged original logo artwork copied from the approved confirmation-page assets.

The agenda now covers advisor states and asset criteria, phone screening, qualified attendance, capacity and package terms. The calendar uses a light theme. A direct calendar link remains visible if embedding fails. The existing confirmation destination and booking metadata contract are retained; redirect messages require the exact Cal.com origin and the embedded window.

## Validation

Checked at 1440px and 375px with loaded fonts/images and no horizontal overflow. Local assets resolve. Redirect payload and untrusted-origin/source checks pass without creating appointments. Git whitespace checks pass.

## Calendar dependency

On 2026-09-15, the inherited Cal.com event URL and its `/trpgtm` profile returned 404. The existing URL is retained pending the operator’s current booking link. Do not represent the live booking flow as verified until the replacement calendar is supplied and checked.

GitHub Pages serves the main branch; the apex domain proxies this route. Only this page and its assets are in scope.
