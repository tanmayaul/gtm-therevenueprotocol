#!/usr/bin/env python3
"""Rewrite the YT array in roi-calc/index.html from the channel's RSS feed.

The page is static on GitHub Pages and YouTube's feed sends no CORS headers,
so the browser cannot fetch it at runtime. This regenerates the list at build
time instead. Run locally or on the schedule in refresh-youtube.yml.

  python3 scripts/refresh_youtube.py [--limit 9] [--check]

Exit codes: 0 wrote (or no change) · 1 fetch/parse failure · 2 --check found drift
"""

import argparse
import html
import pathlib
import re
import sys
import urllib.request

CHANNEL_ID = "UCWplFQQikp_dX-t4PWS6c5A"  # @Tanmay-Aul / "TheRevenueProtocol"
FEED = f"https://www.youtube.com/feeds/videos.xml?channel_id={CHANNEL_ID}"
PAGE = pathlib.Path(__file__).resolve().parent.parent / "roi-calc" / "index.html"

MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
          "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]


def already_on_page(page):
    """Video IDs the page already shows in the FAQ and case-study grids.

    Those sections are hand-curated and several of them are also channel
    uploads, so without this the same video renders twice.
    """
    used = set()
    for name in ("CASES", "FAQ"):
        block = re.search(rf"var {name} = \[(.*?)\n\];", page, re.S)
        if block:
            used.update(re.findall(r"\['([A-Za-z0-9_-]{6,})'", block.group(1)))
    return used


def fetch(limit, exclude=frozenset()):
    req = urllib.request.Request(FEED, headers={"User-Agent": "trp-site-refresh/1.0"})
    with urllib.request.urlopen(req, timeout=30) as r:
        xml = r.read().decode("utf-8", "replace")

    out = []
    for entry in re.findall(r"<entry>(.*?)</entry>", xml, re.S):
        if len(out) >= limit:
            break
        vid = re.search(r"<yt:videoId>(.*?)</yt:videoId>", entry)
        title = re.search(r"<title>(.*?)</title>", entry, re.S)
        pub = re.search(r"<published>(\d{4})-(\d{2})-(\d{2})", entry)
        if not (vid and title and pub) or vid.group(1) in exclude:
            continue
        y, m, d = pub.groups()
        out.append((
            vid.group(1),
            html.unescape(title.group(1)).strip(),
            f"{int(d)} {MONTHS[int(m) - 1]} {y}",
        ))
    return out


def js_escape(text):
    """Single-quoted JS string that is also safe inside an HTML attribute."""
    text = text.replace("\\", "\\\\").replace("'", "&rsquo;")
    return text.replace("<", "&lt;").replace(">", "&gt;")


def render(videos):
    rows = ",\n".join(
        f"  ['{v}','{js_escape(t)}','{d}']" for v, t, d in videos
    )
    return f"/* YT_START — do not edit by hand; refresh-youtube.yml rewrites this block */\nvar YT = [\n{rows}\n];\n/* YT_END */"


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--limit", type=int, default=9)
    ap.add_argument("--check", action="store_true", help="exit 2 if the page is stale")
    args = ap.parse_args()

    page = PAGE.read_text()
    block = re.search(r"/\* YT_START.*?/\* YT_END \*/", page, re.S)
    if not block:
        print("YT_START/YT_END markers not found in roi-calc/index.html", file=sys.stderr)
        return 1

    try:
        videos = fetch(args.limit, exclude=already_on_page(page))
    except Exception as exc:  # noqa: BLE001 — any failure means don't touch the page
        print(f"feed fetch failed: {exc}", file=sys.stderr)
        return 1

    if not videos:
        print("feed returned no usable entries; leaving page untouched", file=sys.stderr)
        return 1

    new = render(videos)
    if block.group(0) == new:
        print(f"up to date ({len(videos)} videos)")
        return 0

    if args.check:
        print("stale — run without --check to update", file=sys.stderr)
        return 2

    PAGE.write_text(page[:block.start()] + new + page[block.end():])
    print(f"updated with {len(videos)} videos; newest: {videos[0][1]}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
