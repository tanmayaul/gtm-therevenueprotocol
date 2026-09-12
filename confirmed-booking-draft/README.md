# Confirmation page design preview

Separate static draft at `/confirmed-booking-draft/`. The existing `/confirmed-booking/` page and its assets are unchanged.

- `index.html`: page structure, sample booking card, deck and payment section.
- `styles.css`: responsive TRP design with reduced-motion support.
- `page.js`: script dialogs, sample calendar dialogs, topic expansion, FAQs, and deck navigation.
- `videos.json`: fifteen full scripts from the revised working-day nurture playbook, including upfront payment.

This is a visual review page. The booking is explicitly a sample. Calendar, join, and reschedule controls preview their purpose and do not create or modify appointments. Video covers open the real recording scripts; recordings are pending. There is no analytics, form submission, or workflow enrollment. The page is marked `noindex,nofollow` but its URL is publicly accessible.

The corporate deck and host image reuse existing public files under `../confirmed-booking/`. The payment note clarifies upfront collection because the existing deck's pay-per-show headline describes the billable unit.

Run `python3 -m http.server 8765 --bind 127.0.0.1` from the repository root, then open `/confirmed-booking-draft/`.

Verified locally: 375px and 1440px layouts, no mobile horizontal overflow, all 15 scripts, all 14 FAQ answers, script dialogs and Escape/focus return, calendar preview behavior, deck navigation, local asset references, and no browser console errors. Only this draft directory is changed.
