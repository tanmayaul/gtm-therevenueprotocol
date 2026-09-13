# Regency Leads booking confirmation preview

Rebrands the existing `/confirmed-booking-draft/` page for Regency Leads. Contact: Tanmay Aul. Static HTML, CSS, and JavaScript; no build step or credentials. GitHub Pages publishes the repository's main branch. Scope is this draft page and its assets.

## Brand sources

Drive folder: https://drive.google.com/drive/folders/1e2AwPGsQ8OLpr8BT3BJIa_qq9XdYGSHv

The brand guidelines specify forest #114944, gold #D8A455, cream #F6F4F1, ink #17201E, Playfair Display headings, and Source Sans 3 body text. The approved original interlocking crown monogram is preserved. All 35 PNG/SVG-folder files matched local exports by filename and byte size; `assets/source-manifest.json` records their Drive IDs. The root export-status note predates the available full-size exports. The horizontal logo, profile, and sharing image are used in their website roles; social and document layouts inform the supporting design. The existing Canva thumbnail supplies a small-screen logo, with the full export available via srcset.

## Files

- `index.html`: branded header, confirmation, calendar previews, welcome cover, deck, and footer.
- `live-base.css`, `styles.css`: inherited structure and behavior styles.
- `regency.css`: brand tokens, local fonts, responsive layout, and component styling.
- `page.js`, `videos.json`: fifteen script previews, fourteen matching text FAQs, calendar/reschedule previews, and nine-slide carousel.
- `deck/overview.html`: printable source for the branded company overview; individual slide HTML files are editable sources. `deck/regency-leads-company-overview.pdf` and `slide-1.png` through `slide-9.png` are matching rendered exports.
- `assets/`: approved artwork, supporting fonts/licenses, and source manifest.

The original overview's substantive content is retained. Cover and closing slides use the new identity; the closing directs readers to their booking confirmation email instead of inventing a new company email or domain. Existing asset-verification, timing, and screening claims are inherited source claims, not newly validated results.

## Preview and validation

From the repository root: `python3 -m http.server 4331 --bind 127.0.0.1`. Open `/confirmed-booking-draft/`.

Verified at 375px and 1440px: calendar/rescheduling dialogs, fifteen video scripts, fourteen text FAQs, all nine carousel slides and wrapping, keyboard Escape/focus return, loaded assets, no horizontal overflow or clipped mobile video cards. PDF has nine pages; all pages visually reviewed and extracted text checked for old branding. JavaScript syntax and git whitespace checks pass.

This remains an explicitly labeled sample booking. No calendar events or appointments are created. Videos open their scripts while recordings are pending. No analytics, workflow enrollment, or payment collection. The public preview is marked noindex.
