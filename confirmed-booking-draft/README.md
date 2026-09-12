# Confirmation page design preview

Separate static draft at `/confirmed-booking-draft/`. The existing `/confirmed-booking/` page is unchanged.

This revision reuses the current confirmation page's actual CSS, header, calendar card, preparation card, corporate-deck markup, and footer. Corsa's video presentation is adapted as a large framed welcome video and a two-column video FAQ grid (one column on mobile).

- `live-base.css`: CSS copied from the current confirmation page.
- `styles.css`: additions for video frames, draft labeling, and script dialogs.
- `index.html`: existing TRP components plus the video sections and upfront-payment explanation.
- `page.js`: script dialogs, calendar previews, FAQs, and the existing deck carousel.
- `videos.json`: fifteen recording scripts, including upfront-payment wording.

The booking is explicitly a sample. Calendar and reschedule controls preview their purpose without creating or modifying appointments. Video covers open recording scripts because recordings are pending. There is no workflow enrollment or analytics. The public preview is marked noindex.

Assets reuse existing public files under `../confirmed-booking/`. The deck note explains upfront collection separately from which appointments count for billing.

Verified: desktop and 375px mobile rendering; all fourteen video FAQ cards and text answers; welcome script and upfront wording; dialog Escape and focus return; calendar previews; deck navigation; no horizontal overflow; no browser console errors.

The standalone upfront-payment section has been removed. "Do I pay upfront?" is a dedicated video and text FAQ; the text answer retains the `#payment` anchor.

The hero and calendar card are compacted to show the welcome video in the first screen. The rescheduling question was removed from the video and text FAQ libraries; the reschedule action remains available.
